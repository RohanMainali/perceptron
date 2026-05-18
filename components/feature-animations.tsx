"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Car, User, Bike, Truck, Bus, Package, FileJson, FileText, FileCode } from "lucide-react"

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

// ── Shared: Styled object card ────────────────────────────────────────────────
// Used instead of emojis — lucide icon + label in a clean card
function ObjCard({
  Icon, label, color, size = 28,
}: {
  Icon: React.ElementType; label: string; color: string; size?: number
}) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded">
      <div className="flex-1 flex items-center justify-center" style={{ background: `${color}12` }}>
        <Icon size={size} style={{ color }} strokeWidth={1.4} />
      </div>
      <div className="py-0.5 bg-white/90 text-center flex-shrink-0">
        <span className="text-[9px] font-bold tracking-wide" style={{ color }}>{label}</span>
      </div>
    </div>
  )
}

// ── Simple inline SVG car silhouette ─────────────────────────────────────────
function CarSVG({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      {/* Body */}
      <rect x="8" y="28" width="104" height="22" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Cabin */}
      <path d="M28 28 L38 12 L82 12 L92 28" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Windows */}
      <rect x="40" y="15" width="16" height="11" rx="1.5" fill={color} fillOpacity="0.25" />
      <rect x="62" y="15" width="16" height="11" rx="1.5" fill={color} fillOpacity="0.25" />
      {/* Wheels */}
      <circle cx="32" cy="50" r="9" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" />
      <circle cx="32" cy="50" r="4.5" fill={color} fillOpacity="0.3" />
      <circle cx="88" cy="50" r="9" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" />
      <circle cx="88" cy="50" r="4.5" fill={color} fillOpacity="0.3" />
      {/* Lights */}
      <rect x="10" y="32" width="6" height="4" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="104" y="32" width="6" height="4" rx="1" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

// ── 01 · Conversational Annotation (video) ────────────────────────────────────
function Feature01Video(_: { color: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <source src="/videos/feature-1.mp4" type="video/mp4" />
    </video>
  )
}

// ── 02 · Agentic AI Workflow (video) ──────────────────────────────────────────
function Feature02Video(_: { color: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <source src="/videos/feature-2.mp4" type="video/mp4" />
    </video>
  )
}

// ── 03 · Exemplar Box Learning (video) ────────────────────────────────────────
function Feature03Video(_: { color: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <source src="/videos/feature-exemplar.mp4" type="video/mp4" />
    </video>
  )
}

// ── 03 · Polygon Segmentation ──────────────────────────────────────────────────
// Real SVG car drawing — polygon traced over it
function PolygonSegmentationAnimation({ color }: { color: string }) {
  const pts: [number, number][] = [
    [22, 30], [32, 18], [52, 15], [72, 18], [82, 28],
    [84, 42], [70, 48], [32, 48], [18, 42],
  ]
  const [count, setCount] = useState(0)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      while (!cancelled) {
        setCount(0); setFilled(false)
        await delay(700)
        for (let i = 1; i <= pts.length; i++) {
          if (cancelled) return
          setCount(i); await delay(210)
        }
        await delay(350); if (cancelled) return
        setFilled(true)
        await delay(3500)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  const visible = pts.slice(0, count)
  const polyStr = visible.map(([x, y]) => `${x},${y}`).join(" ")
  const closed = count >= pts.length

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-xl">
        {/* Top HUD */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full" style={{ background: color }}
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <span className="text-[11px] font-mono text-slate-400">polygon · {count}/{pts.length} pts</span>
          </div>
          <AnimatePresence>
            {filled && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${color}20`, color }}>
                99.7% precision
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800"
          style={{ aspectRatio: "16/9" }}>
          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 56">
            {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={(i + 1) * 7} x2="100" y2={(i + 1) * 7} stroke="white" strokeWidth="0.3" />)}
            {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={(i + 1) * 9} y1="0" x2={(i + 1) * 9} y2="56" stroke="white" strokeWidth="0.3" />)}
          </svg>

          {/* SVG car silhouette */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56" preserveAspectRatio="xMidYMid meet">
            {/* Car body */}
            <rect x="16" y="30" width="68" height="16" rx="3" fill="#334155" />
            {/* Cabin */}
            <path d="M24 30 L30 20 L50 17 L70 20 L76 30" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
            {/* Windows */}
            <rect x="31" y="21" width="14" height="8" rx="1" fill="#0f172a" opacity="0.8" />
            <rect x="50" y="21" width="14" height="8" rx="1" fill="#0f172a" opacity="0.8" />
            {/* Wheels */}
            <circle cx="28" cy="46" r="7" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <circle cx="28" cy="46" r="3" fill="#334155" />
            <circle cx="72" cy="46" r="7" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <circle cx="72" cy="46" r="3" fill="#334155" />
            {/* Lights */}
            <rect x="17" y="33" width="5" height="3" rx="0.5" fill="#fbbf24" opacity="0.7" />
            <rect x="78" y="33" width="5" height="3" rx="0.5" fill="#ef4444" opacity="0.7" />
          </svg>

          {/* Polygon overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56">
            {filled && visible.length >= 3 && (
              <motion.polygon points={polyStr} fill={color} initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 0.25 }} transition={{ duration: 0.5 }} />
            )}
            {visible.length >= 2 && (
              <polyline
                points={closed ? polyStr + ` ${pts[0][0]},${pts[0][1]}` : polyStr}
                fill="none" stroke={color} strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            )}
            {visible.map(([x, y], i) => (
              <g key={i}>
                <motion.circle cx={x} cy={y} r="2" fill={color} initial={{ r: 0 }} animate={{ r: 2 }} />
                <motion.circle cx={x} cy={y} r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35"
                  initial={{ r: 0 }} animate={{ r: 4 }} transition={{ delay: 0.08 }} />
              </g>
            ))}
          </svg>

          <AnimatePresence>
            {filled && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-semibold text-white shadow-lg"
                style={{ background: color }}>
                Mask ready
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ── 04 · Object Detection ──────────────────────────────────────────────────────
// Dark UI scene, lucide icon cards, scan line, detection boxes
function ObjectDetectionAnimation({ color }: { color: string }) {
  const [detected, setDetected] = useState(false)

  useEffect(() => {
    const cycle = () => { setDetected(false); setTimeout(() => setDetected(true), 700) }
    cycle()
    const iv = setInterval(cycle, 5000)
    return () => clearInterval(iv)
  }, [])

  const objects = [
    { left: "4%",  top: "18%", w: "28%", h: "54%", Icon: Car,   label: "Car",    conf: 98 },
    { left: "37%", top: "25%", w: "20%", h: "48%", Icon: User,  label: "Person", conf: 95 },
    { left: "63%", top: "18%", w: "28%", h: "54%", Icon: Truck, label: "Truck",  conf: 91 },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Scene */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-slate-700/40" />
        {/* Buildings */}
        <div className="absolute bottom-[25%] left-4 w-6 h-16 bg-slate-700/50 rounded-t" />
        <div className="absolute bottom-[25%] left-16 w-4 h-10 bg-slate-700/50 rounded-t" />
        <div className="absolute bottom-[25%] right-8 w-8 h-14 bg-slate-700/50 rounded-t" />
        <div className="absolute bottom-[25%] right-24 w-4 h-8 bg-slate-700/50 rounded-t" />

        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${color}80 40%, ${color} 50%, ${color}80 60%, transparent)` }}
          animate={{ top: ["-1%", "101%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} />

        {/* Objects */}
        {objects.map((obj, i) => (
          <div key={i} className="absolute" style={{ left: obj.left, top: obj.top, width: obj.w, height: obj.h }}>
            {/* Icon card */}
            <div className="w-full h-full rounded-lg overflow-hidden">
              <ObjCard Icon={obj.Icon} label={obj.label} color="#64748b" size={24} />
            </div>

            {/* Bounding box */}
            <motion.div
              className="absolute inset-0 border-2 rounded-lg"
              style={{ borderColor: color }}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: detected ? 1 : 0, scale: detected ? 1 : 1.12 }}
              transition={{ delay: i * 0.16, duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-lg" style={{ background: `${color}18` }} />
              {/* Corner marks */}
              {[
                "top-0 left-0 -translate-x-px -translate-y-px",
                "top-0 right-0 translate-x-px -translate-y-px",
                "bottom-0 left-0 -translate-x-px translate-y-px",
                "bottom-0 right-0 translate-x-px translate-y-px",
              ].map((cls, j) => (
                <div key={j} className={`absolute ${cls} w-2.5 h-2.5 bg-white border-2 rounded-sm`}
                  style={{ borderColor: color }} />
              ))}
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap"
              style={{ background: color }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: detected ? 1 : 0, y: detected ? 0 : 4 }}
              transition={{ delay: i * 0.16 + 0.2 }}
            >
              {obj.label} {obj.conf}%
            </motion.div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 bg-white"
        animate={{ opacity: detected ? 1 : 0 }}>
        <div className="flex items-center gap-4">
          {objects.map((obj, i) => (
            <motion.div key={i} className="flex items-center gap-1.5"
              initial={{ opacity: 0 }} animate={{ opacity: detected ? 1 : 0 }}
              transition={{ delay: i * 0.1 }}>
              <obj.Icon size={12} style={{ color }} strokeWidth={2} />
              <span className="text-xs text-slate-600">{obj.label}</span>
            </motion.div>
          ))}
        </div>
        <span className="text-xs font-mono font-semibold" style={{ color }}>38ms</span>
      </motion.div>
    </div>
  )
}

// ── 05 · Video Annotation & Tracking ──────────────────────────────────────────
function VideoAnnotationAnimation({ color }: { color: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.3)), 16)
    return () => clearInterval(iv)
  }, [])

  const t = progress / 100
  const bx = 8 + t * 74
  const by = 28 + Math.sin(t * Math.PI * 2) * 16
  const frame = Math.floor(progress * 0.6)

  return (
    <div className="w-full h-full flex flex-col bg-slate-950">
      {/* Video frame */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Scene dressing */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-slate-700/30" />
        <div className="absolute bottom-[25%] left-5 w-4 h-12 bg-slate-700/50 rounded-t" />
        <div className="absolute bottom-[25%] right-8 w-6 h-10 bg-slate-700/50 rounded-t" />
        <div className="absolute bottom-[25%] left-1/2 w-10 h-8 bg-slate-700/40 rounded-t" />

        {/* Track trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 62" preserveAspectRatio="none">
          <motion.path
            d="M 8 44 C 28 20 40 52 55 38 C 68 24 78 46 90 30"
            fill="none" stroke={color} strokeWidth="0.7"
            strokeDasharray="3 3" opacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.min(t * 1.4, 1) }}
            transition={{ duration: 0 }}
          />
        </svg>

        {/* Tracking box — User icon */}
        <motion.div
          className="absolute"
          animate={{ left: `${bx}%`, top: `${by}%` }}
          transition={{ duration: 0 }}
          style={{ transform: "translate(-50%, -50%)", width: "11%", aspectRatio: "0.75" }}
        >
          <div className="w-full h-full rounded overflow-hidden">
            <ObjCard Icon={User} label="" color={color} size={20} />
          </div>
          <div className="absolute -inset-1 border-2 rounded" style={{ borderColor: color }} />
          <div className="absolute -inset-1 rounded" style={{ background: `${color}12` }} />
          <div className="absolute -top-6 left-0 px-2 py-0.5 text-[9px] font-bold text-white rounded whitespace-nowrap"
            style={{ background: color }}>
            ID:01
          </div>
        </motion.div>

        {/* REC */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          <span className="text-[11px] text-slate-300 font-medium">REC</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/60 text-[10px] font-mono text-slate-400">
          {String(frame).padStart(3, "0")}f
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: color }}
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <span className="text-[11px] text-slate-200 font-medium">Tracking · 1 object</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-3 bg-slate-900 border-t border-slate-800">
        <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
          <motion.div className="absolute left-0 top-0 h-full rounded-full" style={{ background: color }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0 }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>00:00</span>
          <span style={{ color }}>Tracking Active</span>
          <span>00:04</span>
        </div>
      </div>
    </div>
  )
}

// ── 06 · Zero-Shot Dataset Generation ─────────────────────────────────────────
function ZeroShotAnimation({ color }: { color: string }) {
  const promptFull = "Urban traffic scene with vehicles"
  const [promptLen, setPromptLen] = useState(0)
  const [items, setItems] = useState<number[]>([])
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      while (!cancelled) {
        setPromptLen(0); setItems([]); setGenerating(false)
        await delay(500)
        for (let i = 1; i <= promptFull.length; i++) {
          if (cancelled) return
          setPromptLen(i); await delay(38)
        }
        await delay(400); if (cancelled) return
        setGenerating(true)
        await delay(700); if (cancelled) return
        for (let i = 0; i < 6; i++) {
          if (cancelled) return
          setItems(prev => [...prev, i]); await delay(300)
        }
        await delay(3000)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  const gridItems = [
    { Icon: Car,   label: "Car"    },
    { Icon: Truck, label: "Truck"  },
    { Icon: Car,   label: "SUV"    },
    { Icon: User,  label: "Person" },
    { Icon: Bike,  label: "Bike"   },
    { Icon: Bus,   label: "Bus"    },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white gap-5">
      {/* Prompt */}
      <div className="w-full max-w-xl">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Describe your dataset</div>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 bg-slate-50 transition-all duration-300"
          style={{ borderColor: generating || promptLen > 0 ? `${color}50` : "#e2e8f0" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-sm text-slate-700 flex-1 font-medium">
            {promptFull.slice(0, promptLen)}
            {promptLen < promptFull.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-slate-400 ml-px align-middle" />
            )}
          </span>
          {generating && (
            <motion.div className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent flex-shrink-0"
              style={{ borderColor: color, borderTopColor: "transparent" }}
              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
          )}
        </div>
      </div>

      {/* Icon grid */}
      <div className="w-full max-w-xl grid grid-cols-3 gap-2.5">
        {gridItems.map((item, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl border" style={{ aspectRatio: "4/3",
            borderColor: items.includes(i) ? `${color}40` : "#e2e8f0",
            background: items.includes(i) ? `${color}06` : "#f8fafc" }}>
            <AnimatePresence>
              {items.includes(i) ? (
                <motion.div className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="w-full h-full">
                    <ObjCard Icon={item.Icon} label={item.label} color={color} size={28} />
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-200" />
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {items.length === 6 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md"
            style={{ background: color }}>
            6 images generated — ready to export
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── 07 · Multi-Format Export ───────────────────────────────────────────────────
function ExportAnimation({ color }: { color: string }) {
  const formats = [
    { name: "COCO",       ext: ".json", col: "#FF6B6B", Icon: FileJson },
    { name: "YOLO",       ext: ".txt",  col: "#4ECDC4", Icon: FileText },
    { name: "VOC",        ext: ".xml",  col: "#45B7D1", Icon: FileCode },
    { name: "CVAT",       ext: ".xml",  col: "#8B5CF6", Icon: FileCode },
    { name: "LabelMe",    ext: ".json", col: "#F59E0B", Icon: FileJson },
    { name: "KITTI",      ext: ".txt",  col: "#EC4899", Icon: FileText },
    { name: "MOT",        ext: ".txt",  col: "#10B981", Icon: FileText },
    { name: "CamVid",     ext: ".csv",  col: "#6366F1", Icon: FileText },
    { name: "ImageNet",   ext: ".xml",  col: "#F97316", Icon: FileCode },
    { name: "Open Images",ext: ".csv",  col: "#06B6D4", Icon: FileText },
    { name: "Datumaro",   ext: ".json", col: "#84CC16", Icon: FileJson },
    { name: "WIDER Face", ext: ".txt",  col: "#F43F5E", Icon: FileText },
  ]

  const [done, setDone] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    async function run() {
      while (!cancelled) {
        setDone([])
        await delay(500)
        for (let i = 0; i < formats.length; i++) {
          if (cancelled) return
          await delay(200)
          setDone(prev => [...prev, i])
        }
        await delay(2800)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white gap-5">
      {/* Header */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center"
            style={{ borderColor: `${color}50`, background: `${color}10` }}>
            <Package size={18} style={{ color }} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">dataset.auta</div>
            <div className="text-[10px] text-slate-400">1,247 images annotated</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${color}15`, color }}>
          {done.length} / {formats.length} exported
        </div>
      </div>

      {/* Format grid */}
      <div className="w-full max-w-xl grid grid-cols-4 gap-2">
        {formats.map((fmt, i) => {
          const isDone = done.includes(i)
          return (
            <motion.div key={fmt.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isDone ? 1 : 0.15, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center gap-1.5 px-2 py-2 rounded-xl border bg-white"
              style={{
                borderColor: isDone ? `${fmt.col}50` : "#e2e8f0",
                background: isDone ? `${fmt.col}08` : "white",
              }}
            >
              <fmt.Icon size={14} style={{ color: isDone ? fmt.col : "#cbd5e1" }} strokeWidth={1.5} />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-700 leading-none truncate">{fmt.name}</div>
                <div className="text-[9px] text-slate-400">{fmt.ext}</div>
              </div>
              <AnimatePresence>
                {isDone && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-sm"
                    style={{ background: fmt.col }}>
                    ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Export mapping ─────────────────────────────────────────────────────────────
const featureAnimations: Record<string, React.FC<{ color: string }>> = {
  "01": Feature01Video,
  "02": Feature02Video,
  "03": Feature03Video,
  "04": PolygonSegmentationAnimation,
  "05": ObjectDetectionAnimation,
  "06": VideoAnnotationAnimation,
  "07": ZeroShotAnimation,
  "08": ExportAnimation,
}

export function FeatureAnimation({ featureId, color }: { featureId: string; color: string }) {
  const AnimationComponent = featureAnimations[featureId]
  if (!AnimationComponent) return null
  return <AnimationComponent color={color} />
}
