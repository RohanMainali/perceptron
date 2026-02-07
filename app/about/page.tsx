"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import { Brain, Zap, Users, Rocket, Linkedin, Twitter } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" })

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
              className="relative h-96 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#53C5E6]/5 to-[#C26FCF]/5 overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-40 h-40 rounded-full border border-[#53C5E6]/10" />
                </motion.div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-24 h-24 text-[#53C5E6]/20" />
                </motion.div>
              </div>
            </motion.div>
          </div>
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
                <div className="cosmic-card relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-400 h-full">
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

    {/* Leadership Spotlight */}
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
      <div className="grid md:grid-cols-3 gap-8">
        {team.slice(0, 3).map((member, index) => {
          const accentColors = ["#2178C7", "#C26FCF", "#53C5E6"]
          const accent = accentColors[index]
          return (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Outer glow on hover */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-700"
                style={{ background: accent }}
              />

              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                {/* Photo area */}
                <div className="relative h-[340px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Colored accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />
                </div>

                {/* Info panel below photo */}
                <div className="relative bg-white px-6 py-5">
                  {/* Subtle top highlight */}
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}25, transparent)` }} />

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{member.name}</h3>
                      <p className="text-sm font-medium mb-2" style={{ color: accent }}>{member.role}</p>
                      <p className="text-slate-500 text-xs leading-relaxed whitespace-pre-line">{member.expertise}</p>
                    </div>

                    {/* Social icons — always visible, right-aligned */}
                    <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#2178C7] hover:bg-slate-50 hover:border-[#2178C7]/30 transition-all duration-300"
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                      {/* {member.socials?.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#53C5E6] hover:bg-slate-50 hover:border-[#53C5E6]/30 transition-all duration-300"
                        >
                          <Twitter size={14} />
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>

    {/* Divider */}
    <motion.div
      className="mx-auto h-px max-w-xs mb-20"
      style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />

    {/* Rest of the team */}
    <motion.div
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
        {team.slice(3).map((member, index) => {
          const chipColors = ["#53C5E6", "#C26FCF", "#F1B646", "#2178C7"]
          const chipColor = chipColors[index % chipColors.length]
          return (
            <motion.div
              key={member.name}
              className="group text-center w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-19.2px)]"
              variants={cardVariants}
            >
              {/* Circular avatar */}
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
              {/* Name */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2178C7] transition-colors duration-300 mb-1">
                {member.name}
              </h3>
              {/* Role badge */}
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium mb-1.5"
                style={{ background: `${chipColor}12`, color: chipColor }}
              >
                {member.role}
              </span>
              {/* Expertise — revealed on hover */}
              <p className="text-slate-500 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                {member.expertise}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  </div>
</section>

  {/* Timeline Section */}
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
              className="inline-block text-sm font-medium tracking-widest uppercase text-[#F1B646] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Milestones
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">
                Our Journey
              </span>
            </h2>
            <motion.div
              className="mt-4 mx-auto h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #F1B646, #53C5E6, transparent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="space-y-8 relative">
            {/* Vertical line */}
            <div className="absolute left-[47px] top-4 bottom-4 w-px bg-gradient-to-b from-[#53C5E6]/30 via-[#C26FCF]/20 to-transparent hidden md:block" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="group relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-24 relative">
                    <motion.div
                      className="text-3xl font-bold cosmic-heading-gradient"
                      whileInView={{ scale: [0.8, 1] }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                  <div className="flex-grow cosmic-card p-6 rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#2178C7] transition-colors duration-300">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
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
