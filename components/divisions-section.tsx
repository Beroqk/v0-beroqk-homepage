"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const divisions = [
  {
    number: "01",
    title: "AI ROUTING",
    description: "Intelligent model selection and request optimization for maximum efficiency.",
    visual: "routing",
  },
  {
    number: "02",
    title: "PRIVACY SYSTEMS",
    description: "Active protection layers that secure data before access.",
    visual: "privacy",
  },
  {
    number: "03",
    title: "API INFRASTRUCTURE",
    description: "Enterprise-grade systems architecture built for scale.",
    visual: "api",
  },
  {
    number: "04",
    title: "MULTIMODAL INTELLIGENCE",
    description: "Unified processing across text, vision, and audio modalities.",
    visual: "multimodal",
  },
  {
    number: "05",
    title: "MEMORY SYSTEMS",
    description: "Persistent context and knowledge graph architecture.",
    visual: "memory",
  },
  {
    number: "06",
    title: "AUTONOMOUS AGENTS",
    description: "Self-directed AI systems for complex task execution.",
    visual: "agents",
  },
]

// Visual background component for each card
function CardVisual({ type, isHovered }: { type: string; isHovered: boolean }) {
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
      const centerX = width / 2
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)
      timeRef.current += isHovered ? 0.02 : 0.008

      const baseOpacity = isHovered ? 0.4 : 0.2
      const glowOpacity = isHovered ? 0.15 : 0.05

      if (type === "routing") {
        // Orbital routing network
        const nodeCount = 8
        const orbitRadius = Math.min(width, height) * 0.35
        
        // Draw orbit
        ctx.beginPath()
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw nodes and connections
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 + timeRef.current
          const x = centerX + Math.cos(angle) * orbitRadius
          const y = centerY + Math.sin(angle) * orbitRadius * 0.6

          // Connection to center
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Node
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(150, 180, 255, ${baseOpacity})`
          ctx.fill()
        }

        // Center core
        const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20)
        coreGlow.addColorStop(0, `rgba(100, 150, 255, ${glowOpacity})`)
        coreGlow.addColorStop(1, "transparent")
        ctx.fillStyle = coreGlow
        ctx.beginPath()
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
        ctx.fill()

      } else if (type === "privacy") {
        // Honeycomb shield
        const hexSize = 20
        const rows = 4
        const cols = 5

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const offsetX = (r % 2) * hexSize * 0.9
            const hx = centerX - cols * hexSize * 0.45 + c * hexSize * 1.8 + offsetX
            const hy = centerY - rows * hexSize * 0.4 + r * hexSize * 1.5

            const dist = Math.sqrt((hx - centerX) ** 2 + (hy - centerY) ** 2)
            const pulse = Math.sin(timeRef.current * 2 - dist * 0.05) * 0.5 + 0.5
            const opacity = baseOpacity * (0.3 + pulse * 0.3)

            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i - Math.PI / 6
              const px = hx + hexSize * 0.8 * Math.cos(angle)
              const py = hy + hexSize * 0.8 * Math.sin(angle)
              if (i === 0) ctx.moveTo(px, py)
              else ctx.lineTo(px, py)
            }
            ctx.closePath()
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

      } else if (type === "api") {
        // Server grid
        const gridSize = 6
        const spacing = Math.min(width, height) * 0.12

        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const gx = centerX + (i - gridSize / 2 + 0.5) * spacing
            const gy = centerY + (j - gridSize / 2 + 0.5) * spacing
            const pulse = Math.sin(timeRef.current * 3 + i + j) * 0.5 + 0.5
            const opacity = baseOpacity * (0.2 + pulse * 0.4)

            ctx.fillStyle = `rgba(100, 150, 255, ${opacity})`
            ctx.fillRect(gx - 2, gy - 2, 4, 4)
          }
        }

        // Grid lines
        ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.15})`
        ctx.lineWidth = 0.5
        for (let i = 0; i <= gridSize; i++) {
          const pos = centerX + (i - gridSize / 2) * spacing
          ctx.beginPath()
          ctx.moveTo(pos, centerY - gridSize / 2 * spacing)
          ctx.lineTo(pos, centerY + gridSize / 2 * spacing)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(centerX - gridSize / 2 * spacing, centerY + (i - gridSize / 2) * spacing)
          ctx.lineTo(centerX + gridSize / 2 * spacing, centerY + (i - gridSize / 2) * spacing)
          ctx.stroke()
        }

      } else if (type === "multimodal") {
        // Neural sphere
        const radius = Math.min(width, height) * 0.3
        const segments = 12

        // Latitude lines
        for (let i = 1; i < segments / 2; i++) {
          const lat = (i / (segments / 2)) * Math.PI - Math.PI / 2
          const y = centerY + Math.sin(lat) * radius
          const r = Math.cos(lat) * radius

          ctx.beginPath()
          ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.3})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Longitude lines
        for (let i = 0; i < segments; i++) {
          const lng = (i / segments) * Math.PI + timeRef.current * 0.5
          const x = Math.cos(lng)

          ctx.beginPath()
          for (let j = 0; j <= 30; j++) {
            const lat = (j / 30) * Math.PI - Math.PI / 2
            const py = centerY + Math.sin(lat) * radius
            const px = centerX + x * Math.cos(lat) * radius
            if (j === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.25})`
          ctx.stroke()
        }

        // Core glow
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.5)
        glow.addColorStop(0, `rgba(80, 120, 255, ${glowOpacity})`)
        glow.addColorStop(1, "transparent")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2)
        ctx.fill()

      } else if (type === "memory") {
        // Memory topology / node graph
        const nodes = 12
        const nodePositions: { x: number; y: number }[] = []

        for (let i = 0; i < nodes; i++) {
          const angle = (i / nodes) * Math.PI * 2 + Math.sin(timeRef.current + i) * 0.1
          const dist = Math.min(width, height) * (0.2 + Math.sin(i * 0.8) * 0.1)
          nodePositions.push({
            x: centerX + Math.cos(angle) * dist,
            y: centerY + Math.sin(angle) * dist,
          })
        }

        // Connections
        for (let i = 0; i < nodes; i++) {
          for (let j = i + 1; j < nodes; j++) {
            if (Math.random() > 0.7 || (i + j) % 3 === 0) {
              const pulse = Math.sin(timeRef.current * 2 + i + j) * 0.5 + 0.5
              ctx.beginPath()
              ctx.moveTo(nodePositions[i].x, nodePositions[i].y)
              ctx.lineTo(nodePositions[j].x, nodePositions[j].y)
              ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.15 * pulse})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }

        // Nodes
        nodePositions.forEach((pos, i) => {
          const pulse = Math.sin(timeRef.current * 2 + i) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 3 + pulse * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(150, 180, 255, ${baseOpacity * (0.5 + pulse * 0.5)})`
          ctx.fill()
        })

      } else if (type === "agents") {
        // Digital control system / robotic interface
        const ringCount = 3
        
        for (let r = 0; r < ringCount; r++) {
          const radius = Math.min(width, height) * (0.15 + r * 0.1)
          const rotation = timeRef.current * (r % 2 === 0 ? 1 : -1) * 0.5

          // Arc segments
          const segments = 4 + r * 2
          for (let s = 0; s < segments; s++) {
            const startAngle = (s / segments) * Math.PI * 2 + rotation
            const endAngle = startAngle + Math.PI / segments * 0.8

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, startAngle, endAngle)
            ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * (0.3 + r * 0.1)})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }

        // Center point
        ctx.beginPath()
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 180, 255, ${baseOpacity})`
        ctx.fill()

        // Crosshairs
        ctx.strokeStyle = `rgba(100, 150, 255, ${baseOpacity * 0.3})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(centerX - 30, centerY)
        ctx.lineTo(centerX - 10, centerY)
        ctx.moveTo(centerX + 10, centerY)
        ctx.lineTo(centerX + 30, centerY)
        ctx.moveTo(centerX, centerY - 30)
        ctx.lineTo(centerX, centerY - 10)
        ctx.moveTo(centerX, centerY + 10)
        ctx.lineTo(centerX, centerY + 30)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [type, isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}

function DivisionCard({ division, index }: { division: typeof divisions[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border border-white/5
        bg-gradient-to-b from-white/[0.03] to-transparent
        backdrop-blur-sm
        transition-all duration-500 ease-out
        ${isHovered ? "border-white/15 shadow-[0_0_40px_rgba(80,120,255,0.08)] -translate-y-1" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(40, 80, 180, 0.08) 0%, transparent 70%)"
        }}
      />

      {/* Visual background */}
      <div className="absolute inset-0 opacity-60">
        <CardVisual type={division.visual} isHovered={isHovered} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col min-h-[280px]">
        {/* Division number */}
        <span className="text-xs text-muted-foreground/40 font-mono tracking-widest mb-4">
          {division.number}
        </span>

        {/* Title */}
        <h3 className="text-sm md:text-base font-medium tracking-wide text-foreground/90 mb-3">
          {division.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-muted-foreground/60 leading-relaxed flex-grow">
          {division.description}
        </p>

        {/* CTA */}
        <div className={`
          flex items-center gap-2 mt-6 text-xs text-muted-foreground/40
          transition-all duration-300
          ${isHovered ? "text-muted-foreground/70 translate-x-1" : ""}
        `}>
          <span className="uppercase tracking-wider">Explore</span>
          <ArrowRight size={12} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </div>
      </div>
    </div>
  )
}

export function DivisionsSection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Deep atmospheric background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(20, 40, 100, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 20% 50%, rgba(30, 50, 120, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 80% 50%, rgba(30, 50, 120, 0.05) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)
          `
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs text-muted-foreground/50 uppercase tracking-[0.3em] mb-4">
            Divisions
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground/90">
            Our Systems
          </h2>
        </div>

        {/* Division grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {divisions.map((division, index) => (
            <DivisionCard key={division.number} division={division} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
