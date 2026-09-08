import type { Metadata } from "next"
import { CheckoutShippingContent } from "@/components/checkout/checkout-shipping-content"
import { fetchCartDelivery } from "@/lib/shopify/cart/actions"

export const metadata: Metadata = {
  title: "Shipping",
  description: "Choose a shipping method for your Modimal order.",
  alternates: {
    canonical: "/checkout/shipping",
  },
}

const CheckoutShippingPage = async () => {
  const { deliveryGroups } = await fetchCartDelivery()

  return <CheckoutShippingContent deliveryGroups={deliveryGroups} />
}

export default CheckoutShippingPage
