export const revalidate = 3600

import type { Metadata } from "next"
import { CategoryCard } from "@/components/collection/category-card"
import { MerchandisingHero } from "@/components/collection/merchandising-hero"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { COLLECTION_MEGA_MENU } from "@/data/navigation"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Explore Modimal collections — blouses, pants, dresses, outerwear, and featured women’s essentials.",
  openGraph: {
    title: "Collection | Modimal",
    description:
      "Shop Modimal women’s clothing by category, featured edits, and best sellers.",
    images: [COLLECTION_MEGA_MENU.featured[0].image],
  },
  alternates: {
    canonical: "/collection",
  },
}

const categoryImages: Record<string, { image: string; alt: string }> = {
  "Shop All": {
    image: "/images/hero.jpg",
    alt: "Modimal collection overview",
  },
  "New Arrivals": {
    image: "/images/modiweek/1.webp",
    alt: "Modimal new arrivals",
  },
  "Tops & Blouses": {
    image: COLLECTION_MEGA_MENU.featured[0].image,
    alt: COLLECTION_MEGA_MENU.featured[0].alt,
  },
  "Jeans & Pants": {
    image:
      "/images/collection/Moodboard2_71ade389-dc80-49eb-b7e8-1c90a0273a2a_700x.webp",
    alt: "Modimal jeans and pants collection",
  },
  "Dresses & Jumpsuits": {
    image:
      "/images/collection/Save_The_Date_Dress_Khaki_Lifestyle_Khaki_Main_720x.webp",
    alt: "Modimal dresses and jumpsuits collection",
  },
  "Matching Sets & Lounge": {
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
    alt: "Modimal matching sets and lounge",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Modimal Collection",
  description:
    "Browse Modimal women’s clothing categories, featured edits, and best sellers.",
  url: "/collection",
}

const CollectionPage = async () => {
  const categories = COLLECTION_MEGA_MENU.columns[0].links.map((link) => ({
    ...link,
    ...(categoryImages[link.label] ?? {}),
  }))

  const featured = COLLECTION_MEGA_MENU.featured
  const bestSellers = await getCollectionProducts(
    COLLECTION_HANDLES["new-in"],
    3
  )

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
        description="Curated women’s essentials across categories, featured edits, and best sellers — designed for elegance in simplicity."
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
        aria-labelledby="collection-best-sellers-heading"
        className="pb-16 md:pb-24"
      >
        <Container>
          <SectionHeader
            title="New Arrivals"
            href="/collection/new-arrivals"
            titleId="collection-best-sellers-heading"
            className="mt-6 md:mt-12"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default CollectionPage
