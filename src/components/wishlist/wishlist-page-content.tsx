"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product/product-card"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { Container } from "@/components/shared/container"
import type { Product } from "@/types/commerce"

type WishlistPageContentProps = {
  productsByHandle: Record<string, Product>
}

export const WishlistPageContent = ({
  productsByHandle,
}: WishlistPageContentProps) => {
  const { handles, isHydrated } = useWishlist()
  const [mountedHandles, setMountedHandles] = useState<string[]>([])

  useEffect(() => {
    if (isHydrated) {
      setMountedHandles(handles)
    }
  }, [handles, isHydrated])

  const products = mountedHandles
    .map((handle) => productsByHandle[handle])
    .filter((product): product is Product => Boolean(product))

  const itemCount = products.length

  return (
    <section aria-labelledby="wishlist-heading" className="pb-12 md:pb-24">
      <Container>
        <div className="mt-10 mb-10 text-center sm:mt-12 sm:mb-12 md:mt-16 md:mb-14">
          <h1
            id="wishlist-heading"
            className="text-[2rem] font-semibold capitalize leading-[1.4] text-ink md:text-[2.5rem]"
          >
            My Wish List
          </h1>
          <p
            className="mt-2 text-base capitalize leading-[1.8] text-ink-muted md:text-xl"
            aria-live="polite"
          >
            {!isHydrated
              ? "Loading..."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          </p>
        </div>

        {isHydrated && itemCount === 0 ? (
          <p className="text-center text-base text-ink-muted">
            Your wish list is empty. Save pieces you love while you browse.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorited
                imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
