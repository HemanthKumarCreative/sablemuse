import type { Metadata } from "next"
import Link from "next/link"
import { MaterialsList } from "@/components/sustainability/materials-list"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { MATERIALS_CLOSING, MATERIALS_INTRO, MATERIALS_REPORT_PREFIX } from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Sustainably Sourced Materials",
  description:
    "Explore Modimal’s sustainably sourced materials — cotton, wool, linen, silk, and cashmere.",
  openGraph: {
    title: "Sustainably Sourced Materials | Modimal",
    description:
      "Learn how Modimal chooses cotton, wool, linen, silk, and cashmere with people and planet in mind.",
    images: ["/images/sustainability/materials.png"],
  },
  alternates: {
    canonical: "/sustainability/materials",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sustainably Sourced Materials",
  description:
    "Modimal materials including cotton, wool, linen, silk, and cashmere.",
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
        <div className="border-b border-border bg-[#f4f5f3] lg:bg-transparent lg:border-0">
          <Container>
            <Breadcrumbs
              className="py-3 lg:mt-8 lg:py-0"
              items={[
                { label: "Home", href: "/" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Materials" },
              ]}
            />
          </Container>
        </div>

        <Container>
          <h1
            id="materials-heading"
            className="mt-8 max-w-3xl text-[1.75rem] font-bold tracking-tight text-ink md:mt-10 md:text-[2.5rem] md:font-extrabold"
          >
            Sustainably Sourced Materials
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-[1.8] capitalize text-ink md:text-base md:normal-case md:text-ink-muted">
            {MATERIALS_INTRO}
          </p>

          <MaterialsList />

          <div className="mt-12 space-y-6 md:mt-20">
            <p className="max-w-3xl text-sm leading-[1.8] capitalize text-ink md:text-base md:normal-case md:text-ink-muted">
              {MATERIALS_CLOSING[0]}
            </p>
            <p className="max-w-3xl text-sm leading-[1.8] capitalize text-ink md:text-base md:normal-case md:text-ink-muted">
              {MATERIALS_REPORT_PREFIX}{" "}
              <Link
                href="https://textileexchange.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Here
              </Link>
              .
            </p>
          </div>

          <div className="mt-16 hidden border-t border-border pt-8 md:mt-24 md:block">
            <Link
              href="/sustainability"
              className="text-sm text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-base"
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
