"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Linkedin, Youtube, Facebook } from "lucide-react"
import { SiReddit } from "react-icons/si"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

const FG    = "#0c0c0a"
const MUTED = "#5a5a52"
const FAINT = "#aaaaaa"
const MONO  = "'Geist Mono', 'Courier New', monospace"
const GREEN = "#16a34a"
const LINE  = "rgba(12,12,10,0.09)"
const PANEL = "#ffffff"
const BG2   = "#f6f6f3"

export default function Footer() {
  const year = new Date().getFullYear()
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: PANEL, borderTop: `1px solid ${LINE}`, color: FG }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: isMobile ? "48px 20px 24px" : "72px 32px 32px" }}>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1.7fr 1fr 1fr 1fr",
            gap: isMobile ? "32px 24px" : "48px",
            paddingBottom: isMobile ? "32px" : "48px",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "300px", gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", fontWeight: 600, letterSpacing: "-0.02em", color: FG }}>
              <Image src="/perceptron-logo.png" alt="Perceptron" width={22} height={22} />
              <span>Perceptron</span>
              <span style={{ color: FAINT, fontWeight: 400, fontSize: "13px" }}>AI Labs</span>
            </Link>
            <p style={{ fontSize: "13.5px", color: MUTED, lineHeight: 1.55, margin: 0 }}>
              Building Auta — the natural-language interface for vision data annotation.
            </p>
            <div style={{ fontFamily: MONO, fontSize: "11px", color: FAINT, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, flexShrink: 0 }} />
              Delaware, USA
            </div>
            <div style={{ display: "flex", gap: "7px" }}>
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/perceptronai/", label: "LinkedIn" },
                { icon: Youtube, href: "https://www.youtube.com/@Perceptron-ai-labs", label: "YouTube" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61586580522261", label: "Facebook" },
                { icon: SiReddit, href: "https://www.reddit.com/user/Intelligent_Cry_3621/", label: "Reddit" },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "7px",
                    background: BG2,
                    border: `1px solid ${LINE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: MUTED,
                    textDecoration: "none",
                    transition: "color 120ms, border-color 120ms, background 120ms",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = FG
                    el.style.borderColor = GREEN
                    el.style.background = "rgba(22,163,74,0.06)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = MUTED
                    el.style.borderColor = LINE
                    el.style.background = BG2
                  }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <FooterCol
            heading="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Auta", href: "https://auta.perceptronai.org", external: true },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          {/* Solutions */}
          <FooterCol
            heading="Solutions"
            links={[
              { label: "Medical Imaging", href: "/contact" },
              { label: "Sports Analytics", href: "/contact" },
              { label: "Autonomous Driving", href: "/contact" },
              { label: "Enterprise", href: "/contact" },
            ]}
          />

          {/* Community — hidden on mobile (social icons in brand section suffice) */}
          {!isMobile && (
            <FooterCol
              heading="Community"
              links={[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/perceptronai/" },
                { label: "YouTube", href: "https://www.youtube.com/@Perceptron-ai-labs" },
                { label: "Reddit", href: "https://www.reddit.com/user/Intelligent_Cry_3621/" },
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586580522261" },
              ]}
            />
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            fontSize: "12.5px",
            color: FAINT,
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <span>© {year} Perceptron AI Labs Inc.</span>
          <div style={{ display: "flex", gap: "18px" }}>
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={{ color: FAINT, textDecoration: "none", transition: "color 100ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = FG }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = FAINT }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <div style={{ fontFamily: MONO, fontSize: "10.5px", fontWeight: 500, color: FAINT, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: "14px" }}>
        {heading}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
        {links.map(l => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13.5px", color: MUTED, textDecoration: "none", transition: "color 100ms", display: "inline-flex", alignItems: "center", gap: "4px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = FG }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
              >
                {l.label} <ArrowUpRight size={11} strokeWidth={2} />
              </a>
            ) : (
              <Link
                href={l.href}
                style={{ fontSize: "13.5px", color: MUTED, textDecoration: "none", transition: "color 100ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = FG }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
