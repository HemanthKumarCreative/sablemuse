import type { Metadata } from "next"
import { ContactChannels } from "@/components/contact/contact-channels"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"

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
              We Always Love Hearing From Our Customers! Please Do Not Hesitate
              To Contact Us Should You Have Any Questions Regarding Our Products
              And Sizing Recommendations Or Inquiries About Your Current Order.
            </p>
            <p>
              Contact Our Customer Care Team Through The Contact Form Below,
              Email Us At{" "}
              <a
                href="mailto:hello@modimal.com"
                className="text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:normal-case"
              >
                Hello@Modimal.Com
              </a>{" "}
              Or Live Chat With Us Via Our Chat Widget On The Bottom Right Hand
              Corner Of This Page.
            </p>
            <p>We Will Aim To Respond To You Within 1-2 Business Days.</p>
          </div>

          <ContactChannels />
        </Container>
      </section>
    </>
  )
}

export default ContactUsPage
