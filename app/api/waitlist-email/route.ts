import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const greeting = name ? `Hi ${name},` : "Hi there,"

    const { data, error } = await resend.emails.send({
      from: "Beroqk <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to the Beroqk waitlist",
      text: [
        greeting,
        "",
        "You're on the Beroqk waitlist.",
        "",
        "Beroqk Chat routes every task to the smartest, fastest, and most cost-effective AI automatically.",
        "",
        "We'll send updates as early access opens.",
        "",
        "Beroqk.com",
      ].join("\n"),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #111;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">${greeting}</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px; font-weight: 600;">You're on the Beroqk waitlist.</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Beroqk Chat routes every task to the smartest, fastest, and most cost-effective AI automatically.</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">We'll send updates as early access opens.</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #666;">Beroqk.com</p>
        </div>
      `,
    })

    if (error) {
      console.log("[v0] Resend send failed:", error)
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
    }

    console.log("[v0] Welcome email sent to:", email, "id:", data?.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.log("[v0] waitlist-email route error:", err)
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 })
  }
}
