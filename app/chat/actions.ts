"use server"

import { createClient } from "@supabase/supabase-js"

export async function joinWaitlist(name: string, email: string) {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim().toLowerCase()

  if (!trimmedName || !trimmedEmail) {
    return { ok: false, error: "Please fill in all fields." }
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, error: "Server configuration error." }
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase
    .from("waitlist")
    .insert({ name: trimmedName, email: trimmedEmail })

  if (error) {
    // Unique violation: already on the list, treat as success.
    if (error.code === "23505") {
      return { ok: true }
    }
    return { ok: false, error: "Something went wrong. Please try again." }
  }

  return { ok: true }
}
