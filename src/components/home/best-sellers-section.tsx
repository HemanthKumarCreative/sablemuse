"use client"

import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/types/commerce"
import { cn } from "cn"

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

        <div
          className={cn(
            "hidden gap-6 md:grid",
            products.length > 3
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          )}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              imageAspectClassName="aspect-[3/4]"
            />
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
                <ProductCard
                  product={product}
                  imageAspectClassName="aspect-[3/4]"
                />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </Container>
    </section>
  )
}
