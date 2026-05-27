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
  { id: "acceptance",      label: "Acceptance of Terms" },
  { id: "services",        label: "The Services" },
  { id: "definitions",     label: "Definitions" },
  { id: "accounts",        label: "Accounts, Authority, and Security" },
  { id: "access",          label: "Limited Right to Access" },
  { id: "customer-content",label: "Customer Content" },
  { id: "training-rights", label: "Broad Service Improvement" },
  { id: "public-source",   label: "Public Internet Dataset Creation" },
  { id: "outputs",         label: "Outputs and Datasets" },
  { id: "ai-quality",      label: "AI Output Accuracy" },
  { id: "prohibited",      label: "Prohibited Conduct" },
  { id: "high-risk",       label: "High-Risk and Regulated Uses" },
  { id: "privacy-data",    label: "Privacy and Personal Data" },
  { id: "third-party",     label: "Third-Party Services" },
  { id: "apis",            label: "APIs, Rate Limits" },
  { id: "fees",            label: "Fees and Billing" },
  { id: "beta",            label: "Beta and Preview Features" },
  { id: "copyright",       label: "Copyright Takedowns" },
  { id: "opt-out",         label: "Public Source Opt-Out" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "security",        label: "Security and Backups" },
  { id: "termination",     label: "Suspension and Termination" },
  { id: "data-retention",  label: "Data Retention" },
  { id: "feedback",        label: "Feedback" },
  { id: "disclaimers",     label: "Disclaimers" },
  { id: "liability",       label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "release",         label: "Release" },
  { id: "dispute",         label: "Dispute Resolution" },
  { id: "governing-law",   label: "Governing Law" },
  { id: "changes",         label: "Changes to These Terms" },
  { id: "miscellaneous",   label: "Miscellaneous" },
  { id: "contact",         label: "Contact" },
]

const ALL_SECTION_IDS = TOC_ITEMS.map((t) => t.id)

// ── Paragraph style ───────────────────────────────────────────────────────────
const pStyle: React.CSSProperties = {
  fontSize: "15px",
  color: MUTED,
  lineHeight: 1.75,
  margin: "0 0 16px",
}

// ── Helper components ─────────────────────────────────────────────────────────
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

function SubItem({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        marginBottom: "14px",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "12px",
          color: FG,
          flexShrink: 0,
          minWidth: "18px",
          lineHeight: 1.75,
          paddingTop: "1px",
        }}
      >
        ({label})
      </span>
      <span
        style={{
          fontSize: "15px",
          color: MUTED,
          lineHeight: 1.75,
        }}
      >
        {children}
      </span>
    </div>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
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

function AddressBlock({ lines }: { lines: string[] }) {
  return (
    <div
      style={{
        background: BG2,
        border: `1px solid ${LINE_STR}`,
        borderRadius: "8px",
        padding: "16px 20px",
        margin: "12px 0 16px",
      }}
    >
      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: MONO,
            fontSize: "13px",
            color: MUTED,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [scrollY, setScrollY]   = useState(0)
  const [activeId, setActiveId] = useState<string>(TOC_ITEMS[0].id)
  const isMobile                = useIsMobile()
  const observerRef             = useRef<IntersectionObserver | null>(null)

  // Track scrollY for Navigation + active TOC
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
        entries.forEach((e) => { ratio[e.target.id] = e.intersectionRatio })
        const best = ALL_SECTION_IDS.reduce((a, b) =>
          (ratio[a] ?? 0) >= (ratio[b] ?? 0) ? a : b
        )
        if (ratio[best] > 0) setActiveId(best)
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    )

    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <main style={{ background: PANEL, color: FG }}>
      <Navigation scrollY={scrollY} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
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
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 45%, transparent 68%)",
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
            Terms and Conditions
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
            Perceptron AI Labs Inc. | perceptronai.org | Auta
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
            Last updated: May 13, 2026
          </p>
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
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
        {/* ── Sticky TOC (desktop only) ──────────────────────────────────── */}
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
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {TOC_ITEMS.map((item, i) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
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
                          fontSize: "9px",
                          color: isActive ? GREEN : FAINT,
                          flexShrink: 0,
                          minWidth: "16px",
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

        {/* ── Main content ───────────────────────────────────────────────── */}
        <article style={{ minWidth: 0 }}>

          {/* ── Intro block ─────────────────────────────────────────────── */}
          <div
            style={{
              paddingBottom: "40px",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            {/* Important notice box */}
            <div
              style={{
                background: BG2,
                border: `1px solid ${LINE_STR}`,
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: GREEN,
                  margin: "0 0 10px",
                }}
              >
                Important Notice
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: FG,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                These Terms contain broad licenses allowing Perceptron to use content, prompts, outputs, datasets,
                metadata, and usage information to provide, protect, develop, train, evaluate, improve, and
                commercialize the Services, subject to applicable law and any written enterprise agreement signed
                by Perceptron.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: FG,
                  lineHeight: 1.7,
                  margin: "10px 0 0",
                }}
              >
                These Terms also contain important disclaimers, limits of liability, indemnity obligations,
                dispute-resolution terms, and rules for public internet dataset creation. Please read them
                carefully before using the Services.
              </p>
            </div>

            <p style={pStyle}>
              These Terms and Conditions (the &ldquo;Terms&rdquo;) govern access to and use of the websites,
              applications, APIs, software, models, annotation tools, dataset generation tools, demos,
              documentation, beta features, and related products or services made available by Perceptron AI
              Labs Inc. (&ldquo;Perceptron,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
              including perceptronai.org, Auta, Perceptron APIs, and related services (collectively, the
              &ldquo;Services&rdquo;).
            </p>
            <p style={pStyle}>
              By accessing or using the Services, creating an account, submitting a prompt, uploading content,
              requesting public-source dataset creation, downloading an export, using an API key, or clicking to
              accept these Terms, you agree to these Terms. If you use the Services on behalf of a company,
              organization, or other legal entity, you represent that you have authority to bind that entity,
              and &ldquo;you&rdquo; refers to that entity.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              If you do not agree to these Terms, do not access or use the Services.
            </p>
          </div>

          {/* ── 1. Acceptance of Terms ──────────────────────────────────── */}
          <Section id="acceptance" title="1. Acceptance of Terms">
            <SubItem label="a">
              You may use the Services only if you can form a binding contract with Perceptron and are not
              barred from using the Services under applicable law.
            </SubItem>
            <SubItem label="b">
              If you access the Services as an employee, contractor, agent, or representative of an entity,
              you agree that you have authority to bind that entity to these Terms.
            </SubItem>
            <SubItem label="c">
              Additional terms may apply to particular Services, paid plans, enterprise orders, beta programs,
              APIs, integrations, or features. If there is a conflict between these Terms and a signed written
              agreement with Perceptron, the signed written agreement controls only for the conflicting subject
              matter and only for the applicable account or Service.
            </SubItem>
          </Section>

          {/* ── 2. The Services ─────────────────────────────────────────── */}
          <Section id="services" title="2. The Services">
            <p style={pStyle}>
              Perceptron develops AI systems for computer vision, multimodal AI, dataset creation, data
              annotation, workflow automation, model development, and related research and developer tools. The
              Services may allow users to upload images, videos, zip files, prompts, labels, metadata, schemas,
              URLs, and other materials; create annotation tasks using natural language; generate bounding
              boxes, segmentation masks, polygons, labels, captions, OCR outputs, structured outputs, video
              tracking data, and other AI-assisted results; request sourcing of images or other materials from
              public internet sources; organize, annotate, transform, review, export, and use datasets; and
              access hosted APIs, SDKs, model endpoints, demos, documentation, integrations, and developer
              tools.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              The Services may change at any time. We may add, remove, limit, suspend, discontinue, replace, or
              modify any feature, model, workflow, dataset capability, export format, integration, or API at
              our discretion. We are not obligated to maintain any particular feature, model version, data
              source, export format, benchmark result, pricing structure, or availability level unless
              expressly stated in a signed written agreement.
            </p>
          </Section>

          {/* ── 3. Definitions ──────────────────────────────────────────── */}
          <Section id="definitions" title="3. Definitions">
            <BulletList
              items={[
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Customer Content&rdquo; means</strong>{" "}content, data, files, prompts, instructions, images, videos, audio, text, URLs, labels, categories, metadata, annotations, schemas, code, comments, credentials, configuration, and other materials that you or your authorized users submit, upload, transmit, provide, import, connect, or otherwise make available to the Services.</>,
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Public Source Content&rdquo; means</strong>{" "}third-party content that is publicly accessible or publicly discoverable, including images, videos, thumbnails, webpages, captions, filenames, metadata, search results, repository materials, public datasets, open-source resources, and other materials obtained from public websites, search engines, indexes, repositories, APIs, or third-party services.</>,
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Input&rdquo; means</strong>{" "}Customer Content, Public Source Content requested or selected by you, prompts, settings, labels, schemas, URLs, and other materials provided to or processed by the Services.</>,
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Output&rdquo; means</strong>{" "}annotations, labels, masks, bounding boxes, polygons, captions, OCR results, structured data, model responses, dataset exports, generated metadata, source references, transformations, recommendations, synthetic or AI-generated materials, and other results generated by or through the Services.</>,
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Dataset&rdquo; means</strong>{" "}a collection of Customer Content, Public Source Content, Output, annotations, labels, source references, metadata, exports, manifests, formats, or related files.</>,
                <><strong style={{ color: FG, fontWeight: 600 }}>&ldquo;Perceptron Technology&rdquo; means</strong>{" "}the Services and all software, models, APIs, SDKs, tools, user interfaces, workflows, prompts, systems, datasets created by Perceptron, infrastructure, documentation, algorithms, know-how, designs, trademarks, trade secrets, and technology owned, developed, used, or licensed by Perceptron.</>,
              ]}
            />
          </Section>

          {/* ── 4. Accounts, Authority, and Security ────────────────────── */}
          <Section id="accounts" title="4. Accounts, Authority, and Security">
            <SubItem label="a">
              You must provide accurate account, billing, organization, and contact information and keep it
              current.
            </SubItem>
            <SubItem label="b">
              You are responsible for maintaining the confidentiality of usernames, passwords, API keys,
              tokens, credentials, and access links. You are responsible for all activity under your account,
              including activity by employees, contractors, agents, collaborators, invitees, or anyone using
              your credentials.
            </SubItem>
            <SubItem label="c">
              You must promptly notify us at support@perceptronai.org if you believe your account, credentials,
              data, projects, or API keys have been compromised.
            </SubItem>
            <SubItem label="d">
              We may require identity, authority, security, payment, or compliance verification before
              providing or continuing access to some Services.
            </SubItem>
          </Section>

          {/* ── 5. Limited Right to Access the Services ─────────────────── */}
          <Section id="access" title="5. Limited Right to Access the Services">
            <p style={pStyle}>
              Subject to these Terms and any applicable plan, documentation, order form, usage limit, or
              written agreement, Perceptron grants you a limited, revocable, non-exclusive, non-transferable,
              non-sublicensable right to access and use the Services during the applicable subscription, trial,
              beta, or evaluation period for your internal business, research, development, educational, or
              evaluation purposes.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Except as expressly permitted by these Terms or a signed written agreement, you may not sell,
              resell, sublicense, rent, lease, provide service-bureau access to, distribute, copy, modify,
              reverse engineer, interfere with, or misuse the Services or Perceptron Technology.
            </p>
          </Section>

          {/* ── 6. Customer Content and User Responsibility ──────────────── */}
          <Section id="customer-content" title="6. Customer Content and User Responsibility">
            <SubItem label="a">
              As between you and Perceptron, you retain whatever ownership rights you have in Customer
              Content. Perceptron does not claim ownership of Customer Content solely because you submit it to
              the Services.
            </SubItem>
            <SubItem label="b">
              You are solely responsible for Customer Content, your prompts and instructions, your source
              requests, your Datasets, your use of Output, your downstream models, your products, your
              deployments, and all decisions based on the Services.
            </SubItem>
            <SubItem label="c">
              You represent and warrant that you have all rights, licenses, permissions, consents, notices,
              lawful bases, and authority necessary to submit, upload, import, connect, process, annotate,
              transform, generate, export, download, use, distribute, and commercialize Customer Content,
              Public Source Content requested by you, Datasets, and Output in the manner you use them.
            </SubItem>
            <SubItem label="d">
              You further represent and warrant that Customer Content, your instructions, your source
              requests, your Datasets, your Output, and your use of the Services will not infringe,
              misappropriate, or violate any copyright, trademark, trade secret, patent, privacy, publicity,
              contractual, confidentiality, moral, database, data protection, consumer protection, export
              control, sanctions, or other right or law.
            </SubItem>
            <SubItem label="e">
              You must maintain your own backup copies of Customer Content, Datasets, Output, source
              manifests, annotations, export files, model artifacts, and other materials. We are not
              responsible for data loss, corrupted files, failed exports, deleted projects, unavailable
              sources, model errors, or loss of access except to the extent liability cannot be excluded by
              law.
            </SubItem>
          </Section>

          {/* ── 7. Broad Service Improvement, Model Training, and Commercialization Rights ── */}
          <Section id="training-rights" title="7. Broad Service Improvement, Model Training, and Commercialization Rights">
            <p style={pStyle}>
              This Section 7 is intended to provide Perceptron with broad rights to operate, protect, develop,
              train, evaluate, improve, and commercialize the Services and Perceptron Technology. If you need
              narrower data-use terms, those terms must be stated in a signed written enterprise agreement with
              Perceptron.
            </p>
            <SubItem label="a">
              <strong style={{ color: FG, fontWeight: 600 }}>Content license to Perceptron.</strong>{" "}To the
              maximum extent permitted by law, you grant Perceptron and its affiliates a worldwide,
              non-exclusive, perpetual, irrevocable, transferable, sublicensable, royalty-free, fully paid-up
              license to host, access, store, cache, reproduce, copy, import, ingest, parse, index, tag, label,
              annotate, review, moderate, display, perform, transmit, distribute internally, disclose to
              service providers, process, analyze, modify, adapt, translate, transform, tokenize, embed,
              vectorize, summarize, generate, augment, synthesize, create derivative works from, and otherwise
              use Customer Content, Public Source Content requested or selected by you, Inputs, Outputs,
              Datasets, prompts, instructions, labels, schemas, metadata, usage data, telemetry, logs, error
              reports, evaluations, and feedback for the purposes described in these Terms.
            </SubItem>
            <SubItem label="b">
              <strong style={{ color: FG, fontWeight: 600 }}>Service operation and support.</strong>{" "}The
              license in this Section includes use to provide, host, operate, deliver, debug, troubleshoot,
              maintain, secure, monitor, moderate, enforce, support, meter, bill for, and document the
              Services; to communicate with you; to prevent fraud, abuse, security incidents, and policy
              violations; and to comply with law, court orders, legal process, and rights-holder requests.
            </SubItem>
            <SubItem label="c">
              <strong style={{ color: FG, fontWeight: 600 }}>Improvement, training, and evaluation.</strong>{" "}Unless
              Perceptron has expressly agreed otherwise in a signed written agreement, the license in this
              Section includes use to develop, train, pre-train, fine-tune, distill, adapt, evaluate,
              benchmark, test, validate, improve, and commercialize AI models, computer-vision systems,
              multimodal systems, annotation systems, dataset creation systems, safety systems, classifiers,
              filters, evaluation sets, synthetic data systems, retrieval systems, embeddings, feature
              extractors, workflow planners, prompts, agents, APIs, documentation, and other Perceptron
              Technology.
            </SubItem>
            <SubItem label="d">
              <strong style={{ color: FG, fontWeight: 600 }}>Derived improvements belong to Perceptron.</strong>{" "}Perceptron
              owns all Perceptron Technology and all generalized learnings, model weights, parameters,
              embeddings, evaluations, benchmarks, statistics, feature representations, system improvements,
              safety improvements, workflows, templates, techniques, ideas, know-how, and other derivative or
              learned improvements created, discovered, or improved through use of the Services, even if those
              improvements are informed by or derived from Customer Content, Public Source Content, Inputs,
              Outputs, Datasets, metadata, usage data, telemetry, or feedback. You do not acquire rights in
              Perceptron Technology by using the Services.
            </SubItem>
            <SubItem label="e">
              <strong style={{ color: FG, fontWeight: 600 }}>No compensation or attribution.</strong>{" "}Perceptron
              may exercise the rights in this Section without compensation, royalties, credits, attribution,
              approval, audit rights, accounting, or notice to you, except where required by applicable law or
              a signed written agreement.
            </SubItem>
            <SubItem label="f">
              <strong style={{ color: FG, fontWeight: 600 }}>Sublicensing and service providers.</strong>{" "}Perceptron
              may sublicense or disclose materials covered by this Section to affiliates, contractors,
              subprocessors, service providers, infrastructure providers, model providers, analytics providers,
              security vendors, professional advisers, and other third parties who support, provide, protect,
              develop, evaluate, train, improve, or commercialize the Services, subject to confidentiality,
              security, or contractual controls that Perceptron determines are appropriate.
            </SubItem>
            <SubItem label="g">
              <strong style={{ color: FG, fontWeight: 600 }}>Survival.</strong>{" "}The rights granted in this
              Section survive account closure, project deletion, dataset deletion, subscription expiration, and
              termination of these Terms to the extent materials have been incorporated into backups, logs,
              aggregated or de-identified information, evaluations, derived data, model training data, model
              weights, safety systems, service improvements, compliance records, or other Perceptron
              Technology, except where deletion is required by applicable law or a signed written agreement.
            </SubItem>
            <SubItem label="h">
              <strong style={{ color: FG, fontWeight: 600 }}>Moral rights and similar rights.</strong>{" "}To the
              maximum extent permitted by law, you waive and agree not to assert any moral rights, rights of
              attribution, rights of integrity, neighboring rights, database rights, or similar rights that
              would prevent Perceptron from exercising the rights granted in this Section. If waiver is not
              permitted, you agree not to enforce such rights against Perceptron or its permitted users.
            </SubItem>
            <SubItem label="i">
              <strong style={{ color: FG, fontWeight: 600 }}>Enterprise opt-out.</strong>{" "}Perceptron may
              offer paid enterprise plans or written agreements with different training or improvement terms.
              Any opt-out, restriction, deletion right, or data-use limitation applies only if expressly
              accepted by Perceptron in a signed written agreement or made available through an official
              Perceptron control that we identify as applicable to your account.
            </SubItem>
          </Section>

          {/* ── 8. Public Internet Dataset Creation and Public Source Content ── */}
          <Section id="public-source" title="8. Public Internet Dataset Creation and Public Source Content">
            <p style={pStyle}>
              Some Services may allow you to request that Auta or other Perceptron tools source images, videos,
              metadata, or other materials from publicly accessible internet sources or third-party
              repositories, then annotate, organize, transform, and export those materials as Datasets.
            </p>
            <SubItem label="a">
              <strong style={{ color: FG, fontWeight: 600 }}>User-directed sourcing.</strong>{" "}When you
              request a public-source Dataset, you select or control the prompt, concept, topic, labels,
              volume, intended use, export format, review process, and downstream use. You acknowledge that
              Perceptron acts as a technical tool provider and automated processor of your request, not as a
              rights-clearance service, legal adviser, publisher, editor, sponsor, or endorser of Public Source
              Content.
            </SubItem>
            <SubItem label="b">
              <strong style={{ color: FG, fontWeight: 600 }}>Public does not mean free to use.</strong>{" "}Public
              Source Content may be protected by copyright, trademark, privacy, publicity, contract, license,
              database, moral rights, or other rights. Public accessibility, indexing, availability in search
              results, or lack of visible copyright notice does not mean the content is free to copy, annotate,
              train on, redistribute, publish, commercialize, or use in a product.
            </SubItem>
            <SubItem label="c">
              <strong style={{ color: FG, fontWeight: 600 }}>No rights clearance.</strong>{" "}Unless expressly
              stated in a signed written agreement, Perceptron does not verify ownership, authorship, license
              status, consent, privacy status, attribution requirements, source terms, model training rights,
              commercial-use rights, redistribution rights, or export rights for Public Source Content.
              Perceptron does not grant you any third-party rights in Public Source Content.
            </SubItem>
            <SubItem label="d">
              <strong style={{ color: FG, fontWeight: 600 }}>User assumes risk.</strong>{" "}You are solely
              responsible for determining whether you may lawfully request, collect, copy, annotate, modify,
              store, download, train on, publish, distribute, commercialize, or otherwise use any Public Source
              Content, Dataset, or Output. You assume all risks arising from Public Source Content, including
              infringement claims, privacy claims, publicity claims, source-term violations, takedown demands,
              licensing disputes, attribution failures, and downstream model or product claims.
            </SubItem>
            <SubItem label="e">
              <strong style={{ color: FG, fontWeight: 600 }}>License information may be incomplete.</strong>{" "}The
              Services may attempt to provide source URLs, source domains, captions, filenames, license
              signals, attribution information, or provenance metadata when technically available. Such
              information may be missing, inaccurate, stale, ambiguous, incomplete, or insufficient for your
              intended use. You are responsible for independent review and rights clearance.
            </SubItem>
            <SubItem label="f">
              <strong style={{ color: FG, fontWeight: 600 }}>Source restrictions.</strong>{" "}You may not use
              the Services to bypass paywalls, login walls, authentication, access controls, robots exclusions,
              rate limits, technical protection measures, contractual restrictions, source terms, or other
              source restrictions. You may not instruct the Services to collect or use content in a way that
              violates law, source terms, or third-party rights.
            </SubItem>
            <SubItem label="g">
              <strong style={{ color: FG, fontWeight: 600 }}>No duty to monitor.</strong>{" "}Perceptron may use
              filters, blocklists, robots signals, metadata checks, or other safeguards, but we do not
              undertake a duty to monitor, review, verify, approve, preserve, license, or remove all Public
              Source Content. We may remove, disable, restrict, filter, or refuse content, sources, domains,
              topics, categories, prompts, or exports at any time and for any reason.
            </SubItem>
            <SubItem label="h">
              <strong style={{ color: FG, fontWeight: 600 }}>Takedowns and removals.</strong>{" "}Public Source
              Content, Datasets, or Outputs may be removed, disabled, blocked, restricted, or made unavailable
              due to rights-holder requests, privacy requests, source restrictions, legal demands, court
              orders, platform policies, technical limitations, or our discretion. We are not responsible for
              recalling, modifying, or deleting Datasets or Outputs already exported, downloaded, copied,
              published, trained on, or controlled by you or third parties.
            </SubItem>
            <SubItem label="i">
              <strong style={{ color: FG, fontWeight: 600 }}>Commercial and training use.</strong>{" "}Before
              using Public Source Content or Datasets for commercial model training, product development,
              publication, redistribution, customer delivery, regulated use, or production deployment, you must
              verify and document that you have all required rights, licenses, permissions, consents, notices,
              lawful bases, and attributions. Perceptron does not warrant that public-source Datasets are
              suitable for any such use.
            </SubItem>
            <SubItem label="j">
              <strong style={{ color: FG, fontWeight: 600 }}>Your indemnity applies.</strong>{" "}Your
              indemnification obligations in Section 27 apply to Public Source Content, public-source Dataset
              requests, source terms, licensing disputes, privacy disputes, attribution disputes, and any use
              or distribution of Datasets or Outputs containing or derived from Public Source Content.
            </SubItem>
          </Section>

          {/* ── 9. Outputs, Datasets, and Ownership Allocation ──────────── */}
          <Section id="outputs" title="9. Outputs, Datasets, and Ownership Allocation">
            <SubItem label="a">
              Subject to these Terms, and as between you and Perceptron, you may use Output generated
              specifically for you to the extent permitted by applicable law, your plan, and third-party
              rights. Perceptron assigns to you any rights Perceptron may have in such Output only to the
              extent necessary for your permitted use and only after you have paid all applicable fees.
            </SubItem>
            <SubItem label="b">
              Perceptron retains ownership of Perceptron Technology. Third-party owners retain their rights in
              Public Source Content and third-party materials. Your rights in annotations, labels, metadata, or
              transformations do not eliminate or override rights in underlying third-party content.
            </SubItem>
            <SubItem label="c">
              Output may not be unique. Similar or identical Output may be generated for other users, and
              Perceptron may independently develop or provide similar ideas, labels, workflows, Datasets,
              annotations, or outputs.
            </SubItem>
            <SubItem label="d">
              You may not represent that any Output or Dataset is human-reviewed, legally cleared, bias-free,
              safe, accurate, complete, or suitable for a particular use unless you have independently verified
              that representation.
            </SubItem>
          </Section>

          {/* ── 10. AI Output Accuracy, Quality Control, and Human Review ── */}
          <Section id="ai-quality" title="10. AI Output Accuracy, Quality Control, and Human Review">
            <p style={pStyle}>
              The Services use artificial intelligence, automation, models, heuristics, and third-party
              systems. Output may be inaccurate, incomplete, mislabeled, biased, unsafe, offensive,
              non-compliant, or unsuitable for your use case.
            </p>
            <SubItem label="a">
              You are solely responsible for human review, validation, testing, quality assurance,
              benchmarking, documentation, rights review, privacy review, safety review, and compliance review
              before using any Dataset or Output for research, training, testing, validation, publication,
              product development, customer delivery, regulated use, or production deployment.
            </SubItem>
            <SubItem label="b">
              You must not rely on Output as the sole basis for decisions affecting safety, legal rights,
              employment, housing, credit, education, healthcare, insurance, law enforcement, immigration,
              access to essential services, or other high-impact matters.
            </SubItem>
            <SubItem label="c">
              The Services are not a substitute for legal, medical, safety, financial, compliance,
              professional, engineering, scientific, or domain-expert review.
            </SubItem>
          </Section>

          {/* ── 11. Prohibited Conduct and Acceptable Use ───────────────── */}
          <Section id="prohibited" title="11. Prohibited Conduct and Acceptable Use">
            <p style={pStyle}>
              You may not, and may not assist or permit anyone else to:
            </p>
            <BulletList
              items={[
                "(1) violate law, regulations, contracts, licenses, source terms, court orders, sanctions, export controls, or third-party rights;",
                "(2) upload, request, generate, distribute, or use infringing, unlawful, deceptive, defamatory, harassing, hateful, exploitative, abusive, harmful, or unsafe content;",
                "(3) collect, process, identify, track, profile, or infer sensitive information about individuals without a lawful basis and required notices or consents;",
                "(4) request datasets involving minors, private individuals, biometric identification, face recognition, surveillance, sensitive traits, or vulnerable groups except where lawful and expressly permitted;",
                "(5) use the Services for malware, phishing, spam, fraud, impersonation, credential theft, evasion, circumvention, or harmful automation;",
                "(6) bypass or interfere with security controls, rate limits, access controls, paywalls, login walls, robots exclusions, source restrictions, usage limits, billing systems, or technical protection measures;",
                "(7) reverse engineer, decompile, disassemble, scrape, crawl, benchmark for competitive purposes, extract, copy, or attempt to derive source code, model weights, system prompts, non-public data, or underlying components of the Services;",
                "(8) use the Services to build, train, improve, or benchmark a competing product or service unless expressly permitted in a signed written agreement;",
                "(9) remove, obscure, or falsify source URLs, attribution, license notices, copyright notices, provenance metadata, or safety warnings;",
                "(10) redistribute, publish, commercialize, or train on Datasets containing Public Source Content unless you have verified all required rights and lawful bases;",
                "(11) overload, disrupt, damage, probe, scan, or test the vulnerability of the Services or third-party systems without authorization;",
                "(12) use disposable, false, misleading, or unauthorized account or billing information; or",
                "(13) misrepresent Output, Datasets, or the Services as legally cleared, professionally certified, human-generated, or approved by Perceptron or a third party when they are not.",
              ]}
            />
          </Section>

          {/* ── 12. High-Risk and Regulated Uses ────────────────────────── */}
          <Section id="high-risk" title="12. High-Risk and Regulated Uses">
            <p style={pStyle}>
              Unless expressly authorized in a signed written agreement and implemented with appropriate
              independent review, testing, documentation, and compliance controls, you may not use the
              Services, Datasets, or Output for high-risk, safety-critical, regulated, or rights-impacting
              uses. Examples include:
            </p>
            <BulletList
              items={[
                "(1) autonomous vehicle control, robotics control, industrial control, aviation, weapons systems, critical infrastructure, or other safety-critical systems;",
                "(2) medical diagnosis, medical treatment, clinical decision support, medical-device use, or health-related predictions;",
                "(3) biometric identification, face recognition, person tracking, surveillance, or profiling of individuals;",
                "(4) employment, credit, education, housing, insurance, criminal justice, immigration, public benefits, or eligibility decisions;",
                "(5) law enforcement, intelligence, military, national-security, or border-control uses;",
                "(6) datasets targeting children, private individuals, protected classes, sensitive traits, or vulnerable groups;",
                "(7) systems designed to deceive, manipulate, exploit, harass, discriminate against, or harm people; or",
                "(8) any use requiring regulatory approval, safety certification, human-subjects approval, or rights-clearance review that you have not obtained.",
              ]}
            />
          </Section>

          {/* ── 13. Privacy, Personal Data, and Sensitive Data ──────────── */}
          <Section id="privacy-data" title="13. Privacy, Personal Data, and Sensitive Data">
            <SubItem label="a">
              You are responsible for determining whether Customer Content, Public Source Content, Inputs,
              Outputs, or Datasets include personal data, biometric data, face images, health data,
              children&apos;s data, precise location data, confidential information, government identifiers,
              financial information, or other regulated or sensitive information.
            </SubItem>
            <SubItem label="b">
              You must not upload, request, collect, process, annotate, export, train on, or otherwise use
              personal data or sensitive data through the Services unless you have all required rights,
              notices, consents, lawful bases, data-processing arrangements, security controls, and compliance
              documentation.
            </SubItem>
            <SubItem label="c">
              Unless expressly agreed in a signed written agreement, the Services are not intended to process
              protected health information, payment card data, government identification documents,
              children&apos;s data, biometric templates, sensitive personal information, or other highly
              regulated data.
            </SubItem>
            <SubItem label="d">
              For personal data in Customer Content, you are responsible for determining whether you are a
              controller, processor, business, service provider, or other regulated role under applicable
              privacy law. Where required, you must enter into a Data Processing Addendum, Business Associate
              Agreement, or similar agreement before using the Services with regulated data.
            </SubItem>
            <SubItem label="e">
              Subject to applicable law and our Privacy Policy, Perceptron may process account, usage,
              telemetry, security, support, billing, log, and improvement data as an independent controller or
              business for purposes such as service operation, security, fraud prevention, analytics, product
              development, model evaluation, and legal compliance.
            </SubItem>
          </Section>

          {/* ── 14. Third-Party Services, Open Source, and External Sources ── */}
          <Section id="third-party" title="14. Third-Party Services, Open Source, and External Sources">
            <p style={pStyle}>
              The Services may rely on or integrate with third-party services, cloud providers, storage
              providers, model providers, search providers, web sources, APIs, repositories, open-source
              software, datasets, analytics providers, billing providers, and other vendors. Third-party
              services and materials are governed by their own terms, licenses, privacy policies, and
              availability. Perceptron is not responsible for third-party services, Public Source Content,
              third-party licenses, third-party outages, source changes, model-provider changes, or
              third-party claims.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Open-source software included in or used with the Services is licensed under the applicable
              open-source license. Nothing in these Terms limits rights you may have under applicable
              open-source licenses, but you are responsible for complying with any attribution, notice,
              copyleft, source-availability, patent, redistribution, and modification requirements that apply
              to your use or distribution.
            </p>
          </Section>

          {/* ── 15. APIs, Rate Limits, and Developer Credentials ────────── */}
          <Section id="apis" title="15. APIs, Rate Limits, and Developer Credentials">
            <SubItem label="a">
              If you use APIs, SDKs, model endpoints, developer tools, integrations, or command-line tools,
              you must comply with our documentation, authentication requirements, rate limits, usage limits,
              safety requirements, and security requirements.
            </SubItem>
            <SubItem label="b">
              You must keep API keys and credentials secure, rotate compromised keys, avoid embedding keys in
              public repositories or client-side code, and promptly report unauthorized access.
            </SubItem>
            <SubItem label="c">
              We may throttle, suspend, revoke, rotate, or limit API access to protect the Services, users,
              third-party systems, source websites, or Perceptron.
            </SubItem>
          </Section>

          {/* ── 16. Fees, Trials, Billing, and Taxes ────────────────────── */}
          <Section id="fees" title="16. Fees, Trials, Billing, and Taxes">
            <SubItem label="a">
              Some Services may be free, paid, subscription-based, usage-based, metered, trial, beta, or
              subject to a separate order form. You agree to pay all fees, overages, taxes, and charges
              associated with your plan, usage, or order.
            </SubItem>
            <SubItem label="b">
              Unless expressly stated in a signed written agreement, all fees are non-refundable, payable in
              U.S. dollars, and exclusive of taxes. You are responsible for applicable taxes, duties, levies,
              and similar governmental assessments.
            </SubItem>
            <SubItem label="c">
              We may suspend or terminate access for non-payment, failed payment, chargebacks, excessive
              usage, suspected fraud, billing disputes, or violation of these Terms.
            </SubItem>
          </Section>

          {/* ── 17. Beta, Preview, and Experimental Features ────────────── */}
          <Section id="beta" title="17. Beta, Preview, and Experimental Features">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Features labeled alpha, beta, preview, experimental, research, early access, demo, or evaluation
              may be unstable, inaccurate, incomplete, unavailable, insecure, unsupported, or changed without
              notice. Beta features are provided for evaluation only and should not be used in production,
              safety-critical, regulated, commercial, or customer-facing deployments unless expressly
              authorized in a signed written agreement. Perceptron may terminate beta access at any time.
            </p>
          </Section>

          {/* ── 18. Copyright Notices, Takedowns, and Repeat Infringers ─── */}
          <Section id="copyright" title="18. Copyright Notices, Takedowns, and Repeat Infringers">
            <p style={pStyle}>
              We respect intellectual property rights and may remove or disable access to material alleged to
              infringe copyrights or other rights. If you believe material available through the Services
              infringes your rights, send a notice to:
            </p>
            <AddressBlock
              lines={[
                "Copyright Agent, Perceptron AI Labs Inc.",
                "Email: support@perceptronai.org",
                "Address: [Insert registered mailing address before publication]",
              ]}
            />
            <p style={pStyle}>
              Your notice should include enough information for us to locate the material, including source
              URLs, project IDs, dataset IDs, screenshots, or other identifiers; identification of the work
              or right allegedly infringed; your contact information; a statement that you have a good-faith
              belief the disputed use is not authorized by the rights owner, its agent, or the law; a
              statement that the information in the notice is accurate and that you are authorized to act; and
              your physical or electronic signature.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              We may remove, disable, restrict, block, or preserve material in response to notices,
              counter-notices, legal process, rights-holder requests, privacy requests, source restrictions,
              or our policies. We may terminate accounts of repeat infringers or users who repeatedly submit
              unlawful or rights-violating material. To preserve potential DMCA safe-harbor protections where
              available, Perceptron should publish current designated-agent information and maintain any
              required registration with the U.S. Copyright Office or other applicable authority.
            </p>
          </Section>

          {/* ── 19. Public Source Opt-Out and Removal Requests ──────────── */}
          <Section id="opt-out" title="19. Public Source Opt-Out and Removal Requests">
            <p style={pStyle}>
              Rights holders, website owners, creators, or authorized representatives may request that
              Perceptron remove specific material from active Services or exclude specific domains, URLs,
              works, or content from future public-source collection where technically feasible. Send requests
              to support@perceptronai.org with information sufficient to identify the content or source and
              verify your authority.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              We do not guarantee removal from Datasets, Outputs, model artifacts, exports, caches, backups,
              logs, or copies already downloaded, exported, published, trained on, or controlled by users or
              third parties. We may decline or limit requests that are incomplete, unverifiable, abusive,
              technically infeasible, legally unsupported, or inconsistent with our obligations.
            </p>
          </Section>

          {/* ── 20. Confidentiality ──────────────────────────────────────── */}
          <Section id="confidentiality" title="20. Confidentiality">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              If either party receives non-public information from the other that is marked confidential or
              should reasonably be understood as confidential, the receiving party will use reasonable care to
              protect it and will use it only for purposes related to the Services. Confidentiality
              obligations do not apply to information that is public through no fault of the receiving party,
              already known without restriction, independently developed, or lawfully received from a third
              party. Public Source Content and information made public by you are not confidential.
            </p>
          </Section>

          {/* ── 21. Security, Availability, and Backups ─────────────────── */}
          <Section id="security" title="21. Security, Availability, and Backups">
            <SubItem label="a">
              We use reasonable administrative, technical, and organizational measures designed to protect the
              Services, but no system is perfectly secure. We do not guarantee that the Services, Customer
              Content, Datasets, Output, or third-party integrations will be secure, error-free,
              uninterrupted, or free from unauthorized access.
            </SubItem>
            <SubItem label="b">
              You are responsible for securing accounts, credentials, systems, prompts, Datasets, exports,
              models, and downstream environments. You should not rely on the Services as your only storage,
              backup, provenance, compliance, or archival system.
            </SubItem>
            <SubItem label="c">
              The Services may be unavailable due to maintenance, errors, outages, attacks, third-party
              failures, source restrictions, capacity limits, rate limits, legal requirements, or other
              reasons. We are not liable for unavailability, delay, degraded performance, failed jobs, failed
              exports, or data loss except to the extent liability cannot be excluded by law.
            </SubItem>
          </Section>

          {/* ── 22. Suspension and Termination ──────────────────────────── */}
          <Section id="termination" title="22. Suspension and Termination">
            <p style={pStyle}>
              We may suspend, restrict, or terminate your access to the Services, accounts, projects,
              Datasets, APIs, exports, or features at any time if we believe that: you violated these Terms;
              your use creates legal, security, privacy, safety, rights, operational, reputational, or
              financial risk; your account is compromised; you failed to pay fees; your use exceeds limits;
              continued service is prohibited or impractical; a source, rights holder, regulator, court, or
              third party requests or requires action; or suspension is necessary to protect Perceptron,
              users, sources, or the public.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              You may stop using the Services at any time. Termination does not relieve you of payment
              obligations, indemnity obligations, liability for prior acts, or obligations that by their
              nature should survive. Sections concerning rights, ownership, improvement rights, public source
              content, disclaimers, limitations of liability, indemnification, dispute resolution,
              confidentiality, and miscellaneous terms survive termination.
            </p>
          </Section>

          {/* ── 23. Data Retention and Deletion ─────────────────────────── */}
          <Section id="data-retention" title="23. Data Retention and Deletion">
            <p style={pStyle}>
              We may retain Customer Content, Public Source Content, Inputs, Outputs, Datasets, logs, account
              information, billing records, usage data, telemetry, metadata, security records, and support
              records as needed to provide, protect, improve, train, evaluate, and support the Services;
              comply with law; resolve disputes; enforce agreements; prevent abuse; maintain backups; and
              exercise rights granted under these Terms.
            </p>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Deletion requests will be handled according to our Privacy Policy, applicable law, technical
              limitations, retention schedules, and any signed written agreement. We may be unable to delete
              materials that have been exported, downloaded, shared, published, cached, backed up, logged,
              incorporated into derived data, used for model training or evaluation, or controlled by users or
              third parties, except where required by applicable law.
            </p>
          </Section>

          {/* ── 24. Feedback and Product Suggestions ────────────────────── */}
          <Section id="feedback" title="24. Feedback and Product Suggestions">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              If you provide comments, ideas, suggestions, bug reports, requests, benchmarking results,
              product feedback, or other feedback, you grant Perceptron a perpetual, worldwide, irrevocable,
              transferable, sublicensable, royalty-free, fully paid-up right to use, copy, disclose, modify,
              commercialize, and exploit that feedback without restriction, attribution, approval, or
              compensation. Perceptron may use feedback to develop, improve, train, evaluate, market, and
              commercialize the Services and Perceptron Technology.
            </p>
          </Section>

          {/* ── 25. Disclaimers ──────────────────────────────────────────── */}
          <Section id="disclaimers" title="25. Disclaimers">
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES, PERCEPTRON TECHNOLOGY, PUBLIC SOURCE
              CONTENT, DATASETS, OUTPUT, APIs, MODELS, SOFTWARE, DOCUMENTATION, BETA FEATURES, THIRD-PARTY
              INTEGRATIONS, AND ALL RELATED MATERIALS ARE PROVIDED &ldquo;AS IS,&rdquo; &ldquo;AS
              AVAILABLE,&rdquo; AND &ldquo;WITH ALL FAULTS.&rdquo;
            </p>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERCEPTRON DISCLAIMS ALL WARRANTIES, REPRESENTATIONS,
              CONDITIONS, AND GUARANTEES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET
              ENJOYMENT, ACCURACY, RELIABILITY, AVAILABILITY, SECURITY, WORKMANLIKE PERFORMANCE, COURSE OF
              DEALING, AND COURSE OF TRADE.
            </p>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              WITHOUT LIMITING THE FOREGOING, PERCEPTRON DOES NOT WARRANT THAT:
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                "(1) the Services will meet your requirements or be uninterrupted, secure, available, timely, accurate, complete, or error-free;",
                "(2) Output, annotations, labels, masks, detections, captions, OCR, metadata, source references, or exports will be accurate, complete, reliable, safe, unbiased, lawful, or suitable;",
                "(3) Public Source Content is owned by any particular party, licensed for your use, cleared for model training, cleared for commercial use, free of personal data, free of sensitive data, non-infringing, or available for redistribution;",
                "(4) source URLs, provenance data, license metadata, attribution information, or source terms are complete, accurate, current, or sufficient;",
                "(5) Datasets will be suitable for training, testing, validation, publication, regulatory submissions, customer delivery, commercial deployment, or production use;",
                "(6) the Services will detect, prevent, or remove all infringing, unlawful, private, sensitive, harmful, biased, unsafe, or low-quality content;",
                "(7) defects will be corrected or any particular model, feature, export format, integration, source, or performance level will remain available; or",
                "(8) using the Services will cause you to comply with any law, license, contract, standard, policy, or third-party requirement.",
              ].map((item, i) => (
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
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: FAINT,
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: MUTED,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── 26. Limitation of Liability ─────────────────────────────── */}
          <Section id="liability" title="26. Limitation of Liability">
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERCEPTRON AND ITS AFFILIATES, OFFICERS, DIRECTORS,
              EMPLOYEES, CONTRACTORS, LICENSORS, SUPPLIERS, SERVICE PROVIDERS, AND AGENTS WILL NOT BE LIABLE
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, PUNITIVE, ENHANCED, OR
              MULTIPLE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, GOODWILL, BUSINESS, OPPORTUNITY, DATA,
              DATASETS, OUTPUT, MODELS, USE, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES.
            </p>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERCEPTRON WILL NOT BE LIABLE FOR CLAIMS ARISING FROM
              OR RELATING TO PUBLIC SOURCE CONTENT, CUSTOMER CONTENT, OUTPUT, DATASETS, THIRD-PARTY RIGHTS,
              LICENSE DISPUTES, PRIVACY DISPUTES, ATTRIBUTION DISPUTES, SOURCE TERMS, TAKEDOWNS, MODEL
              TRAINING, MODEL PERFORMANCE, DOWNSTREAM PRODUCTS, USER PROMPTS, USER INSTRUCTIONS, USER
              EXPORTS, FAILED JOBS, FAILED ANNOTATIONS, FAILED DATASET GENERATION, INACCURATE LABELS,
              INACCURATE OUTPUT, BETA FEATURES, THIRD-PARTY SERVICES, SECURITY INCIDENTS, DATA LOSS, OR YOUR
              FAILURE TO OBTAIN RIGHTS, CONSENTS, APPROVALS, OR HUMAN REVIEW.
            </p>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERCEPTRON&apos;S TOTAL AGGREGATE LIABILITY FOR ALL
              CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES WILL NOT EXCEED THE GREATER
              OF: (A) THE AMOUNT YOU PAID TO PERCEPTRON FOR THE SERVICE GIVING RISE TO THE CLAIM DURING THE
              THREE MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY; OR (B) USD $100.
            </p>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              The limitations in this Section apply to all theories of liability, including contract, tort,
              negligence, strict liability, warranty, statute, equity, and any other legal theory, even if a
              limited remedy fails of its essential purpose. Some jurisdictions do not allow certain
              limitations, so some limitations may not apply to you, but they apply to the maximum extent
              permitted by law.
            </p>
          </Section>

          {/* ── 27. Indemnification ───────────────────────────────────────── */}
          <Section id="indemnification" title="27. Indemnification">
            <p style={pStyle}>
              To the maximum extent permitted by law, you will defend, indemnify, and hold harmless Perceptron
              and its affiliates, officers, directors, employees, contractors, licensors, suppliers, service
              providers, and agents from and against all claims, demands, actions, proceedings, damages,
              losses, liabilities, settlements, judgments, fines, penalties, costs, and expenses, including
              reasonable attorneys&apos; fees, arising out of or related to:
            </p>
            <BulletList
              items={[
                "(1) Customer Content, Public Source Content requested, selected, provided, downloaded, exported, used, or distributed by you, Inputs, Outputs, Datasets, prompts, instructions, labels, schemas, metadata, or source requests;",
                "(2) your use, publication, distribution, commercialization, training, deployment, or other exploitation of Datasets, Output, Public Source Content, Customer Content, or downstream models or products;",
                "(3) actual or alleged infringement, misappropriation, or violation of copyright, trademark, patent, trade secret, privacy, publicity, moral rights, database rights, contractual rights, confidentiality obligations, data-protection rights, source terms, or other rights;",
                "(4) your failure to obtain rights, licenses, permissions, notices, consents, lawful bases, approvals, human review, safety review, privacy review, or compliance review;",
                "(5) your violation of these Terms, documentation, policies, law, regulation, court order, sanctions, export controls, or third-party terms;",
                "(6) your use of the Services in high-risk, regulated, safety-critical, unlawful, or prohibited contexts;",
                "(7) activity under your account, API keys, credentials, projects, or organization; or",
                "(8) a dispute between you and any user, employee, contractor, customer, rights holder, data subject, regulator, source website, or third party.",
              ]}
            />
            <p style={{ ...pStyle, marginBottom: 0 }}>
              Perceptron may control the defense and settlement of any matter subject to indemnification. You
              agree to cooperate with Perceptron and not settle any claim in a way that admits fault, imposes
              obligations, or restricts rights of Perceptron without our prior written consent.
            </p>
          </Section>

          {/* ── 28. Release ──────────────────────────────────────────────── */}
          <Section id="release" title="28. Release">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              To the maximum extent permitted by law, you release Perceptron and its affiliates, officers,
              directors, employees, contractors, licensors, suppliers, service providers, and agents from
              claims, demands, liabilities, damages, losses, and expenses arising from or related to disputes
              between you and any third party, including rights holders, data subjects, source websites,
              customers, users, collaborators, model providers, and downstream recipients. If you are a
              California resident, you waive California Civil Code Section 1542 and any similar law, which
              says that a general release does not extend to claims the creditor or releasing party does not
              know or suspect to exist in their favor at the time of executing the release and that, if known,
              would have materially affected the settlement with the debtor or released party.
            </p>
          </Section>

          {/* ── 29. Dispute Resolution, Arbitration, and Class Action Waiver ── */}
          <Section id="dispute" title="29. Dispute Resolution, Arbitration, and Class Action Waiver">
            <SubItem label="a">
              <strong style={{ color: FG, fontWeight: 600 }}>Informal resolution.</strong>{" "}Before filing a
              claim, you agree to first contact Perceptron at support@perceptronai.org and attempt to resolve
              the dispute informally. If the dispute is not resolved within 30 days after notice, either party
              may proceed as permitted below.
            </SubItem>
            <SubItem label="b">
              <strong style={{ color: FG, fontWeight: 600 }}>Arbitration.</strong>{" "}Where permitted by
              applicable law, any dispute, claim, or controversy arising out of or relating to these Terms or
              the Services will be resolved by binding individual arbitration rather than in court. The
              arbitration will be conducted in English by a mutually agreed arbitration provider, or if the
              parties cannot agree, by the American Arbitration Association under its applicable rules. The
              arbitrator may award only relief that a court of competent jurisdiction could award and only to
              the individual party seeking relief.
            </SubItem>
            <SubItem label="c">
              <strong style={{ color: FG, fontWeight: 600 }}>Class action waiver.</strong>{" "}To the maximum
              extent permitted by law, you and Perceptron agree that each may bring claims only in an
              individual capacity and not as a plaintiff, class member, representative, private attorney
              general, or participant in any class, collective, consolidated, mass, or representative
              proceeding.
            </SubItem>
            <SubItem label="d">
              <strong style={{ color: FG, fontWeight: 600 }}>Exceptions.</strong>{" "}Either party may seek
              injunctive or equitable relief in court for actual or threatened misuse of intellectual
              property, confidential information, security credentials, or the Services. Either party may also
              bring qualifying claims in small claims court.
            </SubItem>
            <SubItem label="e">
              <strong style={{ color: FG, fontWeight: 600 }}>Severability.</strong>{" "}If the arbitration or
              class action waiver provisions are found unenforceable for a particular claim or request for
              relief, that claim or request may proceed in court, but only after all arbitrable claims are
              resolved, unless applicable law requires otherwise.
            </SubItem>
          </Section>

          {/* ── 30. Governing Law and Venue ──────────────────────────────── */}
          <Section id="governing-law" title="30. Governing Law and Venue">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              These Terms are governed by the laws identified in the applicable signed order form or
              enterprise agreement. If no governing law is identified, these Terms are governed by the laws of
              the State of Delaware, United States, excluding conflict-of-law rules. Subject to Section 29,
              the exclusive venue for disputes will be the state and federal courts located in Delaware,
              United States, unless applicable law requires otherwise. You and Perceptron consent to personal
              jurisdiction and venue in those courts.
            </p>
          </Section>

          {/* ── 31. Changes to These Terms ───────────────────────────────── */}
          <Section id="changes" title="31. Changes to These Terms">
            <p style={{ ...pStyle, marginBottom: 0 }}>
              We may update these Terms from time to time. Updated Terms will be posted on our website or
              made available through the Services with a revised &ldquo;Last updated&rdquo; date. If changes
              are material, we may provide additional notice, such as email or in-product notice, at our
              discretion. Your continued use of the Services after updated Terms become effective means you
              accept the updated Terms. If you do not agree to updated Terms, you must stop using the
              Services.
            </p>
          </Section>

          {/* ── 32. Miscellaneous ─────────────────────────────────────────── */}
          <Section id="miscellaneous" title="32. Miscellaneous">
            <SubItem label="a">
              <strong style={{ color: FG, fontWeight: 600 }}>Entire agreement.</strong>{" "}These Terms,
              together with any applicable Privacy Policy, order form, Data Processing Addendum, Acceptable
              Use Policy, documentation, plan terms, and additional terms incorporated by reference, form the
              entire agreement between you and Perceptron regarding the Services.
            </SubItem>
            <SubItem label="b">
              <strong style={{ color: FG, fontWeight: 600 }}>Assignment.</strong>{" "}You may not assign or
              transfer these Terms without Perceptron&apos;s prior written consent. Perceptron may assign or
              transfer these Terms, in whole or in part, without restriction, including in connection with a
              merger, acquisition, financing, reorganization, sale of assets, change of control, or by
              operation of law.
            </SubItem>
            <SubItem label="c">
              <strong style={{ color: FG, fontWeight: 600 }}>Severability.</strong>{" "}If any provision is
              found unenforceable, the remaining provisions remain in effect, and the unenforceable provision
              will be modified to the minimum extent necessary to make it enforceable or replaced with an
              enforceable provision that most closely reflects the parties&apos; intent.
            </SubItem>
            <SubItem label="d">
              <strong style={{ color: FG, fontWeight: 600 }}>No waiver.</strong>{" "}A failure or delay in
              enforcing a provision is not a waiver. A waiver must be in writing and signed by Perceptron.
            </SubItem>
            <SubItem label="e">
              <strong style={{ color: FG, fontWeight: 600 }}>Force majeure.</strong>{" "}Perceptron will not be
              liable for delays, failures, outages, or losses caused by events beyond our reasonable control,
              including acts of God, natural disasters, war, terrorism, labor disputes, internet or
              infrastructure failures, power failures, cyberattacks, third-party service failures, legal
              restrictions, source restrictions, government actions, or supply shortages.
            </SubItem>
            <SubItem label="f">
              <strong style={{ color: FG, fontWeight: 600 }}>Notices.</strong>{" "}We may provide notices by
              email, in-product message, website posting, account notice, or other reasonable means. Notices
              to Perceptron must be sent to support@perceptronai.org and any legal notice address we
              designate.
            </SubItem>
            <SubItem label="g">
              <strong style={{ color: FG, fontWeight: 600 }}>No third-party beneficiaries.</strong>{" "}These
              Terms do not create any third-party beneficiary rights except for Perceptron affiliates and
              indemnified parties, who may enforce provisions intended to benefit them.
            </SubItem>
          </Section>

          {/* ── 33. Contact ───────────────────────────────────────────────── */}
          <Section id="contact" title="33. Contact" isLast>
            <AddressBlock
              lines={[
                "Perceptron AI Labs Inc.",
                "Email: support@perceptronai.org",
                "Website: perceptronai.org",
                "Legal mailing address: [Insert registered mailing address before publication]",
              ]}
            />
          </Section>

        </article>
      </div>

      <Footer />
    </main>
  )
}
