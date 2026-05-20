"use client"

import { useEffect, useRef, useState } from "react"

interface MinimalGlobeProps {
  isHovered: boolean
}

// Minimal white wireframe globe
function MinimalGlobe({ isHovered }: MinimalGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const rotationRef = useRef(0)

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
      const globeRadius = Math.min(width, height) * 0.38

      ctx.clearRect(0, 0, width, height)

      // Rotation speed
      rotationRef.current += isHovered ? 0.004 : 0.002

      const baseOpacity = isHovered ? 0.25 : 0.12
      const lineOpacity = isHovered ? 0.15 : 0.08

      // Globe outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Latitude lines (5 lines)
      const latitudes = 5
      for (let i = 1; i < latitudes; i++) {
        const lat = (i / latitudes) * Math.PI - Math.PI / 2
        const y = centerY + Math.sin(lat) * globeRadius
        const radiusAtLat = Math.cos(lat) * globeRadius

        ctx.beginPath()
        ctx.ellipse(centerX, y, radiusAtLat, radiusAtLat * 0.2, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Longitude lines (8 lines)
      const longitudes = 8
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI + rotationRef.current
        const x = Math.cos(lng)
        const z = Math.sin(lng)

        if (z > -0.3) {
          ctx.beginPath()
          for (let j = 0; j <= 40; j++) {
            const lat = (j / 40) * Math.PI - Math.PI / 2
            const py = centerY + Math.sin(lat) * globeRadius
            const radiusAtLat = Math.cos(lat) * globeRadius
            const px = centerX + x * radiusAtLat

            if (j === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity + z * 0.03})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Equator (slightly brighter)
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, globeRadius, globeRadius * 0.2, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`
      ctx.lineWidth = 0.7
      ctx.stroke()

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}

export function OrbSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            {/* Label */}
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
              Explore
            </span>

            {/* Headline */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white/95"
              style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Routing Intelligence
            </h2>

            {/* Description */}
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md">
              Every request is routed through the most efficient model for the job.
            </p>

            {/* Status Card */}
            <div
              className={`mt-4 p-8 border rounded-xl transition-all duration-500 ${
                isHovered 
                  ? "border-white/20 bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Status Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isHovered ? "bg-white" : "bg-white/40"
                  }`} />
                  <span className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
                    isHovered ? "text-white" : "text-white/50"
                  }`}>
                    {isHovered ? "Routing Active" : "Routing Standby"}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35 block mb-2">
                      Model
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-white" : "text-white/30"
                    }`}>
                      {isHovered ? "Micro Model" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35 block mb-2">
                      Saved
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-white" : "text-white/30"
                    }`}>
                      {isHovered ? "91% compute" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35 block mb-2">
                      Response
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-white" : "text-white/30"
                    }`}>
                      {isHovered ? "0.3s" : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimal Wireframe Globe */}
          <div 
            className="relative aspect-square max-w-lg mx-auto lg:mx-0 w-full cursor-pointer order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MinimalGlobe isHovered={isHovered} />
          </div>
        </div>
      </div>
    </section>
  )
}
