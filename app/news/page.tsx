import Link from "next/link"

const newsItems = [
  {
    date: "April 5, 2026",
    title: "Our Mission: Efficient Intelligence",
    description: "AI should cost only what a task requires. Learn how Beroqk is building cost-efficiency infrastructure that lowers spend and wasted compute while preserving quality.",
    category: "company",
    slug: "/company",
  },
  {
    date: "March 28, 2026",
    title: "Introducing Beroqk Chat",
    description: "Full-capability AI that spends only what each task requires — quality preserved, cost reduced. Beroqk Chat is now available.",
    category: "product",
    slug: "/chat",
  },
  {
    date: "April 10, 2026",
    title: "Beroqk API — Coming Soon",
    description: "Put the Efficiency Engine behind your apps and lower AI spend on every request. Built for developers and designed for scale.",
    category: "product",
    slug: "/api-info",
  },
]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-40 md:pt-56 lg:pt-64 pb-32">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">
            Latest News
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Updates from Beroqk.
          </p>
        </header>

        {/* News Grid - 3 Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <article 
              key={index}
              className="group p-6 border border-border/30 rounded-xl hover:border-border/60 transition-all duration-200"
            >
              {/* Title */}
              <Link href={item.slug}>
                <h2 className="text-lg font-medium tracking-tight mb-3 group-hover:opacity-70 transition-opacity duration-200">
                  {item.title}
                </h2>
              </Link>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {item.description}
              </p>
              
              {/* Category and Read Link */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-muted-foreground/50">
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
      </div>
    </main>
  )
}
