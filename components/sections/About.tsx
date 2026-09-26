/**
 * About Section
 * Interactive node network showing skills/expertise
 */
"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"

interface Node {
  id: string
  label: string
  position: [number, number, number]
}

const nodes: Node[] = [
  { id: "ai", label: "AI", position: [0, 2, 0] },
  { id: "agents", label: "AGENTS", position: [2, 1, 0] },
  { id: "web", label: "WEB", position: [2, -1, 0] },
  { id: "linux", label: "LINUX", position: [0, -2, 0] },
  { id: "web3", label: "WEB3", position: [-2, -1, 0] },
  { id: "automation", label: "AUTOMATION", position: [-2, 1, 0] },
  { id: "infra", label: "INFRASTRUCTURE", position: [0, 4, 0] },
  { id: "systems", label: "SYSTEMS", position: [0, 0, 3] },
]

const Node3D = ({ node, isActive, onClick }: { 
  node: Node
  isActive: boolean
  onClick: () => void
}) => {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      if (isActive) {
        ref.current.scale.setScalar(1.2 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1)
      } else {
        ref.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group 
      position={node.position}
      onClick={onClick}
      onPointerOver={(e) => e.stopPropagation()}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#ff1744" : "#1a1a1a"}
          metalness={0.7}
          roughness={0.2}
          emissive={isActive ? "#ff1744" : "#000000"}
          emissiveIntensity={isActive ? 0.8 : 0.1}
        />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <textGeometry args={["AI", {
          font: "/fonts/jetbrains-mono.json",
          size: 0.15,
          height: 0.01,
          curveResolution: 12
        }]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  )
}

const NodeNetwork = ({ activeNode, onNodeHover }: {
  activeNode: string | null
  onNodeHover: (id: string | null) => void
}) => {
  return (
    <group>
      {/* Connections */}
      {nodes.map((node, i) => {
        const connections = nodes.filter(n => n.id !== node.id)
        return connections.map((target) => (
          <line 
            key={`${node.id}-${target.id}`}
            start={[node.position[0], node.position[1], node.position[2]]}
            end={target.position}
          >
            <lineBasicMaterial 
              color={
                activeNode === node.id || activeNode === target.id 
                  ? "#ff1744" 
                  : "rgba(255, 23, 68, 0.2)"
              }
              linewidth={activeNode === node.id ? 2 : 1}
            />
          </line>
        ))
      })}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <Node3D
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          onClick={() => onNodeHover(node.id)}
        />
      ))}
    </group>
  )
}

// Custom line component
const line = (() => {
  const geo = new THREE.BufferGeometry()
  return ({ start, end, children }: any) => {
    geo.setFromPoints([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ])
    return <line geometry={geo} {...children} />
  }
})()

export default function About() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <section className="relative w-full min-h-screen bg-dark flex items-center justify-center">
      {/* 3D Node Network */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ff1744" />
          
          <NodeNetwork 
            activeNode={activeNode}
            onNodeHover={setActiveNode}
          />
          
          <Environment preset="dark" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-sm text-gray-500 mb-4 block">
            "02 / ABOUT"
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            ENGINEER.
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            BUILDER.
          </h2>
          
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-16">
            MODERATOR.
          </h3>
        </motion.div>

        {/* Skills/Categories */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {["AI", "AGENTS", "WEB", "WEB3", "INFRASTRUCTURE", "AUTOMATION"].map((skill, i) => (
            <motion.div
              key={skill}
              className="text-gray-400 text-sm"
              whileHover={{ 
                color: "#ffffff",
                scale: 1.1 
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-primary opacity-50">•</span> {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
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