import type { Metadata } from "next"
import { CheckoutInfoForm } from "@/components/checkout/checkout-info-form"
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { Container } from "@/components/shared/container"
import { getCustomerSession } from "@/lib/customer/session"

export const metadata: Metadata = {
  title: "Checkout Information",
  description:
    "Enter your contact and a United States shipping address to continue your Sable Muse order.",
  alternates: {
    canonical: "/checkout",
  },
}

const CheckoutInfoPage = async () => {
  const session = await getCustomerSession()

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <CheckoutStepper current="info" className="mt-8 md:mt-10" />

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="sr-only">Checkout information</h1>
            <CheckoutInfoForm customerAccessToken={session?.accessToken} />
          </div>
          <CheckoutOrderSummary className="order-1 lg:order-2 lg:sticky lg:top-[120px]" />
        </div>
      </Container>
    </section>
  )
}

export default CheckoutInfoPage
