import type { Metadata } from "next"
import { CartPageContent } from "@/components/cart/cart-page-content"

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your Sable Muse shopping bag and continue to checkout.",
  alternates: {
    canonical: "/cart",
  },
}

const CartPage = () => {
  return <CartPageContent />
}

export default CartPage
