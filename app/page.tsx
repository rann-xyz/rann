"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Hero3D from "@/components/Hero3D"
import LoadingScreen from "@/components/sections/LoadingScreen"
import About from "@/components/sections/About"

export default function Portfolio() {
 const [isLoading, setIsLoading] = useState(true)
 const [showHero, setShowHero] = useState(false)
 const heroRef = useRef<HTMLElement>(null)
 const aboutRef = useRef<HTMLElement>(null)

 useEffect(() => {
 const timer = setTimeout(() => {
 setIsLoading(false)
 setTimeout(() => setShowHero(true), 500)
 }, 2000)

 return () => clearTimeout(timer)
 }, [])

 return (
 <>
 {isLoading && <LoadingScreen />}

 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 >
 <section ref={heroRef} id="hero" className="h-screen">
 <Hero3D />
 </section>

 <section ref={aboutRef} id="about" className="h-screen">
 <About />
 </section>

 <section id="contact" className="h-screen flex items-center justify-center bg-black">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 1 }}
 viewport={{ once: true }}
 className="text-center px-4"
 >
 <span className="text-sm text-gray-500 mb-4 block">03 / CONTACT</span>
 <h1 className="text-5xl md:text-7xl font-bold text-white mb-12">
 LET'S BUILD SOMETHING INTERESTING.
 </h1>

 <div className="flex flex-col md:flex-row gap-8 justify-center">
 <a href="https://github.com/rann-xyz" className="text-xl text-primary">GITHUB</a>
 <a href="https://x.com/rann_xyz" className="text-xl text-gray-400">X</a>
 </div>
 </motion.div>
 </section>
 </motion.div>
 </>
 )
}