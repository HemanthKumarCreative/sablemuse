import type { Metadata } from "next"
import { Caveat, Montserrat } from "next/font/google"
import localFont from "next/font/local"
import { CartProvider } from "@/components/cart/cart-provider"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
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
    default: "Modimal | Women Clothing",
    template: "%s | Modimal",
  },
  description:
    "Modimal is a minimalist women's clothing brand offering timeless essentials with elegance in simplicity and earth's harmony.",
  keywords: [
    "Modimal",
    "women clothing",
    "minimalist fashion",
    "sustainable clothing",
    "new arrivals",
    "best sellers",
  ],
  authors: [{ name: "Modimal" }],
  creator: "Modimal",
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
    title: "Modimal | Women Clothing",
    description:
      "Discover curated women's fashion rooted in elegance, simplicity, and sustainability.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${caveat.variable} ${gillSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  )
}
