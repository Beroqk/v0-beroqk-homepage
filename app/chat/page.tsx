import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Text - left */}
          <div className="text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
              Beroqk Chat
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-balance mb-5">
              Route Intelligence Efficiently
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty max-w-md mx-auto lg:mx-0">
              Beroqk Chat automatically routes every task to the smartest, fastest, and most cost-effective AI.
            </p>
          </div>

          {/* Form box - right */}
          <div className="w-full rounded-3xl border border-border bg-card shadow-sm p-6 md:p-8">
            <WaitlistForm />
          </div>
        </div>

        <div className="flex justify-center lg:justify-start mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
