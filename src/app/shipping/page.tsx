import type { Metadata } from "next"
import { PolicyPage } from "@/components/content/policy-page"

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "Sable Muse ships free within the United States. Most orders leave within 1–2 business days.",
  alternates: { canonical: "/shipping" },
}

const ShippingPage = () => {
  return (
    <PolicyPage title="Shipping">
      <p>
        Sable Muse ships to addresses in the United States. Shipping is free
        on US orders. Prices on the site are in US dollars.
      </p>
      <p>
        Most orders ship within one to two business days. When the package
        leaves, you receive an email with tracking. The delivery choice is
        confirmed at Shopify checkout.
      </p>
      <p>
        Sales tax is calculated at checkout from the shipping address. The bag
        and checkout summary on this site show the merchandise subtotal and
        shipping. They do not add a tax estimate.
      </p>
      <p>
        If an order has not shipped and you need to change it, email
        support@sablemuse.shop with your order number as soon as you can.
      </p>
    </PolicyPage>
  )
}

export default ShippingPage
