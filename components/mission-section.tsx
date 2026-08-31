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
    <section className={`py-32 md:py-40 px-6 ${isDark ? "bg-black" : "bg-[#fafafa]"}`}>
      <div className="mx-auto max-w-5xl text-center">
        <p 
          className={`text-2xl md:text-3xl lg:text-4xl font-light text-balance ${isDark ? "text-white/85" : "text-black/85"}`}
          style={{ lineHeight: 1.4 }}
        >
          Beroqk is AI cost-efficiency infrastructure reducing spend and wasted compute without sacrificing quality.
        </p>
      </div>
    </section>
  )
}
