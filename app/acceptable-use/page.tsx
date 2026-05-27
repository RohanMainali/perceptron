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
  { id: "general",            label: "General Responsibilities" },
  { id: "prohibited-legal",   label: "Prohibited Legal Uses" },
  { id: "sourcing",           label: "Public Internet Dataset Sourcing" },
  { id: "prohibited-privacy", label: "Prohibited Privacy Uses" },
  { id: "prohibited-harmful", label: "Prohibited Harmful Content" },
  { id: "high-risk",          label: "High-Risk and Regulated Uses" },
  { id: "security",           label: "Security and Platform Integrity" },
  { id: "commercialization",  label: "Commercialization and Attribution" },
  { id: "monitoring",         label: "Monitoring and Enforcement" },
  { id: "reporting",          label: "Reporting Violations" },
  { id: "changes",            label: "Changes to This AUP" },
]

const ALL_SECTION_IDS = TOC_ITEMS.map(t => t.id)

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AcceptableUsePage() {
  const [scrollY, setScrollY]       = useState(0)
  const [activeId, setActiveId]     = useState<string>(TOC_ITEMS[0].id)
  const isMobile                    = useIsMobile()
  const observerRef                 = useRef<IntersectionObserver | null>(null)

  // Track scrollY for Navigation
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Active TOC tracking via IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    const ratio: Record<string, number> = {}

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { ratio[e.target.id] = e.intersectionRatio })
        const best = ALL_SECTION_IDS.reduce((a, b) => (ratio[a] ?? 0) >= (ratio[b] ?? 0) ? a : b)
        if (ratio[best] > 0) setActiveId(best)
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    )

    ALL_SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <main style={{ background: PANEL, color: FG }}>
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
          textAlign: "center",
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
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: GREEN,
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Perceptron AI Labs Inc.
          </div>

          {/* Title */}
          <h1
            style={{
              margin: "0 auto",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: FG,
              maxWidth: "18ch",
            }}
          >
            Acceptable Use Policy
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: isMobile ? "18px auto 0" : "24px auto 0",
              maxWidth: "540px",
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.6,
              color: MUTED,
              fontStyle: "italic",
            }}
          >
            Rules for lawful, safe, rights-respecting, and non-abusive use of Perceptron Services
          </p>

          {/* Last updated */}
          <p
            style={{
              margin: "16px auto 0",
              fontFamily: MONO,
              fontSize: "11px",
              color: FAINT,
              letterSpacing: "0.05em",
            }}
          >
            Last updated: May 16, 2026
          </p>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px 80px" : "64px 40px 100px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
          gap: isMobile ? "0" : "64px",
          alignItems: "start",
        }}
      >
        {/* ── Sticky TOC (desktop only) ─────────────────────────────────── */}
        {!isMobile && (
          <nav
            aria-label="Table of contents"
            style={{
              position: "sticky",
              top: "96px",
              alignSelf: "start",
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: FAINT,
                textTransform: "uppercase",
                margin: "0 0 16px",
              }}
            >
              Contents
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
              {TOC_ITEMS.map((item, i) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={e => {
                        e.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "12.5px",
                        color: isActive ? GREEN : MUTED,
                        textDecoration: "none",
                        background: isActive ? "rgba(22,163,74,0.07)" : "transparent",
                        fontWeight: isActive ? 500 : 400,
                        transition: "color 150ms, background 150ms",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: "9.5px",
                          color: isActive ? GREEN : FAINT,
                          flexShrink: 0,
                          minWidth: "14px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}

        {/* ── Main content ─────────────────────────────────────────────── */}
        <article style={{ minWidth: 0 }}>

          {/* Intro paragraphs */}
          <div style={{ paddingBottom: "40px", borderBottom: `1px solid ${LINE}`, marginBottom: "0" }}>
            <p style={pStyle}>
              This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs use of Perceptron, Auta, perceptronai.org, Perceptron APIs,
              and related services (collectively, the &ldquo;Services&rdquo;). It applies to all users, customers,
              administrators, developers, collaborators, contractors, and anyone who accesses the Services through an
              account, workspace, API key, integration, or export.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              This AUP is incorporated into our Terms and Conditions. Violation of this AUP may result in suspension,
              termination, content removal, export restrictions, rate limiting, legal action, or other measures.
            </p>
          </div>

          {/* Section 1 */}
          <Section id="general" title="1. General Responsibilities">
            <p style={pStyle}>
              You are responsible for all activity under your account, workspace, credentials, API keys, integrations,
              prompts, dataset requests, exports, and downstream uses.
            </p>
            <p style={pStyle}>
              You must use the Services only in compliance with applicable law, the Terms and Conditions, the Privacy
              Policy, the Copyright/DMCA Policy, this AUP, documentation, written agreements, source terms, dataset
              licenses, and third-party rights.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              You are solely responsible for the legality, rights-clearance, quality, accuracy, privacy compliance,
              safety, and downstream use of Customer Content, Public Source Content requested by you, Output, Datasets,
              exports, trained models, and deployments.
            </p>
          </Section>

          {/* Section 2 */}
          <Section id="prohibited-legal" title="2. Prohibited Illegal, Infringing, or Rights-Violating Uses">
            <p style={pStyle}>
              You may not use the Services to create, request, upload, source, process, annotate, export, distribute,
              train on, publish, commercialize, or deploy content or datasets that:
            </p>
            <BulletList
              items={[
                "violate any law, regulation, court order, sanctions rule, export control, contract, license, privacy policy, source term, or third-party restriction;",
                "infringe, misappropriate, or violate copyrights, trademarks, trade secrets, privacy rights, publicity rights, database rights, contractual rights, confidentiality obligations, or other rights;",
                "include content you do not own or have permission to use, unless your use is independently lawful and you accept all related risk;",
                "remove, alter, obscure, or falsify copyright notices, attribution, license notices, source metadata, provenance information, or rights-management information;",
                "bypass paywalls, login requirements, access controls, technical protection measures, robots restrictions, rate limits, API terms, or source-owner restrictions;",
                "re-upload, re-source, re-request, or redistribute material that has been removed, blocked, or disabled due to a legal, copyright, privacy, source-owner, or safety request.",
              ]}
            />
          </Section>

          {/* Section 3 */}
          <Section id="sourcing" title="3. Public Internet Dataset Sourcing Rules">
            <p style={pStyle}>
              When using Auta or related tools to source public internet imagery or other Public Source Content, you must:
            </p>
            <BulletList
              items={[
                "provide lawful and accurate prompts, instructions, filters, and dataset goals;",
                "avoid requesting content from sources or categories where you know or reasonably should know that collection, processing, training, publication, or redistribution is restricted;",
                "review source URLs, license signals, attribution requirements, terms of use, privacy implications, and rights-clearance needs before using or distributing datasets;",
                "not represent that a dataset is rights-cleared, privacy-cleared, commercially licensed, or production-ready unless you have independently verified that claim;",
                "promptly comply with takedown, deletion, source opt-out, or rights-holder instructions that apply to datasets or exports in your possession or control.",
              ]}
            />
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Perceptron may block domains, sources, topics, prompts, datasets, projects, exports, or outputs that
              present legal, safety, rights, privacy, security, operational, or reputational risk.
            </p>
          </Section>

          {/* Section 4 */}
          <Section id="prohibited-privacy" title="4. Prohibited Privacy, Biometric, and Surveillance Uses">
            <p style={pStyle}>
              You may not use the Services to identify, track, profile, monitor, target, or make decisions about
              individuals without a valid lawful basis and all required notices, consents, agreements, and safeguards.
            </p>
            <p style={pStyle}>
              You may not use the Services for face recognition, biometric identification, biometric verification,
              emotion recognition, demographic inference, sensitive-trait inference, persistent tracking, mass
              surveillance, doxxing, stalking, or location tracking unless expressly authorized in writing by Perceptron
              and lawful in all applicable jurisdictions.
            </p>
            <p style={pStyle}>
              You may not create, request, upload, source, annotate, or export datasets focused on children, private
              individuals, homes, schools, hospitals, places of worship, protests, medical settings, license plates,
              identity documents, or other sensitive contexts unless you have a lawful basis and Perceptron has approved
              the use where required.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              You may not upload or process protected health information, payment card data, government identifiers,
              biometric templates, precise location data, children&rsquo;s data, or other highly regulated data unless
              Perceptron has expressly agreed in writing and required safeguards are in place.
            </p>
          </Section>

          {/* Section 5 */}
          <Section id="prohibited-harmful" title="5. Prohibited Harmful, Abusive, or Unsafe Content">
            <p style={pStyle}>
              You may not use the Services to create, request, upload, source, process, annotate, export, distribute,
              train on, or deploy content that:
            </p>
            <BulletList
              items={[
                "promotes violence, terrorism, extremist activity, criminal activity, exploitation, abuse, harassment, hate, threats, or dehumanization;",
                "contains child sexual abuse material, sexual exploitation, non-consensual intimate imagery, sexualized minors, or attempts to create, classify, detect, or source such material except for lawful, authorized safety reporting by qualified entities;",
                "facilitates self-harm, suicide, eating disorders, or physical harm;",
                "facilitates weapons development, evasion, targeting, or physical harm;",
                "creates malware, phishing, credential theft, spam, botnets, denial-of-service activity, vulnerability exploitation, or unauthorized access;",
                "facilitates fraud, scams, impersonation, identity theft, deceptive synthetic media, unlawful surveillance, or manipulation;",
                "is defamatory, obscene, invasive, exploitative, or otherwise harmful in a way that creates risk to Perceptron, users, third parties, or the public.",
              ]}
            />
          </Section>

          {/* Section 6 */}
          <Section id="high-risk" title="6. High-Risk and Regulated Uses">
            <p style={pStyle}>
              You may not use the Services, Output, Datasets, or exports as the sole basis for decisions that affect
              legal rights, safety, employment, housing, credit, education, healthcare, insurance, immigration,
              criminal justice, eligibility for essential services, or other high-impact matters.
            </p>
            <p style={pStyle}>
              You may not deploy Output or Datasets in safety-critical systems, autonomous vehicles, robotics control,
              industrial control, medical devices, law enforcement, military, national security, aviation, weapons
              systems, or other high-risk environments without independent validation, required approvals, professional
              oversight, and a separate written agreement with Perceptron where required.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              You are responsible for human review, testing, validation, bias assessment, error analysis,
              documentation, monitoring, and compliance before using any Output, Dataset, model, or export in
              production.
            </p>
          </Section>

          {/* Section 7 */}
          <Section id="security" title="7. Security, Abuse, and Platform Integrity">
            <p style={pStyle}>You may not:</p>
            <BulletList
              items={[
                "interfere with, disrupt, overload, disable, damage, or impair the Services or third-party systems;",
                "breach, circumvent, probe, scan, or test security or authentication measures without written authorization;",
                "share, expose, sell, lease, sublicense, or misuse API keys, tokens, credentials, or access privileges;",
                "use unauthorized bots, scrapers, crawlers, spiders, offline readers, or automated tools to access the Services or collect content from the Services;",
                "reverse engineer, decompile, disassemble, copy, modify, extract, or attempt to derive source code, model weights, system prompts, hidden prompts, internal data, model architecture, or non-public information except as permitted by law;",
                "attempt model extraction, prompt extraction, membership inference, automated benchmark abuse, rate-limit evasion, account sharing, account farming, or usage-limit circumvention;",
                "use the Services to build, train, benchmark, or improve a competing product or service except as expressly permitted by a written agreement;",
                "submit malicious code, corrupted files, destructive payloads, or content designed to interfere with systems or data.",
              ]}
            />
          </Section>

          {/* Section 8 */}
          <Section id="commercialization" title="8. Commercialization, Redistribution, and Attribution">
            <p style={pStyle}>
              You may not sell, sublicense, publish, distribute, commercialize, or make publicly available Datasets,
              Public Source Content, Output, or exports unless you have all required rights, licenses, permissions,
              attributions, and lawful bases.
            </p>
            <p style={pStyle}>
              You must preserve copyright notices, license notices, attribution, source URLs, provenance metadata, and
              use restrictions where required by law, license, source terms, or Perceptron documentation.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              You may not misrepresent the origin, rights status, accuracy, completeness, safety, privacy status, or
              legal status of any Dataset, Output, export, or model.
            </p>
          </Section>

          {/* Section 9 */}
          <Section id="monitoring" title="9. Monitoring and Enforcement">
            <p style={pStyle}>
              Perceptron may monitor, log, review, investigate, preserve, remove, disable, filter, restrict, or
              disclose information where we believe it is necessary or appropriate to operate the Services, enforce
              policies, prevent abuse, respond to legal requests, protect rights or safety, or reduce legal, security,
              operational, or reputational risk.
            </p>
            <p style={pStyle}>
              We may suspend, terminate, throttle, block, or restrict accounts, workspaces, API keys, projects,
              datasets, sources, exports, features, or access without notice where we believe a violation or risk has
              occurred.
            </p>
            <p style={pStyle}>
              We may report suspected illegal activity to law enforcement, regulators, rights holders, source websites,
              service providers, affected users, or other appropriate parties.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Perceptron has no obligation to monitor all content and assumes no responsibility for Customer Content,
              Public Source Content, Output, Datasets, exports, or downstream use. Enforcement decisions are at our
              discretion and do not create any duty or waiver.
            </p>
          </Section>

          {/* Section 10 */}
          <Section id="reporting" title="10. Reporting Violations">
            <p style={pStyle}>
              To report suspected abuse, policy violations, security issues, illegal content, rights violations, or
              unsafe use, contact{" "}
              <a
                href="mailto:support@perceptronai.org"
                style={{ color: GREEN, textDecoration: "none", borderBottom: `1px solid rgba(22,163,74,0.3)` }}
              >
                support@perceptronai.org
              </a>
              .
            </p>
            <p style={pStyle}>
              Suggested subject lines: &ldquo;AUP Report,&rdquo; &ldquo;Security Report,&rdquo; &ldquo;Rights
              Complaint,&rdquo; &ldquo;Public Source Opt-Out,&rdquo; or &ldquo;Illegal Content Report.&rdquo;
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Please include enough information for us to investigate, such as account identifiers, workspace IDs,
              dataset IDs, source URLs, screenshots, API request IDs, timestamps, and a description of the concern.
            </p>
          </Section>

          {/* Section 11 */}
          <Section id="changes" title="11. Changes to This AUP" isLast>
            <p style={pStyle}>
              We may update this AUP from time to time. Updated versions will be posted with a revised &ldquo;Last
              updated&rdquo; date. Updates may take effect immediately where required for legal, security, safety, or
              operational reasons.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Your continued use of the Services after an updated AUP becomes effective means you agree to the updated
              AUP.
            </p>
          </Section>

        </article>
      </div>

      <Footer />
    </main>
  )
}

// ── Paragraph style ───────────────────────────────────────────────────────────
const pStyle: React.CSSProperties = {
  fontSize: "15px",
  color: MUTED,
  lineHeight: 1.75,
  margin: "0 0 16px",
}

// ── Section component ─────────────────────────────────────────────────────────
function Section({
  id,
  title,
  children,
  isLast = false,
}: {
  id: string
  title: string
  children: React.ReactNode
  isLast?: boolean
}) {
  return (
    <div
      id={id}
      style={{
        scrollMarginTop: "100px",
        paddingBottom: "48px",
        paddingTop: "48px",
        borderBottom: isLast ? "none" : `1px solid ${LINE}`,
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: FG,
          margin: "0 0 20px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

// ── BulletList component ──────────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: GREEN,
              flexShrink: 0,
              marginTop: "7px",
            }}
          />
          <span
            style={{
              fontSize: "15px",
              color: MUTED,
              lineHeight: 1.75,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
