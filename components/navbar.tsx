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
                  <div className={`absolute top-full -left-8 mt-6 p-6 rounded-2xl border shadow-2xl w-[580px] ${
                    isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/[0.08]"
                  }`}>
                    <div className="flex gap-6">
                      {/* Left Side - Product Links */}
                      <div className="flex flex-col gap-1 w-[180px]">
                        <Link
                          href="/chat"
                          className={`group block px-4 py-3 rounded-xl transition-all duration-200 ${
                            isDark ? "hover:bg-white/[0.04]" : "hover:bg-black/[0.03]"
                          }`}
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <div className={`text-sm font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>
                            Chat
                          </div>
                          <div className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-black/50"}`}>
                            Intelligent AI conversations with automatic routing.
                          </div>
                        </Link>
                        <Link
                          href="/api-info"
                          className={`group block px-4 py-3 rounded-xl transition-all duration-200 ${
                            isDark ? "hover:bg-white/[0.04]" : "hover:bg-black/[0.03]"
                          }`}
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <div className={`text-sm font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>
                            Build
                          </div>
                          <div className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-black/50"}`}>
                            Integrate powerful AI into your applications.
                          </div>
                        </Link>
                      </div>

                      {/* Right Side - Visual Preview Card */}
                      <div className="flex-1">
                        <div className={`relative h-full min-h-[180px] rounded-2xl border overflow-hidden ${
                          isDark ? "bg-neutral-900 border-white/[0.06]" : "bg-neutral-50 border-black/[0.06]"
                        }`}>
                          {/* Chat Preview Mockup */}
                          <div className="absolute inset-0 p-5 flex flex-col">
                            {/* Mini Chat Interface */}
                            <div className={`text-xs font-medium mb-3 ${isDark ? "text-white/40" : "text-black/40"}`}>
                              Preview
                            </div>
                            
                            {/* Chat Messages */}
                            <div className="flex-1 flex flex-col gap-2.5">
                              {/* Message bubble 1 */}
                              <div className={`self-end max-w-[75%] px-3 py-2 rounded-xl rounded-br-md text-[11px] ${
                                isDark ? "bg-white/10 text-white/80" : "bg-black/10 text-black/80"
                              }`}>
                                Why is the sky blue?
                              </div>
                              
                              {/* Message bubble 2 */}
                              <div className={`self-start max-w-[85%] px-3 py-2 rounded-xl rounded-bl-md text-[11px] ${
                                isDark ? "bg-white/[0.05] text-white/70" : "bg-black/[0.05] text-black/70"
                              }`}>
                                Shorter blue wavelengths scatter more off air molecules than longer red ones.
                              </div>

                              {/* Message bubble 3 */}
                              <div className={`self-end max-w-[75%] px-3 py-2 rounded-xl rounded-br-md text-[11px] ${
                                isDark ? "bg-white/10 text-white/80" : "bg-black/10 text-black/80"
                              }`}>
                                How do black holes form?
                              </div>
                            </div>

                            {/* Footer label */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
                              <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-white/30" : "text-black/30"}`}>
                                Chat
                              </span>
                              <span className={`text-[10px] flex items-center gap-1 ${isDark ? "text-white/40" : "text-black/40"}`}>
                                Explore <span className="text-[8px]">→</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
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
