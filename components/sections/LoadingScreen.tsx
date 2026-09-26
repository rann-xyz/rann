/**
 * Cinematic Loading Screen
 * Shows RANN branding with progress animation
 */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

interface LoadingScreenProps {
  onLoaded?: () => void
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "initialized" | "ready">("loading")
  const textRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Phase 1: Initial loading
    const loadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadInterval)
          return 100
        }
        return prev + Math.random() * 3 + 0.5
      }
    }, 50)

    // Phase 2: After loading
    const readyTimer = setTimeout(() => {
      setPhase("ready")
      onLoaded?.()
    }, 2000)

    return () => {
      clearInterval(loadInterval)
      clearTimeout(readyTimer)
    }
  }, [onLoaded])

  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50 overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 noise" />
      
      <motion.div 
        ref={textRef}
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-8xl md:text-15xl font-bold text-white mb-2">
            RANN
          </h1>
          <h2 className="text-2xl text-gray-500 mb-12">
            DIGITAL BUILDER
          </h2>
        </motion.div>

        {/* Progress */}
        <div className="w-64 h-12 border-2 border-primary/30 rounded-full overflow-hidden mb-16">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${Math.min(progress, 100)}%` }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="text-gray-500 text-sm">
          {phase === "loading" && "SYSTEM INITIALIZING..."}
          {phase === "initialized" && "LOADING 3D ENVIRONMENT..."}
          {phase === "ready" && "ENTERING THE BUILD..."}
        </div>

        {/* Technical info */}
        <motion.div
          className="mt-8 text-xs text-gray-800/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center">
            <div>AGENT • AGENTIC SYSTEMS • EXECUTION</div>
            <div>AI • WEB • AUTOMATION</div>
            <div>INFRASTRUCTURE • COMMUNITY</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Particles in background */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              scale: Math.random() * 2,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}