"use client"

import { useState, useEffect, useRef } from "react"

// Shield Network Component - Simple concentric rings
function ShieldNetwork() {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className="relative w-full max-w-xs mx-auto aspect-square cursor-pointer flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
    >
      {/* Outer ring */}
      <div 
        className={`absolute w-full h-full rounded-full border transition-all duration-700 ${
          isHovered ? "border-white/30 scale-100" : "border-white/10 scale-95"
        } ${isActive ? "border-white/40" : ""}`}
      />
      
      {/* Middle ring */}
      <div 
        className={`absolute w-3/4 h-3/4 rounded-full border transition-all duration-500 delay-75 ${
          isHovered ? "border-white/25 scale-100" : "border-white/8 scale-90"
        } ${isActive ? "border-white/35" : ""}`}
      />
      
      {/* Inner ring */}
      <div 
        className={`absolute w-1/2 h-1/2 rounded-full border transition-all duration-300 delay-150 ${
          isHovered ? "border-white/20 scale-100" : "border-white/5 scale-85"
        } ${isActive ? "border-white/30" : ""}`}
      />
      
      {/* Center dot */}
      <div 
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isHovered ? "bg-white/60 scale-125" : "bg-white/20 scale-100"
        } ${isActive ? "bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : ""}`}
      />
      
      {/* Status text */}
      <div 
        className={`absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-widest transition-all duration-500 ${
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
          <ShieldNetwork />
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
