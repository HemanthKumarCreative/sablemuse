import type { Metadata } from "next"
import Link from "next/link"
import { CategoryCard } from "@/components/collection/category-card"
import { ProductCard } from "@/components/product/product-card"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { NEW_IN_MEGA_MENU } from "@/data/navigation"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: "New In",
  description:
    "Shop Modimal new arrivals — tops, tees, pants, dresses, jackets, and trending fall edits.",
  openGraph: {
    title: "New In | Modimal",
    description:
      "Discover Modimal’s newest women’s clothing across categories and trending collections.",
    images: [NEW_IN_MEGA_MENU.featured[0].image],
  },
  alternates: {
    canonical: "/new-in",
  },
}

const categoryImages: Record<string, { image: string; alt: string }> = {
  "Shop All": {
    image: "/images/hero.jpg",
    alt: "Modimal new arrivals overview",
  },
  "Tops & Blouses": {
    image: "/images/new-in/blouses.png",
    alt: "New Modimal tops and blouses",
  },
  Tees: {
    image: "/images/modiweek/1.webp",
    alt: "New Modimal tees",
  },
  Pants: {
    image:
      "/images/collection/Moodboard2_71ade389-dc80-49eb-b7e8-1c90a0273a2a_700x.webp",
    alt: "New Modimal pants",
  },
  "Jackets & Outwears": {
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
    alt: "New Modimal jackets and outwear",
  },
  Pullovers: {
    image: "/images/products/shirt-black.webp",
    alt: "New Modimal pullovers",
  },
  "Dresses & Jumpsuits": {
    image: "/images/new-in/dresses.png",
    alt: "New Modimal dresses and jumpsuits",
  },
  "Shorts & Skirts": {
    image: "/images/modiweek/3.webp",
    alt: "New Modimal shorts and skirts",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Modimal New In",
  description:
    "Browse Modimal new arrivals by category and trending edits including fall collection.",
  url: "/new-in",
}

const NewInPage = async () => {
  const categories = NEW_IN_MEGA_MENU.columns[0].links.map((link) => ({
    ...link,
    ...(categoryImages[link.label] ?? {}),
  }))

  const trending = NEW_IN_MEGA_MENU.columns[1].links
  const featured = NEW_IN_MEGA_MENU.featured
  const products = await getCollectionProducts(COLLECTION_HANDLES["new-in"], 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="new-in-heading" className="pb-10">
        <Container>
          <div className="mt-10 mb-8 md:mt-16 md:mb-10">
            <p className="mb-2 text-sm font-medium tracking-[0.08em] text-brand uppercase">
              New Arrivals
            </p>
            <h1
              id="new-in-heading"
              className="text-[2rem] font-extrabold tracking-tight text-ink md:text-[2.5rem]"
            >
              New In
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-muted md:text-base">
              Fresh essentials across categories and trending edits — fall
              collection, blouses, dresses, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.href} item={category} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="trending-heading" className="pb-6">
        <Container>
          <SectionHeader
            title="Trending"
            titleId="trending-heading"
            className="mt-6 md:mt-12"
          />
          <ul className="mb-8 flex flex-wrap gap-3">
            {trending.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex border border-border px-4 py-2 text-sm text-ink-muted transition-colors hover:border-brand hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {featured.map((item) => (
              <CategoryCard key={item.href} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="new-in-best-sellers-heading" className="pb-16 md:pb-24">
        <Container>
          <SectionHeader
            title="Best Sellers"
            href="/collection/best-sellers"
            titleId="new-in-best-sellers-heading"
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

export default NewInPage
