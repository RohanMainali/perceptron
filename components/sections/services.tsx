"use client"

import { motion } from "framer-motion"
import { Database, Cpu, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      icon: Database,
      title: "Data Annotation",
      description:
        "Professional data labeling with bounding boxes, segmentation, and ViT-based labeling for high-quality training datasets.",
      features: ["Bounding Boxes", "Segmentation", "ViT Labeling"],
      href: "/services#data-annotation",
    },
    {
      icon: Cpu,
      title: "Model Development",
      description:
        "Custom AI model development including object detection, pose estimation, and CLIP fine-tuning for your specific needs.",
      features: ["Object Detection", "Pose Estimation", "CLIP Fine-tuning"],
      href: "/services#model-development",
    },
    {
      icon: BookOpen,
      title: "Research & Consulting",
      description:
        "Expert consulting and research services to guide your AI initiatives and solve complex technical challenges.",
      features: ["Strategy", "Architecture", "Implementation"],
      href: "/services#research-consulting",
    },
  ]

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
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
              Our Services
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI solutions tailored to your business needs and technical requirements
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Link href={service.href}>
                  <motion.button
                    className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
