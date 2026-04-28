"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const suggestions = [
  "How can AI reduce compute?",
  "Why does efficiency matter?",
  "What model should answer this?",
  "How does Beroqk save cost?",
]

function InteractiveOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const orbitAngleRef = useRef(0)
  const globeRotationRef = useRef(0)

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

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const globeRadius = Math.min(width, height) * 0.35

      ctx.clearRect(0, 0, width, height)

      // Globe rotation
      globeRotationRef.current += 0.003

      // Draw latitude lines (horizontal circles)
      const latitudes = 7
      for (let i = 1; i < latitudes; i++) {
        const lat = (i / latitudes) * Math.PI - Math.PI / 2
        const y = centerY + Math.sin(lat) * globeRadius
        const radiusAtLat = Math.cos(lat) * globeRadius

        ctx.beginPath()
        ctx.ellipse(centerX, y, radiusAtLat, radiusAtLat * 0.3, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - Math.abs(lat) * 0.05})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw longitude lines (vertical arcs)
      const longitudes = 12
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI + globeRotationRef.current
        const x = Math.cos(lng)
        const z = Math.sin(lng)

        // Only draw visible half
        if (z > -0.3) {
          ctx.beginPath()
          for (let j = 0; j <= 50; j++) {
            const lat = (j / 50) * Math.PI - Math.PI / 2
            const py = centerY + Math.sin(lat) * globeRadius
            const radiusAtLat = Math.cos(lat) * globeRadius
            const px = centerX + x * radiusAtLat

            if (j === 0) {
              ctx.moveTo(px, py)
            } else {
              ctx.lineTo(px, py)
            }
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + z * 0.08})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Globe outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Equator line (slightly brighter)
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, globeRadius, globeRadius * 0.3, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Orbit ring
      const orbitRadius = globeRadius * 1.4
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Orbiting dot
      orbitAngleRef.current += 0.005
      const dotX = centerX + Math.cos(orbitAngleRef.current) * orbitRadius
      const dotY = centerY + Math.sin(orbitAngleRef.current) * orbitRadius

      // Dot glow
      const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12)
      dotGlow.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      dotGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
      dotGlow.addColorStop(1, "transparent")
      ctx.fillStyle = dotGlow
      ctx.beginPath()
      ctx.arc(dotX, dotY, 12, 0, Math.PI * 2)
      ctx.fill()

      // Dot core
      ctx.beginPath()
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fill()

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

export function OrbSection() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/chat?q=${encodeURIComponent(query)}`
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Orb */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
            <InteractiveOrb />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            {/* Label */}
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Explore
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight">
              Understand Intelligence
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Ask anything. Beroqk routes every question through efficient AI.
            </p>

            {/* Input */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to know?"
                className="w-full h-14 px-5 pr-14 bg-background/80 border border-white/15 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/40 focus:shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all duration-200 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Submit"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Suggestion Pills */}
            <div className="flex flex-wrap gap-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 text-sm text-muted-foreground border border-white/10 rounded-full hover:border-white/30 hover:text-foreground transition-all duration-200 bg-background/50 backdrop-blur-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
