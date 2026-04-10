"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/chat")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-40 lg:pt-48">
      {/* Glowing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(100,149,237,0.15)_0%,rgba(100,149,237,0.05)_40%,transparent_70%)] blur-3xl" />
        
        {/* Secondary glow */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.1)_0%,transparent_60%)] blur-2xl animate-pulse" />
        
        {/* Accent glow */}
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_60%)] blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-12 text-balance">
          Beroqk
        </h1>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to know?"
              className="w-full h-14 md:h-16 px-6 pr-14 bg-background/80 border border-white/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/50 focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-200 font-sans text-base md:text-lg backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Submit"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          <Button 
            type="submit"
            size="lg"
            className="mt-6 px-8 h-12 text-sm font-medium rounded-[10px] hover:brightness-110 hover:opacity-95 transition-all duration-200 ease-out"
          >
            Start Conversation
          </Button>
        </form>
      </div>
    </section>
  )
}
