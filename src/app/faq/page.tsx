import type { Metadata } from "next"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { FAQ_ITEMS } from "@/data/faq"

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common Sable Muse questions about US shipping, orders, sizing, payment, and product care.",
  openGraph: {
    title: "FAQs | Sable Muse",
    description:
      "Find help with Sable Muse orders, US shipping, sizing, and payments in US dollars.",
  },
  alternates: {
    canonical: "/faq",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const FaqPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="faq-heading" className="pb-16 md:pb-24">
        <div className="border-b border-brand-border bg-muted lg:bg-transparent lg:border-0">
          <Container>
            <Breadcrumbs
              className="py-3 lg:mt-8 lg:py-0"
              items={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
            />
          </Container>
        </div>

        <Container>
          <h1
            id="faq-heading"
            className="heading-page mt-8 md:mt-10"
          >
            FAQs
          </h1>

          <div className="mt-6 max-w-4xl md:mt-10">
            <FaqAccordion />
          </div>
        </Container>
      </section>
    </>
  )
}

export default FaqPage
