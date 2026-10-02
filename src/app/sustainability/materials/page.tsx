import type { Metadata } from "next"
import Link from "next/link"
import { MaterialsList } from "@/components/sustainability/materials-list"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { MATERIALS_CLOSING, MATERIALS_INTRO, MATERIALS_REPORT_PREFIX } from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Care And Shipping",
  description:
    "How Sable Muse ships within the United States, how returns work, and how to care for your clothes.",
  openGraph: {
    title: "Care And Shipping | Sable Muse",
    description:
      "US shipping, US dollar prices, returns, and everyday garment care at Sable Muse.",
    images: ["/images/sustainability/materials.png"],
  },
  alternates: {
    canonical: "/sustainability/materials",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Care And Shipping",
  description: "Sable Muse shipping, returns, and garment care for United States orders.",
  url: "/sustainability/materials",
}

const SustainabilityMaterialsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-labelledby="materials-heading"
        className="pb-16 md:pb-24"
      >
        <div className="border-b border-brand-border bg-muted lg:bg-transparent lg:border-0">
          <Container>
            <Breadcrumbs
              className="py-3 lg:mt-8 lg:py-0"
              items={[
                { label: "Home", href: "/" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Care And Shipping" },
              ]}
            />
          </Container>
        </div>

        <Container>
          <h1
            id="materials-heading"
            className="heading-page mt-8 max-w-3xl md:mt-10"
          >
            Care And Shipping
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-copy capitalize text-brand-navy md:text-base md:normal-case md:text-brand-navy-muted">
            {MATERIALS_INTRO}
          </p>

          <MaterialsList />

          <div className="mt-12 space-y-6 md:mt-20">
            <p className="max-w-3xl text-sm leading-copy capitalize text-brand-navy md:text-base md:normal-case md:text-brand-navy-muted">
              {MATERIALS_CLOSING[0]}
            </p>
            <p className="max-w-3xl text-sm leading-copy text-brand-navy md:text-base md:text-brand-navy-muted">
              {MATERIALS_REPORT_PREFIX}
            </p>
          </div>

          <div className="mt-16 hidden border-t border-brand-border pt-8 md:mt-24 md:block">
            <Link
              href="/sustainability"
              className="text-sm text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-base"
            >
              &lt; Back To Sustainability
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default SustainabilityMaterialsPage
