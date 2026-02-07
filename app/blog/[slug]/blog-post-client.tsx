"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
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
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200))

  return (
    <main className="relative overflow-hidden bg-background">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[60]"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #2178C7, #53C5E6, #C26FCF)",
        }}
      />

      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              background: ["#53C5E6", "#C26FCF", "#F1B646", "#2178C7"][i % 4],
              opacity: 0.4,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#53C5E6] transition-colors mb-8 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.span
              className="inline-block text-xs uppercase tracking-[0.3em] text-[#53C5E6] font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Insight
            </motion.span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Calendar size={14} className="text-[#53C5E6]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <User size={14} className="text-[#C26FCF]" />
                <span>{post.author || "Perceptron Team"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Clock size={14} className="text-[#F1B646]" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
              {post.excerpt || "Explore key insights from our research and engineering teams."}
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Hero Image (below hero, in white area) */}
      {hasHeroImage && (
        <section className="relative bg-white -mt-16 z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full aspect-[21/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Content Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 sm:px-8 lg:px-12">
          <motion.div
            className="prose prose-lg max-w-none text-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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

      <Footer />
    </main>
  )
}
