import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WireframeGlobe } from "@/components/wireframe-globe"

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-40 md:pt-56 lg:pt-64 relative overflow-hidden">
      {/* Globe background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]">
          <WireframeGlobe />
        </div>
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Careers
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Join us in building the future of efficient AI. We&apos;re always looking for talented people.
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
