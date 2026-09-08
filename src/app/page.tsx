import type { Metadata } from "next"
import { BestSellersSection } from "@/components/home/best-sellers-section"
import { CollectionSection } from "@/components/home/collection-section"
import { FollowUsSection } from "@/components/home/follow-us-section"
import { HeroSection } from "@/components/home/hero-section"
import { ModiWeekSection } from "@/components/home/modiweek-section"
import { SustainabilitySection } from "@/components/home/sustainability-section"
import { WelcomeDialog } from "@/components/home/welcome-dialog"
import { COLLECTIONS, MODIWEEK } from "@/data/home"
import { COLLECTION_HANDLES, getCollectionProducts } from "@/lib/shopify"

export const metadata: Metadata = {
  title: {
    absolute: "Modimal | Women Clothing",
  },
  description:
    "Shop Modimal women's clothing — best sellers, collections, ModiWeek looks, and sustainable fashion essentials.",
  openGraph: {
    title: "Modimal | Women Clothing",
    description:
      "Elegance in simplicity, Earth’s Harmony. Explore Modimal’s curated women's fashion.",
    images: ["/images/hero.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Modimal",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: "/images/logo.png",
  description:
    "Minimalist women's clothing brand focused on timeless design and sustainability.",
  sameAs: [
    "https://instagram.com",
    "https://facebook.com",
    "https://pinterest.com",
    "https://twitter.com",
  ],
}

const HomePage = async () => {
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
      <WelcomeDialog />
      <HeroSection />
      <BestSellersSection products={bestSellers} />
      <CollectionSection collections={COLLECTIONS} />
      <ModiWeekSection days={MODIWEEK} />
      <SustainabilitySection />
      <FollowUsSection />
    </>
  )
}

export default HomePage
