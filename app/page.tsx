/**
 * RANN Portfolio - Cinematic 3D Experience
 * Main page with scroll-based narrative
 */
"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lenis } from "lenis"
import Hero from "@/components/Hero3D"
import About from "@/components/sections/About"
import Systems from "@/components/sections/Systems"
import Navigation from "@/components/Navigation"
import LoadingScreen from "@/components/sections/LoadingScreen"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("home")
  
  // Section refs
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const systemsRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      smooth: true,
      speed: 1.5,
      exactSpeed: true,
      gesture: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Loading sequence
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(loadTimer)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Scroll-based section tracking
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 80%",
        onEnter: () => setCurrentSection("about"),
      })

      ScrollTrigger.create({
        trigger: systemsRef.current,
        start: "top 80%",
        onEnter: () => setCurrentSection("systems"),
      })

      // Create smooth scroll animations for navigation
      document.querySelectorAll('[data-section]').forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -5, duration: 0.3, ease: "power2.out" })
        })
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out" })
        })
      })
    }
  }, [isLoading])

  const scrollToSection = (section: string) => {
    const sectionMap: Record<string, HTMLElement | null> = {
      home: heroRef.current,
      about: aboutRef.current,
      systems: systemsRef.current,
      work: workRef.current,
      contact: contactRef.current,
    }

    const target = sectionMap[section]
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offset: 0.1 },
        duration: 1.2,
        ease: "power2.inOut",
      })
    }
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="w-full min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <Navigation 
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />
        
        {/* Hero Section - Main 3D Environment */}
        <section ref={heroRef} id="home" className="relative">
          <Hero onScrollToAbout={() => scrollToSection("about")} />
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="relative">
          <About />
        </section>

        {/* Systems Section */}
        <section ref={systemsRef} id="systems" className="relative">
          <Systems />
        </section>

        {/* Work Section */}
        <section ref={workRef} id="work" className="relative min-h-screen bg-dark flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-gray-500 mb-4 block">
              "04 / WORK"
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              WORK IN PROGRESS
            </h1>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="relative min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm text-gray-500 mb-4 block">
                "05 / CONTACT"
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
                LET'S BUILD SOMETHING INTERESTING.
              </h1>
            </motion.div>
            
            <motion.div
              className="flex flex-col md:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a 
                href="https://x.com/rann_xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-primary hover:text-white transition-colors"
              >
                X
              </a>
              <a 
                href="https://github.com/rann-xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                GITHUB
              </a>
              <a 
                href="https://discord.gg/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                DISCORD
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}