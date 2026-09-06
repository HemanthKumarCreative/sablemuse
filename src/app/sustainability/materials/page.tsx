import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { SUSTAINABILITY_MATERIAL_DETAILS } from "@/data/sustainability"
import { cn } from "cn"

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
        <Container>
          <Breadcrumbs
            className="mt-6 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Sustainability", href: "/sustainability" },
              { label: "Materials" },
            ]}
          />

          <h1
            id="materials-heading"
            className="mt-8 max-w-3xl text-[2rem] font-extrabold tracking-tight text-ink md:mt-10 md:text-[2.5rem]"
          >
            Sustainably Sourced Materials
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-ink-muted md:text-base">
            Every Modimal piece begins with an eco-conscious foundation. We
            choose fibers for how they feel, how they last, and how gently they
            move through the world.
          </p>

          <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
            {SUSTAINABILITY_MATERIAL_DETAILS.map((material) => {
              const imageFirst = material.imagePosition === "left"

              return (
                <article
                  key={material.id}
                  id={material.id}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
                >
                  <figure
                    className={cn(
                      "relative aspect-[3/4] overflow-hidden bg-muted",
                      imageFirst ? "md:order-1" : "md:order-2"
                    )}
                  >
                    <Image
                      src={material.image}
                      alt={material.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>

                  <div
                    className={cn(
                      "max-w-md",
                      imageFirst ? "md:order-2" : "md:order-1 md:justify-self-end"
                    )}
                  >
                    <h2 className="text-[1.75rem] font-bold text-ink md:text-[2rem]">
                      {material.title}
                    </h2>
                    <p className="mt-4 text-sm leading-[1.8] text-ink-muted md:text-base">
                      {material.body}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-16 border-t border-border pt-8 md:mt-24">
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
