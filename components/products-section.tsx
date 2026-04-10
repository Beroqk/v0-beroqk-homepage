import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {products.map((product) => (
            <div 
              key={product.title} 
              className="px-6 py-12 md:py-0 md:px-8 lg:px-12 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0 group"
            >
              <h3 className="font-mono text-xl font-medium tracking-wide mb-4">
                {product.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 min-h-[80px]">
                {product.description}
              </p>
              <Button 
                asChild 
                variant="ghost" 
                className="p-0 h-auto font-mono text-sm tracking-wider text-foreground hover:text-accent hover:bg-transparent group"
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
