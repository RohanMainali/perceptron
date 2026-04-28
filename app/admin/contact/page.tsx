"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Shield,
  StickyNote,
  Trash2,
  Check,
  Archive,
  Inbox,
} from "lucide-react"
import { AdminHeader } from "../components/AdminHeader"

interface ContactSubmission {
  _id: string
  name: string
  email: string
  projectType: string
  message: string
  status: "unread" | "read" | "archived"
  adminNotes: string
  createdAt: string
}

type StatusFilter = "all" | "unread" | "read" | "archived"

const AUTH_STORAGE_KEY = "perceptronBlogAuthToken"

const PROJECT_TYPE_COLORS: Record<string, string> = {
  "data-annotation": "#53C5E6",
  "model-development": "#2178C7",
  "research-consulting": "#C26FCF",
  other: "#F1B646",
  "": "#94a3b8",
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "data-annotation": "Data Annotation",
  "model-development": "Model Development",
  "research-consulting": "Research & Consulting",
  other: "Other",
  "": "General",
}

const STATUS_CONFIG = {
  unread: { label: "Unread", color: "#53C5E6", bg: "bg-[#53C5E6]/15 border-[#53C5E6]/30" },
  read: { label: "Read", color: "#4ade80", bg: "bg-green-500/15 border-green-500/30" },
  archived: { label: "Archived", color: "#94a3b8", bg: "bg-white/10 border-white/20" },
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

export default function AdminContactPage() {
  const [secretKey, setSecretKey] = useState("")
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
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

  /* ── Fetch ── */
  const fetchSubmissions = useCallback(
    async (filter: StatusFilter = statusFilter) => {
      if (!authToken) return
      setIsLoading(true)
      try {
        const query = filter !== "all" ? `?status=${filter}` : ""
        const res = await fetch(`/api/admin/contact${query}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        if (res.status === 401) {
          setAuthToken(null)
          toast.error("Session expired. Please log in again.")
          return
        }
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setSubmissions(data.submissions || [])
      } catch {
        toast.error("Failed to load contact submissions.")
      } finally {
        setIsLoading(false)
      }
    },
    [authToken, statusFilter]
  )

  useEffect(() => {
    if (authToken) fetchSubmissions()
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleFilterChange(f: StatusFilter) {
    setStatusFilter(f)
    if (authToken) fetchSubmissions(f)
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
    setSubmissions([])
    toast.success("Logged out.")
  }

  /* ── Actions ── */
  async function updateSubmission(id: string, patch: { status?: string; adminNotes?: string }) {
    if (!authToken) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(patch),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to update submission.")
        return
      }
      setSubmissions((prev) =>
        prev.map((s) =>
          s._id === id
            ? {
                ...s,
                status: (data.submission?.status ?? s.status) as ContactSubmission["status"],
                adminNotes: data.submission?.adminNotes ?? s.adminNotes,
              }
            : s
        )
      )
      if (patch.status) {
        toast.success(`Marked as ${patch.status}.`)
      } else {
        toast.success("Notes saved.")
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  async function deleteSubmission(id: string) {
    if (!authToken) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || "Failed to delete submission.")
        return
      }
      setSubmissions((prev) => prev.filter((s) => s._id !== id))
      setDeleteConfirm(null)
      toast.success("Submission deleted.")
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const counts = {
    all: submissions.length,
    unread: submissions.filter((s) => s.status === "unread").length,
    read: submissions.filter((s) => s.status === "read").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  }

  /* ── Login screen ── */
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
              <h1 className="text-2xl font-bold text-white mb-1">Admin — Contact</h1>
              <p className="text-sm text-white/40">Enter your secret key to view contact form submissions.</p>
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

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-[#050d1a] text-white flex flex-col">
      <Toaster richColors position="top-right" />
      <AdminHeader
        actions={
          <>
            <button
              onClick={() => fetchSubmissions()}
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
          </>
        }
      />

      <main className="max-w-6xl mx-auto px-6 py-8 w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(["all", "unread", "read", "archived"] as StatusFilter[]).map((s) => (
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
          {(["all", "unread", "read", "archived"] as StatusFilter[]).map((f) => (
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

        {/* List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin text-[#53C5E6]/60" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <Inbox size={22} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">
              No contact submissions{statusFilter !== "all" ? ` with status "${statusFilter}"` : ""} yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map((submission) => {
              const isExpanded = expandedId === submission._id
              const isActioning = actionLoading === submission._id
              const isEditingNotes = notesEditing === submission._id
              const statusCfg = STATUS_CONFIG[submission.status]
              const ptColor = PROJECT_TYPE_COLORS[submission.projectType] ?? "#94a3b8"
              const ptLabel = PROJECT_TYPE_LABELS[submission.projectType] ?? submission.projectType

              return (
                <div
                  key={submission._id}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
                >
                  {/* Row */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: `${ptColor}25`, color: ptColor }}
                    >
                      {submission.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name + email + type */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">{submission.name}</p>
                        {submission.projectType && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                            style={{
                              color: ptColor,
                              borderColor: `${ptColor}40`,
                              background: `${ptColor}15`,
                            }}
                          >
                            {ptLabel}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <p className="text-xs text-white/40 flex items-center gap-1">
                          <Mail size={10} />
                          {submission.email}
                        </p>
                        <p className="text-[11px] text-white/25 flex items-center gap-1">
                          <Clock size={10} />
                          {formatDate(submission.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${statusCfg.bg}`}
                      style={{ color: statusCfg.color }}
                    >
                      {statusCfg.label}
                    </span>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : submission._id)}
                      className="p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors text-white/30 hover:text-white/70 flex-shrink-0"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-4">
                      {/* Message */}
                      <div className="flex gap-2.5">
                        <MessageSquare size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] text-white/35 font-medium uppercase tracking-wide mb-1">Message</p>
                          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{submission.message}</p>
                        </div>
                      </div>

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
                                placeholder="Add internal notes…"
                                className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2178C7]/50 resize-none leading-relaxed"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={async () => {
                                    await updateSubmission(submission._id, { adminNotes: notesDraft })
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
                                setNotesEditing(submission._id)
                                setNotesDraft(submission.adminNotes || "")
                              }}
                              className="min-h-[32px] px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] border-dashed text-sm text-white/40 cursor-pointer hover:bg-white/[0.06] hover:text-white/60 transition-all italic leading-relaxed"
                            >
                              {submission.adminNotes || "Click to add notes…"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {submission.status !== "read" && (
                          <button
                            onClick={() => updateSubmission(submission._id, { status: "read" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-green-600/80 hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            Mark Read
                          </button>
                        )}
                        {submission.status !== "unread" && (
                          <button
                            onClick={() => updateSubmission(submission._id, { status: "unread" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#53C5E6] bg-[#53C5E6]/15 hover:bg-[#53C5E6]/25 border border-[#53C5E6]/30 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <Inbox size={12} />}
                            Mark Unread
                          </button>
                        )}
                        {submission.status !== "archived" && (
                          <button
                            onClick={() => updateSubmission(submission._id, { status: "archived" })}
                            disabled={isActioning}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/50 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <Archive size={12} />}
                            Archive
                          </button>
                        )}

                        <div className="flex-1" />

                        {deleteConfirm === submission._id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">Delete permanently?</span>
                            <button
                              onClick={() => deleteSubmission(submission._id)}
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
                            onClick={() => setDeleteConfirm(submission._id)}
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
