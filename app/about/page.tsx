"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import { Brain, Zap, Users, Linkedin, ChevronLeft, ChevronRight, Lightbulb, Code2, Rocket } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 280 : -280, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -280 : 280, opacity: 0 }),
}

const leaderAccents = ["#2178C7", "#C26FCF", "#53C5E6", "#F1B646"]

const roadmapStages = [
  {
    icon: Lightbulb,
    title: "Problem Discovery",
    date: "Q4 2025",
    current: false,
    future: false,
    points: [
      "Found annotation bottleneck during a CV project",
      "Existing tools too slow, manual and not scalable",
      "Defined need for conversational annotation",
    ],
  },
  {
    icon: Code2,
    title: "Development",
    date: "Q1 2026",
    current: false,
    future: false,
    points: [
      "Built AI-powered annotation platform",
      "Automated project, task and dataset creation",
      "Designed end-to-end Auto Dataset creation workflow",
    ],
  },
  {
    icon: Rocket,
    title: "Deployment",
    date: "Q2 2026 — Now",
    current: true,
    future: false,
    points: [
      "Deployed platform on cloud infrastructure",
      "Onboarding early users and pilot customers",
      "Enabled scalable dataset processing",
    ],
  },
  {
    icon: Brain,
    title: "Self-Learning System",
    date: "Q3 2026+",
    current: false,
    future: true,
    points: [
      "Learning from user corrections and usage patterns",
      "Continuous improvement in labeling accuracy",
      "Adaptive annotation across domains",
    ],
  },
]

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" })

  const [leaderIdx, setLeaderIdx] = useState(0)
  const [slideDir, setSlideDir] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextLeader = useCallback(() => {
    setSlideDir(1)
    setLeaderIdx(prev => (prev + 1) % 4)
  }, [])

  const prevLeader = useCallback(() => {
    setSlideDir(-1)
    setLeaderIdx(prev => (prev - 1 + 4) % 4)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextLeader, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextLeader])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "Pushing the boundaries of AI research with cutting-edge techniques and novel approaches.",
    },
    {
      icon: Zap,
      title: "Intelligence",
      description: "Creating systems that understand, learn, and adapt to complex real-world challenges.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with partners to transform vision into reality through intelligent solutions.",
    },
  ]

  const team = [
    { name: "Rohan Mainali", role: "Chief Executive Officer", expertise: "Strategic Leadership &\nCorporate Governance", image: "/images/team/rohan-mainali.jpg", socials: { linkedin: "https://www.linkedin.com/in/rohanmainali/"} },
    { name: "Neha Aryal", role: "Chief Marketing Officer", expertise: "Marketing Strategy &\nBusiness Growth", image: "/images/team/neha-aryal.jpg", socials: { linkedin: "https://www.linkedin.com/in/nehaaryal/"} },
    { name: "Soyam Shrestha", role: "Chief Technology Officer", expertise: "Technology Strategy &\nEngineering Leadership", image: "/images/team/soyam-shrestha.jpg", socials: { linkedin: "https://www.linkedin.com/in/soyam-shrestha-bb1350296/" } },
    { name: "Manas Mudbari", role: "Chief Operating Officer", expertise: "Operations Management &\nProcess Optimization", image: "/images/team/manas-mudbari.png", socials: { linkedin: "https://www.linkedin.com/in/manasmudbari/"} },
    { name: "Bibek Shrestha", role: "Lead Engineer", expertise: "Building Scalable Infrastructure", image: "/images/team/bibek-shrestha.jpg" },
    { name: "Pratik Awal", role: "Lead Researcher", expertise: "Research & Algorithmic Innovation", image: "/images/team/pratik-awal.jpg" },
    { name: "Samikchhya Maharjan", role: "Market Research", expertise: "Market Analysis, User Research", image: "/images/team/samikchhya-maharjan.jpg" },
    { name: "Aayushman Shrestha", role: "Data Scientist", expertise: "Data Annotation, Analysis", image: "/images/team/aayushman-shrestha.jpg" },
    { name: "Puspa Kutu", role: "Data Analyst", expertise: "Data Visualization, Reporting", image: "/images/team/puspa-kutu.jpg" },
    { name: "Priyokti Manandhar", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/priyokti-manandhar.jpg" },
    { name: "Swornika Rajbhandari", role: "QA Engineer", expertise: "Manual Testing, Automation", image: "/images/team/swornika-rajbhandari.jpg" },
    { name: "Nischal Bhattarai", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/nischal-bhattarai.jpg" },
    { name: "Rakesh Shrestha", role: "Data Engineer", expertise: "Data Pipeline Development, ETL", image: "/images/team/rakesh-shrestha.jpg" },
    { name: "Samichha Shrestha", role: "Full Stack Developer", expertise: "MERN Stack", image: "/images/team/samichha-shrestha.jpg" },
    { name: "Suyog Maharjan", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/suyog-maharjan.jpg" },
    { name: "Sahajid Rahaman", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/sahajid-rahaman.jpg" },
    { name: "Abhay Shrestha", role: "QA Engineer", expertise: "Test Cases & Manual Testing", image: "/images/team/abhay-shrestha.jpg" },
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "Perceptron established with a vision to advance AI research" },
    { year: "2021", title: "First Project", description: "Completed groundbreaking MMA Vision analysis system" },
    { year: "2022", title: "Expansion", description: "Grew team and expanded service offerings" },
    { year: "2024", title: "Innovation", description: "Launched CLIP Fine-tuning Suite and Pose Estimation Engine" },
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />

      <PageHero
        title="About Perceptron"
        subtitle="We are a team of AI researchers and engineers dedicated to building the next generation of intelligent systems that solve real-world problems."
        badge="Our Story"
      />

      {/* Mission Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Our Purpose
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="cosmic-heading-gradient">
                  Our Mission
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                At Perceptron, we believe that artificial intelligence has the power to transform industries and improve
                lives. Our mission is to develop cutting-edge AI solutions that are not only technically advanced but
                also practical and impactful.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We focus on three core areas: computer vision, natural language processing, and multimodal AI systems.
                Through rigorous research and development, we create tools and services that help organizations harness
                the power of AI.
              </p>
              <motion.div
                className="mt-6 h-[1px] rounded-full"
                style={{ background: "linear-gradient(90deg, #53C5E6, #C26FCF, transparent)" }}
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </motion.div>
            <motion.div
              className="relative h-96 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              {/* Subtle grid background */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, #2178C7 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Outer orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-72 h-72 rounded-full border border-dashed border-[#53C5E6]/15" />
                  {/* Orbiting dot 1 */}
                  <motion.div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#53C5E6] shadow-[0_0_12px_rgba(83,197,230,0.5)]" />
                </motion.div>
              </div>

              {/* Middle orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-48 h-48 rounded-full border border-[#C26FCF]/12" />
                  {/* Orbiting dot 2 */}
                  <motion.div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#C26FCF] shadow-[0_0_10px_rgba(194,111,207,0.5)]" />
                </motion.div>
              </div>

              {/* Inner orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-28 h-28 rounded-full border border-[#2178C7]/15" />
                  <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2178C7] shadow-[0_0_8px_rgba(33,120,199,0.5)]" />
                </motion.div>
              </div>

              {/* Center brain icon with pulsing glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Glow backdrop */}
                  <motion.div
                    className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#53C5E6]/20 to-[#C26FCF]/15 blur-xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2178C7] to-[#53C5E6] flex items-center justify-center shadow-lg shadow-[#2178C7]/25">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Floating keyword cards */}
              <motion.div
                className="absolute top-8 right-8 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#53C5E6]" />
                  <span className="text-xs font-medium text-slate-600">Computer Vision</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-12 left-6 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C26FCF]" />
                  <span className="text-xs font-medium text-slate-600">Multimodal AI</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-12 left-8 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2178C7]" />
                  <span className="text-xs font-medium text-slate-600">NLP</span>
                </div>
              </motion.div>

              {/* Corner gradient accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#53C5E6]/8 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#C26FCF]/8 to-transparent rounded-tr-full" />
            </motion.div>
          </div>
        </div>
      </section>

  {/* Team Section */}
<section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
  <div className="absolute inset-0 light-mesh pointer-events-none" />
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block text-sm font-medium tracking-widest uppercase text-[#53C5E6] mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        The People
      </motion.span>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="cosmic-heading-gradient">
          Meet Our Team
        </span>
      </h2>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
        Talented researchers and engineers working together to advance AI
      </p>
      <motion.div
        className="mt-6 mx-auto h-[1px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
        initial={{ width: 0 }}
        whileInView={{ width: 120 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>

    {/* Leadership Carousel */}
    <motion.div
      className="mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <motion.p
        className="text-xs uppercase tracking-[0.25em] text-[#C26FCF] font-semibold mb-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        Leadership
      </motion.p>

      <div
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation arrows */}
        <button
          onClick={prevLeader}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-14 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg flex items-center justify-center text-slate-400 hover:text-[#2178C7] hover:border-[#2178C7]/30 hover:shadow-xl transition-all duration-300"
          aria-label="Previous leader"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextLeader}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-14 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg flex items-center justify-center text-slate-400 hover:text-[#2178C7] hover:border-[#2178C7]/30 hover:shadow-xl transition-all duration-300"
          aria-label="Next leader"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <AnimatePresence mode="wait" custom={slideDir}>
            {(() => {
              const member = team[leaderIdx]
              const accent = leaderAccents[leaderIdx]
              return (
                <motion.div
                  key={leaderIdx}
                  custom={slideDir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid md:grid-cols-2"
                >
                  {/* Photo */}
                  <div className="relative h-72 md:h-[420px] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="w-12 h-[3px] rounded-full mb-6" style={{ background: accent }} />
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{member.name}</h3>
                    <p className="text-base font-semibold mb-4" style={{ color: accent }}>{member.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line mb-6">{member.expertise}</p>
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#2178C7] hover:bg-slate-50 hover:border-[#2178C7]/30 transition-all duration-300 text-sm"
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>

        {/* Dot indicators with names */}
        <div className="flex justify-center gap-6 mt-8">
          {team.slice(0, 4).map((member, idx) => (
            <button
              key={member.name}
              onClick={() => {
                setSlideDir(idx > leaderIdx ? 1 : -1)
                setLeaderIdx(idx)
              }}
              className="group relative flex flex-col items-center gap-2 outline-none"
              aria-label={`View ${member.name}`}
            >
              {/* Thumbnail */}
              <div
                className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  idx === leaderIdx
                    ? "shadow-lg scale-110"
                    : "border-slate-200 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
                style={idx === leaderIdx ? { borderColor: leaderAccents[idx] } : {}}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <span
                className={`text-[11px] font-medium transition-all duration-300 ${
                  idx === leaderIdx ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {member.name.split(" ")[0]}
              </span>
              {/* Active indicator bar */}
              <div
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  idx === leaderIdx ? "w-full" : "w-0"
                }`}
                style={{ background: leaderAccents[idx] }}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Divider */}
    {/* <motion.div
      className="mx-auto h-px max-w-xs mb-20"
      style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    /> */}

    {/* Rest of the team */}
    {/* <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <motion.p
        className="text-xs uppercase tracking-[0.25em] text-[#F1B646] font-semibold mb-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        Engineering &amp; Research
      </motion.p>
      <motion.div
        ref={teamRef}
        className="flex flex-wrap justify-center gap-x-6 gap-y-10"
        variants={containerVariants}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
      >
        {team.slice(4).map((member, index) => {
          const chipColors = ["#53C5E6", "#C26FCF", "#F1B646", "#2178C7"]
          const chipColor = chipColors[index % chipColors.length]
          return (
            <motion.div
              key={member.name}
              className="group text-center w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-19.2px)]"
              variants={cardVariants}
            >
              <div className="relative mx-auto mb-4 w-28 h-28">
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `conic-gradient(from 0deg, ${chipColor}40, transparent, ${chipColor}40)` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-transparent transition-colors duration-300 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="112px"
                  />
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2178C7] transition-colors duration-300 mb-1">
                {member.name}
              </h3>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium mb-1.5"
                style={{ background: `${chipColor}12`, color: chipColor }}
              >
                {member.role}
              </span>
              <p className="text-slate-500 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                {member.expertise}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div> */}
  </div>
</section>

      {/* Values Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-slate-50 text-slate-900">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C26FCF]/15 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block text-sm font-medium tracking-widest uppercase text-[#C26FCF] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              What Drives Us
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">
                Our Core Values
              </span>
            </h2>
            <motion.div
              className="mt-4 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #C26FCF, #53C5E6, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            ref={valuesRef}
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative w-14 h-14 mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-[#53C5E6]/5 border border-[#53C5E6]/15"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <value.icon className="w-7 h-7 text-[#53C5E6]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#2178C7] transition-colors duration-300">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  <motion.div
                    className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #53C5E640, transparent)" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

  {/* Roadmap Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 light-mesh pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F1B646]/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block text-sm font-medium tracking-widest uppercase text-[#F1B646] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">Roadmap</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              From identifying the problem to building AI that evolves — here&apos;s where we&apos;ve been and where we&apos;re going.
            </p>
            <motion.div
              className="mt-6 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #F1B646, #53C5E6, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Background connector line */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-slate-100" />
            {/* Animated progress line — up to node 3 (current) */}
            <motion.div
              className="absolute top-7 left-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, #2178C7, #53C5E6)" }}
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />

            <div className="grid grid-cols-4 gap-6">
              {roadmapStages.map((stage, index) => (
                <motion.div
                  key={stage.title}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  {/* Timeline node */}
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
                    stage.future
                      ? "bg-white border-2 border-dashed border-slate-200"
                      : stage.current
                        ? "bg-gradient-to-br from-[#2178C7] to-[#53C5E6] shadow-lg shadow-[#2178C7]/30"
                        : "bg-white border-2 border-[#2178C7]/25 shadow-md"
                  }`}>
                    {stage.current && (
                      <motion.div
                        className="absolute -inset-2 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(33,120,199,0.2), transparent)" }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <stage.icon className={`w-6 h-6 ${
                      stage.future ? "text-slate-300" : stage.current ? "text-white" : "text-[#2178C7]"
                    }`} />
                  </div>

                  {/* Date label */}
                  <span className={`text-[11px] font-semibold tracking-wider uppercase mb-5 ${
                    stage.future ? "text-slate-300" : stage.current ? "text-[#2178C7]" : "text-slate-400"
                  }`}>
                    {stage.date}
                  </span>

                  {/* Card */}
                  <motion.div
                    className={`relative w-full flex-1 rounded-2xl p-5 ${
                      stage.future
                        ? "border border-dashed border-slate-200 bg-slate-50/60"
                        : stage.current
                          ? "border border-[#2178C7]/20 bg-white shadow-2xl shadow-[#2178C7]/6 ring-1 ring-[#2178C7]/10"
                          : "border border-slate-200 bg-white shadow-lg"
                    }`}
                    whileHover={!stage.future ? { y: -5, transition: { duration: 0.25 } } : {}}
                  >
                    {stage.current && (
                      <motion.div
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-white text-[10px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap"
                        style={{ background: "linear-gradient(135deg, #2178C7, #53C5E6)" }}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                      >
                        Current Stage
                      </motion.div>
                    )}
                    <h3 className={`text-sm font-bold mb-3.5 ${
                      stage.future ? "text-slate-400" : "text-slate-900"
                    }`}>
                      {stage.title}
                    </h3>
                    <ul className="space-y-2">
                      {stage.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <div className={`w-[5px] h-[5px] rounded-full mt-[6px] flex-shrink-0 ${
                            stage.future ? "bg-slate-300" : stage.current ? "bg-[#2178C7]" : "bg-[#53C5E6]"
                          }`} />
                          <span className={`text-xs leading-relaxed ${
                            stage.future ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden relative space-y-5">
            <div className="absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-[#2178C7]/50 via-[#53C5E6]/30 to-slate-200" />
            {roadmapStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                  stage.future
                    ? "bg-white border-2 border-dashed border-slate-200"
                    : stage.current
                      ? "bg-gradient-to-br from-[#2178C7] to-[#53C5E6] shadow-lg"
                      : "bg-white border-2 border-[#2178C7]/25 shadow-md"
                }`}>
                  <stage.icon className={`w-6 h-6 ${
                    stage.future ? "text-slate-300" : stage.current ? "text-white" : "text-[#2178C7]"
                  }`} />
                </div>

                <div className={`flex-grow rounded-2xl border p-5 ${
                  stage.current
                    ? "border-[#2178C7]/20 bg-white shadow-xl ring-1 ring-[#2178C7]/10"
                    : stage.future
                      ? "border-dashed border-slate-200 bg-slate-50/60"
                      : "border-slate-200 bg-white shadow-md"
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className={`text-sm font-bold ${stage.future ? "text-slate-400" : "text-slate-900"}`}>
                      {stage.title}
                    </h3>
                    {stage.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold whitespace-nowrap" style={{ background: "linear-gradient(135deg, #2178C7, #53C5E6)" }}>
                        Now
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] font-semibold tracking-wider uppercase mb-3 ${
                    stage.future ? "text-slate-300" : stage.current ? "text-[#2178C7]" : "text-slate-400"
                  }`}>
                    {stage.date}
                  </p>
                  <ul className="space-y-1.5">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <div className={`w-[5px] h-[5px] rounded-full mt-[6px] flex-shrink-0 ${
                          stage.future ? "bg-slate-300" : "bg-[#53C5E6]"
                        }`} />
                        <span className={`text-xs leading-relaxed ${
                          stage.future ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
