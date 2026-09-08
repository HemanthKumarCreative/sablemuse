import type { Metadata } from "next"
import { CategoryCard } from "@/components/collection/category-card"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { PLUS_SIZE_MEGA_MENU } from "@/data/navigation"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: "Plus Size",
  description:
    "Shop Modimal plus size women’s clothing — tops, tees, pants, dresses, jackets, and more.",
  openGraph: {
    title: "Plus Size | Modimal",
    description:
      "Explore Modimal’s plus size collection across categories with inclusive, timeless silhouettes.",
    images: [PLUS_SIZE_MEGA_MENU.featured[0].image],
  },
  alternates: {
    canonical: "/plus-size",
  },
}

const categoryImages: Record<string, { image: string; alt: string }> = {
  "Shop All": {
    image: "/images/plus-size/dresses.png",
    alt: "Modimal plus size collection overview",
  },
  "Tops & Blouses": {
    image: "/images/plus-size/blouses.png",
    alt: "Plus size tops and blouses",
  },
  Tees: {
    image: "/images/modiweek/1.webp",
    alt: "Plus size tees",
  },
  Pants: {
    image: "/images/plus-size/pants.png",
    alt: "Plus size pants",
  },
  "Jackets & Outwears": {
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
    alt: "Plus size jackets and outwear",
  },
  Pullovers: {
    image: "/images/products/shirt-black.webp",
    alt: "Plus size pullovers",
  },
  "Dresses & Jumpsuits": {
    image: "/images/plus-size/dresses.png",
    alt: "Plus size dresses and jumpsuits",
  },
  "Shorts & Skirts": {
    image: "/images/modiweek/3.webp",
    alt: "Plus size shorts and skirts",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Modimal Plus Size",
  description:
    "Browse Modimal plus size women’s clothing by category including pants, dresses, and blouses.",
  url: "/plus-size",
}

const PlusSizePage = async () => {
  const categories = PLUS_SIZE_MEGA_MENU.columns[0].links.map((link) => ({
    ...link,
    ...(categoryImages[link.label] ?? {}),
  }))

  const featured = PLUS_SIZE_MEGA_MENU.featured
  const products = await getCollectionProducts(COLLECTION_HANDLES["plus-size"], 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="plus-size-heading" className="pb-10">
        <Container>
          <div className="mt-10 mb-8 md:mt-16 md:mb-10">
            <p className="mb-2 text-sm font-medium tracking-[0.08em] text-brand uppercase">
              Inclusive Fit
            </p>
            <h1
              id="plus-size-heading"
              className="text-[2rem] font-extrabold tracking-tight text-ink md:text-[2.5rem]"
            >
              Plus Size
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-muted md:text-base">
              Thoughtful silhouettes across categories — pants, dresses, blouses,
              and everyday essentials designed for comfort and ease.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.href} item={category} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="plus-size-featured-heading" className="pb-6">
        <Container>
          <SectionHeader
            title="Featured"
            titleId="plus-size-featured-heading"
            className="mt-6 md:mt-12"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {featured.map((item) => (
              <CategoryCard key={item.href} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="plus-size-best-sellers-heading"
        className="pb-16 md:pb-24"
      >
        <Container>
          <SectionHeader
            title="New Arrivals"
            href="/collection/new-arrivals"
            titleId="plus-size-best-sellers-heading"
            className="mt-6 md:mt-12"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default PlusSizePage
