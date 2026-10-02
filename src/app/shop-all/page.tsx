import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersMobile } from "@/components/search/search-filters-mobile"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { ShopAllHero } from "@/components/shop/shop-all-hero"
import {
  SHOP_ALL_FILTERS,
  SHOP_ALL_FILTERS_DEFAULT_OPEN,
  SHOP_ALL_HERO_SLIDES,
} from "@/data/shop-all"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop all Modimal women’s clothing — filter by size, color, collection, and fabric.",
  openGraph: {
    title: "Shop All | Modimal",
    description:
      "Browse the full Modimal collection with filters for size, color, collection, and fabric.",
    images: [SHOP_ALL_HERO_SLIDES[0].src],
  },
  alternates: {
    canonical: "/shop-all",
  },
}

const ShopAllPage = async () => {
  const products = await getCollectionProducts(
    COLLECTION_HANDLES["shop-all"],
    24
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop All",
    description: "Shop all Modimal women’s clothing",
    url: "/shop-all",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
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

      <section aria-labelledby="shop-all-heading" className="pb-12 md:pb-24">
        <h1 id="shop-all-heading" className="sr-only">
          Shop All
        </h1>

        <div className="border-b border-brand-border bg-muted lg:hidden">
          <Container>
            <Breadcrumbs
              className="py-3"
              items={[
                { label: "Home", href: "/" },
                { label: "Shop All" },
              ]}
            />
          </Container>
        </div>

        <ShopAllHero
          slides={[...SHOP_ALL_HERO_SLIDES]}
          ariaLabel="Shop All lookbook"
        />

        <Container>
          <Breadcrumbs
            className="mt-5 hidden md:mt-8 lg:block"
            items={[
              { label: "Home", href: "/" },
              { label: "Shop All" },
            ]}
          />

          <SearchFiltersMobile
            className="mt-5 lg:mt-6"
            filters={SHOP_ALL_FILTERS}
            defaultOpen={SHOP_ALL_FILTERS_DEFAULT_OPEN}
            headingId="shop-all-mobile-filters-heading"
          />

          <div className="mt-5 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters
              className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[320px] xl:w-[392px]"
              filters={SHOP_ALL_FILTERS}
              defaultOpen={SHOP_ALL_FILTERS_DEFAULT_OPEN}
              headingId="shop-all-filters-heading"
            />

            <div className="min-w-0 flex-1">
              <p
                className="sr-only mb-5 text-sm capitalize text-brand-navy-muted sm:text-left md:mb-6 md:text-base lg:not-sr-only"
                aria-live="polite"
              >
                {products.length} items
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ShopAllPage
