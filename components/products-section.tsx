"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const products = [
  {
    title: "Chat",
    description: "Beroqk Chat is your intelligent assistant, designed for speed, privacy, and efficiency.",
    cta: "Use Now",
    href: "/chat",
  },
  {
    title: "API",
    description: "Integrate efficient AI into your apps with the Beroqk API. Built for developers and scale.",
    cta: "Build Now",
    href: "/api-info",
  },
  {
    title: "Company",
    description: "Learn about Beroqk's mission to redefine AI through efficiency and privacy.",
    cta: "Learn More",
    href: "/company",
  },
]

export function ProductsSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 border-t ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-white"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {products.map((product, index) => (
            <div 
              key={product.title} 
              className={`px-4 sm:px-6 py-8 sm:py-10 md:py-0 md:px-6 lg:px-8 xl:px-12 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0 group relative ${
                index < products.length - 1 
                  ? `border-b md:border-b-0 md:border-r ${isDark ? "border-white/10" : "border-black/10"}` 
                  : ""
              }`}
            >
              <h3 className={`text-xl sm:text-2xl md:text-2xl lg:text-3xl font-light tracking-tight mb-3 sm:mb-4 md:mb-5 ${isDark ? "text-white/90" : "text-black/90"}`}>
                {product.title}
              </h3>
              <p className={`text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 min-h-0 md:min-h-[80px] ${isDark ? "text-white/55" : "text-black/55"}`}>
                {product.description}
              </p>
              <Button 
                asChild 
                variant="ghost" 
                className="p-0 h-auto text-sm sm:text-base font-medium text-foreground hover:text-accent hover:bg-transparent group"
              >
                <Link href={product.href} className="flex items-center gap-2">
                  {product.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
