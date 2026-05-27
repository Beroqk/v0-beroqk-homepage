"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function MissionSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="mx-auto max-w-5xl text-center">
        <p 
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-balance px-2 ${isDark ? "text-white/85" : "text-black/85"}`}
          style={{ lineHeight: 1.4 }}
        >
          Beroqk builds efficient AI that reduces compute, cost, and environmental impact.
        </p>
      </div>
    </section>
  )
}
