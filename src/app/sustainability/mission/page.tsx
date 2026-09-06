import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MissionPillarsAccordion } from "@/components/sustainability/mission-pillars-accordion"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import {
  MISSION_HERO,
  MISSION_INTRO,
  MISSION_STATEMENT,
  MISSION_SUPPLIER_IMAGES,
} from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Discover Modimal’s sustainability mission — minimalism, ethics, eco-friendly materials, circularity, transparency, and community.",
  openGraph: {
    title: "Our Mission | Modimal",
    description:
      "Elegance in simplicity, earth’s harmony — the Modimal Six guiding our sustainability mission.",
    images: [MISSION_HERO.src],
  },
  alternates: {
    canonical: "/sustainability/mission",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sustainability At Modimal",
  description: MISSION_INTRO,
  url: "/sustainability/mission",
}

const SustainabilityMissionPage = () => {
  const featuredSupplier = MISSION_SUPPLIER_IMAGES[0]
  const supplierGrid = MISSION_SUPPLIER_IMAGES.slice(1, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="mission-heading" className="pb-16 md:pb-24">
        <div className="border-b border-border bg-[#f4f5f3] lg:bg-transparent lg:border-0">
          <Container>
            <Breadcrumbs
              className="py-3 lg:mt-8 lg:py-0"
              items={[
                { label: "Home", href: "/" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Mission" },
              ]}
            />
          </Container>
        </div>

        <div className="relative mt-0 min-h-[240px] w-full overflow-hidden sm:min-h-[300px] md:mt-8 md:min-h-[420px] lg:min-h-[520px]">
          <Image
            src={MISSION_HERO.src}
            alt={MISSION_HERO.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
            <p className="mx-auto max-w-xl text-center text-xl font-semibold leading-snug text-white sm:text-2xl md:text-[2rem]">
              {MISSION_HERO.caption}
            </p>
          </div>
        </div>

        <Container>
          <h1
            id="mission-heading"
            className="mt-8 text-[1.75rem] font-bold tracking-tight text-ink md:mt-12 md:text-[2.25rem]"
          >
            Sustainability At Modimal
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-[1.8] capitalize text-ink-muted md:text-base md:normal-case">
            {MISSION_INTRO}
          </p>

          <h2 className="mt-10 text-lg font-semibold text-ink md:mt-12 md:text-xl">
            Our Mission, The Modimal Six:
          </h2>
          <MissionPillarsAccordion className="mt-4" />

          <div className="mt-12 md:mt-16">
            {featuredSupplier ? (
              <figure className="relative aspect-[16/10] overflow-hidden bg-muted grayscale md:aspect-[21/9]">
                <Image
                  src={featuredSupplier.src}
                  alt={featuredSupplier.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </figure>
            ) : null}

            <ul
              className="mt-3 grid grid-cols-3 gap-3 md:mt-4 md:gap-4"
              role="list"
              aria-label="Modimal suppliers"
            >
              {supplierGrid.map((item) => (
                <li key={item.src}>
                  <figure className="relative aspect-square overflow-hidden bg-muted grayscale">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </figure>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <Button
                render={<Link href="/sustainability/suppliers" />}
                className="h-12 rounded-none bg-brand px-8 text-base font-medium capitalize text-white hover:bg-brand/90"
              >
                Our Suppliers
              </Button>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-[1.8] capitalize text-ink md:mt-16 md:text-base">
            {MISSION_STATEMENT}
          </p>
        </Container>
      </section>
    </>
  )
}

export default SustainabilityMissionPage
