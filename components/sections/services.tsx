"use client"

import { motion, useInView } from "framer-motion"
import { Database, Cpu, BookOpen } from "lucide-react"
import { useRef } from "react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Database,
      title: "Data Annotation",
      description:
        "Professional data labeling with bounding boxes, segmentation, and ViT-based labeling for high-quality training datasets.",
      features: ["Bounding Boxes", "Segmentation", "ViT Labeling"],
      href: "/services#data-annotation",
      color: "#53C5E6",
    },
    {
      icon: Cpu,
      title: "Model Development",
      description:
        "Custom AI model development including object detection, pose estimation, and CLIP fine-tuning for your specific needs.",
      features: ["Object Detection", "Pose Estimation", "CLIP Fine-tuning"],
      href: "/services#model-development",
      color: "#C26FCF",
    },
    {
      icon: BookOpen,
      title: "Research & Consulting",
      description:
        "Expert consulting and research services to guide your AI initiatives and solve complex technical challenges.",
      features: ["Strategy", "Architecture", "Implementation"],
      href: "/services#research-consulting",
      color: "#F1B646",
    },
  ]

  return (
    <section ref={ref} id="services" className="relative py-24 md:py-36 overflow-hidden bg-slate-50 text-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C26FCF]/15 to-transparent" />

      {/* Floating accents */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#53C5E6]/[0.02] blur-3xl"
        animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-[#C26FCF]/[0.02] blur-3xl"
        animate={{ x: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

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
            className="inline-block text-sm font-medium tracking-widest uppercase text-[#C26FCF] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="cosmic-heading-gradient">
              Our Services
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI solutions tailored to your business needs and technical requirements
          </p>
          <motion.div
            className="mt-6 mx-auto h-[1px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #C26FCF, #53C5E6, transparent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 h-full flex flex-col">
                {/* Icon */}
                <div className="relative w-14 h-14 mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}
                    whileHover={{ rotate: 45, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#2178C7] transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-500 mb-5 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + fi * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <motion.button
                    className="cosmic-btn-primary w-full px-6 py-2.5 rounded-lg font-medium transition-all text-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Learn More
                  </motion.button>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}50, transparent)` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
