"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getBlogPost, type BlogPost } from "@/lib/blog-posts"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [scrollY, setScrollY] = useState(0)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const blogPost = getBlogPost(slug)
    setPost(blogPost || null)
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <main className="relative overflow-hidden bg-background">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <Navigation scrollY={scrollY} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="mt-4 text-foreground/70">Loading post...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="relative overflow-hidden bg-background">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <Navigation scrollY={scrollY} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-foreground/70">Post not found</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Navigation scrollY={scrollY} />

      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 border border-border">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Title and Metadata */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-foreground/70 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{post.author}</span>
              </div>
            </div>

            <p className="text-xl text-foreground/80 leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <style>{`
              .prose {
                --tw-prose-body: var(--foreground);
                --tw-prose-headings: var(--foreground);
                --tw-prose-lead: var(--foreground);
                --tw-prose-links: var(--primary);
                --tw-prose-bold: var(--foreground);
                --tw-prose-counters: var(--foreground);
                --tw-prose-bullets: var(--primary);
                --tw-prose-hr: var(--border);
                --tw-prose-quotes: var(--foreground);
                --tw-prose-quote-borders: var(--primary);
                --tw-prose-captions: var(--foreground);
                --tw-prose-code: var(--foreground);
                --tw-prose-pre-code: var(--foreground);
                --tw-prose-pre-bg: var(--card);
                --tw-prose-th-borders: var(--border);
                --tw-prose-td-borders: var(--border);
              }

              .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                color: var(--foreground);
                font-weight: 700;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }

              .prose h1 {
                font-size: 2.25em;
              }

              .prose h2 {
                font-size: 1.875em;
                border-bottom: 2px solid var(--primary);
                padding-bottom: 0.5em;
              }

              .prose h3 {
                font-size: 1.5em;
              }

              .prose p {
                margin-bottom: 1em;
                line-height: 1.75;
              }

              .prose a {
                color: var(--primary);
                text-decoration: underline;
                transition: color 0.2s;
              }

              .prose a:hover {
                color: var(--secondary);
              }

              .prose code {
                background-color: var(--card);
                color: var(--secondary);
                padding: 0.2em 0.4em;
                border-radius: 0.25em;
                font-family: 'Geist Mono', monospace;
              }

              .prose pre {
                background-color: var(--card);
                border: 1px solid var(--border);
                border-radius: 0.5em;
                padding: 1em;
                overflow-x: auto;
              }

              .prose pre code {
                background-color: transparent;
                color: var(--foreground);
                padding: 0;
              }

              .prose blockquote {
                border-left: 4px solid var(--primary);
                padding-left: 1em;
                color: var(--foreground);
                font-style: italic;
              }

              .prose ul, .prose ol {
                margin-bottom: 1em;
                padding-left: 2em;
              }

              .prose li {
                margin-bottom: 0.5em;
              }

              .prose img {
                border-radius: 0.5em;
                border: 1px solid var(--border);
                margin: 1.5em 0;
              }

              .prose table {
                border-collapse: collapse;
                width: 100%;
                margin: 1.5em 0;
              }

              .prose th, .prose td {
                border: 1px solid var(--border);
                padding: 0.75em;
                text-align: left;
              }

              .prose th {
                background-color: var(--card);
                font-weight: 700;
              }
            `}</style>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </motion.div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                More Articles
              </span>
            </h2>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              >
                View All Posts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
