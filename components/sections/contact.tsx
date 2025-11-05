"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, Send, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", projectType: "", message: "" })
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-slate-50 text-slate-900">
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="cosmic-heading-gradient">
              Get In Touch
            </span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Have a project in mind? Let's collaborate and build something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Project Type</label>
              <div className="relative">
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition appearance-none cursor-pointer"
                >
                  <option value="">Select a project type</option>
                  <option value="data-annotation">Data Annotation</option>
                  <option value="model-development">Model Development</option>
                  <option value="research-consulting">Research & Consulting</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition resize-none"
                placeholder="Tell us about your project..."
                rows={5}
              />
            </div>
            <motion.button
              type="submit"
              className="cosmic-btn-primary w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message <Send size={20} />
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="mailto:hello@perceptron.ai"
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    hello@perceptron.ai
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-primary/10 bg-white shadow-lg hover:border-primary/30 hover:shadow-primary/10 transition-all">
              <h3 className="text-xl font-bold mb-4">Why Choose Perceptron?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span>Expert team with years of AI research experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span>Cutting-edge technology and methodologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span>Custom solutions tailored to your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span>Proven track record with successful projects</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
