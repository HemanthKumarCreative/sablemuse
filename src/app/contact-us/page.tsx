import type { Metadata } from "next"
import { ContactChannels } from "@/components/contact/contact-channels"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Email Sable Muse customer care about products, sizing, and orders in the United States.",
  openGraph: {
    title: "Contact Us | Sable Muse",
    description:
      "Reach Sable Muse at support@sablemuse.shop. We aim to respond within one business day.",
  },
  alternates: {
    canonical: "/contact-us",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us",
  url: "/contact-us",
  description:
    "Email Sable Muse customer care about products, sizing, and United States orders.",
}

const ContactUsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="contact-heading" className="pb-16 md:pb-24">
        <div className="border-b border-brand-border bg-muted lg:bg-transparent lg:border-0">
          <Container>
            <Breadcrumbs
              className="py-3 lg:mt-8 lg:py-0"
              items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
            />
          </Container>
        </div>

        <Container>
          <h1
            id="contact-heading"
            className="heading-page mt-8 md:mt-10"
          >
            Contact Us
          </h1>

          <div className="mt-6 space-y-4 bg-muted p-5 text-sm leading-copy capitalize text-brand-navy md:mt-8 md:space-y-4 md:p-8 md:text-base md:normal-case">
            <p>
              Questions about a product, a size, or an order can come to us by
              email. Write to{" "}
              <a
                href="mailto:support@sablemuse.shop"
                className="text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:normal-case"
              >
                support@sablemuse.shop
              </a>
              . We are available Monday through Friday, 9 am to 5 pm Eastern
              Time, and we aim to reply within one business day.
            </p>
          </div>

          <ContactChannels />
        </Container>
      </section>
    </>
  )
}

export default ContactUsPage
