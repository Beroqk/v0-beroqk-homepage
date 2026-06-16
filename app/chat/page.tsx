import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-40">
      <div className="flex flex-col items-center text-center max-w-xl">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6" style={{ letterSpacing: "-0.03em" }}>
          Efficient Intelligence.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-md">
          Beroqk Chat automatically routes every task to the smartest, fastest, and most cost-effective AI.
        </p>

        <WaitlistForm />

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
