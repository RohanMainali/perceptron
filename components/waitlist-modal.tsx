"use client"

import { useState, FormEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, CheckCircle2, Loader2, Sparkles, Clock } from "lucide-react"
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

export default function WaitlistModal({ isOpen, onClose, theme = "dark" }: WaitlistModalProps) {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "duplicate">("idle")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    useCase: "Other" as (typeof USE_CASES)[number],
    message: "",
  })

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.status === 409) {
        setSubmitState("duplicate")
        return
      }
      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.")
        return
      }
      setSubmitState("success")
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const isDark = theme === "dark"

  /* ─── Theme tokens ─────────────────────────────────────────────── */
  const overlay    = isDark ? "rgba(4, 10, 22, 0.88)"  : "rgba(15, 23, 42, 0.55)"
  const panel      = isDark ? "bg-[#060e1c]"           : "bg-white"
  const panelBorder= isDark ? "border-white/[0.08]"    : "border-slate-200"
  const panelShadow= isDark
    ? "0 32px 100px -16px rgba(33,120,199,0.4), 0 0 0 1px rgba(255,255,255,0.04)"
    : "0 24px 80px -12px rgba(33,120,199,0.18), 0 8px 32px -8px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)"

  // Eyebrow pill
  const eyebrow    = isDark ? "bg-[#2178C7]/15 border-[#53C5E6]/25 text-[#53C5E6]"      : "bg-[#2178C7]/10 border-[#2178C7]/20 text-[#1d6ab2]"
  const pingColor  = isDark ? "bg-[#53C5E6]"  : "bg-[#2178C7]"

  // Text
  const headingCls = isDark ? "text-white"    : "text-slate-900"
  const subCls     = isDark ? "text-white/38" : "text-slate-500"
  const labelCls   = isDark ? "text-white/35" : "text-slate-500"
  const optionalCls= isDark ? "text-white/22" : "text-slate-400"
  const requiredCls= "text-[#E05A6D]"
  const footerCls  = isDark ? "text-white/22" : "text-slate-400"

  // Close btn
  const closeBtn   = isDark
    ? "text-white/30 hover:text-white/75 hover:bg-white/[0.07]"
    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"

  // Divider
  const divider    = isDark ? "border-white/[0.07]" : "border-slate-100"

  // Inputs
  const inputBase  = isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/22 focus:border-[#2178C7]/65 focus:bg-white/[0.08]"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#2178C7]/60 focus:bg-white focus:ring-2 focus:ring-[#2178C7]/[0.12]"
  const selectArrow= isDark
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff45' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
  const selectBg   = isDark ? "#070f1e" : "#f8fafc"

  // Submit button
  const submitShadow = isDark
    ? "shadow-[0_8px_28px_-6px_rgba(33,120,199,0.55)] hover:shadow-[0_12px_36px_-4px_rgba(33,120,199,0.65)]"
    : "shadow-[0_8px_24px_-6px_rgba(33,120,199,0.38)] hover:shadow-[0_12px_32px_-4px_rgba(33,120,199,0.48)]"

  // Success
  const successIconCls   = isDark ? "text-[#53C5E6]"    : "text-[#2178C7]"
  const successHeadCls   = isDark ? "text-white"         : "text-slate-900"
  const successBodyCls   = isDark ? "text-white/45"      : "text-slate-500"
  const successCloseCls  = isDark
    ? "text-white/50 border-white/[0.1] hover:bg-white/[0.07] hover:text-white/80"
    : "text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 backdrop-blur-[8px]" style={{ background: overlay }} />

          {/* Panel */}
          <motion.div
            className={`relative z-10 w-full max-w-[492px] rounded-2xl border overflow-hidden ${panel} ${panelBorder}`}
            style={{ boxShadow: panelShadow }}
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 14 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div
              className="h-[2.5px] w-full"
              style={{ background: "linear-gradient(90deg, #1d6bb3 0%, #53C5E6 50%, #C26FCF 100%)" }}
            />

            {/* Header */}
            <div className="px-7 pt-6 pb-[18px] flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Eyebrow pill */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full border text-[10.5px] font-semibold tracking-[0.06em] uppercase mb-3 ${eyebrow}`}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${pingColor}`} />
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${pingColor}`} />
                  </span>
                  Private Beta
                </div>
                <h2 className={`text-[1.3rem] font-bold leading-[1.2] tracking-[-0.02em] mb-1.5 ${headingCls}`}>
                  Join the Auta Waitlist
                </h2>
                <p className={`text-[13px] leading-relaxed ${subCls}`}>
                  Be among the first to experience AI-powered annotation.
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${closeBtn}`}
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Divider */}
            <div className={`mx-7 border-t ${divider}`} />

            {/* Body */}
            <div className="px-7 pb-7 pt-5">
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  /* ─── Success state ─── */
                  <motion.div
                    key="success"
                    className="py-6 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <motion.div
                      className={`mb-4 ${successIconCls}`}
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.06 }}
                    >
                      <CheckCircle2 size={54} strokeWidth={1.35} />
                    </motion.div>
                    <h3 className={`text-[1.1rem] font-bold mb-2 ${successHeadCls}`}>
                      You&apos;re on the list!
                    </h3>
                    <p className={`text-[13.5px] leading-relaxed max-w-[290px] ${successBodyCls}`}>
                      Thanks for your interest. We&apos;ll review your request and notify you when you&apos;re approved.
                    </p>
                    <motion.button
                      className={`mt-6 px-7 py-2.5 rounded-xl text-[13px] font-medium border transition-all ${successCloseCls}`}
                      onClick={handleClose}
                      whileTap={{ scale: 0.97 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                ) : submitState === "duplicate" ? (
                  /* ─── Already registered state ─── */
                  <motion.div
                    key="duplicate"
                    className="py-6 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <motion.div
                      className={`mb-4 ${isDark ? "text-[#F1B646]" : "text-amber-500"}`}
                      initial={{ scale: 0, rotate: 20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.06 }}
                    >
                      <Clock size={54} strokeWidth={1.35} />
                    </motion.div>
                    <h3 className={`text-[1.1rem] font-bold mb-2 ${successHeadCls}`}>
                      Still in line, still counting.
                    </h3>
                    <p className={`text-[13.5px] leading-relaxed max-w-[300px] ${successBodyCls}`}>
                      Your application is already with us — no need to reapply. We&apos;re working through the queue and will reach out when you&apos;re approved. Good things come to those who wait.
                    </p>
                    <motion.button
                      className={`mt-6 px-7 py-2.5 rounded-xl text-[13px] font-medium border transition-all ${successCloseCls}`}
                      onClick={handleClose}
                      whileTap={{ scale: 0.97 }}
                    >
                      Got it
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[14px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-[6px]">
                        <label className={`text-[10.5px] font-semibold uppercase tracking-[0.07em] ${labelCls}`}>
                          Full Name <span className={requiredCls}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className={`w-full px-3.5 py-[10px] rounded-xl border text-[13.5px] outline-none transition-all ${inputBase}`}
                        />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <label className={`text-[10.5px] font-semibold uppercase tracking-[0.07em] ${labelCls}`}>
                          Email <span className={requiredCls}>*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={`w-full px-3.5 py-[10px] rounded-xl border text-[13.5px] outline-none transition-all ${inputBase}`}
                        />
                      </div>
                    </div>

                    {/* Use case */}
                    <div className="flex flex-col gap-[6px]">
                      <label className={`text-[10.5px] font-semibold uppercase tracking-[0.07em] ${labelCls}`}>
                        Primary Use Case
                      </label>
                      <select
                        value={form.useCase}
                        onChange={(e) => setForm((f) => ({ ...f, useCase: e.target.value as typeof form.useCase }))}
                        className={`w-full px-3.5 py-[10px] rounded-xl border text-[13.5px] outline-none transition-all appearance-none cursor-pointer ${inputBase}`}
                        style={{
                          backgroundImage: selectArrow,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          backgroundColor: selectBg,
                        }}
                      >
                        {USE_CASES.map((uc) => (
                          <option key={uc} value={uc} style={{ background: selectBg }}>
                            {USE_CASE_LABELS[uc]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-[6px]">
                      <label className={`text-[10.5px] font-semibold uppercase tracking-[0.07em] ${labelCls}`}>
                        About your use case{" "}
                        <span className={`normal-case font-normal ${optionalCls}`}>(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe what you'll be annotating and your expected scale…"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className={`w-full px-3.5 py-[10px] rounded-xl border text-[13.5px] outline-none transition-all resize-none leading-relaxed ${inputBase}`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`mt-0.5 w-full flex items-center justify-center gap-2 px-6 py-[13px] rounded-xl font-bold text-[14px] text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed ${submitShadow}`}
                      style={{ background: "linear-gradient(135deg, #1d6bb3 0%, #2da8d0 60%, #3ab8e0 100%)" }}
                      whileHover={loading ? {} : { scale: 1.015, y: -1 }}
                      whileTap={loading ? {} : { scale: 0.985 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          Request Early Access
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>

                    <p className={`text-center text-[11px] leading-relaxed ${footerCls}`}>
                      No spam, no commitments. We&apos;ll only reach out when you&apos;re approved.
                    </p>
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
