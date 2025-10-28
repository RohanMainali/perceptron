"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import { Brain, Zap, Users, Rocket } from "lucide-react"

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)

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
    { name: "Rohan Mainali", role: "Lead Researcher", expertise: "Computer Vision, Deep Learning", image: "/images/team/rohan-mainali.jpg" },
    { name: "Neha Aryal", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/neha-aryal.jpg" },
    { name: "Puspa Kutu", role: "Research Engineer", expertise: "NLP, Multimodal Systems", image: "/images/team/puspa-kutu.jpg" },
    { name: "Aayushman Shrestha", role: "Data Scientist", expertise: "Data Annotation, Analysis", image: "/images/team/aayushman-shrestha.jpg" },
    { name: "Priyokti Manandhar", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/priyokti-manandhar.jpg" },
    { name: "Bibek Shrestha", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/bibek-shrestha.jpg" },
    { name: "Pratik Awal", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/pratik-awal.jpg" },
    { name: "Swornika Rajbhandari", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/swornika-rajbhandari.jpg" },
    { name: "Nischal Bhattarai", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/nischal-bhattarai.jpg" },
    { name: "Rakesh Shrestha", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/rakesh-shrestha.jpg" },
    { name: "Samichha Shrestha", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/samichha-shrestha.jpg" },
    { name: "Suyog Maharjan", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/suyog-maharjan.jpg" },
    { name: "Soyam Shrestha", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/soyam-shrestha.jpg" },
    { name: "Sahajid Rahaman", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/sahajid-rahaman.jpg" },
    { name: "Abhay Shrestha", role: "ML Engineer", expertise: "Model Development, Optimization", image: "/images/team/abhay-shrestha.jpg" },
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "Perceptron established with a vision to advance AI research" },
    { year: "2021", title: "First Project", description: "Completed groundbreaking MMA Vision analysis system" },
    { year: "2022", title: "Expansion", description: "Grew team and expanded service offerings" },
    { year: "2024", title: "Innovation", description: "Launched CLIP Fine-tuning Suite and Pose Estimation Engine" },
  ]

  return (
    <main className="relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background " />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                About Perceptron
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              We are a team of AI researchers and engineers dedicated to building the next generation of intelligent
              systems that solve real-world problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
            </motion.div>
            <motion.div
              className="relative h-96 rounded-2xl border border-slate-200 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="w-32 h-32 text-primary/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 h-full">
                  <value.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* Team Section */}
<section className="relative py-20 md:py-32 overflow-hidden bg-white text-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Meet Our Team
        </span>
      </h2>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
        Talented researchers and engineers working together to advance AI
      </p>
    </motion.div>

    {/* Team grid with centered last row */}
    <div className="space-y-6">
      {/* First 12 members in 4x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.slice(0, 12).map((member, index) => (
          <motion.div
            key={member.name}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative p-8 rounded-3xl border border-slate-200 bg-white hover:border-primary/40 transition-all duration-300 text-center h-full flex flex-col shadow-lg hover:shadow-xl hover:shadow-primary/20">
              {/* Photo with gradient border */}
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Member info */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  {member.name}
                </h3>
                <div className="mb-4">
                  <p className="text-primary text-sm font-semibold mb-1 group-hover:text-secondary transition-colors duration-300">
                    {member.role}
                  </p>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-auto">{member.expertise}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Last few members centered */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto place-items-center">
          {team.slice(12).map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 12) * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative p-8 rounded-3xl border border-slate-200 bg-white hover:border-primary/40 transition-all duration-300 text-center h-full flex flex-col shadow-lg hover:shadow-xl hover:shadow-primary/20">
                {/* Photo with gradient border */}
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="160px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Member info */}
                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    {member.name}
                  </h3>
                  <div className="mb-4">
                    <p className="text-primary text-sm font-semibold mb-1 group-hover:text-secondary transition-colors duration-300">
                      {member.role}
                    </p>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mt-auto">{member.expertise}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

  {/* Timeline Section */}
  <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="group relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-24">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow p-6 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
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
