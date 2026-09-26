"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
 onLoaded?: () => void
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
 const [progress, setProgress] = useState(0)
 const [phase, setPhase] = useState<"init" | "ready">("init")

 useEffect(() => {
 const interval = setInterval(() => {
 setProgress(prev => {
 const next = prev + Math.random() * 3
 if (next >= 100) {
 clearInterval(interval)
 setPhase("ready")
 setTimeout(() => onLoaded?.(), 500)
 return 100
 }
 return next
 })
 }, 50)

 return () => clearInterval(interval)
 }, [onLoaded])

 return (
 <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
 <div className="text-center">
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 >
 <h1 className="text-8xl md:text-15xl font-bold text-white mb-8">
 RANN
 </h1>
 <h2 className="text-2xl text-gray-500 mb-12">
 DIGITAL BUILDER
 </h2>
 </motion.div>

 <div className="w-64 h-12 border border-primary/30 rounded-full overflow-hidden mb-8">
 <motion.div
 className="h-full bg-primary"
 style={{ width: `${progress}%` }}
 animate={{ width: `${progress}%` }}
 transition={{ duration: 0.1 }}
 />
 </div>

 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-gray-500 text-sm"
 >
 {phase === "init" ? "INITIATING SESSION..." : "ACCESS GRANTED"}
 </motion.div>

 <motion.div
 className="absolute inset-0 noise"
 initial={{ opacity: 0.3 }}
 animate={{ opacity: 0.3 }}
 />
 </div>
 </div>
 )
}