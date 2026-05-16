"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Send, ChevronDown, CheckCircle2, Loader2, Mail, Linkedin, Facebook, ArrowUpRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import MeshCanvas from "@/components/mesh-canvas"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const GREEN_2  = "#15803d"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f6f6f3"
const DARK     = "#0c0c0a"

export default function ContactPage() {
  const [scrollY, setScrollY]         = useState(0)
  const [formData, setFormData]       = useState({ name: "", email: "", projectType: "", message: "" })
  const [isSubmitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const isMobile                      = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setError(null)
    setSubmitting(true)
    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setSubmitted(true)
      setFormData({ name: "", email: "", projectType: "", message: "" })
    } catch {
      setError("Failed to send your message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const lineInput: React.CSSProperties = {
    width: "100%", background: "transparent",
    border: "none", borderBottom: `1.5px solid ${LINE_STR}`,
    borderRadius: 0, padding: "13px 0",
    color: FG, fontSize: "15px", outline: "none",
    transition: "border-color 150ms",
    boxSizing: "border-box", fontFamily: "inherit",
  }

  return (
    <main style={{ background: PANEL, color: FG }}>
      {/* Force frosted-glass nav — dark left panel makes transparent nav unreadable */}
      <Navigation scrollY={Math.max(scrollY, 9)} />

      {/* ── Full-height split ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "100vh" }}>

        {/* ── LEFT: dark panel ── */}
        <div style={{ position: "relative", background: DARK, overflow: "hidden", padding: isMobile ? "96px 24px 40px" : "148px 72px 80px" }}>
          <MeshCanvas />

          {/* green glow */}
          <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: isMobile ? "auto" : "100%" }}
          >
            {/* Heading */}
            <h1 style={{ fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 4.5vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#fff", margin: "0 0 20px" }}>
              Let&apos;s build{!isMobile && <br />} something{!isMobile && <br />} <em style={{ fontStyle: "italic", color: GREEN }}>together.</em>
            </h1>

            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: isMobile ? "0 0 28px" : "0 0 52px", maxWidth: "340px" }}>
              Have a project in mind? We work with teams across AI research, computer vision, and data annotation.
            </p>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: isMobile ? "28px" : "52px" }}>
              {[
                { icon: Mail,     label: "support@perceptronai.org",                        href: "mailto:support@perceptronai.org" },
                { icon: Linkedin, label: "LinkedIn",                                         href: "https://www.linkedin.com/in/perceptronai/" },
                { icon: Facebook, label: "Facebook",                                         href: "https://www.facebook.com/profile.php?id=61586580522261" },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", textDecoration: "none", color: "rgba(255,255,255,0.5)", transition: "color 150ms", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)" }}
                >
                  <item.icon size={15} />
                  <span style={{ fontSize: "14px", flex: 1 }}>{item.label}</span>
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ marginTop: isMobile ? "0" : "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "16px" : "24px" }}>
              {[
                { label: "Response", value: "1–2 days" },
                { label: "HQ",       value: "Delaware, USA" },
                { label: "Coverage", value: "Global" },
                { label: "Founded",  value: "2026" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: form panel ── */}
        <div style={{ background: BG2, padding: isMobile ? "40px 24px 56px" : "148px 72px 80px", display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "center" }}>
          {submitted ? (
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={28} color={GREEN} />
              </div>
              <div>
                <h2 style={{ fontSize: "28px", fontWeight: 500, letterSpacing: "-0.03em", color: FG, margin: "0 0 10px" }}>Message sent.</h2>
                <p style={{ fontSize: "15px", color: MUTED, lineHeight: 1.65, margin: 0 }}>
                  Thanks for reaching out. We&apos;ll get back to you within 1–2 business days.
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} style={{ fontSize: "13px", color: GREEN, background: "none", border: "none", cursor: "pointer", fontFamily: MONO, letterSpacing: "0.03em", padding: 0 }}>
                ← Send another message
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ marginBottom: isMobile ? "28px" : "44px" }}>
                <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", color: GREEN, textTransform: "uppercase", marginBottom: "12px" }}>
                  Send a message
                </div>
                <h2 style={{ fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", color: FG, margin: 0 }}>
                  Tell us about your project.
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "32px" }}>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "32px" }}>
                  {([
                    { label: "Name",  type: "text",  field: "name"  as const, placeholder: "Your name" },
                    { label: "Email", type: "email", field: "email" as const, placeholder: "your@email.com" },
                  ] as const).map(input => (
                    <div key={input.field}>
                      <label style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: FAINT, display: "block", marginBottom: "2px" }}>
                        {input.label}
                      </label>
                      <input
                        type={input.type} value={formData[input.field]} required disabled={isSubmitting}
                        placeholder={input.placeholder}
                        onChange={e => setFormData({ ...formData, [input.field]: e.target.value })}
                        style={lineInput}
                        onFocus={e => { e.currentTarget.style.borderBottomColor = GREEN }}
                        onBlur={e => { e.currentTarget.style.borderBottomColor = LINE_STR }}
                      />
                    </div>
                  ))}
                </div>

                {/* Project type */}
                <div>
                  <label style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: FAINT, display: "block", marginBottom: "2px" }}>
                    Project Type
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.projectType} disabled={isSubmitting}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      style={{ ...lineInput, paddingRight: "28px", appearance: "none", cursor: "pointer" }}
                      onFocus={e => { e.currentTarget.style.borderBottomColor = GREEN }}
                      onBlur={e => { e.currentTarget.style.borderBottomColor = LINE_STR }}
                    >
                      <option value="">Select a project type</option>
                      <option value="data-annotation">Data Annotation</option>
                      <option value="model-development">Model Development</option>
                      <option value="research-consulting">Research &amp; Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown size={13} color={FAINT} style={{ position: "absolute", right: "2px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: FAINT, display: "block", marginBottom: "2px" }}>
                    Message
                  </label>
                  <textarea
                    value={formData.message} required disabled={isSubmitting} rows={5}
                    placeholder="Tell us about your project..."
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...lineInput, resize: "none" }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = GREEN }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = LINE_STR }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: "13px", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "11px 14px", margin: 0 }}>
                    {error}
                  </p>
                )}

                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: "16px" }}>
                  <span style={{ fontSize: "11px", fontFamily: MONO, color: FAINT }}>
                    We&apos;ll respond within 1–2 business days.
                  </span>
                  <button
                    type="submit" disabled={isSubmitting}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "13px 26px", borderRadius: "9px",
                      background: GREEN, color: "#fff", border: `1px solid ${GREEN_2}`,
                      fontSize: "14px", fontWeight: 500, flexShrink: 0, whiteSpace: "nowrap",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      boxShadow: "0 1px 4px rgba(22,163,74,0.3)",
                      transition: "background 120ms, transform 100ms",
                      width: isMobile ? "100%" : "auto",
                    }}
                    onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = GREEN_2; e.currentTarget.style.transform = "translateY(-1px)" } }}
                    onMouseLeave={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = "" }}
                  >
                    {isSubmitting
                      ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                      : <>Send Message <Send size={13} /></>
                    }
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

      </div>

      <Footer />
    </main>
  )
}
