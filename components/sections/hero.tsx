"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Sparkles, Layers, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a]/40 via-transparent to-[#050d1a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/50 via-transparent to-[#050d1a]/50" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
              left: `${8 + i * 9}%`,
              top: `${12 + (i % 5) * 16}%`,
              background: i % 3 === 0 ? "#53C5E6" : i % 3 === 1 ? "#C26FCF" : "#2178C7",
            }}
            animate={{ y: [0, -60, 0], opacity: [0.08, 0.45, 0.08] }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(83,197,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#2178C7]/12 blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#C26FCF]/8 blur-[100px] pointer-events-none z-[1]" />

      {/* ── Main content ── */}
      <motion.div className="w-full relative z-10 flex flex-col items-center" style={{ opacity }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

          {/* Eyebrow badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[13px] text-white/50 font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#53C5E6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#53C5E6]" />
              </span>
              Now in Early Access
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[clamp(2.75rem,7vw,6.5rem)] font-light text-white leading-[1.0] mb-7 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Stop Annotating.
            <br />
            <span className="cosmic-heading-gradient">Start Describing.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Tell AI what to label in plain language.
            <br className="hidden sm:block" />
            Watch it annotate your entire dataset — instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link href="/contact">
              <motion.span
                className="cosmic-btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-[15px] shadow-lg shadow-[#2178C7]/20"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Early Access <ArrowRight size={16} strokeWidth={2.5} />
              </motion.span>
            </Link>
            <a href="https://github.com/perceptronai-org" target="_blank" rel="noopener noreferrer">
              <motion.span
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-[15px] text-white/70 border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:text-white/90 transition-colors duration-300"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={17} /> View on GitHub
              </motion.span>
            </a>
          </motion.div>

          {/* ── Product demo window ── */}
          <motion.div
            className="relative w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Glow under the window */}
            <motion.div
              className="absolute -inset-6 rounded-3xl blur-3xl opacity-25"
              style={{ background: "linear-gradient(135deg, #2178C7 0%, #53C5E6 40%, #C26FCF 100%)" }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Browser chrome */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_50px_120px_-30px_rgba(33,120,199,0.3)] bg-[#0c1220]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0c1220]/90 border-b border-white/[0.05]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E05A6D]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F1B646]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#53C5E6]/70" />
                <div className="flex-1 mx-4">
                  <div className="max-w-[200px] mx-auto h-5 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center justify-center">
                    <span className="text-[10px] text-white/25 tracking-wide">app.auta.ai</span>
                  </div>
                </div>
              </div>

              {/* GIF */}
              <Image
                src="/images/auta/auta-demo.gif"
                alt="Auta annotation platform demo"
                width={1200}
                height={700}
                className="w-full h-auto"
                unoptimized
              />

              {/* Bottom fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050d1a] to-transparent" />
            </div>

            {/* Floating stat cards */}
            <motion.div
              className="absolute -left-8 top-1/3 px-5 py-3.5 rounded-2xl bg-[#0d1424]/80 backdrop-blur-xl border border-white/[0.1] shadow-2xl hidden lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-2xl font-bold text-white tracking-tight">10×</p>
              <p className="text-[11px] text-white/40 mt-0.5 font-medium">Faster annotation</p>
            </motion.div>

            <motion.div
              className="absolute -right-8 top-1/4 px-5 py-3.5 rounded-2xl bg-[#0d1424]/80 backdrop-blur-xl border border-white/[0.1] shadow-2xl hidden lg:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <p className="text-2xl font-bold text-white tracking-tight">20+</p>
              <p className="text-[11px] text-white/40 mt-0.5 font-medium">Export formats</p>
            </motion.div>

            <motion.div
              className="absolute -right-6 bottom-20 px-5 py-3.5 rounded-2xl bg-[#0d1424]/80 backdrop-blur-xl border border-white/[0.1] shadow-2xl hidden lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <p className="text-2xl font-bold cosmic-heading-gradient tracking-tight">Zero</p>
              <p className="text-[11px] text-white/40 mt-0.5 font-medium">Setup required</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
