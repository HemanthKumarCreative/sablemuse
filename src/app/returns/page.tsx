import type { Metadata } from "next"
import { PolicyPage } from "@/components/content/policy-page"

export const metadata: Metadata = {
  title: "Returns",
  description:
    "Sable Muse accepts returns within 7 days of delivery for unworn items in their original condition.",
  alternates: { canonical: "/returns" },
}

const ReturnsPage = () => {
  return (
    <PolicyPage title="Returns">
      <p>
        Returns are accepted within 7 days of delivery for unworn items in
        their original condition. Email support@sablemuse.shop with your order
        number to start a return. We reply Monday through Friday, 9 am to 5 pm
        Eastern Time.
      </p>
      <p>
        Refunds go back to the original payment method through Shopify after
        the return is received and checked. Shipping charges that were free at
        checkout are not billed back as a return fee on this page&apos;s terms.
      </p>
      <p>
        If a size or a wash question comes up before you order, use the size
        options on the product page or email support@sablemuse.shop.
      </p>
    </PolicyPage>
  )
}

export default ReturnsPage
