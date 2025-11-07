"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
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
    },
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/other-hero-background.jpg')",
              transform: "rotate(0deg)"
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-light leading-tight text-balance">
              <span className="text-white">
                Featured Projects
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Projects Detail Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Project Image with Video */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg group/image"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                      <motion.button
                        onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-20 h-20 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors">
                          <Play size={40} className="fill-white" />
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Project Content */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                        {project.status}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">{project.fullDescription}</p>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4">Key Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
                        className="cosmic-btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play size={20} /> Watch Demo
                      </motion.button>
                      <motion.button
                        className="cosmic-btn-secondary flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More <ExternalLink size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </main>
  )
}
