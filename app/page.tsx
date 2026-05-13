import { HeroSection } from "@/components/hero-section"
import { DivisionsSection } from "@/components/divisions-section"
import { NewsSection } from "@/components/news-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DivisionsSection />
      <NewsSection />
    </main>
  )
}
