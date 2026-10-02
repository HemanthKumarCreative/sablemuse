import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

type StoryImage = {
  src: string
  alt: string
  href: string
}

type ShopStorySectionProps = {
  images: StoryImage[]
}

export const ShopStorySection = ({ images }: ShopStorySectionProps) => {
  return (
    <section aria-labelledby="shop-story-heading" className="pb-12 md:pb-20">
      <Container>
        <h2 id="shop-story-heading" className="heading-section">
          Sable Muse
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-copy text-brand-navy md:text-base">
          Sable Muse is a women&apos;s clothing shop for the United States. Shop
          dresses, tops, jeans, and matching sets. Prices are in US dollars, and
          orders ship within the United States with free shipping.
        </p>
        <Button
          render={<Link href="/sustainability" />}
          nativeButton={false}
          size="xl"
          className="mt-6 h-auto bg-background px-8 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted"
        >
          Our Story
        </Button>
        {images.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {images.map((item) => (
              <li key={item.href + item.src}>
                <Link
                  href={item.href}
                  className="group relative block aspect-[3/4] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={item.alt}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
