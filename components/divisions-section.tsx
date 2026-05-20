"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// AI Routing Card - Ultra Minimal
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
        {/* Ultra simple visual - single circle with dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Single ring */}
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border transition-all duration-500 ${
              isHovered ? "border-white/20" : "border-white/[0.08]"
            }`} />
            {/* Center dot */}
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isHovered ? "bg-white/50" : "bg-white/20"
              }`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-sm md:text-base font-medium uppercase tracking-[0.15em] text-white/50">
            Routing Intelligence
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-5" style={{ letterSpacing: "-0.02em" }}>
              Optimal model, every time.
            </h3>

            <p className="text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-md">
              Automatically routes requests to the most efficient AI for the task.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2.5 text-base md:text-lg text-white/50
              transition-all duration-300
              ${isHovered ? "text-white/80" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={18} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// B-STING Privacy Card - Ultra Minimal
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
        {/* Ultra simple visual - single hexagon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="120" height="140" viewBox="0 0 100 115" className="md:w-[140px] md:h-[160px]">
            <polygon
              points="50,5 95,30 95,85 50,110 5,85 5,30"
              fill="none"
              stroke="white"
              strokeWidth="1"
              className={`transition-all duration-500 ${isHovered ? "opacity-20" : "opacity-[0.08]"}`}
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className="text-sm md:text-base font-medium uppercase tracking-[0.15em] text-white/50">
            Privacy
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-5" style={{ letterSpacing: "-0.02em" }}>
              Protection before access.
            </h3>

            <p className="text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-md">
              Sensitive data is secured before it ever reaches an AI model.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2.5 text-base md:text-lg text-white/50
              transition-all duration-300
              ${isHovered ? "text-white/80" : ""}
            `}>
              <span>Learn more</span>
              <ArrowRight size={18} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
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
          <p className="text-sm md:text-base text-white/45 uppercase tracking-[0.25em] mb-6">
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
