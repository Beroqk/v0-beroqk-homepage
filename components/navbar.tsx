"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-32 sm:h-36 md:h-40 lg:h-48 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8 sm:gap-12 md:gap-24 lg:gap-32">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/beroqk-logo.png"
                alt="BEROQK"
                width={500}
                height={160}
                className="h-24 sm:h-28 md:h-32 lg:h-40"
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <Link 
                href="/chat" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Beroqk Chat
              </Link>
              <Link 
                href="/api-info" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                API
              </Link>
              <Link 
                href="/company" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Company
              </Link>
              <Link 
                href="/careers" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Careers
              </Link>
              <Link 
                href="/news" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                News
              </Link>
              <a 
                href="https://beroqk.store" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Shop
              </a>
            </div>
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button asChild size="sm" className="lg:hidden text-xs font-medium px-4 h-10">
              <Link href="/chat">Try Beroqk</Link>
            </Button>
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
            <Button asChild size="lg" className="text-sm font-medium px-6 h-12">
              <Link href="/chat">Try Beroqk</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50">
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
