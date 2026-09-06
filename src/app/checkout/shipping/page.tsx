import type { Metadata } from "next"
import { CheckoutShippingContent } from "@/components/checkout/checkout-shipping-content"

export const metadata: Metadata = {
  title: "Shipping",
  description: "Choose a shipping method for your Modimal order.",
  alternates: {
    canonical: "/checkout/shipping",
  },
}

const CheckoutShippingPage = () => {
  return <CheckoutShippingContent />
}

export default CheckoutShippingPage
