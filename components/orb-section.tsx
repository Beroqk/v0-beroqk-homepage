"use client"

import { useEffect, useRef, useState } from "react"

const routingOptions = [
  {
    label: "Route this question",
    result: {
      model: "Small Model",
      reason: "Simple reasoning request",
      savings: "78% compute reduction",
      responseTime: "0.8s",
    },
  },
  {
    label: "Why small models?",
    result: {
      model: "Micro Model",
      reason: "Factual recall query",
      savings: "91% compute reduction",
      responseTime: "0.3s",
    },
  },
  {
    label: "Estimate savings",
    result: {
      model: "Medium Model",
      reason: "Analytical calculation",
      savings: "52% compute reduction",
      responseTime: "1.2s",
    },
  },
  {
    label: "How Beroqk thinks",
    result: {
      model: "Large Model",
      reason: "Complex explanation needed",
      savings: "24% compute reduction",
      responseTime: "2.1s",
    },
  },
  {
    label: "Privacy layer",
    result: {
      model: "Local Model",
      reason: "Sensitive data detected",
      savings: "100% external compute",
      responseTime: "0.5s",
    },
  },
  {
    label: "Model selected",
    result: {
      model: "Optimal Route",
      reason: "Best match for context",
      savings: "67% compute reduction",
      responseTime: "0.9s",
    },
  },
]

interface InteractiveOrbProps {
  isPulsing: boolean
}

function InteractiveOrb({ isPulsing }: InteractiveOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const orbitAngleRef = useRef(0)
  const pulseRef = useRef(0)
  const baseSpeedRef = useRef(0.005)

  useEffect(() => {
    if (isPulsing) {
      pulseRef.current = 1
      baseSpeedRef.current = 0.02
      setTimeout(() => {
        baseSpeedRef.current = 0.005
      }, 500)
    }
  }, [isPulsing])

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

      // Pulse decay
      if (pulseRef.current > 0) {
        pulseRef.current *= 0.95
      }

      const pulseIntensity = pulseRef.current

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, orbRadius * 0.5,
        centerX, centerY, orbRadius * 1.8
      )
      outerGlow.addColorStop(0, `rgba(30, 64, 175, ${0.15 + pulseIntensity * 0.2})`)
      outerGlow.addColorStop(0.5, `rgba(30, 58, 138, ${0.08 + pulseIntensity * 0.1})`)
      outerGlow.addColorStop(1, "transparent")
      ctx.fillStyle = outerGlow
      ctx.fillRect(0, 0, width, height)

      // Main orb gradient
      const orbGradient = ctx.createRadialGradient(
        centerX - orbRadius * 0.3, centerY - orbRadius * 0.3, 0,
        centerX, centerY, orbRadius
      )
      orbGradient.addColorStop(0, "rgba(40, 40, 50, 1)")
      orbGradient.addColorStop(0.4, "rgba(20, 25, 35, 1)")
      orbGradient.addColorStop(0.8, "rgba(10, 15, 25, 1)")
      orbGradient.addColorStop(1, "rgba(5, 10, 20, 1)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2)
      ctx.fillStyle = orbGradient
      ctx.fill()

      // Inner subtle glow (intensifies on pulse)
      const innerGlow = ctx.createRadialGradient(
        centerX - orbRadius * 0.2, centerY - orbRadius * 0.3, 0,
        centerX, centerY, orbRadius * 0.8
      )
      innerGlow.addColorStop(0, `rgba(59, 130, 246, ${0.1 + pulseIntensity * 0.3})`)
      innerGlow.addColorStop(0.5, `rgba(30, 64, 175, ${0.05 + pulseIntensity * 0.15})`)
      innerGlow.addColorStop(1, "transparent")
      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2)
      ctx.fill()

      // Orbit ring
      const orbitRadius = orbRadius * 1.4
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + pulseIntensity * 0.15})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Orbiting dot
      orbitAngleRef.current += baseSpeedRef.current
      const dotX = centerX + Math.cos(orbitAngleRef.current) * orbitRadius
      const dotY = centerY + Math.sin(orbitAngleRef.current) * orbitRadius

      // Dot glow
      const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12)
      dotGlow.addColorStop(0, `rgba(255, 255, 255, ${0.8 + pulseIntensity * 0.2})`)
      dotGlow.addColorStop(0.5, `rgba(147, 197, 253, ${0.3 + pulseIntensity * 0.2})`)
      dotGlow.addColorStop(1, "transparent")
      ctx.fillStyle = dotGlow
      ctx.beginPath()
      ctx.arc(dotX, dotY, 12 + pulseIntensity * 4, 0, Math.PI * 2)
      ctx.fill()

      // Dot core
      ctx.beginPath()
      ctx.arc(dotX, dotY, 3 + pulseIntensity * 2, 0, Math.PI * 2)
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isPulsing, setIsPulsing] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
    setIsPulsing(true)
    setPulseKey((prev) => prev + 1)
    setTimeout(() => setIsPulsing(false), 100)
  }

  const currentResult = selectedOption !== null ? routingOptions[selectedOption].result : null

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Orb */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
            <InteractiveOrb key={pulseKey} isPulsing={isPulsing} />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
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
              Every request is routed through the most efficient model for the job. Explore how Beroqk reduces compute before an answer is generated.
            </p>

            {/* Routing Pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              {routingOptions.map((option, index) => (
                <button
                  key={option.label}
                  onClick={() => handleOptionClick(index)}
                  className={`px-4 py-2 text-sm border rounded-full transition-all duration-200 backdrop-blur-sm ${
                    selectedOption === index
                      ? "border-white/40 text-foreground bg-white/5"
                      : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground bg-background/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Result Panel */}
            <div
              className={`mt-4 p-6 border border-white/10 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 ${
                currentResult ? "opacity-100" : "opacity-40"
              }`}
            >
              {currentResult ? (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Model Route
                    </span>
                    <p className="text-foreground font-normal mt-1">{currentResult.model}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Reason
                    </span>
                    <p className="text-foreground font-normal mt-1">{currentResult.reason}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Estimated Savings
                    </span>
                    <p className="text-foreground font-normal mt-1">{currentResult.savings}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Response Time
                    </span>
                    <p className="text-foreground font-normal mt-1">{currentResult.responseTime}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Model Route
                    </span>
                    <p className="text-muted-foreground/50 font-normal mt-1">—</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Reason
                    </span>
                    <p className="text-muted-foreground/50 font-normal mt-1">—</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Estimated Savings
                    </span>
                    <p className="text-muted-foreground/50 font-normal mt-1">—</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Response Time
                    </span>
                    <p className="text-muted-foreground/50 font-normal mt-1">—</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
