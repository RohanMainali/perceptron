"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import VideoModal from "@/components/video-modal"
import { Play, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const projects = [
    {
      title: "MMA Vision",
      description:
        "A complete system for in-depth MMA fight analysis using computer vision. From dataset creation to model training and real-time analytics.",
      fullDescription:
        "MMA Vision is our flagship project that combines state-of-the-art computer vision techniques with domain expertise in combat sports. The system can track fighters, analyze movements, and provide real-time insights during matches.",
      features: ["Dataset Creation", "Model Training", "Real-time Analytics", "Fighter Tracking", "Movement Analysis"],
      status: "Featured Project",
      image: "/placeholder.svg?key=6favz",
      videoUrl: "https://www.youtube.com/embed/iNBSTdSzWlc",
      technologies: ["PyTorch", "OpenCV", "YOLO", "Python"],
      color: "#53C5E6",
    },
    {
      title: "Pose Estimation Engine",
      description:
        "Advanced pose estimation system for human movement analysis and tracking in sports and fitness applications.",
      fullDescription:
        "Our Pose Estimation Engine leverages deep learning to accurately detect and track human body keypoints in real-time. Perfect for fitness tracking, sports analysis, and rehabilitation monitoring.",
      features: ["Multi-person Detection", "Real-time Processing", "Accuracy Optimization", "Skeleton Tracking"],
      status: "In Development",
      image: "/placeholder.svg?key=owmn1",
      videoUrl: "",
      technologies: ["TensorFlow", "MediaPipe", "Python", "WebGL"],
      color: "#C26FCF",
    },
    {
      title: "CLIP Fine-tuning Suite",
      description: "Comprehensive toolkit for fine-tuning CLIP models for domain-specific vision-language tasks.",
      fullDescription:
        "The CLIP Fine-tuning Suite provides an easy-to-use interface for adapting CLIP models to your specific domain. Includes tools for dataset preparation, training, and evaluation.",
      features: ["Custom Datasets", "Transfer Learning", "Evaluation Tools", "Model Export"],
      status: "Available",
      image: "/placeholder.svg?key=bbvav",
      videoUrl: "",
      technologies: ["PyTorch", "Hugging Face", "Python", "FastAPI"],
      color: "#F1B646",
    },
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />

      <PageHero
        title="Featured Projects"
        subtitle="Showcasing our latest AI research and development initiatives with live demos and detailed breakdowns"
        badge="Our Work"
      />

      {/* Projects Detail Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-28">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  {/* Project Image with Video */}
                  <motion.div
                    className={`cosmic-card relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg group/image ${index % 2 === 1 ? "md:col-start-2" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />

                      {/* Status badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md text-white"
                          style={{ background: `${project.color}60`, border: `1px solid ${project.color}40` }}
                        >
                          {project.status}
                        </span>
                      </div>

                      {project.videoUrl && (
                        <motion.button
                          onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                            <Play size={36} className="fill-white text-white ml-1" />
                          </div>
                        </motion.button>
                      )}
                    </div>
                    {/* Bottom accent */}
                    <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
                  </motion.div>

                  {/* Project Content */}
                  <motion.div
                    className={index % 2 === 1 ? "md:col-start-1" : ""}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">{project.fullDescription}</p>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4">Key Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, fi) => (
                          <motion.span
                            key={feature}
                            className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-[#53C5E6]/10 hover:text-[#2178C7] transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + fi * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, ti) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ background: `${project.color}10`, color: project.color }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + ti * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => project.videoUrl && setSelectedVideo({ url: project.videoUrl, title: project.title })}
                        className={`cosmic-btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${!project.videoUrl ? "opacity-40 cursor-not-allowed" : ""}`}
                        whileHover={project.videoUrl ? { scale: 1.03, y: -2 } : {}}
                        whileTap={project.videoUrl ? { scale: 0.97 } : {}}
                      >
                        <Play size={18} /> Watch Demo
                      </motion.button>
                      <motion.button
                        className="cosmic-btn-secondary flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Learn More <ExternalLink size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Section divider */}
                {index < projects.length - 1 && (
                  <motion.div
                    className="mt-20 mx-auto h-px max-w-md"
                    style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </main>
  )
}
