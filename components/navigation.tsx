"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import WaitlistModal from "@/components/waitlist-modal"

const FG      = "#0c0c0a"
const MUTED   = "#5a5a52"
const LINE    = "rgba(12,12,10,0.09)"
const GREEN   = "#16a34a"
const GREEN_2 = "#15803d"

interface NavigationProps {
  scrollY: number
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const pathname = usePathname()
  const scrolled = scrollY > 8

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "background 200ms, border-color 200ms, backdrop-filter 200ms",
          background: scrolled ? "rgba(249,249,247,0.88)" : "transparent",
          backdropFilter: scrolled ? "saturate(160%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(160%) blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>

            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                fontSize: "15px",
                color: FG,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Image src="/perceptron-logo.png" alt="Perceptron" width={22} height={22} />
              <span>Perceptron</span>
              <span style={{ color: "#7a7a72", fontWeight: 400, fontSize: "13px" }}>AI Labs</span>
            </Link>

            {/* Desktop nav links — centered absolutely, hidden on mobile */}
            <div
              className="hidden md:flex"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <NavLink href="/about"   label="About"   active={pathname === "/about"} />

              {/* Solutions — commented out per design */}
              {/* <NavLink href="/services" label="Solutions" active={pathname === "/services"} /> */}

              <a
                href="https://auta.perceptronai.org"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle(false)}
                onMouseEnter={e => applyHover(e, true)}
                onMouseLeave={e => applyHover(e, false)}
              >
                Auta <ArrowUpRight size={11} strokeWidth={2} />
              </a>

              <NavLink href="/blog"    label="Blog"    active={pathname === "/blog"} />
              <NavLink href="/contact" label="Contact" active={pathname === "/contact"} />
            </div>

            {/* CTA — always visible */}
            <button
              onClick={() => setWaitlistOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: GREEN,
                color: "#fff",
                border: `1px solid ${GREEN_2}`,
                padding: "8px 16px",
                borderRadius: "7px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(22,163,74,0.25)",
                transition: "background 120ms, transform 100ms, box-shadow 120ms",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = GREEN_2
                el.style.transform = "translateY(-1px)"
                el.style.boxShadow = "0 4px 12px rgba(22,163,74,0.30)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = GREEN
                el.style.transform = ""
                el.style.boxShadow = "0 1px 3px rgba(22,163,74,0.25)"
              }}
            >
              Get Early Access <ArrowRight size={13} />
            </button>

          </div>
        </div>
      </motion.nav>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        theme="light"
      />
    </>
  )
}

function linkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "7px 13px",
    borderRadius: "6px",
    fontSize: "14px",
    color: active ? FG : MUTED,
    background: active ? "rgba(12,12,10,0.05)" : "transparent",
    transition: "color 100ms, background 100ms",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    textDecoration: "none",
    cursor: "pointer",
  }
}

function applyHover(e: React.MouseEvent, entering: boolean) {
  const el = e.currentTarget as HTMLElement
  el.style.color = entering ? FG : MUTED
  el.style.background = entering ? "rgba(12,12,10,0.05)" : "transparent"
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={linkStyle(active)}
      onMouseEnter={e => { if (!active) applyHover(e, true) }}
      onMouseLeave={e => { if (!active) applyHover(e, false) }}
    >
      {label}
    </Link>
  )
}
