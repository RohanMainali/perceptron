"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavigationProps {
  scrollY: number
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActivePath = (href: string) => {
    if (!pathname) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 || pathname !== "/" ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
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
              <span className="text-xl font-normal cosmic-heading-gradient">
                Perceptron
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = isActivePath(item.href)

              return (
                <Link key={item.label} href={item.href} className="relative">
                  <motion.span
                    className={cn(
                      "relative inline-flex items-center pb-1 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer",
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                    )}
                    whileHover={{ color: "#64c8ff" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveUnderline"
                        className="absolute left-0 top-full mt-1 h-[3px] w-full rounded-full bg-gradient-to-r from-[#2178C7] via-[#53C5E6] to-[#C26FCF] shadow-[0_0_12px_rgba(83,197,230,0.45)]"
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              )
            })}
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
            {navItems.map((item) => {
              const isActive = isActivePath(item.href)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-4 py-2 text-foreground/70 transition-colors hover:bg-card hover:text-foreground",
                    isActive && "bg-card/60 text-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative inline-block">
                    {item.label}
                    {isActive && (
                      <span className="absolute left-0 top-full mt-1 h-[3px] w-full rounded-full bg-gradient-to-r from-[#2178C7] via-[#53C5E6] to-[#C26FCF]" />
                    )}
                  </span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
