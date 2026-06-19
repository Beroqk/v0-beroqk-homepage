import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - BEROQK",
  description:
    "How BEROQK LLC collects, uses, and protects your information across our websites, products, services, and waitlists.",
}

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "We may collect information that you voluntarily provide, including:",
    ],
    list: [
      "Name",
      "Email address",
      "Account information",
      "Communications with BEROQK",
      "Waitlist registrations",
      "Feedback and survey responses",
    ],
    after: ["We may also automatically collect certain technical information, including:"],
    afterList: [
      "Device information",
      "Browser type",
      "IP address",
      "Analytics and usage data",
      "Performance and diagnostic data",
    ],
  },
  {
    heading: "How We Use Information",
    body: ["We use information to:"],
    list: [
      "Provide and improve our Services",
      "Manage accounts and waitlists",
      "Communicate product updates and announcements",
      "Respond to support requests",
      "Improve security and reliability",
      "Conduct research and product development",
      "Comply with legal obligations",
    ],
  },
  {
    heading: "AI Services",
    body: [
      "BEROQK develops and operates artificial intelligence systems and related technologies.",
      "Information submitted through BEROQK products and services may be processed to provide requested functionality, maintain system performance, improve Services, and develop future products and features.",
      "Depending on the product, information may be processed by BEROQK systems or trusted third-party service providers that support the operation of our Services.",
      "Users should avoid submitting highly sensitive personal information unless specifically required for a feature. BEROQK does not guarantee that AI-generated outputs will always be accurate, complete, or suitable for any particular purpose.",
    ],
  },
  {
    heading: "Sharing Information",
    body: [
      "We do not sell personal information.",
      "We may share information with trusted service providers that assist us in operating our Services, including:",
    ],
    list: [
      "Cloud hosting providers",
      "Analytics providers",
      "Email and communication providers",
      "Payment processors",
      "Security and infrastructure providers",
    ],
    after: [
      "We may also disclose information when required by law or to protect the security, rights, or safety of BEROQK, our users, or others.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We implement reasonable technical and organizational safeguards designed to protect information from unauthorized access, disclosure, alteration, or destruction.",
      "However, no system can guarantee absolute security.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain information only as long as necessary to provide Services, comply with legal obligations, resolve disputes, enforce agreements, and improve our products.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Depending on your location, you may have rights regarding your personal information, including the right to:",
    ],
    list: [
      "Access information we hold about you",
      "Correct inaccurate information",
      "Request deletion of information",
      "Withdraw consent where applicable",
    ],
    after: ["Requests may be submitted through our contact information below."],
  },
  {
    heading: "Third-Party Services",
    body: [
      "Our Services may contain links to third-party websites or integrate third-party products. These services operate under their own policies and terms.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "BEROQK Services are not directed toward children under the age of 13. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy periodically. Updated versions will be posted on this page with a revised effective date.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-56 lg:pt-64 pb-32">
        {/* Header */}
        <header className="mb-16">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-6">
            Effective Date: June 19, 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            BEROQK LLC ("BEROQK", "we", "our", or "us") is committed to protecting your privacy and handling your
            information responsibly. This Privacy Policy explains how we collect, use, and protect information when you
            use our website, products, services, applications, waitlists, and future BEROQK platforms (collectively, the
            "Services").
          </p>
        </header>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-normal tracking-tight mb-4">{section.heading}</h2>
              <div className="flex flex-col gap-4">
                {section.body?.map((paragraph, i) => (
                  <p key={i} className="text-base text-muted-foreground leading-relaxed text-pretty">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-muted-foreground/40">
                    {section.list.map((item) => (
                      <li key={item} className="text-base text-muted-foreground leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.after?.map((paragraph, i) => (
                  <p key={i} className="text-base text-muted-foreground leading-relaxed text-pretty">
                    {paragraph}
                  </p>
                ))}
                {section.afterList && (
                  <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-muted-foreground/40">
                    {section.afterList.map((item) => (
                      <li key={item} className="text-base text-muted-foreground leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* Contact */}
          <section>
            <h2 className="text-xl md:text-2xl font-normal tracking-tight mb-4">Contact</h2>
            <div className="flex flex-col gap-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                Questions regarding this Privacy Policy may be directed to:
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-base text-foreground">BEROQK</p>
                <a
                  href="mailto:support@beroqk.com"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  support@beroqk.com
                </a>
                <a
                  href="https://beroqk.com"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  https://beroqk.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
