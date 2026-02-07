"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import PageHero from "@/components/page-hero"
import { Brain, Zap, Users, Rocket } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
    { name: "Rohan Mainali", role: "Chief Executive Officer", expertise: "Strategic Leadership &\nCorporate Governance", image: "/images/team/rohan-mainali.jpg" },
    { name: "Neha Aryal", role: "Chief Marketing Officer", expertise: "Marketing Strategy &\nBusiness Growth", image: "/images/team/neha-aryal.jpg" },
    { name: "Soyam Shrestha", role: "Chief Technology Officer", expertise: "Technology Strategy &\nEngineering Leadership", image: "/images/team/soyam-shrestha.jpg" },
    { name: "Bibek Shrestha", role: "Lead Engineer", expertise: "Platform Engineering &\nScalable Infrastructure", image: "/images/team/bibek-shrestha.jpg" },
    { name: "Pratik Awal", role: "Lead Researcher", expertise: "Applied Research &\nAlgorithmic Innovation", image: "/images/team/pratik-awal.jpg" },
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
    { name: "Abhay Shrestha", role: "QA Engineer", expertise: "Test Case Development, Manual Testing", image: "/images/team/abhay-shrestha.jpg" },
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

    {/* Team grid */}
    <motion.div
      ref={teamRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={teamInView ? "visible" : "hidden"}
    >
      {team.map((member, index) => (
        <motion.div
          key={member.name}
          className="group relative"
          variants={cardVariants}
          whileHover={{ y: -8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2178C7]/5 via-[#53C5E6]/5 to-[#C26FCF]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="cosmic-card relative p-8 rounded-3xl border border-slate-200 bg-white hover:border-[#53C5E6]/30 transition-all duration-300 text-center h-full flex flex-col shadow-lg hover:shadow-xl">
            {/* Photo with gradient border */}
            <div className="relative mx-auto mb-6">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#2178C7] via-[#53C5E6] to-[#C26FCF] rounded-3xl"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0.6 }}
                style={{ filter: "blur(8px)" }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-[#53C5E6]/20 group-hover:border-[#53C5E6]/40 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2178C7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Member info */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#2178C7] transition-colors duration-300">
                {member.name}
              </h3>
              <div className="mb-4">
                <p className="text-[#2178C7] text-sm font-semibold mb-2 group-hover:text-[#53C5E6] transition-colors duration-300">
                  {member.role}
                </p>
                <motion.div
                  className="h-0.5 w-12 bg-gradient-to-r from-[#2178C7] to-[#53C5E6] mx-auto rounded-full"
                  whileInView={{ width: [0, 48] }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.02 }}
                  viewport={{ once: true }}
                />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mt-auto">{member.expertise}</p>
            </div>
          </div>
        </motion.div>
      ))}
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
