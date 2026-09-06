import type { Metadata } from "next"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { FAQ_ITEMS } from "@/data/faq"

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common Modimal questions about shipping, orders, sizing, payment, product care, and sustainability.",
  openGraph: {
    title: "FAQs | Modimal",
    description:
      "Find help with orders, shipping, sizing, payment methods, and how Modimal works with suppliers.",
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
        <Container>
          <Breadcrumbs
            className="mt-6 md:mt-8"
            items={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
          />

          <h1
            id="faq-heading"
            className="mt-8 text-[2rem] font-extrabold tracking-tight text-ink md:mt-10 md:text-[2.5rem]"
          >
            FAQs
          </h1>

          <div className="mt-8 max-w-4xl md:mt-10">
            <FaqAccordion />
          </div>
        </Container>
      </section>
    </>
  )
}

export default FaqPage
