"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden ">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
        <div className="text-center space-y-8">
          {/* Animated badge */}
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Building Intelligent Systems
            </span>
            <br />
            <span className="text-foreground">That See, Think, and Act</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Perceptron specializes in cutting-edge AI research and development, from computer vision to multimodal
            systems. We transform data into intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/projects">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects <ArrowRight size={20} />
              </motion.button>
            </Link>
            <motion.button
              className="px-8 py-3 border border-primary/50 rounded-lg text-foreground font-medium flex items-center gap-2 hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} /> Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 border border-secondary/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    </section>
  )
}
