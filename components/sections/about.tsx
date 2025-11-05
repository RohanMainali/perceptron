"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Users } from "lucide-react"

export default function About() {
  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "Pushing the boundaries of AI research with cutting-edge techniques and novel approaches.",
    },
    {
      icon: Zap,
      title: "Intelligence",
      description: "Creating systems that understand, learn, and adapt to complex real-world challenges.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with partners to transform vision into reality through intelligent solutions.",
    },
  ]

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We specializes in multi-modal and visual AI research & development
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 h-full">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
