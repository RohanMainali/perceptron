"use client"

import { motion, useInView } from "framer-motion"
import { Check, Minus, X, Zap, Sparkles, MessageSquare } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
import WaitlistModal from "@/components/waitlist-modal"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f0efeb"
const SECTION  = "#eeecea"  // dark
const GREEN_SOFT = "rgba(22,163,74,0.06)"
const GREEN_MID  = "rgba(22,163,74,0.10)"

const exclusives = [
  {
    icon: MessageSquare,
    color: GREEN,
    title: "Chat-to-Task Annotation",
    description: "The only tool where you simply describe your task in plain English and the AI builds, configures, and runs the entire annotation pipeline for you.",
  },
  {
    icon: Sparkles,
    color: GREEN,
    title: "Zero-Shot Dataset Generation",
    description: "Don't have images yet? Describe your dataset — Auta sources imagery, generates annotations, and exports a ready-to-train dataset. No images required.",
  },
  {
    icon: Zap,
    color: GREEN,
    title: ".zip to Annotated Dataset",
    description: "Drop a zip file, describe your goal in one sentence. Auta handles label schema, annotation type, model selection, and batch processing automatically.",
  },
]

type Status = "full" | "partial" | "none"
interface Row { feature: string; category: string; auta: Status; roboflow: Status; cvat: Status; labelstudio: Status; autaNote?: string }

const rows: Row[] = [
  { feature: "Chat-to-Task Annotation",        category: "AI & Automation",  auta: "full", roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "Zero-Shot Dataset Generation",   category: "AI & Automation",  auta: "full", roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "Natural Language Video Tracking",category: "AI & Automation",  auta: "full", roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "AI Dataset Planner",             category: "AI & Automation",  auta: "full", roboflow: "partial", cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "AI-Powered Segmentation",        category: "Annotation",       auta: "full", roboflow: "full",    cvat: "partial", labelstudio: "partial" },
  { feature: "Auto-annotation (AI models)",    category: "Annotation",       auta: "full", roboflow: "full",    cvat: "full",    labelstudio: "partial" },
  { feature: "Bounding Boxes & Polygons",      category: "Annotation",       auta: "full", roboflow: "full",    cvat: "full",    labelstudio: "full" },
  { feature: "Video Annotation",               category: "Annotation",       auta: "full", roboflow: "partial", cvat: "full",    labelstudio: "full" },
  { feature: "20+ Export Formats",             category: "Export & Workflow", auta: "full", roboflow: "partial", cvat: "full",    labelstudio: "full",    autaNote: "20+" },
  { feature: "Zero-config .zip Upload",        category: "Export & Workflow", auta: "full", roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "No-code Setup",                  category: "Export & Workflow", auta: "full", roboflow: "full",    cvat: "none",    labelstudio: "partial" },
]

const categories = Array.from(new Set(rows.map(r => r.category)))

function StatusIcon({ status, isAuta }: { status: Status; isAuta: boolean }) {
  if (status === "full")
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: isAuta ? GREEN_SOFT : "rgba(34,197,94,0.08)" }}>
        <Check size={13} color={isAuta ? GREEN : "#16a34a"} strokeWidth={2.5} />
      </span>
    )
  if (status === "partial")
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "rgba(245,158,11,0.08)" }}>
        <Minus size={13} color="#d97706" strokeWidth={2.5} />
      </span>
    )
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "rgba(0,0,0,0.04)" }}>
      <X size={12} color={FAINT} strokeWidth={2} />
    </span>
  )
}

export default function Comparison() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const isMobile = useIsMobile()
  const tableCols = isMobile ? "minmax(140px, 1fr) repeat(4, 70px)" : "1fr repeat(4, 130px)"
  const tableMin  = isMobile ? "420px" : "600px"

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        padding: isMobile ? "72px 0 64px" : "120px 0 110px",
        background: SECTION,
        borderBottom: `1px solid ${LINE_STR}`,
        color: FG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>

        {/* Header */}
        <motion.div
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? "16px" : "40px", marginBottom: isMobile ? "36px" : "60px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase", marginBottom: "14px" }}>
              Why Auta
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, color: FG, margin: 0 }}>
              Built different, by design.
            </h2>
          </div>
          <p style={{ maxWidth: isMobile ? "100%" : "360px", fontSize: "15px", color: MUTED, lineHeight: 1.6, margin: 0, flexShrink: 0 }}>
            A side-by-side look at what makes Auta the smarter choice for modern annotation teams.
          </p>
        </motion.div>

        {/* Exclusive callout cards */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {exclusives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: PANEL,
                borderRadius: "14px",
                border: `1px solid ${LINE}`,
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", borderRadius: "14px 14px 0 0", background: GREEN }} />
              {/* Icon */}
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: GREEN_SOFT, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", marginTop: "4px" }}>
                <item.icon size={18} color={GREEN} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 500, color: FG, margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
                <span style={{ flexShrink: 0, fontFamily: MONO, fontSize: "9px", fontWeight: 700, padding: "3px 7px", borderRadius: "4px", background: GREEN_SOFT, color: GREEN, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Only Auta
                </span>
              </div>
              <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6, margin: 0 }}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: tableMin, border: `1px solid ${LINE}`, borderRadius: "14px 14px 0 0", background: PANEL, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>

              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: tableCols, borderBottom: `1px solid ${LINE}` }}>
                <div style={{ padding: isMobile ? "12px 10px" : "18px 20px", fontFamily: MONO, fontSize: "10px", fontWeight: 500, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em", background: BG2 }}>
                  Feature
                </div>
                {/* Auta */}
                <div style={{ padding: isMobile ? "10px 6px" : "18px 12px", background: GREEN_SOFT, borderLeft: `1px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: isMobile ? "4px" : "6px" }}>
                  <div style={{ width: isMobile ? "22px" : "30px", height: isMobile ? "22px" : "30px", borderRadius: "8px", background: GREEN_SOFT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src="/perceptron-logo.png" alt="Auta" width={isMobile ? 14 : 20} height={isMobile ? 14 : 20} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: MONO, fontSize: isMobile ? "9px" : "11px", fontWeight: 600, color: GREEN, margin: 0 }}>Auta</p>
                    {!isMobile && <p style={{ fontFamily: MONO, fontSize: "9px", color: FAINT, margin: 0 }}>by Perceptron</p>}
                  </div>
                </div>
                {/* Competitors */}
                {[
                  { label: "Roboflow", sub: "roboflow.com", logo: "https://www.google.com/s2/favicons?domain=roboflow.com&sz=64" },
                  { label: "CVAT", sub: "cvat.ai", logo: "https://www.google.com/s2/favicons?domain=cvat.ai&sz=64" },
                  { label: "Label Studio", sub: "labelstud.io", logo: "https://www.google.com/s2/favicons?domain=labelstud.io&sz=64" },
                ].map(tool => (
                  <div key={tool.label} style={{ padding: isMobile ? "10px 6px" : "18px 12px", background: BG2, borderLeft: `1px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: isMobile ? "4px" : "6px" }}>
                    <div style={{ width: isMobile ? "22px" : "30px", height: isMobile ? "22px" : "30px", borderRadius: "8px", background: PANEL, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tool.logo} alt={tool.label} width={isMobile ? 14 : 18} height={isMobile ? 14 : 18} style={{ objectFit: "contain" }} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontFamily: MONO, fontSize: isMobile ? "8px" : "11px", fontWeight: 500, color: MUTED, margin: 0, lineHeight: 1.2 }}>{isMobile ? tool.label.replace(" ", "\n") : tool.label}</p>
                      {!isMobile && <p style={{ fontFamily: MONO, fontSize: "9px", color: FAINT, margin: 0 }}>{tool.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grouped rows */}
              {categories.map((cat, catIdx) => (
                <div key={cat}>
                  {/* Category label */}
                  <div style={{ display: "grid", gridTemplateColumns: tableCols, background: BG2, borderBottom: `1px solid ${LINE}` }}>
                    <div style={{ padding: isMobile ? "6px 10px" : "8px 20px", gridColumn: "1 / -1", fontFamily: MONO, fontSize: "10px", fontWeight: 600, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {cat}
                    </div>
                  </div>

                  {rows.filter(r => r.category === cat).map((row, rowIdx) => {
                    const isExclusive = row.autaNote === "Exclusive"
                    return (
                      <motion.div
                        key={row.feature}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + catIdx * 0.05 + rowIdx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: "grid", gridTemplateColumns: tableCols, borderBottom: `1px solid ${LINE}` }}
                      >
                        <div style={{ padding: isMobile ? "11px 10px" : "14px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                          <span style={{ fontSize: isMobile ? "11.5px" : "13.5px", fontWeight: 500, color: FG, lineHeight: 1.35 }}>{row.feature}</span>
                          {isExclusive && !isMobile && (
                            <span style={{ fontFamily: MONO, fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", background: GREEN_SOFT, color: GREEN, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>
                              Only Auta
                            </span>
                          )}
                        </div>
                        {/* Auta */}
                        <div style={{ padding: isMobile ? "11px 6px" : "14px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", background: GREEN_SOFT, borderLeft: `1px solid ${LINE}` }}>
                          <StatusIcon status={row.auta} isAuta={true} />
                          {row.autaNote && row.autaNote !== "Exclusive" && !isMobile && (
                            <span style={{ fontFamily: MONO, fontSize: "9px", fontWeight: 600, color: GREEN }}>{row.autaNote}</span>
                          )}
                        </div>
                        {/* Others */}
                        {[row.roboflow, row.cvat, row.labelstudio].map((val, k) => (
                          <div key={k} style={{ padding: isMobile ? "11px 6px" : "14px 12px", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${LINE}` }}>
                            <StatusIcon status={val} isAuta={false} />
                          </div>
                        ))}
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Table footer + CTA */}
          <div style={{ background: PANEL, border: `1px solid ${LINE}`, borderTop: "none", borderRadius: "0 0 14px 14px", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              {[
                { icon: <Check size={11} color="#16a34a" strokeWidth={2.5} />, bg: "rgba(22,163,74,0.08)", label: "Full support" },
                { icon: <Minus size={11} color="#d97706" strokeWidth={2.5} />, bg: "rgba(245,158,11,0.08)", label: "Partial" },
                { icon: <X size={10} color={FAINT} strokeWidth={2} />, bg: "rgba(0,0,0,0.04)", label: "Not available" },
              ].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: MUTED }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: l.bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    {l.icon}
                  </span>
                  {l.label}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "8px",
                background: GREEN, color: "#fff",
                border: `1px solid ${GREEN_2}`,
                fontSize: "13.5px", fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(22,163,74,0.25)",
                transition: "background 120ms, transform 100ms",
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = GREEN_2; el.style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = GREEN; el.style.transform = "" }}
            >
              Try Auta Now
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "14px", marginTop: "40px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { value: "5×",  label: "fewer clicks per annotation task" },
            { value: "20+", label: "export formats supported" },
            { value: "10×", label: "faster than manual labeling" },
            { value: "0",   label: "images needed for zero-shot mode" },
          ].map(stat => (
            <div key={stat.label} style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: "12px", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p style={{ fontFamily: MONO, fontSize: "30px", fontWeight: 500, color: GREEN, letterSpacing: "-0.045em", margin: "0 0 4px" }}>{stat.value}</p>
              <p style={{ fontSize: "12px", color: MUTED, margin: 0, lineHeight: 1.4 }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
