"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import MeshCanvas from "@/components/mesh-canvas"
import type { BlogPost } from "@/lib/blog-posts"

const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f6f6f3"

function isVideoUrl(url: string | undefined): boolean {
  if (!url) return false
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(url)
}

function getEmbedUrl(url: string): string {
  if (/youtube\.com\/watch\?v=/.test(url)) {
    try { const id = new URL(url).searchParams.get("v"); return `https://www.youtube.com/embed/${id}` } catch { return url }
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

function getVideoThumbnail(url: string): string | null {
  let videoId: string | null = null
  if (/youtube\.com\/watch\?v=/.test(url)) {
    try { videoId = new URL(url).searchParams.get("v") } catch { /* */ }
  } else if (/youtu\.be\//.test(url)) {
    videoId = url.split("youtu.be/")[1]?.split(/[?&#]/)[0] || null
  }
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  return null
}

interface BlogPageClientProps {
  posts: BlogPost[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <main style={{ background: PANEL, position: "relative", overflow: "hidden", color: FG }}>
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
          position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(22,163,74,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: "680px" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 12px 5px 5px", borderRadius: "100px",
              border: `1px solid ${LINE_STR}`, background: PANEL, marginBottom: "24px",
            }}>
              <span style={{ background: GREEN, color: "#fff", borderRadius: "100px", padding: "2px 10px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", fontFamily: MONO }}>
                BLOG
              </span>
              <span style={{ fontSize: "12px", color: MUTED, fontFamily: MONO, letterSpacing: "0.03em" }}>
                Knowledge Hub
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.0, color: FG, margin: "0 0 20px" }}>
              Blog &amp; <em style={{ fontStyle: "italic", color: GREEN }}>Insights</em>
            </h1>
            <p style={{ fontSize: "17px", color: MUTED, lineHeight: 1.65, margin: 0 }}>
              Deep dives, implementation guides, and research highlights from the Perceptron team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section style={{ padding: "80px 0", background: PANEL, borderBottom: `1px solid ${LINE_STR}` }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ marginBottom: "32px" }}
            >
              <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase" }}>
                Featured Article
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
                  {/* Image / Video */}
                  <div style={{
                    position: "relative", borderRadius: "14px", overflow: "hidden",
                    border: `1px solid ${LINE}`, background: BG2, aspectRatio: "16/10",
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GREEN, zIndex: 2 }} />
                    {isVideoUrl(featured.image) ? (
                      <iframe
                        src={getEmbedUrl(featured.image!)}
                        title={featured.title}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={featured.image || "/placeholder.svg"}
                        alt={featured.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: MONO, fontSize: "12px", color: FAINT }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} /> {featured.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <User size={12} /> {featured.author}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={12} /> {Math.max(1, Math.ceil((featured.content?.length || 0) / 1200))} min
                      </span>
                    </div>

                    <h2 style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.15, color: FG, margin: 0 }}>
                      {featured.title}
                    </h2>

                    <p style={{ fontSize: "15px", color: MUTED, lineHeight: 1.65, margin: 0 }}>
                      {featured.excerpt}
                    </p>

                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: GREEN, fontSize: "14px", fontWeight: 500, marginTop: "8px" }}>
                      Read Article <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      {rest.length > 0 && (
        <section style={{ padding: "80px 0 100px", background: BG2 }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ marginBottom: "40px" }}
            >
              <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase" }}>
                More Articles
              </div>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {rest.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section style={{ padding: "120px 0", background: PANEL }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
            <p style={{ color: MUTED, fontSize: "16px", fontFamily: MONO }}>No articles published yet. Check back soon.</p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200))
  const thumb = isVideoUrl(post.image) ? getVideoThumbnail(post.image!) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
        <div
          style={{
            borderRadius: "14px", overflow: "hidden",
            border: `1px solid ${hovered ? "rgba(22,163,74,0.35)" : LINE}`,
            background: PANEL,
            transition: "border-color 160ms, box-shadow 160ms",
            boxShadow: hovered ? "0 4px 20px rgba(22,163,74,0.08)" : "none",
            height: "100%", display: "flex", flexDirection: "column",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: BG2, flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GREEN, zIndex: 2 }} />
            <img
              src={thumb || post.image || "/placeholder.svg"}
              alt={post.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 600ms ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {isVideoUrl(post.image) && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: MONO, fontSize: "11px", color: FAINT }}>
              <span>{post.date}</span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: FAINT, display: "inline-block" }} />
              <span>{readingTime} min read</span>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.3, color: FG, margin: 0 }}
              className="line-clamp-2"
            >
              {post.title}
            </h3>

            <p style={{ fontSize: "13.5px", color: MUTED, lineHeight: 1.6, margin: 0 }}
              className="line-clamp-2"
            >
              {post.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "12px", borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontSize: "13px", color: MUTED, fontWeight: 500 }}>{post.author}</span>
              <ArrowRight
                size={15}
                color={hovered ? GREEN : FAINT}
                style={{ transition: "color 160ms, transform 160ms", transform: hovered ? "translateX(3px)" : "none" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
