import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET
const BACKEND_SERVICE_URL = process.env.BACKEND_SERVICE_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL

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

export async function GET(request: NextRequest) {
  const auth = verifyAuth(request)
  if (auth instanceof NextResponse) return auth
  const token = auth

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") || ""
  const query = status ? `?status=${encodeURIComponent(status)}` : ""

  try {
    const response = await fetch(`${BACKEND_SERVICE_URL!.replace(/\/$/, "")}/waitlist${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  } catch (error) {
    console.error("Failed to fetch waitlist entries", error)
    return NextResponse.json({ error: "Failed to fetch waitlist entries." }, { status: 500 })
  }
}
