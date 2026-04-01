"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  MessageSquare, Brain, Layers, ScanLine, Video, Wand2, Package,
  ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react"
import WaitlistModal from "@/components/waitlist-modal"
import { FeatureAnimation } from "@/components/feature-animations"

const icons = [MessageSquare, Brain, Layers, ScanLine, Video, Wand2, Package]

const features = [
  {
    id: "01",
    title: "Conversational Annotation",
    description:
      "Create and run annotation tasks directly from chat. Just say what you want — \"Segment all the monkeys\" or \"Draw bounding boxes around vehicles\" — and the AI builds and executes the task.",
    color: "#53C5E6",
    tag: "Chat-to-Task",
  },
  {
    id: "02",
    title: "AI Dataset Planner",
    description:
      "Upload raw images and describe your goal. The AI analyzes the request, suggests the label schema, picks the right annotation type, and immediately starts processing your dataset.",
    color: "#C26FCF",
    tag: "Smart Planning",
  },
  {
    id: "03",
    title: "Polygon Segmentation",
    description:
      "Pixel-perfect segmentation masks powered by state-of-the-art AI. Automated brush and polygon tools for precise object delineation across thousands of images — no manual effort.",
    color: "#2178C7",
    tag: "AI Segmentation",
  },
  {
    id: "04",
    title: "Object Detection",
    description:
      "Automatic bounding box annotations using state-of-the-art detection models. From simple objects to dense urban scenes — detect and label everything in a single prompt.",
    color: "#F1B646",
    tag: "Bounding Boxes",
  },
  {
    id: "05",
    title: "Video Annotation & Tracking",
    description:
      "Upload raw MP4 files and use natural language prompts to annotate entire videos. Integrated tracking pipeline keeps object IDs consistent and movement smooth across the timeline.",
    color: "#E05A6D",
    tag: "Video + NLP",
  },
  {
    id: "06",
    title: "Zero-Shot Dataset Generation",
    description:
      "You don't even need images. Describe the dataset you need — the tool sources images, generates masks, bounding boxes, and labels entirely on its own. Just review and export.",
    color: "#53C5E6",
    tag: "No Images Needed",
  },
  {
    id: "07",
    title: "Multi-Format Export",
    description:
      "Export in COCO, PASCAL VOC, YOLO, Ultralytics YOLO, CVAT XML, Datumaro, LabelMe, ImageNet, MOT, KITTI, CamVid, Cityscapes, Open Images, WIDER Face, and more.",
    color: "#C26FCF",
    tag: "20+ Formats",
  },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const active = features[activeIndex]
  const ActiveIcon = icons[activeIndex]

  const prev = () => setActiveIndex((i) => (i - 1 + features.length) % features.length)
  const next = () => setActiveIndex((i) => (i + 1) % features.length)

  return (
    <section
      id="services"
      className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900"
    >
      {/* Background texture */}
      <div className="absolute inset-0 light-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${active.color}0d, transparent 70%)`,
        }}
        transition={{ duration: 0.7 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#C26FCF] mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="cosmic-heading-gradient">The Best Choice for<br />Your Vision Task</span>
          </h2>
          <p className="mt-5 text-slate-400 text-base max-w-md mx-auto leading-relaxed">
            Works with images, videos, and every annotation type — no config required.
          </p>
        </motion.div>

        {/* ── Tab strip ──────────────────────────────────────── */}
        <motion.div
          className="flex flex-nowrap justify-center gap-2 mb-12 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {features.map((f, i) => {
            const TabIcon = icons[i]
            const isActive = i === activeIndex
            return (
              <motion.button
                key={f.id}
                onClick={() => setActiveIndex(i)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={
                  isActive
                    ? { background: f.color, color: "#fff", boxShadow: `0 4px 20px ${f.color}40` }
                    : { background: "#f1f5f9", color: "#94a3b8" }
                }
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <TabIcon size={12} />
                {f.tag}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Main content card ──────────────────────────────── */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            border: `1px solid ${active.color}22`,
            boxShadow: `0 0 0 1px ${active.color}10, 0 32px 80px -12px ${active.color}28`,
          }}
          animate={{
            boxShadow: `0 0 0 1px ${active.color}10, 0 32px 80px -12px ${active.color}28`,
          }}
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Accent bar */}
          <motion.div
            className="h-[3px] w-full"
            animate={{
              background: `linear-gradient(90deg, ${active.color}, ${active.color}55, transparent)`,
            }}
            transition={{ duration: 0.4 }}
          />

          <div className="grid lg:grid-cols-[1fr_420px]">

            {/* Animation panel */}
            <div className="relative bg-slate-50/70 overflow-hidden" style={{ minHeight: 420 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.38, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <FeatureAnimation featureId={active.id} color={active.color} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Details panel */}
            <div className="flex flex-col justify-between bg-white border-l border-slate-100 p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Tag + number */}
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${active.color}18`, color: active.color }}
                    >
                      {active.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-300">{active.id} / {String(features.length).padStart(2, "0")}</span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${active.color}15` }}
                  >
                    <ActiveIcon size={22} style={{ color: active.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug mb-4">
                    {active.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom controls */}
              <div className="mt-10 space-y-6">
                {/* CTA */}
                <button
                  type="button"
                  onClick={() => setWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 cursor-pointer group"
                  style={{ color: active.color }}
                >
                  Try AUTA Now
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  {/* Dot indicators */}
                  <div className="flex items-center gap-1.5">
                    {features.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === activeIndex ? 20 : 6,
                          height: 6,
                          background: i === activeIndex ? active.color : "#e2e8f0",
                        }}
                      />
                    ))}
                  </div>

                  {/* Arrow buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-700 transition-all duration-200 cursor-pointer"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={next}
                      className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer"
                      style={{
                        background: active.color,
                        borderColor: active.color,
                        color: "#fff",
                      }}
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
