"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// AI Routing Card - Minimal
function RoutingCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/api-info" className="block">
      <div
        className={`
          relative overflow-hidden rounded-3xl border
          bg-white/[0.02]
          transition-all duration-500 ease-out cursor-pointer
          h-[420px] md:h-[480px]
          ${isHovered 
            ? "border-white/[0.12] -translate-y-1" 
            : "border-white/[0.06]"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Simple visual - concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full border transition-all duration-700 ${
              isHovered ? "border-white/15 scale-105" : "border-white/[0.06]"
            }`} />
            {/* Middle ring */}
            <div className={`absolute inset-8 rounded-full border transition-all duration-500 delay-75 ${
              isHovered ? "border-white/12" : "border-white/[0.05]"
            }`} />
            {/* Inner ring */}
            <div className={`absolute inset-16 rounded-full border transition-all duration-300 delay-150 ${
              isHovered ? "border-white/10" : "border-white/[0.04]"
            }`} />
            {/* Center dot */}
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isHovered ? "bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/15"
              }`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
            Routing Intelligence
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white/90 mb-4" style={{ letterSpacing: "-0.02em" }}>
              Optimal model, every time.
            </h3>

            <p className="text-[15px] text-white/40 leading-relaxed mb-8 max-w-sm">
              Automatically routes requests to the most efficient AI for the task.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 text-[13px] text-white/40
              transition-all duration-300
              ${isHovered ? "text-white/70" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// B-STING Privacy Card - Minimal
function PrivacyCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/b-sting" className="block">
      <div
        className={`
          relative overflow-hidden rounded-3xl border
          bg-white/[0.02]
          transition-all duration-500 ease-out cursor-pointer
          h-[420px] md:h-[480px]
          ${isHovered 
            ? "border-white/[0.12] -translate-y-1" 
            : "border-white/[0.06]"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Simple visual - hexagon grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Simple 7-hexagon honeycomb */}
            <svg width="180" height="200" viewBox="0 0 180 200" className="md:w-[220px] md:h-[240px]">
              {/* Center hex */}
              <polygon
                points="90,60 120,77 120,111 90,128 60,111 60,77"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 ${isHovered ? "opacity-25" : "opacity-[0.08]"}`}
              />
              {/* Top hex */}
              <polygon
                points="90,12 120,29 120,63 90,80 60,63 60,29"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[50ms] ${isHovered ? "opacity-20" : "opacity-[0.06]"}`}
              />
              {/* Top right hex */}
              <polygon
                points="135,36 165,53 165,87 135,104 105,87 105,53"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[100ms] ${isHovered ? "opacity-15" : "opacity-[0.05]"}`}
              />
              {/* Bottom right hex */}
              <polygon
                points="135,84 165,101 165,135 135,152 105,135 105,101"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[150ms] ${isHovered ? "opacity-15" : "opacity-[0.05]"}`}
              />
              {/* Bottom hex */}
              <polygon
                points="90,108 120,125 120,159 90,176 60,159 60,125"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[200ms] ${isHovered ? "opacity-20" : "opacity-[0.06]"}`}
              />
              {/* Bottom left hex */}
              <polygon
                points="45,84 75,101 75,135 45,152 15,135 15,101"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[250ms] ${isHovered ? "opacity-15" : "opacity-[0.05]"}`}
              />
              {/* Top left hex */}
              <polygon
                points="45,36 75,53 75,87 45,104 15,87 15,53"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 delay-[300ms] ${isHovered ? "opacity-15" : "opacity-[0.05]"}`}
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
            Privacy
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white/90 mb-4" style={{ letterSpacing: "-0.02em" }}>
              Protection before access.
            </h3>

            <p className="text-[15px] text-white/40 leading-relaxed mb-8 max-w-sm">
              Sensitive data is secured before it ever reaches an AI model.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 text-[13px] text-white/40
              transition-all duration-300
              ${isHovered ? "text-white/70" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function DivisionsSection() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-24">
          <p className="text-[11px] text-white/35 uppercase tracking-[0.3em] mb-6">
            Core Systems
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90"
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Built for Efficiency.
          </h2>
        </div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <RoutingCard />
          <PrivacyCard />
        </div>
      </div>
    </section>
  )
}
