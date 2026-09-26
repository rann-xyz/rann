/**
 * Systems Section
 * Engineering laboratory visualization
 */
"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import * as THREE from "three"

const systemCategories = [
  { name: "AI", icon: "🧠", position: [0, 2, 0] },
  { name: "AGENTS", icon: "🤖", position: [2, 1, 0] },
  { name: "AUTOMATION", icon: "⚙️", position: [2, -1, 0] },
  { name: "SYSTEMS", icon: "⚙️", position: [0, -2, 0] },
  { name: "WEB3", icon: "⛓️", position: [-2, -1, 0] },
  { name: "WEB", icon: "🌐", position: [-2, 1, 0] },
  { name: "INFA", icon: "🏗️", position: [0, 4, 0] },
  { name: "LINUX", icon: "💻", position: [0, 0, 3] },
  { name: "APIs", icon: "🔗", position: [3, 0, 0] },
  { name: "SECURITY", icon: "🛡️", position: [-3, 0, 0] },
]

const SystemObject = ({ system, isActive }: { 
  system: typeof systemCategories[0]
  isActive: boolean
}) => {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
      if (isActive) {
        ref.current.scale.setScalar(1.3)
        ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 2) * 0.02
      } else {
        ref.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={ref} position={system.position as [number, number, number]}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={isActive ? "#ff1744" : "#1a1a1a"}
          metalness={0.8}
          roughness={0.15}
          emissive={isActive ? "#ff1744" : "#000000"}
          emissiveIntensity={isActive ? 1 : 0.2}
        />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export default function Systems() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <section className="relative w-full min-h-screen bg-dark flex items-center justify-center">
      {/* 3D Systems */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ff1744" />
          
          <group ref={groupRef}>
            {systemCategories.map((system, i) => (
              <SystemObject
                key={system.name}
                system={system}
                isActive={activeSystem === system.name}
              />
            ))}
          </group>
          
          <Environment preset="dark" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-sm text-gray-500 mb-4 block">
            "03 / SYSTEMS"
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
            BUILDING
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-16">
            THE MACHINE.
          </h2>
        </motion.div>

        {/* System Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {systemCategories.map((system) => (
            <motion.div
              key={system.name}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              on mouseEnter={() => setActiveSystem(system.name)}
              on mouseLeave={() => setActiveSystem(null)}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                {system.icon}
              </div>
              <span className="text-sm text-gray-400 font-mono">{system.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs">SCROLL</span>
          <div className="w-px h-8 bg-primary/50" />
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}