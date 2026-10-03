"use client"

import { ProductCard } from "@/components/product/product-card"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import type { Product } from "@/types/commerce"
import { cn } from "cn"

type ProductCardRailProps = {
  products: Product[]
  ariaLabel: string
  imageAspectClassName?: string
  gridClassName?: string
  itemClassName?: string
  dotsClassName?: string
}

export const ProductCardRail = ({
  products,
  ariaLabel,
  imageAspectClassName,
  gridClassName = "md:grid-cols-3",
  itemClassName = "w-[46vw] max-w-[200px]",
  dotsClassName,
}: ProductCardRailProps) => {
  if (products.length === 0) {
    return null
  }

  return (
    <ScrollCarousel
      itemCount={products.length}
      ariaLabel={ariaLabel}
      trackClassName={cn(
        "gap-3 md:mx-0 md:grid md:snap-none md:gap-6 md:overflow-visible md:px-0",
        gridClassName
      )}
      dotsClassName={cn("md:hidden", dotsClassName)}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={cn(
            "shrink-0 snap-start md:w-full md:max-w-none md:shrink",
            itemClassName
          )}
        >
          <ProductCard
            product={product}
            imageAspectClassName={imageAspectClassName}
          />
        </div>
      ))}
    </ScrollCarousel>
  )
}
