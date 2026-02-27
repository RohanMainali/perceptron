import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const BACKEND_SERVICE_URL = process.env.BACKEND_SERVICE_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL

const waitlistPayloadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  useCase: z.enum(["Medical", "Sports", "Autonomous", "Other"]).optional().default("Other"),
  message: z.string().max(1000).optional().default(""),
})

export async function POST(request: NextRequest) {
  if (!BACKEND_SERVICE_URL) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 })
  }

  let rawPayload: unknown
  try {
    rawPayload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const parsed = waitlistPayloadSchema.safeParse(rawPayload)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload.", issues: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const response = await fetch(`${BACKEND_SERVICE_URL.replace(/\/$/, "")}/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    })

    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  } catch (error) {
    console.error("Failed to submit waitlist entry", error)
    return NextResponse.json({ error: "Failed to submit your request." }, { status: 500 })
  }
}
