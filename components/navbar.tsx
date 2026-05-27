"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-48 sm:h-52 md:h-48 lg:h-48 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-24 lg:gap-32">
            {/* Logo - switches based on theme */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src={isDark ? "/images/beroqk-logo.png" : "/images/beroqk-logo-black.png"}
                alt="BEROQK"
                width={500}
                height={160}
                className="h-40 sm:h-44 md:h-32 lg:h-40"
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Products Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  Products
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* Mega Dropdown Menu */}
                {isProductsOpen && (
                  <div className={`absolute top-full -left-8 mt-6 p-8 rounded-3xl border shadow-2xl w-[720px] ${
                    isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/[0.08]"
                  }`}>
                    {/* Two Card Grid */}
                    <div className="grid grid-cols-2 gap-5">
                      
                      {/* Chat Card */}
                      <Link
                        href="/chat"
                        className="group block"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <div className={`relative h-[280px] rounded-2xl border overflow-hidden transition-all duration-300 ${
                          isDark 
                            ? "bg-neutral-900 border-white/[0.06] hover:border-white/[0.12]" 
                            : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.1]"
                        } group-hover:-translate-y-0.5 group-hover:shadow-lg`}>
                          
                          {/* Chat Preview Content */}
                          <div className="absolute inset-0 p-5 flex flex-col">
                            {/* Chat Messages */}
                            <div className="flex-1 flex flex-col gap-3 pt-2">
                              <div className={`self-end max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md text-sm ${
                                isDark ? "bg-white/10 text-white/80" : "bg-black/10 text-black/80"
                              }`}>
                                Why is the sky blue?
                              </div>
                              
                              <div className={`self-start max-w-[90%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm ${
                                isDark ? "bg-white/[0.05] text-white/70" : "bg-black/[0.05] text-black/70"
                              }`}>
                                Shorter blue wavelengths scatter more off air molecules than longer red ones.
                              </div>

                              <div className={`self-end max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md text-sm ${
                                isDark ? "bg-white/10 text-white/80" : "bg-black/10 text-black/80"
                              }`}>
                                How do black holes form?
                              </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-end justify-between mt-4 pt-4 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                              <div>
                                <div className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>
                                  Chat
                                </div>
                                <div className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-black/50"}`}>
                                  Intelligent AI conversations
                                </div>
                              </div>
                              <span className={`text-sm flex items-center gap-1.5 transition-all duration-200 ${
                                isDark ? "text-white/40 group-hover:text-white" : "text-black/40 group-hover:text-black"
                              }`}>
                                Explore <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Build Card */}
                      <Link
                        href="/api-info"
                        className="group block"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <div className={`relative h-[280px] rounded-2xl border overflow-hidden transition-all duration-300 ${
                          isDark 
                            ? "bg-neutral-900 border-white/[0.06] hover:border-white/[0.12]" 
                            : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.1]"
                        } group-hover:-translate-y-0.5 group-hover:shadow-lg`}>
                          
                          {/* Code Preview Content */}
                          <div className="absolute inset-0 p-5 flex flex-col">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                              </div>
                              <span className={`text-xs ml-2 ${isDark ? "text-white/30" : "text-black/30"}`}>
                                api/route.ts
                              </span>
                            </div>
                            
                            {/* Code Block */}
                            <div className={`flex-1 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-hidden ${
                              isDark ? "bg-black/40" : "bg-black/[0.03]"
                            }`}>
                              <div><span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> <span className={isDark ? "text-white/70" : "text-black/70"}>{"{ beroqk }"}</span> <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-green-400" : "text-green-600"}>&quot;@beroqk/ai&quot;</span></div>
                              <div className="mt-3"><span className={isDark ? "text-purple-400" : "text-purple-600"}>const</span> <span className={isDark ? "text-blue-400" : "text-blue-600"}>response</span> <span className={isDark ? "text-white/50" : "text-black/50"}>=</span> <span className={isDark ? "text-purple-400" : "text-purple-600"}>await</span> <span className={isDark ? "text-yellow-400" : "text-yellow-600"}>beroqk</span><span className={isDark ? "text-white/50" : "text-black/50"}>.</span><span className={isDark ? "text-blue-400" : "text-blue-600"}>chat</span><span className={isDark ? "text-white/50" : "text-black/50"}>{"({"}</span></div>
                              <div className="ml-4"><span className={isDark ? "text-white/70" : "text-black/70"}>model</span><span className={isDark ? "text-white/50" : "text-black/50"}>:</span> <span className={isDark ? "text-green-400" : "text-green-600"}>&quot;auto&quot;</span><span className={isDark ? "text-white/50" : "text-black/50"}>,</span></div>
                              <div className="ml-4"><span className={isDark ? "text-white/70" : "text-black/70"}>messages</span><span className={isDark ? "text-white/50" : "text-black/50"}>:</span> <span className={isDark ? "text-white/50" : "text-black/50"}>[]</span></div>
                              <div><span className={isDark ? "text-white/50" : "text-black/50"}>{"})"}</span></div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-end justify-between mt-4 pt-4 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                              <div>
                                <div className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>
                                  Build
                                </div>
                                <div className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-black/50"}`}>
                                  Integrate AI into your apps
                                </div>
                              </div>
                              <span className={`text-sm flex items-center gap-1.5 transition-all duration-200 ${
                                isDark ? "text-white/40 group-hover:text-white" : "text-black/40 group-hover:text-black"
                              }`}>
                                Explore <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="/company" 
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                Company
              </Link>
              <Link 
                href="/careers" 
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                Careers
              </Link>
              <Link 
                href="/news" 
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                News
              </Link>
              <a 
                href="https://beroqk.store" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                Shop
              </a>
            </div>
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/chat"
              className="lg:hidden text-xs font-medium px-4 h-10 inline-flex items-center rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-200"
            >
              Try Beroqk
            </Link>
            <button
              className="lg:hidden p-3 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/chat"
              className="text-sm font-medium px-6 h-12 inline-flex items-center rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-200"
            >
              Try Beroqk
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-5">
              {/* Products Section */}
              <div className="flex flex-col gap-2">
                <span className="text-base font-medium uppercase tracking-wide text-muted-foreground">
                  Products
                </span>
                <div className="pl-4 flex flex-col gap-3">
                  <Link 
                    href="/chat" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chat
                  </Link>
                  <Link 
                    href="/api-info" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Build
                  </Link>
                </div>
              </div>
              <Link 
                href="/company" 
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Company
              </Link>
              <Link 
                href="/careers" 
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/news" 
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <a 
                href="https://beroqk.store" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
