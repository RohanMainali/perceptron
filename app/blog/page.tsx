"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog-posts"

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  image: string
}

export default function BlogPage() {
  const [scrollY, setScrollY] = useState(0)
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setPosts(getAllBlogPosts())
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
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Blog & Insights
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Explore articles on AI, computer vision, machine learning, and cutting-edge research
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group relative h-full rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-foreground/70 leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
