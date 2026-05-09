"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useState } from "react"
import WaitlistModal from "@/components/waitlist-modal"
import MeshCanvas from "@/components/mesh-canvas"

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

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: PANEL,
        paddingTop: "148px",
        paddingBottom: "96px",
        borderBottom: `1px solid ${LINE}`,
        /* reset all text to dark so nothing bleeds from dark body */
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
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: `1px solid ${LINE}`,
              borderRadius: "6px",
              background: PANEL,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              fontFamily: MONO,
              fontSize: "11.5px",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                background: GREEN,
                color: "#fff",
                fontWeight: 600,
                padding: "5px 9px",
                letterSpacing: "0.07em",
                fontSize: "10px",
                textTransform: "uppercase",
              }}
            >
              Beta
            </span>
            <span
              style={{ width: "1px", alignSelf: "stretch", background: LINE, flexShrink: 0 }}
            />
            <span style={{ padding: "5px 11px", color: MUTED }}>
              <b style={{ color: FG, fontWeight: 500 }}>Auta</b> is now in early access
            </span>
          </div>
        </motion.div>

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
            onClick={() => {
              document.getElementById("hero-demo")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
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
          style={{ marginTop: "44px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: `1px solid ${LINE}`,
              borderRadius: "10px",
              background: PANEL,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <span
              style={{
                padding: "14px 20px",
                fontFamily: MONO,
                fontSize: "10px",
                color: FAINT,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRight: `1px solid ${LINE}`,
                whiteSpace: "nowrap",
              }}
            >
              Backed by
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                padding: "14px 24px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: MUTED,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                NVIDIA{" "}
                <span style={{ fontWeight: 300, color: FAINT, fontSize: "12px" }}>Inception</span>
              </span>
              <span style={{ width: "1px", height: "20px", background: LINE, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: MUTED,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Amazon{" "}
                <span style={{ fontWeight: 300, color: FAINT, fontSize: "12px" }}>AWS Activate</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Industry proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{
            marginTop: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            fontSize: "12px",
            color: FAINT,
          }}
        >
          <span>Trusted by research teams in</span>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>Medical Imaging</span>
            <span style={{ color: LINE_STR }}>/</span>
            <span>Sports Analytics</span>
            <span style={{ color: LINE_STR }}>/</span>
            <span>Autonomous Driving</span>
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
                  fontSize: "11px",
                  color: "#7a7a72",
                  marginLeft: "10px",
                }}
              >
                auta — chest-xray-pneumonia.parquet
              </span>
              {/* Tabs */}
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
