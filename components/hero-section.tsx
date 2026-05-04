"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

// Subtle neural network background
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
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

    // Generate sparse node positions
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const nodeCount = 25
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      })
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      pulseRef.current += 0.008

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Wrap around edges
        if (node.x < 0) node.x = width
        if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        if (node.y > height) node.y = 0
      })

      // Draw connections
      const centerX = width / 2
      const centerY = height / 2
      const maxDist = 180

      nodes.forEach((node, i) => {
        // Distance from center affects visibility
        const distFromCenter = Math.sqrt(
          Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
        )
        const centerFade = Math.max(0, 1 - distFromCenter / 600)

        nodes.forEach((other, j) => {
          if (i >= j) return
          const dist = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.06 * centerFade
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(80, 130, 200, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Draw node
        const nodeOpacity = 0.08 * centerFade + Math.sin(pulseRef.current + i) * 0.02
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 150, 220, ${nodeOpacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ display: "block" }}
    />
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
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0">
        {/* Deep layered gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 50% 42%, rgba(120, 160, 255, 0.35) 0%, rgba(60, 100, 255, 0.2) 15%, rgba(30, 60, 180, 0.12) 30%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 50% 45%, rgba(20, 50, 150, 0.15) 0%, rgba(10, 25, 80, 0.08) 40%, transparent 65%),
              linear-gradient(to bottom, rgba(0,0,0,0.97) 0%, rgba(0,0,0,1) 100%)
            `
          }}
        />
        
        {/* Bright core center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(150, 180, 255, 0.25) 0%, rgba(80, 120, 255, 0.15) 30%, transparent 60%)`,
            animationDuration: '3s',
          }}
        />
        
        {/* Pulsing core glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(70, 110, 255, 0.12) 0%, rgba(40, 80, 200, 0.05) 40%, transparent 65%)`,
            animationDuration: '4s',
          }}
        />
        
        {/* Secondary breathing glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(40, 80, 200, 0.06) 0%, transparent 55%)`,
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        />

        {/* Neural network layer */}
        <NeuralBackground />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,150,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,150,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-16 text-balance uppercase text-white">
          BEROQK
        </h1>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What do you want to know?"
              className={`
                w-full h-14 md:h-16 px-6 pr-14 
                bg-black/60 backdrop-blur-md
                border border-white/15 rounded-xl 
                text-white placeholder:text-white/40 
                focus:outline-none focus:border-blue-400/50 
                transition-all duration-300 
                font-sans text-base md:text-lg
                ${isFocused ? 'shadow-[0_0_30px_rgba(60,130,255,0.15)]' : ''}
              `}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white/80 transition-colors duration-200"
              aria-label="Submit"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          <button
            type="submit"
            className="mt-8 px-8 h-12 text-sm font-medium rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 text-white/90 hover:border-white/40 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(100,150,255,0.1)] transition-all duration-300 group"
          >
            Start Conversation
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </form>

        {/* Routing Status Line */}
        <p className="mt-10 text-xs text-white/25 tracking-widest uppercase">
          Auto Routing Enabled • Optimizing for efficiency
        </p>
      </div>
    </section>
  )
}
