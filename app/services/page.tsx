"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import { Database, Cpu, BookOpen, CheckCircle } from "lucide-react"
import WaitlistModal from "@/components/waitlist-modal"

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

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
      color: "#53C5E6",
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
      color: "#C26FCF",
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
      color: "#F1B646",
    },
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />

      <PageHero
        title="Our Solutions"
        subtitle="Comprehensive AI solutions tailored to your business needs and technical requirements"
        badge="What We Offer"
      />

      {/* Services Detail Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-28">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >

                <div className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  <motion.div
                    className={index % 2 === 1 ? "md:col-start-2" : ""}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}
                      >
                        <service.icon className="w-7 h-7" style={{ color: service.color }} />
                      </div>
                      <h2 className="text-4xl font-bold text-slate-900">{service.title}</h2>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Key Features</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, fi) => (
                          <motion.div
                            key={feature}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + fi * 0.06 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: service.color }} />
                            <span className="text-slate-600">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`cosmic-card p-8 rounded-2xl border border-slate-200 bg-white shadow-lg ${index % 2 === 1 ? "md:col-start-1" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-6">Benefits</h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit, bi) => (
                        <motion.div
                          key={benefit}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + bi * 0.08 }}
                          viewport={{ once: true }}
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ background: service.color }}
                          />
                          <p className="text-slate-600 leading-relaxed">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      className="cosmic-btn-primary w-full mt-8 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = '/contact'}
                    >
                      Get Started
                    </motion.button>

                    {/* Accent line */}
                    <div
                      className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
                      style={{ background: `linear-gradient(90deg, ${service.color}40, transparent)` }}
                    />
                  </motion.div>
                </div>

                {/* Section divider (not on last item) */}
                {index < services.length - 1 && (
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

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} theme="light" />
      <Footer />
    </main>
  )
}
