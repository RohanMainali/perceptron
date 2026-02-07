"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, ChevronUp, BookOpen, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogPostClientProps {
  post: BlogPost
}

function getEmbedUrl(url: string): string {
  if (/youtube\.com\/watch\?v=/.test(url)) {
    const id = new URL(url).searchParams.get("v")
    return `https://www.youtube.com/embed/${id}`
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

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const hasHeroMedia = Boolean(post.image && !post.image.toLowerCase().includes("placeholder"))
  const isVideo = hasHeroMedia && /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(post.image || "")

  const { scrollYProgress: globalProgress } = useScroll()
  const progressWidth = useTransform(globalProgress, [0, 1], ["0%", "100%"])

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(heroProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0])

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: 1 + (i % 3),
        delay: (i * 0.4) % 5,
        duration: 4 + (i % 4),
      })),
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200))

  return (
    <main className="relative overflow-hidden bg-white">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[60]"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #2178C7, #53C5E6, #C26FCF)",
        }}
      />

      <Navigation scrollY={scrollY} />

      {/* ── Dark parallax hero ── */}
      <div ref={heroRef} className="relative min-h-[75vh] flex items-end overflow-hidden">
        {/* Background layer */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-background/80" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#53C5E6]/30"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* Hero content — two-column: copy left, media right */}
        <motion.div
          className="relative z-10 w-full px-6 md:px-12 lg:px-16 pt-36 pb-28"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div>
              {/* Breadcrumb */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/blog" className="text-white/50 hover:text-white/80 transition-colors text-sm">
                  Blog
                </Link>
                <ChevronRight size={14} className="text-white/30" />
                <span className="text-[#53C5E6] text-sm font-medium line-clamp-1 max-w-xs">
                  {post.title}
                </span>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2178C7]/30 bg-[#2178C7]/10 text-[#53C5E6] text-sm font-medium mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <BookOpen size={14} />
                Insight
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                className="text-lg text-white/60 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {post.excerpt || "Explore key insights from our research and engineering teams."}
              </motion.p>

              {/* Meta pills */}
              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="font-medium">{post.author || "Perceptron Team"}</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-sm">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-sm">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                </div>
              </motion.div>
            </div>

            {/* Right — Hero Media */}
            {hasHeroMedia && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2178C7]/10">
                  {isVideo ? (
                    <iframe
                      src={getEmbedUrl(post.image!)}
                      title={post.title}
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom gradient fade to white */}
        <div className="absolute -bottom-0 left-0 right-0 h-25 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* ── Blog Content ── */}
      <section className="relative py-16 md:py-20 bg-white text-slate-900">
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-16">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <style>{`
              .prose {
                --tw-prose-body: #374151;
                --tw-prose-headings: #111827;
                --tw-prose-lead: #4b5563;
                --tw-prose-links: #2178C7;
                --tw-prose-bold: #1f2937;
                --tw-prose-counters: #6b7280;
                --tw-prose-bullets: #2178C7;
                --tw-prose-hr: #e5e7eb;
                --tw-prose-quotes: #111827;
                --tw-prose-quote-borders: #2178C7;
                --tw-prose-captions: #6b7280;
                --tw-prose-code: #111827;
                --tw-prose-pre-code: #e5e7eb;
                --tw-prose-pre-bg: #0f172a;
                --tw-prose-th-borders: #d1d5db;
                --tw-prose-td-borders: #e5e7eb;
                font-size: 1.125rem;
                line-height: 1.85;
                color: #374151;
              }

              .prose h1, .prose h2, .prose h3, .prose h4,
              .prose h5, .prose h6 {
                font-weight: 700;
                letter-spacing: -0.025em;
                color: #111827;
              }

              .prose h1 {
                font-size: 2.25rem;
                line-height: 1.2;
                margin-top: 2.5em;
                margin-bottom: 0.8em;
              }

              .prose h2 {
                font-size: 1.75rem;
                line-height: 1.3;
                margin-top: 2.5em;
                margin-bottom: 1em;
                padding-bottom: 0.5em;
                border-bottom: 2px solid #e5e7eb;
              }

              .prose h3 {
                font-size: 1.375rem;
                line-height: 1.4;
                margin-top: 2em;
                margin-bottom: 0.75em;
              }

              .prose p {
                margin-bottom: 1.5em;
                line-height: 1.85;
              }

              .prose a {
                color: #2178C7;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.2s ease;
                border-bottom: 1px solid transparent;
              }

              .prose a:hover {
                color: #1a62a1;
                border-bottom-color: #2178C7;
              }

              .prose strong {
                font-weight: 650;
                color: #1f2937;
              }

              .prose code {
                background-color: #f3f4f6;
                color: #c026d3;
                padding: 0.2em 0.45em;
                border-radius: 0.375rem;
                font-family: "Geist Mono", "Fira Code", ui-monospace, monospace;
                font-size: 0.875em;
                font-weight: 500;
              }

              .prose pre {
                background: #0f172a;
                border: 1px solid #1e293b;
                border-radius: 0.875rem;
                padding: 1.5em;
                overflow-x: auto;
                margin: 2em 0;
              }

              .prose pre code {
                background-color: transparent;
                color: #e2e8f0;
                padding: 0;
                border: none;
                font-size: 0.9em;
                line-height: 1.7;
              }

              .prose blockquote {
                border-left: 4px solid #2178C7;
                padding: 1em 1.5em;
                color: #374151;
                font-style: italic;
                background: #f8fafc;
                border-radius: 0 0.75rem 0.75rem 0;
                margin: 2em 0;
              }

              .prose blockquote p {
                margin: 0;
              }

              .prose ul, .prose ol {
                margin-bottom: 1.5em;
                padding-left: 1.5em;
              }

              .prose ul {
                list-style-type: none;
              }

              .prose ul li {
                position: relative;
                padding-left: 0.75em;
              }

              .prose ul li::before {
                content: "";
                position: absolute;
                left: -0.75em;
                top: 0.75em;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #2178C7;
              }

              .prose ol li {
                padding-left: 0.25em;
              }

              .prose ol li::marker {
                color: #2178C7;
                font-weight: 600;
              }

              .prose li {
                margin-bottom: 0.5em;
                line-height: 1.8;
              }

              .prose img {
                border-radius: 0.875rem;
                margin: 2.5em auto;
                box-shadow: 0 10px 40px -10px rgba(0,0,0,0.12);
              }

              .prose table {
                border-collapse: collapse;
                width: 100%;
                margin: 2em 0;
                border-radius: 0.75rem;
                overflow: hidden;
                border: 1px solid #e5e7eb;
              }

              .prose th, .prose td {
                border: 1px solid #e5e7eb;
                padding: 0.875em 1.25em;
                text-align: left;
              }

              .prose th {
                background: #f9fafb;
                font-weight: 600;
                color: #111827;
                text-transform: uppercase;
                font-size: 0.8em;
                letter-spacing: 0.05em;
              }

              .prose hr {
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 3em 0;
              }
            `}</style>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </motion.div>

          {/* Bottom divider + back link */}
          <motion.div
            className="mt-20 pt-10 border-t border-slate-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2178C7] hover:text-[#1a62a1] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-[#2178C7] hover:border-[#2178C7]/30 transition-all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
      >
        <ChevronUp size={20} />
      </motion.button>

      <Footer />
    </main>
  )
}
