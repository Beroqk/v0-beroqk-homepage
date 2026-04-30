"use client"

import { useState, useRef, useEffect } from "react"

export function BStingSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [activeHexIndex, setActiveHexIndex] = useState(-1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const glowIntensityRef = useRef(0)
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

    // Hex positions (center + 6 surrounding)
    const hexSize = 40
    const hexes = [
      { x: 0, y: 0, delay: 0 }, // center
      { x: 0, y: -hexSize * 1.8, delay: 1 }, // top
      { x: hexSize * 1.55, y: -hexSize * 0.9, delay: 2 }, // top-right
      { x: hexSize * 1.55, y: hexSize * 0.9, delay: 3 }, // bottom-right
      { x: 0, y: hexSize * 1.8, delay: 4 }, // bottom
      { x: -hexSize * 1.55, y: hexSize * 0.9, delay: 5 }, // bottom-left
      { x: -hexSize * 1.55, y: -hexSize * 0.9, delay: 6 }, // top-left
    ]

    const drawHex = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      strokeAlpha: number,
      fillAlpha: number,
      glowAlpha: number
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const x = cx + size * Math.cos(angle)
        const y = cy + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      // Glow
      if (glowAlpha > 0) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.5)
        glow.addColorStop(0, `rgba(59, 130, 246, ${glowAlpha * 0.3})`)
        glow.addColorStop(0.5, `rgba(30, 64, 175, ${glowAlpha * 0.15})`)
        glow.addColorStop(1, "transparent")
        ctx.fillStyle = glow
        ctx.fill()
      }

      // Fill
      if (fillAlpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`
        ctx.fill()
      }

      // Stroke
      ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)

      // Animate glow intensity
      const targetGlow = isHovered ? 1 : 0
      glowIntensityRef.current += (targetGlow - glowIntensityRef.current) * 0.05

      // Pulse animation
      if (pulseRef.current > 0) {
        pulseRef.current -= 0.02
      }

      const time = Date.now() / 1000

      hexes.forEach((hex, i) => {
        const hx = centerX + hex.x
        const hy = centerY + hex.y

        let strokeAlpha = i === 0 ? 0.3 : 0.12
        let fillAlpha = 0
        let glowAlpha = 0

        if (isHovered) {
          // Center hex glows
          if (i === 0) {
            strokeAlpha = 0.6
            fillAlpha = 0.03
            glowAlpha = glowIntensityRef.current * 0.8
          } else {
            // Surrounding hexes light up in sequence
            const sequenceTime = (time * 2 + hex.delay * 0.3) % 4
            const lightUp = sequenceTime < 1.5 ? Math.sin(sequenceTime * Math.PI / 1.5) : 0
            strokeAlpha = 0.12 + lightUp * 0.4
            fillAlpha = lightUp * 0.02
            glowAlpha = lightUp * 0.3
          }
        }

        // Pulse effect
        if (pulseRef.current > 0 && i > 0) {
          const dist = Math.sqrt(hex.x * hex.x + hex.y * hex.y)
          const pulseWave = Math.sin((pulseRef.current * 10 - dist * 0.02) * Math.PI)
          if (pulseWave > 0) {
            strokeAlpha += pulseWave * 0.3
            glowAlpha += pulseWave * 0.2
          }
        }

        drawHex(ctx, hx, hy, hexSize, strokeAlpha, fillAlpha, glowAlpha)
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  const handleClick = () => {
    setIsActivated(true)
    pulseRef.current = 1
    setTimeout(() => setIsActivated(false), 3000)
  }

  return (
    <section className="py-32 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-6">
          Coming Next
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Honeycomb Visual */}
          <div 
            className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: "block" }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-6">
              B-STING
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Active privacy layer that protects before access
            </p>

            {/* Status indicator */}
            <div 
              className={`mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-lg border transition-all duration-500 ${
                isActivated 
                  ? "border-white/30 bg-white/5" 
                  : "border-white/10 bg-transparent"
              }`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActivated ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "bg-white/30"
                }`} 
              />
              <span 
                className={`text-sm font-medium transition-all duration-500 ${
                  isActivated ? "text-foreground" : "text-muted-foreground/60"
                }`}
              >
                {isActivated ? "Privacy Shield Active" : "Hover to preview"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
