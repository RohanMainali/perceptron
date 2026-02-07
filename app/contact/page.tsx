"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import Contact from "@/components/sections/contact"
import PageHero from "@/components/page-hero"

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative overflow-hidden bg-background">
      <Navigation scrollY={scrollY} />
      <PageHero
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? We'd love to hear from you."
        badge="Let's Connect"
      />
      <Contact />
      <Footer />
    </main>
  )
}
