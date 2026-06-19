import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - BEROQK",
  description:
    "How BEROQK LLC uses cookies, pixels, local storage, and similar technologies across our websites, products, and services.",
}

const sections = [
  {
    heading: "What Are Cookies?",
    body: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies, including pixels, local storage, and analytics tools, may also be used to collect and store information about your interactions with our Services.",
    ],
  },
  {
    heading: "How We Use Cookies",
    body: ["We use cookies and similar technologies to:"],
    list: [
      "Operate and maintain our Services",
      "Authenticate users and maintain account sessions",
      "Improve website functionality and user experience",
      "Measure traffic, engagement, and performance",
      "Analyze product usage and feature adoption",
      "Detect fraud, abuse, and security threats",
      "Remember preferences and settings",
      "Support research, development, and improvement of AI-powered products and features",
    ],
  },
  {
    heading: "Types of Cookies We Use",
    sub: [
      {
        heading: "Essential Cookies",
        body: ["These cookies are required for core functionality and security of the Services.", "Examples include:"],
        list: [
          "Authentication and account management",
          "Security and fraud prevention",
          "Load balancing and infrastructure operations",
          "Form submissions and user preferences",
        ],
      },
      {
        heading: "Analytics Cookies",
        body: ["These cookies help us understand how users interact with our Services.", "Examples include:"],
        list: [
          "Page views",
          "Session information",
          "Navigation patterns",
          "Device and browser information",
          "Product engagement metrics",
        ],
      },
      {
        heading: "Performance Cookies",
        body: [
          "These cookies help us improve the speed, reliability, and functionality of our Services.",
        ],
      },
      {
        heading: "Functional Cookies",
        body: [
          "These cookies remember settings and preferences to provide a more personalized experience.",
        ],
      },
    ],
  },
  {
    heading: "Third-Party Technologies",
    body: [
      "BEROQK may use trusted third-party providers to support operation of the Services, including:",
    ],
    list: [
      "Cloud infrastructure providers",
      "Analytics providers",
      "Security and monitoring providers",
      "Payment processors",
      "Email and communication providers",
      "Artificial intelligence and machine learning service providers",
    ],
    after: [
      "These providers may use cookies or similar technologies subject to their own policies and practices.",
    ],
  },
  {
    heading: "Managing Cookies",
    body: [
      "Most browsers allow you to manage, block, or delete cookies through browser settings.",
      "Please note that disabling certain cookies may affect the availability, functionality, or performance of portions of the Services.",
    ],
  },
  {
    heading: "Do Not Track",
    body: [
      'Some web browsers offer a "Do Not Track" ("DNT") setting that allows users to signal a preference regarding online tracking.',
      "Because there is currently no universally accepted standard for interpreting or responding to DNT signals, BEROQK does not currently respond to Do Not Track browser signals. We may continue to review emerging standards and update our practices if industry or legal requirements evolve.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Cookie Policy periodically. Updated versions will be posted on this page with a revised effective date. Continued use of the Services after changes become effective constitutes acceptance of the updated policy.",
    ],
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-56 lg:pt-64 pb-32">
        {/* Header */}
        <header className="mb-16">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-6">
            Effective Date: June 19, 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
            Cookie Policy
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            BEROQK LLC ("BEROQK", "we", "our", or "us") uses cookies, pixels, local storage, and similar technologies to
            operate, improve, secure, and measure the performance of our website, products, applications, APIs, and
            services (collectively, the "Services").
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
                {section.sub && (
                  <div className="flex flex-col gap-8 mt-2">
                    {section.sub.map((subsection) => (
                      <div key={subsection.heading}>
                        <h3 className="text-lg font-normal tracking-tight mb-3 text-foreground/90">
                          {subsection.heading}
                        </h3>
                        <div className="flex flex-col gap-4">
                          {subsection.body?.map((paragraph, i) => (
                            <p key={i} className="text-base text-muted-foreground leading-relaxed text-pretty">
                              {paragraph}
                            </p>
                          ))}
                          {subsection.list && (
                            <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-muted-foreground/40">
                              {subsection.list.map((item) => (
                                <li key={item} className="text-base text-muted-foreground leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Contact */}
          <section>
            <h2 className="text-xl md:text-2xl font-normal tracking-tight mb-4">Contact</h2>
            <div className="flex flex-col gap-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                Questions regarding this Cookie Policy may be directed to:
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
