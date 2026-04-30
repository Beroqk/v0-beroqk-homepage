"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function BStingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [statusText, setStatusText] = useState("Efficient AI Routing Online")

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsClicked(true)
    setStatusText("Route Optimized")
    setShowSaved(true)
    setTimeout(() => {
      setIsClicked(false)
      setStatusText("Efficient AI Routing Online")
    }, 2000)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(10, 30, 60, 0.4) 0%, rgba(5, 10, 20, 0.2) 50%, transparent 80%)",
        }}
      />

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-48 pb-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4 text-balance">
            B-STING
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Beroqk builds efficient AI that reduces compute, cost, and environmental impact.
          </p>
        </motion.div>

        {/* AI Core Container */}
        <motion.div
          ref={containerRef}
          className="relative cursor-pointer select-none"
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
              transform: "scale(1.5)",
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Main orb container */}
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
            {/* Concentric rings */}
            {[1, 0.85, 0.7, 0.55, 0.4].map((scale, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `rgba(6, 182, 212, ${0.15 + i * 0.05})`,
                  transform: `scale(${scale})`,
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: isHovered ? 15 - i * 2 : 25 - i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Segmented ring with tick marks */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: isHovered ? 20 : 40, repeat: Infinity, ease: "linear" }}
            >
              {/* Tick marks */}
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
                const innerR = 175
                const outerR = i % 5 === 0 ? 190 : 182
                const x1 = 200 + Math.cos(angle) * innerR
                const y1 = 200 + Math.sin(angle) * innerR
                const x2 = 200 + Math.cos(angle) * outerR
                const y2 = 200 + Math.sin(angle) * outerR
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 5 === 0 ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.2)"}
                    strokeWidth={i % 5 === 0 ? 2 : 1}
                  />
                )
              })}

              {/* Arc segments */}
              {[0, 90, 180, 270].map((angle, i) => (
                <path
                  key={i}
                  d={`M ${200 + Math.cos((angle * Math.PI) / 180) * 160} ${200 + Math.sin((angle * Math.PI) / 180) * 160} 
                      A 160 160 0 0 1 ${200 + Math.cos(((angle + 45) * Math.PI) / 180) * 160} ${200 + Math.sin(((angle + 45) * Math.PI) / 180) * 160}`}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}

              {/* Dots around outer ring */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const x = 200 + Math.cos(angle) * 195
                const y = 200 + Math.sin(angle) * 195
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="rgba(6, 182, 212, 0.4)"
                  />
                )
              })}
            </motion.svg>

            {/* Inner rotating ring */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              animate={{ rotate: isHovered ? -360 : 0 }}
              transition={{ duration: isHovered ? 15 : 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Dashed arcs */}
              {[0, 120, 240].map((angle, i) => (
                <path
                  key={i}
                  d={`M ${200 + Math.cos((angle * Math.PI) / 180) * 120} ${200 + Math.sin((angle * Math.PI) / 180) * 120} 
                      A 120 120 0 0 1 ${200 + Math.cos(((angle + 60) * Math.PI) / 180) * 120} ${200 + Math.sin(((angle + 60) * Math.PI) / 180) * 120}`}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                />
              ))}
            </motion.svg>

            {/* Center core */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: isClicked ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(10, 30, 60, 0.8) 60%, rgba(5, 10, 20, 1) 100%)",
                  boxShadow: isHovered 
                    ? "0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(6, 182, 212, 0.2)"
                    : "0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.1)",
                }}
                animate={{
                  boxShadow: isClicked 
                    ? "0 0 100px rgba(6, 182, 212, 0.6), inset 0 0 60px rgba(6, 182, 212, 0.3)"
                    : isHovered 
                      ? "0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(6, 182, 212, 0.2)"
                      : "0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.1)",
                }}
              >
                <span className="text-lg md:text-xl font-normal tracking-widest text-cyan-400/90">
                  B.R.Q.K
                </span>
              </motion.div>
            </motion.div>

            {/* Micro text labels */}
            <MicroLabel text="MODEL ROUTER" angle={-45} radius={230} isHovered={isHovered} />
            <MicroLabel text="COST SAVING" angle={45} radius={230} isHovered={isHovered} />
            <MicroLabel text="COMPUTE REDUCTION" angle={135} radius={230} isHovered={isHovered} />
            <MicroLabel text="LOW LATENCY" angle={225} radius={230} isHovered={isHovered} />
          </div>

          {/* Saved tag */}
          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showSaved ? 1 : 0, x: showSaved ? 0 : -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1.5 backdrop-blur-sm">
              <span className="text-xs text-cyan-400 font-medium">Saved 78% Compute</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Status label */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p 
            className="text-sm text-cyan-400/70 font-medium tracking-wider uppercase"
            animate={{
              color: isClicked ? "rgba(34, 211, 238, 0.9)" : "rgba(34, 211, 238, 0.7)",
            }}
          >
            {statusText}
          </motion.p>
        </motion.div>
      </div>
    </main>
  )
}

function MicroLabel({ 
  text, 
  angle, 
  radius, 
  isHovered 
}: { 
  text: string
  angle: number
  radius: number
  isHovered: boolean
}) {
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none hidden md:block"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      animate={{
        opacity: isHovered ? 0.8 : 0.4,
      }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-[10px] text-cyan-400/60 font-medium tracking-widest whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  )
}
