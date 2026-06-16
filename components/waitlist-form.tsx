"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { joinWaitlist } from "@/app/chat/actions"

export function WaitlistForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setStatus("loading")
    setErrorMessage("")

    const result = await joinWaitlist(name, email)

    if (result.ok) {
      setStatus("success")
    } else {
      setStatus("error")
      setErrorMessage(result.error ?? "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <p className="text-xl md:text-2xl font-light text-foreground animate-in fade-in duration-700">
        You&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        autoComplete="name"
        className="h-12 px-4 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted-foreground/60 text-base outline-none transition-colors focus:border-foreground/40"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        autoComplete="email"
        className="h-12 px-4 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted-foreground/60 text-base outline-none transition-colors focus:border-foreground/40"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="group h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background text-base font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
        {status !== "loading" && (
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </button>
      {status === "error" && (
        <p className="text-sm text-destructive text-center">{errorMessage}</p>
      )}
    </form>
  )
}
