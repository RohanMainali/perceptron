"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Loader2,
  LogOut,
  RefreshCw,
  Shield,
  Trash2,
  User,
  X,
  Mail,
  MessageSquare,
  StickyNote,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

/* ── Types ── */

interface WaitlistEntry {
  _id: string
  name: string
  email: string
  useCase: "Medical" | "Sports" | "Autonomous" | "Other"
  message: string
  status: "pending" | "approved" | "rejected"
  adminNotes: string
  createdAt: string
  updatedAt: string
}

type StatusFilter = "all" | "pending" | "approved" | "rejected"

const AUTH_STORAGE_KEY = "perceptronBlogAuthToken"

const USE_CASE_LABELS: Record<string, string> = {
  Medical: "Medical Imaging AI",
  Sports: "Sports Analytics",
  Autonomous: "Autonomous Driving",
  Other: "Other",
}

const USE_CASE_COLORS: Record<string, string> = {
  Medical: "#E05A6D",
  Sports: "#F1B646",
  Autonomous: "#53C5E6",
  Other: "#C26FCF",
}

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#F1B646", bg: "bg-[#F1B646]/15 border-[#F1B646]/30" },
  approved: { label: "Approved", color: "#4ade80", bg: "bg-green-500/15 border-green-500/30" },
  rejected: { label: "Rejected", color: "#E05A6D", bg: "bg-[#E05A6D]/15 border-[#E05A6D]/30" },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/* ── Main Component ── */

export default function AdminWaitlistPage() {
  const [secretKey, setSecretKey] = useState("")
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [notesEditing, setNotesEditing] = useState<string | null>(null)
  const [notesDraft, setNotesDraft] = useState("")

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

  /* ── Fetch entries ── */
  const fetchEntries = useCallback(
    async (filter: StatusFilter = statusFilter) => {
      if (!authToken) return
      setIsLoading(true)
      try {
        const query = filter !== "all" ? `?status=${filter}` : ""
        const res = await fetch(`/api/admin/waitlist${query}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        if (res.status === 401) {
          setAuthToken(null)
          toast.error("Session expired. Please log in again.")
          return
        }
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setEntries(data.entries || [])
      } catch {
        toast.error("Failed to load waitlist entries.")
      } finally {
        setIsLoading(false)
      }
    },
    [authToken, statusFilter]
  )

  useEffect(() => {
    if (authToken) fetchEntries()
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleFilterChange(f: StatusFilter) {
    setStatusFilter(f)
    if (authToken) fetchEntries(f)
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
    setEntries([])
    toast.success("Logged out.")
  }

  /* ── Actions ── */
  async function updateEntry(id: string, patch: { status?: string; adminNotes?: string }) {
    if (!authToken) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(patch),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to update entry.")
        return
      }
      setEntries((prev) =>
        prev.map((e) =>
          e._id === id
            ? { ...e, status: (data.entry?.status ?? e.status) as WaitlistEntry["status"], adminNotes: data.entry?.adminNotes ?? e.adminNotes }
            : e
        )
      )
      if (patch.status) {
        const label = STATUS_CONFIG[patch.status as keyof typeof STATUS_CONFIG]?.label
        toast.success(
          patch.status === "approved"
            ? `Approved! Approval email sent to the user.`
            : `Entry marked as ${label?.toLowerCase()}.`
        )
      } else {
        toast.success("Notes saved.")
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  async function deleteEntry(id: string) {
    if (!authToken) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || "Failed to delete entry.")
        return
      }
      setEntries((prev) => prev.filter((e) => e._id !== id))
      setDeleteConfirm(null)
      toast.success("Entry deleted.")
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  /* ── Derived counts ── */
  const counts = {
    all: entries.length,
    pending: entries.filter((e) => e.status === "pending").length,
    approved: entries.filter((e) => e.status === "approved").length,
    rejected: entries.filter((e) => e.status === "rejected").length,
  }

  /* ── Render: login ── */
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#050d1a] flex items-center justify-center p-4">
        <Toaster richColors position="top-right" />
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2178C7]/20 border border-[#2178C7]/30 mb-5">
              <Shield size={26} className="text-[#53C5E6]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin — Waitlist</h1>
            <p className="text-sm text-white/40">Enter your secret key to manage the private beta waitlist.</p>
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
          <div className="mt-6 text-center">
            <Link href="/admin/blogs" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              ← Back to Blog Admin
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Render: dashboard ── */
  return (
    <div className="min-h-screen bg-[#050d1a] text-white">
      <Toaster richColors position="top-right" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#050d1a]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2178C7]/20 flex items-center justify-center">
                <User size={15} className="text-[#53C5E6]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white leading-none">Waitlist Admin</h1>
                <p className="text-[11px] text-white/35 mt-0.5">Private Beta Management</p>
              </div>
            </div>
            <div className="h-5 w-px bg-white/[0.08]" />
            <Link href="/admin/blogs" className="text-xs text-white/40 hover:text-[#53C5E6] transition-colors flex items-center gap-1">
              <ExternalLink size={12} />
              Blog Admin
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchEntries()}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-[#E05A6D] hover:bg-[#E05A6D]/10 transition-all"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => handleFilterChange(s)}
              className={`rounded-xl p-4 text-left border transition-all ${
                statusFilter === s
                  ? "border-[#2178C7]/50 bg-[#2178C7]/10"
                  : "border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05]"
              }`}
            >
              <p className="text-2xl font-bold text-white mb-0.5">{counts[s]}</p>
              <p className="text-xs text-white/40 capitalize">{s === "all" ? "Total" : s}</p>
            </button>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Filter size={13} className="text-white/30" />
          {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                statusFilter === f
                  ? "border-[#2178C7]/60 bg-[#2178C7]/20 text-[#53C5E6]"
                  : "border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white/80"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Entries list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin text-[#53C5E6]/60" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <User size={22} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">No waitlist entries{statusFilter !== "all" ? ` with status "${statusFilter}"` : ""} yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => {
              const isExpanded = expandedId === entry._id
              const isActioning = actionLoading === entry._id
              const statusCfg = STATUS_CONFIG[entry.status]
              const isEditingNotes = notesEditing === entry._id

              return (
                <div
                  key={entry._id}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden transition-all"
                >
                  {/* Entry header row */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: `${USE_CASE_COLORS[entry.useCase]}25`, color: USE_CASE_COLORS[entry.useCase] }}
                    >
                      {entry.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name + email + use case */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                          style={{ color: USE_CASE_COLORS[entry.useCase], borderColor: `${USE_CASE_COLORS[entry.useCase]}40`, background: `${USE_CASE_COLORS[entry.useCase]}15` }}
                        >
                          {USE_CASE_LABELS[entry.useCase]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <p className="text-xs text-white/40 flex items-center gap-1">
                          <Mail size={10} />
                          {entry.email}
                        </p>
                        <p className="text-[11px] text-white/25 flex items-center gap-1">
                          <Clock size={10} />
                          {formatDate(entry.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${statusCfg.bg}`} style={{ color: statusCfg.color }}>
                      {statusCfg.label}
                    </span>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : entry._id)}
                      className="p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors text-white/30 hover:text-white/70 flex-shrink-0"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-4">
                      {/* Message */}
                      {entry.message && (
                        <div className="flex gap-2.5">
                          <MessageSquare size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] text-white/35 font-medium uppercase tracking-wide mb-1">Message</p>
                            <p className="text-sm text-white/70 leading-relaxed">{entry.message}</p>
                          </div>
                        </div>
                      )}

                      {/* Admin notes */}
                      <div className="flex gap-2.5">
                        <StickyNote size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[11px] text-white/35 font-medium uppercase tracking-wide mb-1">Admin Notes</p>
                          {isEditingNotes ? (
                            <div className="flex flex-col gap-2">
                              <textarea
                                value={notesDraft}
                                onChange={(e) => setNotesDraft(e.target.value)}
                                rows={3}
                                placeholder="Add internal notes about this applicant…"
                                className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2178C7]/50 resize-none leading-relaxed"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={async () => {
                                    await updateEntry(entry._id, { adminNotes: notesDraft })
                                    setNotesEditing(null)
                                  }}
                                  disabled={isActioning}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#2178C7]/80 hover:bg-[#2178C7] transition-colors disabled:opacity-50"
                                >
                                  {isActioning ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                                  Save
                                </button>
                                <button
                                  onClick={() => setNotesEditing(null)}
                                  className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setNotesEditing(entry._id)
                                setNotesDraft(entry.adminNotes || "")
                              }}
                              className="min-h-[32px] px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] border-dashed text-sm text-white/40 cursor-pointer hover:bg-white/[0.06] hover:text-white/60 transition-all italic leading-relaxed"
                            >
                              {entry.adminNotes || "Click to add notes…"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {entry.status !== "approved" && (
                          <button
                            onClick={() => updateEntry(entry._id, { status: "approved" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-green-600/80 hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            Approve
                          </button>
                        )}
                        {entry.status !== "rejected" && (
                          <button
                            onClick={() => updateEntry(entry._id, { status: "rejected" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E05A6D] bg-[#E05A6D]/15 hover:bg-[#E05A6D]/25 border border-[#E05A6D]/30 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                            Reject
                          </button>
                        )}
                        {entry.status !== "pending" && (
                          <button
                            onClick={() => updateEntry(entry._id, { status: "pending" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#F1B646] bg-[#F1B646]/15 hover:bg-[#F1B646]/25 border border-[#F1B646]/30 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <Clock size={12} />}
                            Set Pending
                          </button>
                        )}

                        <div className="flex-1" />

                        {/* Delete */}
                        {deleteConfirm === entry._id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">Delete permanently?</span>
                            <button
                              onClick={() => deleteEntry(entry._id)}
                              disabled={isActioning}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#E05A6D] hover:bg-[#e0455a] transition-colors disabled:opacity-50"
                            >
                              {isActioning ? <Loader2 size={11} className="animate-spin" /> : "Yes, delete"}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(entry._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/35 hover:text-[#E05A6D] hover:bg-[#E05A6D]/10 transition-all"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
