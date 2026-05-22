import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignupSection() {
  return (
    <section className="py-32 md:py-40 px-6 border-t border-foreground/10 bg-background transition-colors duration-500">
      <div className="mx-auto max-w-2xl text-center">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground/95 mb-8 text-balance"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Get started with Beroqk
        </h2>
        <p className="text-foreground/55 text-xl md:text-2xl mb-12">
          Create your account and start using efficient AI.
        </p>
        <Button 
          asChild 
          size="lg"
          className="px-10 h-14 text-base font-medium hover:scale-105 transition-transform"
        >
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  )
}
