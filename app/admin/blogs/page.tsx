"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Navigation from "@/components/navigation"
import { validateAdminKey, createBlogPost } from "@/app/admin/actions"

export default function AdminBlogsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [authError, setAuthError] = useState("")

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("Rohan Mainali")
  const [excerpt, setExcerpt] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [scrollY, setScrollY] = useState(0)

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")

    try {
      const result = await validateAdminKey(secretKey)
      if (result.success) {
        setIsAuthenticated(true)
        setSecretKey("")
      } else {
        setAuthError("Invalid secret key")
      }
    } catch (error) {
      setAuthError("Authentication failed")
    }
  }

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitMessage("")

    if (!title || !excerpt || !content) {
      setSubmitError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createBlogPost({
        title,
        author,
        excerpt,
        image,
        content,
      })

      if (result.success) {
        setSubmitMessage("Blog post created successfully!")
        setTitle("")
        setAuthor("Rohan Mainali")
        setExcerpt("")
        setImage("")
        setContent("")

        setTimeout(() => {
          router.push("/blog")
        }, 2000)
      } else {
        setSubmitError(result.error || "Failed to create blog post")
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigation scrollY={scrollY} />
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
              <h1 className="text-3xl font-bold text-white mb-2 text-center">Admin Access</h1>
              <p className="text-slate-400 text-center mb-6">Enter the secret key to create blog posts</p>

              <form onSubmit={handleAuthenticate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Secret Key</label>
                  <input
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter secret key"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {authError && <p className="text-red-400 text-sm">{authError}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                >
                  Authenticate
                </button>
              </form>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation scrollY={scrollY} />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Blog Post</h1>
          <p className="text-slate-400 mb-8">Write and preview your blog post in real-time</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            <div className="space-y-6">
              <form onSubmit={handleSubmitBlog} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog post title"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt *</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/image-name.jpg"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown) *</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content in markdown..."
                    rows={15}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
                  />
                </div>

                {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
                {submitMessage && <p className="text-green-400 text-sm">{submitMessage}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                </button>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 h-fit sticky top-32">
              <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
              <div className="space-y-4">
                {title && (
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {title}
                    </h3>
                  </div>
                )}

                {(author || excerpt) && (
                  <div className="text-sm text-slate-400 space-y-1">
                    {author && <p>By {author}</p>}
                    {excerpt && <p className="italic">{excerpt}</p>}
                  </div>
                )}

                {image && (
                  <div className="my-4">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Blog preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/blog-image.jpg"
                      }}
                    />
                  </div>
                )}

                {content && (
                  <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-xl font-bold text-white mt-4 mb-2" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-lg font-bold text-white mt-3 mb-2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-base font-bold text-white mt-2 mb-1" {...props} />
                        ),
                        p: ({ node, ...props }) => <p className="text-slate-300 mb-2 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-inside text-slate-300 mb-2 space-y-1" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal list-inside text-slate-300 mb-2 space-y-1" {...props} />
                        ),
                        li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code
                              className="bg-slate-700 px-2 py-1 rounded text-cyan-400 font-mono text-xs"
                              {...props}
                            />
                          ) : (
                            <code
                              className="block bg-slate-700 p-3 rounded-lg text-cyan-400 font-mono text-xs overflow-x-auto mb-2"
                              {...props}
                            />
                          ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-blue-500 pl-4 italic text-slate-300 my-2"
                            {...props}
                          />
                        ),
                        table: ({ node, ...props }) => (
                          <table className="w-full border-collapse text-sm mb-2" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="border border-slate-600 px-2 py-1 bg-slate-700 text-white" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="border border-slate-600 px-2 py-1 text-slate-300" {...props} />
                        ),
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                )}

                {!content && <p className="text-slate-500 italic">Start writing to see preview...</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
