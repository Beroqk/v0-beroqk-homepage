"use client"

import { useEffect, useRef } from "react"

export function WireframeGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let rotation = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const drawGlobe = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.38

      ctx.clearRect(0, 0, width, height)

      // Draw outer circle with subtle glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw latitude lines
      const latitudes = 7
      for (let i = 1; i < latitudes; i++) {
        const lat = (i / latitudes) * Math.PI - Math.PI / 2
        const y = centerY + radius * Math.sin(lat)
        const r = radius * Math.cos(lat)
        
        if (r > 0) {
          ctx.beginPath()
          ctx.ellipse(centerX, y, r, r * 0.15, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (1 - Math.abs(lat) / (Math.PI / 2)) * 0.07})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Draw longitude lines with rotation
      const longitudes = 12
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI * 2 + rotation

        ctx.beginPath()
        for (let j = 0; j <= 50; j++) {
          const lat = (j / 50) * Math.PI - Math.PI / 2
          const x = centerX + radius * Math.cos(lat) * Math.sin(lng)
          const z = Math.cos(lat) * Math.cos(lng)
          const y = centerY - radius * Math.sin(lat)
          
          // Only draw visible part (front of globe)
          const alpha = z > -0.1 ? 0.1 + z * 0.12 : 0.02
          
          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        }
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw dots at intersections
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI * 2 + rotation
        for (let j = 1; j < latitudes; j++) {
          const lat = (j / latitudes) * Math.PI - Math.PI / 2
          const x = centerX + radius * Math.cos(lat) * Math.sin(lng)
          const z = Math.cos(lat) * Math.cos(lng)
          const y = centerY - radius * Math.sin(lat)
          
          if (z > 0) {
            const alpha = 0.2 + z * 0.4
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.fill()
          }
        }
      }

      // Slow rotation
      rotation += 0.002

      animationId = requestAnimationFrame(drawGlobe)
    }

    drawGlobe()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
