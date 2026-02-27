"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Linkedin, Facebook, Send, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Contact({ hideHeader = false }: { hideHeader?: boolean }) {
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
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden bg-slate-50 text-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#53C5E6]/20 to-transparent" />

      {/* Floating accents */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#53C5E6]/[0.03] blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-[#C26FCF]/[0.03] blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section header */}
        {!hideHeader && (
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
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let&apos;s Connect
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cosmic-heading-gradient">
                Get In Touch
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Have a project in mind? Let&apos;s collaborate and build something amazing together.
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
        )}

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {[
              { label: "Name", type: "text", field: "name" as const, placeholder: "Your name" },
              { label: "Email", type: "email", field: "email" as const, placeholder: "your@email.com" },
            ].map((input, i) => (
              <motion.div
                key={input.field}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-700">{input.label}</label>
                <input
                  type={input.type}
                  value={formData[input.field]}
                  onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#53C5E6]/50 focus:ring-2 focus:ring-[#53C5E6]/20 transition-all duration-300 hover:border-slate-300"
                  placeholder={input.placeholder}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium mb-2 text-slate-700">Project Type</label>
              <div className="relative">
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#53C5E6]/50 focus:ring-2 focus:ring-[#53C5E6]/20 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-300"
                >
                  <option value="">Select a project type</option>
                  <option value="data-annotation">Data Annotation</option>
                  <option value="model-development">Model Development</option>
                  <option value="research-consulting">Research & Consulting</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium mb-2 text-slate-700">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#53C5E6]/50 focus:ring-2 focus:ring-[#53C5E6]/20 transition-all duration-300 resize-none hover:border-slate-300"
                placeholder="Tell us about your project..."
                rows={5}
              />
            </motion.div>
            <motion.button
              type="submit"
              className="cosmic-btn-primary w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              viewport={{ once: true }}
            >
              Send Message <Send size={18} />
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="cosmic-card p-8 rounded-2xl border border-slate-200 bg-white shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "support@perceptronai.org", href: "mailto:support@perceptronai.org", color: "#53C5E6" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/perceptronai/", color: "#2178C7" },
                  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586580522261", color: "#C26FCF" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 group/link"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/link:scale-110"
                      style={{ background: `${item.color}10` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <a
                      href={item.href}
                      className="text-slate-600 hover:text-[#2178C7] transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="cosmic-card p-8 rounded-2xl border border-slate-200 bg-white shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-4">Why Choose Perceptron?</h3>
              <ul className="space-y-3 text-slate-600">
                {[
                  "Expert team with years of AI research experience",
                  "Cutting-edge technology and methodologies",
                  "Custom solutions tailored to your needs",
                  "Proven track record with successful projects",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[#53C5E6] mt-0.5 flex-shrink-0 text-lg">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
