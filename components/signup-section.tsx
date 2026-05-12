import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignupSection() {
  return (
    <section className="py-32 md:py-40 px-6 border-t border-white/10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-light text-white/95 mb-6 text-balance"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Get started with Beroqk
        </h2>
        <p className="text-white/50 text-lg md:text-xl mb-10">
          Create your account and start using efficient AI.
        </p>
        <Button 
          asChild 
          size="lg"
          className="px-8 h-12 text-sm font-medium hover:scale-105 transition-transform"
        >
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  )
}
