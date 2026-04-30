"use client"

import { useState, useEffect, useRef } from "react"

// Hexagon Component
function Hex({ 
  className = "", 
  size = 60,
  opacity = 0.15,
  delay = 0,
  isHighlighted = false 
}: { 
  className?: string
  size?: number
  opacity?: number
  delay?: number
  isHighlighted?: boolean
}) {
  return (
    <svg 
      width={size} 
      height={size * 1.15} 
      viewBox="0 0 100 115" 
      className={`transition-all duration-500 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <polygon
        points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
        fill="none"
        stroke="white"
        strokeWidth="1"
        className={`transition-all duration-500`}
        style={{ 
          opacity: isHighlighted ? 0.5 : opacity,
          transitionDelay: `${delay}ms`
        }}
      />
    </svg>
  )
}

// Honeycomb Network Component
function HoneycombNetwork() {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const hexSize = 50

  return (
    <div
      className="relative w-full max-w-sm mx-auto cursor-pointer flex items-center justify-center py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="relative" style={{ width: hexSize * 4, height: hexSize * 4 }}>
        {/* Center hex */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Hex size={hexSize} opacity={0.25} isHighlighted={isHovered || isActive} />
        </div>
        
        {/* Top hex */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -hexSize * 0.4 }}>
          <Hex size={hexSize} opacity={0.1} delay={50} isHighlighted={isHovered} />
        </div>
        
        {/* Top right hex */}
        <div className="absolute" style={{ left: `calc(50% + ${hexSize * 0.65}px)`, top: hexSize * 0.15 }}>
          <Hex size={hexSize} opacity={0.08} delay={100} isHighlighted={isHovered} />
        </div>
        
        {/* Bottom right hex */}
        <div className="absolute" style={{ left: `calc(50% + ${hexSize * 0.65}px)`, top: hexSize * 1.05 }}>
          <Hex size={hexSize} opacity={0.08} delay={150} isHighlighted={isHovered} />
        </div>
        
        {/* Bottom hex */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: hexSize * 1.6 }}>
          <Hex size={hexSize} opacity={0.1} delay={200} isHighlighted={isHovered} />
        </div>
        
        {/* Bottom left hex */}
        <div className="absolute" style={{ left: `calc(50% - ${hexSize * 1.65}px)`, top: hexSize * 1.05 }}>
          <Hex size={hexSize} opacity={0.08} delay={250} isHighlighted={isHovered} />
        </div>
        
        {/* Top left hex */}
        <div className="absolute" style={{ left: `calc(50% - ${hexSize * 1.65}px)`, top: hexSize * 0.15 }}>
          <Hex size={hexSize} opacity={0.08} delay={300} isHighlighted={isHovered} />
        </div>
      </div>
      
      {/* Status text */}
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest transition-all duration-500 ${
          isActive ? "text-white/60 opacity-100" : "text-white/0 opacity-0"
        }`}
      >
        SHIELD ACTIVE
      </div>
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
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-16 text-center">
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
