"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Rotating placeholders for the input
const placeholders = [
  "Plan my week",
  "Compare Claude vs GPT pricing",
  "Summarize this contract",
  "Build a launch strategy",
]

export function BentoSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [showPulse, setShowPulse] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

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
    <section className={`py-24 md:py-32 px-6 transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Chat Card - Large Left */}
          <Link 
            href="/chat" 
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={`
                relative overflow-hidden rounded-3xl border h-[500px] lg:h-[620px]
                transition-all duration-500 ease-out
                ${isDark 
                  ? "bg-neutral-950 border-white/[0.08] hover:border-white/[0.15]" 
                  : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                }
                group-hover:-translate-y-1 group-hover:shadow-2xl
              `}
            >
              {/* Glass panel chat mockup */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                {/* Ask Beroqk title */}
                <h3 className={`text-4xl md:text-5xl font-light tracking-wide mb-8 ${isDark ? "text-white/80" : "text-black/80"}`}>
                  Ask Beroqk
                </h3>

                {/* Input field mockup */}
                <div
                  className={`
                    w-full max-w-md flex items-center gap-4 px-6 py-5 rounded-2xl 
                    border transition-all duration-300
                    ${isDark 
                      ? "bg-white/[0.02] border-white/[0.06] group-hover:border-white/[0.12] group-hover:bg-white/[0.04]"
                      : "bg-black/[0.02] border-black/[0.05] group-hover:border-black/[0.1] group-hover:bg-black/[0.04]"
                    }
                  `}
                >
                  <span className={`text-lg md:text-xl flex-grow font-light tracking-wide ${isDark ? "text-white/40" : "text-black/40"}`}>
                    {displayText}
                    <span className={`${showCursor ? "opacity-100" : "opacity-0"} ${isDark ? "text-white/50" : "text-black/50"} transition-opacity duration-100`}>|</span>
                  </span>
                  <ArrowRight 
                    size={20} 
                    className={`${isDark ? "text-white/30 group-hover:text-white/50" : "text-black/30 group-hover:text-black/50"} group-hover:translate-x-0.5 transition-all duration-300`}
                  />
                </div>

                {/* Routing indicator */}
                <div className="mt-6 flex items-center justify-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full transition-opacity duration-1000 ${showPulse ? "opacity-100" : "opacity-40"} ${isDark ? "bg-white/30" : "bg-black/30"}`} />
                  <span className={`text-base tracking-wide ${isDark ? "text-white/40" : "text-black/40"}`}>
                    Uses only the intelligence each task requires.
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                    isDark ? "text-white/40" : "text-black/40"
                  }`}>
                    Chat
                  </span>
                  <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                    Full capability, less spend.
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                  isDark 
                    ? "text-white/50 group-hover:text-white" 
                    : "text-black/50 group-hover:text-black"
                }`}>
                  <span>Explore</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-5">
            {/* Build Card */}
            <Link href="/api-info" className="group block flex-1">
              <div 
                className={`
                  relative overflow-hidden rounded-3xl border h-[300px]
                  transition-all duration-500 ease-out
                  ${isDark 
                    ? "bg-neutral-950 border-white/[0.08] hover:border-white/[0.15]" 
                    : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                  }
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                `}
              >
                {/* Code/Routing Visual */}
                <div className="absolute inset-6 flex items-center justify-center">
                  <div className={`w-full max-w-sm rounded-xl border overflow-hidden font-mono text-xs ${
                    isDark ? "bg-black border-white/[0.06]" : "bg-neutral-900 border-black/[0.06]"
                  }`}>
                    {/* Code Header */}
                    <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-white/30 text-[10px]">route.ts</span>
                    </div>
                    {/* Code Content */}
                    <div className="p-4 space-y-1.5 text-[11px]">
                      <div>
                        <span className="text-purple-400">import</span>
                        <span className="text-white/70"> {"{"} beroqk {"}"} </span>
                        <span className="text-purple-400">from</span>
                        <span className="text-green-400"> &apos;@beroqk/ai&apos;</span>
                      </div>
                      <div className="text-white/30">{"// Route to optimal model"}</div>
                      <div>
                        <span className="text-blue-400">const</span>
                        <span className="text-white/70"> response = </span>
                        <span className="text-purple-400">await</span>
                        <span className="text-yellow-400"> beroqk</span>
                        <span className="text-white/70">.chat({"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-white/70">model: </span>
                        <span className="text-green-400">&apos;auto&apos;</span>
                        <span className="text-white/70">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-white/70">message: prompt</span>
                      </div>
                      <div>
                        <span className="text-white/70">{"}"})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                      isDark ? "text-white/40" : "text-black/40"
                    }`}>
                      Build
                    </span>
                    <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                      Lower AI spend in your apps.
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                    isDark 
                      ? "text-white/50 group-hover:text-white" 
                      : "text-black/50 group-hover:text-black"
                  }`}>
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Shop Card */}
            <a href="https://shop.beroqk.com" target="_blank" rel="noopener noreferrer" className="group block flex-1">
              <div 
                className={`
                  relative overflow-hidden rounded-3xl border h-[300px]
                  transition-all duration-500 ease-out
                  ${isDark 
                    ? "bg-black border-white/[0.08] hover:border-white/[0.15]" 
                    : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                  }
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                `}
              >
                {/* Shop Visual - Product Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src="/images/shop-hat.png"
                      alt="Beroqk Cap"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                      isDark ? "text-white/40" : "text-black/40"
                    }`}>
                      Shop
                    </span>
                    <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                      Premium gear for builders.
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                    isDark 
                      ? "text-white/50 group-hover:text-white" 
                      : "text-black/50 group-hover:text-black"
                  }`}>
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
