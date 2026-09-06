import type { Metadata } from "next"
import Image from "next/image"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { SHOP_ALL_FILTERS, SHOP_ALL_FILTERS_DEFAULT_OPEN, SHOP_ALL_PRODUCTS } from "@/data/shop-all"

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop all Modimal women’s clothing — filter by size, color, collection, and fabric.",
  openGraph: {
    title: "Shop All | Modimal",
    description:
      "Browse the full Modimal collection with filters for size, color, collection, and fabric.",
    images: ["/images/shop-all/hero-wide.png"],
  },
  alternates: {
    canonical: "/shop-all",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Shop All",
  description: "Shop all Modimal women’s clothing",
  url: "/shop-all",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SHOP_ALL_PRODUCTS.length,
    itemListElement: SHOP_ALL_PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `/product/${product.id}`,
      name: `${product.name} ${product.subtitle}`,
    })),
  },
}

const ShopAllPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="shop-all-heading" className="pb-16 md:pb-24">
        <div className="relative min-h-[220px] w-full overflow-hidden bg-muted md:min-h-[360px] lg:min-h-[420px]">
          <Image
            src="/images/shop-all/hero-wide.png"
            alt="Modimal shop all lookbook featuring olive wrap top and casual trousers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <Container>
          <h1 id="shop-all-heading" className="sr-only">
            Shop All
          </h1>

          <Breadcrumbs
            className="mt-6 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Shop All" },
            ]}
          />

          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters
              className="w-full shrink-0 lg:sticky lg:top-[120px] lg:w-[320px] xl:w-[392px]"
              filters={SHOP_ALL_FILTERS}
              defaultOpen={SHOP_ALL_FILTERS_DEFAULT_OPEN}
              headingId="shop-all-filters-heading"
            />

            <div className="min-w-0 flex-1">
              <p
                className="mb-6 text-sm capitalize text-ink-muted md:text-base"
                aria-live="polite"
              >
                {SHOP_ALL_PRODUCTS.length} items
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {SHOP_ALL_PRODUCTS.map((product) => (
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

export default ShopAllPage
