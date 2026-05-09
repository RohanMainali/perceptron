"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Services from "@/components/sections/services"
import Comparison from "@/components/sections/comparison"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative overflow-hidden">
      {/* Fixed dark background — visible only behind non-white sections */}
      <div className="fixed inset-0 -z-10 bg-background" />

      <Navigation scrollY={scrollY} />

      <Hero />
      <About />
      <Services />
      <Comparison />
      <Contact />
      <Footer />
    </main>
  )
}
