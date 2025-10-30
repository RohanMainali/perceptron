"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Toaster, toast } from "sonner"
import { Calendar, Eye, Loader2, LogOut, Save, Shield, User } from "lucide-react"

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

interface PreviewState extends BlogFormState {
  authorDisplay: string
  dateDisplay: string
  slugForPreview: string
  content: string
}

function BlogPostPreview({ preview }: { preview: PreviewState }) {
  const hasHeroImage = Boolean(preview.image && !preview.image.toLowerCase().includes("placeholder"))

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-black text-slate-100 shadow-2xl shadow-primary/10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto">
        <section className="relative overflow-hidden pt-16 pb-14 sm:pt-20 sm:pb-20">
          <div className="absolute inset-0 opacity-100">
            <div className="absolute inset-0 bg-black" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-10">
              <div className="space-y-6 rounded-3xl border border-white/15 bg-black/70 p-8 shadow-xl shadow-primary/20 backdrop-blur">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/70">
                  Insight
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    {preview.title || "Untitled blog post"}
                  </span>
                </h2>

                <div className="flex flex-wrap justify-start gap-4 text-sm text-slate-200">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 py-2">
                    <Calendar size={18} />
                    <span>{preview.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 py-2">
                    <User size={18} />
                    <span>{preview.authorDisplay}</span>
                  </div>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-slate-200/80">
                  {preview.excerpt || "Craft a concise summary to entice readers."}
                </p>
              </div>

              {hasHeroImage && (
                <div className="relative mx-auto w-full max-w-3xl">
                  <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/15 to-primary/10 blur-3xl" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-primary/20">
                    <img src={preview.image} alt="Preview hero" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-slate-900 bg-white py-12 text-slate-900 md:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 sm:px-8 lg:px-12">
            <div className="prose prose-lg max-w-none text-slate-700">
              <style>{`
                .prose {
                  --tw-prose-body: #334155;
                  --tw-prose-headings: #0f172a;
                  --tw-prose-lead: #475569;
                  --tw-prose-links: var(--primary);
                  --tw-prose-bold: #1e293b;
                  --tw-prose-counters: #475569;
                  --tw-prose-bullets: var(--primary);
                  --tw-prose-hr: #cbd5e1;
                  --tw-prose-quotes: #1e293b;
                  --tw-prose-quote-borders: var(--primary);
                  --tw-prose-captions: #64748b;
                  --tw-prose-code: #0f172a;
                  --tw-prose-pre-code: #e2e8f0;
                  --tw-prose-pre-bg: #0f172a;
                  --tw-prose-th-borders: #cbd5e1;
                  --tw-prose-td-borders: #e2e8f0;
                  font-size: 1.0625rem;
                  line-height: 1.85;
                }

                .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                  font-weight: 700;
                  margin-top: 2em;
                  margin-bottom: 0.85em;
                  letter-spacing: -0.02em;
                }

                .prose h1 {
                  font-size: clamp(2.5rem, 4vw, 3.5rem);
                  line-height: 1.15;
                }

                .prose h2 {
                  font-size: clamp(1.875rem, 3vw, 2.5rem);
                  border-bottom: 3px solid var(--primary);
                  padding-bottom: 0.6em;
                  margin-bottom: 1.25em;
                  line-height: 1.25;
                }

                .prose h3 {
                  font-size: clamp(1.5rem, 2.25vw, 1.875rem);
                  line-height: 1.35;
                }

                .prose h4 {
                  font-size: clamp(1.25rem, 1.75vw, 1.5rem);
                }

                .prose p {
                  margin-bottom: 1.5em;
                  line-height: 1.85;
                }

                .prose a {
                  color: var(--primary);
                  text-decoration: none;
                  border-bottom: 1px solid rgba(100, 200, 255, 0.3);
                  transition: all 0.2s ease;
                }

                .prose a:hover {
                  color: var(--secondary);
                  border-bottom-color: var(--secondary);
                }

                .prose strong {
                  font-weight: 600;
                  color: #1e293b;
                }

                .prose code {
                  background-color: #f1f5f9;
                  color: var(--secondary);
                  padding: 0.25em 0.5em;
                  border-radius: 0.375rem;
                  font-family: "Geist Mono", "Fira Code", monospace;
                  font-size: 0.9em;
                  font-weight: 500;
                  border: 1px solid rgba(148, 163, 184, 0.2);
                }

                .prose pre {
                  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.92));
                  border: 1px solid rgba(100, 116, 139, 0.3);
                  border-radius: 1rem;
                  padding: 1.75em;
                  overflow-x: auto;
                  box-shadow: 0 20px 50px -15px rgba(15, 23, 42, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
                  margin: 2em 0;
                }

                .prose pre code {
                  background-color: transparent;
                  color: #e2e8f0;
                  padding: 0;
                  border: none;
                  font-size: 0.95em;
                  line-height: 1.7;
                }

                .prose blockquote {
                  border-left: 5px solid var(--primary);
                  padding: 1.25em 1.75em;
                  color: #1e293b;
                  font-style: italic;
                  background: linear-gradient(to right, rgba(100, 200, 255, 0.08), rgba(148, 163, 184, 0.06));
                  border-radius: 0.75rem;
                  margin: 2em 0;
                  font-size: 1.05em;
                }

                .prose blockquote p {
                  margin: 0;
                }

                .prose ul, .prose ol {
                  margin-bottom: 1.5em;
                  padding-left: 2em;
                }

                .prose ul {
                  list-style-type: none;
                }

                .prose ul li {
                  position: relative;
                  padding-left: 0.5em;
                }

                .prose ul li::before {
                  content: "→";
                  position: absolute;
                  left: -1.5em;
                  color: var(--primary);
                  font-weight: 700;
                }

                .prose ol li {
                  padding-left: 0.5em;
                }

                .prose li {
                  margin-bottom: 0.75em;
                  line-height: 1.75;
                }

                .prose img {
                  border-radius: 1rem;
                  border: 1px solid rgba(148, 163, 184, 0.3);
                  margin: 2.5em 0;
                  box-shadow: 0 25px 50px -15px rgba(15, 23, 42, 0.25);
                }

                .prose table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 2em 0;
                  border-radius: 0.875rem;
                  overflow: hidden;
                  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.1);
                  border: 1px solid rgba(148, 163, 184, 0.3);
                }

                .prose th, .prose td {
                  border: 1px solid rgba(203, 213, 225, 0.6);
                  padding: 1em 1.25em;
                  text-align: left;
                }

                .prose th {
                  background: linear-gradient(to bottom, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.8));
                  font-weight: 700;
                  color: #0f172a;
                  text-transform: uppercase;
                  font-size: 0.825em;
                  letter-spacing: 0.05em;
                }

                .prose td {
                  background-color: rgba(255, 255, 255, 0.5);
                }

                .prose tbody tr:hover td {
                  background-color: rgba(241, 245, 249, 0.7);
                }

                .prose hr {
                  border: none;
                  border-top: 2px solid rgba(203, 213, 225, 0.6);
                  margin: 3em 0;
                }
              `}</style>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview.content}</ReactMarkdown>
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
      toast.success(`Blog post saved as ${slug}.md`)
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
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <Toaster position="top-center" richColors />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-80" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-[160px]" />
      </div>

      <section className="relative z-10 px-6 py-14 sm:px-10 lg:px-16">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-green-200">
              <Shield size={14} /> Secret Authoring
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog Control Room</h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Authenticate with the shared secret to create markdown-powered posts. Draft content on the left and watch the
              live preview update on the right before publishing.
            </p>
          </div>
          {authToken && (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/60 hover:text-white/80"
            >
              <LogOut size={16} /> Sign out
            </button>
          )}
        </header>

        {!authToken ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <form className="space-y-6" onSubmit={handleAuthenticate}>
              <div className="space-y-2">
                <label htmlFor="secret" className="text-sm font-medium text-slate-200">
                  Secret key
                </label>
                <input
                  id="secret"
                  type="password"
                  value={secretKey}
                  onChange={(event) => setSecretKey(event.target.value)}
                  placeholder="Enter the agreed passphrase"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAuthenticating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                {isAuthenticating ? "Verifying" : "Unlock authoring"}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium text-slate-200">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="Building production ML systems"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="slug" className="text-sm font-medium text-slate-200">
                    Slug
                  </label>
                  <input
                    id="slug"
                    type="text"
                    value={form.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    placeholder="building-production-ml-systems"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  />
                  <p className="text-xs text-slate-400">Slug controls the filename stored in the blog directory.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <label htmlFor="author" className="text-sm font-medium text-slate-200">
                      Author
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={form.author}
                      onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
                      placeholder="Perceptron Team"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium text-slate-200">
                      Publish date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="image" className="text-sm font-medium text-slate-200">
                      Hero image URL
                    </label>
                    <input
                      id="image"
                      type="url"
                      value={form.image}
                      onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                      placeholder="https://images.perceptron.ai/blog/hero.jpg"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="excerpt" className="text-sm font-medium text-slate-200">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                    rows={3}
                    placeholder="Summarise the key insight readers should take away."
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium text-slate-200">
                    Markdown content
                  </label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
                    rows={18}
                    placeholder={"# Headline\n\nIntroduce your topic and inspire readers."}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm font-mono text-slate-100 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  />
                  <p className="text-xs text-slate-400">Supports GitHub-flavoured markdown including code blocks and tables.</p>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/40 hover:text-white"
                  >
                    Clear draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {isSubmitting ? "Saving" : "Save to blog"}
                  </button>
                </div>
              </div>
            </form>

            <aside className="relative">
              <div className="sticky top-6 flex h-[80vh] flex-col gap-4">
                <div className="flex items-center justify-between pr-1 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4" />
                    Live preview
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">/blog/{preview.slugForPreview}</span>
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
