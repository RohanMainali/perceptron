"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-background to-background/50 backdrop-blur-sm">
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <div className="flex items-center gap-2 mb-4 cursor-pointer">
                  <Image src="/perceptron-logo.png" alt="Perceptron Logo" width={32} height={32} className="w-8 h-8" />
                  <span className="text-lg font-bold">Perceptron</span>
                </div>
              </Link>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Shaping the future through intelligent perception.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-foreground/60 hover:text-foreground transition-colors text-sm cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services#data-annotation">
                    <span className="text-foreground/60 hover:text-foreground transition-colors text-sm cursor-pointer">
                      Data Annotation
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#model-development">
                    <span className="text-foreground/60 hover:text-foreground transition-colors text-sm cursor-pointer">
                      Model Development
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#research-consulting">
                    <span className="text-foreground/60 hover:text-foreground transition-colors text-sm cursor-pointer">
                      Research & Consulting
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">in</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">gh</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">tw</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/10 pt-8">
            <div className="flex justify-center">
              <p className="text-foreground/60 text-sm">
                © {currentYear} Perceptron — Shaping the future through intelligent perception.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
