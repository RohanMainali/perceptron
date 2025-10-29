"use client"

import { motion } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { useState } from "react"
import VideoModal from "@/components/video-modal"

export default function Projects() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)

  const projects = [
    {
      title: "MMA Vision",
      description:
        "A complete system for in-depth MMA fight analysis using computer vision. From dataset creation to model training and real-time analytics.",
      features: ["Dataset Creation", "Model Training", "Real-time Analytics", "Fighter Tracking"],
      status: "Featured Project",
      image: "/mma-fight-analysis-computer-vision.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Pose Estimation Engine",
      description:
        "Advanced pose estimation system for human movement analysis and tracking in sports and fitness applications.",
      features: ["Multi-person Detection", "Real-time Processing", "Accuracy Optimization"],
      status: "In Development",
      image: "/pose-estimation-human-movement.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "CLIP Fine-tuning Suite",
      description: "Comprehensive toolkit for fine-tuning CLIP models for domain-specific vision-language tasks.",
      features: ["Custom Datasets", "Transfer Learning", "Evaluation Tools"],
      status: "Available",
      image: "/clip-vision-language-model-fine-tuning.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Showcasing our latest AI research and development initiatives with live demos
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Project image with play button */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                  <motion.button
                    onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors">
                      <Play size={32} className="fill-white" />
                    </div>
                  </motion.button>
                </div>

                {/* Project content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium whitespace-nowrap flex-shrink-0">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={16} /> Watch Demo
                    </motion.button>
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-primary/40 hover:bg-primary/10 transition-colors font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
