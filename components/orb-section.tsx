"use client"

import { useEffect, useRef, useState } from "react"

interface InteractiveOrbProps {
  isHovered: boolean
}

function InteractiveOrb({ isHovered }: InteractiveOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const orbitAngleRef = useRef(0)
  const glowIntensityRef = useRef(0)

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
      const orbRadius = Math.min(width, height) * 0.35

      ctx.clearRect(0, 0, width, height)

      // Smooth glow transition
      const targetGlow = isHovered ? 1 : 0
      glowIntensityRef.current += (targetGlow - glowIntensityRef.current) * 0.08
      const glow = glowIntensityRef.current

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, orbRadius * 0.5,
        centerX, centerY, orbRadius * 1.8
      )
      outerGlow.addColorStop(0, `rgba(30, 64, 175, ${0.12 + glow * 0.15})`)
      outerGlow.addColorStop(0.5, `rgba(30, 58, 138, ${0.06 + glow * 0.08})`)
      outerGlow.addColorStop(1, "transparent")
      ctx.fillStyle = outerGlow
      ctx.fillRect(0, 0, width, height)

      // Main orb gradient
      const orbGradient = ctx.createRadialGradient(
        centerX - orbRadius * 0.3, centerY - orbRadius * 0.3, 0,
        centerX, centerY, orbRadius
      )
      orbGradient.addColorStop(0, `rgba(${45 + glow * 15}, ${45 + glow * 15}, ${55 + glow * 15}, 1)`)
      orbGradient.addColorStop(0.4, `rgba(${22 + glow * 8}, ${27 + glow * 8}, ${37 + glow * 8}, 1)`)
      orbGradient.addColorStop(0.8, `rgba(${12 + glow * 5}, ${17 + glow * 5}, ${27 + glow * 5}, 1)`)
      orbGradient.addColorStop(1, `rgba(${7 + glow * 3}, ${12 + glow * 3}, ${22 + glow * 3}, 1)`)

      ctx.beginPath()
      ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2)
      ctx.fillStyle = orbGradient
      ctx.fill()

      // Inner subtle glow
      const innerGlow = ctx.createRadialGradient(
        centerX - orbRadius * 0.2, centerY - orbRadius * 0.3, 0,
        centerX, centerY, orbRadius * 0.8
      )
      innerGlow.addColorStop(0, `rgba(59, 130, 246, ${0.08 + glow * 0.2})`)
      innerGlow.addColorStop(0.5, `rgba(30, 64, 175, ${0.04 + glow * 0.1})`)
      innerGlow.addColorStop(1, "transparent")
      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2)
      ctx.fill()

      // Orbit ring
      const orbitRadius = orbRadius * 1.4
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + glow * 0.1})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Orbiting dot - slightly faster on hover
      const speed = 0.004 + glow * 0.003
      orbitAngleRef.current += speed
      const dotX = centerX + Math.cos(orbitAngleRef.current) * orbitRadius
      const dotY = centerY + Math.sin(orbitAngleRef.current) * orbitRadius

      // Dot glow
      const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 10 + glow * 4)
      dotGlow.addColorStop(0, `rgba(255, 255, 255, ${0.7 + glow * 0.25})`)
      dotGlow.addColorStop(0.5, `rgba(147, 197, 253, ${0.25 + glow * 0.15})`)
      dotGlow.addColorStop(1, "transparent")
      ctx.fillStyle = dotGlow
      ctx.beginPath()
      ctx.arc(dotX, dotY, 10 + glow * 4, 0, Math.PI * 2)
      ctx.fill()

      // Dot core
      ctx.beginPath()
      ctx.arc(dotX, dotY, 2.5 + glow * 1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${0.85 + glow * 0.15})`
      ctx.fill()

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
    <section className="py-24 md:py-40 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Orb */}
          <div 
            className="relative aspect-square max-w-lg mx-auto lg:mx-0 w-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <InteractiveOrb isHovered={isHovered} />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            {/* Label */}
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Explore
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
              Understand Intelligence
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Every request is routed through the most efficient model for the job.
            </p>

            {/* Status Card */}
            <div
              className={`mt-4 p-8 border rounded-xl transition-all duration-500 ${
                isHovered 
                  ? "border-white/20 bg-white/[0.03]" 
                  : "border-white/10 bg-transparent"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Status Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isHovered ? "bg-white" : "bg-white/40"
                  }`} />
                  <span className={`text-xs font-medium uppercase tracking-widest transition-all duration-500 ${
                    isHovered ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {isHovered ? "Routing Active" : "Routing Standby"}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground block mb-2">
                      Model
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/60"
                    }`}>
                      {isHovered ? "Micro Model" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground block mb-2">
                      Saved
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/60"
                    }`}>
                      {isHovered ? "91% compute" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground block mb-2">
                      Response
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/60"
                    }`}>
                      {isHovered ? "0.3s" : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
