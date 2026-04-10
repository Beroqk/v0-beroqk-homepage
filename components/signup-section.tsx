import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignupSection() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-balance">
          Get started with Beroqk
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
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
