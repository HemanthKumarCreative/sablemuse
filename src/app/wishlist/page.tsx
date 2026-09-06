import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { WISHLIST_ITEMS } from "@/data/wishlist"

export const metadata: Metadata = {
  title: "My Wish List",
  description:
    "View your Modimal wish list — saved women’s clothing and essentials.",
  openGraph: {
    title: "My Wish List | Modimal",
    description:
      "Saved Modimal pieces you’re watching — ready when you are.",
    images: WISHLIST_ITEMS[0] ? [WISHLIST_ITEMS[0].image] : undefined,
  },
  alternates: {
    canonical: "/wishlist",
  },
}

const WishlistPage = () => {
  const itemCount = WISHLIST_ITEMS.length

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "My Wish List",
    description: "Modimal wish list",
    url: "/wishlist",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemCount,
      itemListElement: WISHLIST_ITEMS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `/product/${product.id}`,
        name: `${product.name} ${product.subtitle}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          {itemCount === 0 ? (
            <p className="text-center text-base text-ink-muted">
              Your wish list is empty. Save pieces you love while you browse.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
              {WISHLIST_ITEMS.map((product) => (
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
    </>
  )
}

export default WishlistPage
