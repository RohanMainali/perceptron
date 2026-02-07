"use client"

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Toaster, toast } from "sonner"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Plus,
  Save,
  Search,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react"

/* ── Types & constants ── */

const initialFormState = {
  title: "",
  slug: "",
  author: "",
  date: "",
  excerpt: "",
  image: "",
  content: "",
}

type BlogFormState = typeof initialFormState

interface BlogPostItem {
  slug: string
  title: string
  author: string
  date: string
  excerpt: string
  image?: string
  content: string
}

type ViewMode = "list" | "create" | "edit"

const AUTH_STORAGE_KEY = "perceptronBlogAuthToken"

/* ── Helpers ── */

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function getEmbedUrl(url: string): string {
  if (/youtube\.com\/watch\?v=/.test(url)) {
    try {
      const id = new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${id}`
    } catch {
      return url
    }
  }
  if (/youtu\.be\//.test(url)) {
    const id = url.split("youtu.be/")[1]?.split(/[?&#]/)[0]
    return `https://www.youtube.com/embed/${id}`
  }
  if (/vimeo\.com\/(\d+)/.test(url)) {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1]
    return `https://player.vimeo.com/video/${id}`
  }
  return url
}

function isVideoUrl(url: string | undefined): boolean {
  if (!url) return false
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(url)
}

function getVideoThumbnail(url: string): string | null {
  let videoId: string | null = null
  if (/youtube\.com\/watch\?v=/.test(url)) {
    try {
      videoId = new URL(url).searchParams.get("v")
    } catch {
      /* */
    }
  } else if (/youtu\.be\//.test(url)) {
    videoId = url.split("youtu.be/")[1]?.split(/[?&#]/)[0] || null
  }
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  return null
}

interface PreviewState extends BlogFormState {
  authorDisplay: string
  dateDisplay: string
  slugForPreview: string
  content: string
}

/* ───────────────────────────────────────────────
   BlogPostPreview — replica of blog-post-client
   ─────────────────────────────────────────────── */
function BlogPostPreview({ preview }: { preview: PreviewState }) {
  const hasHeroMedia = Boolean(preview.image && !preview.image.toLowerCase().includes("placeholder"))
  const isVideo = hasHeroMedia && isVideoUrl(preview.image)
  const readingTime = Math.max(1, Math.ceil((preview.content?.length || 0) / 1200))

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
      <div className="relative z-10 flex-1 overflow-y-auto">
        {/* Dark hero */}
        <div className="relative min-h-[280px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
              style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2178C7]/15 via-transparent to-white/80" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 w-full px-5 pt-8 pb-14">
            <div className={`grid ${hasHeroMedia ? "grid-cols-2 gap-5" : "grid-cols-1"} items-center`}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white/50 text-[10px]">Blog</span>
                  <ChevronRight size={8} className="text-white/30" />
                  <span className="text-[#53C5E6] text-[10px] font-medium line-clamp-1">
                    {preview.title || "Untitled"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#2178C7]/30 bg-[#2178C7]/10 text-[#53C5E6] text-[9px] font-medium mb-4">
                  <BookOpen size={8} />
                  Insight
                </div>
                <h2 className="text-xl font-bold text-white mb-2 leading-[1.15]">
                  {preview.title || "Untitled blog post"}
                </h2>
                <p className="text-xs text-white/60 mb-4 leading-relaxed line-clamp-2">
                  {preview.excerpt || "Explore key insights from our research and engineering teams."}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px]">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center">
                      <User size={6} className="text-white" />
                    </div>
                    <span className="font-medium">{preview.authorDisplay}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[9px]">
                    <Calendar size={8} />
                    <span>{preview.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[9px]">
                    <Clock size={8} />
                    <span>{readingTime} min</span>
                  </div>
                </div>
              </div>

              {hasHeroMedia && (
                <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-xl">
                  {isVideo ? (
                    <iframe
                      src={getEmbedUrl(preview.image)}
                      title={preview.title}
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    <img src={preview.image} alt={preview.title} className="w-full aspect-[4/3] object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
        </div>

        {/* Content */}
        <section className="relative bg-white py-6 text-slate-900">
          <div className="relative z-10 mx-auto w-full max-w-none px-5">
            <div className="prose prose-sm max-w-none">
              <style>{`
                .prose { --tw-prose-body: #374151; --tw-prose-headings: #111827; --tw-prose-links: #2178C7; --tw-prose-bold: #1f2937; --tw-prose-bullets: #2178C7; --tw-prose-quote-borders: #2178C7; --tw-prose-code: #111827; --tw-prose-pre-code: #e5e7eb; --tw-prose-pre-bg: #0f172a; font-size: 0.8125rem; line-height: 1.75; color: #374151; }
                .prose h1,.prose h2,.prose h3,.prose h4,.prose h5,.prose h6 { font-weight: 700; letter-spacing: -0.025em; color: #111827; }
                .prose h1 { font-size: 1.5rem; margin-top: 1.75em; margin-bottom: 0.6em; }
                .prose h2 { font-size: 1.25rem; margin-top: 1.75em; margin-bottom: 0.6em; padding-bottom: 0.35em; border-bottom: 2px solid #e5e7eb; }
                .prose h3 { font-size: 1rem; margin-top: 1.25em; margin-bottom: 0.5em; }
                .prose p { margin-bottom: 1em; }
                .prose a { color: #2178C7; text-decoration: none; font-weight: 500; }
                .prose code { background-color: #f3f4f6; color: #c026d3; padding: 0.1em 0.35em; border-radius: 0.25rem; font-family: "Geist Mono",monospace; font-size: 0.85em; }
                .prose pre { background: #0f172a; border: 1px solid #1e293b; border-radius: 0.625rem; padding: 1em; overflow-x: auto; margin: 1.25em 0; }
                .prose pre code { background-color: transparent; color: #e2e8f0; padding: 0; border: none; font-size: 0.8em; }
                .prose blockquote { border-left: 3px solid #2178C7; padding: 0.5em 1em; color: #374151; font-style: italic; background: #f8fafc; border-radius: 0 0.375rem 0.375rem 0; margin: 1.25em 0; }
                .prose blockquote p { margin: 0; }
                .prose ul { list-style-type: none; padding-left: 1em; }
                .prose ul li { position: relative; padding-left: 0.6em; }
                .prose ul li::before { content: ""; position: absolute; left: -0.6em; top: 0.6em; width: 4px; height: 4px; border-radius: 50%; background: #2178C7; }
                .prose ol li::marker { color: #2178C7; font-weight: 600; }
                .prose li { margin-bottom: 0.3em; }
                .prose img { border-radius: 0.625rem; margin: 1.5em auto; }
                .prose hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5em 0; }
              `}</style>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview.content}</ReactMarkdown>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#2178C7]">
                <ArrowLeft size={10} />
                Back to all articles
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ───────────────────────────────────
   Main Admin Page Component
   ─────────────────────────────────── */
export default function AdminBlogPage() {
  const [secretKey, setSecretKey] = useState("")
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // CRUD state
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [posts, setPosts] = useState<BlogPostItem[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [isDeletingSlug, setIsDeletingSlug] = useState<string | null>(null)

  // Form state
  const [form, setForm] = useState<BlogFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugLocked, setSlugLocked] = useState(false)

  /* ── Auth persistence ── */
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedToken) setAuthToken(storedToken)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (authToken) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, authToken)
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [authToken])

  /* ── Fetch posts ── */
  const fetchPosts = useCallback(async () => {
    if (!authToken) return
    setIsLoadingPosts(true)
    try {
      const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
      if (!authServiceUrl) throw new Error("Auth service URL not configured")
      const res = await fetch(`${authServiceUrl.replace(/\/$/, "")}/blogs`, {
        headers: { Accept: "application/json" },
      })
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Failed to fetch posts", error)
      toast.error("Failed to load blog posts.")
    } finally {
      setIsLoadingPosts(false)
    }
  }, [authToken])

  useEffect(() => {
    if (authToken) fetchPosts()
  }, [authToken, fetchPosts])

  /* ── Preview ── */
  const preview = useMemo<PreviewState>(() => {
    const dateDisplay = form.date
      ? new Date(form.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const slugForPreview = (form.slug ? slugify(form.slug) : slugify(form.title)) || "your-next-post"
    const authorDisplay = form.author.trim() || "Perceptron Team"
    const content = form.content || "## Start writing\n\nUse the editor to craft your markdown content."
    return { ...form, authorDisplay, dateDisplay, slugForPreview, content }
  }, [form])

  /* ── Filtered posts ── */
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts
    const q = searchQuery.toLowerCase()
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    )
  }, [posts, searchQuery])

  /* ── Form helpers ── */
  function resetForm() {
    setForm(initialFormState)
    setSlugLocked(false)
    setEditingSlug(null)
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({ ...prev, title: value }))
    if (!slugLocked) {
      setForm((prev) => ({ ...prev, slug: slugify(value) }))
    }
  }

  function handleSlugChange(value: string) {
    setSlugLocked(true)
    setForm((prev) => ({ ...prev, slug: slugify(value) }))
  }

  function startCreate() {
    resetForm()
    setViewMode("create")
  }

  function startEdit(post: BlogPostItem) {
    setForm({
      title: post.title,
      slug: post.slug,
      author: post.author || "",
      date: post.date ? parseDateToInput(post.date) : "",
      excerpt: post.excerpt || "",
      image: post.image || "",
      content: post.content || "",
    })
    setSlugLocked(true)
    setEditingSlug(post.slug)
    setViewMode("edit")
  }

  function parseDateToInput(dateStr: string): string {
    const d = new Date(dateStr)
    if (Number.isNaN(d.getTime())) return ""
    return d.toISOString().split("T")[0]
  }

  function goBack() {
    setViewMode("list")
    resetForm()
  }

  /* ── Auth ── */
  async function handleAuthenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isAuthenticating) return

    const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
    if (!authServiceUrl) {
      toast.error("Authentication service URL is not configured.")
      return
    }

    const normalizedSecret = secretKey.trim()
    if (!normalizedSecret) {
      toast.error("Enter the secret key before continuing.")
      return
    }

    try {
      setIsAuthenticating(true)
      const response = await fetch(`${authServiceUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey: normalizedSecret }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || "Authentication failed.")
      }

      const payload = (await response.json()) as { token?: string }
      if (!payload.token) throw new Error("Authentication payload missing token.")

      setAuthToken(payload.token)
      setSecretKey("")
      toast.success("Authenticated successfully.")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed."
      toast.error(message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  /* ── Create / Update ── */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!authToken || isSubmitting) return

    const derivedSlug = form.slug ? slugify(form.slug) : slugify(form.title)
    if (!derivedSlug) {
      toast.error("Provide a title or slug for the post.")
      return
    }

    const payload = { ...form, slug: derivedSlug }

    try {
      setIsSubmitting(true)

      const isEditing = viewMode === "edit" && editingSlug
      const url = isEditing ? `/api/admin/blogs/${editingSlug}` : "/api/admin/blogs"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || `Failed to ${isEditing ? "update" : "create"} the blog post.`)
      }

      const { slug } = (await response.json()) as { slug: string }
      toast.success(`Post "${slug}" ${isEditing ? "updated" : "published"} successfully.`)
      resetForm()
      setViewMode("list")
      fetchPosts()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save the blog post."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Delete ── */
  async function handleDelete(slug: string) {
    if (!authToken) return

    try {
      setIsDeletingSlug(slug)
      const response = await fetch(`/api/admin/blogs/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || "Failed to delete the blog post.")
      }

      toast.success(`Post "${slug}" deleted.`)
      setDeleteConfirm(null)
      fetchPosts()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete the blog post."
      toast.error(message)
    } finally {
      setIsDeletingSlug(null)
    }
  }

  function handleLogout() {
    setAuthToken(null)
    setViewMode("list")
    resetForm()
    setPosts([])
    toast.info("Signed out.")
  }

  /* ── Input classes ── */
  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500"

  return (
    <main className="relative min-h-screen bg-[#0a0e1a] text-slate-100">
      <Toaster position="top-center" richColors />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#2178C7]/8 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-[#C26FCF]/6 blur-[120px]" />
      </div>

      <section className="relative z-10 px-6 py-8 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center shadow-lg shadow-[#2178C7]/20">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Blog Control Room</h1>
              <p className="text-xs text-slate-400">Manage, create, edit, and publish blog posts</p>
            </div>
          </div>
          {authToken && (
            <div className="flex items-center gap-3">
              {viewMode === "list" && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2178C7] to-[#53C5E6] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#2178C7]/25"
                >
                  <Plus size={14} /> New Post
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </header>

        {/* ── AUTH GATE ── */}
        {!authToken ? (
          <div className="mx-auto max-w-md mt-20">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#2178C7]/10 border border-[#2178C7]/20 flex items-center justify-center">
                  <Shield size={18} className="text-[#53C5E6]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Authentication Required</h2>
                  <p className="text-xs text-slate-400">Enter the shared secret to unlock authoring</p>
                </div>
              </div>
              <form className="space-y-5" onSubmit={handleAuthenticate}>
                <div className="space-y-1.5">
                  <label htmlFor="secret" className="text-xs font-medium text-slate-300">Secret key</label>
                  <input
                    id="secret"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter the agreed passphrase"
                    className={inputCls}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2178C7] to-[#53C5E6] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#2178C7]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAuthenticating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                  {isAuthenticating ? "Verifying..." : "Unlock authoring"}
                </button>
              </form>
            </div>
          </div>
        ) : viewMode === "list" ? (
          /* ── POST LIST ── */
          <div>
            {/* Search bar */}
            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts by title, slug, or author..."
                  className={`${inputCls} pl-10`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {isLoadingPosts ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#53C5E6]" />
                <span className="ml-3 text-sm text-slate-400">Loading posts...</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <FileText size={40} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400 text-sm">
                  {searchQuery ? "No posts match your search." : "No blog posts yet. Create your first one!"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={startCreate}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2178C7] to-[#53C5E6] px-5 py-2 text-sm font-semibold text-white"
                  >
                    <Plus size={14} /> Create Post
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-slate-500 mb-2">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
                </div>
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="group relative rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 p-4">
                      {/* Thumbnail */}
                      <div className="hidden sm:block w-20 h-14 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                        {post.image && !post.image.toLowerCase().includes("placeholder") ? (
                          isVideoUrl(post.image) ? (
                            <img
                              src={getVideoThumbnail(post.image) || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText size={16} className="text-slate-600" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate mb-1">{post.title}</h3>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span className="font-mono text-slate-600">/{post.slug}</span>
                          {post.date && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <span>{post.date}</span>
                            </>
                          )}
                          {post.author && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <span>{post.author}</span>
                            </>
                          )}
                        </div>
                        {post.excerpt && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-slate-500 hover:text-[#53C5E6] hover:bg-white/5 transition-all"
                          title="View post"
                        >
                          <Eye size={15} />
                        </a>
                        <button
                          onClick={() => startEdit(post)}
                          className="p-2 rounded-lg text-slate-500 hover:text-[#F1B646] hover:bg-white/5 transition-all"
                          title="Edit post"
                        >
                          <Edit3 size={15} />
                        </button>
                        {deleteConfirm === post.slug ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(post.slug)}
                              disabled={isDeletingSlug === post.slug}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                            >
                              {isDeletingSlug === post.slug ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 rounded-lg text-[11px] text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(post.slug)}
                            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-all"
                            title="Delete post"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── CREATE / EDIT VIEW ── */
          <div>
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <ArrowLeft size={14} /> Back to posts
              </button>
              <div className="h-5 w-px bg-white/10" />
              <span className="text-sm font-semibold text-white">
                {viewMode === "edit" ? `Editing: ${editingSlug}` : "New Post"}
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Left — Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-5">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label htmlFor="title" className="text-xs font-medium text-slate-300">Title</label>
                    <input
                      id="title"
                      type="text"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Building production ML systems"
                      className={inputCls}
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label htmlFor="slug" className="text-xs font-medium text-slate-300">Slug</label>
                    <input
                      id="slug"
                      type="text"
                      value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="building-production-ml-systems"
                      className={`${inputCls} font-mono text-xs`}
                    />
                    <p className="text-[10px] text-slate-500">URL: /blog/{form.slug || "your-post-slug"}</p>
                  </div>

                  {/* Author / Date / Media */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <label htmlFor="author" className="text-xs font-medium text-slate-300">Author</label>
                      <input
                        id="author"
                        type="text"
                        value={form.author}
                        onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                        placeholder="Perceptron Team"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="date" className="text-xs font-medium text-slate-300">Publish date</label>
                      <input
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="image" className="text-xs font-medium text-slate-300">Hero Media URL</label>
                      <input
                        id="image"
                        type="url"
                        value={form.image}
                        onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                        placeholder="Image or video URL"
                        className={inputCls}
                      />
                      <p className="text-[10px] text-slate-500">Image or YouTube/Vimeo/mp4 link</p>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5">
                    <label htmlFor="excerpt" className="text-xs font-medium text-slate-300">Excerpt</label>
                    <textarea
                      id="excerpt"
                      value={form.excerpt}
                      onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                      rows={2}
                      placeholder="Summarise the key insight readers should take away."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5">
                    <label htmlFor="content" className="text-xs font-medium text-slate-300">Markdown content</label>
                    <textarea
                      id="content"
                      value={form.content}
                      onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                      rows={16}
                      placeholder={"# Headline\n\nIntroduce your topic and inspire readers."}
                      className={`${inputCls} font-mono resize-y`}
                    />
                    <p className="text-[10px] text-slate-500">GitHub-flavoured markdown with code blocks and tables.</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2178C7] to-[#53C5E6] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#2178C7]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {isSubmitting ? "Saving..." : viewMode === "edit" ? "Update Post" : "Publish"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Right — Live Preview */}
              <aside className="relative">
                <div className="sticky top-6 flex h-[calc(100vh-6rem)] flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">Live preview</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 tracking-wider">/blog/{preview.slugForPreview}</span>
                  </div>
                  <BlogPostPreview preview={preview} />
                </div>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
