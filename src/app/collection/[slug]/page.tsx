import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersMobile } from "@/components/search/search-filters-mobile"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import {
  SHOP_ALL_FILTERS,
  SHOP_ALL_FILTERS_DEFAULT_OPEN,
} from "@/data/shop-all"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"
import type { CollectionRouteKey } from "@/lib/shopify/collections"

export const metadata: Metadata = {
  title: "Collection",
  description: "Shop Sable Muse collections. Prices are in US dollars.",
}

const CollectionSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  
  // Verify if slug is a valid collection route key
  const handle = COLLECTION_HANDLES[slug as CollectionRouteKey] || slug
  const products = await getCollectionProducts(handle, 24)
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: `Shop ${categoryName} at Sable Muse`,
    url: `/collection/${slug}`,
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

      <section aria-labelledby="collection-slug-heading" className="pb-12 md:pb-24 pt-8 md:pt-12">
        <Container>
          <div className="border-b border-brand-border bg-muted lg:hidden mb-4">
            <Breadcrumbs
              className="py-3"
              items={[
                { label: "Home", href: "/" },
                { label: "Collection", href: "/collection" },
                { label: categoryName },
              ]}
            />
          </div>

          <h1
            id="collection-slug-heading"
            className="heading-page mb-6 lg:hidden"
          >
            {categoryName}
          </h1>

          <Breadcrumbs
            className="hidden lg:block mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Collection", href: "/collection" },
              { label: categoryName },
            ]}
          />

          <h1
            className="heading-page mb-10 hidden lg:block"
          >
            {categoryName}
          </h1>

          <SearchFiltersMobile
            className="lg:hidden mb-6"
            filters={SHOP_ALL_FILTERS}
            defaultOpen={SHOP_ALL_FILTERS_DEFAULT_OPEN}
            headingId={`${slug}-mobile-filters-heading`}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters
              className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[320px] xl:w-[392px]"
              filters={SHOP_ALL_FILTERS}
              defaultOpen={SHOP_ALL_FILTERS_DEFAULT_OPEN}
              headingId={`${slug}-filters-heading`}
            />

            <div className="min-w-0 flex-1">
              <p
                className="sr-only mb-5 text-sm capitalize text-brand-navy-muted sm:text-left md:mb-6 md:text-base lg:not-sr-only"
                aria-live="polite"
              >
                {products.length} items
              </p>
              
              {products.length === 0 ? (
                <div className="py-20 text-center text-brand-navy-muted">
                  No products found in this collection.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default CollectionSlugPage
