export const revalidate = 3600

import type { Metadata } from "next"
import { BestSellersSection } from "@/components/home/best-sellers-section"
import { HeroSection } from "@/components/home/hero-section"
import { WelcomeDialog } from "@/components/home/welcome-dialog"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

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
  const [newArrivals, dresses, tops, jeans, matchingSets] = await Promise.all([
    getCollectionProducts(COLLECTION_HANDLES["new-in"], 3),
    getCollectionProducts(COLLECTION_HANDLES["dresses-jumpsuits"], 4),
    getCollectionProducts(COLLECTION_HANDLES["tops-blouses"], 4),
    getCollectionProducts(COLLECTION_HANDLES["jeans-pants"], 4),
    getCollectionProducts(COLLECTION_HANDLES["matching-sets-lounge"], 4),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WelcomeDialog />
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
