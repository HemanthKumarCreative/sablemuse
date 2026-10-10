export const revalidate = 3600

import type { Metadata } from "next"
import { BestSellersSection } from "@/components/home/best-sellers-section"
import { HeroSection } from "@/components/home/hero-section"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"
import type { Product } from "@/types/commerce"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

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
  url: siteUrl,
  logo: new URL("/images/logo.png", siteUrl).href,
  description:
    "Sable Muse is a women's clothing shop for the United States. Prices are in US dollars.",
}

const RAIL_MISMATCH: Record<string, RegExp> = {
  dresses: /\b(capris?|pants|shorts)\b/i,
  tops: /\b(capris?|pants|shorts|overalls?|jeans|jumpsuits?|rompers?)\b/i,
  jeans: /\b(dress|blouse|jumpsuit|romper|overall)\b/i,
}

const forRail = (products: Product[], rail: keyof typeof RAIL_MISMATCH) =>
  products.filter((product) => !RAIL_MISMATCH[rail].test(product.name))

const takeUnique = (products: Product[], seen: Set<string>, limit: number) => {
  const next: Product[] = []

  for (const product of products) {
    if (seen.has(product.id)) {
      continue
    }

    seen.add(product.id)
    next.push(product)

    if (next.length >= limit) {
      break
    }
  }

  return next
}

const HomePage = async () => {
  const [newArrivalsRaw, dressesRaw, topsRaw, jeansRaw, matchingSetsRaw] =
    await Promise.all([
      getCollectionProducts(COLLECTION_HANDLES["new-in"], 12),
      getCollectionProducts(COLLECTION_HANDLES["dresses-jumpsuits"], 24),
      getCollectionProducts(COLLECTION_HANDLES["tops-blouses"], 24),
      getCollectionProducts(COLLECTION_HANDLES["jeans-pants"], 24),
      getCollectionProducts(COLLECTION_HANDLES["matching-sets-lounge"], 12),
    ])
  const seen = new Set<string>()
  const newArrivals = takeUnique(newArrivalsRaw, seen, 4)
  const dresses = takeUnique(forRail(dressesRaw, "dresses"), seen, 4)
  const tops = takeUnique(forRail(topsRaw, "tops"), seen, 4)
  const jeans = takeUnique(forRail(jeansRaw, "jeans"), seen, 4)
  const matchingSets = takeUnique(matchingSetsRaw, seen, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <BestSellersSection products={newArrivals} />
      <BestSellersSection
        products={dresses}
        title="Dresses & Jumpsuits"
        href="/collection/dresses-jumpsuits"
        headingId="dresses-heading"
        carouselLabel="Dresses"
      />
      <BestSellersSection
        products={tops}
        title="Tops & Blouses"
        href="/collection/tops-blouses"
        headingId="tops-heading"
        carouselLabel="Tops"
      />
      <BestSellersSection
        products={jeans}
        title="Jeans & Pants"
        href="/collection/jeans-pants"
        headingId="jeans-heading"
        carouselLabel="Jeans"
      />
      <BestSellersSection
        products={matchingSets}
        title="Matching Sets & Lounge"
        href="/collection/matching-sets-lounge"
        headingId="matching-sets-heading"
        carouselLabel="Matching sets"
        className="pb-12 md:pb-20"
      />
    </>
  )
}

export default HomePage
