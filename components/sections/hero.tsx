"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useState } from "react"
import WaitlistModal from "@/components/waitlist-modal"
import MeshCanvas from "@/components/mesh-canvas"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

/* ─────────────────────────────────────────────
   Tiny inline-style constants (mirrors reference
   design CSS vars so nothing inherits dark theme)
───────────────────────────────────────────── */
const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f2f2ee"
const PANEL2   = "#f6f6f3"

export default function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const isMobile = useIsMobile()

  const centerDemoVideo = () => {
    const target =
      document.querySelector<HTMLVideoElement>("#hero-demo video") ??
      document.getElementById("hero-demo")

    if (!target) return

    const rect = target.getBoundingClientRect()
    const targetCenter = rect.top + rect.height / 2
    const viewportCenter = window.innerHeight / 2

    window.scrollBy({
      top: targetCenter - viewportCenter,
      behavior: "smooth",
    })
  }

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: PANEL,
        paddingTop: isMobile ? "100px" : "148px",
        paddingBottom: isMobile ? "64px" : "96px",
        borderBottom: `1px solid ${LINE}`,
        color: FG,
      }}
    >
      {/* ── Gravity mesh canvas ── */}
      <MeshCanvas />

      {/* ── Soft green ambient glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "560px",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 45%, transparent 68%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1160px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: "32px auto 0",
            fontSize: "clamp(48px, 8.5vw, 108px)",
            fontWeight: 500,
            letterSpacing: "-0.052em",
            lineHeight: 0.95,
            color: FG,
            maxWidth: "14ch",
          }}
        >
          Annotate Datasets
          <br />
          By <em style={{ color: GREEN, fontStyle: "italic" }}>Describing</em> Them.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          style={{
            margin: "26px auto 0",
            maxWidth: "520px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: MUTED,
          }}
        >
          Auta reads your dataset and a plain-language instruction, then labels everything — no config, no schema authoring, no clicking.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", gap: "10px", marginTop: "36px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            onClick={() => setWaitlistOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              border: `1px solid ${GREEN_2}`,
              background: GREEN,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
              transition: "all 140ms cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = GREEN_2
              el.style.transform = "translateY(-1px)"
              el.style.boxShadow = "0 6px 20px rgba(22,163,74,0.28), inset 0 1px 0 rgba(255,255,255,0.12)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = GREEN
              el.style.transform = "translateY(0)"
              el.style.boxShadow = "0 1px 3px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
            }}
          >
            Get Early Access <ArrowRight size={14} />
          </button>

          <button
            onClick={centerDemoVideo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              border: `1px solid ${LINE_STR}`,
              background: PANEL,
              color: FG,
              cursor: "pointer",
              transition: "all 140ms cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = BG2; el.style.transform = "translateY(-1px)"; el.style.borderColor = FG }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = PANEL; el.style.transform = ""; el.style.borderColor = LINE_STR }}
          >
            <Play size={11} fill={FG} /> See How It Works
          </button>
        </motion.div>

        {/* Backed By strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: "48px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", color: FAINT, textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
            Backed by
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 1px minmax(0, 1fr)",
              alignItems: "center",
              columnGap: "32px",
              width: "min(100%, 620px)",
            }}
          >
            {/* NVIDIA Inception */}
            <img
              src="/nvidia-inception-badge.svg"
              alt="NVIDIA Inception Program member"
              height={60}
              style={{ display: "block", justifySelf: "end" }}
            />

            {/* Divider */}
            <div style={{ width: "1px", height: "44px", background: LINE_STR }} />

            {/* Powered by AWS */}
            <img
              src="/powered-by-aws.png"
              alt="Powered by AWS"
              height={80}
              style={{ display: "block", justifySelf: "start" }}
            />
          </div>
        </motion.div>

        {/* ── Product demo window ── */}
        <motion.div
          id="hero-demo"
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1080px",
            marginTop: "72px",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: "14px",
              background: PANEL,
              overflow: "hidden",
              boxShadow: "0 8px 48px rgba(0,0,0,0.09), 0 0 0 0.5px rgba(0,0,0,0.04)",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "40px",
                padding: "0 16px",
                gap: "10px",
                borderBottom: `1px solid ${LINE}`,
                background: PANEL2,
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fc635d", display: "block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fdbc40", display: "block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34c749", display: "block" }} />
              </div>
              {/* Window title */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: isMobile ? "10px" : "11px",
                  color: "#7a7a72",
                  marginLeft: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {isMobile ? "auta — chest-xray.parquet" : "auta — chest-xray-pneumonia.parquet"}
              </span>
              {/* Tabs — hidden on mobile */}
              {!isMobile && (
                <div style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
                  {["Annotate", "Plan", "Export"].map((tab, i) => (
                    <span
                      key={tab}
                      style={{
                        fontFamily: MONO,
                        fontSize: "11px",
                        padding: "4px 9px",
                        borderRadius: "5px",
                        color: i === 0 ? FG : "#7a7a72",
                        background: i === 0 ? BG2 : "transparent",
                      }}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Demo video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <source src="/images/auta/medicaldemo.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "-32px",
              top: "33%",
              padding: "14px 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${LINE}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
            className="hidden lg:block"
          >
            <p style={{ fontSize: "24px", fontWeight: 700, color: FG, letterSpacing: "-0.02em", lineHeight: 1 }}>10×</p>
            <p style={{ fontSize: "11px", color: "#7a7a72", marginTop: "2px", fontWeight: 500 }}>Faster annotation</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            style={{
              position: "absolute",
              right: "-32px",
              top: "25%",
              padding: "14px 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${LINE}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
            className="hidden lg:block"
          >
            <p style={{ fontSize: "24px", fontWeight: 700, color: FG, letterSpacing: "-0.02em", lineHeight: 1 }}>20+</p>
            <p style={{ fontSize: "11px", color: "#7a7a72", marginTop: "2px", fontWeight: 500 }}>Export formats</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{
              position: "absolute",
              right: "-24px",
              bottom: "80px",
              padding: "14px 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${LINE}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
            className="hidden lg:block"
          >
            <p style={{ fontSize: "24px", fontWeight: 700, color: GREEN, letterSpacing: "-0.02em", lineHeight: 1 }}>Zero</p>
            <p style={{ fontSize: "11px", color: "#7a7a72", marginTop: "2px", fontWeight: 500 }}>Setup required</p>
          </motion.div>
        </motion.div>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        theme="light"
      />
    </section>
  )
}
