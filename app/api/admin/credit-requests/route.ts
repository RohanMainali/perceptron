import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET
const CVAT_API_URL = (process.env.CVAT_API_URL || "").replace(/\/$/, "")
const CVAT_INTERNAL_API_KEY = process.env.CVAT_INTERNAL_API_KEY || ""

function verifyAdmin(request: NextRequest): string | NextResponse {
    if (!AUTH_TOKEN_SECRET) {
        return NextResponse.json({ error: "Server misconfiguration: missing AUTH_TOKEN_SECRET." }, { status: 500 })
    }
    const authorization = request.headers.get("authorization")
    if (!authorization?.startsWith("Bearer ")) {
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
    const auth = verifyAdmin(request)
    if (auth instanceof NextResponse) return auth

    if (!CVAT_API_URL || !CVAT_INTERNAL_API_KEY) {
        return NextResponse.json({ error: "CVAT integration not configured." }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get("status") || ""
    const query = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : ""

    try {
        const resp = await fetch(`${CVAT_API_URL}/api/internal/credit-requests${query}`, {
            headers: { "X-Internal-Api-Key": CVAT_INTERNAL_API_KEY },
        })
        const data = await resp.json()
        return NextResponse.json(data, { status: resp.status })
    } catch {
        return NextResponse.json({ error: "Failed to reach CVAT server." }, { status: 502 })
    }
}
