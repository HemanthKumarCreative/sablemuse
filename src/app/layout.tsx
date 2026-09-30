import type { Metadata } from "next"
import { Caveat, Montserrat } from "next/font/google"
import localFont from "next/font/local"
import { CartProvider } from "@/components/cart/cart-provider"
import { WishlistProvider } from "@/components/wishlist/wishlist-provider"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { fetchCart } from "@/lib/shopify/cart/actions"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
})

const gillSans = localFont({
  src: "../../public/fonts/Gill-Sans-MT-Italic.ttf",
  variable: "--font-gill",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sable Muse | Contemporary Women's Fashion",
    template: "%s | Sable Muse",
  },
  description:
    "Sable Muse is a contemporary women's fashion boutique offering elevated essentials, trending dresses, matching sets, and timeless styles.",
  keywords: [
    "Sable Muse",
    "women clothing",
    "contemporary fashion",
    "dresses",
    "matching sets",
    "new arrivals",
    "best sellers",
  ],
  authors: [{ name: "Sable Muse" }],
  creator: "Sable Muse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Modimal",
    title: "Modimal | Women Clothing",
    description:
      "Discover curated women's fashion rooted in elegance, simplicity, and sustainability.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1441,
        height: 600,
        alt: "Modimal women clothing hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sable Muse | Contemporary Women's Fashion",
    description:
      "Discover curated women's fashion rooted in elegance, simplicity, and modern style.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialCart = await fetchCart()

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${caveat.variable} ${gillSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <WishlistProvider>
          <CartProvider initialCart={initialCart}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
