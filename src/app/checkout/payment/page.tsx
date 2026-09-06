import type { Metadata } from "next"
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary"
import { CheckoutPaymentForm } from "@/components/checkout/checkout-payment-form"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { Container } from "@/components/shared/container"

export const metadata: Metadata = {
  title: "Payment",
  description: "Enter payment details to complete your Modimal order.",
  alternates: {
    canonical: "/checkout/payment",
  },
}

const CheckoutPaymentPage = () => {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <CheckoutStepper current="payment" className="mt-8 md:mt-10" />

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.75fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div>
            <h1 className="sr-only">Payment</h1>
            <CheckoutPaymentForm />
          </div>
          <CheckoutOrderSummary className="hidden lg:sticky lg:top-[120px] lg:block" />
        </div>
      </Container>
    </section>
  )
}

export default CheckoutPaymentPage
