"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { Container } from "@/components/shared/container"

export const CheckoutSuccessContent = () => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-2 text-center">
          <div
            className="flex size-[88px] items-center justify-center rounded-none bg-ink md:size-24"
            aria-hidden="true"
          >
            <Check
              className="size-10 text-background md:size-12"
              strokeWidth={2.5}
            />
          </div>

          <h1 className="heading-page mt-8 capitalize leading-tight">
            Payment Successful
          </h1>

          <p className="mt-6 max-w-xl text-base leading-copy capitalize text-brand-navy md:text-lg">
            Thank You For Choosing Sable Muse. Your Order Will Be Generated Based
            On Your Delivery Request.
          </p>

          <p className="mt-4 text-sm capitalize text-brand-navy md:text-base">
            The Receipt Has Been Sent To Your Email
          </p>

          <div className="mt-12 space-y-3 text-sm text-brand-navy md:mt-14 md:text-base">
            <p className="font-semibold capitalize">
              Please Contact Us For Any Query
            </p>
            <p>
              <a
                href="mailto:support@sablemuse.shop"
                className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                support@sablemuse.shop
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
