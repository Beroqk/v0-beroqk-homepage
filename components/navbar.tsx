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
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-24 md:h-32 lg:h-36 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-12 md:gap-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/beroqk-logo.png"
                alt="BEROQK"
                width={400}
                height={120}
                className="h-12 md:h-24 lg:h-[120px]"
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link 
                href="/chat" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Beroqk Chat
              </Link>
              <Link 
                href="/api-info" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                API
              </Link>
              <Link 
                href="/company" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Company
              </Link>
              <Link 
                href="/careers" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Careers
              </Link>
              <Link 
                href="/news" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                News
              </Link>
              <Link 
                href="/shop" 
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:opacity-80 transition-all duration-200"
              >
                Shop
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="text-sm font-medium">
              <Link href="/chat">Try Beroqk</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link 
                href="/chat" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beroqk Chat
              </Link>
              <Link 
                href="/api-info" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                href="/company" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Company
              </Link>
              <Link 
                href="/careers" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/news" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/shop" 
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Button asChild className="text-sm font-medium uppercase w-fit">
                <Link href="/chat">Try Beroqk</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
