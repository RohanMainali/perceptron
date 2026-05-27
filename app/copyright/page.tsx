"use client"

import { useEffect, useState, useRef } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import MeshCanvas from "@/components/mesh-canvas"
import { useIsMobile } from "@/lib/hooks/use-is-mobile"

// ── Design tokens ─────────────────────────────────────────────────────────────
const FG       = "#0c0c0a"
const MUTED    = "#5a5a52"
const FAINT    = "#aaaaaa"
const MONO     = "'Geist Mono', 'Courier New', monospace"
const GREEN    = "#16a34a"
const LINE     = "rgba(12,12,10,0.09)"
const LINE_STR = "rgba(12,12,10,0.14)"
const PANEL    = "#ffffff"
const BG2      = "#f6f6f3"

// ── TOC items ─────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "notice",           label: "Important Notice" },
  { id: "agent",            label: "Designated Copyright Agent" },
  { id: "takedown",         label: "Copyright Takedown Notice" },
  { id: "response",         label: "Our Response to Notices" },
  { id: "counter",          label: "Counter-Notices" },
  { id: "repeat",           label: "Repeat Infringer Policy" },
  { id: "opt-out",          label: "Public Source Content Removal" },
  { id: "technical",        label: "Standard Technical Measures" },
  { id: "other-rights",     label: "Other Rights Complaints" },
  { id: "misrepresentation", label: "Misrepresentations and Abuse" },
  { id: "changes",          label: "Changes to This Policy" },
  { id: "contact",          label: "Contact" },
]

// ── Helper components ─────────────────────────────────────────────────────────
function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "15px", color: MUTED, lineHeight: 1.75, margin: "0 0 16px" }}>
      {children}
    </p>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <span style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: GREEN,
            flexShrink: 0,
            marginTop: "8px",
          }} />
          <span style={{ fontSize: "15px", color: MUTED, lineHeight: 1.75 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      style={{
        scrollMarginTop: "100px",
        paddingBottom: "48px",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <h2 style={{
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "-0.025em",
        color: FG,
        margin: "0 0 20px",
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function AddressBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: BG2,
      border: `1px solid ${LINE}`,
      borderRadius: "10px",
      padding: "16px 20px",
      fontFamily: MONO,
      fontSize: "13px",
      color: MUTED,
      lineHeight: 1.8,
      margin: "0 0 16px",
    }}>
      {children}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CopyrightPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeId, setActiveId] = useState<string>("notice")
  const isMobile = useIsMobile()
  const contentRef = useRef<HTMLDivElement>(null)

  // Track scroll for nav + active TOC
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section by checking each section's position
      let current = TOC_ITEMS[0].id
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 140) {
            current = item.id
          }
        }
      }
      setActiveId(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <main style={{ background: PANEL }}>
      <Navigation scrollY={scrollY} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background: PANEL,
          borderBottom: `1px solid ${LINE_STR}`,
          paddingTop: isMobile ? "96px" : "148px",
          paddingBottom: isMobile ? "52px" : "100px",
          overflow: "hidden",
          color: FG,
        }}
      >
        <MeshCanvas />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "560px",
            background: "radial-gradient(ellipse at 50% 40%, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 45%, transparent 68%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: isMobile ? "0 20px" : "0 40px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: GREEN,
              margin: "0 0 18px",
            }}
          >
            Perceptron AI Labs Inc.
          </p>

          <h1
            style={{
              margin: "0 auto",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              color: FG,
              maxWidth: "18ch",
            }}
          >
            Copyright/DMCA Policy
          </h1>

          <p
            style={{
              margin: isMobile ? "18px auto 0" : "24px auto 0",
              maxWidth: "560px",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.6,
              color: MUTED,
              fontStyle: "italic",
            }}
          >
            For copyright complaints, counter-notices, public-source removals, and repeat infringer handling
          </p>

          <p
            style={{
              margin: "12px auto 0",
              fontFamily: MONO,
              fontSize: "12px",
              color: FAINT,
              letterSpacing: "0.04em",
            }}
          >
            Last updated: May 16, 2026
          </p>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "48px 20px 80px" : "72px 40px 120px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
          gap: isMobile ? "0" : "72px",
          alignItems: "start",
        }}
      >
        {/* ── Sticky TOC (desktop only) ─────────────────────────────────── */}
        {!isMobile && (
          <aside
            style={{
              position: "sticky",
              top: "100px",
              alignSelf: "start",
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: FAINT,
                margin: "0 0 16px",
              }}
            >
              Contents
            </p>
            <nav>
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "7px 0 7px 14px",
                      fontSize: "13px",
                      color: isActive ? FG : MUTED,
                      fontWeight: isActive ? 500 : 400,
                      lineHeight: 1.45,
                      borderLeft: `2px solid ${isActive ? GREEN : LINE_STR}`,
                      transition: "color 150ms, border-color 150ms",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = FG
                        el.style.borderLeftColor = LINE_STR
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = MUTED
                        el.style.borderLeftColor = LINE_STR
                      }
                    }}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </aside>
        )}

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div ref={contentRef} style={{ minWidth: 0 }}>

          {/* Intro paragraphs */}
          <div style={{ paddingBottom: "48px", borderBottom: `1px solid ${LINE}` }}>
            <P>
              Perceptron AI Labs Inc. respects intellectual property rights and expects users of Perceptron, Auta,
              perceptronai.org, Perceptron APIs, and related services to do the same. This Copyright/DMCA Policy
              explains how rights holders may report alleged copyright infringement, how users may submit
              counter-notices, and how Perceptron may respond to takedown, removal, and opt-out requests.
            </P>
            <P>
              This Policy is intended to support copyright compliance for an AI dataset creation and annotation
              platform, including features that may identify, retrieve, cache, process, annotate, transform, or
              export images or other content from publicly available internet sources.
            </P>
            <P>
              This Policy is incorporated into our Terms and Conditions and Acceptable Use Policy.
            </P>
          </div>

          {/* 1. Important Notice */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="notice" title="1. Important Notice">
              <P>
                Public availability of content on the internet does not mean that the content is free to copy, train
                on, redistribute, publish, commercialize, or use without restriction.
              </P>
              <P>
                Perceptron does not grant users any rights in third-party content, including Public Source Content.
                Users are responsible for obtaining all rights, permissions, licenses, consents, lawful bases, and
                attributions required for their use of Customer Content, Public Source Content, Output, and Datasets.
              </P>
              <P>
                This Policy is not legal advice. If you are unsure whether your rights have been infringed or whether
                your use is lawful, consult an attorney.
              </P>
            </Section>
          </div>

          {/* 2. Designated Copyright Agent */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="agent" title="2. Designated Copyright Agent">
              <P>Copyright notices should be sent to Perceptron&apos;s designated copyright contact:</P>
              <AddressBlock>
                <div>Copyright Agent</div>
                <div>Perceptron AI Labs Inc.</div>
                <div>Email: support@perceptronai.org</div>
                <div>Mailing address: [Insert legal mailing address]</div>
                <div>Subject line: &quot;DMCA Notice&quot; or &quot;Copyright Complaint&quot;</div>
              </AddressBlock>
              <P>
                Before relying on U.S. DMCA safe-harbor procedures, Perceptron should register and maintain a
                designated agent with the U.S. Copyright Office and publish the same agent information on its
                website. If a separate registered copyright-agent email or address is established, that registered
                information should replace the placeholder above.
              </P>
            </Section>
          </div>

          {/* 3. How to Submit a Copyright Takedown Notice */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="takedown" title="3. How to Submit a Copyright Takedown Notice">
              <P>
                To request removal or disabling of allegedly infringing material, provide a written notice containing
                the following:
              </P>
              <BulletList items={[
                "Your physical or electronic signature, or the signature of a person authorized to act on behalf of the copyright owner.",
                "Identification of the copyrighted work claimed to have been infringed, or a representative list if multiple works are involved.",
                "Identification of the material claimed to be infringing or the activity claimed to be infringing, with information reasonably sufficient for us to locate it. Please include source URLs, Perceptron project IDs, dataset IDs, workspace IDs, screenshots, file names, export references, or other precise identifiers where available.",
                "Your name, mailing address, telephone number, and email address.",
                "A statement that you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.",
                "A statement that the information in your notice is accurate and, under penalty of perjury where applicable, that you are authorized to act on behalf of the copyright owner.",
              ]} />
              <P>
                Incomplete notices may delay our response. We may request additional information needed to identify
                the material, verify authority, prevent fraud, or evaluate the request.
              </P>
            </Section>
          </div>

          {/* 4. Our Response to Notices */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="response" title="4. Our Response to Notices">
              <P>
                When we receive a copyright complaint, we may remove, disable, block, filter, quarantine, de-index,
                or restrict access to the material at issue. We may also suspend or terminate accounts, restrict
                exports, disable sharing, preserve records, or take other action we consider appropriate.
              </P>
              <P>
                We may forward the notice, your contact information, and related information to the user who provided
                or requested the material, workspace administrators, service providers, legal representatives, or
                other parties where appropriate.
              </P>
              <P>
                We do not admit liability by taking down, disabling, preserving, declining to remove, restoring, or
                otherwise acting on any material. We reserve the right to remove or restrict content for any reason
                or no reason, subject to applicable law and contracts.
              </P>
              <P>
                We are not responsible for copies of material that users have already exported, downloaded,
                published, copied, shared, backed up, trained on, incorporated into models, or moved outside
                Perceptron-controlled systems.
              </P>
            </Section>
          </div>

          {/* 5. Counter-Notices */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="counter" title="5. Counter-Notices">
              <P>
                If you believe material was removed or disabled because of mistake or misidentification, you may
                submit a counter-notice to the copyright contact above. A counter-notice should include:
              </P>
              <BulletList items={[
                "Your physical or electronic signature.",
                "Identification of the material that was removed or disabled and the location where it appeared before removal or disabling.",
                "A statement under penalty of perjury, where applicable, that you have a good-faith belief that the material was removed or disabled as a result of mistake or misidentification.",
                "Your name, mailing address, telephone number, and email address.",
                "A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located, or if your address is outside the United States, any judicial district in which Perceptron may be found.",
                "A statement that you will accept service of process from the person who submitted the original notice or that person's agent.",
              ]} />
              <P>
                If we receive a valid counter-notice, we may forward it to the original complainant. We may restore
                or stop disabling the material after the legally applicable waiting period unless the complainant
                informs us that it has filed an action seeking a court order to restrain the challenged activity.
                Restoration is at Perceptron&apos;s discretion and may be limited by technical, legal, contractual,
                safety, or policy concerns.
              </P>
            </Section>
          </div>

          {/* 6. Repeat Infringer Policy */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="repeat" title="6. Repeat Infringer Policy">
              <P>
                Perceptron may suspend or terminate users, accounts, workspaces, API keys, projects, or access
                privileges of users who are repeat infringers or repeat alleged infringers in appropriate
                circumstances.
              </P>
              <P>
                We may consider the number, severity, credibility, and context of notices; counter-notices; court
                orders; user conduct; evasive behavior; reuploads; source restrictions; and other relevant
                information.
              </P>
              <P>
                Users may not re-upload, re-source, re-request, re-export, or otherwise attempt to restore material
                that has been removed, blocked, or disabled due to a copyright, rights-holder, source, privacy,
                safety, or legal request without Perceptron&apos;s express written permission.
              </P>
            </Section>
          </div>

          {/* 7. Public Source Content Removal and Domain Opt-Out Requests */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="opt-out" title="7. Public Source Content Removal and Domain Opt-Out Requests">
              <P>
                Rights holders, website owners, creators, and authorized representatives may request that Perceptron
                remove specific Public Source Content from active Perceptron-controlled systems or exclude specific
                URLs, domains, works, or sources from future public-source collection where technically feasible.
              </P>
              <P>
                To help us process the request, include source URLs, domain names, screenshots, project or dataset
                references, proof of authority, and a clear description of the requested action.
              </P>
              <P>
                We may require verification before taking action. We may deny, narrow, or delay requests that are
                incomplete, fraudulent, overbroad, technically infeasible, legally unsupported, or abusive.
              </P>
              <P>
                Removal or opt-out from Perceptron-controlled systems does not require or guarantee removal from
                user-controlled exports, backups, downstream models, public websites, third-party repositories,
                search engines, caches, or third-party systems.
              </P>
            </Section>
          </div>

          {/* 8. Standard Technical Measures, Source Restrictions, and Robots Signals */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="technical" title="8. Standard Technical Measures, Source Restrictions, and Robots Signals">
              <P>
                Perceptron may, where technically feasible and appropriate, use source restrictions, exclusion
                lists, rights-holder requests, robots signals, rate limits, license metadata, provenance
                information, and similar signals to guide public-source collection and dataset workflows.
              </P>
              <P>
                Users may not use the Services to bypass paywalls, authentication, access controls, technical
                protection measures, robots restrictions, rate limits, contractual restrictions, or source-owner
                restrictions.
              </P>
              <P>
                Nothing in this Policy requires Perceptron to collect, preserve, restore, or continue making
                available any content, source, dataset, export, annotation, or Output.
              </P>
            </Section>
          </div>

          {/* 9. Trademark, Privacy, Publicity, and Other Rights Complaints */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="other-rights" title="9. Trademark, Privacy, Publicity, and Other Rights Complaints">
              <P>
                This Policy primarily addresses copyright complaints. If you believe material violates trademark,
                privacy, publicity, confidentiality, contractual, or other rights, contact us with the subject line
                &quot;Rights Complaint&quot; and provide information sufficient to evaluate the issue.
              </P>
              <P>
                We may remove, restrict, disable, or decline to act on such requests at our discretion, subject to
                applicable law and contracts.
              </P>
            </Section>
          </div>

          {/* 10. Misrepresentations and Abuse */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="misrepresentation" title="10. Misrepresentations and Abuse">
              <P>
                Submitting false, misleading, abusive, or bad-faith notices or counter-notices may result in legal
                liability, account suspension, termination, or other action.
              </P>
              <P>
                Do not submit copyright complaints to suppress lawful competition, criticism, fair use, research,
                interoperability, or other lawful activity.
              </P>
            </Section>
          </div>

          {/* 11. Changes to This Policy */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="changes" title="11. Changes to This Policy">
              <P>
                We may update this Copyright/DMCA Policy from time to time. Updated versions will be posted with a
                revised &quot;Last updated&quot; date. Your continued use of the Services after an update becomes
                effective means you acknowledge the updated Policy.
              </P>
            </Section>
          </div>

          {/* 12. Contact */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="contact" title="12. Contact">
              <AddressBlock>
                <div>Copyright and rights complaints: support@perceptronai.org</div>
                <div>Mailing address: [Insert legal mailing address]</div>
                <div>Suggested subject lines: &quot;DMCA Notice,&quot; &quot;Counter-Notice,&quot; &quot;Domain Opt-Out,&quot; or &quot;Rights Complaint&quot;</div>
              </AddressBlock>
            </Section>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
