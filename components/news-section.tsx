import Link from "next/link"
import { ArrowRight } from "lucide-react"

const news = [
  {
    date: "April 8, 2026",
    title: "Introducing Beroqk 2.0: 50% More Efficient",
    description: "Our latest model achieves state-of-the-art performance while using half the compute of previous generations.",
    href: "/blog",
  },
  {
    date: "March 22, 2026",
    title: "Beroqk API Now Available for Enterprise",
    description: "Scale your AI applications with our enterprise-grade API, featuring dedicated support and SLAs.",
    href: "/blog",
  },
  {
    date: "March 10, 2026",
    title: "Our Commitment to Sustainable AI",
    description: "How Beroqk is leading the charge toward environmentally responsible artificial intelligence.",
    href: "/blog",
  },
]

export function NewsSection() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-12">
          Latest News
        </h2>
        
        <div className="space-y-0 divide-y divide-border/50">
          {news.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="block py-8 first:pt-0 last:pb-0 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <span className="text-sm text-muted-foreground shrink-0 md:w-32">
                  {item.date}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                    {item.title}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
