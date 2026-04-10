import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ApiPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Beroqk API
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Integrate efficient AI into your apps. Built for developers and scale.
        </p>
        <p className="text-muted-foreground/60 text-sm mb-8">
          Coming soon...
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
