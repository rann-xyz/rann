/**
 * RANN Portfolio - Minimal Stable Version
 */
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function Home() {
 return (
 <>
 <Head>
 <title>RANN - Engineer | Builder | Moderator</title>
 <meta name="description" content="AI Agent Architect building autonomous systems" />
 </Head>
 <div className="min-h-screen bg-black text-white flex items-center justify-center">
 <motion.div 
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <h1 className="text-8xl font-bold mb-16">RANN</h1>
 <h2 className="text-2xl text-gray-400 mb-8">ENGINEER • BUILDER • MODERATOR</h2>
 <motion.button
 whileHover={{ scale: 1.05 }}
 className="px-8 py-3 border border-gray-700 rounded-full hover:border-primary transition-all"
 >
 <span className="text-primary">EXPLORE</span>
 </motion.button>
 </motion.div>
 </div>
 </>
 )
}