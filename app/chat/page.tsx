import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-6 pt-40 md:pt-48 lg:pt-56 pb-24">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
            Beroqk Chat
          </p>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-balance mb-4">
            Route Intelligence Efficiently
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
            Beroqk Chat automatically routes every task to the smartest, fastest, and most cost-effective AI.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-border bg-card shadow-sm p-6 md:p-8">
          <WaitlistForm />
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-10"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
