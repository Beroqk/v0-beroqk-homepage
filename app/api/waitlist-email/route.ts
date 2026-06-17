import { Resend } from "resend"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Missing email" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Email service not configured" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const body = [
      "You're on the Beroqk waitlist.",
      "",
      "Beroqk Chat routes every task to the smartest, fastest, and most cost-effective AI automatically.",
      "",
      "We'll send updates as early access opens.",
      "",
      "Beroqk.com",
    ].join("\n")

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to the Beroqk waitlist",
      text: body,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return Response.json({ error: "Failed to send email" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.log("[v0] waitlist-email route error:", err)
    return Response.json({ error: "Unexpected error" }, { status: 500 })
  }
}
