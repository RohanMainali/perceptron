"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [scrollY, setScrollY] = useState(0)
  const hasHeroImage = Boolean(post.image && !post.image.toLowerCase().includes("placeholder"))

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        </div>

  <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-5 lg:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div
              className={`grid gap-10 lg:gap-14 ${
                hasHeroImage ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,560px)] items-start" : ""
              }`}
            >
              <motion.div
                className={`${
                  hasHeroImage ? "text-left" : "text-center max-w-3xl mx-auto"
                } space-y-6 bg-background/40 rounded-3xl border border-border/80 p-8 shadow-lg shadow-primary/5 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/70">
                  Insight
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    {post.title}
                  </span>
                </h1>

                <div
                  className={`flex flex-wrap gap-4 text-sm text-foreground/70 ${
                    hasHeroImage ? "justify-start" : "justify-center"
                  }`}
                >
                  <div className="flex items-center gap-2 bg-card/40 px-3 py-2 rounded-full border border-border/60">
                    <Calendar size={18} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card/40 px-3 py-2 rounded-full border border-border/60">
                    <User size={18} />
                    <span>{post.author || "Perceptron Team"}</span>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {post.excerpt || "Explore key insights from our research and engineering teams."}
                </p>
              </motion.div>

              {hasHeroImage && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5 blur-3xl" />
                  <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl shadow-primary/15">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-secondary/8 blur-3xl" />
          <div className="absolute -bottom-40 left-10 w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 sm:px-8 lg:px-12">
          <motion.div
            className="prose prose-lg max-w-none text-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
