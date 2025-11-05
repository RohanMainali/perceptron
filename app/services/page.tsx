"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import { Database, Cpu, BookOpen, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      id: "data-annotation",
      icon: Database,
      title: "Data Annotation",
      description:
        "Professional data labeling with bounding boxes, segmentation, and ViT-based labeling for high-quality training datasets.",
      features: [
        "Bounding Box Annotation",
        "Semantic Segmentation",
        "Instance Segmentation",
        "ViT-based Labeling",
        "Quality Assurance",
        "Custom Workflows",
      ],
      benefits: [
        "High-quality labeled datasets",
        "Scalable annotation pipelines",
        "Expert quality control",
        "Fast turnaround times",
      ],
    },
    {
      id: "model-development",
      icon: Cpu,
      title: "Model Development",
      description:
        "Custom AI model development including object detection, pose estimation, and CLIP fine-tuning for your specific needs.",
      features: [
        "Object Detection",
        "Pose Estimation",
        "CLIP Fine-tuning",
        "Custom Architectures",
        "Model Optimization",
        "Deployment Support",
      ],
      benefits: [
        "Tailored solutions for your use case",
        "State-of-the-art performance",
        "Production-ready models",
        "Ongoing support and updates",
      ],
    },
    {
      id: "research-consulting",
      icon: BookOpen,
      title: "Research & Consulting",
      description:
        "Expert consulting and research services to guide your AI initiatives and solve complex technical challenges.",
      features: [
        "AI Strategy Development",
        "Technical Architecture",
        "Implementation Guidance",
        "Research Collaboration",
        "Performance Optimization",
        "Team Training",
      ],
      benefits: [
        "Expert guidance from researchers",
        "Accelerated development timelines",
        "Risk mitigation",
        "Knowledge transfer",
      ],
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
                Our Services
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI solutions tailored to your business needs and technical requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <service.icon className="w-12 h-12 text-primary" />
                      <h2 className="text-4xl font-bold text-slate-900">{service.title}</h2>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Key Features</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-6">Benefits</h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-slate-600 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className="cosmic-btn-primary w-full mt-8 px-6 py-3 rounded-lg font-medium transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
