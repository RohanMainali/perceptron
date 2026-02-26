"use client"

import { motion, useInView } from "framer-motion"
import { HeartPulse, Trophy, Car, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

const useCases = [
  {
    icon: HeartPulse,
    domain: "Medical Imaging AI",
    tagline: "Precision annotation for life-saving diagnostics",
    color: "#E05A6D",
    bg: "bg-[#E05A6D]/8",
    video: "/images/auta/segmentation-demo.gif",
    capabilities: [
      "Tumor & lesion segmentation in MRI scans",
      "Organ detection & labeling in CT scans",
      "AI-assisted reasoning for anatomical structures",
      "Surgical video annotation & frame tracking",
    ],
    stat: { value: "10×", label: "faster than manual labeling" },
  },
  {
    icon: Trophy,
    domain: "Sports Analytics",
    tagline: "Real-time tracking & tactical intelligence",
    color: "#F1B646",
    bg: "bg-[#F1B646]/8",
    video: "/images/auta/ai-tools.gif",
    capabilities: [
      "Player position tracking across frames",
      "Ball trajectory & tactical zone mapping",
      "Action detection — passes, shots, punches",
      "Natural language AI reasoning on tactics",
    ],
    stat: { value: "Any", label: "sport, any camera angle" },
  },
  {
    icon: Car,
    domain: "Autonomous Driving",
    tagline: "Powering the next generation of self-driving AI",
    color: "#53C5E6",
    bg: "bg-[#53C5E6]/8",
    video: "/images/auta/dataset-demo.gif",
    capabilities: [
      "Vehicle, pedestrian & traffic sign detection",
      "Segmentation masks & lane detection",
      "Compatible with KITTI, Waymo datasets",
      "Behavior reasoning across urban scenes",
    ],
    stat: { value: "20+", label: "export formats supported" },
  },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="about" className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
      <div className="absolute inset-0 light-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — left aligned */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#C26FCF] mb-3">
            Use Cases
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="cosmic-heading-gradient">Annotation Across Industries</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
              From saving lives to training autonomous systems — Auta handles it all.
            </p>
          </div>
          <div className="mt-5 h-px bg-slate-200" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.domain}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={useCase.video}
                  alt={useCase.domain}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  unoptimized
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Domain badge — bottom left */}
                <div
                  className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border"
                  style={{
                    background: `${useCase.color}22`,
                    borderColor: `${useCase.color}40`,
                    color: useCase.color,
                  }}
                >
                  <useCase.icon size={12} />
                  {useCase.domain}
                </div>

                {/* Stat chip — top right */}
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white font-semibold">
                  {useCase.stat.value}{" "}
                  <span className="font-normal text-white/60">{useCase.stat.label}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">{useCase.tagline}</p>

                {/* Capabilities */}
                <ul className="space-y-2 flex-1 mb-5">
                  {useCase.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: useCase.color }} />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/projects/auta"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                  style={{ color: useCase.color }}
                >
                  Explore Auta
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Bottom color bar */}
              <motion.div
                className="h-[3px]"
                style={{ background: useCase.color }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
