"use client"

import { useEffect, useRef, useState } from "react"

interface WireframeGlobeProps {
  isHovered: boolean
}

function WireframeGlobe({ isHovered }: WireframeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const rotationRef = useRef(0)
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

    // Routing nodes positions (will orbit)
    const routingNodes = [
      { lat: 0.3, lng: 0, size: 3 },
      { lat: -0.2, lng: 2, size: 2.5 },
      { lat: 0.5, lng: 4, size: 2 },
      { lat: -0.4, lng: 1, size: 2.5 },
      { lat: 0.1, lng: 3, size: 3 },
    ]

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const globeRadius = Math.min(width, height) * 0.32

      ctx.clearRect(0, 0, width, height)

      // Smooth glow transition
      const targetGlow = isHovered ? 1 : 0
      glowIntensityRef.current += (targetGlow - glowIntensityRef.current) * 0.06
      const glow = glowIntensityRef.current

      // Rotation speed
      const speed = 0.002 + glow * 0.002
      rotationRef.current += speed

      // Deep blue reactor core glow
      const coreGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, globeRadius * 1.2
      )
      coreGlow.addColorStop(0, `rgba(30, 80, 200, ${0.25 + glow * 0.2})`)
      coreGlow.addColorStop(0.3, `rgba(20, 60, 150, ${0.12 + glow * 0.1})`)
      coreGlow.addColorStop(0.6, `rgba(15, 40, 100, ${0.06 + glow * 0.05})`)
      coreGlow.addColorStop(1, "transparent")
      ctx.fillStyle = coreGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, globeRadius * 1.2, 0, Math.PI * 2)
      ctx.fill()

      // Globe outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + glow * 0.15})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Latitude lines
      const latitudes = 7
      for (let i = 1; i < latitudes; i++) {
        const lat = (i / latitudes) * Math.PI - Math.PI / 2
        const y = centerY + Math.sin(lat) * globeRadius
        const radiusAtLat = Math.cos(lat) * globeRadius

        ctx.beginPath()
        ctx.ellipse(centerX, y, radiusAtLat, radiusAtLat * 0.25, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.06 + glow * 0.06) - Math.abs(lat) * 0.02})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Longitude lines
      const longitudes = 12
      for (let i = 0; i < longitudes; i++) {
        const lng = (i / longitudes) * Math.PI + rotationRef.current
        const x = Math.cos(lng)
        const z = Math.sin(lng)

        if (z > -0.2) {
          ctx.beginPath()
          for (let j = 0; j <= 40; j++) {
            const lat = (j / 40) * Math.PI - Math.PI / 2
            const py = centerY + Math.sin(lat) * globeRadius
            const radiusAtLat = Math.cos(lat) * globeRadius
            const px = centerX + x * radiusAtLat

            if (j === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${(0.06 + glow * 0.08) + z * 0.04})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Equator (brighter)
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, globeRadius, globeRadius * 0.25, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + glow * 0.12})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Routing nodes on globe surface
      routingNodes.forEach((node, i) => {
        const nodeLng = node.lng + rotationRef.current
        const nodeZ = Math.sin(nodeLng)
        
        if (nodeZ > 0) {
          const nodeX = centerX + Math.cos(nodeLng) * Math.cos(node.lat) * globeRadius
          const nodeY = centerY + Math.sin(node.lat) * globeRadius
          
          // Node glow
          const nodeGlow = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, node.size * 4)
          nodeGlow.addColorStop(0, `rgba(100, 150, 255, ${0.4 + glow * 0.4})`)
          nodeGlow.addColorStop(1, "transparent")
          ctx.fillStyle = nodeGlow
          ctx.beginPath()
          ctx.arc(nodeX, nodeY, node.size * 4, 0, Math.PI * 2)
          ctx.fill()

          // Node core
          ctx.beginPath()
          ctx.arc(nodeX, nodeY, node.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(150, 200, 255, ${0.7 + glow * 0.3})`
          ctx.fill()
        }
      })

      // Orbital ring 1
      const orbitRadius1 = globeRadius * 1.35
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, orbitRadius1, orbitRadius1 * 0.3, 0.2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + glow * 0.08})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Orbital ring 2
      const orbitRadius2 = globeRadius * 1.5
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, orbitRadius2, orbitRadius2 * 0.15, -0.3, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 + glow * 0.06})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Orbiting satellite dot
      orbitAngleRef.current += 0.006 + glow * 0.004
      const satX = centerX + Math.cos(orbitAngleRef.current) * orbitRadius1
      const satY = centerY + Math.sin(orbitAngleRef.current) * orbitRadius1 * 0.3

      // Satellite glow
      const satGlow = ctx.createRadialGradient(satX, satY, 0, satX, satY, 12)
      satGlow.addColorStop(0, `rgba(255, 255, 255, ${0.8 + glow * 0.2})`)
      satGlow.addColorStop(0.4, `rgba(150, 180, 255, ${0.3 + glow * 0.2})`)
      satGlow.addColorStop(1, "transparent")
      ctx.fillStyle = satGlow
      ctx.beginPath()
      ctx.arc(satX, satY, 12, 0, Math.PI * 2)
      ctx.fill()

      // Satellite core
      ctx.beginPath()
      ctx.arc(satX, satY, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.fill()

      // Connection arc from satellite to globe
      if (glow > 0.3) {
        ctx.beginPath()
        ctx.moveTo(satX, satY)
        const targetX = centerX + Math.cos(rotationRef.current * 2) * globeRadius * 0.5
        const targetY = centerY + Math.sin(rotationRef.current) * globeRadius * 0.3
        ctx.quadraticCurveTo(
          centerX + (satX - centerX) * 0.5,
          centerY + (satY - centerY) * 0.5 - 20,
          targetX,
          targetY
        )
        ctx.strokeStyle = `rgba(100, 150, 255, ${glow * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

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
      {/* Subtle atmospheric background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 50%, rgba(20, 50, 120, 0.08) 0%, transparent 60%)`
        }}
      />
      
      <div className="mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
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
              className={`mt-4 p-8 border rounded-xl backdrop-blur-sm transition-all duration-500 ${
                isHovered 
                  ? "border-white/20 bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Status Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isHovered ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" : "bg-white/40"
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
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 block mb-2">
                      Model
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/40"
                    }`}>
                      {isHovered ? "Micro Model" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 block mb-2">
                      Saved
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/40"
                    }`}>
                      {isHovered ? "91% compute" : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 block mb-2">
                      Response
                    </span>
                    <p className={`font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-muted-foreground/40"
                    }`}>
                      {isHovered ? "0.3s" : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Wireframe Globe */}
          <div 
            className="relative aspect-square max-w-lg mx-auto lg:mx-0 w-full cursor-pointer order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <WireframeGlobe isHovered={isHovered} />
            
            {/* Floating telemetry labels */}
            <div className={`absolute top-8 right-8 text-[10px] uppercase tracking-widest transition-all duration-500 ${
              isHovered ? "text-blue-400/80" : "text-white/30"
            }`}>
              Global Routing Active
            </div>
            <div className={`absolute bottom-12 left-8 text-[10px] uppercase tracking-widest transition-all duration-700 ${
              isHovered ? "text-white/60" : "text-white/20"
            }`}>
              Optimizing Requests
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
