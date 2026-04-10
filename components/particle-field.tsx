"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
  depth: number // For parallax effect (0-1, 1 = closest)
  drift: { x: number; y: number } // Ambient drift direction
  twinkleSpeed: number
  twinkleOffset: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    const density = 0.00012
    const count = Math.floor(width * height * density)

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const depth = Math.random()
      
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: depth * 1.8 + 0.3, // Bigger stars appear closer
        opacity: depth * 0.5 + 0.1,
        depth,
        drift: {
          x: (Math.random() - 0.5) * 0.15,
          y: (Math.random() - 0.5) * 0.1,
        },
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }
    return stars
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      starsRef.current = initStars(rect.width, rect.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const stars = starsRef.current
      const mouse = mouseRef.current
      const interactionRadius = 150
      const connectionDistance = 100

      timeRef.current += 1

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Ambient drift (slow floating motion)
        star.baseX += star.drift.x * 0.1
        star.baseY += star.drift.y * 0.1

        // Wrap around edges
        if (star.baseX < -20) star.baseX = rect.width + 20
        if (star.baseX > rect.width + 20) star.baseX = -20
        if (star.baseY < -20) star.baseY = rect.height + 20
        if (star.baseY > rect.height + 20) star.baseY = -20

        // Mouse interaction with parallax (closer stars react more)
        const dx = mouse.x - star.x
        const dy = mouse.y - star.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < interactionRadius && dist > 0) {
          const force = (interactionRadius - dist) / interactionRadius
          const angle = Math.atan2(dy, dx)
          const parallaxForce = force * star.depth * 1.2
          star.vx -= Math.cos(angle) * parallaxForce
          star.vy -= Math.sin(angle) * parallaxForce
        }

        // Return to base position
        star.vx += (star.baseX - star.x) * 0.015
        star.vy += (star.baseY - star.y) * 0.015

        // Apply friction
        star.vx *= 0.94
        star.vy *= 0.94

        // Update position
        star.x += star.vx
        star.y += star.vy

        // Twinkle effect
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const baseOpacity = star.opacity * twinkle

        // Increase brightness near mouse
        const proximityBoost = dist < interactionRadius ? (1 - dist / interactionRadius) * 0.4 : 0
        const finalOpacity = Math.min(baseOpacity + proximityBoost, 0.9)

        // Draw star glow (subtle blue for larger/closer stars)
        if (star.depth > 0.6) {
          const glowSize = star.size * 3
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          )
          gradient.addColorStop(0, `rgba(180, 200, 255, ${finalOpacity * 0.3})`)
          gradient.addColorStop(0.5, `rgba(120, 150, 200, ${finalOpacity * 0.1})`)
          gradient.addColorStop(1, "rgba(100, 130, 180, 0)")
          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw star core
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
        ctx.fill()

        // Draw sparse connections (only between nearby, prominent stars)
        if (star.depth > 0.4) {
          for (let j = i + 1; j < stars.length; j++) {
            const star2 = stars[j]
            if (star2.depth < 0.4) continue

            const cdx = star.x - star2.x
            const cdy = star.y - star2.y
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

            if (cdist < connectionDistance) {
              const lineOpacity = (1 - cdist / connectionDistance) * 0.08 * Math.min(star.depth, star2.depth)
              ctx.beginPath()
              ctx.moveTo(star.x, star.y)
              ctx.lineTo(star2.x, star2.y)
              ctx.strokeStyle = `rgba(200, 220, 255, ${lineOpacity})`
              ctx.lineWidth = 0.4
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initStars])

  return (
    <div className="w-full h-72 md:h-96 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  )
}
