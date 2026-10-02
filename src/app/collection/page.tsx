export const revalidate = 3600

import type { Metadata } from "next"
import { CategoryCard } from "@/components/collection/category-card"
import { MerchandisingHero } from "@/components/collection/merchandising-hero"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { COLLECTION_MEGA_MENU } from "@/data/navigation"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"
import type { CollectionRouteKey } from "@/lib/shopify/collections"

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Shop Sable Muse collections: new arrivals, dresses, tops, jeans, and matching sets. Prices are in US dollars.",
  openGraph: {
    title: "Collection | Sable Muse",
    description:
      "Browse Sable Muse women's clothing by collection, with free shipping on orders within the United States.",
    images: [COLLECTION_MEGA_MENU.featured[0].image],
  },
  alternates: {
    canonical: "/collection",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sable Muse Collection",
  description:
    "Browse Sable Muse women's clothing: new arrivals, dresses, tops, jeans, and matching sets.",
  url: "/collection",
}

const handleForLabel = (label: string) => {
  if (label === "New Arrivals") {
    return COLLECTION_HANDLES["new-in"]
  }

  const key = label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")
  return COLLECTION_HANDLES[key as CollectionRouteKey] ?? key
}

const CollectionPage = async () => {
  const links = COLLECTION_MEGA_MENU.columns[0].links
  const images = await Promise.all(
    links.map(async (link) => {
      if (link.href === "/shop-all") {
        const products = await getCollectionProducts(COLLECTION_HANDLES["new-in"], 1)
        return products[0]?.image
      }

      const products = await getCollectionProducts(handleForLabel(link.label), 1)
      return products[0]?.image
    })
  )

  const categories = links.map((link, index) => ({
    ...link,
    image: images[index],
    alt: `${link.label} at Sable Muse`,
  }))

  const featured = COLLECTION_MEGA_MENU.featured
  const newArrivals = await getCollectionProducts(COLLECTION_HANDLES["new-in"], 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MerchandisingHero
        eyebrow="Shop"
        title="Collection"
        titleId="collection-page-heading"
        description="Women's clothing from Sable Muse: new arrivals, dresses, tops, jeans, and matching sets. Prices are in US dollars."
        categories={categories}
      />

      <section aria-labelledby="featured-edits-heading" className="pb-6">
        <Container>
          <SectionHeader
            title="Featured"
            titleId="featured-edits-heading"
            className="mt-6 md:mt-12"
          />

          <div className="grid grid-cols-2 gap-4 md:max-w-2xl md:gap-6">
            {featured.map((item) => (
              <CategoryCard key={item.href} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="collection-new-arrivals-heading"
        className="pb-16 md:pb-24"
      >
        <Container>
          <SectionHeader
            title="New Arrivals"
            href="/collection/new-arrivals"
            titleId="collection-new-arrivals-heading"
            className="mt-6 md:mt-12"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default CollectionPage
