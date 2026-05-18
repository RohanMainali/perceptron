"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MessageSquare, Brain, Crosshair, Layers, ScanLine, Video, Wand2, Package, ArrowRight } from "lucide-react"
import WaitlistModal from "@/components/waitlist-modal"
import { FeatureAnimation } from "@/components/feature-animations"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

const FG      = "#0c0c0a"
const MUTED   = "#5a5a52"
const FAINT   = "#aaaaaa"
const MONO    = "'Geist Mono', 'Courier New', monospace"
const GREEN   = "#16a34a"
const GREEN_2 = "#15803d"
const LINE    = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL   = "#ffffff"
const BG2     = "#f6f6f3"
const SECTION = "#ffffff"   // light

const ICONS = [MessageSquare, Brain, Crosshair, Layers, ScanLine, Video, Wand2, Package]

const FEATURES = [
  {
    id: "01", tag: "Chat-to-Task",
    title: "Conversational Annotation",
    description: "Create and run annotation tasks directly from chat. Just say what you want — \"Segment all the monkeys\" or \"Draw bounding boxes around vehicles\" — and the AI builds and executes the task.",
    file: "auta › task › chest-xray",
  },
  {
    id: "02", tag: "Plan + Execute",
    title: "Agentic AI Workflow",
    description: "Tell Auta what you want to build. It plans the dataset workflow, selects the right annotation approach and starts processing your data with minimal manual setup.",
    file: "auta › plan › preview",
  },
  {
    id: "03", tag: "One Box to Labels",
    title: "Exemplar Box Learning",
    description: "Draw one box around an example object. Auta learns the visual pattern, identifies similar objects across your dataset, and generates precise masks or labels without complex prompts or manual configuration.",
    file: "auta › exemplar › object-match",
  },
  {
    id: "04", tag: "AI Segmentation",
    title: "Polygon Segmentation",
    description: "Pixel-perfect segmentation masks powered by state-of-the-art AI. Automated brush and polygon tools for precise object delineation across thousands of images — no manual effort.",
    file: "auta › segment › lesion-001",
  },
  {
    id: "05", tag: "Bounding Boxes",
    title: "Object Detection",
    description: "Automatic bounding box annotations using state-of-the-art detection models. From simple objects to dense urban scenes — detect and label everything in a single prompt.",
    file: "auta › detect › urban-scene",
  },
  {
    id: "06", tag: "Video + NLP",
    title: "Video Annotation & Tracking",
    description: "Upload raw MP4 files and use natural language prompts to annotate entire videos. Integrated tracking pipeline keeps object IDs consistent and movement smooth across the timeline.",
    file: "auta › video › match-clip",
  },
  {
    id: "07", tag: "No Images Needed",
    title: "Zero-Shot Dataset Generation",
    description: "You don't even need images. Describe the dataset you need — the tool sources images, generates masks, bounding boxes, and labels entirely on its own. Just review and export.",
    file: "auta › generate › retail-v1",
  },
  {
    id: "08", tag: "20+ Formats",
    title: "Multi-Format Export",
    description: "Export in COCO, PASCAL VOC, YOLO, Ultralytics YOLO, CVAT XML, Datumaro, LabelMe, ImageNet, MOT, KITTI, CamVid, Cityscapes, Open Images, WIDER Face, and more.",
    file: "auta › export › formats",
  },
]

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const active = FEATURES[activeIdx]
  const ActiveIcon = ICONS[activeIdx]
  const isMobile = useIsMobile(1024)

  return (
    <section
      id="services"
      style={{
        padding: isMobile ? "72px 0 80px" : "120px 0 130px",
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
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? "16px" : "40px", marginBottom: isMobile ? "32px" : "56px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase", marginBottom: "14px" }}>
              Features
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, color: FG, margin: 0 }}>
              The best choice for<br />your vision task.
            </h2>
          </div>
          <p style={{ maxWidth: isMobile ? "100%" : "360px", fontSize: "15px", color: MUTED, lineHeight: 1.6, margin: 0, flexShrink: 0 }}>
            Works with images, videos, and every annotation type — no config required.
          </p>
        </motion.div>

        {/* Two-column layout: sidebar tabs + feature panel */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: "24px", alignItems: "start" }}>

          {/* Sidebar tabs */}
          <motion.div
            style={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: isMobile ? "nowrap" : undefined, overflowX: isMobile ? "auto" : undefined, gap: "2px", position: isMobile ? "static" : "sticky", top: "80px", paddingBottom: isMobile ? "4px" : 0 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {FEATURES.map((f, i) => {
              const Icon = ICONS[i]
              const isActive = i === activeIdx
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    textAlign: "left",
                    background: isActive ? PANEL : "transparent",
                    border: `1px solid ${isActive ? LINE_STR : "transparent"}`,
                    padding: isMobile ? "10px 12px" : "13px 16px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 140ms, border-color 140ms",
                    width: isMobile ? "auto" : "100%",
                    flexShrink: isMobile ? 0 : undefined,
                    whiteSpace: isMobile ? "nowrap" : undefined,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = BG2 }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent" }}
                >
                  {/* Number */}
                  {!isMobile && (
                    <span style={{ position: "absolute", right: "14px", top: "14px", fontFamily: MONO, fontSize: "10px", color: FAINT }}>
                      {f.id}
                    </span>
                  )}
                  {/* Icon */}
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "7px", flexShrink: 0,
                    background: isActive ? GREEN : BG2,
                    border: `1px solid ${isActive ? GREEN_2 : LINE}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isActive ? "#fff" : MUTED,
                    transition: "background 140ms, color 140ms",
                  }}>
                    <Icon size={13} />
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                    {isMobile ? (
                      <span style={{ fontSize: "12px", fontWeight: 500, color: FG, letterSpacing: "-0.01em" }}>
                        {f.tag}
                      </span>
                    ) : (
                      <>
                        <span style={{ fontSize: "13.5px", fontWeight: 500, color: FG, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {f.title}
                        </span>
                        <span style={{ fontFamily: MONO, fontSize: "10px", color: FAINT, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          {f.tag}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* Feature panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: "14px",
              background: BG2,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Panel chrome */}
            <div style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${LINE}`,
              display: "flex", alignItems: "center", gap: "10px",
              background: PANEL,
            }}>
              <div style={{ display: "flex", gap: "5px", marginRight: "6px" }}>
                {["#fc635d", "#fdbc40", "#34c749"].map((c, i) => (
                  <span key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontFamily: MONO, fontSize: "11.5px", color: MUTED }}
                >
                  {active.file}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Animation */}
            <div style={{ position: "relative", minHeight: ["01", "02", "03"].includes(active.id) ? 0 : "380px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  style={["01", "02", "03"].includes(active.id) ? { width: "100%" } : { position: "absolute", inset: 0 }}
                >
                  <FeatureAnimation featureId={active.id} color={GREEN} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description + CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: isMobile ? "18px 16px" : "22px 24px",
                  borderTop: `1px solid ${LINE}`,
                  background: PANEL,
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(22,163,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ActiveIcon size={16} color={GREEN} />
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 500, color: FG, margin: 0, letterSpacing: "-0.02em" }}>
                      {active.title}
                    </h3>
                    <span style={{ fontFamily: MONO, fontSize: "10px", padding: "3px 8px", borderRadius: "4px", background: "rgba(22,163,74,0.08)", color: GREEN, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {active.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: "13.5px", color: MUTED, lineHeight: 1.6, margin: 0, maxWidth: "680px" }}>
                    {active.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWaitlistOpen(true)}
                  style={{
                    flexShrink: 0,
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "10px 18px", borderRadius: "8px",
                    background: GREEN, color: "#fff",
                    border: `1px solid ${GREEN_2}`,
                    fontSize: "13px", fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 3px rgba(22,163,74,0.25)",
                    transition: "background 120ms, transform 100ms",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = GREEN_2; el.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = GREEN; el.style.transform = "" }}
                >
                  Try Auta Now <ArrowRight size={13} />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
