"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Toaster, toast } from "sonner"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Save,
  Shield,
  Sparkles,
  User,
} from "lucide-react"

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

const AUTH_STORAGE_KEY = "perceptronBlogAuthToken"

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

interface PreviewState extends BlogFormState {
  authorDisplay: string
  dateDisplay: string
  slugForPreview: string
  content: string
}

/* ─────────────────────────────────────────────
   Preview — exact replica of blog-post-client
   ───────────────────────────────────────────── */
function BlogPostPreview({ preview }: { preview: PreviewState }) {
  const hasHeroMedia = Boolean(preview.image && !preview.image.toLowerCase().includes("placeholder"))
  const isVideo = hasHeroMedia && /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(preview.image)
  const readingTime = Math.max(1, Math.ceil((preview.content?.length || 0) / 1200))

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
      <div className="relative z-10 flex-1 overflow-y-auto">
        {/* ── Dark hero — mirrors blog-post-client ── */}
        <div className="relative min-h-[340px] flex items-end overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
              style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2178C7]/15 via-transparent to-white/80" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Hero content — two column */}
          <div className="relative z-10 w-full px-6 pt-10 pb-16">
            <div className={`grid ${hasHeroMedia ? "grid-cols-2 gap-6" : "grid-cols-1"} items-center`}>
              {/* Left — Copy */}
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/50 text-xs">Blog</span>
                  <ChevronRight size={10} className="text-white/30" />
                  <span className="text-[#53C5E6] text-xs font-medium line-clamp-1">
                    {preview.title || "Untitled"}
                  </span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2178C7]/30 bg-[#2178C7]/10 text-[#53C5E6] text-[10px] font-medium mb-5">
                  <BookOpen size={10} />
                  Insight
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3 leading-[1.15]">
                  {preview.title || "Untitled blog post"}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-white/60 mb-5 leading-relaxed line-clamp-3">
                  {preview.excerpt || "Explore key insights from our research and engineering teams."}
                </p>

                {/* Meta pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px]">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center">
                      <User size={8} className="text-white" />
                    </div>
                    <span className="font-medium">{preview.authorDisplay}</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px]">
                    <Calendar size={10} />
                    <span>{preview.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px]">
                    <Clock size={10} />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Right — Hero Media */}
              {hasHeroMedia && (
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-[#2178C7]/10">
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
                      <img
                        src={preview.image}
                        alt={preview.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
        </div>

        {/* ── Content section — mirrors blog-post-client prose ── */}
        <section className="relative bg-white py-8 text-slate-900">
          <div className="relative z-10 mx-auto w-full max-w-none px-6">
            <div className="prose prose-sm max-w-none">
              <style>{`
                .prose {
                  --tw-prose-body: #374151;
                  --tw-prose-headings: #111827;
                  --tw-prose-links: #2178C7;
                  --tw-prose-bold: #1f2937;
                  --tw-prose-bullets: #2178C7;
                  --tw-prose-quotes: #111827;
                  --tw-prose-quote-borders: #2178C7;
                  --tw-prose-code: #111827;
                  --tw-prose-pre-code: #e5e7eb;
                  --tw-prose-pre-bg: #0f172a;
                  font-size: 0.875rem;
                  line-height: 1.8;
                  color: #374151;
                }
                .prose h1, .prose h2, .prose h3, .prose h4,
                .prose h5, .prose h6 {
                  font-weight: 700;
                  letter-spacing: -0.025em;
                  color: #111827;
                }
                .prose h1 { font-size: 1.75rem; line-height: 1.2; margin-top: 2em; margin-bottom: 0.8em; }
                .prose h2 {
                  font-size: 1.375rem; line-height: 1.3; margin-top: 2em; margin-bottom: 0.8em;
                  padding-bottom: 0.4em; border-bottom: 2px solid #e5e7eb;
                }
                .prose h3 { font-size: 1.125rem; line-height: 1.4; margin-top: 1.5em; margin-bottom: 0.6em; }
                .prose p { margin-bottom: 1.25em; line-height: 1.8; }
                .prose a { color: #2178C7; text-decoration: none; font-weight: 500; border-bottom: 1px solid transparent; }
                .prose a:hover { color: #1a62a1; border-bottom-color: #2178C7; }
                .prose strong { font-weight: 650; color: #1f2937; }
                .prose code {
                  background-color: #f3f4f6; color: #c026d3; padding: 0.15em 0.4em;
                  border-radius: 0.3rem; font-family: "Geist Mono", "Fira Code", ui-monospace, monospace;
                  font-size: 0.85em; font-weight: 500;
                }
                .prose pre {
                  background: #0f172a; border: 1px solid #1e293b; border-radius: 0.75rem;
                  padding: 1.25em; overflow-x: auto; margin: 1.5em 0;
                }
                .prose pre code { background-color: transparent; color: #e2e8f0; padding: 0; border: none; font-size: 0.85em; line-height: 1.7; }
                .prose blockquote {
                  border-left: 3px solid #2178C7; padding: 0.75em 1.25em; color: #374151;
                  font-style: italic; background: #f8fafc; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5em 0;
                }
                .prose blockquote p { margin: 0; }
                .prose ul, .prose ol { margin-bottom: 1.25em; padding-left: 1.25em; }
                .prose ul { list-style-type: none; }
                .prose ul li { position: relative; padding-left: 0.75em; }
                .prose ul li::before {
                  content: ""; position: absolute; left: -0.75em; top: 0.65em;
                  width: 5px; height: 5px; border-radius: 50%; background: #2178C7;
                }
                .prose ol li { padding-left: 0.25em; }
                .prose ol li::marker { color: #2178C7; font-weight: 600; }
                .prose li { margin-bottom: 0.4em; line-height: 1.75; }
                .prose img { border-radius: 0.75rem; margin: 2em auto; box-shadow: 0 8px 30px -8px rgba(0,0,0,0.1); }
                .prose table { border-collapse: collapse; width: 100%; margin: 1.5em 0; border-radius: 0.5rem; overflow: hidden; border: 1px solid #e5e7eb; }
                .prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.6em 1em; text-align: left; }
                .prose th { background: #f9fafb; font-weight: 600; color: #111827; text-transform: uppercase; font-size: 0.75em; letter-spacing: 0.05em; }
                .prose hr { border: none; border-top: 1px solid #e5e7eb; margin: 2em 0; }
              `}</style>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview.content}</ReactMarkdown>
            </div>

            {/* Back link */}
            <div className="mt-10 pt-6 border-t border-slate-200">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2178C7]">
                <ArrowLeft size={12} />
                Back to all articles
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function AdminBlogPage() {
  const [secretKey, setSecretKey] = useState("")
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [form, setForm] = useState<BlogFormState>(initialFormState)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugLocked, setSlugLocked] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedToken) {
      setAuthToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (authToken) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, authToken)
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [authToken])

  const preview = useMemo<PreviewState>(() => {
    const dateDisplay = form.date
      ? new Date(form.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

    const slugForPreview = (form.slug ? slugify(form.slug) : slugify(form.title)) || "your-next-post"
    const authorDisplay = form.author.trim() || "Perceptron Team"
    const content =
      form.content || "## Start writing your next post\n\nUse the editor on the left to craft your markdown content."

    return {
      ...form,
      authorDisplay,
      dateDisplay,
      slugForPreview,
      content,
    }
  }, [form])

  function resetForm() {
    setForm(initialFormState)
    setSlugLocked(false)
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
      if (!payload.token) {
        throw new Error("Authentication payload missing token.")
      }

      setAuthToken(payload.token)
      setSecretKey("")
      toast.success("Secret verified. You can author new posts now.")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed."
      toast.error(message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!authToken) {
      toast.error("Authenticate with the secret key first.")
      return
    }
    if (isSubmitting) return

    const derivedSlug = form.slug ? slugify(form.slug) : slugify(form.title)
    if (!derivedSlug) {
      toast.error("Provide a title or slug for the post.")
      return
    }

    const payload = {
      ...form,
      slug: derivedSlug,
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || "Unable to save the blog post.")
      }

  const { slug } = (await response.json()) as { slug: string }
  toast.success(`Blog post saved as ${slug}`)
      resetForm()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save the blog post."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleLogout() {
    setAuthToken(null)
    toast.info("Signed out of authoring mode.")
  }

  return (
    <main className="relative min-h-screen bg-[#0a0e1a] text-slate-100">
      <Toaster position="top-center" richColors />

      {/* Background effects */}
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

      <section className="relative z-10 px-6 py-10 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center shadow-lg shadow-[#2178C7]/20">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Blog Control Room</h1>
              <p className="text-xs text-slate-400">Draft, preview, and publish markdown-powered posts</p>
            </div>
          </div>
          {authToken && (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={14} /> Sign out
            </button>
          )}
        </header>

        {!authToken ? (
          /* ── Auth gate ── */
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
                  <label htmlFor="secret" className="text-xs font-medium text-slate-300">
                    Secret key
                  </label>
                  <input
                    id="secret"
                    type="password"
                    value={secretKey}
                    onChange={(event) => setSecretKey(event.target.value)}
                    placeholder="Enter the agreed passphrase"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500"
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
        ) : (
          /* ── Editor + Preview grid ── */
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Left — Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="title" className="text-xs font-medium text-slate-300">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="Building production ML systems"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label htmlFor="slug" className="text-xs font-medium text-slate-300">
                    Slug
                  </label>
                  <input
                    id="slug"
                    type="text"
                    value={form.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    placeholder="building-production-ml-systems"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500 font-mono text-xs"
                  />
                  <p className="text-[10px] text-slate-500">URL path: /blog/{form.slug || "your-post-slug"}</p>
                </div>

                {/* Author / Date / Media — 3-col */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label htmlFor="author" className="text-xs font-medium text-slate-300">
                      Author
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={form.author}
                      onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
                      placeholder="Perceptron Team"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="date" className="text-xs font-medium text-slate-300">
                      Publish date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="image" className="text-xs font-medium text-slate-300">
                      Hero Media URL
                    </label>
                    <input
                      id="image"
                      type="url"
                      value={form.image}
                      onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                      placeholder="Image or video URL"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 placeholder:text-slate-500"
                    />
                    <p className="text-[10px] text-slate-500">Image or YouTube/Vimeo/mp4 link</p>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                  <label htmlFor="excerpt" className="text-xs font-medium text-slate-300">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                    rows={2}
                    placeholder="Summarise the key insight readers should take away."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 resize-none placeholder:text-slate-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label htmlFor="content" className="text-xs font-medium text-slate-300">
                    Markdown content
                  </label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
                    rows={16}
                    placeholder={"# Headline\n\nIntroduce your topic and inspire readers."}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-mono text-slate-100 outline-none transition-all duration-300 focus:border-[#2178C7]/50 focus:ring-1 focus:ring-[#2178C7]/30 resize-y placeholder:text-slate-500"
                  />
                  <p className="text-[10px] text-slate-500">Supports GitHub-flavoured markdown including code blocks and tables.</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  >
                    Clear draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2178C7] to-[#53C5E6] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#2178C7]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {isSubmitting ? "Saving..." : "Publish"}
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
        )}
      </section>
    </main>
  )
}
