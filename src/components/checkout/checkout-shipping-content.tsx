"use client"

import { useState } from "react"
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary"
import { CheckoutShippingForm } from "@/components/checkout/checkout-shipping-form"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { Container } from "@/components/shared/container"

export const CheckoutShippingContent = () => {
  const [shippingCost, setShippingCost] = useState(0)

  const handleShippingCostChange = (cost: number) => {
    setShippingCost(cost)
  }

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <CheckoutStepper current="shipping" className="mt-8 md:mt-10" />

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start lg:gap-12 xl:gap-16">
          <CheckoutShippingForm
            onShippingCostChange={handleShippingCostChange}
          />
          <CheckoutOrderSummary
            shippingCost={shippingCost}
            className="hidden lg:sticky lg:top-[120px] lg:block"
          />
        </div>
      </Container>
    </section>
  )
}
