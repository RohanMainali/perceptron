"use client"

import { motion, useInView } from "framer-motion"
import { HeartPulse, Trophy, Car, Check, ArrowRight } from "lucide-react"
import { useRef, useState } from "react"
import WaitlistModal from "@/components/waitlist-modal"

const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG       = "#eeecea"   // darker section bg

const useCases = [
  {
    icon: HeartPulse,
    domain: "Medical Imaging AI",
    tagline: "Precision annotation for life-saving diagnostics",
    video: "/images/auta/medical-imaging.mp4",
    capabilities: [
      "Tumor & lesion segmentation in MRI scans",
      "Organ detection & labeling in CT scans",
      "AI-assisted reasoning for anatomical structures",
      "Surgical video annotation & frame tracking",
    ],
    stat: { value: "10×", label: "faster than manual labeling" },
  },
  {
    icon: Trophy,
    domain: "Sports Analytics",
    tagline: "Real-time tracking & tactical intelligence",
    video: "/images/auta/sports-analytics.mp4",
    capabilities: [
      "Player position tracking across frames",
      "Ball trajectory & tactical zone mapping",
      "Action detection — passes, shots, punches",
      "Natural language AI reasoning on tactics",
    ],
    stat: { value: "Any", label: "sport, any camera angle" },
  },
  {
    icon: Car,
    domain: "Autonomous Driving",
    tagline: "Powering the next generation of self-driving AI",
    video: "/images/auta/autonomous-driving.mp4",
    capabilities: [
      "Vehicle, pedestrian & traffic sign detection",
      "Segmentation masks & lane detection",
      "Compatible with KITTI, Waymo datasets",
      "Behavior reasoning across urban scenes",
    ],
    stat: { value: "20+", label: "export formats supported" },
  },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <section
      ref={ref}
      id="about"
      style={{
        padding: "120px 0 110px",
        background: BG,
        borderBottom: `1px solid ${LINE_STR}`,
        color: FG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginBottom: "60px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase", marginBottom: "14px" }}>
              Solutions
            </div>
            <h2 style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, color: FG, margin: 0 }}>
              Annotation across industries.
            </h2>
          </div>
          <p style={{ maxWidth: "360px", fontSize: "15px", color: MUTED, lineHeight: 1.6, margin: 0, flexShrink: 0 }}>
            From saving lives to training autonomous systems — Auta handles it all.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {useCases.map((uc, i) => {
            const Icon = uc.icon
            return (
              <motion.div
                key={uc.domain}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: PANEL,
                  border: `1px solid ${LINE}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  transition: "border-color 200ms, box-shadow 200ms, transform 200ms",
                  cursor: "default",
                }}
                whileHover={{ y: -3 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = GREEN
                  el.style.boxShadow = "0 8px 32px rgba(22,163,74,0.12), 0 2px 10px rgba(0,0,0,0.05)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = LINE
                  el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"
                }}
              >
                {/* Browser chrome */}
                <div style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fc635d" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fdbc40" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34c749" }} />
                    </div>
                    <div style={{ flex: 1, marginLeft: "8px" }}>
                      <div style={{ maxWidth: "160px", margin: "0 auto", height: "18px", borderRadius: "5px", background: BG, border: `1px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: MONO, fontSize: "9px", color: FAINT, letterSpacing: "0.03em" }}>auta.perceptronai.org</span>
                      </div>
                    </div>
                  </div>

                  {/* Video */}
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 700ms ease-out" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)" }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
                    >
                      <source src={uc.video} type="video/mp4" />
                    </video>
                    {/* Dark overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)" }} />

                    {/* Domain badge — bottom left */}
                    <div style={{
                      position: "absolute", bottom: "12px", left: "12px",
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "5px 10px", borderRadius: "20px",
                      background: "rgba(22,163,74,0.18)",
                      border: "1px solid rgba(22,163,74,0.35)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}>
                      <Icon size={12} color={GREEN} />
                      <span style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 600, color: GREEN, letterSpacing: "0.02em" }}>{uc.domain}</span>
                    </div>

                    {/* Stat chip — top right */}
                    <div style={{
                      position: "absolute", top: "12px", right: "12px",
                      padding: "4px 10px", borderRadius: "20px",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: MONO, fontSize: "11px",
                    }}>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{uc.stat.value}</span>
                      <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}> {uc.stat.label}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontSize: "13px", color: FAINT, marginBottom: "14px", lineHeight: 1.5 }}>{uc.tagline}</p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {uc.capabilities.map((cap, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: MUTED, lineHeight: 1.45 }}>
                        <Check size={13} color={GREEN} style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Explore CTA */}
                  <button
                    type="button"
                    onClick={() => setWaitlistOpen(true)}
                    style={{
                      marginTop: "18px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: GREEN,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "gap 150ms",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "8px" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "5px" }}
                  >
                    Explore Auta <ArrowRight size={13} />
                  </button>
                </div>

                {/* Bottom accent bar */}
                <motion.div
                  style={{ height: "3px", background: GREEN }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
