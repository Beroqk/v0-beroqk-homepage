"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Rotating placeholders for the input
const placeholders = [
  "Plan my week",
  "Compare Claude vs GPT pricing",
  "Summarize this contract",
  "Build a launch strategy",
]

// Apple-inspired minimal AI input interface
function ChatDemo() {
  const [isHovered, setIsHovered] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [showPulse, setShowPulse] = useState(true)

  // Rotate placeholders with typing effect
  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex]
    
    if (isTyping) {
      if (displayText.length < currentPlaceholder.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPlaceholder.slice(0, displayText.length + 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2500)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 25)
        return () => clearTimeout(timeout)
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, placeholderIndex])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:mx-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating animation wrapper */}
      <div
        className="transition-transform duration-700 ease-out"
        style={{ transform: isHovered ? "translateY(-2px)" : "translateY(0)" }}
      >
        {/* Glass panel container - theme aware */}
        <div
          className={`
            rounded-3xl border backdrop-blur-2xl
            shadow-[0_8px_60px_rgba(0,0,0,0.08)]
            dark:shadow-[0_8px_60px_rgba(0,0,0,0.4)]
            overflow-hidden transition-all duration-500
            bg-white/90 dark:bg-[#0d1220]/80
            ${isHovered 
              ? "border-black/[0.08] dark:border-white/[0.15] shadow-[0_12px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_80px_rgba(0,0,0,0.5)]" 
              : "border-black/[0.04] dark:border-white/[0.08]"
            }
          `}
        >
          {/* Center: Ask Beroqk prompt */}
          <div className="px-8 pt-10 pb-6 text-center">
            <h3 className="text-4xl md:text-5xl font-light tracking-wide text-foreground/85">
              Ask Beroqk
            </h3>
          </div>

          {/* Input field */}
          <div className="px-6 pb-6">
            <Link
              href="/chat"
              className={`
                flex items-center gap-4 px-6 py-5 rounded-2xl 
                border transition-all duration-300 cursor-pointer group
                bg-black/[0.02] dark:bg-white/[0.03]
                ${isHovered 
                  ? "border-black/[0.1] dark:border-white/[0.15] bg-black/[0.04] dark:bg-white/[0.05]" 
                  : "border-black/[0.06] dark:border-white/[0.08]"
                }
                hover:border-black/[0.12] dark:hover:border-white/[0.18] 
                hover:bg-black/[0.05] dark:hover:bg-white/[0.06]
              `}
            >
              <span className="text-lg md:text-xl flex-grow font-light tracking-wide text-foreground/45">
                {displayText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-foreground/60 transition-opacity duration-100`}>|</span>
              </span>
              <ArrowRight 
                size={20} 
                className="text-foreground/35 group-hover:text-foreground/60 group-hover:translate-x-0.5 transition-all duration-300" 
              />
            </Link>
          </div>

          {/* Routing indicator */}
          <div className="px-6 pb-8 flex items-center justify-center gap-2.5">
            <div className={`w-2 h-2 rounded-full bg-foreground/35 transition-opacity duration-1000 ${showPulse ? "opacity-100" : "opacity-40"}`} />
            <span className="text-base tracking-wide text-foreground/45">
              Automatically routes to the optimal AI.
            </span>
          </div>
        </div>
      </div>

      {/* Ultra subtle glow - theme aware */}
      <div
        className={`absolute -inset-16 -z-10 rounded-[40px] transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-30"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(128,128,128,0.03) 0%, transparent 55%)",
        }}
      />
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - theme aware */}
      <div className="absolute inset-0 bg-background transition-colors duration-500">
        {/* Subtle radial gradient */}
        <div
          className="absolute inset-0 dark:opacity-100 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 30% 50%, rgba(128,128,128,0.04) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 70% 60%, rgba(128,128,128,0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* Faint noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-12 pt-32 pb-20 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side — Chat Demo (50%) */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ChatDemo />
          </div>

          {/* Right Side — Messaging (50%) */}
          <div 
            className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              <span className="text-foreground">EFFICIENT</span>{" "}
              <span className="text-foreground/50">INTELLIGENCE.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-foreground/55 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-12">
              Route every task to the smartest, fastest, and most cost-effective AI automatically.
            </p>

            {/* CTAs - theme aware */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Link
                href="/chat"
                className="group inline-flex items-center gap-2.5 px-10 h-14 py-4 text-base font-medium rounded-xl bg-foreground text-background hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                Start Chatting
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/api-info"
                className="inline-flex items-center gap-2 h-14 px-8 py-4 text-base text-foreground/55 hover:text-foreground/85 border border-foreground/[0.1] hover:border-foreground/[0.2] rounded-xl transition-all duration-300 hover:bg-foreground/[0.03]"
              >
                Explore API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
