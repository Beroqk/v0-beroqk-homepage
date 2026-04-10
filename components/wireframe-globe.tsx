"use client"

import { useEffect, useRef } from "react"

export function WireframeGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const currentRotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let autoRotation = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    // Mouse tracking with smooth easing
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate normalized distance from center (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)
      
      // Set target rotation (subtle, max ~0.3 radians)
      targetRotationRef.current = {
        x: normalizedY * 0.25,
        y: normalizedX * 0.35
      }
      
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      }
    }

    const handleMouseLeave = () => {
      targetRotationRef.current = { x: 0, y: 0 }
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const drawGlobe = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.38

      // Smooth easing toward target rotation
      const easing = 0.05
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * easing
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * easing

      const tiltX = currentRotationRef.current.x
      const tiltY = currentRotationRef.current.y

      ctx.clearRect(0, 0, width, height)

      // Draw outer circle with subtle glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Store intersection points for hover detection
      const intersectionPoints: { x: number; y: number; z: number; lat: number; lng: number }[] = []

      const latitudes = 7
      const longitudes = 12

      // Collect intersection points
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI * 2 + autoRotation + tiltY
        for (let j = 1; j < latitudes; j++) {
          const lat = (j / latitudes) * Math.PI - Math.PI / 2
          
          // Apply tilt transformation
          const x0 = Math.cos(lat) * Math.sin(lng)
          const y0 = Math.sin(lat)
          const z0 = Math.cos(lat) * Math.cos(lng)
          
          // Rotate around X axis (tilt)
          const y1 = y0 * Math.cos(tiltX) - z0 * Math.sin(tiltX)
          const z1 = y0 * Math.sin(tiltX) + z0 * Math.cos(tiltX)
          
          const screenX = centerX + radius * x0
          const screenY = centerY - radius * y1
          
          intersectionPoints.push({ x: screenX, y: screenY, z: z1, lat, lng })
        }
      }

      // Draw latitude lines
      for (let i = 1; i < latitudes; i++) {
        const lat = (i / latitudes) * Math.PI - Math.PI / 2
        const y0 = Math.sin(lat)
        const cosLat = Math.cos(lat)
        
        // Apply tilt
        const y1 = y0 * Math.cos(tiltX)
        const r = radius * cosLat
        const yOffset = radius * y1
        
        if (r > 0) {
          ctx.beginPath()
          ctx.ellipse(centerX, centerY - yOffset, r, r * Math.abs(Math.cos(tiltX)) * 0.15 + Math.abs(Math.sin(tiltX)) * r * 0.3, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (1 - Math.abs(lat) / (Math.PI / 2)) * 0.07})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Draw longitude lines with rotation and tilt
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI * 2 + autoRotation + tiltY

        ctx.beginPath()
        for (let j = 0; j <= 50; j++) {
          const lat = (j / 50) * Math.PI - Math.PI / 2
          
          const x0 = Math.cos(lat) * Math.sin(lng)
          const y0 = Math.sin(lat)
          const z0 = Math.cos(lat) * Math.cos(lng)
          
          // Rotate around X axis (tilt)
          const y1 = y0 * Math.cos(tiltX) - z0 * Math.sin(tiltX)
          const z1 = y0 * Math.sin(tiltX) + z0 * Math.cos(tiltX)
          
          const x = centerX + radius * x0
          const y = centerY - radius * y1
          
          // Only draw visible part (front of globe)
          const alpha = z1 > -0.1 ? 0.1 + z1 * 0.12 : 0.02
          
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

      // Draw dots at intersections with hover highlight
      const mouse = mouseRef.current
      
      for (const point of intersectionPoints) {
        if (point.z > 0) {
          let alpha = 0.2 + point.z * 0.4
          let dotRadius = 1.5
          
          // Check hover proximity
          if (mouse.active) {
            const dist = Math.sqrt(
              Math.pow(mouse.x - point.x, 2) + 
              Math.pow(mouse.y - point.y, 2)
            )
            
            if (dist < 40) {
              // Soft highlight effect
              const intensity = 1 - dist / 40
              alpha = Math.min(1, alpha + intensity * 0.5)
              dotRadius = 1.5 + intensity * 2
              
              // Draw subtle glow
              if (intensity > 0.3) {
                ctx.beginPath()
                ctx.arc(point.x, point.y, dotRadius + 4, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.15})`
                ctx.fill()
              }
            }
          }
          
          ctx.beginPath()
          ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fill()
        }
      }

      // Slow auto rotation (continues even with mouse interaction)
      autoRotation += 0.002

      animationId = requestAnimationFrame(drawGlobe)
    }

    drawGlobe()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
