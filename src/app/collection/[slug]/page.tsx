import type { Metadata } from "next"
import { Suspense } from "react"
import { CatalogBrowser } from "@/components/catalog/catalog-browser"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { parseCatalogFilters, parseCatalogSort } from "@/lib/catalog-params"
import { getCatalogPage } from "@/lib/shopify/catalog"
import { COLLECTION_HANDLES } from "@/lib/shopify"
import type { CollectionRouteKey } from "@/lib/shopify/collections"

export const metadata: Metadata = {
  title: "Collection",
  description: "Shop Sable Muse collections. Prices are in US dollars.",
}

const CollectionSlugPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    sort?: string | string[]
    filter?: string | string[]
  }>
}) => {
  const { slug } = await params
  const query = await searchParams
  const sort = parseCatalogSort(query.sort)
  const selectedFilters = !query.filter
    ? []
    : Array.isArray(query.filter)
      ? query.filter
      : [query.filter]
  const handle = COLLECTION_HANDLES[slug as CollectionRouteKey] || slug
  const page = await getCatalogPage({
    source: { kind: "collection", handle },
    sort,
    filters: parseCatalogFilters(query.filter),
  })
  const products = page.products
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
        name: [product.name, product.subtitle].filter(Boolean).join(" "),
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

          <Breadcrumbs
            className="mb-8 hidden lg:block"
            items={[
              { label: "Home", href: "/" },
              { label: "Collection", href: "/collection" },
              { label: categoryName },
            ]}
          />

          <h1
            id="collection-slug-heading"
            className="heading-page mb-6 lg:mb-10"
          >
            {categoryName}
          </h1>

          <Suspense>
            <CatalogBrowser
              key={`${sort}:${selectedFilters.join("|")}`}
              page={page}
              sort={sort}
              selectedFilters={selectedFilters}
              source={{ kind: "collection", handle }}
              emptyLabel="No products found in this collection."
              headingId={`${slug}-filters-heading`}
            />
          </Suspense>
        </Container>
      </section>
    </>
  )
}

export default CollectionSlugPage
