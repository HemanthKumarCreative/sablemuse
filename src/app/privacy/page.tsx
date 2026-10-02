import type { Metadata } from "next"
import { PolicyPage } from "@/components/content/policy-page"

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Sable Muse handles a shopping bag cookie, a customer session, and a wishlist stored in your browser.",
  alternates: { canonical: "/privacy" },
}

const PrivacyPage = () => {
  return (
    <PolicyPage title="Privacy">
      <p>
        Sable Muse uses a small amount of information to run the shop. This
        page describes what this website stores. It is the shop&apos;s operating
        notice, and it should be reviewed by counsel before it is treated as a
        finished privacy policy.
      </p>
      <p>
        The shopping bag is stored in an httpOnly cookie named modimal_cart_id
        so an existing bag can be found on your next visit. If you sign in,
        Shopify&apos;s customer login sets session cookies in this browser. Your
        wishlist is a list of product handles in localStorage on this device.
        It is not sent to a Sable Muse account.
      </p>
      <p>
        The contact form and the footer email field open your email app. They
        do not save the message on this site. Checkout, including payment and
        the shipping address, is handled by Shopify.
      </p>
      <p>
        We do not sell personal information. We do not use the information
        above for cross-context behavioral advertising.
      </p>
      <h2 className="pt-4 text-xl font-semibold">California residents</h2>
      <p>
        If you live in California, you can ask what personal information this
        site keeps about you and ask us to delete it. Email
        hello@sablemuse.shop with the subject “California privacy request.”
        We will respond within 45 days. We do not sell or share personal
        information as those terms are used in the California Consumer Privacy
        Act.
      </p>
    </PolicyPage>
  )
}

export default PrivacyPage
