"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Linkedin, Youtube, Facebook } from "lucide-react"
import { SiReddit } from "react-icons/si"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <footer className="relative border-t border-primary/20 overflow-hidden">
      {/* Footer background image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/footer-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/30" />
      </div>

      {/* Subtle animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] z-10"
        style={{ background: "linear-gradient(90deg, transparent, #53C5E6, #C26FCF, transparent)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      
      <div className="w-full px-6 md:px-12 lg:px-16 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <motion.div
                  className="flex items-center gap-2 mb-4 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src="/perceptron-logo.png" alt="Perceptron Logo" width={32} height={32} className="w-8 h-8" />
                  <span className="text-lg font-normal cosmic-heading-gradient">Perceptron</span>
                </motion.div>
              </Link>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Shaping the future through intelligent perception.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={link.href}>
                      <span className="text-foreground/60 hover:text-[#53C5E6] transition-colors text-sm cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Solutions</h4>
              <ul className="space-y-3">
                {[
                  { label: "Data Annotation", href: "/services#data-annotation" },
                  { label: "Model Development", href: "/services#model-development" },
                  { label: "Research & Consulting", href: "/services#research-consulting" },
                ].map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={link.href}>
                      <span className="text-foreground/60 hover:text-[#53C5E6] transition-colors text-sm cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn", color: "#2178C7", href: "https://www.linkedin.com/in/perceptronai/" },
                  { icon: Youtube, label: "YouTube", color: "#ff0000", href: "https://www.youtube.com/@Perceptron-ai-labs" },
                  { icon: Facebook, label: "Facebook", color: "#C26FCF", href: "https://www.facebook.com/profile.php?id=61586580522261" },
                  { icon: SiReddit, label: "Reddit", color: "#ee6e13", href: "https://www.reddit.com/user/Intelligent_Cry_3621/" }
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#53C5E6]/30"
                    style={{ background: `${social.color}15` }}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <social.icon size={18} style={{ color: social.color }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px mb-8"
            style={{ background: "linear-gradient(90deg, transparent, rgba(83,197,230,0.2), rgba(194,111,207,0.15), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
          <div className="flex justify-center">
            <p className="text-foreground/50 text-sm">
              © {currentYear} Perceptron AI Labs Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
