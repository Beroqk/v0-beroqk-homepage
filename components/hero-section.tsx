"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, Circle } from "lucide-react"

// Chat Mockup Component
function ChatMockup() {
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
        {/* Chat container */}
        <div
          className={`
            rounded-2xl border border-white/[0.08] 
            bg-white/[0.03] backdrop-blur-xl
            shadow-[0_8px_60px_rgba(0,0,0,0.4)]
            overflow-hidden transition-all duration-500
            ${isHovered ? "border-white/[0.12] shadow-[0_12px_80px_rgba(0,0,0,0.5)]" : ""}
          `}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <Menu size={16} className="text-white/40" />
              <div>
                <p className="text-[13px] font-medium text-white/80 tracking-wide">
                  Beroqk AI
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                  <span className="text-[10px] text-white/30 tracking-wide">
                    Online
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Circle size={14} className="text-white/20" />
              <Circle size={14} className="text-white/20" />
            </div>
          </div>

          {/* Chat messages */}
          <div className="px-5 py-6 space-y-5 min-h-[320px]">
            {/* Assistant message */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] font-medium text-white/50">B</span>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Hello. I&apos;m Beroqk.
                </p>
                <p className="text-[13px] text-white/70 leading-relaxed mt-1">
                  How can I help?
                </p>
              </div>
            </div>

            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-white/[0.08] border border-white/[0.08] rounded-xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                <p className="text-[13px] text-white/80 leading-relaxed">
                  Explain quantum computing simply.
                </p>
              </div>
            </div>

            {/* Assistant response */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] font-medium text-white/50">B</span>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Quantum computers use qubits, which can exist in multiple
                  states at once — allowing certain calculations dramatically
                  faster than classical systems.
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[13px] text-white/25 flex-grow">
                Ask anything...
              </span>
              <ArrowRight size={16} className="text-white/25" />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-5 pb-4">
            <p className="text-[10px] text-white/20 text-center tracking-wide">
              Beroqk can make mistakes. Verify important information.
            </p>
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
          {/* Left Side — Chat Mockup (45%) */}
          <div className="w-full lg:w-[45%] order-2 lg:order-1">
            <ChatMockup />
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
                className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200 tracking-wide"
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
