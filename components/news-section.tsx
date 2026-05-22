import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
  {
    title: "B-STING: Privacy Before Access - Coming Soon",
    description: "An active privacy layer that protects before access. Your data stays protected.",
    href: "/b-sting",
  },
]

export function NewsSection() {
  return (
    <section className="py-32 md:py-40 px-6 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <span className="text-sm md:text-base font-medium uppercase tracking-[0.25em] text-white/45 block mb-6">
          News
        </span>
        
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white/95 mb-20"
          style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          Latest News
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="group block p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <h3 className="text-xl font-normal text-white/90 mb-4 group-hover:text-white transition-colors flex items-center gap-2">
                {item.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-base text-white/50 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
