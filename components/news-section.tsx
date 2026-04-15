import Link from "next/link"
import { ArrowRight } from "lucide-react"

const news = [
  {
    title: "Beroqk API — Coming Soon",
    description: "Integrate efficient AI into your applications with our developer-first API.",
    href: "/api-info",
  },
  {
    title: "Our Mission: Efficient Intelligence",
    description: "Building AI that reduces compute, cost, and environmental impact.",
    href: "/company",
  },
  {
    title: "Introducing ROQK",
    description: "Your intelligent assistant, designed for speed, privacy, and efficiency.",
    href: "/chat",
  },
]

export function NewsSection() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl md:text-2xl font-normal tracking-tight mb-12">
          Latest News
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {news.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="group block p-6 rounded-xl border border-border/30 hover:border-border/60 bg-secondary/20 hover:bg-secondary/30 transition-all duration-200"
            >
              <h3 className="text-lg font-medium mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                {item.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
