"use client"

import { useState, useEffect } from "react"

export default function PortfolioPage() {
 const [scrollY, setScrollY] = useState(0)

 useEffect(() => {
 const handleScroll = () => setScrollY(window.scrollY)
 window.addEventListener("scroll", handleScroll)
 return () => window.removeEventListener("scroll", handleScroll)
 }, [])

 return (
 <div className="min-h-screen bg-black text-white font-mono">
 {/* Loading Screen */}
 <LoadingSection />

 {/* Hero Section */}
 <HeroSection />

 {/* About Section */}
 <AboutSection />

 {/* Systems Section */}
 <SystemsSection />

 {/* Projects Section */}
 <ProjectsSection />

 {/* Society Section */}
 <SocietySection />

 {/* Contact Section */}
 <ContactSection />
 </div>
 )
}

// Loading Screen
function LoadingSection() {
 const [loaded, setLoaded] = useState(false)
 useEffect(() => {
 setTimeout(() => setLoaded(true), 1500)
 }, [])
 return (
 <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
 <div className="text-center">
 <div className="text-8xl font-bold mb-8">RANN</div>
 <div className="text-2xl text-gray-400 mb-12">DIGITAL BUILDER</div>
 <div className="w-64 h-4 bg-gray-800 rounded" />
 </div>
 </div>
 )
}

// Hero Section
function HeroSection() {
 return (
 <section id="hero" className="h-screen flex items-center justify-center">
 <div className="text-center">
 <h1 className="text-8xl font-bold mb-8">RANN</h1>
 <h2 className="text-3xl text-gray-400 mb-16">ENGINEER • BUILDER • MODERATOR</h2>
 <p className="text-xl text-gray-500 mb-16 max-width mx-auto px-4">
 I BUILD SYSTEMS THAT MOVE.
 </p>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
 <div className="text-center p-4 border border-gray-800 rounded-lg">
 <div className="text-base text-primary mb-2">AI</div>
 </div>
 <div className="text-center p-4 border border-gray-800 rounded-lg">
 <div className="text-base text-primary mb-2">AGENTS</div>
 </div>
 <div className="text-center p-4 border border-gray-800 rounded-lg">
 <div className="text-base text-primary mb-2">AUTOMATION</div>
 </div>
 </div>
 </div>
 </section>
 )
}

// About Section
function AboutSection() {
 return (
 <section id="about" className="h-screen flex items-center justify-center bg-black/50">
 <div className="max-w-3xl mx-auto px-4 text-center">
 <span className="text-sm text-gray-500 mb-4 block">02 / ABOUT</span>
 <h2 className="text-5xl font-bold mb-8">ABOUT ME</h2>
 <p className="text-gray-300 mb-8">
 I build software, AI systems, automation, web experiences, and online communities.
 </p>
 <p className="text-gray-400 mb-12">
 I approach engineering through experimentation - learning by building, testing, breaking, debugging, researching, and iterating.
 </p>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
 {["AI", "AGENTS", "WEB", "WEB3", "INFRASTRUCTURE", "AUTOMATION"].map((skill) => (
 <div key={skill} className="p-4 border border-gray-800 rounded-lg text-center">
 <div className="text-primary font-bold">{skill}</div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

// Systems Section
function SystemsSection() {
 return (
 <section id="systems" className="h-screen flex items-center justify-center">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <span className="text-sm text-gray-500 mb-4 block">03 / SYSTEMS</span>
 <h2 className="text-5xl font-bold mb-8">BUILDING THE MACHINE</h2>
 <p className="text-gray-300 mb-12">
 Agentic AI, Tool Use, Workflow Execution
 </p>
 <div className="bg-gray-900 p-8 rounded-lg max-w-2xl mx-auto">
 <div className="text-primary font-bold mb-4">SYSTEM ARCHITECTURE</div>
 <div className="text-gray-400 text-sm">
 AI AGENTS → AUTOMATION → SYSTEMS → INFRASTRUCTURE
 </div>
 </div>
 </div>
 </section>
 )
}

// Projects Section
function ProjectsSection() {
 const projects = [
 { title: "RANN AGENT", desc: "Autonomous agent frameworks with tool use, workflow execution, context management" },
 { title: "SOCIETY", desc: "Online community focused on AI, Web3, and emerging technologies" },
 { title: "Hermes Agent", desc: "AI orchestration platform for autonomous workflows" }
 ]
 return (
 <section id="projects" className="h-screen flex items-center justify-center bg-black/50">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <span className="text-sm text-gray-500 mb-4 block">04 / PROJECTS</span>
 <h2 className="text-5xl font-bold mb-12">SELECTED WORK</h2>
 <div className="space-y-8 max-w-2xl mx-auto">
 {projects.map((project, i) => (
 <div key={i} className="border border-gray-800 rounded-lg p-6">
 <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
 <p className="text-gray-400">{project.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

// Society Section
function SocietySection() {
 return (
 <section id="society" className="h-screen flex items-center justify-center">
 <div className="max-w-3xl mx-auto px-4 text-center">
 <span className="text-sm text-gray-500 mb-4 block">05 / SOCIETY</span>
 <h2 className="text-5xl font-bold mb-8">COMMUNITIES</h2>
 <p className="text-gray-300 mb-8">
 BUILDING COMMUNITIES AROUND WEB3
 </p>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
 {["AI AGENTS", "AUTOMATION", "WEB3", "COMMUNITY", "DISCORD", "NETWORKS"].map((item) => (
 <div key={item} className="p-4 border border-gray-800 rounded text-center">
 <div className="text-sm text-primary">{item}</div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

// Contact Section
function ContactSection() {
 return (
 <section id="contact" className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
 <div className="text-center px-4">
 <span className="text-sm text-gray-500 mb-4 block">06 / CONTACT</span>
 <h1 className="text-6xl md:text-8xl font-bold mb-12">
 LET'S BUILD SOMETHING INTERESTING
 </h1>
 <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
 <a href="https://github.com/rann-xyz" className="px-8 py-4 border border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-black transition-all">GITHUB</a>
 <a href="https://x.com/rann_xyz" className="px-8 py-4 border border-gray-600 text-gray-400 rounded-full font-bold hover:border-primary hover:text-white transition-all">X</a>
 </div>
 </div>
 </section>
 )
}