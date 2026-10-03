"use client"

import { ProductCardRail } from "@/components/product/product-card-rail"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import type { Product } from "@/types/commerce"

type BestSellersSectionProps = {
  products: Product[]
  title?: string
  href?: string
  headingId?: string
  carouselLabel?: string
  className?: string
}

export const BestSellersSection = ({
  products,
  title = "New Arrivals",
  href = "/collection/new-arrivals",
  headingId = "new-arrivals-heading",
  carouselLabel = "New arrivals",
  className,
}: BestSellersSectionProps) => {
  if (products.length === 0) {
    return null
  }

  return (
    <section aria-labelledby={headingId} className={className}>
      <Container>
        <SectionHeader
          title={title}
          href={href}
          titleId={headingId}
        />

        <ProductCardRail
          products={products}
          ariaLabel={carouselLabel}
          imageAspectClassName="aspect-[3/4]"
          gridClassName={
            products.length > 3
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }
        />
      </Container>
    </section>
  )
}
