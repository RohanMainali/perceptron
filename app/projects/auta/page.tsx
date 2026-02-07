"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import {
  MessageSquare,
  Upload,
  Zap,
  Box,
  Layers,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Clock,
  Github,
  ExternalLink,
  Sparkles,
  Database,
  Cpu,
  Target,
  Video,
  Workflow,
  ChevronRight,
} from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function AutaProjectPage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: 1 + (i % 3),
        delay: (i * 0.4) % 5,
        duration: 4 + (i % 4),
      })),
    []
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const howItWorks = [
    {
      step: "01",
      icon: Upload,
      title: "Drop Your Dataset",
      description: "Upload a .zip file of images directly into the chat interface. No need to manually create projects or configure task settings.",
      color: "#2178C7",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Describe the Task",
      description: "Tell the AI what you want in natural language — 'Segment all persons in this dataset' or 'Detect and label all vehicles'.",
      color: "#53C5E6",
    },
    {
      step: "03",
      icon: Zap,
      title: "Auto Planning",
      description: "The AI figures out labels, colors, IDs, annotation type (segmentation, bounding boxes, etc.) and task structure automatically.",
      color: "#C26FCF",
    },
    {
      step: "04",
      icon: Target,
      title: "Run & Annotate",
      description: "One click, and the task is created with SAM3-powered annotations applied across your entire dataset in seconds.",
      color: "#F1B646",
    },
  ]

  const currentFeatures = [
    { icon: MessageSquare, title: "Chat-to-Task Creation", description: "Natural language task setup — describe what you want, skip the config menus" },
    { icon: Layers, title: "Auto Label Planning", description: "AI automatically creates labels, assigns colors, and determines annotation types" },
    { icon: Box, title: "Bounding Box Detection", description: "Automatic bounding box annotations powered by state-of-the-art detection models" },
    { icon: Target, title: "Segmentation Masks", description: "Pixel-perfect segmentation masks using SAM3 (Segment Anything Model 3)" },
    { icon: Database, title: "Batch Processing", description: "Process entire datasets at once — not one image at a time" },
    { icon: Workflow, title: "Multi-format Export", description: "Export in COCO, PASCAL VOC, YOLO, and 20+ other annotation formats" },
  ]

  const futureFeatures = [
    { icon: Video, title: "Video Frame Tracking", description: "Object ID tracking across video frames with temporal consistency", phase: "Phase 2" },
    { icon: Sparkles, title: "Auto Dataset Generation", description: "Generate synthetic annotated datasets from text descriptions with minimal human input", phase: "Phase 2" },
    { icon: Cpu, title: "Active Learning Loop", description: "Intelligently select the most informative samples for human review to maximize model improvement", phase: "Phase 3" },
    { icon: GitBranch, title: "FiftyOne Integration", description: "Plugin for FiftyOne — the open-source dataset curation and model analysis tool", phase: "Phase 3" },
  ]

  const techStack = [
    { name: "Python", description: "Core backend" },
    { name: "PyTorch", description: "Deep learning" },
    { name: "SAM3", description: "Segmentation" },
    { name: "CVAT", description: "Annotation engine" },
    { name: "Docker", description: "Containerization" },
    { name: "React", description: "Frontend UI" },
    { name: "Traefik", description: "Reverse proxy" },
    { name: "PostgreSQL", description: "Database" },
    { name: "Redis", description: "Task queue" },
  ]

  const supportedFormats = [
    "COCO", "PASCAL VOC", "YOLO", "Ultralytics YOLO", "CVAT XML",
    "Datumaro", "LabelMe", "ImageNet", "MOT", "KITTI",
    "CamVid", "Cityscapes", "Open Images", "WIDER Face",
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background — matches PageHero pattern */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: "url('/images/other-hero-background.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-background/80" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(83,197,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(83,197,230,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#53C5E6]/30"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 w-full px-6 md:px-12 lg:px-16 pt-32 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Copy */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/projects" className="text-white/50 hover:text-white/80 transition-colors text-sm">
                  Projects
                </Link>
                <ChevronRight size={14} className="text-white/30" />
                <span className="text-[#53C5E6] text-sm font-medium">Auta</span>
              </motion.div>

              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2178C7]/30 bg-[#2178C7]/10 text-[#53C5E6] text-sm font-medium mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-[#53C5E6] animate-pulse" />
                Active Development — Public Beta Coming Soon
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                From <span className="cosmic-heading-gradient">.zip</span> to Annotated Dataset in{" "}
                <span className="cosmic-heading-gradient">Seconds</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Auta is an AI-powered annotation tool that lets you annotate by vibe. Describe your task in plain English — the AI handles labels, segmentation masks, and bounding boxes automatically.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <a
                  href="https://github.com/perceptronai-org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="cosmic-btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Github size={20} /> View on GitHub
                  </motion.span>
                </a>
                <Link href="/contact">
                  <motion.span
                    className="cosmic-btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Request Early Access <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Right — Demo GIF */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2178C7]/10">
                <Image
                  src="/images/auta/auta-demo.gif"
                  alt="Auta annotation platform demo"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[#53C5E6]">SAM3</span> Powered
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-[#F1B646]">20+</span> Export Formats
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* How It Works */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#2178C7] mb-4">
              How It Works
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">Annotation Made Effortless</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Setting up annotation projects shouldn&apos;t take longer than the actual annotation. With Auta, it doesn&apos;t.
            </p>
            <motion.div
              className="mt-6 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #2178C7, #53C5E6, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                className="group relative"
                variants={cardVariants}
              >
                <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 h-full">
                  {/* Step number */}
                  <div
                    className="text-6xl font-black opacity-[0.06] absolute top-4 right-4 leading-none"
                    style={{ color: item.color }}
                  >
                    {item.step}
                  </div>

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}12` }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>

                  {/* Connector arrow (not on last) */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight size={16} className="text-slate-300" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Showcase */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#C26FCF] mb-4">
              See It In Action
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">From Raw Images to Annotations</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Watch how Auta transforms raw datasets into fully annotated projects with just a natural language prompt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                src: "/images/auta/segmentation-demo.gif",
                title: "Polygon Segmentation",
                description: "AI-powered brush and polygon tools for precise object segmentation masks.",
              },
              {
                src: "/images/auta/interactive-annotation.gif",
                title: "Interactive Annotation",
                description: "Click-based interactive segmentation for rapid object delineation with real-time feedback.",
              },
              {
                src: "/images/auta/ai-tools.gif",
                title: "AI Tracker Tools",
                description: "Automatic object tracking across frames using state-of-the-art detection and tracking models.",
              },
              {
                src: "/images/auta/dataset-demo.gif",
                title: "Large-Scale Dataset Processing",
                description: "Process complex urban scene datasets with hundreds of objects per frame across multiple classes.",
              },
            ].map((demo, i) => (
              <motion.div
                key={demo.title}
                className="cosmic-card rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={demo.src}
                    alt={demo.title}
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{demo.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{demo.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Features */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4">
              What&apos;s Implemented
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">Current Features</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Here&apos;s what Auta can do right now — and we&apos;re shipping new capabilities every week.
            </p>
            <motion.div
              className="mt-6 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {currentFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                className="group"
                variants={cardVariants}
              >
                <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#2178C7]/10">
                      <feature.icon className="w-6 h-6 text-[#2178C7]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#2178C7] transition-colors">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={18} className="text-emerald-500/60" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#F1B646] mb-4">
              What&apos;s Next
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">Roadmap</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We&apos;re actively iterating based on community feedback. Here&apos;s what&apos;s coming.
            </p>
            <motion.div
              className="mt-6 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #F1B646, #C26FCF, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {futureFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#F1B646]/10">
                      <feature.icon className="w-6 h-6 text-[#F1B646]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold group-hover:text-[#F1B646] transition-colors">{feature.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#F1B646]/10 text-[#F1B646] border border-[#F1B646]/20">
                          {feature.phase}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Clock size={18} className="text-[#F1B646]/50" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Formats */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#C26FCF] mb-4">
                Built With
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="cosmic-heading-gradient">Technology Stack</span>
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-[#C26FCF]/30 transition-all text-center group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <p className="font-bold text-sm group-hover:text-[#C26FCF] transition-colors">{tech.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Supported Formats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4">
                Compatible
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="cosmic-heading-gradient">Export Formats</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {supportedFormats.map((format, i) => (
                  <motion.span
                    key={format}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-[#53C5E6]/10 hover:text-[#2178C7] transition-colors border border-slate-200 hover:border-[#53C5E6]/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    viewport={{ once: true }}
                  >
                    {format}
                  </motion.span>
                ))}
                <motion.span
                  className="px-4 py-2 rounded-full bg-[#53C5E6]/10 text-[#2178C7] text-sm font-medium border border-[#53C5E6]/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  + 10 more
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community & CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block text-sm font-medium tracking-widest uppercase text-[#2178C7] mb-4">
              Open Source
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">Join the Community</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Auta is built in the open. We&apos;re actively iterating based on community feedback from researchers and engineers worldwide. Whether you&apos;re skeptical about accuracy on complex classes or excited about chat-driven workflows — we want to hear from you.
            </p>
            <p className="text-slate-500 text-base mb-10 max-w-xl mx-auto italic">
              &ldquo;Even if it is a nice UI on top of those tools, and the users don&apos;t have to worry about setting up an environment to run these models, it could be a great product.&rdquo; — r/computervision
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/perceptronai-org" target="_blank" rel="noopener noreferrer">
                <motion.span
                  className="cosmic-btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github size={20} /> Star on GitHub
                </motion.span>
              </a>
              <a href="https://www.reddit.com/r/computervision/comments/1qxmh0i/from_zip_to_segmented_dataset_in_seconds/" target="_blank" rel="noopener noreferrer">
                <motion.span
                  className="cosmic-btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Discussion on Reddit <ExternalLink size={18} />
                </motion.span>
              </a>
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg border border-slate-300 text-slate-600 hover:border-[#53C5E6]/40 hover:bg-[#53C5E6]/5 hover:text-[#2178C7] transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Request a Demo <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
