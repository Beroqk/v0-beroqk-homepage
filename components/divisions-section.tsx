"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// AI Routing Visualization
function RoutingVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()

    // Model nodes
    const models = [
      { name: "GPT-4", x: 0.7, y: 0.25 },
      { name: "Claude", x: 0.85, y: 0.45 },
      { name: "Gemini", x: 0.75, y: 0.65 },
      { name: "Llama", x: 0.55, y: 0.75 },
    ]

    let selectedModel = 0
    let selectionTime = 0

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)
      timeRef.current += isHovered ? 0.025 : 0.012

      const baseOpacity = isHovered ? 0.6 : 0.35
      
      // Update selected model periodically
      if (timeRef.current - selectionTime > 3) {
        selectedModel = (selectedModel + 1) % models.length
        selectionTime = timeRef.current
      }

      // Central routing hub
      const hubX = width * 0.25
      const hubY = height * 0.5
      const hubRadius = 24

      // Draw hub glow
      const hubGlow = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, hubRadius * 3)
      hubGlow.addColorStop(0, `rgba(80, 140, 255, ${baseOpacity * 0.25})`)
      hubGlow.addColorStop(1, "transparent")
      ctx.fillStyle = hubGlow
      ctx.beginPath()
      ctx.arc(hubX, hubY, hubRadius * 3, 0, Math.PI * 2)
      ctx.fill()

      // Hub core
      ctx.beginPath()
      ctx.arc(hubX, hubY, hubRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(60, 120, 255, ${baseOpacity * 0.2})`
      ctx.fill()
      ctx.strokeStyle = `rgba(100, 160, 255, ${baseOpacity * 0.6})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Hub inner ring
      ctx.beginPath()
      ctx.arc(hubX, hubY, hubRadius * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(120, 180, 255, ${baseOpacity * 0.4})`
      ctx.fill()

      // Draw model nodes and connections
      models.forEach((model, i) => {
        const nodeX = width * model.x
        const nodeY = height * model.y
        const isSelected = i === selectedModel
        const nodeRadius = isSelected ? 8 : 6

        // Connection line
        ctx.beginPath()
        ctx.moveTo(hubX, hubY)
        ctx.lineTo(nodeX, nodeY)
        
        if (isSelected) {
          ctx.strokeStyle = `rgba(100, 180, 255, ${baseOpacity * 0.7})`
          ctx.lineWidth = 2
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.2})`
          ctx.lineWidth = 1
          ctx.setLineDash([4, 4])
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Traveling packet on selected route
        if (isSelected) {
          const packetProgress = (timeRef.current % 1.5) / 1.5
          const packetX = hubX + (nodeX - hubX) * packetProgress
          const packetY = hubY + (nodeY - hubY) * packetProgress

          ctx.beginPath()
          ctx.arc(packetX, packetY, 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(150, 200, 255, ${baseOpacity})`
          ctx.fill()
        }

        // Node glow
        if (isSelected) {
          const nodeGlow = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, nodeRadius * 3)
          nodeGlow.addColorStop(0, `rgba(80, 160, 255, ${baseOpacity * 0.3})`)
          nodeGlow.addColorStop(1, "transparent")
          ctx.fillStyle = nodeGlow
          ctx.beginPath()
          ctx.arc(nodeX, nodeY, nodeRadius * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, nodeRadius, 0, Math.PI * 2)
        ctx.fillStyle = isSelected 
          ? `rgba(100, 180, 255, ${baseOpacity})` 
          : `rgba(80, 120, 180, ${baseOpacity * 0.5})`
        ctx.fill()

        // Model label
        ctx.font = "11px -apple-system, BlinkMacSystemFont, sans-serif"
        ctx.fillStyle = isSelected 
          ? `rgba(255, 255, 255, ${baseOpacity * 0.9})` 
          : `rgba(255, 255, 255, ${baseOpacity * 0.4})`
        ctx.textAlign = "left"
        ctx.fillText(model.name, nodeX + 14, nodeY + 4)

        // Selected indicator
        if (isSelected) {
          ctx.fillStyle = `rgba(100, 255, 150, ${baseOpacity * 0.8})`
          ctx.fillText("● SELECTED", nodeX + 14, nodeY + 18)
        }
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// Privacy Honeycomb Visualization  
function PrivacyVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width * 0.5
      const centerY = height * 0.5

      ctx.clearRect(0, 0, width, height)
      timeRef.current += isHovered ? 0.02 : 0.01

      const baseOpacity = isHovered ? 0.5 : 0.3

      // Hexagon grid
      const hexSize = 28
      const rows = 7
      const cols = 8

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const offsetX = (r % 2) * hexSize * 0.87
          const hx = centerX - cols * hexSize * 0.44 + c * hexSize * 1.74 + offsetX
          const hy = centerY - rows * hexSize * 0.38 + r * hexSize * 1.5

          const dist = Math.sqrt((hx - centerX) ** 2 + (hy - centerY) ** 2)
          const maxDist = Math.min(width, height) * 0.5
          const distFactor = 1 - Math.min(dist / maxDist, 1)
          
          const pulse = Math.sin(timeRef.current * 2 - dist * 0.02) * 0.5 + 0.5
          const opacity = baseOpacity * distFactor * (0.2 + pulse * 0.5)

          // Draw hexagon
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            const px = hx + hexSize * 0.85 * Math.cos(angle)
            const py = hy + hexSize * 0.85 * Math.sin(angle)
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.strokeStyle = `rgba(80, 150, 255, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Inner glow on some hexagons
          if (distFactor > 0.6 && pulse > 0.7) {
            ctx.fillStyle = `rgba(60, 120, 255, ${opacity * 0.15})`
            ctx.fill()
          }
        }
      }

      // Central shield glow
      const shieldGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100)
      shieldGlow.addColorStop(0, `rgba(60, 130, 255, ${baseOpacity * 0.2})`)
      shieldGlow.addColorStop(0.5, `rgba(60, 130, 255, ${baseOpacity * 0.08})`)
      shieldGlow.addColorStop(1, "transparent")
      ctx.fillStyle = shieldGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// System Status Indicator
function StatusIndicator({ states, isHovered }: { states: string[]; isHovered: boolean }) {
  const [currentState, setCurrentState] = useState(0)

  useEffect(() => {
    if (!isHovered) {
      setCurrentState(0)
      return
    }

    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % states.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [isHovered, states.length])

  return (
    <div className="flex flex-col gap-2">
      {states.map((state, i) => (
        <div 
          key={state}
          className={`flex items-center gap-2 transition-all duration-300 ${
            i <= currentState && isHovered ? "opacity-100" : "opacity-30"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            i <= currentState && isHovered ? "bg-blue-400" : "bg-white/30"
          }`} />
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">
            {state}
          </span>
        </div>
      ))}
    </div>
  )
}

// AI Routing Card
function RoutingCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/api-info" className="block">
      <div
        className={`
          relative overflow-hidden rounded-[32px] border
          bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent
          backdrop-blur-sm
          transition-all duration-700 ease-out cursor-pointer
          h-[500px] md:h-[560px]
          ${isHovered 
            ? "border-white/15 shadow-[0_20px_80px_rgba(60,120,200,0.12)] -translate-y-1" 
            : "border-white/[0.06]"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient glow */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(50, 100, 200, 0.12) 0%, transparent 60%)"
          }}
        />

        {/* Visual */}
        <div className="absolute inset-0">
          <RoutingVisual isHovered={isHovered} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 mb-auto">
            AI Routing
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-light text-white/95 mb-4" style={{ letterSpacing: "-0.02em" }}>
              Always choose the optimal model.
            </h3>

            {/* Description */}
            <p className="text-[15px] text-white/45 leading-relaxed mb-8 max-w-md">
              Automatically routes every request to the fastest, most efficient, and most capable AI model for the task.
            </p>

            {/* Metrics */}
            <div className="flex items-center gap-8 mb-8">
              <div>
                <span className="text-2xl font-light text-white/90">72%</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 mt-1">Cost Saved</p>
              </div>
              <div>
                <span className="text-2xl font-light text-white/90">0.9s</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 mt-1">Response</p>
              </div>
              <div className={`transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}>
                <span className="text-[11px] uppercase tracking-[0.1em] text-blue-400/80">● Optimal Selected</span>
              </div>
            </div>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 text-[13px] text-white/50
              transition-all duration-300
              ${isHovered ? "text-white/80 translate-x-1" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// B-STING Privacy Card
function PrivacyCard() {
  const [isHovered, setIsHovered] = useState(false)

  const privacyStates = ["Input Received", "Analyzing", "Protection Applied", "Routing Secure"]

  return (
    <Link href="/b-sting" className="block">
      <div
        className={`
          relative overflow-hidden rounded-[32px] border
          bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent
          backdrop-blur-sm
          transition-all duration-700 ease-out cursor-pointer
          h-[500px] md:h-[560px]
          ${isHovered 
            ? "border-white/15 shadow-[0_20px_80px_rgba(60,120,200,0.12)] -translate-y-1" 
            : "border-white/[0.06]"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient glow */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(50, 100, 200, 0.1) 0%, transparent 60%)"
          }}
        />

        {/* Visual */}
        <div className="absolute inset-0">
          <PrivacyVisual isHovered={isHovered} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
            Privacy Systems
          </span>

          {/* Status indicator */}
          <div className="mb-auto">
            <StatusIndicator states={privacyStates} isHovered={isHovered} />
          </div>

          {/* Bottom content */}
          <div className="mt-auto">
            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-light text-white/95 mb-4" style={{ letterSpacing: "-0.02em" }}>
              Privacy before access.
            </h3>

            {/* Description */}
            <p className="text-[15px] text-white/45 leading-relaxed mb-8 max-w-md">
              Sensitive information is analyzed, protected, and secured before reaching any AI model.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 text-[13px] text-white/50
              transition-all duration-300
              ${isHovered ? "text-white/80 translate-x-1" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function DivisionsSection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Atmospheric background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(20, 45, 100, 0.06) 0%, transparent 50%),
            linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)
          `
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-24">
          <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] mb-6">
            Core Systems
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white/95 mb-6"
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Built for Efficient Intelligence.
          </h2>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto">
            The infrastructure behind faster, smarter, and more private AI.
          </p>
        </div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <RoutingCard />
          <PrivacyCard />
        </div>
      </div>
    </section>
  )
}
