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
  { id: "scope",     label: "Scope" },
  { id: "roles",     label: "Roles" },
  { id: "collect",   label: "Information We Collect" },
  { id: "sourcing",  label: "Public Internet Dataset Sourcing" },
  { id: "use",       label: "How We Use Information" },
  { id: "training",  label: "Broad Service Improvement" },
  { id: "cookies",   label: "Cookies and Similar Technologies" },
  { id: "disclose",  label: "How We Disclose Information" },
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeId, setActiveId] = useState<string>("scope")
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
          <h1
            style={{
              margin: "0 auto",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              color: FG,
              maxWidth: "16ch",
            }}
          >
            Privacy Policy
          </h1>

          <p
            style={{
              margin: isMobile ? "18px auto 0" : "24px auto 0",
              maxWidth: "480px",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.6,
              color: MUTED,
              fontStyle: "italic",
            }}
          >
            For perceptronai.org, Auta, Perceptron APIs, and related services
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
              This Privacy Policy explains how Perceptron AI Labs Inc. ("Perceptron," "we," "our," or "us") collects,
              uses, discloses, retains, and protects information when you access or use Perceptron, Auta,
              perceptronai.org, Perceptron APIs, and related services (collectively, the "Services").
            </P>
            <P>
              By using the Services, you acknowledge this Privacy Policy. If you use the Services on behalf of a
              company, organization, or other legal entity, you represent that you are authorized to provide
              information to us and to cause that entity to be bound by this Privacy Policy and our Terms and
              Conditions.
            </P>
            <P>
              This Privacy Policy is designed for an AI dataset creation and annotation platform. The Services may
              process uploaded images, videos, prompts, URLs, annotations, metadata, generated outputs, usage logs,
              and publicly available internet content requested through Auta or related tools.
            </P>
          </div>

          {/* 1. Scope */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="scope" title="1. Scope">
              <P>
                This Privacy Policy applies to information we collect through our websites, applications, APIs,
                demos, documentation, beta features, support channels, events, sales communications, and any service
                that links to this Privacy Policy.
              </P>
              <P>
                This Privacy Policy does not apply to third-party websites, third-party datasets, third-party
                models, third-party integrations, or services that we do not control. Those third parties may have
                their own privacy policies, licenses, and terms.
              </P>
              <P>
                This Privacy Policy is incorporated into our Terms and Conditions. Capitalized terms not defined
                here have the meanings given in the Terms and Conditions.
              </P>
            </Section>
          </div>

          {/* 2. Roles */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="roles" title="2. Roles: Controller, Processor, and Service Provider">
              <P>
                For account information, website analytics, billing information, marketing information, security
                logs, product telemetry, and other business information, Perceptron generally acts as a controller
                or business under applicable privacy laws.
              </P>
              <P>
                For non-public Customer Content that you upload into a workspace under a written enterprise
                agreement or Data Processing Addendum, Perceptron may act as a processor or service provider,
                processing that data on your behalf and under your instructions.
              </P>
              <P>
                Unless a separate written agreement expressly states otherwise, Perceptron may process Customer
                Content, Public Source Content, Output, logs, and derived information as described in this Privacy
                Policy and the Terms, including for service operation, security, abuse prevention, analytics,
                research, development, testing, training, and improvement of Perceptron Technology.
              </P>
              <P>
                You are responsible for determining whether your use of the Services makes you a controller,
                business, processor, service provider, joint controller, or other regulated party, and for
                satisfying your own privacy, notice, consent, and data-processing obligations.
              </P>
            </Section>
          </div>

          {/* 3. Information We Collect */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="collect" title="3. Information We Collect">
              <P>We may collect the categories of information below, depending on how you use the Services:</P>
              <BulletList items={[
                "Account and profile information, such as name, email address, organization name, role, login credentials, authentication information, and user preferences.",
                "Commercial and billing information, such as plan information, invoices, payment status, billing address, purchase history, and payment processor references. We may use third-party payment processors and do not intentionally store full payment card numbers unless expressly stated.",
                "Customer Content, including images, videos, zip files, URLs, prompts, instructions, annotation schemas, labels, masks, bounding boxes, polygons, OCR results, captions, notes, metadata, datasets, exports, and other materials you or your authorized users provide.",
                "Public Source Content, including public images, videos, webpages, captions, URLs, license signals, source metadata, thumbnails, and related materials that the Services identify, retrieve, cache, process, annotate, transform, or export in response to your dataset requests or our service operations.",
                "Output, including annotations, labels, structured data, masks, bounding boxes, generated metadata, model responses, derived features, dataset organization, evaluations, and exports generated by or through the Services.",
                "Usage and device information, such as IP address, browser type, device identifiers, operating system, pages viewed, referring URLs, API calls, latency, errors, feature usage, model/version identifiers, token or compute usage, timestamps, and diagnostic logs.",
                "Communications, including support requests, sales inquiries, demo requests, feedback, survey responses, messages, and recordings or transcripts where disclosed.",
                "Integration information, such as files, metadata, permissions, access tokens, repository references, cloud-storage references, and other information you choose to connect to the Services.",
                "Cookies and similar technologies, including analytics identifiers, session cookies, local storage, pixels, and related tracking technologies used to operate, secure, measure, and improve the Services.",
                "Information from third parties, such as authentication providers, analytics providers, enrichment providers, public sources, event partners, affiliates, service providers, and other users in your workspace.",
              ]} />
            </Section>
          </div>

          {/* 4. Public Internet Dataset Sourcing */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="sourcing" title="4. Public Internet Dataset Sourcing">
              <P>
                Auta and related Services may allow you to describe a dataset and request that the Services source
                imagery or other materials from publicly available internet locations or third-party repositories.
              </P>
              <P>
                When this feature is used, we may collect and process Public Source Content, source URLs, crawl or
                retrieval metadata, license signals, file metadata, deduplication fingerprints, embedding vectors,
                annotations, quality scores, and other technical information needed to create, evaluate, organize,
                filter, annotate, and export datasets.
              </P>
              <P>
                Public availability does not mean that content is free of copyright, privacy, publicity,
                contractual, license, or other restrictions. We do not represent that Public Source Content is
                rights-cleared, accurate, current, safe, lawful for your intended use, or suitable for model
                training, commercial use, publication, or redistribution.
              </P>
              <P>
                You are responsible for reviewing Public Source Content, source terms, licenses, attribution
                requirements, privacy implications, rights-clearance needs, and downstream use restrictions before
                using, training on, distributing, publishing, or commercializing any dataset or Output.
              </P>
              <P>
                We may remove, block, de-index, filter, quarantine, or stop using Public Source Content or source
                domains at our discretion or in response to rights-holder requests, privacy requests, source
                restrictions, law, abuse reports, or our internal policies.
              </P>
            </Section>
          </div>

          {/* 5. How We Use Information */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="use" title="5. How We Use Information">
              <P>We may use information for the following purposes:</P>
              <BulletList items={[
                "To provide, operate, maintain, secure, troubleshoot, and support the Services.",
                "To create, process, annotate, transform, organize, validate, deduplicate, export, and manage datasets.",
                "To respond to prompts, instructions, API calls, support requests, sales inquiries, and administrative communications.",
                "To personalize features, remember preferences, manage accounts, authenticate users, and enable collaboration in workspaces.",
                "To monitor performance, reliability, errors, latency, capacity, quality, abuse, fraud, security incidents, and policy violations.",
                "To develop, test, train, fine-tune, evaluate, benchmark, debug, and improve Perceptron Technology, including AI models, data pipelines, annotation systems, dataset sourcing systems, ranking systems, filters, safety systems, and product features.",
                "To create and use aggregated, anonymized, de-identified, statistical, or derived information for any lawful business purpose, including analytics, benchmarking, model evaluation, research, and service improvement.",
                "To enforce our Terms, this Privacy Policy, the Acceptable Use Policy, the Copyright/DMCA Policy, and other agreements.",
                "To comply with law, legal process, sanctions, export controls, court orders, regulatory requests, and lawful government requests.",
                "To protect the rights, property, safety, security, and integrity of Perceptron, users, rights holders, source websites, the public, and third parties.",
                "To send service notices, security alerts, administrative messages, marketing communications, newsletters, product updates, and event information where permitted by law.",
                "To evaluate or complete a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, or similar corporate transaction.",
              ]} />
            </Section>
          </div>

          {/* 6. Broad Service Improvement, AI Training, and Research Rights */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="training" title="6. Broad Service Improvement, AI Training, and Research Rights">
              <P>
                Subject to applicable law and any separate written agreement signed by Perceptron, we may use
                Customer Content, Public Source Content, Output, prompts, instructions, annotations, metadata,
                logs, feedback, interactions, and derived information to develop, train, fine-tune, test, evaluate,
                benchmark, monitor, debug, protect, and improve Perceptron Technology and related services.
              </P>
              <P>
                This may include using information to improve dataset sourcing, object detection, segmentation,
                tracking, labeling, OCR, captioning, ranking, deduplication, filtering, quality assurance, safety,
                rights-management workflows, and other AI or data-processing systems.
              </P>
              <P>
                We may retain and use generalized learnings, model weights, embeddings, statistics, error patterns,
                quality metrics, evaluations, safety signals, usage patterns, and other derived or de-identified
                information, even after specific Customer Content is deleted, to the extent permitted by law and our
                agreements.
              </P>
              <P>
                Unless a separate written agreement states otherwise, you should not provide sensitive, regulated,
                confidential, proprietary, or restricted information to the Services if you do not want it
                processed for the purposes described in this Privacy Policy.
              </P>
              <P>
                Perceptron does not claim ownership of your Customer Content solely because we process it. However,
                you grant us the rights necessary to process it as described in this Privacy Policy, the Terms, and
                any applicable agreement.
              </P>
            </Section>
          </div>

          {/* 7. Cookies and Similar Technologies */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="cookies" title="7. Cookies and Similar Technologies">
              <P>
                We may use cookies, pixels, local storage, SDKs, analytics tools, and similar technologies to
                operate the Services, maintain sessions, remember preferences, secure accounts, measure
                performance, understand usage, improve features, prevent abuse, and support marketing.
              </P>
              <P>
                You may be able to control cookies through browser settings, device settings, or cookie banners
                where available. Blocking cookies may affect Service functionality.
              </P>
              <P>
                Some analytics or advertising technologies may be considered a "sale," "sharing," or "targeted
                advertising" under certain privacy laws. Where required, we will provide legally required choices.
              </P>
            </Section>
          </div>

          {/* 8. How We Disclose Information */}
          <div style={{ paddingTop: "48px" }}>
            <Section id="disclose" title="8. How We Disclose Information">
              <P>We may disclose information in the following circumstances:</P>
              <BulletList items={[
                "To service providers, subprocessors, contractors, consultants, cloud providers, hosting providers, security providers, analytics providers, payment processors, customer support tools, AI/model providers, and other vendors who process information for us or help operate the Services.",
                "To affiliates and corporate group companies for business, operational, security, support, analytics, and improvement purposes.",
                "To workspace owners, administrators, collaborators, team members, and authorized users according to workspace settings and permissions.",
                "To third-party integrations, platforms, storage providers, repositories, APIs, or applications that you connect to or instruct us to use.",
                "To rights holders, complainants, users, affected parties, or legal representatives when we process copyright, privacy, safety, abuse, or legal requests, including forwarding notices and counter-notices where appropriate.",
                "To law enforcement, regulators, courts, public authorities, or other third parties where we believe disclosure is required or appropriate to comply with law, enforce agreements, protect rights, prevent harm, or respond to legal process.",
                "In connection with a merger, acquisition, financing, reorganization, bankruptcy, due diligence, sale of assets, or similar transaction.",
                "With your consent or at your direction.",
                "As aggregated, anonymized, de-identified, statistical, or derived information that does not reasonably identify you, for any lawful business purpose.",
              ]} />
            </Section>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
