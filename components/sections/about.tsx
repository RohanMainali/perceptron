"use client"

import { motion, useInView } from "framer-motion"
import { Brain, Zap, Users } from "lucide-react"
import { useRef } from "react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "Pushing the boundaries of AI research with cutting-edge techniques and novel approaches.",
      color: "#53C5E6",
    },
    {
      icon: Zap,
      title: "Intelligence",
      description: "Creating systems that understand, learn, and adapt to complex real-world challenges.",
      color: "#C26FCF",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with partners to transform vision into reality through intelligent solutions.",
      color: "#F1B646",
    },
  ]

  return (
    <section ref={ref} id="about" className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 light-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      {/* Floating accent circles */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#53C5E6]/[0.03] blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#C26FCF]/[0.03] blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Who We Are
          </motion.span>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We specialize in multi-modal and visual AI research & development
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

        {/* Values grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              {/* Glow backdrop on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Icon container with animated ring */}
                <div className="relative w-16 h-16 mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `1px solid ${value.color}20`, background: `${value.color}08` }}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <value.icon className="w-8 h-8" style={{ color: value.color }} />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[#2178C7] transition-colors duration-300">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${value.color}40, ${value.color}00)` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
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
