"use client"

import { useEffect, useState } from "react"

// Ultra-minimal routing diagram
function RoutingDiagram({ isHovered }: { isHovered: boolean }) {
  const [activeRoute, setActiveRoute] = useState(0)

  const routes = [
    { name: "Claude", label: "Deep reasoning model" },
    { name: "ChatGPT", label: "Balanced model" },
    { name: "Grok", label: "Fast model" },
  ]

  // Cycle through routes on hover
  useEffect(() => {
    if (!isHovered) {
      setActiveRoute(0)
      return
    }
    
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % routes.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isHovered, routes.length])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-16">
        {/* Input dot */}
        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
          isHovered ? "bg-white" : "bg-white/20"
        }`} />

        {/* Simple lines to labels */}
        <div className="flex flex-col gap-8">
          {routes.map((route, index) => {
            const isActive = index === activeRoute && isHovered
            return (
              <div key={route.name} className="flex items-center gap-6">
                <div className={`w-16 h-px transition-all duration-500 ${
                  isActive ? "bg-white/50" : "bg-white/10"
                }`} />
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-light tracking-wide transition-all duration-500 ${
                    isActive ? "text-white" : "text-white/20"
                  }`}>
                    {route.name}
                  </span>
                  <span className={`text-[11px] tracking-wide transition-all duration-500 ${
                    isActive ? "text-white/50 opacity-100" : "opacity-0"
                  }`}>
                    {route.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
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
