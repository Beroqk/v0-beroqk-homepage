"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

// AI Routing Card - Text Only
function RoutingCard() {
  const [isHovered, setIsHovered] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Link href="/api-info" className="block">
      <div
        className={`
          relative overflow-hidden rounded-2xl sm:rounded-3xl border
          transition-all duration-500 ease-out cursor-pointer
          h-[320px] sm:h-[360px] md:h-[420px] lg:h-[480px]
          ${isDark 
            ? `bg-white/[0.02] ${isHovered ? "border-white/[0.12] -translate-y-1" : "border-white/[0.06]"}`
            : `bg-black/[0.02] ${isHovered ? "border-black/[0.1] -translate-y-1" : "border-black/[0.05]"}`
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Content */}
        <div className="relative z-10 h-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
          {/* Top label */}
          <span className={`text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] ${isDark ? "text-white/50" : "text-black/50"}`}>
            Routing Intelligence
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`} style={{ letterSpacing: "-0.02em" }}>
              Optimal model, every time.
            </h3>

            <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-md ${isDark ? "text-white/55" : "text-black/55"}`}>
              Automatically routes requests to the most efficient AI for the task.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base md:text-lg
              transition-all duration-300
              ${isDark 
                ? `text-white/50 ${isHovered ? "text-white/80" : ""}`
                : `text-black/50 ${isHovered ? "text-black/80" : ""}`
              }
            `}>
              <span>Learn more</span>
              <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// B-STING Privacy Card - Text Only
function PrivacyCard() {
  const [isHovered, setIsHovered] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Link href="/b-sting" className="block">
      <div
        className={`
          relative overflow-hidden rounded-2xl sm:rounded-3xl border
          transition-all duration-500 ease-out cursor-pointer
          h-[320px] sm:h-[360px] md:h-[420px] lg:h-[480px]
          ${isDark 
            ? `bg-white/[0.02] ${isHovered ? "border-white/[0.12] -translate-y-1" : "border-white/[0.06]"}`
            : `bg-black/[0.02] ${isHovered ? "border-black/[0.1] -translate-y-1" : "border-black/[0.05]"}`
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Content */}
        <div className="relative z-10 h-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
          {/* Top label */}
          <span className={`text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] ${isDark ? "text-white/50" : "text-black/50"}`}>
            Privacy
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`} style={{ letterSpacing: "-0.02em" }}>
              Protection before access.
            </h3>

            <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-md ${isDark ? "text-white/55" : "text-black/55"}`}>
              Sensitive data is secured before it ever reaches an AI model.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base md:text-lg
              transition-all duration-300
              ${isDark 
                ? `text-white/50 ${isHovered ? "text-white/80" : ""}`
                : `text-black/50 ${isHovered ? "text-black/80" : ""}`
              }
            `}>
              <span>Learn more</span>
              <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function DivisionsSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`relative py-20 sm:py-24 md:py-32 lg:py-40 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <p className={`text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-6 ${isDark ? "text-white/45" : "text-black/45"}`}>
            Core Systems
          </p>
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${isDark ? "text-white/90" : "text-black/90"}`}
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Built for Efficiency.
          </h2>
        </div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <RoutingCard />
          <PrivacyCard />
        </div>
      </div>
    </section>
  )
}
