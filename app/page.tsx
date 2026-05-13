import { HeroSection } from "@/components/hero-section"
import { DivisionsSection } from "@/components/divisions-section"
import { ProductsSection } from "@/components/products-section"
import { SignupSection } from "@/components/signup-section"
import { NewsSection } from "@/components/news-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DivisionsSection />
      <ProductsSection />
      <SignupSection />
      <NewsSection />
    </main>
  )
}
