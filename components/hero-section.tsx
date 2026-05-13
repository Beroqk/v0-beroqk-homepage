"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Interactive routing particles that respond to cursor
function RoutingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const pulseRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener("resize", resize)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Generate routing nodes
    const nodes: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number }[] = []
    const nodeCount = 35
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    // Routing paths - lines that animate between nodes
    const paths: { start: number; end: number; progress: number; speed: number; active: boolean }[] = []
    for (let i = 0; i < 8; i++) {
      paths.push({
        start: Math.floor(Math.random() * nodeCount),
        end: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        active: Math.random() > 0.3,
      })
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, width, height)
      pulseRef.current += 0.006

      const centerX = width / 2
      const centerY = height / 2

      // Update nodes - subtle drift + mouse repulsion
      nodes.forEach((node) => {
        // Base drift
        node.baseX += node.vx
        node.baseY += node.vy

        // Wrap around
        if (node.baseX < -50) node.baseX = width + 50
        if (node.baseX > width + 50) node.baseX = -50
        if (node.baseY < -50) node.baseY = height + 50
        if (node.baseY > height + 50) node.baseY = -50

        // Mouse influence - subtle attraction/repulsion
        const dx = mouse.x - node.baseX
        const dy = mouse.y - node.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 300) * 20

        node.x = node.baseX + (dx / dist) * influence * 0.3
        node.y = node.baseY + (dy / dist) * influence * 0.3
      })

      // Draw connections (faint infrastructure lines)
      const maxDist = 150
      nodes.forEach((node, i) => {
        const distFromCenter = Math.sqrt(
          Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
        )
        const centerFade = Math.max(0, 1 - distFromCenter / 500)

        nodes.forEach((other, j) => {
          if (i >= j) return
          const dist = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.04 * centerFade
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(70, 120, 180, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Draw node
        const nodeOpacity = 0.12 * centerFade + Math.sin(pulseRef.current * 2 + i) * 0.03
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 150, 220, ${nodeOpacity})`
        ctx.fill()
      })

      // Draw animated routing paths
      paths.forEach((path) => {
        if (!path.active) return

        path.progress += path.speed
        if (path.progress > 1) {
          path.progress = 0
          path.start = path.end
          path.end = Math.floor(Math.random() * nodeCount)
        }

        const startNode = nodes[path.start]
        const endNode = nodes[path.end]
        if (!startNode || !endNode) return

        // Draw path line
        ctx.beginPath()
        ctx.moveTo(startNode.x, startNode.y)
        ctx.lineTo(endNode.x, endNode.y)
        ctx.strokeStyle = `rgba(80, 140, 255, 0.08)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw traveling particle
        const px = startNode.x + (endNode.x - startNode.x) * path.progress
        const py = startNode.y + (endNode.y - startNode.y) * path.progress
        
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8)
        gradient.addColorStop(0, `rgba(120, 170, 255, 0.6)`)
        gradient.addColorStop(1, `transparent`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, 0.9)`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}

// Floating HUD routing preview
function RoutingHUD() {
  const [stage, setStage] = useState(0)
  const stages = [
    { label: "STANDBY", model: "—", status: "Awaiting input" },
    { label: "ANALYZING", model: "—", status: "Parsing request..." },
    { label: "ROUTING", model: "Micro", status: "Optimal path found" },
    { label: "SECURED", model: "Micro", status: "Privacy verified" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % stages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const current = stages[stage]

  return (
    <div className="absolute bottom-32 right-8 md:right-16 lg:right-24 hidden md:block">
      <div className="relative">
        {/* HUD frame */}
        <div className="w-48 p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full ${stage > 0 ? 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]' : 'bg-white/30'}`} />
            <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase">
              {current.label}
            </span>
          </div>
          
          {/* Model route */}
          <div className="mb-2">
            <span className="text-[9px] text-white/30 tracking-[0.15em] uppercase block mb-1">Model</span>
            <span className={`text-sm font-light transition-all duration-500 ${stage >= 2 ? 'text-white/90' : 'text-white/30'}`}>
              {current.model}
            </span>
          </div>
          
          {/* Status */}
          <div>
            <span className="text-[9px] text-white/30 tracking-[0.15em] uppercase block mb-1">Status</span>
            <span className="text-[11px] text-white/50">
              {current.status}
            </span>
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-white/20" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-white/20" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-white/20" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-white/20" />
      </div>
    </div>
  )
}

export function HeroSection() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/chat")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-40 lg:pt-48">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Deep layered gradient - tighter core */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 45% 35% at 50% 45%, rgba(100, 150, 255, 0.2) 0%, rgba(50, 90, 200, 0.12) 20%, rgba(25, 50, 120, 0.06) 40%, transparent 60%),
              radial-gradient(ellipse 70% 55% at 50% 48%, rgba(20, 45, 100, 0.1) 0%, rgba(10, 25, 60, 0.05) 50%, transparent 70%),
              linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,1) 100%)
            `
          }}
        />
        
        {/* Bright energy core */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(140, 180, 255, 0.18) 0%, rgba(80, 130, 255, 0.08) 40%, transparent 70%)`,
            animationDuration: '3s',
          }}
        />
        
        {/* Secondary glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(60, 100, 200, 0.08) 0%, transparent 60%)`,
            animationDuration: '5s',
          }}
        />

        {/* Routing particles layer */}
        <RoutingParticles />
        
        {/* Subtle infrastructure grid */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,150,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,150,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Floating HUD */}
      <RoutingHUD />

      {/* Left telemetry */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="space-y-8">
          <div className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
            <div className="mb-1">Routing</div>
            <div className="text-white/40">Adaptive</div>
          </div>
          <div className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
            <div className="mb-1">Privacy</div>
            <div className="text-white/40">Active</div>
          </div>
          <div className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
            <div className="mb-1">Compute</div>
            <div className="text-white/40">Optimized</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Main Title - larger, more elegant */}
        <h1 
          className="text-[80px] md:text-[120px] lg:text-[160px] font-extralight uppercase text-white mb-6"
          style={{ letterSpacing: '-0.04em', lineHeight: 0.9 }}
        >
          BEROQK
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/40 font-light mb-16 tracking-wide">
          Intelligent routing for efficient AI
        </p>

        {/* Input field - refined glass style */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What do you want to know?"
              className={`
                w-full h-14 px-6 pr-14 
                bg-black/50 backdrop-blur-lg
                border border-white/10 rounded-xl 
                text-white placeholder:text-white/30 
                focus:outline-none focus:border-blue-500/40 
                transition-all duration-500 
                font-light text-base tracking-wide
                ${isFocused ? 'shadow-[0_0_40px_rgba(60,120,255,0.12)] border-white/20' : ''}
              `}
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-all duration-300"
              aria-label="Submit"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>

        {/* CTAs - dark glass style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chat"
            className="px-8 py-3.5 text-[13px] font-medium tracking-[0.1em] uppercase rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(80,140,255,0.15)] transition-all duration-500"
          >
            Try Beroqk
          </Link>
          <Link
            href="/company"
            className="px-8 py-3.5 text-[13px] font-medium tracking-[0.1em] uppercase rounded-lg text-white/40 hover:text-white/70 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 flex items-center justify-center gap-8 md:gap-12">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase">Adaptive Model Routing</span>
          <span className="text-white/10">|</span>
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase">Privacy-First Architecture</span>
          <span className="text-white/10 hidden sm:block">|</span>
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase hidden sm:block">Optimized Compute</span>
        </div>
      </div>
    </section>
  )
}
