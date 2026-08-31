"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const news = [
  {
    title: "Our Mission: Efficient Intelligence",
    description: "Building AI that reduces compute, cost, and environmental impact.",
    href: "/company",
  },
  {
    title: "Introducing Beroqk Chat",
    description: "Your intelligent assistant, designed for speed, privacy, and efficiency.",
    href: "/chat",
  },
  {
    title: "Beroqk API — Coming Soon",
    description: "Integrate efficient AI into your applications with our developer-first API.",
    href: "/api-info",
  },
]

export function NewsSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`py-32 md:py-40 px-6 border-t ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-[#fafafa]"}`}>
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <span className={`text-sm md:text-base font-medium uppercase tracking-[0.25em] block mb-6 ${isDark ? "text-white/45" : "text-black/45"}`}>
          News
        </span>
        
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl font-light mb-20 ${isDark ? "text-white/95" : "text-black/95"}`}
          style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          Latest News
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className={`group block p-6 rounded-xl border transition-all duration-300 ${
                isDark 
                  ? "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                  : "border-black/10 hover:border-black/15 bg-black/[0.02] hover:bg-black/[0.04]"
              }`}
            >
              <h3 className={`text-xl font-normal mb-4 transition-colors flex items-center gap-2 ${
                isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"
              }`}>
                {item.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? "text-white/50" : "text-black/50"}`}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
