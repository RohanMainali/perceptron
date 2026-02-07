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

function verifyAuth(request: NextRequest): string | NextResponse {
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
    return token
  } catch {
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 })
  }
}

function backendUrl(path: string) {
  return `${(BACKEND_SERVICE_URL || "").replace(/\/$/, "")}${path}`
}

/* ── PUT /api/admin/blogs/[slug] — Update a blog post ── */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = verifyAuth(request)
  if (auth instanceof NextResponse) return auth
  const token = auth

  const { slug } = await params

  let rawPayload: Record<string, unknown>
  try {
    rawPayload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const normalizedSlug = sanitizeSlug(String(rawPayload.slug || rawPayload.title || slug))
  rawPayload.slug = normalizedSlug

  const parsed = blogPayloadSchema.safeParse(rawPayload)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid blog payload.", issues: parsed.error.flatten() }, { status: 400 })
  }

  const payload = { ...parsed.data }
  payload.author = (payload.author ?? "").trim() || "Perceptron Team"
  payload.excerpt = payload.excerpt?.trim()
  payload.image = payload.image?.trim()

  if (payload.date) {
    const candidate = new Date(payload.date)
    if (!Number.isNaN(candidate.getTime())) {
      payload.date = candidate.toISOString().split("T")[0]
    }
  }

  try {
    const response = await fetch(backendUrl(`/blogs/${slug}`), {
      method: "PUT",
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

    return NextResponse.json(body)
  } catch (error) {
    console.error("Failed to update blog post", error)
    return NextResponse.json({ error: "Failed to update the blog post." }, { status: 500 })
  }
}

/* ── DELETE /api/admin/blogs/[slug] — Delete a blog post ── */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = verifyAuth(request)
  if (auth instanceof NextResponse) return auth
  const token = auth

  const { slug } = await params

  try {
    const response = await fetch(backendUrl(`/blogs/${slug}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      return NextResponse.json(body, { status: response.status })
    }

    return NextResponse.json(body)
  } catch (error) {
    console.error("Failed to delete blog post", error)
    return NextResponse.json({ error: "Failed to delete the blog post." }, { status: 500 })
  }
}
