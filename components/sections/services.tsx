"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import WaitlistModal from "@/components/waitlist-modal"

const features = [
  {
    id: "01",
    title: "Conversational Annotation",
    description:
      "Create and run annotation tasks directly from chat. Just say what you want — \"Segment all the monkeys\" or \"Draw bounding boxes around vehicles\" — and the AI builds and executes the task.",
    visual: "/images/auta/auta-demo.gif",
    color: "#53C5E6",
    tag: "Chat-to-Task",
  },
  {
    id: "02",
    title: "AI Dataset Planner",
    description:
      "Upload raw images and describe your goal. The AI analyzes the request, suggests the label schema, picks the right annotation type, and immediately starts processing your dataset.",
    visual: "/images/auta/interactive-annotation.gif",
    color: "#C26FCF",
    tag: "Smart Planning",
  },
  {
    id: "03",
    title: "Polygon Segmentation",
    description:
      "Pixel-perfect segmentation masks powered by state-of-the-art AI. Automated brush and polygon tools for precise object delineation across thousands of images — no manual effort.",
    visual: "/images/auta/segmentation-demo.gif",
    color: "#2178C7",
    tag: "AI Segmentation",
  },
  {
    id: "04",
    title: "Object Detection",
    description:
      "Automatic bounding box annotations using state-of-the-art detection models. From simple objects to dense urban scenes — detect and label everything in a single prompt.",
    visual: "/images/auta/dataset-demo.gif",
    color: "#F1B646",
    tag: "Bounding Boxes",
  },
  {
    id: "05",
    title: "Video Annotation & Tracking",
    description:
      "Upload raw MP4 files and use natural language prompts to annotate entire videos. Integrated tracking pipeline keeps object IDs consistent and movement smooth across the timeline.",
    visual: "/images/auta/ai-tools.gif",
    color: "#E05A6D",
    tag: "Video + NLP",
  },
  {
    id: "06",
    title: "Zero-Shot Dataset Generation",
    description:
      "You don't even need images. Describe the dataset you need — the tool sources images, generates masks, bounding boxes, and labels entirely on its own. Just review and export.",
    visual: "/images/auta/auto-annotation.png",
    color: "#53C5E6",
    tag: "No Images Needed",
  },
  {
    id: "07",
    title: "Multi-Format Export",
    description:
      "Export in COCO, PASCAL VOC, YOLO, Ultralytics YOLO, CVAT XML, Datumaro, LabelMe, ImageNet, MOT, KITTI, CamVid, Cityscapes, Open Images, WIDER Face, and more.",
    visual: "/images/auta/auta-demo.gif",
    color: "#C26FCF",
    tag: "20+ Formats",
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const active = features[activeIndex]

  return (
    <section ref={ref} id="services" className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
      {/* Subtle background */}
      <div className="absolute inset-0 light-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      {/* Soft glow behind image panel */}
      <motion.div
        className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        animate={{ background: `radial-gradient(circle, ${active.color}18, transparent 70%)` }}
        transition={{ duration: 0.6 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#C26FCF] mb-3">
            Features
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="cosmic-heading-gradient">The Best Choice for Your Vision Task</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed md:text-right">
              Works with images, videos, and every annotation type — no config required.
            </p>
          </div>
          <div className="mt-5 h-px bg-slate-100" />
        </motion.div>

        {/* Body — list left, large visual right */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-start">

          {/* Left — feature list */}
          <div className="lg:sticky lg:top-28">
            {features.map((feature, index) => {
              const isActive = index === activeIndex
              return (
                <motion.div
                  key={feature.id}
                  className="relative border-b border-slate-100 last:border-b-0 cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                    style={{ background: feature.color }}
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.22 }}
                  />

                  <div className={`pl-5 pr-3 py-4 rounded-r-xl transition-colors duration-200 ${isActive ? "bg-slate-50" : "hover:bg-slate-50/60"}`}>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono tabular-nums flex-shrink-0 transition-colors duration-200"
                        style={{ color: isActive ? feature.color : "#cbd5e1" }}
                      >
                        {feature.id}
                      </span>
                      <span
                        className={`text-sm font-semibold transition-colors duration-200 flex-1 ${
                          isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-700"
                        }`}
                      >
                        {feature.title}
                      </span>
                      {isActive && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: `${feature.color}15`, color: feature.color }}
                        >
                          {feature.tag}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="text-xs text-slate-500 leading-relaxed pl-8 overflow-hidden"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA below list */}
            <motion.div
              className="mt-6 pl-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                style={{ color: active.color }}
              >
                Try AUTA Now
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Right — large visual panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              animate={{ boxShadow: `0 25px 80px -12px ${active.color}30` }}
              transition={{ duration: 0.5 }}
              style={{ border: `1px solid ${active.color}20` }}
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] z-20"
                animate={{ background: `linear-gradient(90deg, ${active.color}, ${active.color}40, transparent)` }}
                transition={{ duration: 0.4 }}
              />

              {/* Image — tall and full-width */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative w-full bg-slate-100"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={active.visual}
                    alt={active.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom info bar */}
              <div className="relative bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex + "-title"}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-bold text-slate-800"
                    >
                      {active.title}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex + "-tag"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="text-xs mt-0.5"
                      style={{ color: active.color }}
                    >
                      {active.tag}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Dot pagination */}
                <div className="flex items-center gap-1.5">
                  {features.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIndex ? 18 : 6,
                        height: 6,
                        background: i === activeIndex ? active.color : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature number indicator */}
            <div className="flex items-center gap-2 mt-4 px-1">
              <span className="text-xs text-slate-400 tabular-nums">{active.id} / {String(features.length).padStart(2, "0")}</span>
              <div className="flex-1 h-px bg-slate-100 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 rounded-full"
                  style={{ background: active.color }}
                  animate={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
    </section>
  )
}
