import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { z } from "zod"

const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET
const BACKEND_SERVICE_URL = process.env.BACKEND_SERVICE_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL

const blogPayloadSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z
    .string()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and single hyphens."),
  author: z.string().max(120).optional().default(""),
  date: z.string().max(40).optional(),
  excerpt: z.string().max(320).optional(),
  image: z
    .string()
    .url({ message: "Media URL must be a valid URL (image or video link)." })
    .optional()
    .or(z.literal("")),
  content: z.string().min(20, "Content is too short."),
})

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  .replace(/^-|-$/g, "")
}

export async function POST(request: NextRequest) {
  if (!AUTH_TOKEN_SECRET) {
    return NextResponse.json({ error: "Server is missing AUTH_TOKEN_SECRET." }, { status: 500 })
  }

  if (!BACKEND_SERVICE_URL) {
    return NextResponse.json({ error: "Server is missing BACKEND_SERVICE_URL." }, { status: 500 })
  }

  const authorization = request.headers.get("authorization")
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing authorization header." }, { status: 401 })
  }

  const token = authorization.slice("Bearer ".length).trim()
  try {
    jwt.verify(token, AUTH_TOKEN_SECRET)
  } catch (error) {
    console.error("Invalid token", error)
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 })
  }

  let rawPayload: unknown
  try {
    rawPayload = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const mergedPayload = {
    ...((rawPayload as Record<string, unknown>) || {}),
  }

  const normalizedSlug = sanitizeSlug(String(mergedPayload.slug || mergedPayload.title || ""))
  mergedPayload.slug = normalizedSlug

  const parsed = blogPayloadSchema.safeParse(mergedPayload)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid blog payload.", issues: parsed.error.flatten() }, { status: 400 })
  }

  const payload = { ...parsed.data }

  if (!payload.slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 })
  }

  if (payload.slug.length < 3) {
    return NextResponse.json({ error: "Slug must be at least 3 characters long." }, { status: 400 })
  }

  if (payload.date) {
    const candidate = new Date(payload.date)
    if (!Number.isNaN(candidate.getTime())) {
      payload.date = candidate.toISOString().split("T")[0]
    }
  }

  payload.author = (payload.author ?? "").trim() || "Perceptron Team"
  payload.excerpt = payload.excerpt?.trim()
  payload.image = payload.image?.trim()

  try {
    const response = await fetch(`${BACKEND_SERVICE_URL.replace(/\/$/, "")}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const body = await response.json().catch(() => ({}))

    if (!response.ok) {
      return NextResponse.json(body, { status: response.status })
    }

    return NextResponse.json(body, { status: 201 })
  } catch (error) {
    console.error("Failed to persist blog post", error)
    return NextResponse.json({ error: "Failed to store the blog post." }, { status: 500 })
  }
}
