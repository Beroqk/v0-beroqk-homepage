import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Company
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Learn about Beroqk&apos;s mission to redefine AI through efficiency and privacy.
        </p>
        <p className="text-muted-foreground/60 text-sm mb-8">
          Coming soon...
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
