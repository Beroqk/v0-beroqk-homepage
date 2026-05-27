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
    <section className={`py-32 md:py-40 px-6 border-t ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-[#fafafa]"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {products.map((product, index) => (
            <div 
              key={product.title} 
              className={`px-6 py-12 md:py-0 md:px-8 lg:px-12 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0 group relative ${
                index < products.length - 1 
                  ? `border-b md:border-b-0 md:border-r ${isDark ? "border-white/10" : "border-black/10"}` 
                  : ""
              }`}
            >
              <h3 className={`text-2xl md:text-3xl font-light tracking-tight mb-5 ${isDark ? "text-white/90" : "text-black/90"}`}>
                {product.title}
              </h3>
              <p className={`text-lg md:text-xl leading-relaxed mb-10 min-h-[80px] ${isDark ? "text-white/55" : "text-black/55"}`}>
                {product.description}
              </p>
              <Button 
                asChild 
                variant="ghost" 
                className="p-0 h-auto text-base font-medium text-foreground hover:text-accent hover:bg-transparent group"
              >
                <Link href={product.href} className="flex items-center gap-2">
                  {product.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
