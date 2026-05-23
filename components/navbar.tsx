"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
              <Link 
                href="/chat" 
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                Beroqk Chat
              </Link>
              <Link 
                href="/api-info" 
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                API
              </Link>
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
              <Link 
                href="/chat" 
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beroqk Chat
              </Link>
              <Link 
                href="/api-info" 
                className="text-base font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API
              </Link>
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
