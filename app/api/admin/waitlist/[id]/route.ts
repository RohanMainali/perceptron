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

function backendUrl(id: string) {
  return `${(BACKEND_SERVICE_URL || "").replace(/\/$/, "")}/waitlist/${id}`
}

/* ── PATCH /api/admin/waitlist/[id] — Update status / admin notes ── */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAuth(request)
  if (auth instanceof NextResponse) return auth
  const token = auth

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  try {
    const response = await fetch(backendUrl(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const responseBody = await response.json().catch(() => ({}))
    return NextResponse.json(responseBody, { status: response.status })
  } catch (error) {
    console.error("Failed to update waitlist entry", error)
    return NextResponse.json({ error: "Failed to update the entry." }, { status: 500 })
  }
}

/* ── DELETE /api/admin/waitlist/[id] — Delete an entry ── */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAuth(request)
  if (auth instanceof NextResponse) return auth
  const token = auth

  const { id } = await params

  try {
    const response = await fetch(backendUrl(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const responseBody = await response.json().catch(() => ({}))
    return NextResponse.json(responseBody, { status: response.status })
  } catch (error) {
    console.error("Failed to delete waitlist entry", error)
    return NextResponse.json({ error: "Failed to delete the entry." }, { status: 500 })
  }
}
