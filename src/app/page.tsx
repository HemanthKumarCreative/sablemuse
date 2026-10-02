export const revalidate = 3600

import type { Metadata } from "next"
import { BestSellersSection } from "@/components/home/best-sellers-section"
import { CollectionSection } from "@/components/home/collection-section"
import { HeroSection } from "@/components/home/hero-section"
import { ShopStorySection } from "@/components/home/shop-story-section"
import { WelcomeDialog } from "@/components/home/welcome-dialog"
import { COLLECTION_TILES } from "@/data/home"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"
import type { CollectionRouteKey } from "@/lib/shopify/collections"
import type { CollectionTile } from "@/data/home"

export const metadata: Metadata = {
  title: {
    absolute: "Sable Muse | Women's Clothing",
  },
  description:
    "Shop Sable Muse women's clothing in the United States. Dresses, tops, jeans, and matching sets, priced in US dollars, with free shipping on US orders.",
  openGraph: {
    title: "Sable Muse | Women's Clothing",
    description:
      "Contemporary women's fashion from Sable Muse. Shop new arrivals, dresses, tops, jeans, and matching sets.",
    images: ["/images/hero.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sable Muse",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sablemuse.shop",
  logo: "/images/logo.png",
  description:
    "Sable Muse is a women's clothing shop for the United States. Prices are in US dollars.",
}

const HomePage = async () => {
  const [newArrivals, matchingSets, ...tileProducts] = await Promise.all([
    getCollectionProducts(COLLECTION_HANDLES["new-in"], 3),
    getCollectionProducts(COLLECTION_HANDLES["matching-sets-lounge"], 4),
    ...COLLECTION_TILES.map((tile) =>
      getCollectionProducts(COLLECTION_HANDLES[tile.handle as CollectionRouteKey], 1)
    ),
  ])

  const collections: CollectionTile[] = COLLECTION_TILES.flatMap((tile, index) => {
    const image = tileProducts[index]?.[0]?.image

    if (!image) {
      return []
    }

    return [
      {
        id: tile.id,
        name: tile.name,
        href: tile.href,
        image,
        heightClass: tile.heightClass,
      },
    ]
  })

  const storyImages = [...newArrivals, ...matchingSets].slice(0, 4).map((product) => ({
    src: product.image,
    alt: product.name,
    href: `/product/${product.id}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WelcomeDialog />
      <HeroSection
        image={newArrivals[0]?.image}
        imageAlt={newArrivals[0]?.name ?? "Sable Muse women's clothing"}
      />
      <BestSellersSection products={newArrivals} />
      <CollectionSection collections={collections} />
      <BestSellersSection
        products={matchingSets}
        title="Matching Sets & Lounge"
        href="/collection/matching-sets-lounge"
        headingId="matching-sets-heading"
        carouselLabel="Matching sets"
      />
      <ShopStorySection images={storyImages} />
    </>
  )
}

export default HomePage
