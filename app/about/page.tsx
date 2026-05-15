"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import MeshCanvas from "@/components/mesh-canvas"
import { Brain, Zap, Users, Linkedin, ChevronLeft, ChevronRight, Lightbulb, Code2, Rocket, Check } from "lucide-react"

// ── Design tokens ────────────────────────────────────────────────────────────
const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f6f6f3"
const DARK     = "#eeecea"  // "dark" sections

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 280 : -280, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -280 : 280, opacity: 0 }),
}

// ── Data ─────────────────────────────────────────────────────────────────────
const roadmapStages = [
  {
    icon: Lightbulb,
    title: "Problem Discovery",
    date: "Q4 2025",
    current: false,
    future: false,
    points: [
      "Found annotation bottleneck during a CV project",
      "Existing tools too slow, manual and not scalable",
      "Defined need for conversational annotation",
    ],
  },
  {
    icon: Code2,
    title: "Development",
    date: "Q1 2026",
    current: false,
    future: false,
    points: [
      "Built AI-powered annotation platform",
      "Automated project, task and dataset creation",
      "Designed end-to-end Auto Dataset creation workflow",
    ],
  },
  {
    icon: Rocket,
    title: "Deployment",
    date: "Q2 2026 — Now",
    current: true,
    future: false,
    points: [
      "Deployed platform on cloud infrastructure",
      "Onboarding early users and pilot customers",
      "Enabled scalable dataset processing",
    ],
  },
  {
    icon: Brain,
    title: "Self-Learning System",
    date: "Q3 2026+",
    current: false,
    future: true,
    points: [
      "Learning from user corrections and usage patterns",
      "Continuous improvement in labeling accuracy",
      "Adaptive annotation across domains",
    ],
  },
]

const values = [
  { icon: Brain,  title: "Innovation",    description: "Pushing the boundaries of AI research with cutting-edge techniques and novel approaches." },
  { icon: Zap,    title: "Intelligence",  description: "Creating systems that understand, learn, and adapt to complex real-world challenges." },
  { icon: Users,  title: "Collaboration", description: "Working closely with partners to transform vision into reality through intelligent solutions." },
]

const team = [
  { name: "Rohan Mainali",        role: "Chief Executive Officer",  expertise: "Strategic Leadership &\nCorporate Governance",       image: "/images/team/rohan-mainali.jpg",       socials: { linkedin: "https://www.linkedin.com/in/rohanmainali/"} },
  { name: "Neha Aryal",           role: "Chief Marketing Officer",  expertise: "Marketing Strategy &\nBusiness Growth",              image: "/images/team/neha-aryal.jpg",          socials: { linkedin: "https://www.linkedin.com/in/nehaaryal/"} },
  { name: "Soyam Shrestha",       role: "Chief Technology Officer", expertise: "Technology Strategy &\nEngineering Leadership",      image: "/images/team/soyam-shrestha.jpg",      socials: { linkedin: "https://www.linkedin.com/in/soyam-shrestha-bb1350296/" } },
  { name: "Manas Mudbari",        role: "Chief Operating Officer",  expertise: "Operations Management &\nProcess Optimization",     image: "/images/team/manas-mudbari.png",       socials: { linkedin: "https://www.linkedin.com/in/manasmudbari/"} },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [leaderIdx, setLeaderIdx] = useState(0)
  const [slideDir, setSlideDir] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextLeader = useCallback(() => { setSlideDir(1);  setLeaderIdx(p => (p + 1) % 4) }, [])
  const prevLeader = useCallback(() => { setSlideDir(-1); setLeaderIdx(p => (p - 1 + 4) % 4) }, [])

  useEffect(() => { if (isPaused) return; const t = setInterval(nextLeader, 5000); return () => clearInterval(t) }, [isPaused, nextLeader])
  useEffect(() => { const fn = () => setScrollY(window.scrollY); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])

  return (
    <main style={{ background: PANEL }}>
      <Navigation scrollY={scrollY} />

      {/* ── PAGE HERO — light ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background: PANEL,
          borderBottom: `1px solid ${LINE_STR}`,
          paddingTop: "148px",
          paddingBottom: "100px",
          overflow: "hidden",
          color: FG,
        }}
      >
        {/* Gravity mesh — identical to landing hero */}
        <MeshCanvas />
        {/* Green ambient glow */}
        <div aria-hidden="true" style={{ position: "absolute", top: "-18%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "560px", background: "radial-gradient(ellipse at 50% 40%, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 45%, transparent 68%)", zIndex: 0, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 0.95, color: FG, maxWidth: "14ch" }}
          >
            About<br /><em style={{ color: GREEN, fontStyle: "italic" }}>Perceptron</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            style={{ margin: "28px auto 0", maxWidth: "520px", fontSize: "17px", lineHeight: 1.6, color: MUTED }}
          >
            We are a team of AI researchers and engineers dedicated to building the next generation of intelligent systems that solve real-world problems.
          </motion.p>
        </div>
      </section>

      {/* ── MISSION — dark ───────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0 110px", background: DARK, borderBottom: `1px solid ${LINE_STR}`, color: FG, overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

          <SectionHeader eyebrow="Our Purpose" title="Our Mission." right="At Perceptron, we believe AI has the power to transform industries and improve lives." />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", marginTop: "60px" }}>
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
              <p style={{ fontSize: "16px", color: MUTED, lineHeight: 1.75, marginBottom: "20px" }}>
                At Perceptron, we believe that artificial intelligence has the power to transform industries and improve
                lives. Our mission is to develop cutting-edge AI solutions that are not only technically advanced but
                also practical and impactful.
              </p>
              <p style={{ fontSize: "16px", color: MUTED, lineHeight: 1.75 }}>
                We focus on three core areas: computer vision, natural language processing, and multimodal AI systems.
                Through rigorous research and development, we create tools and services that help organizations harness
                the power of AI.
              </p>
              <div style={{ display: "flex", gap: "24px", marginTop: "36px", flexWrap: "wrap" }}>
                {[["Computer Vision", GREEN], ["NLP", "#2563eb"], ["Multimodal AI", "#7c3aed"]].map(([label, color]) => (
                  <div key={label as string} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: MUTED }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color as string, flexShrink: 0 }} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Auta demo window */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ border: `1px solid ${LINE}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              {/* Browser chrome */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 16px", borderBottom: `1px solid ${LINE}`, background: PANEL }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  {["#fc635d","#fdbc40","#34c749"].map(c => <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, maxWidth: "180px", margin: "0 auto", height: "22px", borderRadius: "5px", background: BG2, border: `1px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: MONO, fontSize: "10px", color: FAINT }}>auta.perceptron.ai</span>
                </div>
                <div style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
                  {["Annotate","Plan","Export"].map((tab, i) => (
                    <span key={tab} style={{ fontFamily: MONO, fontSize: "10px", padding: "3px 8px", borderRadius: "4px", color: i === 0 ? FG : FAINT, background: i === 0 ? BG2 : "transparent" }}>{tab}</span>
                  ))}
                </div>
              </div>

              {/* Chat area */}
              <div style={{ padding: "20px", background: BG2, display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* User bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
                  style={{ alignSelf: "flex-end", maxWidth: "82%", padding: "11px 14px", borderRadius: "10px 10px 2px 10px", background: PANEL, border: `1px solid ${LINE}`, fontSize: "13px", color: FG, lineHeight: 1.5 }}
                >
                  Annotate every chest X-ray. Bounding boxes around{" "}
                  <strong style={{ color: GREEN, fontWeight: 600 }}>opacity</strong> or{" "}
                  <strong style={{ color: GREEN, fontWeight: 600 }}>effusion</strong>. Skip clean scans.
                </motion.div>

                {/* Auta response */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} viewport={{ once: true }}
                  style={{ maxWidth: "96%", padding: "11px 14px", borderRadius: "10px 10px 10px 2px", background: PANEL, border: `1px solid ${LINE}`, fontSize: "13px", color: FG, lineHeight: 1.5 }}
                >
                  Running <strong style={{ color: GREEN, fontWeight: 600 }}>2-class detection</strong> on 2,847 images.
                  {/* Task table */}
                  <div style={{ marginTop: "10px", border: `1px solid ${LINE}`, borderRadius: "7px", overflow: "hidden", fontFamily: MONO, fontSize: "11px" }}>
                    {[["task","object_detection"],["classes","[opacity, effusion]"],["format","COCO"],["split","80 / 10 / 10"]].map(([k,v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", borderBottom: `1px solid ${LINE}`, background: BG2 }}>
                        <span style={{ color: MUTED }}>{k}</span>
                        <span style={{ color: FG }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Processing status */}
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", background: "rgba(22,163,74,0.07)", border: "1px solid rgba(22,163,74,0.18)" }}
                >
                  <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "7px", height: "7px", borderRadius: "50%", background: GREEN, flexShrink: 0 }} />
                  <span style={{ fontFamily: MONO, fontSize: "11px", color: GREEN }}>Processing 2,847 images · 1,203 annotated</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM — light ─────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0 110px", background: PANEL, borderBottom: `1px solid ${LINE_STR}`, color: FG, overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

          <SectionHeader eyebrow="The People" title="Meet our team." right="Talented researchers and engineers working together to advance AI." />

          {/* Leadership label */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
            style={{ fontFamily: MONO, fontSize: "10.5px", letterSpacing: "0.12em", color: FAINT, textTransform: "uppercase", textAlign: "center", marginTop: "56px", marginBottom: "28px" }}>
            Leadership
          </motion.div>

          {/* Leadership Carousel */}
          <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Nav arrows */}
            {[{ dir: -1, fn: prevLeader, side: { left: "-48px" }, label: "Previous" }, { dir: 1, fn: nextLeader, side: { right: "-48px" }, label: "Next" }].map(btn => (
              <button key={btn.label} onClick={btn.fn} aria-label={`${btn.label} leader`}
                style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", ...btn.side, zIndex: 20, width: "36px", height: "36px", borderRadius: "50%", background: PANEL, border: `1px solid ${LINE_STR}`, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 150ms, box-shadow 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = LINE_STR }}
              >
                {btn.dir < 0 ? <ChevronLeft size={17} color={MUTED} /> : <ChevronRight size={17} color={MUTED} />}
              </button>
            ))}

            {/* Card */}
            <div style={{ borderRadius: "16px", border: `1px solid ${LINE}`, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <AnimatePresence mode="wait" custom={slideDir}>
                {(() => {
                  const m = team[leaderIdx]
                  return (
                    <motion.div key={leaderIdx} custom={slideDir} variants={slideVariants} initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                    >
                      {/* Photo */}
                      <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
                        <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 450px" priority />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }} />
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GREEN }} />
                      </div>
                      {/* Info */}
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px", background: PANEL }}>
                        <div style={{ width: "40px", height: "3px", borderRadius: "2px", background: GREEN, marginBottom: "24px" }} />
                        <h3 style={{ fontSize: "28px", fontWeight: 500, letterSpacing: "-0.03em", color: FG, margin: "0 0 6px" }}>{m.name}</h3>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: GREEN, margin: "0 0 16px" }}>{m.role}</p>
                        <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.6, whiteSpace: "pre-line", margin: "0 0 24px" }}>{m.expertise}</p>
                        {m.socials?.linkedin && (
                          <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "8px", background: BG2, border: `1px solid ${LINE}`, fontSize: "13px", color: MUTED, textDecoration: "none", width: "fit-content", transition: "color 120ms, border-color 120ms" }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = FG; el.style.borderColor = GREEN }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = MUTED; el.style.borderColor = LINE }}
                          >
                            <Linkedin size={15} /> LinkedIn
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )
                })()}
              </AnimatePresence>
            </div>

            {/* Dot nav */}
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "28px" }}>
              {team.map((m, idx) => (
                <button key={m.name} onClick={() => { setSlideDir(idx > leaderIdx ? 1 : -1); setLeaderIdx(idx) }}
                  aria-label={`View ${m.name}`}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: 0 }}
                >
                  <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${idx === leaderIdx ? GREEN : LINE}`, opacity: idx === leaderIdx ? 1 : 0.55, transition: "border-color 200ms, opacity 200ms", transform: idx === leaderIdx ? "scale(1.1)" : "scale(1)" }}>
                    <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} sizes="44px" />
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: "10px", color: idx === leaderIdx ? FG : FAINT, letterSpacing: "0.04em", transition: "color 200ms" }}>
                    {m.name.split(" ")[0]}
                  </span>
                  <div style={{ height: "2px", borderRadius: "1px", background: GREEN, transition: "width 200ms", width: idx === leaderIdx ? "100%" : "0" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES — dark ────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0 110px", background: DARK, borderBottom: `1px solid ${LINE_STR}`, color: FG, overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

          <SectionHeader eyebrow="What Drives Us" title="Our core values." right="The principles that guide every decision we make as a team." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", marginTop: "60px" }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: "16px", padding: "32px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden", transition: "border-color 200ms, box-shadow 200ms" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GREEN; el.style.boxShadow = "0 8px 32px rgba(22,163,74,0.10)" }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = LINE; el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)" }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(22,163,74,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <v.icon size={22} color={GREEN} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 500, letterSpacing: "-0.02em", color: FG, marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.65, margin: 0 }}>{v.description}</p>
                {/* Bottom bar */}
                <motion.div style={{ position: "absolute", bottom: 0, left: "24px", right: "24px", height: "2px", background: GREEN, transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP — light ──────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0 110px", background: PANEL, borderBottom: `1px solid ${LINE_STR}`, color: FG, overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

          <SectionHeader
            eyebrow="Our Journey"
            title="Roadmap."
            right="From identifying the problem to building AI that evolves — here's where we've been and where we're going."
          />

          {/* Horizontal timeline */}
          <div style={{ position: "relative", marginTop: "64px" }}>
            {/* Background line */}
            <div style={{ position: "absolute", top: "27px", left: "12.5%", right: "12.5%", height: "1px", background: LINE_STR }} />
            {/* Progress line (up to current = stage 3) */}
            <motion.div
              style={{ position: "absolute", top: "27px", left: "12.5%", height: "1px", background: GREEN }}
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
              {roadmapStages.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  {/* Node */}
                  <div style={{
                    position: "relative", zIndex: 10,
                    width: "54px", height: "54px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "20px",
                    background: stage.future ? BG2 : stage.current ? GREEN : PANEL,
                    border: `2px ${stage.future ? "dashed" : "solid"} ${stage.future ? LINE_STR : stage.current ? GREEN_2 : LINE_STR}`,
                    boxShadow: stage.current ? "0 0 0 6px rgba(22,163,74,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    {stage.current && (
                      <motion.div style={{ position: "absolute", inset: "-6px", borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,0.2), transparent)" }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <stage.icon size={22} color={stage.future ? FAINT : stage.current ? "#fff" : GREEN} />
                  </div>

                  {/* Date */}
                  <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: stage.future ? FAINT : stage.current ? GREEN : MUTED, marginBottom: "20px", textAlign: "center" }}>
                    {stage.date}
                  </span>

                  {/* Card */}
                  <div style={{ width: "100%", position: "relative" }}>
                    {stage.current && (
                      <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", padding: "3px 10px", borderRadius: "20px", background: GREEN, color: "#fff", fontFamily: MONO, fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(22,163,74,0.3)" }}>
                        Current Stage
                      </div>
                    )}
                    <div style={{
                      borderRadius: "14px",
                      padding: "20px",
                      background: PANEL,
                      border: `1px solid ${stage.future ? LINE : stage.current ? GREEN + "44" : LINE}`,
                      boxShadow: stage.current ? "0 4px 20px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
                    }}>
                      <h3 style={{ fontSize: "14px", fontWeight: 500, color: stage.future ? FAINT : FG, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                        {stage.title}
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                        {stage.points.map(point => (
                          <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: stage.future ? FAINT : GREEN, flexShrink: 0, marginTop: "5px" }} />
                            <span style={{ fontSize: "12px", color: stage.future ? FAINT : MUTED, lineHeight: 1.5 }}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ── Shared section header ─────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, right }: { eyebrow: string; title: string; right: string }) {
  return (
    <motion.div
      style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase", marginBottom: "14px" }}>
          {eyebrow}
        </div>
        <h2 style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, color: "#0c0c0a", margin: 0 }}>
          {title}
        </h2>
      </div>
      <p style={{ maxWidth: "360px", fontSize: "15px", color: MUTED, lineHeight: 1.6, margin: 0, flexShrink: 0, textAlign: "right" }}>
        {right}
      </p>
    </motion.div>
  )
}
