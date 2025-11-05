"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Total animation: ~3.5 seconds
    // 0–1s: fade in logo and text
    // 1–2s: hold
    // 2–3.5s: fade out to reveal content
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      pointerEvents={isComplete ? "none" : "auto"}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/first-loader.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      {/* Soft moving light sweep */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent"
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Logo + word */}
      <motion.div
        className="relative z-10 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} 
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/perceptron-logo.png"
            alt="Perceptron Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </motion.div>

        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {["P", "e", "r", "c", "e", "p", "t", "r", "o", "n"].map((char, index) => (
            <motion.span
              key={index}
              className="text-4xl md:text-5xl font-normal cosmic-heading-gradient"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.4 + index * 0.05,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#53C5E6]/30 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  )
}
