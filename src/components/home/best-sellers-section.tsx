"use client"

import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/types/commerce"

type BestSellersSectionProps = {
  products: Product[]
}

export const BestSellersSection = ({ products }: BestSellersSectionProps) => {
  return (
    <section aria-labelledby="best-sellers-heading">
      <Container>
        <SectionHeader
          title="New Arrivals"
          href="/collection/new-arrivals"
          titleId="best-sellers-heading"
        />

        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="md:hidden">
          <ScrollCarousel
            itemCount={products.length}
            ariaLabel="New arrivals"
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
