"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [activePreview, setActivePreview] = useState<"chat" | "build">("chat")
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
                width={600}
                height={200}
                className="h-48 sm:h-52 md:h-40 lg:h-48"
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
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute top-full -left-8 mt-6 p-8 rounded-3xl border shadow-2xl w-[680px] ${
                        isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/[0.08]"
                      }`}
                    >
                      <div className="flex gap-8">
                        {/* Left Side - Product Links */}
                        <div className="flex flex-col gap-2 w-[220px]">
                          {/* Chat Link */}
                          <Link
                            href="/chat"
                            className={`group block px-5 py-4 rounded-2xl transition-all duration-200 ${
                              activePreview === "chat" 
                                ? isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                                : isDark ? "hover:bg-white/[0.03]" : "hover:bg-black/[0.02]"
                            }`}
                            onMouseEnter={() => setActivePreview("chat")}
                            onClick={() => setIsProductsOpen(false)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>
                                Chat
                              </span>
                              <ArrowRight 
                                size={14} 
                                className={`transition-all duration-200 ${
                                  isDark ? "text-white/30 group-hover:text-white/60" : "text-black/30 group-hover:text-black/60"
                                } group-hover:translate-x-0.5`} 
                              />
                            </div>
                            <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-black/50"}`}>
                              Intelligent conversations with automatic AI routing.
                            </p>
                          </Link>

                          {/* Build Link */}
                          <Link
                            href="/api-info"
                            className={`group block px-5 py-4 rounded-2xl transition-all duration-200 ${
                              activePreview === "build" 
                                ? isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                                : isDark ? "hover:bg-white/[0.03]" : "hover:bg-black/[0.02]"
                            }`}
                            onMouseEnter={() => setActivePreview("build")}
                            onClick={() => setIsProductsOpen(false)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>
                                Build
                              </span>
                              <ArrowRight 
                                size={14} 
                                className={`transition-all duration-200 ${
                                  isDark ? "text-white/30 group-hover:text-white/60" : "text-black/30 group-hover:text-black/60"
                                } group-hover:translate-x-0.5`} 
                              />
                            </div>
                            <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-black/50"}`}>
                              Integrate powerful AI into your applications.
                            </p>
                          </Link>
                        </div>

                        {/* Right Side - Dynamic Preview Panel */}
                        <div className="flex-1 relative">
                          <div className={`h-[240px] rounded-2xl border overflow-hidden ${
                            isDark ? "bg-neutral-900 border-white/[0.06]" : "bg-neutral-50 border-black/[0.06]"
                          }`}>
                            <AnimatePresence mode="wait">
                              {activePreview === "chat" ? (
                                <motion.div
                                  key="chat-preview"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="absolute inset-0 p-5 flex flex-col"
                                >
                                  {/* Chat Messages */}
                                  <div className="flex-1 flex flex-col gap-3">
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

                                  {/* Preview Label */}
                                  <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                                    isDark ? "border-white/[0.06]" : "border-black/[0.06]"
                                  }`}>
                                    <span className={`text-xs uppercase tracking-wider ${isDark ? "text-white/30" : "text-black/30"}`}>
                                      Chat Preview
                                    </span>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="build-preview"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="absolute inset-0 p-5 flex flex-col"
                                >
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

                                  {/* Preview Label */}
                                  <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                                    isDark ? "border-white/[0.06]" : "border-black/[0.06]"
                                  }`}>
                                    <span className={`text-xs uppercase tracking-wider ${isDark ? "text-white/30" : "text-black/30"}`}>
                                      Build Preview
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
