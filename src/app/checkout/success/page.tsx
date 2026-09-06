import type { Metadata } from "next"
import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your Modimal order.",
  alternates: {
    canonical: "/checkout/success",
  },
}

const CheckoutSuccessPage = () => {
  return <CheckoutSuccessContent />
}

export default CheckoutSuccessPage
