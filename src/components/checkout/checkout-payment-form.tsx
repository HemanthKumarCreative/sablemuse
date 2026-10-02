"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCheckoutUrlAction } from "@/lib/shopify/cart/actions"
import { cn } from "cn"

const PAYMENT_BRANDS = ["Amex", "Visa", "Mastercard", "Shop Pay", "PayPal"] as const

type CheckoutPaymentFormProps = {
  className?: string
  checkoutUrl?: string
}

export const CheckoutPaymentForm = ({
  className,
  checkoutUrl,
}: CheckoutPaymentFormProps) => {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePay = async () => {
    setError("")
    setIsSubmitting(true)

    try {
      const url = checkoutUrl || (await getCheckoutUrlAction())
      if (!url) {
        throw new Error("Checkout URL unavailable")
      }

      window.location.assign(url)
    } catch (payError) {
      setError(
        payError instanceof Error
          ? payError.message
          : "Unable to start secure payment"
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-8", className)}>
      <div>
        <h2 className="text-xl font-semibold text-brand-navy md:text-2xl">Payment</h2>
        <p className="mt-2 text-sm text-brand-navy-muted md:text-base">
          You&apos;ll complete payment securely on Shopify Checkout. Card details
          are never collected on this site.
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Accepted payment methods"
        >
          {PAYMENT_BRANDS.map((brand) => (
            <li key={brand}>
              <Badge
                variant="outline"
                className="h-9 px-3 text-xs font-semibold tracking-wide uppercase"
              >
                {brand}
              </Badge>
            </li>
          ))}
        </ul>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

        <Button
          type="button"
          onClick={() => void handlePay()}
          disabled={isSubmitting}
          size="xl"
          className="mt-8 w-full"
        >
          {isSubmitting ? "Redirecting..." : "Continue To Secure Payment"}
        </Button>

        <p className="mt-4 text-xs leading-[1.7] text-brand-navy-muted">
          By continuing, you agree to complete your purchase through Shopify
          Checkout. Billing address can be confirmed there if it differs from
          shipping.
        </p>

        <div className="mt-8">
          <Link
            href="/checkout/shipping"
            className="text-sm text-brand-navy-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-base"
          >
            &lt; Return To Shipping
          </Link>
        </div>
      </div>
    </div>
  )
}
