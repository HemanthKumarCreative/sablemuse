import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Modimal customer care by form, email, phone, or live chat for product questions and order support.",
  openGraph: {
    title: "Contact Us | Modimal",
    description:
      "Reach Modimal customer care — we aim to respond within 1–2 business days.",
  },
  alternates: {
    canonical: "/contact-us",
  },
}

const CONTACT_CHANNELS = [
  {
    id: "chat",
    title: "Chat With Us",
    description: "We are here and ready to chat",
    icon: MessageCircle,
    action: {
      label: "Start Chat",
      href: "#write-us",
    },
  },
  {
    id: "call",
    title: "Call Us",
    description: "We're here to talk to you",
    icon: Phone,
    action: {
      label: "+1 (929) 460-3208",
      href: "tel:+19294603208",
    },
  },
  {
    id: "email",
    title: "Email Us",
    description: "We are here and ready to help",
    icon: Mail,
    action: {
      label: "Send Email",
      href: "mailto:hello@modimal.com",
    },
  },
] as const

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us",
  url: "/contact-us",
  description:
    "Contact Modimal customer care by form, email, phone, or live chat.",
}

const ContactUsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="contact-heading" className="pb-16 md:pb-24">
        <Container>
          <Breadcrumbs
            className="mt-6 md:mt-8"
            items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
          />

          <h1
            id="contact-heading"
            className="mt-8 text-[2rem] font-extrabold tracking-tight text-ink md:mt-10 md:text-[2.5rem]"
          >
            Contact Us
          </h1>

          <div className="mt-8 space-y-4 bg-[#F0F2EF] p-6 text-sm leading-[1.8] text-ink md:p-8 md:text-base">
            <p>
              We always love hearing from our customers! Please do not hesitate
              to contact us should you have any questions regarding our products
              and sizing recommendations or inquiries about your current order.
            </p>
            <p>
              Contact our Customer Care team through the contact form below,
              email us at{" "}
              <a
                href="mailto:hello@modimal.com"
                className="text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                hello@modimal.com
              </a>{" "}
              or live chat with us via our chat widget on the bottom right hand
              corner of this page.
            </p>
            <p>We will aim to respond to you within 1–2 business days.</p>
          </div>

          <div id="write-us" className="mx-auto mt-12 max-w-3xl md:mt-16">
            <ContactForm />
          </div>

          <ul
            className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6"
            role="list"
          >
            {CONTACT_CHANNELS.map((channel) => {
              const Icon = channel.icon

              return (
                <li key={channel.id}>
                  <article className="flex h-full flex-col items-center bg-[#F0F2EF] px-6 py-8 text-center">
                    <Icon
                      className="size-7 text-ink"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h2 className="mt-4 text-lg font-semibold text-ink">
                      {channel.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">
                      {channel.description}
                    </p>
                    <Button
                      render={<Link href={channel.action.href} />}
                      variant="outline"
                      className="mt-6 h-11 w-full rounded-none border-brand text-base font-medium capitalize text-brand hover:bg-brand hover:text-white"
                    >
                      {channel.action.label}
                    </Button>
                  </article>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default ContactUsPage
