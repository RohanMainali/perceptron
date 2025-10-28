"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface NavigationProps {
  scrollY: number
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }}>
              <Image src="/perceptron-logo.png" alt="Perceptron Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Perceptron
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <motion.span
                  className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  whileHover={{ color: "#64c8ff" }}
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <a
                  className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
