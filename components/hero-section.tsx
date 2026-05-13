"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react"

// Routing matrix background with animated nodes
function RoutingMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

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

    // Generate routing nodes
    const nodes: { x: number; y: number; size: number; pulse: number; speed: number }[] = []
    const nodeCount = 40
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      })
    }

    // Generate routing paths
    const paths: { from: number; to: number; progress: number; active: boolean }[] = []
    for (let i = 0; i < 15; i++) {
      paths.push({
        from: Math.floor(Math.random() * nodeCount),
        to: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        active: Math.random() > 0.5,
      })
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height * 0.45

      ctx.clearRect(0, 0, width, height)
      timeRef.current += 0.008

      // Draw grid overlay
      ctx.strokeStyle = "rgba(60, 100, 180, 0.03)"
      ctx.lineWidth = 0.5
      const gridSize = 60
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw routing paths with animated pulses
      paths.forEach((path, i) => {
        if (!path.active) return
        const fromNode = nodes[path.from]
        const toNode = nodes[path.to]
        
        // Animate progress
        path.progress += 0.003
        if (path.progress > 1) {
          path.progress = 0
          path.from = path.to
          path.to = Math.floor(Math.random() * nodeCount)
        }

        // Draw path line
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = "rgba(80, 140, 255, 0.06)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw moving pulse on path
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * path.progress
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * path.progress
        
        const pulseGlow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8)
        pulseGlow.addColorStop(0, "rgba(100, 160, 255, 0.4)")
        pulseGlow.addColorStop(1, "transparent")
        ctx.fillStyle = pulseGlow
        ctx.beginPath()
        ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const distFromCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2)
        const centerFade = Math.max(0, 1 - distFromCenter / 600)
        const pulse = Math.sin(timeRef.current * node.speed + node.pulse) * 0.5 + 0.5
        
        // Node glow
        const opacity = (0.1 + pulse * 0.15) * centerFade
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size + pulse * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 160, 255, ${opacity})`
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
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}

// Interactive routing demo HUD
function RoutingDemo() {
  const [demoState, setDemoState] = useState<"idle" | "analyzing" | "routing" | "complete">("idle")
  const [query, setQuery] = useState("")
  const [displayText, setDisplayText] = useState("")
  const [metrics, setMetrics] = useState({ savings: 0, time: 0, model: "" })
  
  const sampleQueries = [
    { text: "Build a Python trading bot", savings: 72, time: 1.1, model: "MICRO-7B" },
    { text: "Summarize this legal contract", savings: 85, time: 0.8, model: "NANO-3B" },
    { text: "Generate product images", savings: 45, time: 2.3, model: "VISION-PRO" },
    { text: "Translate to 12 languages", savings: 91, time: 0.4, model: "MICRO-7B" },
  ]

  const runDemo = (selectedQuery?: typeof sampleQueries[0]) => {
    const q = selectedQuery || sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
    setQuery(q.text)
    setDemoState("analyzing")
    
    // Typing effect
    let i = 0
    const typeInterval = setInterval(() => {
      setDisplayText(q.text.slice(0, i))
      i++
      if (i > q.text.length) clearInterval(typeInterval)
    }, 30)

    setTimeout(() => setDemoState("routing"), 1200)
    setTimeout(() => {
      setDemoState("complete")
      setMetrics({ savings: q.savings, time: q.time, model: q.model })
    }, 2400)
    setTimeout(() => setDemoState("idle"), 6000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* HUD Panel */}
      <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        {/* Animated border glow */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          demoState !== "idle" ? "opacity-100" : "opacity-0"
        }`} style={{
          boxShadow: "inset 0 0 30px rgba(80, 140, 255, 0.1), 0 0 40px rgba(80, 140, 255, 0.05)"
        }} />
        
        {/* Top status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              demoState === "idle" ? "bg-white/30" :
              demoState === "analyzing" ? "bg-yellow-400 animate-pulse" :
              demoState === "routing" ? "bg-blue-400 animate-pulse" :
              "bg-emerald-400"
            }`} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              {demoState === "idle" ? "Ready" :
               demoState === "analyzing" ? "Analyzing Request..." :
               demoState === "routing" ? "Routing to Optimal Model..." :
               "Route Complete"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/30">BEROQK ROUTER v2.1</span>
        </div>

        {/* Input area */}
        <div className="p-5">
          <div className="relative">
            <input
              type="text"
              value={demoState !== "idle" ? displayText : query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a request to route..."
              className="w-full h-14 px-5 pr-14 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 transition-all text-[15px]"
              onKeyDown={(e) => e.key === "Enter" && demoState === "idle" && runDemo()}
              disabled={demoState !== "idle"}
            />
            <button
              onClick={() => runDemo()}
              disabled={demoState !== "idle"}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white text-sm transition-all disabled:opacity-50"
            >
              Route
            </button>
          </div>

          {/* Quick demo buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {sampleQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => runDemo(q)}
                disabled={demoState !== "idle"}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white/50 hover:text-white/80 hover:border-white/20 transition-all disabled:opacity-30"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>

        {/* Results panel */}
        <div className={`border-t border-white/5 overflow-hidden transition-all duration-500 ${
          demoState === "complete" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="p-5 grid grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 block mb-1">Model Selected</span>
              <span className="text-lg font-light text-blue-400">{metrics.model}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 block mb-1">Compute Saved</span>
              <span className="text-lg font-light text-emerald-400">{metrics.savings}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 block mb-1">Response Time</span>
              <span className="text-lg font-light text-white/90">{metrics.time}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Metrics strip component
function MetricsStrip() {
  const metrics = [
    { icon: Zap, value: "72%", label: "Lower Compute" },
    { icon: Cpu, value: "1.1s", label: "Avg Response" },
    { icon: Shield, value: "100%", label: "Privacy First" },
  ]

  return (
    <div className="flex items-center justify-center gap-8 md:gap-16 py-8 border-t border-b border-white/5">
      {metrics.map((metric, i) => (
        <div key={i} className="flex items-center gap-3">
          <metric.icon size={16} className="text-blue-400/60" />
          <div>
            <span className="text-lg md:text-xl font-light text-white/90">{metric.value}</span>
            <span className="text-[11px] uppercase tracking-[0.1em] text-white/40 ml-2">{metric.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Deep gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 35%, rgba(40, 80, 180, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20, 50, 120, 0.1) 0%, transparent 65%),
              linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%)
            `
          }}
        />
        
        {/* Core energy */}
        <div 
          className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(80, 140, 255, 0.2) 0%, rgba(60, 100, 200, 0.1) 30%, transparent 60%)`,
            animationDuration: '4s',
          }}
        />

        {/* Routing matrix */}
        <RoutingMatrixBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        {/* Headline section */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-blue-400/60 mb-6">
            AI Infrastructure
          </p>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6"
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Intelligence,
            <br />
            <span className="text-white/60">Optimized.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            The AI routing layer that automatically selects the most efficient model for every request. Reduce compute costs by up to 90%.
          </p>
        </div>

        {/* Interactive routing demo */}
        <div className="mb-12">
          <RoutingDemo />
        </div>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => router.push("/chat")}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all text-sm group"
          >
            Route a Request
            <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push("/company")}
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all text-sm"
          >
            Explore Infrastructure
          </button>
        </div>

        {/* Metrics strip */}
        <MetricsStrip />
      </div>
    </section>
  )
}
