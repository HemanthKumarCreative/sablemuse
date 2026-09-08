import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersMobile } from "@/components/search/search-filters-mobile"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { ShopAllHero } from "@/components/shop/shop-all-hero"
import { Button } from "@/components/ui/button"
import {
  PLUS_SIZE_FILTERS,
  PLUS_SIZE_FILTERS_DEFAULT_OPEN,
  PLUS_SIZE_HERO_SLIDES,
} from "@/data/plus-size"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: "Plus Size Shop All",
  description:
    "Shop Modimal plus size clothing — filter by size, color, collection, and fabric.",
  openGraph: {
    title: "Plus Size Shop All | Modimal",
    description:
      "Browse Modimal’s plus size collection with inclusive sizing and timeless pieces.",
    images: [PLUS_SIZE_HERO_SLIDES[0].src],
  },
  alternates: {
    canonical: "/plus-size/shop-all",
  },
}

const PlusSizeShopAllPage = async () => {
  const products = await getCollectionProducts(
    COLLECTION_HANDLES["plus-size-shop-all"],
    24
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Plus Size Shop All",
    description: "Shop all Modimal plus size women’s clothing",
    url: "/plus-size/shop-all",
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

      <section
        aria-labelledby="plus-size-shop-all-heading"
        className="pb-12 md:pb-24"
      >
        <h1 id="plus-size-shop-all-heading" className="sr-only">
          Plus Size Shop All
        </h1>

        <div className="border-b border-border bg-[#f4f5f3] lg:hidden">
          <Container>
            <Breadcrumbs
              className="py-3"
              items={[
                { label: "Home", href: "/" },
                { label: "Plus Size" },
              ]}
            />
          </Container>
        </div>

        <ShopAllHero
          slides={[...PLUS_SIZE_HERO_SLIDES]}
          ariaLabel="Plus Size lookbook"
          desktopMode="split"
        />

        <Container>
          <Breadcrumbs
            className="mt-5 hidden md:mt-8 lg:block"
            items={[
              { label: "Home", href: "/" },
              { label: "Plus Size", href: "/plus-size" },
              { label: "Shop All" },
            ]}
          />

          <SearchFiltersMobile
            className="mt-5 lg:mt-6"
            filters={PLUS_SIZE_FILTERS}
            defaultOpen={PLUS_SIZE_FILTERS_DEFAULT_OPEN}
            headingId="plus-size-mobile-filters-heading"
          />

          <div className="mt-5 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters
              className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[320px] xl:w-[392px]"
              filters={PLUS_SIZE_FILTERS}
              defaultOpen={PLUS_SIZE_FILTERS_DEFAULT_OPEN}
              headingId="plus-size-filters-heading"
            />

            <div className="min-w-0 flex-1">
              <p
                className="sr-only mb-5 text-sm capitalize text-ink-muted sm:text-left md:mb-6 md:text-base lg:not-sr-only"
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

              <div className="mt-8 flex justify-center md:mt-10">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-none border-ink bg-transparent px-10 text-base font-medium capitalize text-ink hover:bg-muted"
                  aria-label="Load more plus size products"
                >
                  Load More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default PlusSizeShopAllPage
