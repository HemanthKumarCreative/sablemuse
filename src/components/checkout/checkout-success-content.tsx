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
            className="flex size-[88px] items-center justify-center rounded-full bg-brand md:size-24"
            aria-hidden="true"
          >
            <Check
              className="size-10 text-white md:size-12"
              strokeWidth={2.5}
            />
          </div>

          <h1 className="mt-8 text-[2rem] font-bold capitalize leading-tight text-brand md:text-[2.5rem]">
            Payment Successful
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.8] capitalize text-ink md:text-lg">
            Thank You For Choosing Modimal, Your Order Will Be Generated Based
            On Your Delivery Request.
          </p>

          <p className="mt-4 text-sm capitalize text-ink md:text-base">
            The Receipt Has Been Sent To Your Email
          </p>

          <div className="mt-12 space-y-3 text-sm text-ink md:mt-14 md:text-base">
            <p className="font-semibold capitalize">
              Please Contact Us For Any Query
            </p>
            <p>
              <a
                href="tel:+19294603208"
                className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                +1(929)460-3208
              </a>
            </p>
            <p className="text-ink">Or</p>
            <p>
              <a
                href="mailto:hello@modimal.com"
                className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Hello@Modimal.Com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
