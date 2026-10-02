"use client"

import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/types/commerce"

type BestSellersSectionProps = {
  products: Product[]
  title?: string
  href?: string
  headingId?: string
  carouselLabel?: string
}

export const BestSellersSection = ({
  products,
  title = "New Arrivals",
  href = "/collection/new-arrivals",
  headingId = "new-arrivals-heading",
  carouselLabel = "New arrivals",
}: BestSellersSectionProps) => {
  if (products.length === 0) {
    return null
  }

  return (
    <section aria-labelledby={headingId}>
      <Container>
        <SectionHeader
          title={title}
          href={href}
          titleId={headingId}
        />

        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="md:hidden">
          <ScrollCarousel
            itemCount={products.length}
            ariaLabel={carouselLabel}
            trackClassName="gap-3"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[46vw] max-w-[200px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </Container>
    </section>
  )
}
