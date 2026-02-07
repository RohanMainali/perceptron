"use client"

import { motion, useInView } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { useState, useRef } from "react"
import VideoModal from "@/components/video-modal"
import Link from "next/link"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Projects() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "Auta — AI Annotation Tool",
      description:
        "Chat-driven auto-annotation platform. Drop a .zip, describe the task in natural language, and get a fully annotated dataset in seconds.",
      features: ["Chat-to-Task", "Auto Segmentation", "Batch Annotation", "SAM3 Integration"],
      status: "Active Development",
      image: "/images/auta/auta-demo.gif",
      videoUrl: "",
      color: "#2178C7",
      href: "/projects/auta",
    },
    {
      title: "MMA Vision",
      description:
        "A complete system for in-depth MMA fight analysis using computer vision. From dataset creation to model training and real-time analytics.",
      features: ["Dataset Creation", "Model Training", "Real-time Analytics", "Fighter Tracking"],
      status: "Featured Project",
      image: "/mma-fight-analysis-computer-vision.jpg",
      videoUrl: "https://www.youtube.com/embed/iNBSTdSzWlc",
      color: "#53C5E6",
    },
    {
      title: "CLIP Fine-tuning Suite",
      description: "Comprehensive toolkit for fine-tuning CLIP models for domain-specific vision-language tasks.",
      features: ["Custom Datasets", "Transfer Learning", "Evaluation Tools"],
      status: "Available",
      image: "/clip-vision-language-model-fine-tuning.jpg",
      videoUrl: "",
      color: "#F1B646",
    },
  ]

  return (
    <section ref={ref} id="projects" className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
      {/* Background decorations */}
      <div className="absolute inset-0 light-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="cosmic-heading-gradient">
              Featured Projects
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Showcasing our latest AI research and development initiatives with live demos
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

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative h-full"
              whileHover={{ y: -8 }}
            >
              <div className="cosmic-card relative rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 overflow-hidden h-full flex flex-col">
                {/* Project image with overlay effects */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

                  {/* Status badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md text-white"
                      style={{ background: `${project.color}60`, border: `1px solid ${project.color}40` }}
                    >
                      {project.status}
                    </span>
                  </motion.div>

                  {/* Play button */}
                  {project.videoUrl && (
                    <motion.button
                      onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play size={28} className="fill-white text-white ml-1" />
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Project content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-[#2178C7] transition-colors duration-300">{project.title}</h3>
                  <p className="text-slate-500 mb-5 flex-grow text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, fi) => (
                      <motion.span
                        key={feature}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium hover:bg-[#53C5E6]/10 hover:text-[#2178C7] transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + fi * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => project.videoUrl && setSelectedVideo({ url: project.videoUrl, title: project.title })}
                      className={`cosmic-btn-secondary flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${!project.videoUrl ? "opacity-40 cursor-not-allowed" : ""}`}
                      whileHover={project.videoUrl ? { scale: 1.03 } : {}}
                      whileTap={project.videoUrl ? { scale: 0.97 } : {}}
                    >
                      <Play size={16} /> Watch Demo
                    </motion.button>
                    {(project as { href?: string }).href ? (
                      <Link href={(project as { href: string }).href}>
                        <motion.span
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:border-[#53C5E6]/40 hover:bg-[#53C5E6]/5 hover:text-[#2178C7] transition-all font-medium text-sm"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Details <ExternalLink size={14} />
                        </motion.span>
                      </Link>
                    ) : (
                      <motion.button
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:border-[#53C5E6]/40 hover:bg-[#53C5E6]/5 hover:text-[#2178C7] transition-all font-medium text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Details <ExternalLink size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Bottom color accent */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </section>
  )
}
