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
        <div className="flex h-24 md:h-28 lg:h-32 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/beroqk-logo.png"
              alt="BEROQK"
              width={500}
              height={160}
              className="h-16 sm:h-20 md:h-24 lg:h-28"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
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
            <Button asChild size="sm" className="text-xs font-medium uppercase tracking-wide px-5 h-9 ml-2">
              <Link href="/chat">Try Beroqk</Link>
            </Button>
          </div>

          {/* Mobile right: Try Beroqk + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Button asChild size="sm" className="text-xs font-medium uppercase tracking-wide px-4 h-8">
              <Link href="/chat">Try Beroqk</Link>
            </Button>
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden py-5 border-t border-border/50">
            <div className="flex flex-col gap-5">
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
              <a 
                href="https://beroqk.store" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
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
