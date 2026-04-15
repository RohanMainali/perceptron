"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import {
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    Loader2,
    LogOut,
    RefreshCw,
    Shield,
    Users,
    Coins,
    X,
    Mail,
    Edit2,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react"
import { AdminHeader } from "../components/AdminHeader"

/* ── Types ── */

interface CvatUser {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    is_staff: boolean
    is_superuser: boolean
    is_active: boolean
    date_joined: string
    ai_tokens_limit: number
    ai_tokens_used: number
}

interface CreditRequest {
    id: number
    user_id: number
    username: string
    email: string
    message: string
    status: "pending" | "approved" | "rejected"
    created_at: string
    ai_tokens_limit: number
    ai_tokens_used: number
}

type ActiveTab = "users" | "credits"
type CreditFilter = "all" | "pending" | "approved" | "rejected"

const AUTH_STORAGE_KEY = "perceptronBlogAuthToken"

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function TokenBar({ used, limit }: { used: number; limit: number }) {
    const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0
    const color = pct >= 90 ? "#E05A6D" : pct >= 60 ? "#F1B646" : "#4ade80"
    return (
        <div className="flex items-center gap-2 min-w-[120px]">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
            <span className="text-[11px] text-white/40 flex-shrink-0">
                {used}/{limit}
            </span>
        </div>
    )
}

/* ── Main Component ── */

export default function AdminUsersPage() {
    const [secretKey, setSecretKey] = useState("")
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const [activeTab, setActiveTab] = useState<ActiveTab>("users")

    /* users tab state */
    const [users, setUsers] = useState<CvatUser[]>([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [editingLimit, setEditingLimit] = useState<number | null>(null)
    const [limitDraft, setLimitDraft] = useState("")
    const [limitSaving, setLimitSaving] = useState<number | null>(null)

    /* credits tab state */
    const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([])
    const [creditsLoading, setCreditsLoading] = useState(false)
    const [creditFilter, setCreditFilter] = useState<CreditFilter>("pending")
    const [expandedCredit, setExpandedCredit] = useState<number | null>(null)
    const [creditAction, setCreditAction] = useState<number | null>(null)
    const [newLimitDraft, setNewLimitDraft] = useState<Record<number, string>>({})
    const [pendingCount, setPendingCount] = useState(0)

    /* ── Auth persistence ── */
    useEffect(() => {
        if (typeof window === "undefined") return
        const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
        if (stored) setAuthToken(stored)
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        if (authToken) {
            window.localStorage.setItem(AUTH_STORAGE_KEY, authToken)
        } else {
            window.localStorage.removeItem(AUTH_STORAGE_KEY)
        }
    }, [authToken])

    /* ── Fetch users ── */
    const fetchUsers = useCallback(async () => {
        if (!authToken) return
        setUsersLoading(true)
        try {
            const res = await fetch("/api/admin/cvat-users", {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            if (res.status === 401) {
                setAuthToken(null)
                toast.error("Session expired. Please log in again.")
                return
            }
            if (!res.ok) throw new Error("Failed to fetch users")
            const data = await res.json()
            setUsers(data.users || [])
        } catch {
            toast.error("Failed to load users.")
        } finally {
            setUsersLoading(false)
        }
    }, [authToken])

    /* ── Fetch credit requests ── */
    const fetchCreditRequests = useCallback(
        async (filter: CreditFilter = creditFilter) => {
            if (!authToken) return
            setCreditsLoading(true)
            try {
                const query = filter !== "all" ? `?status=${filter}` : ""
                const res = await fetch(`/api/admin/credit-requests${query}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                })
                if (res.status === 401) {
                    setAuthToken(null)
                    toast.error("Session expired. Please log in again.")
                    return
                }
                if (!res.ok) throw new Error("Failed to fetch credit requests")
                const data = await res.json()
                // Backend returns { credit_requests: [...] } with nested user object — flatten it
                const flat = (data.credit_requests || []).map((r: any) => ({
                    id: r.id,
                    status: r.status,
                    message: r.message,
                    created_at: r.created_at,
                    user_id: r.user?.id,
                    username: r.user?.username,
                    email: r.user?.email,
                    ai_tokens_used: r.user?.ai_tokens_used ?? 0,
                    ai_tokens_limit: r.user?.ai_tokens_limit ?? 10,
                }))
                setCreditRequests(flat)
                // Keep the stats card up to date
                if (filter === "pending" || filter === "all") {
                    setPendingCount(flat.filter((r: CreditRequest) => r.status === "pending").length)
                }
            } catch {
                toast.error("Failed to load credit requests.")
            } finally {
                setCreditsLoading(false)
            }
        },
        [authToken, creditFilter]
    )

    // Fetch the real pending count independently for the stats card
    const fetchPendingCount = useCallback(async () => {
        if (!authToken) return
        try {
            const res = await fetch("/api/admin/credit-requests?status=pending", {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            if (!res.ok) return
            const data = await res.json()
            setPendingCount((data.credit_requests || []).length)
        } catch { /* silent */ }
    }, [authToken])

    useEffect(() => {
        if (authToken) {
            fetchUsers()
            fetchCreditRequests()
            fetchPendingCount()
        }
    }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleCreditFilterChange(f: CreditFilter) {
        setCreditFilter(f)
        fetchCreditRequests(f)
    }

    /* ── Auth ── */
    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        if (isAuthenticating) return
        const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
        if (!authServiceUrl) {
            toast.error("Authentication service URL is not configured.")
            return
        }
        const key = secretKey.trim()
        if (!key) {
            toast.error("Enter the secret key.")
            return
        }
        setIsAuthenticating(true)
        try {
            const res = await fetch(`${authServiceUrl.replace(/\/$/, "")}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey: key }),
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error || "Invalid credentials.")
                return
            }
            setAuthToken(data.token)
            toast.success("Authenticated successfully.")
        } catch {
            toast.error("Failed to connect to auth service.")
        } finally {
            setIsAuthenticating(false)
        }
    }

    function handleLogout() {
        setAuthToken(null)
        setSecretKey("")
        setUsers([])
        setCreditRequests([])
        toast.success("Logged out.")
    }

    /* ── Update token limit ── */
    async function saveTokenLimit(userId: number) {
        if (!authToken) return
        const parsed = parseInt(limitDraft, 10)
        if (isNaN(parsed) || parsed < 0) {
            toast.error("Enter a valid non-negative integer.")
            return
        }
        setLimitSaving(userId)
        try {
            const res = await fetch(`/api/admin/cvat-users/${userId}/token-limit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ ai_tokens_limit: parsed }),
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error || "Failed to update limit.")
                return
            }
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userId ? { ...u, ai_tokens_limit: data.ai_tokens_limit ?? parsed } : u
                )
            )
            setEditingLimit(null)
            toast.success(`Token limit updated to ${parsed}.`)
        } catch {
            toast.error("Network error. Please try again.")
        } finally {
            setLimitSaving(null)
        }
    }

    /* ── Resolve credit request ── */
    async function resolveCreditRequest(reqId: number, status: "approved" | "rejected") {
        if (!authToken) return
        setCreditAction(reqId)
        const body: Record<string, unknown> = { status }
        const limitStr = newLimitDraft[reqId]
        if (status === "approved" && limitStr) {
            const parsed = parseInt(limitStr, 10)
            if (!isNaN(parsed) && parsed >= 0) {
                body.ai_tokens_limit = parsed
            }
        }
        try {
            const res = await fetch(`/api/admin/credit-requests/${reqId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error || "Failed to resolve request.")
                return
            }
            setCreditRequests((prev) =>
                prev.map((r) =>
                    r.id === reqId ? { ...r, status: data.status ?? status } : r
                )
            )
            setExpandedCredit(null)
            toast.success(status === "approved" ? "Request approved!" : "Request rejected.")
            fetchPendingCount()
        } catch {
            toast.error("Network error. Please try again.")
        } finally {
            setCreditAction(null)
        }
    }

    /* ── Derived ── */
    const pendingCreditCount = pendingCount

    /* ── Render: login ── */
    if (!authToken) {
        return (
            <div className="min-h-screen bg-[#050d1a] text-white flex flex-col">
                <Toaster richColors position="top-right" />
                <AdminHeader />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-sm">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2178C7]/20 border border-[#2178C7]/30 mb-5">
                                <Shield size={26} className="text-[#53C5E6]" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-1">Admin — Users</h1>
                            <p className="text-sm text-white/40">Enter your secret key to manage platform users.</p>
                        </div>
                        <form onSubmit={handleLogin} className="flex flex-col gap-3">
                            <input
                                type="password"
                                placeholder="Secret key"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                autoFocus
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#2178C7]/60 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isAuthenticating}
                                className="w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-50 transition-all"
                                style={{ background: "linear-gradient(135deg, #2178C7, #53C5E6)" }}
                            >
                                {isAuthenticating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 size={15} className="animate-spin" /> Authenticating…
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    /* ── Render: dashboard ── */
    return (
        <div className="min-h-screen bg-[#050d1a] text-white flex flex-col">
            <Toaster richColors position="top-right" />
            <AdminHeader
                actions={
                    <>
                        <button
                            onClick={() => {
                                fetchUsers()
                                fetchCreditRequests()
                                fetchPendingCount()
                            }}
                            disabled={usersLoading || creditsLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                            <RefreshCw size={13} className={usersLoading || creditsLoading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-[#E05A6D] hover:bg-[#E05A6D]/10 transition-all"
                        >
                            <LogOut size={13} />
                            Sign Out
                        </button>
                    </>
                }
            />

            <main className="max-w-6xl mx-auto px-6 py-8 w-full">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.03]">
                        <p className="text-2xl font-bold text-white mb-0.5">{users.length}</p>
                        <p className="text-xs text-white/40">Total Users</p>
                    </div>
                    <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.03]">
                        <p className="text-2xl font-bold text-white mb-0.5">
                            {users.filter((u) => u.is_active).length}
                        </p>
                        <p className="text-xs text-white/40">Active</p>
                    </div>
                    <div className="rounded-xl p-4 border border-[#F1B646]/30 bg-[#F1B646]/10">
                        <p className="text-2xl font-bold text-[#F1B646] mb-0.5">
                            {creditRequests.filter((r) => r.status === "pending").length}
                        </p>
                        <p className="text-xs text-white/40">Pending Requests</p>
                    </div>
                    <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.03]">
                        <p className="text-2xl font-bold text-white mb-0.5">
                            {users.reduce((acc, u) => acc + (u.ai_tokens_used ?? 0), 0)}
                        </p>
                        <p className="text-xs text-white/40">Tokens Used Today</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 border-b border-white/[0.07] pb-0">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${activeTab === "users"
                                ? "border-[#53C5E6] text-[#53C5E6]"
                                : "border-transparent text-white/40 hover:text-white/70"
                            }`}
                    >
                        <Users size={14} />
                        Users
                        <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-white/[0.07] text-white/50">
                            {users.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("credits")}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${activeTab === "credits"
                                ? "border-[#53C5E6] text-[#53C5E6]"
                                : "border-transparent text-white/40 hover:text-white/70"
                            }`}
                    >
                        <Coins size={14} />
                        Credit Requests
                        {pendingCreditCount > 0 && (
                            <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#F1B646]/20 text-[#F1B646] border border-[#F1B646]/30">
                                {pendingCreditCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* ── Users Tab ── */}
                {activeTab === "users" && (
                    <div>
                        {usersLoading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader2 size={28} className="animate-spin text-[#53C5E6]/60" />
                            </div>
                        ) : users.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                                    <Users size={22} className="text-white/20" />
                                </div>
                                <p className="text-white/40 text-sm">No users found.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {users.map((user) => {
                                    const isEditing = editingLimit === user.id
                                    const isSaving = limitSaving === user.id
                                    const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username

                                    return (
                                        <div
                                            key={user.id}
                                            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 flex items-center gap-4 flex-wrap"
                                        >
                                            {/* Avatar */}
                                            <div className="w-9 h-9 rounded-full bg-[#2178C7]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#53C5E6]">
                                                {displayName.charAt(0).toUpperCase()}
                                            </div>

                                            {/* Name + email */}
                                            <div className="flex-1 min-w-[140px]">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm font-semibold text-white">{user.username}</p>
                                                    {user.is_staff && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#53C5E6]/15 text-[#53C5E6] border border-[#53C5E6]/25">
                                                            Staff
                                                        </span>
                                                    )}
                                                    {!user.is_active && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E05A6D]/15 text-[#E05A6D] border border-[#E05A6D]/25">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                                                    <Mail size={9} />
                                                    {user.email || "—"}
                                                </p>
                                            </div>

                                            {/* Token usage */}
                                            <div className="flex-1 min-w-[140px]">
                                                <p className="text-[11px] text-white/35 mb-1.5">Today&apos;s usage</p>
                                                <TokenBar used={user.ai_tokens_used} limit={user.ai_tokens_limit} />
                                            </div>

                                            {/* Joined */}
                                            <div className="min-w-[90px] text-right hidden sm:block">
                                                <p className="text-[11px] text-white/30">Joined</p>
                                                <p className="text-xs text-white/50">{formatDate(user.date_joined)}</p>
                                            </div>

                                            {/* Token limit edit */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {isEditing ? (
                                                    <>
                                                        <input
                                                            type="number"
                                                            min={0}
                                                            value={limitDraft}
                                                            onChange={(e) => setLimitDraft(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") saveTokenLimit(user.id)
                                                                if (e.key === "Escape") setEditingLimit(null)
                                                            }}
                                                            autoFocus
                                                            className="w-20 px-2 py-1.5 rounded-lg bg-white/[0.07] border border-[#2178C7]/40 text-white text-xs text-center focus:outline-none focus:border-[#2178C7]/70"
                                                        />
                                                        <button
                                                            onClick={() => saveTokenLimit(user.id)}
                                                            disabled={isSaving}
                                                            className="p-1.5 rounded-lg bg-green-600/80 hover:bg-green-600 text-white transition-colors disabled:opacity-50"
                                                        >
                                                            {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingLimit(null)}
                                                            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.07] transition-colors"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditingLimit(user.id)
                                                            setLimitDraft(String(user.ai_tokens_limit))
                                                        }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.15] transition-all"
                                                    >
                                                        <Edit2 size={11} />
                                                        Edit limit ({user.ai_tokens_limit})
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Credits Tab ── */}
                {activeTab === "credits" && (
                    <div>
                        {/* Filter pills */}
                        <div className="flex items-center gap-2 mb-5 flex-wrap">
                            {(["all", "pending", "approved", "rejected"] as CreditFilter[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => handleCreditFilterChange(f)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${creditFilter === f
                                            ? "border-[#2178C7]/60 bg-[#2178C7]/20 text-[#53C5E6]"
                                            : "border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white/80"
                                        }`}
                                >
                                    {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                                    {f === "pending" && pendingCreditCount > 0 && (
                                        <span className="ml-1.5 px-1 py-0 rounded text-[10px] bg-[#F1B646]/20 text-[#F1B646]">
                                            {pendingCreditCount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {creditsLoading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader2 size={28} className="animate-spin text-[#53C5E6]/60" />
                            </div>
                        ) : creditRequests.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                                    <Coins size={22} className="text-white/20" />
                                </div>
                                <p className="text-white/40 text-sm">
                                    No credit requests
                                    {creditFilter !== "all" ? ` with status "${creditFilter}"` : ""} found.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {creditRequests.map((req) => {
                                    const isExpanded = expandedCredit === req.id
                                    const isActioning = creditAction === req.id
                                    const StatusIcon =
                                        req.status === "approved"
                                            ? CheckCircle2
                                            : req.status === "rejected"
                                                ? XCircle
                                                : AlertCircle

                                    const statusColor =
                                        req.status === "approved"
                                            ? "#4ade80"
                                            : req.status === "rejected"
                                                ? "#E05A6D"
                                                : "#F1B646"

                                    return (
                                        <div
                                            key={req.id}
                                            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
                                        >
                                            {/* Row */}
                                            <div className="flex items-center gap-4 px-5 py-4">
                                                {/* Avatar */}
                                                <div className="w-9 h-9 rounded-full bg-[#C26FCF]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#C26FCF]">
                                                    {req.username.charAt(0).toUpperCase()}
                                                </div>

                                                {/* Name + email */}
                                                <div className="flex-1 min-w-[120px]">
                                                    <p className="text-sm font-semibold text-white">{req.username}</p>
                                                    <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                                                        <Mail size={9} />
                                                        {req.email || "—"}
                                                    </p>
                                                </div>

                                                {/* Token usage */}
                                                <div className="flex-1 min-w-[130px] hidden sm:block">
                                                    <p className="text-[11px] text-white/35 mb-1.5">Today&apos;s usage</p>
                                                    <TokenBar used={req.ai_tokens_used} limit={req.ai_tokens_limit} />
                                                </div>

                                                {/* Date */}
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[11px] text-white/30">Requested</p>
                                                    <p className="text-xs text-white/50">{formatDate(req.created_at)}</p>
                                                </div>

                                                {/* Status badge */}
                                                <span
                                                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0"
                                                    style={{
                                                        color: statusColor,
                                                        borderColor: `${statusColor}40`,
                                                        background: `${statusColor}15`,
                                                    }}
                                                >
                                                    <StatusIcon size={11} />
                                                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                                </span>

                                                {/* Expand toggle */}
                                                <button
                                                    onClick={() => setExpandedCredit(isExpanded ? null : req.id)}
                                                    className="p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors text-white/30 hover:text-white/70 flex-shrink-0"
                                                >
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                            </div>

                                            {/* Expanded */}
                                            {isExpanded && (
                                                <div className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-4">
                                                    {/* Message */}
                                                    {req.message && (
                                                        <div>
                                                            <p className="text-[11px] text-white/35 font-medium uppercase tracking-wide mb-1.5">
                                                                User message
                                                            </p>
                                                            <p className="text-sm text-white/70 leading-relaxed bg-white/[0.03] rounded-lg px-3 py-2.5 border border-white/[0.06]">
                                                                {req.message}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Actions — only show for pending */}
                                                    {req.status === "pending" && (
                                                        <div className="flex items-end gap-3 flex-wrap">
                                                            <div className="flex flex-col gap-1">
                                                                <label className="text-[11px] text-white/35 font-medium uppercase tracking-wide">
                                                                    New token limit (optional)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    placeholder={`Current: ${req.ai_tokens_limit}`}
                                                                    value={newLimitDraft[req.id] ?? ""}
                                                                    onChange={(e) =>
                                                                        setNewLimitDraft((prev) => ({ ...prev, [req.id]: e.target.value }))
                                                                    }
                                                                    className="w-40 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-[#2178C7]/50 placeholder:text-white/20"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => resolveCreditRequest(req.id, "approved")}
                                                                    disabled={isActioning}
                                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-green-600/80 hover:bg-green-600 transition-colors disabled:opacity-50"
                                                                >
                                                                    {isActioning ? (
                                                                        <Loader2 size={12} className="animate-spin" />
                                                                    ) : (
                                                                        <Check size={12} />
                                                                    )}
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => resolveCreditRequest(req.id, "rejected")}
                                                                    disabled={isActioning}
                                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E05A6D] bg-[#E05A6D]/15 hover:bg-[#E05A6D]/25 border border-[#E05A6D]/30 transition-colors disabled:opacity-50"
                                                                >
                                                                    {isActioning ? (
                                                                        <Loader2 size={12} className="animate-spin" />
                                                                    ) : (
                                                                        <X size={12} />
                                                                    )}
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {req.status !== "pending" && (
                                                        <p className="text-xs text-white/30 italic">
                                                            This request has already been {req.status}.
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
