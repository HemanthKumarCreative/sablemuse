import type { Metadata } from "next"
import { WishlistPageContent } from "@/components/wishlist/wishlist-page-content"
import { getProducts } from "@/lib/shopify"
import type { Product } from "@/types/commerce"

export const metadata: Metadata = {
  title: "My Wish List",
  description:
    "View your Modimal wish list — saved women’s clothing and essentials.",
  openGraph: {
    title: "My Wish List | Modimal",
    description: "Saved Modimal pieces you’re watching — ready when you are.",
  },
  alternates: {
    canonical: "/wishlist",
  },
}

const WishlistPage = async () => {
  const products = await getProducts(50)
  const productsByHandle = products.reduce<Record<string, Product>>(
    (acc, product) => {
      acc[product.id] = product
      return acc
    },
    {}
  )

  return <WishlistPageContent productsByHandle={productsByHandle} />
}

export default WishlistPage
