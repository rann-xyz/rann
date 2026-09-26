/**
 * Floating Navigation Component
 * Minimal, elegant navigation that doesn't compete with the 3D experience
 */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

const sections = [
  { id: "home", label: "01 HOME" },
  { id: "about", label: "02 ABOUT" },
  { id: "systems", label: "03 SYSTEMS" },
  { id: "work", label: "04 WORK" },
  { id: "contact", label: "05 CONTACT" },
]

export default function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      ref={navRef}
      className="fixed top-8 right-8 z-40"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Navigation items */}
      <div className="flex flex-col gap-2">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className="group"
            onClick={() => onNavigate(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`flex items-center gap-3 px-2 py-1 transition-all duration-300 ${
              currentSection === id ? "text-primary" : "text-gray-400 hover:text-white"
            }`}>
              <span className={`text-xs transition-all duration-300 ${
                hovered === id ? "w-6 h-0.5 bg-primary" : "w-4 h-0.5 bg-gray-600"
              }`} />
              <span className="text-sm font-mono tracking-wider">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Active indicator */}
      <motion.div
        className="absolute left-0 top-0 w-1 h-full bg-primary/20 rounded-full"
        animate={{
          height: currentSection ? "100%" : "0%",
          opacity: currentSection ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle glow effect */}
      {currentSection && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 0.3, scale: 1.5 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{
            boxShadow: "0 0 20px rgba(255, 23, 68, 0.2)",
            filter: "blur(10px)",
          }}
        />
      )}
    </motion.div>
  )
}