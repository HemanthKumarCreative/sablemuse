import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { SUSTAINABILITY_MEGA_MENU } from "@/data/navigation"
import {
  SUSTAINABILITY_GALLERY,
  SUSTAINABILITY_MATERIALS,
} from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Explore Modimal sustainability — responsible materials, ethical production, and earth-conscious design.",
  openGraph: {
    title: "Sustainability | Modimal",
    description:
      "Responsible selection, earthly harmony — how Modimal approaches materials and production.",
    images: ["/images/sustainability/materials.png"],
  },
  alternates: {
    canonical: "/sustainability",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Modimal Sustainability",
  description:
    "Learn how Modimal approaches sustainable materials, ethical production, and product care.",
  url: "/sustainability",
}

const SustainabilityPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="sustainability-heading" className="pb-10 md:pb-14">
        <Container>
          <h1
            id="sustainability-heading"
            className="mt-10 text-[2rem] font-extrabold tracking-tight text-brand-navy md:mt-16 md:text-[2.5rem]"
          >
            Sustainability
          </h1>
        </Container>

        <div className="relative mt-8 min-h-[280px] w-full overflow-hidden md:mt-10 md:min-h-[420px] lg:min-h-[520px]">
          <Image
            src="/images/sustainability/materials.png"
            alt="Sustainable Modimal fabrics and natural materials"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/20" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
            <p className="max-w-md text-xl font-semibold leading-snug text-white md:text-2xl lg:text-[2rem]">
              Responsible Selection, Earthly Harmony
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sustainable-materials-heading"
        className="pb-16 md:pb-24"
      >
        <Container>
          <h2
            id="sustainable-materials-heading"
            className="text-[1.75rem] font-bold text-brand-navy md:text-[2rem]"
          >
            Our Sustainable Materials
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            {SUSTAINABILITY_MATERIALS.map((item) => (
              <article key={item.title}>
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-brand-navy-muted md:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
            <figure className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src="/images/sustainability/lifestyle.png"
                alt="Modimal garment crafted from thoughtful materials"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src="/images/sustainability.png"
                alt="Natural cotton detail representing Modimal fiber choices"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </div>

          <div className="mt-8">
            <Button
              render={<Link href="/sustainability/materials" />}
              className="h-12 rounded-none bg-brand px-8 text-base font-medium capitalize text-white hover:bg-brand/90"
            >
              Explore Materials
            </Button>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="production-ethics-heading"
        className="pb-16 md:pb-24"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <figure className="relative aspect-[4/5] overflow-hidden bg-muted lg:aspect-[5/6]">
              <Image
                src={SUSTAINABILITY_MEGA_MENU.featured[0].image}
                alt="Modimal garment label and ethical production detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>

            <div>
              <h2
                id="production-ethics-heading"
                className="text-[1.75rem] font-bold text-brand-navy md:text-[2rem]"
              >
                Production &amp; Ethics
              </h2>
              <p className="mt-5 text-sm leading-[1.8] text-brand-navy-muted md:text-base">
                We partner with suppliers who share our standards for fair wages,
                safe workplaces, and transparent processes. From sampling to final
                stitch, every stage is chosen to protect people and planet —
                without compromising the quiet luxury of the finished piece.
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-brand-navy-muted md:text-base">
                Our mission is simple: design clothing that lasts, travels
                lightly, and feels as good to wear as it is to stand behind.
              </p>
              <Button
                render={<Link href="/sustainability/mission" />}
                className="mt-8 h-12 rounded-none border border-ink bg-transparent px-8 text-base font-medium capitalize text-brand-navy hover:bg-muted"
                variant="outline"
              >
                Our Mission
              </Button>
            </div>
          </div>

          <ul
            className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-6"
            role="list"
            aria-label="Behind the scenes at Modimal"
          >
            {SUSTAINABILITY_GALLERY.map((item) => (
              <li key={item.src}>
                <figure className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="sustainability-topics-heading"
        className="border-t border-brand-border pb-16 md:pb-24"
      >
        <Container>
          <h2
            id="sustainability-topics-heading"
            className="mt-12 text-[1.75rem] font-bold text-brand-navy md:mt-16 md:text-[2rem]"
          >
            Explore Topics
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUSTAINABILITY_MEGA_MENU.columns[0].links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-14 items-center border border-brand-border px-5 text-base capitalize text-brand-navy transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default SustainabilityPage
