import type { Metadata } from "next"
import { Suspense } from "react"
import { CatalogBrowser } from "@/components/catalog/catalog-browser"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { ShopAllHero } from "@/components/shop/shop-all-hero"
import { SHOP_ALL_HERO_SLIDES } from "@/data/shop-all"
import { parseCatalogFilters, parseCatalogSort } from "@/lib/catalog-params"
import { getCatalogPage } from "@/lib/shopify/catalog"

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop all Sable Muse women's clothing. Prices are in US dollars, with free shipping on orders within the United States.",
  openGraph: {
    title: "Shop All | Sable Muse",
    description:
      "Browse Sable Muse dresses, tops, jeans, and matching sets.",
    images: [SHOP_ALL_HERO_SLIDES[0].src],
  },
  alternates: {
    canonical: "/shop-all",
  },
}

const ShopAllPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string | string[]
    filter?: string | string[]
  }>
}) => {
  const params = await searchParams
  const sort = parseCatalogSort(params.sort)
  const selectedFilters = !params.filter
    ? []
    : Array.isArray(params.filter)
      ? params.filter
      : [params.filter]
  const page = await getCatalogPage({
    source: { kind: "products" },
    sort,
    filters: parseCatalogFilters(params.filter),
  })
  const products = page.products

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop All",
    description: "Shop all Sable Muse women's clothing",
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

          <Suspense>
            <CatalogBrowser
              key={`${sort}:${selectedFilters.join("|")}`}
              page={page}
              sort={sort}
              selectedFilters={selectedFilters}
              source={{ kind: "products" }}
              emptyLabel="No products match these filters."
              headingId="shop-all-filters-heading"
            />
          </Suspense>
        </Container>
      </section>
    </>
  )
}

export default ShopAllPage
