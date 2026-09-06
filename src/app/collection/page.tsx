import type { Metadata } from "next"
import { CategoryCard } from "@/components/collection/category-card"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { BEST_SELLERS } from "@/data/home"
import { COLLECTION_MEGA_MENU } from "@/data/navigation"

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
  "Blouses & Tops": {
    image: COLLECTION_MEGA_MENU.featured[0].image,
    alt: COLLECTION_MEGA_MENU.featured[0].alt,
  },
  Pants: {
    image:
      "/images/collection/Moodboard2_71ade389-dc80-49eb-b7e8-1c90a0273a2a_700x.webp",
    alt: "Modimal pants collection",
  },
  "Dresses & Jumpsuits": {
    image:
      "/images/collection/Save_The_Date_Dress_Khaki_Lifestyle_Khaki_Main_720x.webp",
    alt: "Modimal dresses collection",
  },
  "Outwear & Jackets": {
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
    alt: "Modimal outwear collection",
  },
  Pullovers: {
    image: "/images/products/shirt-black.webp",
    alt: "Modimal pullovers",
  },
  Tees: {
    image: "/images/modiweek/1.webp",
    alt: "Modimal tees",
  },
  "Shorts & Skirts": {
    image: "/images/modiweek/3.webp",
    alt: "Modimal shorts and skirts",
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

const CollectionPage = () => {
  const categories = COLLECTION_MEGA_MENU.columns[0].links.map((link) => ({
    ...link,
    ...(categoryImages[link.label] ?? {}),
  }))

  const featured = COLLECTION_MEGA_MENU.featured
  const bestSellers = BEST_SELLERS.filter((item) => item.isBestSeller).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="collection-page-heading" className="pb-10">
        <Container>
          <div className="mt-10 mb-8 md:mt-16 md:mb-10">
            <p className="mb-2 text-sm font-medium tracking-[0.08em] text-brand uppercase">
              Shop
            </p>
            <h1
              id="collection-page-heading"
              className="text-[2rem] font-extrabold tracking-tight text-ink md:text-[2.5rem]"
            >
              Collection
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-muted md:text-base">
              Curated women’s essentials across categories, featured edits, and
              best sellers — designed for elegance in simplicity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.href} item={category} />
            ))}
          </div>
        </Container>
      </section>

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

      <section aria-labelledby="collection-best-sellers-heading" className="pb-16 md:pb-24">
        <Container>
          <SectionHeader
            title="Best Sellers"
            href="/collection/best-sellers"
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
