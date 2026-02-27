"use client"

import { motion, useInView } from "framer-motion"
import { Check, Minus, X, Zap, Sparkles, MessageSquare } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
import WaitlistModal from "@/components/waitlist-modal"

// ─── Data ────────────────────────────────────────────────────────────────────

const exclusives = [
  {
    icon: MessageSquare,
    color: "#53C5E6",
    title: "Chat-to-Task Annotation",
    description:
      "The only tool where you simply describe your task in plain English and the AI builds, configures, and runs the entire annotation pipeline for you.",
  },
  {
    icon: Sparkles,
    color: "#C26FCF",
    title: "Zero-Shot Dataset Generation",
    description:
      "Don't have images yet? Describe your dataset — Auta sources imagery, generates annotations, and exports a ready-to-train dataset. No images required.",
  },
  {
    icon: Zap,
    color: "#F1B646",
    title: ".zip to Annotated Dataset",
    description:
      "Drop a zip file, describe your goal in one sentence. Auta handles label schema, annotation type, model selection, and batch processing automatically.",
  },
]

type Status = "full" | "partial" | "none"

interface Row {
  feature: string
  category: string
  auta: Status
  roboflow: Status
  cvat: Status
  labelstudio: Status
  autaNote?: string
}

const rows: Row[] = [
  { feature: "Chat-to-Task Annotation",        category: "AI & Automation",  auta: "full",  roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "Zero-Shot Dataset Generation",    category: "AI & Automation",  auta: "full",  roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "Natural Language Video Tracking", category: "AI & Automation",  auta: "full",  roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "AI Dataset Planner",              category: "AI & Automation",  auta: "full",  roboflow: "partial", cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "AI-Powered Segmentation",         category: "Annotation",       auta: "full",  roboflow: "full",    cvat: "partial", labelstudio: "partial" },
  { feature: "Auto-annotation (AI models)",     category: "Annotation",       auta: "full",  roboflow: "full",    cvat: "full",    labelstudio: "partial" },
  { feature: "Bounding Boxes & Polygons",       category: "Annotation",       auta: "full",  roboflow: "full",    cvat: "full",    labelstudio: "full" },
  { feature: "Video Annotation",                category: "Annotation",       auta: "full",  roboflow: "partial", cvat: "full",    labelstudio: "full" },
  { feature: "20+ Export Formats",              category: "Export & Workflow", auta: "full",  roboflow: "partial", cvat: "full",    labelstudio: "full",    autaNote: "20+" },
  { feature: "Zero-config .zip Upload",         category: "Export & Workflow", auta: "full",  roboflow: "none",    cvat: "none",    labelstudio: "none",    autaNote: "Exclusive" },
  { feature: "No-code Setup",                   category: "Export & Workflow", auta: "full",  roboflow: "full",    cvat: "none",    labelstudio: "partial" },
]

const tools = [
  {
    key: "auta",
    label: "Auta",
    sub: "by Perceptron",
    logo: null, // uses local Image
    highlight: true,
  },
  {
    key: "roboflow",
    label: "Roboflow",
    sub: "roboflow.com",
    logo: "https://www.google.com/s2/favicons?domain=roboflow.com&sz=64",
    highlight: false,
  },
  {
    key: "cvat",
    label: "CVAT",
    sub: "cvat.ai",
    logo: "https://www.google.com/s2/favicons?domain=cvat.ai&sz=64",
    highlight: false,
  },
  {
    key: "labelstudio",
    label: "Label Studio",
    sub: "labelstud.io",
    logo: "https://www.google.com/s2/favicons?domain=labelstud.io&sz=64",
    highlight: false,
  },
] as const

const categories = Array.from(new Set(rows.map((r) => r.category)))

// ─── Small helpers ────────────────────────────────────────────────────────────

function StatusIcon({ status, isAuta }: { status: Status; isAuta: boolean }) {
  if (status === "full")
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${isAuta ? "bg-[#2178C7]/10" : "bg-emerald-50"}`}>
        <Check size={14} className={isAuta ? "text-[#2178C7]" : "text-emerald-500"} strokeWidth={2.5} />
      </span>
    )
  if (status === "partial")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50">
        <Minus size={14} className="text-amber-400" strokeWidth={2.5} />
      </span>
    )
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-50">
      <X size={13} className="text-slate-300" strokeWidth={2} />
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Comparison() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <section ref={ref} id="projects" className="relative py-24 md:py-36 overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute inset-0 light-mesh pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2178C7]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C26FCF]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2178C7] mb-3">
            Why Auta
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="cosmic-heading-gradient">Built Different, By Design</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed md:text-right">
              A side-by-side look at what makes Auta the smarter choice for modern annotation teams.
            </p>
          </div>
          <div className="mt-5 h-px bg-slate-200" />
        </motion.div>

        {/* ── Auta Exclusive callout cards ── */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {exclusives.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-400 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {/* Faint glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 20% 30%, ${item.color}10, transparent 70%)` }}
              />
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: item.color }} />

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}15` }}
              >
                <item.icon size={20} style={{ color: item.color }} />
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-slate-800 leading-snug">{item.title}</h3>
                <span
                  className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  Only Auta
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Comparison table ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Mobile scroll hint */}
          <p className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2 sm:hidden">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scroll to compare
          </p>

          {/* Horizontal scroll wrapper */}
          <div className="overflow-x-auto rounded-t-3xl shadow-xl">
            <div className="min-w-[540px] sm:min-w-[700px] bg-white border border-slate-200 rounded-t-3xl overflow-hidden">

              {/* Table header row */}
              <div className="grid grid-cols-[1fr_repeat(4,_90px)] sm:grid-cols-[1fr_repeat(4,_140px)] border-b border-slate-100">
                <div className="px-4 sm:px-6 py-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Feature</div>
                {tools.map((tool) => (
                  <div
                    key={tool.key}
                    className={`px-2 py-5 flex flex-col items-center justify-center gap-1.5 border-l border-slate-100 ${
                      tool.highlight
                        ? "bg-gradient-to-b from-[#2178C7]/[0.06] to-[#2178C7]/[0.02]"
                        : ""
                    }`}
                  >
                    {/* Logo */}
                    {tool.key === "auta" ? (
                      <div className="w-8 h-8 rounded-lg bg-[#2178C7]/10 flex items-center justify-center">
                        <Image src="/perceptron-logo.png" alt="Auta" width={22} height={22} className="w-[22px] h-[22px]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tool.logo}
                          alt={tool.label}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    )}
                    {/* Label */}
                    <div className="text-center">
                      <p className={`text-[11px] font-bold leading-tight ${tool.highlight ? "text-[#2178C7]" : "text-slate-700"}`}>
                        {tool.label}
                      </p>
                      <p className="text-[9px] text-slate-400 leading-tight hidden sm:block">{tool.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows grouped by category */}
              {categories.map((cat, catIdx) => (
                <div key={cat}>
                  {/* Category label */}
                  <div className="grid grid-cols-[1fr_repeat(4,_90px)] sm:grid-cols-[1fr_repeat(4,_140px)] bg-slate-50/70 border-b border-slate-100">
                    <div className="px-4 sm:px-6 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 col-span-5">
                      {cat}
                    </div>
                  </div>

                  {rows
                    .filter((r) => r.category === cat)
                    .map((row, rowIdx) => {
                      const isExclusive = row.autaNote === "Exclusive"
                      return (
                        <motion.div
                          key={row.feature}
                          className="grid grid-cols-[1fr_repeat(4,_90px)] sm:grid-cols-[1fr_repeat(4,_140px)] border-b border-slate-100/80 last:border-b-0 group"
                          initial={{ opacity: 0, x: -8 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + catIdx * 0.05 + rowIdx * 0.04,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                        >
                          {/* Feature name */}
                          <div className="px-4 sm:px-6 py-4 flex items-center gap-2 group-hover:bg-slate-50/50 transition-colors duration-150">
                            <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{row.feature}</span>
                            {isExclusive && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#2178C7]/10 text-[#2178C7] uppercase tracking-wide flex-shrink-0">
                                Only Auta
                              </span>
                            )}
                          </div>

                          {/* Auta column */}
                          <div className="px-2 py-4 flex items-center justify-center border-l border-slate-100 bg-[#2178C7]/[0.03] group-hover:bg-[#2178C7]/[0.06] transition-colors duration-150">
                            <div className="flex flex-col items-center gap-1">
                              <StatusIcon status={row.auta} isAuta={true} />
                              {row.autaNote && row.autaNote !== "Exclusive" && (
                                <span className="text-[9px] font-semibold text-[#2178C7]">{row.autaNote}</span>
                              )}
                            </div>
                          </div>

                          {/* Roboflow */}
                          <div className="px-2 py-4 flex items-center justify-center border-l border-slate-100 group-hover:bg-slate-50/50 transition-colors duration-150">
                            <StatusIcon status={row.roboflow} isAuta={false} />
                          </div>

                          {/* CVAT */}
                          <div className="px-2 py-4 flex items-center justify-center border-l border-slate-100 group-hover:bg-slate-50/50 transition-colors duration-150">
                            <StatusIcon status={row.cvat} isAuta={false} />
                          </div>

                          {/* Label Studio */}
                          <div className="px-2 py-4 flex items-center justify-center border-l border-slate-100 group-hover:bg-slate-50/50 transition-colors duration-150">
                            <StatusIcon status={row.labelstudio} isAuta={false} />
                          </div>
                        </motion.div>
                      )
                    })}
                </div>
              ))}

            </div>
          </div>

          {/* Legend + CTA — outside scroll container so always full-width */}
          <div className="bg-white border border-t-0 border-slate-200 rounded-b-3xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 inline-flex items-center justify-center">
                  <Check size={11} className="text-emerald-500" strokeWidth={2.5} />
                </span>
                Full support
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-50 inline-flex items-center justify-center">
                  <Minus size={11} className="text-amber-400" strokeWidth={2.5} />
                </span>
                Partial
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-50 inline-flex items-center justify-center">
                  <X size={10} className="text-slate-300" strokeWidth={2} />
                </span>
                Not available
              </span>
            </div>
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-3 rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg w-full sm:w-auto cursor-pointer"
              style={{ background: "linear-gradient(135deg, #2178C7, #53C5E6)" }}
            >
              Try Auta Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {[
            { value: "5×",  label: "fewer clicks per annotation task" },
            { value: "20+", label: "export formats supported" },
            { value: "10×", label: "faster than manual labeling" },
            { value: "0",   label: "images needed for zero-shot mode" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 px-5 py-4 text-center shadow-sm">
              <p className="text-3xl font-bold cosmic-heading-gradient mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
