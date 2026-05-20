"use client"

import { useEffect, useState } from "react"

// Apple-style minimal routing diagram
function RoutingDiagram({ isHovered }: { isHovered: boolean }) {
  const [activeRoute, setActiveRoute] = useState(0)
  const [pulsePosition, setPulsePosition] = useState(0)

  const routes = [
    { name: "Claude", selected: true },
    { name: "ChatGPT", selected: false },
    { name: "Grok", selected: false },
  ]

  // Cycle through routes
  useEffect(() => {
    if (!isHovered) {
      setActiveRoute(0)
      return
    }
    
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % routes.length)
    }, 2500)
    
    return () => clearInterval(interval)
  }, [isHovered, routes.length])

  // Animate pulse along active route
  useEffect(() => {
    if (!isHovered) {
      setPulsePosition(0)
      return
    }

    const animate = () => {
      setPulsePosition((prev) => {
        if (prev >= 1) return 0
        return prev + 0.02
      })
    }

    const interval = setInterval(animate, 30)
    return () => clearInterval(interval)
  }, [isHovered, activeRoute])

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-sm">
        {/* Input dot on left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
            isHovered 
              ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" 
              : "bg-white/30"
          }`} />
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-6 pl-8">
          {routes.map((route, index) => {
            const isActive = index === activeRoute && isHovered
            
            return (
              <div key={route.name} className="flex items-center gap-4">
                {/* Line */}
                <div className="relative w-24 h-px">
                  {/* Base line */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isActive ? "bg-white/40" : "bg-white/10"
                  }`} />
                  
                  {/* Pulse traveling along line */}
                  {isActive && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                      style={{ 
                        left: `${pulsePosition * 100}%`,
                        opacity: pulsePosition > 0 && pulsePosition < 0.9 ? 1 : 0,
                      }}
                    />
                  )}
                </div>

                {/* Provider label */}
                <span className={`text-sm font-light tracking-wide transition-all duration-500 ${
                  isActive 
                    ? "text-white" 
                    : "text-white/25"
                }`}>
                  {route.name}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                )}
              </div>
            )
          })}
        </div>

        {/* Connecting lines from input to routes */}
        <svg 
          className="absolute left-0 top-0 w-12 h-full pointer-events-none"
          viewBox="0 0 48 120"
          preserveAspectRatio="none"
        >
          {/* Top branch */}
          <path
            d={`M 4 60 Q 24 60 32 24`}
            fill="none"
            stroke={activeRoute === 0 && isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
            strokeWidth="1"
            className="transition-all duration-500"
          />
          {/* Middle (straight) */}
          <path
            d={`M 4 60 L 32 60`}
            fill="none"
            stroke={activeRoute === 1 && isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
            strokeWidth="1"
            className="transition-all duration-500"
          />
          {/* Bottom branch */}
          <path
            d={`M 4 60 Q 24 60 32 96`}
            fill="none"
            stroke={activeRoute === 2 && isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
            strokeWidth="1"
            className="transition-all duration-500"
          />
        </svg>
      </div>
    </div>
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

          {/* Right: Minimal Routing Diagram */}
          <div 
            className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full cursor-pointer order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Premium container */}
            <div className={`
              w-full h-full rounded-3xl border transition-all duration-500
              ${isHovered 
                ? "border-white/15 bg-white/[0.03] shadow-[0_8px_60px_rgba(255,255,255,0.03)]" 
                : "border-white/[0.08] bg-white/[0.01]"
              }
            `}>
              <RoutingDiagram isHovered={isHovered} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
