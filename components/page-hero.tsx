"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
}

export default function PageHero({ title, subtitle, badge }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Hero background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-background/80" />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#53C5E6]/30"
            style={{ left: `${20 + i * 15}%`, top: `${25 + (i % 3) * 20}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" style={{ opacity }}>
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#53C5E6]/30 bg-[#53C5E6]/10 text-[#53C5E6] text-sm font-medium backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#53C5E6] animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title with word-by-word animation */}
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-light leading-tight text-balance">
              {title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-white mr-[0.3em]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Gradient underline */}
          <motion.div
            className="mx-auto h-[1px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 160, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  )
}
