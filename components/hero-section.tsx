"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Simple Ask Beroqk Component
function AskBeroqk() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating animation wrapper */}
      <div
        className="transition-transform duration-[2000ms] ease-in-out"
        style={{ transform: isHovered ? "translateY(-4px)" : "translateY(0)" }}
      >
        {/* Container */}
        <div
          className={`
            rounded-2xl border border-white/[0.08] 
            bg-white/[0.03] backdrop-blur-xl
            shadow-[0_8px_60px_rgba(0,0,0,0.4)]
            overflow-hidden transition-all duration-500
            ${isHovered ? "border-white/[0.12] shadow-[0_12px_80px_rgba(0,0,0,0.5)]" : ""}
          `}
        >
          {/* Header */}
          <div className="px-6 pt-8 pb-4 text-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <span className="text-sm font-medium text-white/60">B</span>
            </div>
            <h3 className="text-lg font-light text-white/80 tracking-wide">
              Ask Beroqk
            </h3>
            <p className="text-[13px] text-white/35 mt-2">
              Intelligent assistance, instantly.
            </p>
          </div>

          {/* Input */}
          <div className="px-5 pb-6 pt-2">
            <Link 
              href="/chat"
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
            >
              <span className="text-[14px] text-white/30 flex-grow">
                Ask anything...
              </span>
              <ArrowRight size={16} className="text-white/30" />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle glow behind card */}
      <div
        className={`absolute -inset-8 -z-10 rounded-3xl transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-50"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Pure matte black with subtle depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 60%),
              linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)
            `,
          }}
        />

        {/* Ultra-subtle dot grid on right side */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.5px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Faint noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-12 pt-32 pb-20 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Side — Ask Beroqk (45%) */}
          <div className="w-full lg:w-[45%] order-2 lg:order-1">
            <AskBeroqk />
          </div>

          {/* Right Side — Messaging (55%) */}
          <div className="w-full lg:w-[55%] order-1 lg:order-2 text-center lg:text-left">
            {/* Headline */}
            <h1 className="mb-8">
              <span
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight uppercase text-white"
                style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                Intelligence
              </span>
              <span
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight uppercase text-white/50 mt-2"
                style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                that works.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-12">
              Efficient intelligence for work, research, and real-time
              assistance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">
              <Link
                href="/chat"
                className="group inline-flex items-center gap-2 px-8 h-12 text-sm font-medium rounded-xl bg-white text-black hover:bg-white/90 transition-all duration-200"
              >
                Try Beroqk Chat
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
              <Link
                href="/api-info"
                className="inline-flex items-center h-12 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 tracking-wide"
              >
                View API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
