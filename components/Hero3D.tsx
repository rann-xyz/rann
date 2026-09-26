/**
 * RANN Cinematic 3D Hero Scene
 * Creates the main interactive 3D environment with metallic structures,
 * fragmented geometry, and technical components.
 */
"use client"

import { Suspense } from "react"
import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  OrbitControls, 
  Float, 
  Environment, 
  ContactShadows 
} from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"

// Core geometric shapes that form the RANN aesthetic
const GeometricCore = () => {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  
  useFrame((state) => {
    if (ref.current) {
      // Subtle rotation based on mouse
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
      
      // Pulsing scale
      ref.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02)
    }
  })

  return (
    <group ref={ref} dispose={null}>
      {/* Central metallic core */}
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial 
          color="#ff1744"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff1744"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner geometry */}
      <mesh>
        <octahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial 
          color="#e0e0e0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}