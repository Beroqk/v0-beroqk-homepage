"use client"

import { useState, useEffect, useRef } from "react"

// Honeycomb Network Component
function HoneycombNetwork() {
  const [isHovered, setIsHovered] = useState(false)
  const [rippleStep, setRippleStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const pulseRef = useRef(0)

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

    const drawHex = (cx: number, cy: number, size: number, opacity: number, glowIntensity: number = 0) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const x = cx + size * Math.cos(angle)
        const y = cy + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      if (glowIntensity > 0) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.5)
        gradient.addColorStop(0, `rgba(59, 130, 246, ${glowIntensity * 0.15})`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const hexSize = Math.min(width, height) * 0.12

      ctx.clearRect(0, 0, width, height)

      // Slow pulse animation
      pulseRef.current += 0.015
      const pulse = Math.sin(pulseRef.current) * 0.1 + 0.9

      // Hex positions (center + 6 surrounding)
      const hexPositions = [
        { x: 0, y: 0, ring: 0 }, // center
        { x: 0, y: -hexSize * 1.8, ring: 1 },
        { x: hexSize * 1.55, y: -hexSize * 0.9, ring: 1 },
        { x: hexSize * 1.55, y: hexSize * 0.9, ring: 1 },
        { x: 0, y: hexSize * 1.8, ring: 1 },
        { x: -hexSize * 1.55, y: hexSize * 0.9, ring: 1 },
        { x: -hexSize * 1.55, y: -hexSize * 0.9, ring: 1 },
      ]

      hexPositions.forEach((pos, index) => {
        const hx = centerX + pos.x
        const hy = centerY + pos.y

        let opacity = pos.ring === 0 ? 0.3 * pulse : 0.12
        let glow = pos.ring === 0 ? pulse : 0

        if (isHovered) {
          if (pos.ring === 0) {
            opacity = 0.5
            glow = 1.2
          } else if (rippleStep >= index) {
            opacity = 0.25
            glow = 0.4
          }
        }

        drawHex(hx, hy, hexSize, opacity, glow)
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered, rippleStep])

  // Ripple effect on hover
  useEffect(() => {
    if (isHovered) {
      let step = 1
      const interval = setInterval(() => {
        setRippleStep(step)
        step++
        if (step > 6) clearInterval(interval)
      }, 80)
      return () => clearInterval(interval)
    } else {
      setRippleStep(0)
    }
  }, [isHovered])

  return (
    <div
      className="relative w-full max-w-md mx-auto aspect-square cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  )
}

// System States Component
function SystemStates() {
  const states = [
    "INPUT RECEIVED",
    "ANALYZING",
    "PROTECTION APPLIED",
    "ROUTING SECURE",
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      {states.map((state, index) => (
        <p
          key={index}
          className="text-sm text-muted-foreground/50 tracking-widest font-light"
        >
          {state}
        </p>
      ))}
    </div>
  )
}

export default function BStingPage() {
  const steps = [
    { label: "Intercept" },
    { label: "Analyze" },
    { label: "Protect" },
    { label: "Route" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-56 lg:pt-64 pb-32">
        
        {/* Hero Section */}
        <section className="text-center mb-40">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
            B-STING
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 font-light mb-4">
            Privacy, enforced before access.
          </p>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            B-STING operates before any model interaction begins.
          </p>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-40" />

        {/* What it is Section */}
        <section className="text-center mb-40">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-8">
            What it is
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            B-STING is an active privacy layer that intercepts and protects user data before it reaches any model or system.
          </p>
        </section>

        {/* How it works Section */}
        <section className="mb-40">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-12 text-center">
            How it works
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-16">
                <p className="text-base text-foreground/80 font-light tracking-wide">
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-12 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Protection Network Section */}
        <section className="mb-40">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-12 text-center">
            Protection Network
          </p>
          <HoneycombNetwork />
        </section>

        {/* System States Section */}
        <section className="mb-40">
          <SystemStates />
        </section>

        {/* Closing Line */}
        <section className="text-center">
          <p className="text-lg md:text-xl text-foreground/90 font-light italic">
            Privacy isn&apos;t a feature. It&apos;s a prerequisite.
          </p>
        </section>

      </div>
    </main>
  )
}
