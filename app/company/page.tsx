"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

const principles = [
  {
    title: "Reasoning from First Principles",
    description: "We break problems down to their fundamentals and build from the ground up.",
  },
  {
    title: "Efficiency at Scale",
    description: "We optimize intelligence to use only what is needed — reducing waste without sacrificing performance.",
  },
  {
    title: "Build What Matters",
    description: "We focus on solving real problems with meaningful impact, not unnecessary complexity.",
  },
]

const newsItems = [
  {
    title: "Introducing Beroqk API",
    date: "March 2026",
    href: "/blog",
  },
  {
    title: "Our Approach to Efficient AI",
    date: "February 2026",
    href: "/blog",
  },
  {
    title: "Beroqk is Now Available",
    date: "January 2026",
    href: "/blog",
  },
]

export default function CompanyPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-4")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Space horizon gradient - top right */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(30, 58, 138, 0.15) 0%, rgba(11, 26, 58, 0.08) 40%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
        }}
      />
      <div className="max-w-3xl mx-auto px-6 pt-48 pb-32 relative z-10">
        
        {/* Mission Section */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-6">
            Our Mission
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8 text-balance">
            Build Efficient Intelligence
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            AI should be precise, scalable, and sustainable. Beroqk builds systems that reduce compute, cost, and environmental impact while improving how intelligence is applied.
          </p>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border/50 my-20" />

        {/* At Our Core Section */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-6">
            At our core
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-16">
            We are a focused team driven by curiosity, precision, and the pursuit of better systems.
          </p>

          {/* Principles */}
          <div className="flex flex-col gap-12">
            {principles.map((principle, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border/50 my-20" />

        {/* Collaboration Section */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-6">
            Collaboration
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Built for the future
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
            Beroqk is building the foundation for a new generation of AI systems designed for efficiency, privacy, and long-term scalability.
          </p>
          <Link 
            href="/careers" 
            className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Join us
          </Link>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border/50 my-20" />

        {/* Latest News Section */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-10">
            Latest News
          </p>
          <div className="flex flex-col gap-8">
            {newsItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="group flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-2 hover:opacity-70 transition-opacity"
              >
                <h3 className="text-lg font-medium tracking-tight group-hover:text-foreground transition-colors">
                  {item.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {item.date}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
