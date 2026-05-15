"use client"

import { useState, FormEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, CheckCircle2, Loader2, Clock, ChevronDown } from "lucide-react"
import { toast } from "sonner"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  theme?: "dark" | "light"
}

const USE_CASES = ["Medical", "Sports", "Autonomous", "Other"] as const
const USE_CASE_LABELS: Record<string, string> = {
  Medical:    "Medical Imaging AI",
  Sports:     "Sports Analytics",
  Autonomous: "Autonomous Driving",
  Other:      "Other",
}

const MONO    = "'Geist Mono', 'Courier New', monospace"
const GREEN   = "#16a34a"
const GREEN_2 = "#15803d"

export default function WaitlistModal({ isOpen, onClose, theme = "light" }: WaitlistModalProps) {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "duplicate">("idle")
  const [loading, setLoading]         = useState(false)
  const [form, setForm]               = useState({
    name: "", email: "",
    useCase: "Other" as (typeof USE_CASES)[number],
    message: "",
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setSubmitState("idle")
      setForm({ name: "", email: "", useCase: "Other", message: "" })
    }, 350)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res  = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.status === 409) { setSubmitState("duplicate"); return }
      if (!res.ok) { toast.error(data.error || "Something went wrong. Please try again."); return }
      setSubmitState("success")
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const dark = theme === "dark"

  const t = {
    overlay:      dark ? "rgba(4,10,22,0.85)"       : "rgba(12,12,10,0.55)",
    panel:        dark ? "#111110"                   : "#ffffff",
    border:       dark ? "rgba(255,255,255,0.08)"    : "rgba(12,12,10,0.13)",
    shadow:       dark
      ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)"
      : "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(12,12,10,0.08)",
    heading:      dark ? "#ffffff"                   : "#0c0c0a",
    sub:          dark ? "rgba(255,255,255,0.4)"     : "#5a5a52",
    label:        dark ? "rgba(255,255,255,0.3)"     : "#aaaaaa",
    inputBg:      dark ? "rgba(255,255,255,0.05)"    : "#f6f6f3",
    inputBorder:  dark ? "rgba(255,255,255,0.1)"     : "rgba(12,12,10,0.14)",
    inputText:    dark ? "#ffffff"                   : "#0c0c0a",
    inputPh:      dark ? "rgba(255,255,255,0.2)"     : "#aaaaaa",
    selectBg:     dark ? "#0d0d0c"                   : "#f6f6f3",
    divider:      dark ? "rgba(255,255,255,0.07)"    : "rgba(12,12,10,0.09)",
    closeColor:   dark ? "rgba(255,255,255,0.35)"    : "#aaaaaa",
    closeBg:      dark ? "rgba(255,255,255,0.06)"    : "rgba(12,12,10,0.05)",
    footer:       dark ? "rgba(255,255,255,0.2)"     : "#aaaaaa",
    successIcon:  dark ? GREEN                       : GREEN,
    altIconColor: dark ? "#f1b646"                   : "#d97706",
  }

  const inputStyle = (extraStyle?: React.CSSProperties): React.CSSProperties => ({
    width: "100%", padding: "11px 13px",
    borderRadius: "8px", border: `1px solid ${t.inputBorder}`,
    background: t.inputBg, color: t.inputText,
    fontSize: "14px", outline: "none",
    transition: "border-color 140ms, background 140ms",
    boxSizing: "border-box", fontFamily: "inherit",
    ...extraStyle,
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", background: t.overlay }} />

          {/* Panel */}
          <motion.div
            style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "460px", borderRadius: "16px", border: `1px solid ${t.border}`, background: t.panel, boxShadow: t.shadow, overflow: "hidden" }}
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: "28px 28px 22px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: t.heading, margin: "0 0 6px" }}>
                  Join the Auta Waitlist
                </h2>
                <p style={{ fontSize: "13.5px", color: t.sub, margin: 0, lineHeight: 1.55 }}>
                  Be among the first to experience AI-powered annotation.
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.closeColor, transition: "background 120ms, color 120ms", marginTop: "2px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.closeBg }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: t.divider, margin: "0 28px" }} />

            {/* Body */}
            <div style={{ padding: "22px 28px 28px" }}>
              <AnimatePresence mode="wait">

                {submitState === "success" ? (
                  <motion.div key="success"
                    style={{ padding: "24px 0 8px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    <motion.div
                      style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}
                      initial={{ scale: 0.7 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.06 }}
                    >
                      <CheckCircle2 size={28} color={GREEN} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h3 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", color: t.heading, margin: "0 0 6px" }}>You&apos;re on the list!</h3>
                      <p style={{ fontSize: "13.5px", color: t.sub, lineHeight: 1.6, margin: 0, maxWidth: "280px" }}>
                        We&apos;ll review your request and notify you when you&apos;re approved.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      style={{ marginTop: "4px", padding: "10px 28px", borderRadius: "8px", border: `1px solid ${t.border}`, background: "transparent", fontSize: "13px", fontWeight: 500, color: t.sub, cursor: "pointer", transition: "background 120ms" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.inputBg }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                    >
                      Close
                    </button>
                  </motion.div>

                ) : submitState === "duplicate" ? (
                  <motion.div key="duplicate"
                    style={{ padding: "24px 0 8px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    <motion.div
                      style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}
                      initial={{ scale: 0.7 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.06 }}
                    >
                      <Clock size={28} color={t.altIconColor} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h3 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", color: t.heading, margin: "0 0 6px" }}>Still in queue.</h3>
                      <p style={{ fontSize: "13.5px", color: t.sub, lineHeight: 1.6, margin: 0, maxWidth: "280px" }}>
                        Your application is already with us — no need to reapply. We&apos;ll reach out when you&apos;re approved.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      style={{ marginTop: "4px", padding: "10px 28px", borderRadius: "8px", border: `1px solid ${t.border}`, background: "transparent", fontSize: "13px", fontWeight: 500, color: t.sub, cursor: "pointer", transition: "background 120ms" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.inputBg }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                    >
                      Got it
                    </button>
                  </motion.div>

                ) : (
                  <motion.form key="form" onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    {/* Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {([
                        { label: "Name",  type: "text",  key: "name",  placeholder: "Your name",       required: true },
                        { label: "Email", type: "email", key: "email", placeholder: "your@email.com",   required: true },
                      ] as const).map(f => (
                        <div key={f.key}>
                          <label style={{ display: "block", fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: t.label, marginBottom: "6px" }}>
                            {f.label}
                          </label>
                          <input
                            type={f.type} required={f.required} placeholder={f.placeholder}
                            value={form[f.key]} disabled={loading}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                            style={inputStyle()}
                            onFocus={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.08)" : "#ffffff" }}
                            onBlur={e => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.background = t.inputBg }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Use case */}
                    <div>
                      <label style={{ display: "block", fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: t.label, marginBottom: "6px" }}>
                        Primary Use Case
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={form.useCase} disabled={loading}
                          onChange={e => setForm(p => ({ ...p, useCase: e.target.value as typeof form.useCase }))}
                          style={inputStyle({ paddingRight: "36px", appearance: "none", cursor: "pointer" })}
                          onFocus={e => { e.currentTarget.style.borderColor = GREEN }}
                          onBlur={e => { e.currentTarget.style.borderColor = t.inputBorder }}
                        >
                          {USE_CASES.map(uc => (
                            <option key={uc} value={uc} style={{ background: t.selectBg }}>{USE_CASE_LABELS[uc]}</option>
                          ))}
                        </select>
                        <ChevronDown size={13} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: t.label }} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: "block", fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: t.label, marginBottom: "6px" }}>
                        About your use case{" "}
                        <span style={{ textTransform: "none", letterSpacing: 0, fontFamily: "inherit", opacity: 0.7 }}>(optional)</span>
                      </label>
                      <textarea
                        rows={3} placeholder="Briefly describe what you'll be annotating and your expected scale…"
                        value={form.message} disabled={loading}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={inputStyle({ resize: "none", lineHeight: "1.6" })}
                        onFocus={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.08)" : "#ffffff" }}
                        onBlur={e => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.background = t.inputBg }}
                      />
                    </div>

                    {/* Submit */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "2px" }}>
                      <button
                        type="submit" disabled={loading}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                          padding: "13px 20px", borderRadius: "9px",
                          background: GREEN, color: "#fff", border: `1px solid ${GREEN_2}`,
                          fontSize: "14px", fontWeight: 500,
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.7 : 1,
                          boxShadow: "0 1px 4px rgba(22,163,74,0.3)",
                          transition: "background 120ms, transform 100ms",
                        }}
                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = GREEN_2; e.currentTarget.style.transform = "translateY(-1px)" } }}
                        onMouseLeave={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = "" }}
                      >
                        {loading
                          ? <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                          : <>Get Early Access <ArrowRight size={14} /></>
                        }
                      </button>
                      <p style={{ textAlign: "center", fontSize: "11.5px", color: t.footer, margin: 0, fontFamily: MONO }}>
                        No spam. We&apos;ll only reach out when you&apos;re approved.
                      </p>
                    </div>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
