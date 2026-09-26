"use client"

import { motion } from "framer-motion"

export default function About() {
 return (
 <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
 <div className="absolute inset-0 noise" />

 <motion.div
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 1 }}
 viewport={{ once: true }}
 className="max-w-4xl mx-auto px-4 text-center"
 >
 <span className="text-sm text-gray-500 mb-4 block">02 / ABOUT</span>

 <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-none">
 ENGINEER.
 </h1>

 <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
 BUILDER.
 </h2>

 <h3 className="text-2xl font-bold text-primary mb-16">
 MODERATOR.
 </h3>

 <div className="text-left md:text-left space-y-6 text-gray-300 max-w-3xl mx-auto">
 <p className="text-lg leading-relaxed">
 I’m an engineer and hands-on builder focused on artificial intelligence, software development, AI agents, automation, developer tooling, and emerging technologies. My primary interest is turning ideas into functional systems and understanding how technology can be pushed beyond its default capabilities.
 </p>

 <p className="text-gray-400 leading-relaxed">
 I approach engineering through experimentation. I learn by building, testing, breaking, debugging, researching, and iterating. Rather than treating tools and frameworks as black boxes, I’m interested in understanding how they work underneath, where their limitations are, and how they can be extended or connected to create something more capable.
 </p>
 </div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.5 }}
 viewport={{ once: true }}
 className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
 >
 {["AI", "AGENTS", "WEB", "WEB3", "INFRASTRUCTURE", "AUTOMATION"].map((skill) => (
 <div key={skill} className="text-center">
 <div className="w-16 h-16 mx-auto mb-3 rounded-full border border-primary/30 flex items-center justify-center">
 <span className="text-sm font-mono">{skill}</span>
 </div>
 </div>
 ))}
 </motion.div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 0.5 }}
 transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
 className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
 />
 </section>
 )
}