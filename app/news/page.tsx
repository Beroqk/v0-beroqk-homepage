import Link from "next/link"

const newsItems = [
  {
    date: "April 8, 2026",
    title: "Introducing Beroqk-3: Our Most Efficient Model Yet",
    description: "Today we release Beroqk-3, achieving state-of-the-art performance while using 40% less compute than previous generations.",
    category: "product",
    slug: "/news/beroqk-3-release",
  },
  {
    date: "March 22, 2026",
    title: "Beroqk API Now Available for Enterprise",
    description: "Enterprise customers can now access the full Beroqk API suite with dedicated support, custom rate limits, and enhanced security features.",
    category: "product",
    slug: "/news/enterprise-api",
  },
  {
    date: "March 15, 2026",
    title: "Scaling Laws for Efficient Intelligence",
    description: "Our research team publishes new findings on how model efficiency scales with parameter count and training compute.",
    category: "research",
    slug: "/news/scaling-laws",
  },
  {
    date: "February 28, 2026",
    title: "Beroqk Raises Series B to Accelerate Development",
    description: "We are thrilled to announce our Series B funding round, which will help us expand our team and infrastructure.",
    category: "company",
    slug: "/news/series-b",
  },
  {
    date: "February 10, 2026",
    title: "New Reasoning Capabilities in Beroqk Chat",
    description: "Beroqk Chat now features enhanced reasoning capabilities, allowing for more complex problem-solving and multi-step analysis.",
    category: "product",
    slug: "/news/reasoning-update",
  },
  {
    date: "January 18, 2026",
    title: "Reducing AI's Environmental Footprint",
    description: "A deep dive into how efficient architectures can significantly reduce the carbon footprint of AI systems without sacrificing performance.",
    category: "research",
    slug: "/news/environmental-impact",
  },
]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-40 md:pt-56 lg:pt-64 pb-32">
        {/* Header */}
        <header className="mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Latest News
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Read about our latest product, research, and company updates.
          </p>
        </header>

        {/* News Feed */}
        <div className="flex flex-col">
          {newsItems.map((item, index) => (
            <article 
              key={index}
              className="group py-10 border-t border-border/30 first:border-t-0 first:pt-0"
            >
              {/* Date */}
              <time className="block text-sm text-muted-foreground/70 mb-3">
                {item.date}
              </time>
              
              {/* Title */}
              <Link href={item.slug}>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-3 group-hover:opacity-70 transition-opacity duration-200">
                  {item.title}
                </h2>
              </Link>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                {item.description}
              </p>
              
              {/* Category and Read Link */}
              <div className="flex items-center gap-6">
                <span className="text-xs uppercase tracking-wide text-muted-foreground/60">
                  {item.category}
                </span>
                <Link 
                  href={item.slug}
                  className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Read
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Section Divider */}
        <div className="border-t border-border/30 mt-16 pt-16">
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground/60 mb-8">
            Archives
          </h3>
          <div className="flex flex-wrap gap-6">
            <Link 
              href="/news?category=product" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link 
              href="/news?category=research" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Research
            </Link>
            <Link 
              href="/news?category=company" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Company
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
