import type { Metadata } from "next"
import { CheckoutErrorContent } from "@/components/checkout/checkout-error-content"

export const metadata: Metadata = {
  title: "Payment Failed",
  description:
    "Your Sable Muse payment could not be completed. Please try again or use a different payment method.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/checkout/error",
  },
}

const CheckoutErrorPage = () => {
  return <CheckoutErrorContent />
}

export default CheckoutErrorPage
