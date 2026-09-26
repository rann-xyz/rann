"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { motion } from "framer-motion"

const CoreObject = () => {
 const ref = useRef()
 const [hovered, setHovered] = useState(false)

 useFrame((state) => {
 if (ref.current) {
 ref.current.rotation.y += 0.005
 ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
 }
 })

 return (
 <mesh
 ref={ref}
 onPointerOver={() => setHovered(true)}
 onPointerOut={() => setHovered(false)}
 >
 <octahedronGeometry args={[1.5]} />
 <meshStandardMaterial
 color="#ff1744"
 metalness={0.8}
 roughness={0.2}
 emissive="#ff1744"
 emissiveIntensity={hovered ? 1 : 0.5}
 />
 </mesh>
 )
}

export default function Hero3D() {
 return (
 <div className="relative w-full h-screen bg-black overflow-hidden">
 <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
 <color attach="background" args={["#0a0a0a"]} />
 <ambientLight intensity={0.3} />
 <directionalLight position={[10, 10, 5]} intensity={1} />
 <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ff1744" />

 <CoreObject />

 <Environment preset="dark" />
 <OrbitControls
 enableZoom={false}
 enablePan={false}
 rotateSpeed={0}
 />
 </Canvas>

 {/* Overlay Content */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 <div className="text-center">
 <motion.h1
 initial={{ opacity: 0, y: -50 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.5 }}
 className="text-8xl md:text-15xl font-bold text-white"
 >
 RANN
 </motion.h1>

 <motion.h2
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 1 }}
 className="text-3xl md:text-5xl font-bold text-primary mt-8 mb-16"
 >
 ENGINEER • BUILDER • MODERATOR
 </motion.h2>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 1.5 }}
 className="text-xl text-gray-400 mb-16 md:mb-32"
 >
 I BUILD
 <br />
 SYSTEMS
 <br />
 THAT MOVE.
 </motion.div>

 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-12 py-4 border border-primary/50 text-primary rounded-full font-mono text-lg hover:bg-primary/10 transition-all"
 >
 SCROLL
 </motion.button>
 </div>
 </div>
 </div>
 )
}