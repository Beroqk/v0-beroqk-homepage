"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function SignupSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`py-32 md:py-40 px-6 border-t ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-[#fafafa]"}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-balance ${isDark ? "text-white/95" : "text-black/95"}`}
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Get started with Beroqk
        </h2>
        <p className={`text-xl md:text-2xl mb-12 ${isDark ? "text-white/55" : "text-black/55"}`}>
          Create your account and start using efficient AI.
        </p>
        <Button 
          asChild 
          size="lg"
          className="px-10 h-14 text-base font-medium hover:scale-105 transition-transform"
        >
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  )
}
