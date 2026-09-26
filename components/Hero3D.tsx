/**
 * RANN Cinematic 3D Hero Scene
 * Simplified but elegant 3D experience
 */
"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

// Simplified Geometric Core
const Core = () => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
      
      if (hovered) {
        ref.current.scale.setScalar(1.1)
      } else {
        ref.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Central Octahedron */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#ff1744"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff1744"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff"
          wireframe={true}
        opacity={0.3}
          transparent={true}
        />
      </mesh>
    </group>
  )
}

// Particles
const Particles = () => {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            new Float32Array([
              -3, -2, -1, 3, -2, -1, -3, 2, -1, 3, 2, -1,
              0, -3, 0, 0, 3, 0, -4, 0, 3, 4, 0, 3
            ]),
            3
          ]}
        />
      </bufferGeometry>
      <pointsMaterial color="#ff1744" size={0.08} opacity={0.4} transparent />
    </points>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ff1744" />
        
        <Core />
        <Particles />
        
        <Environment preset="dark" />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0} />
      </Canvas>
      
      {/* Overlay Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white mb-8 tracking-tight">
            RANN
          </h1>
          <div className="text-2xl text-gray-400 mb-16">
            ENGINEER. BUILDER. MODERATOR.
          </div>
          <button className="px-8 py-3 border border-gray-700 text-gray-400 rounded-full hover:border-primary hover:text-primary transition-all">
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  )
}