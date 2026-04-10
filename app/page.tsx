import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { ProductsSection } from "@/components/products-section"
import { SignupSection } from "@/components/signup-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <MissionSection />
      <ProductsSection />
      <SignupSection />
      <NewsSection />
      <Footer />
    </main>
  )
}
