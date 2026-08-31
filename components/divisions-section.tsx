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
          relative overflow-hidden rounded-3xl border
          transition-all duration-500 ease-out cursor-pointer
          h-[420px] md:h-[480px]
          ${isDark 
            ? `bg-white/[0.02] ${isHovered ? "border-white/[0.12] -translate-y-1" : "border-white/[0.06]"}`
            : `bg-black/[0.02] ${isHovered ? "border-black/[0.1] -translate-y-1" : "border-black/[0.05]"}`
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Content */}
        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          {/* Top label */}
          <span className={`text-sm md:text-base font-medium uppercase tracking-[0.15em] ${isDark ? "text-white/50" : "text-black/50"}`}>
            Routing Intelligence
          </span>

          {/* Bottom content */}
          <div className="mt-auto">
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-light mb-5 ${isDark ? "text-white" : "text-black"}`} style={{ letterSpacing: "-0.02em" }}>
              Optimal model, every time.
            </h3>

            <p className={`text-lg md:text-xl leading-relaxed mb-10 max-w-md ${isDark ? "text-white/55" : "text-black/55"}`}>
              Automatically routes requests to the most efficient AI for the task.
            </p>

            {/* CTA */}
            <div className={`
              inline-flex items-center gap-2.5 text-base md:text-lg
              transition-all duration-300
              ${isDark 
                ? `text-white/50 ${isHovered ? "text-white/80" : ""}`
                : `text-black/50 ${isHovered ? "text-black/80" : ""}`
              }
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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`relative py-32 md:py-40 ${isDark ? "bg-black" : "bg-[#fafafa]"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-24">
          <p className={`text-sm md:text-base uppercase tracking-[0.25em] mb-6 ${isDark ? "text-white/45" : "text-black/45"}`}>
            Core Systems
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-light ${isDark ? "text-white/90" : "text-black/90"}`}
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Built for Efficiency.
          </h2>
        </div>

        {/* Single card layout */}
        <div className="max-w-2xl mx-auto">
          <RoutingCard />
        </div>
      </div>
    </section>
  )
}
