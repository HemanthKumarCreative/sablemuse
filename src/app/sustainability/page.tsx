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
  title: "Our Story",
  description:
    "Sable Muse is a women's clothing shop for the United States. Prices are in US dollars, with free shipping on US orders.",
  openGraph: {
    title: "Our Story | Sable Muse",
    description:
      "What Sable Muse sells, how United States orders ship, and how to reach customer care.",
    images: ["/images/sustainability/materials.png"],
  },
  alternates: {
    canonical: "/sustainability",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sable Muse",
  description:
    "Learn what Sable Muse sells and how orders ship within the United States.",
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
            className="heading-page mt-10 md:mt-16"
          >
            Our Story
          </h1>
        </Container>

        <div className="relative mt-8 min-h-[280px] w-full overflow-hidden md:mt-10 md:min-h-[420px] lg:min-h-[520px]">
          <Image
            src="/images/sustainability/materials.png"
            alt="Women's clothing from Sable Muse"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/20" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
            <p className="max-w-md text-xl font-semibold leading-snug text-white md:text-2xl lg:text-[2rem]">
              Women's clothing, priced in US dollars
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
            className="heading-section"
          >
            The Shop
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            {SUSTAINABILITY_MATERIALS.map((item) => (
              <article key={item.title}>
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-copy text-brand-navy-muted md:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
            <figure className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src="/images/sustainability/lifestyle.png"
                alt="A Sable Muse outfit"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src="/images/sustainability.png"
                alt="Sable Muse clothing detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </div>

          <div className="mt-8">
            <Button
              render={<Link href="/sustainability/materials" />}
              size="xl"
            >
              Care And Shipping
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
                alt="Sable Muse clothing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>

            <div>
              <h2
                id="production-ethics-heading"
                className="heading-section"
              >
                Orders In The United States
              </h2>
              <p className="mt-5 text-sm leading-copy text-brand-navy-muted md:text-base">
                Sable Muse ships within the United States. Prices are in US
                dollars, and shipping is free on US orders. Most orders leave
                within one to two business days, with tracking sent by email.
              </p>
              <p className="mt-4 text-sm leading-copy text-brand-navy-muted md:text-base">
                Returns are accepted within 30 days. Questions about an order
                can go to hello@sablemuse.shop.
              </p>
              <Button
                render={<Link href="/sustainability/mission" />}
                variant="outline"
                size="xl"
                className="mt-8 border-ink bg-transparent font-medium normal-case tracking-normal text-brand-navy capitalize hover:bg-muted"
              >
                Our Mission
              </Button>
            </div>
          </div>

          <ul
            className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-6"
            role="list"
            aria-label="Sable Muse clothing"
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
            className="heading-section mt-12 md:mt-16"
          >
            Explore Topics
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUSTAINABILITY_MEGA_MENU.columns[0].links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-14 items-center border border-brand-border px-5 text-base capitalize text-brand-navy underline-offset-2 transition-colors hover:border-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
