"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, ChevronUp, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import MeshCanvas from "@/components/mesh-canvas"
import type { BlogPost } from "@/lib/blog-posts"

const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f6f6f3"

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

  const hasHeroMedia = Boolean(post.image && !post.image.toLowerCase().includes("placeholder"))
  const isVideo = hasHeroMedia && /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(post.image || "")

  const { scrollYProgress: globalProgress } = useScroll()
  const progressWidth = useTransform(globalProgress, [0, 1], ["0%", "100%"])

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
    <main style={{ background: PANEL, position: "relative", overflow: "hidden", color: FG }}>
      {/* Reading progress bar */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, height: "3px", zIndex: 60,
          width: progressWidth,
          background: GREEN,
        }}
      />

      <Navigation scrollY={scrollY} />

      {/* Hero */}
      <section style={{
        position: "relative",
        background: PANEL,
        paddingTop: "140px",
        paddingBottom: "80px",
        overflow: "hidden",
        borderBottom: `1px solid ${LINE_STR}`,
      }}>
        <MeshCanvas />
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(22,163,74,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "28px", fontFamily: MONO, fontSize: "12px" }}
          >
            <Link href="/blog"
              style={{ color: MUTED, textDecoration: "none", transition: "color 120ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = FG }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
            >
              Blog
            </Link>
            <ChevronRight size={12} color={FAINT} />
            <span style={{ color: GREEN, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "420px" }}>
              {post.title}
            </span>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: hasHeroMedia ? "1fr 480px" : "1fr", gap: "56px", alignItems: "center" }}>
            {/* Left — copy */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.07, color: FG, margin: "0 0 20px" }}
              >
                {post.title}
              </motion.h1>

              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.3 }}
                  style={{ fontSize: "16px", color: MUTED, lineHeight: 1.65, margin: "0 0 24px" }}
                >
                  {post.excerpt}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}
              >
                {([
                  { icon: User,     label: post.author || "Perceptron Team" },
                  { icon: Calendar, label: post.date },
                  { icon: Clock,    label: `${readingTime} min read` },
                ] as const).map(({ icon: Icon, label }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    padding: "6px 14px", borderRadius: "100px",
                    border: `1px solid ${LINE_STR}`, background: BG2,
                    fontSize: "13px", color: MUTED, fontFamily: MONO,
                  }}>
                    <Icon size={12} color={FAINT} />
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — hero media */}
            {hasHeroMedia && (
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: `1px solid ${LINE}` }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GREEN, zIndex: 2 }} />
                {isVideo ? (
                  <iframe
                    src={getEmbedUrl(post.image!)}
                    title={post.title}
                    style={{ width: "100%", aspectRatio: "16/10", border: "none", display: "block" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Article content */}
      <section style={{ padding: "80px 0 100px", background: PANEL }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 40px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <style>{`
              .blog-prose {
                font-size: 1.0625rem;
                line-height: 1.85;
                color: #374151;
              }
              .blog-prose h1, .blog-prose h2, .blog-prose h3,
              .blog-prose h4, .blog-prose h5, .blog-prose h6 {
                font-weight: 600;
                letter-spacing: -0.025em;
                color: #0c0c0a;
                margin-top: 2.5em;
                margin-bottom: 0.8em;
              }
              .blog-prose h2 {
                font-size: 1.65rem;
                padding-bottom: 0.5em;
                border-bottom: 1px solid rgba(12,12,10,0.09);
              }
              .blog-prose h3 { font-size: 1.3rem; }
              .blog-prose p { margin-bottom: 1.5em; }
              .blog-prose a {
                color: #16a34a;
                text-decoration: none;
                font-weight: 500;
                border-bottom: 1px solid transparent;
                transition: border-color 150ms;
              }
              .blog-prose a:hover { border-bottom-color: #16a34a; }
              .blog-prose strong { color: #0c0c0a; font-weight: 650; }
              .blog-prose code {
                background: #f6f6f3;
                color: #0c0c0a;
                padding: 0.15em 0.4em;
                border-radius: 5px;
                font-family: 'Geist Mono','Fira Code',ui-monospace,monospace;
                font-size: 0.875em;
                border: 1px solid rgba(12,12,10,0.09);
              }
              .blog-prose pre {
                background: #0c0c0a;
                border-radius: 10px;
                padding: 1.4em;
                overflow-x: auto;
                margin: 2em 0;
                border: 1px solid rgba(255,255,255,0.08);
              }
              .blog-prose pre code {
                background: transparent;
                color: #e2e8f0;
                padding: 0;
                border: none;
                font-size: 0.9em;
                line-height: 1.7;
              }
              .blog-prose blockquote {
                border-left: 3px solid #16a34a;
                padding: 0.75em 1.25em;
                background: rgba(22,163,74,0.04);
                border-radius: 0 8px 8px 0;
                margin: 2em 0;
                font-style: italic;
              }
              .blog-prose blockquote p { margin: 0; }
              .blog-prose ul { list-style: none; padding-left: 0; margin-bottom: 1.5em; }
              .blog-prose ul li {
                position: relative;
                padding-left: 1.25em;
                margin-bottom: 0.5em;
                line-height: 1.8;
              }
              .blog-prose ul li::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0.72em;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #16a34a;
              }
              .blog-prose ol { padding-left: 1.5em; margin-bottom: 1.5em; }
              .blog-prose ol li { padding-left: 0.25em; margin-bottom: 0.5em; line-height: 1.8; }
              .blog-prose ol li::marker { color: #16a34a; font-weight: 600; }
              .blog-prose img {
                border-radius: 10px;
                margin: 2em auto;
                display: block;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
              }
              .blog-prose table {
                width: 100%;
                border-collapse: collapse;
                margin: 2em 0;
                border: 1px solid rgba(12,12,10,0.09);
                border-radius: 10px;
                overflow: hidden;
              }
              .blog-prose th, .blog-prose td {
                border: 1px solid rgba(12,12,10,0.09);
                padding: 0.75em 1em;
                text-align: left;
              }
              .blog-prose th {
                background: #f6f6f3;
                font-weight: 600;
                color: #0c0c0a;
                text-transform: uppercase;
                font-size: 0.75em;
                letter-spacing: 0.06em;
              }
              .blog-prose hr {
                border: none;
                border-top: 1px solid rgba(12,12,10,0.09);
                margin: 3em 0;
              }
            `}</style>
            <div className="blog-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </motion.div>

          {/* Back link */}
          <motion.div
            style={{ marginTop: "64px", paddingTop: "32px", borderTop: `1px solid ${LINE_STR}` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "13px", fontWeight: 500, color: GREEN,
                textDecoration: "none", fontFamily: MONO, letterSpacing: "0.02em",
                transition: "color 120ms",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN_2 }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
            >
              <ArrowLeft size={14} />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 50,
          width: "44px", height: "44px", borderRadius: "50%",
          background: PANEL, border: `1px solid ${LINE_STR}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          pointerEvents: showScrollTop ? "auto" : "none",
          color: MUTED,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = GREEN
          el.style.color = GREEN
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = LINE_STR
          el.style.color = MUTED
        }}
      >
        <ChevronUp size={18} />
      </motion.button>

      <Footer />
    </main>
  )
}
