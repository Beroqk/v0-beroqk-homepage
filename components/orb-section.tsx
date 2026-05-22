"use client"

import { useEffect, useState, useCallback } from "react"

// Ultra-minimal routing diagram
function RoutingDiagram({ isHovered, onActiveRouteChange }: { isHovered: boolean; onActiveRouteChange: (index: number) => void }) {
  const [activeRoute, setActiveRoute] = useState(0)

  const routes = ["Claude", "ChatGPT", "Grok"]

  // Cycle through routes on hover
  useEffect(() => {
    if (!isHovered) {
      setActiveRoute(0)
      onActiveRouteChange(0)
      return
    }
    
    const interval = setInterval(() => {
      setActiveRoute((prev) => {
        const next = (prev + 1) % routes.length
        onActiveRouteChange(next)
        return next
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isHovered, routes.length, onActiveRouteChange])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-16">
        {/* Input dot */}
        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
          isHovered ? "bg-foreground" : "bg-foreground/20"
        }`} />

        {/* Simple lines to labels */}
        <div className="flex flex-col gap-8">
          {routes.map((name, index) => {
            const isActive = index === activeRoute && isHovered
            return (
              <div key={name} className="flex items-center gap-6">
                <div className={`w-16 h-px transition-all duration-500 ${
                  isActive ? "bg-foreground/50" : "bg-foreground/10"
                }`} />
                <span className={`text-base font-light tracking-wide transition-all duration-500 ${
                  isActive ? "text-foreground" : "text-foreground/20"
                }`}>
                  {name}
                </span>
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
  const [activeRouteIndex, setActiveRouteIndex] = useState(0)

  const routeLabels = [
    { model: "Claude", label: "Deep reasoning model" },
    { model: "ChatGPT", label: "Balanced model" },
    { model: "Grok", label: "Fast model" },
  ]

  const handleActiveRouteChange = useCallback((index: number) => {
    setActiveRouteIndex(index)
  }, [])

  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-background transition-colors duration-500">
      <div className="mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            {/* Label */}
            <span className="text-sm md:text-base font-medium uppercase tracking-[0.25em] text-foreground/45">
              Explore
            </span>

            {/* Headline */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground/95"
              style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Routing Intelligence
            </h2>

            {/* Description */}
            <p className="text-foreground/55 text-xl md:text-2xl leading-relaxed max-w-md">
              Every request is routed through the most efficient model for the job.
            </p>

            {/* Status Card */}
            <div
              className={`mt-4 p-8 border rounded-xl transition-all duration-500 ${
                isHovered 
                  ? "border-foreground/20 bg-foreground/[0.04]" 
                  : "border-foreground/10 bg-foreground/[0.02]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Status Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    isHovered ? "bg-foreground" : "bg-foreground/40"
                  }`} />
                  <span className={`text-sm md:text-base font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
                    isHovered ? "text-foreground" : "text-foreground/50"
                  }`}>
                    {isHovered ? "Routing Active" : "Routing Standby"}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground/40 block mb-2">
                      Model
                    </span>
                    <p className={`text-base md:text-lg font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-foreground/30"
                    }`}>
                      {isHovered ? routeLabels[activeRouteIndex].model : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground/40 block mb-2">
                      Type
                    </span>
                    <p className={`text-base md:text-lg font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-foreground/30"
                    }`}>
                      {isHovered ? routeLabels[activeRouteIndex].label : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground/40 block mb-2">
                      Response
                    </span>
                    <p className={`text-base md:text-lg font-normal transition-all duration-500 ${
                      isHovered ? "text-foreground" : "text-foreground/30"
                    }`}>
                      {isHovered ? (activeRouteIndex === 2 ? "0.1s" : activeRouteIndex === 1 ? "0.3s" : "0.8s") : "—"}
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
                ? "border-foreground/15 bg-foreground/[0.03] shadow-lg" 
                : "border-foreground/[0.08] bg-foreground/[0.01]"
              }
            `}>
              <RoutingDiagram isHovered={isHovered} onActiveRouteChange={handleActiveRouteChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
