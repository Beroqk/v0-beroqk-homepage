import Link from "next/link"

const newsItems = [
  {
    date: "April 10, 2026",
    title: "Beroqk API — Coming Soon",
    description: "Integrate efficient AI into your applications with the Beroqk API. Built for developers and designed for scale.",
    category: "product",
    slug: "/news/beroqk-api",
  },
  {
    date: "April 5, 2026",
    title: "Our Mission: Efficient Intelligence",
    description: "AI should be precise, scalable, and sustainable. Learn how Beroqk is building systems that reduce compute, cost, and environmental impact.",
    category: "company",
    slug: "/news/mission",
  },
  {
    date: "March 28, 2026",
    title: "Introducing ROQK",
    description: "Meet your intelligent assistant, designed for speed, privacy, and efficiency. ROQK is now available.",
    category: "product",
    slug: "/news/roqk",
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
              {/* Date */}
              <time className="block text-xs text-muted-foreground/60 mb-4">
                {item.date}
              </time>
              
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
