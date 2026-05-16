"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Linkedin, Facebook, Send, ChevronDown, CheckCircle2, Loader2 } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

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
const SECTION  = "#ffffff"  // light

export default function Contact({ hideHeader = false }: { hideHeader?: boolean }) {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); return }
      setSubmitted(true)
      setFormData({ name: "", email: "", projectType: "", message: "" })
    } catch {
      setError("Failed to send your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    background: PANEL,
    border: `1px solid ${LINE_STR}`,
    color: FG,
    fontSize: "14px",
    outline: "none",
    transition: "border-color 150ms",
    boxSizing: "border-box",
    fontFamily: "inherit",
  }

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "72px 0 64px" : "120px 0 110px",
        background: SECTION,
        borderBottom: `1px solid ${LINE_STR}`,
        color: FG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>

        {/* Header */}
        {!hideHeader && (
          <motion.div
            style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? "16px" : "40px", marginBottom: isMobile ? "36px" : "64px" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase", marginBottom: "14px" }}>
                Let&apos;s Connect
              </div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, color: FG, margin: 0 }}>
                Get in touch.
              </h2>
            </div>
            <p style={{ maxWidth: isMobile ? "100%" : "360px", fontSize: "15px", color: MUTED, lineHeight: 1.6, margin: 0, flexShrink: 0 }}>
              Have a project in mind? Let&apos;s collaborate and build something amazing together.
            </p>
          </motion.div>
        )}

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 420px", gap: isMobile ? "32px" : "56px", alignItems: "start" }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 0", gap: "16px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(22,163,74,0.08)", border: `1px solid rgba(22,163,74,0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={28} color={GREEN} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 500, color: FG, margin: 0 }}>Message Sent!</h3>
                <p style={{ fontSize: "14px", color: MUTED, maxWidth: "280px", lineHeight: 1.6, margin: 0 }}>
                  Thanks for reaching out. We&apos;ll get back to you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: "8px", fontSize: "13px", color: GREEN, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form style={{ display: "flex", flexDirection: "column", gap: "22px" }} onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "Name", type: "text", field: "name" as const, placeholder: "Your name" },
                    { label: "Email", type: "email", field: "email" as const, placeholder: "your@email.com" },
                  ].map(input => (
                    <div key={input.field}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: MUTED, marginBottom: "8px" }}>{input.label}</label>
                      <input
                        type={input.type}
                        value={formData[input.field]}
                        onChange={e => setFormData({ ...formData, [input.field]: e.target.value })}
                        required
                        disabled={isSubmitting}
                        placeholder={input.placeholder}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = GREEN }}
                        onBlur={e => { e.currentTarget.style.borderColor = LINE_STR }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: MUTED, marginBottom: "8px" }}>Project Type</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      disabled={isSubmitting}
                      style={{ ...inputStyle, paddingRight: "36px", appearance: "none", cursor: "pointer" }}
                      onFocus={e => { e.currentTarget.style.borderColor = GREEN }}
                      onBlur={e => { e.currentTarget.style.borderColor = LINE_STR }}
                    >
                      <option value="">Select a project type</option>
                      <option value="data-annotation">Data Annotation</option>
                      <option value="model-development">Model Development</option>
                      <option value="research-consulting">Research &amp; Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown size={16} color={FAINT} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: MUTED, marginBottom: "8px" }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    placeholder="Tell us about your project..."
                    rows={6}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => { e.currentTarget.style.borderColor = GREEN }}
                    onBlur={e => { e.currentTarget.style.borderColor = LINE_STR }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: "13px", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 14px", margin: 0 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "13px 20px", borderRadius: "8px",
                    background: GREEN, color: "#fff",
                    border: `1px solid ${GREEN_2}`,
                    fontSize: "14px", fontWeight: 500,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    boxShadow: "0 1px 3px rgba(22,163,74,0.25)",
                    transition: "background 120ms, transform 100ms",
                    width: "100%",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = GREEN_2; e.currentTarget.style.transform = "translateY(-1px)" } }}
                  onMouseLeave={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = "" }}
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Contact info */}
            <div style={{ padding: "28px", borderRadius: "14px", border: `1px solid ${LINE}`, background: BG2 }}>
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: FG, margin: "0 0 20px" }}>Contact Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { icon: Mail,     label: "support@perceptronai.org", href: "mailto:support@perceptronai.org", color: GREEN },
                  { icon: Linkedin, label: "LinkedIn",                  href: "https://www.linkedin.com/in/perceptronai/", color: "#2178C7" },
                  { icon: Facebook, label: "Facebook",                  href: "https://www.facebook.com/profile.php?id=61586580522261", color: "#1877f2" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.icon size={16} color={item.color} />
                    </div>
                    <a href={item.href} style={{ fontSize: "14px", color: MUTED, textDecoration: "none", transition: "color 120ms" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = FG }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Why card */}
            <div style={{ padding: "28px", borderRadius: "14px", border: `1px solid ${LINE}`, background: BG2 }}>
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: FG, margin: "0 0 16px" }}>Why Choose Perceptron?</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                {[
                  "Expert team with years of AI research experience",
                  "Cutting-edge technology and methodologies",
                  "Custom solutions tailored to your needs",
                  "Proven track record with successful projects",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: MUTED, lineHeight: 1.5 }}>
                    <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
