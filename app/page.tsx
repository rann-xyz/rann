/**
 * RANN Portfolio - Simplified Cinematic Experience
 */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero3D from "@/components/Hero3D"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero">
        <Hero3D />
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex items-center justify-center bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <span className="text-sm text-gray-500 mb-4 block">02 / ABOUT</span>
          <h1 className="text-5xl font-bold text-white mb-8">RANN</h1>
          <h2 className="text-3xl font-bold text-white mb-12">ENGINEER • BUILDER • MODERATOR</h2>
          
          <div className="max-w-2xl mx-auto text-gray-400">
            <p className="mb-8">I build software, AI systems, automation, web experiences, and online communities.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {["AI", "AGENTS", "WEB", "WEB3", "INFRASTRUCTURE", "AUTOMATION"].map((item) => (
                <div key={item} className="text-sm">
                  <span className="text-primary">•</span> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <span className="text-sm text-gray-500 mb-4 block">03 / CONTACT</span>
          <h1 className="text-5xl font-bold text-white mb-12">LET'S BUILD SOMETHING INTERESTING.</h1>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <a href="https://x.com/rann_xyz" className="text-xl text-primary hover:text-white transition-colors">X</a>
            <a href="https://github.com/rann-xyz" className="text-xl text-gray-400 hover:text-white transition-colors">GITHUB</a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}