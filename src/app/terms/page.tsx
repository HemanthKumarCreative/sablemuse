import type { Metadata } from "next"
import { PolicyPage } from "@/components/content/policy-page"

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Sable Muse terms for shopping women's clothing in the United States, with prices in US dollars.",
  alternates: { canonical: "/terms" },
}

const TermsPage = () => {
  return (
    <PolicyPage title="Terms">
      <p>
        Sable Muse sells women&apos;s clothing to customers in the United States.
        Prices on this site are in US dollars. These terms describe how the shop
        operates today. Have a lawyer review them before you treat them as a
        finished legal agreement.
      </p>
      <p>
        When you place an order, you buy the product shown, in the size and
        color you select, at the price shown at checkout. Payment is completed
        on Shopify&apos;s hosted checkout. Sable Muse does not collect or store
        your card number.
      </p>
      <p>
        An order is accepted when Shopify confirms payment. We may cancel an
        order that cannot be fulfilled, including when an item sells out after
        it was added to your bag. If that happens, the charge is refunded
        through Shopify.
      </p>
      <p>
        Shipping and returns are described on the Shipping and Returns pages.
        Questions can go to hello@sablemuse.shop, Monday through Friday, 9 am
        to 5 pm Eastern Time.
      </p>
    </PolicyPage>
  )
}

export default TermsPage
