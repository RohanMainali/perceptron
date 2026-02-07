"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User } from "lucide-react"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogPageClientProps {
  posts: BlogPost[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardColors = ["#53C5E6", "#C26FCF", "#F1B646", "#2178C7"]

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />

      <PageHero
        title="Blog & Insights"
        subtitle="Explore articles on AI, computer vision, machine learning, and cutting-edge research"
        badge="Knowledge Hub"
      />

      {/* Blog Posts Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="absolute inset-0 dot-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#53C5E6] font-medium">
              Latest Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="cosmic-heading-gradient">From Our Team</span>
            </h2>
            <motion.div
              className="mx-auto h-1 w-16 rounded-full mt-4"
              style={{ background: "linear-gradient(90deg, #2178C7, #53C5E6)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <p className="text-lg text-slate-600 leading-relaxed pt-2">
              Deep dives, implementation guides, and research highlights from the Perceptron team.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post, index) => {
              const color = cardColors[index % cardColors.length]
              return (
                <motion.div key={post.slug} variants={cardVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="cosmic-card group relative h-full rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        <motion.img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-70" />

                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md text-white"
                            style={{ background: `${color}60`, border: `1px solid ${color}40` }}
                          >
                            Article
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-[#53C5E6]" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User size={14} className="text-[#C26FCF]" />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#2178C7] transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center gap-2 font-medium pt-2 group-hover:gap-3 transition-all" style={{ color }}>
                          Read More
                          <ArrowRight size={18} />
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div
                        className="h-[2px]"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                      />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
