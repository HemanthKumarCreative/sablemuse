import type { Metadata } from "next"
import Image from "next/image"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import {
  PLUS_SIZE_FILTERS,
  PLUS_SIZE_FILTERS_DEFAULT_OPEN,
  PLUS_SIZE_PRODUCTS,
} from "@/data/plus-size"

export const metadata: Metadata = {
  title: "Plus Size Shop All",
  description:
    "Shop Modimal plus size clothing — filter by size, color, collection, and fabric.",
  openGraph: {
    title: "Plus Size Shop All | Modimal",
    description:
      "Browse Modimal’s plus size collection with inclusive sizing and timeless pieces.",
    images: ["/images/plus-size/dresses.png"],
  },
  alternates: {
    canonical: "/plus-size/shop-all",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Plus Size Shop All",
  description: "Shop all Modimal plus size women’s clothing",
  url: "/plus-size/shop-all",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: PLUS_SIZE_PRODUCTS.length,
    itemListElement: PLUS_SIZE_PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `/product/${product.id}`,
      name: `${product.name} ${product.subtitle}`,
    })),
  },
}

const PlusSizeShopAllPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-labelledby="plus-size-shop-all-heading"
        className="pb-16 md:pb-24"
      >
        <div className="grid grid-cols-2">
          <div className="relative min-h-[220px] overflow-hidden bg-muted md:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/images/plus-size/dresses.png"
              alt="Modimal plus size dress look"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative min-h-[220px] overflow-hidden bg-muted md:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/images/plus-size/pants.png"
              alt="Modimal plus size pants and top look"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <Container>
          <h1 id="plus-size-shop-all-heading" className="sr-only">
            Plus Size Shop All
          </h1>

          <Breadcrumbs
            className="mt-6 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Plus Size", href: "/plus-size" },
              { label: "Shop All" },
            ]}
          />

          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters
              className="w-full shrink-0 lg:sticky lg:top-[120px] lg:w-[320px] xl:w-[392px]"
              filters={PLUS_SIZE_FILTERS}
              defaultOpen={PLUS_SIZE_FILTERS_DEFAULT_OPEN}
              headingId="plus-size-filters-heading"
            />

            <div className="min-w-0 flex-1">
              <p
                className="mb-6 text-sm capitalize text-ink-muted md:text-base"
                aria-live="polite"
              >
                {PLUS_SIZE_PRODUCTS.length} items
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {PLUS_SIZE_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageAspectClassName="aspect-[392/438]"
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

export default PlusSizeShopAllPage
