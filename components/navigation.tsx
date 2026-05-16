"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ArrowRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import WaitlistModal from "@/components/waitlist-modal"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

const FG      = "#0c0c0a"
const MUTED   = "#5a5a52"
const LINE    = "rgba(12,12,10,0.09)"
const GREEN   = "#16a34a"
const GREEN_2 = "#15803d"
const BG_NAV  = "rgba(249,249,247,0.97)"

interface NavigationProps {
  scrollY: number
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const scrolled = scrollY > 8

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "background 200ms, border-color 200ms, backdrop-filter 200ms",
          background: scrolled || menuOpen ? "rgba(249,249,247,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "saturate(160%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "saturate(160%) blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? `1px solid ${LINE}` : "1px solid transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px", position: "relative" }}>
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
              {!isMobile && <span style={{ color: "#7a7a72", fontWeight: 400, fontSize: "13px" }}>AI Labs</span>}
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

            {/* Right side: CTA + hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* CTA — hidden on mobile (shown in mobile menu instead) */}
              <button
                onClick={() => setWaitlistOpen(true)}
                className="hidden md:inline-flex"
                style={{
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

              {/* Hamburger — mobile only */}
              <button
                className="flex md:hidden"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  border: `1px solid ${LINE}`,
                  background: "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: FG,
                  flexShrink: 0,
                }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", borderTop: `1px solid ${LINE}`, background: BG_NAV }}
            >
              <div style={{ padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <MobileNavLink href="/about"   label="About"   active={pathname === "/about"}   onClick={() => setMenuOpen(false)} />
                <a
                  href="https://auta.perceptronai.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={mobileLink(false)}
                >
                  Auta <ArrowUpRight size={13} strokeWidth={2} />
                </a>
                <MobileNavLink href="/blog"    label="Blog"    active={pathname === "/blog"}    onClick={() => setMenuOpen(false)} />
                <MobileNavLink href="/contact" label="Contact" active={pathname === "/contact"} onClick={() => setMenuOpen(false)} />

                {/* CTA in menu */}
                <button
                  onClick={() => { setMenuOpen(false); setWaitlistOpen(true) }}
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: GREEN,
                    color: "#fff",
                    border: `1px solid ${GREEN_2}`,
                    padding: "13px 20px",
                    borderRadius: "9px",
                    fontSize: "15px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(22,163,74,0.25)",
                    width: "100%",
                  }}
                >
                  Get Early Access <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

function mobileLink(active: boolean): React.CSSProperties {
  return {
    padding: "13px 14px",
    borderRadius: "8px",
    fontSize: "16px",
    color: active ? FG : MUTED,
    background: active ? "rgba(12,12,10,0.05)" : "transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    fontWeight: active ? 500 : 400,
    width: "100%",
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

function MobileNavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <Link href={href} style={mobileLink(active)} onClick={onClick}>
      {label}
    </Link>
  )
}
