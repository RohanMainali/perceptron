"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import WaitlistModal from "@/components/waitlist-modal"

const GREEN   = "#16a34a"
const GREEN_2 = "#15803d"
const MONO    = "'Geist Mono', 'Courier New', monospace"

export default function CTA() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <>
      <section
        style={{
          position: "relative",
          padding: "130px 0",
          background: "#0c0c0a",
          color: "#f9f9f7",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 70%)",
          }}
        />

        {/* Green glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(22,163,74,0.12), transparent 65%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(42px, 6vw, 84px)",
              fontWeight: 500,
              letterSpacing: "-0.047em",
              lineHeight: 0.97,
              margin: 0,
              maxWidth: "13ch",
              background: "linear-gradient(180deg, #f9f9f7 0%, #71716a 120%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Annotate at the speed of thought.
          </motion.h2>

          <motion.button
            onClick={() => setWaitlistOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              marginTop: "36px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: GREEN,
              color: "#fff",
              padding: "15px 24px",
              borderRadius: "9px",
              fontSize: "15px",
              fontWeight: 500,
              border: `1px solid ${GREEN_2}`,
              boxShadow: "0 1px 3px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "background 140ms, transform 140ms, box-shadow 140ms",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = GREEN_2
              el.style.transform = "translateY(-2px)"
              el.style.boxShadow = "0 8px 24px rgba(22,163,74,0.35)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = GREEN
              el.style.transform = ""
              el.style.boxShadow = "0 1px 3px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            Get Early Access <ArrowRight size={16} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              marginTop: "18px",
              fontFamily: MONO,
              fontSize: "11px",
              color: "rgba(249,249,247,0.35)",
              letterSpacing: "0.06em",
            }}
          >
            NO CREDIT CARD REQUIRED · WORKS WITH YOUR EXISTING DATASETS
          </motion.div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="dark" />
    </>
  )
}
