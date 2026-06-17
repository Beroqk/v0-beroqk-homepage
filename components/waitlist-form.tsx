"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ROLES = ["Founder", "Builder", "Creative", "Researcher", "Other"] as const

export function WaitlistForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !role) return

    setSubmitting(true)
    setError("")

    const supabase = createClient()
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ name, email, role })

    if (insertError) {
      if (insertError.code === "23505") {
        setError("You're already on the waitlist.")
      } else {
        setError("Something went wrong. Please try again.")
      }
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground">
          <Check className="h-6 w-6 text-background" strokeWidth={2.5} />
        </div>
        <p className="text-base font-medium text-foreground text-balance">
          You&apos;re signed up. Early access is coming soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
          className="h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@company.com"
          required
          className="h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole} required>
          <SelectTrigger id="role" className="h-11 w-full">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem
                key={r}
                value={r}
                className="rounded-md transition-colors focus:bg-foreground/5 focus:backdrop-blur-md focus:text-foreground data-[highlighted]:bg-foreground/5 data-[highlighted]:backdrop-blur-md data-[highlighted]:text-foreground data-[state=checked]:bg-foreground/10"
              >
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-3 h-14 w-full rounded-full text-base md:text-lg font-semibold"
      >
        {submitting ? "Joining..." : "Join the Waitlist"}
      </Button>

      {error && <p className="text-sm text-center text-muted-foreground">{error}</p>}
    </form>
  )
}
