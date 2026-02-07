"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"

interface IntroAnimationProps {
  onComplete: () => void
}

// Generate random particles for the neural network effect
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 2,
  }))
}

// Generate neural connection lines
function generateConnections(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    delay: Math.random() * 1.2,
  }))
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")
  const particles = useMemo(() => generateParticles(40), [])
  const connections = useMemo(() => generateConnections(15), [])

  useEffect(() => {
    // Phase 1: Enter animations (0–1.5s)
    // Phase 2: Hold with ambient animation (1.5–3s)
    // Phase 3: Exit (3–4s)
    const holdTimer = setTimeout(() => setPhase("hold"), 1500)
    const exitTimer = setTimeout(() => setPhase("exit"), 3000)
    const completeTimer = setTimeout(() => onComplete(), 3800)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Deep dark background */}
          <div className="absolute inset-0 z-0 bg-[#030712]" />

          {/* Radial gradient base */}
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(33,120,199,0.15) 0%, rgba(83,197,230,0.05) 40%, transparent 70%)",
            }}
          />

          {/* Animated neural network particles */}
          <svg className="absolute inset-0 z-[2] w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Connection lines */}
            {connections.map((conn) => (
              <motion.line
                key={`conn-${conn.id}`}
                x1={conn.x1}
                y1={conn.y1}
                x2={conn.x2}
                y2={conn.y2}
                stroke="rgba(83,197,230,0.12)"
                strokeWidth="0.08"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.4, 0.15] }}
                transition={{
                  duration: 1.8,
                  delay: conn.delay,
                  ease: "easeOut",
                }}
              />
            ))}
            {/* Particles / nodes */}
            {particles.map((p) => (
              <motion.circle
                key={`particle-${p.id}`}
                cx={p.x}
                cy={p.y}
                r={p.size * 0.15}
                fill="rgba(83,197,230,0.6)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0.3],
                  scale: [0, 1.2, 1],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>

          {/* Orbiting rings */}
          <div className="absolute z-[3] flex items-center justify-center" style={{ width: 280, height: 280 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border"
                style={{
                  width: 160 + i * 60,
                  height: 160 + i * 60,
                  borderColor: `rgba(83,197,230,${0.15 - i * 0.03})`,
                }}
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{
                  opacity: [0, 0.6, 0.3],
                  scale: 1,
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.3 + i * 0.15 },
                  scale: { duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
                  rotate: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" },
                }}
              />
            ))}

            {/* Small orbiting dots on rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`orbit-dot-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: i === 0 ? "#53C5E6" : i === 1 ? "#C26FCF" : "#F1B646",
                  boxShadow: `0 0 12px ${i === 0 ? "#53C5E6" : i === 1 ? "#C26FCF" : "#F1B646"}`,
                  offsetPath: `circle(${80 + i * 30}px)`,
                }}
                initial={{ opacity: 0, offsetDistance: "0%" }}
                animate={{
                  opacity: [0, 1, 1],
                  offsetDistance: "100%",
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 + i * 0.2 },
                  offsetDistance: {
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            ))}
          </div>

          {/* Central glow pulse */}
          <motion.div
            className="absolute z-[4] pointer-events-none"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.5, 0.3],
              scale: [0.3, 1.2, 1, 1.1, 1],
            }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <div className="w-64 h-64 rounded-full bg-[#53C5E6]/20 blur-3xl" />
          </motion.div>

          {/* Secondary purple glow */}
          <motion.div
            className="absolute z-[4] pointer-events-none"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 0.3, 0.15], scale: [0.2, 1, 0.9] }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-48 h-48 rounded-full bg-[#C26FCF]/15 blur-3xl translate-x-12 -translate-y-8" />
          </motion.div>

          {/* Logo + brand name container */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Logo with entrance burst */}
            <div className="relative">
              {/* Burst ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 2.5, 3] }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                <div className="w-[120px] h-[120px] rounded-full border border-[#53C5E6]/40" />
              </motion.div>

              {/* Logo glow backdrop */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              >
                <div className="w-36 h-36 rounded-full bg-[#53C5E6]/25 blur-xl" />
              </motion.div>

              {/* Actual logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/perceptron-logo.png"
                    alt="Perceptron Logo"
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] drop-shadow-[0_0_20px_rgba(83,197,230,0.6)]"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Brand text */}
            <div className="flex items-center gap-0.5 overflow-hidden">
              {["P", "e", "r", "c", "e", "p", "t", "r", "o", "n"].map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl md:text-6xl font-light tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #53C5E6 50%, #C26FCF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 12px rgba(83,197,230,0.4))",
                  }}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Underline sweep */}
            <motion.div
              className="h-[1px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: [0, 1, 0.7] }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="text-sm md:text-base tracking-[0.3em] uppercase text-[#53C5E6]/70 font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
            >
              Intelligent Vision
            </motion.p>
          </motion.div>

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-x-0 z-[5] h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(83,197,230,0.3), rgba(194,111,207,0.2), transparent)",
            }}
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{
              duration: 2.5,
              delay: 0.5,
              ease: "linear",
            }}
          />

          {/* Corner accent marks */}
          {[
            { top: "8%", left: "8%", rotate: 0 },
            { top: "8%", right: "8%", rotate: 90 },
            { bottom: "8%", right: "8%", rotate: 180 },
            { bottom: "8%", left: "8%", rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={`corner-${i}`}
              className="absolute z-[6] w-8 h-8"
              style={{ ...pos }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.1, ease: "easeOut" }}
            >
              <div
                className="w-full h-full border-l border-t border-[#53C5E6]/30"
                style={{ transform: `rotate(${pos.rotate}deg)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Exit animation - content dissolves outward */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030712]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
