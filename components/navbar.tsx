"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-mono text-lg font-bold tracking-wider">
            BEROQK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/chat" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              CHAT
            </Link>
            <Link 
              href="/api-info" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              API
            </Link>
            <Link 
              href="/company" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              COMPANY
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="font-mono text-xs tracking-wider">
              <Link href="/chat">TRY BEROQK</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link 
                href="/chat" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CHAT
              </Link>
              <Link 
                href="/api-info" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                href="/company" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                COMPANY
              </Link>
              <Button asChild className="font-mono text-xs tracking-wider w-fit">
                <Link href="/chat">TRY BEROQK</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
