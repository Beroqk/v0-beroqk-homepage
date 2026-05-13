"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Infrastructure routing topology visualization
function InfrastructureVisualization() {
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
    window.addEventListener("resize", resize)

    // Define infrastructure nodes - compute clusters
    const nodes: { x: number; y: number; size: number; type: 'core' | 'edge' | 'endpoint' }[] = []
    
    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width * 0.5
      const centerY = height * 0.5

      ctx.clearRect(0, 0, width, height)
      timeRef.current += 0.008

      // Regenerate nodes if empty
      if (nodes.length === 0) {
        // Core nodes (central cluster)
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2 - Math.PI / 2
          nodes.push({
            x: centerX + Math.cos(angle) * 60,
            y: centerY + Math.sin(angle) * 60,
            size: 8,
            type: 'core'
          })
        }
        // Edge nodes (middle ring)
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const dist = 140 + Math.sin(i * 1.5) * 20
          nodes.push({
            x: centerX + Math.cos(angle) * dist,
            y: centerY + Math.sin(angle) * dist,
            size: 5,
            type: 'edge'
          })
        }
        // Endpoint nodes (outer)
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2 + 0.2
          const dist = 220 + Math.sin(i * 2) * 30
          nodes.push({
            x: centerX + Math.cos(angle) * dist,
            y: centerY + Math.sin(angle) * dist,
            size: 3,
            type: 'endpoint'
          })
        }
      }

      // Draw connections
      const coreNodes = nodes.filter(n => n.type === 'core')
      const edgeNodes = nodes.filter(n => n.type === 'edge')
      const endpointNodes = nodes.filter(n => n.type === 'endpoint')

      // Core to core connections
      coreNodes.forEach((node, i) => {
        coreNodes.forEach((other, j) => {
          if (i < j) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)'
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        })
      })

      // Core to edge connections
      coreNodes.forEach(core => {
        edgeNodes.forEach((edge, i) => {
          if (i % 3 === 0) {
            const pulse = Math.sin(timeRef.current * 2 + i) * 0.3 + 0.3
            ctx.beginPath()
            ctx.moveTo(core.x, core.y)
            ctx.lineTo(edge.x, edge.y)
            ctx.strokeStyle = `rgba(80, 130, 220, ${pulse})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      // Edge to edge connections
      edgeNodes.forEach((node, i) => {
        const next = edgeNodes[(i + 1) % edgeNodes.length]
        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(next.x, next.y)
        ctx.strokeStyle = 'rgba(80, 130, 220, 0.15)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Edge to endpoint connections
      edgeNodes.forEach((edge, i) => {
        endpointNodes.forEach((endpoint, j) => {
          const dist = Math.sqrt((edge.x - endpoint.x) ** 2 + (edge.y - endpoint.y) ** 2)
          if (dist < 120) {
            const pulse = Math.sin(timeRef.current * 3 + i + j * 0.5) * 0.5 + 0.5
            ctx.beginPath()
            ctx.moveTo(edge.x, edge.y)
            ctx.lineTo(endpoint.x, endpoint.y)
            ctx.strokeStyle = `rgba(60, 100, 180, ${0.08 * pulse})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw traveling data packets
      const packetCount = 6
      for (let i = 0; i < packetCount; i++) {
        const t = (timeRef.current * 0.5 + i / packetCount) % 1
        const sourceIdx = i % coreNodes.length
        const targetIdx = (i * 3) % edgeNodes.length
        const source = coreNodes[sourceIdx]
        const target = edgeNodes[targetIdx]
        
        const px = source.x + (target.x - source.x) * t
        const py = source.y + (target.y - source.y) * t
        
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 200, 255, ${0.8 - t * 0.5})`
        ctx.fill()
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(timeRef.current * 2 + i * 0.5) * 0.3 + 0.7

        // Glow for core nodes
        if (node.type === 'core') {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3)
          glow.addColorStop(0, 'rgba(100, 150, 255, 0.15)')
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)
        
        if (node.type === 'core') {
          ctx.fillStyle = 'rgba(150, 180, 255, 0.9)'
        } else if (node.type === 'edge') {
          ctx.fillStyle = 'rgba(120, 160, 230, 0.6)'
        } else {
          ctx.fillStyle = 'rgba(100, 140, 200, 0.35)'
        }
        ctx.fill()
      })

      // Subtle outer ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(60, 100, 180, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

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
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 70% 50%, rgba(20, 40, 100, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(15, 30, 80, 0.1) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,1) 100%)
          `
        }}
      />

      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,150,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,150,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] mb-8">
              Beroqk Infrastructure
            </p>

            {/* Headline */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Infrastructure for<br />
              <span className="text-white/80">Intelligent AI</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 max-w-lg">
              Adaptive routing, privacy-first execution, and scalable AI systems built for enterprise deployment.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/api-info"
                className="inline-flex items-center gap-2 px-8 h-14 text-sm font-medium uppercase tracking-[0.1em] rounded-lg bg-white/[0.08] border border-white/15 text-white hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 group"
              >
                Explore Platform
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/company"
                className="inline-flex items-center gap-2 px-8 h-14 text-sm font-medium uppercase tracking-[0.1em] rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                View Architecture
              </Link>
            </div>

            {/* Telemetry line */}
            <div className="mt-16 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="text-[11px] text-white/30 uppercase tracking-[0.2em]">Systems Online</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <span className="text-[11px] text-white/25 uppercase tracking-[0.15em]">Latency: 12ms</span>
              <div className="h-3 w-px bg-white/10" />
              <span className="text-[11px] text-white/25 uppercase tracking-[0.15em]">Nodes: 847</span>
            </div>
          </div>

          {/* Right: Infrastructure visualization */}
          <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]">
            <InfrastructureVisualization />
            
            {/* Floating labels */}
            <div className="absolute top-8 right-8 text-[10px] text-white/25 uppercase tracking-[0.2em]">
              Routing Topology
            </div>
            <div className="absolute bottom-12 left-8 text-[10px] text-white/20 uppercase tracking-[0.2em]">
              Live Inference Network
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
