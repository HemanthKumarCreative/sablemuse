import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { CheckoutShippingContent } from "@/components/checkout/checkout-shipping-content"
import { fetchCartDelivery } from "@/lib/shopify/cart/actions"

export const metadata: Metadata = {
  title: "Shipping",
  description: "Choose a shipping method for your Sable Muse order in the United States.",
  alternates: {
    canonical: "/checkout/shipping",
  },
}

const CheckoutShippingPage = async () => {
  const { cart, deliveryGroups, contactEmail, shipToSummary } =
    await fetchCartDelivery()

  if (cart.totalQuantity === 0) {
    redirect("/cart")
  }

  return (
    <CheckoutShippingContent
      deliveryGroups={deliveryGroups}
      contactEmail={contactEmail}
      shipToSummary={shipToSummary}
    />
  )
}

export default CheckoutShippingPage
