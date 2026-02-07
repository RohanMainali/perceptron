"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import type { BlogPost } from "@/lib/blog-posts"

function isVideoUrl(url: string | undefined): boolean {
  if (!url) return false
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.webm/i.test(url)
}

function getEmbedUrl(url: string): string {
  if (/youtube\.com\/watch\?v=/.test(url)) {
    try {
      const id = new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${id}`
    } catch { return url }
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const accentColors = ["#2178C7", "#C26FCF", "#53C5E6", "#F1B646"]

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
    <main className="relative overflow-hidden bg-white">
      <Navigation scrollY={scrollY} />

      <PageHero
        title="Blog & Insights"
        subtitle="Deep dives, implementation guides, and research highlights from the Perceptron team"
        badge="Knowledge Hub"
      />

      {/* Featured Post */}
      {featured && (
        <section className="relative py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#53C5E6] font-semibold">
                Featured Article
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image / Video */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                    {isVideoUrl(featured.image) ? (
                      <iframe
                        src={getEmbedUrl(featured.image!)}
                        title={featured.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                      />
                    ) : (
                      <img
                        src={featured.image || "/placeholder.svg"}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-1 pointer-events-none" style={{ background: "linear-gradient(90deg, #2178C7, #53C5E6, #C26FCF)" }} />
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{featured.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-slate-400" />
                        <span>{featured.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        <span>{Math.max(1, Math.ceil((featured.content?.length || 0) / 1200))} min</span>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight group-hover:text-[#2178C7] transition-colors duration-300 tracking-tight">
                      {featured.title}
                    </h2>

                    <p className="text-lg text-slate-500 leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-[#2178C7] font-medium pt-2 group-hover:gap-3 transition-all duration-300">
                      Read Article
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Divider */}
      {rest.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-slate-200" />
        </div>
      )}

      {/* Rest of Posts */}
      {rest.length > 0 && (
        <section className="relative py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#C26FCF] font-semibold">
                More Articles
              </span>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {rest.map((post, index) => {
                const accent = accentColors[index % accentColors.length]
                return (
                  <motion.div key={post.slug} variants={cardVariants}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                        {/* Image / Video thumbnail */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={(isVideoUrl(post.image) ? getVideoThumbnail(post.image!) : null) || post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          {isVideoUrl(post.image) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: accent }} />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{Math.max(1, Math.ceil((post.content?.length || 0) / 1200))} min read</span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#2178C7] transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-slate-500 text-[0.938rem] leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center">
                                <User size={10} className="text-white" />
                              </div>
                              <span className="text-sm text-slate-600 font-medium">{post.author}</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-[#2178C7] group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-400 text-lg">No articles published yet. Check back soon!</p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
