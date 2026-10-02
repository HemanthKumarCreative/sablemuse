"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { QuantityStepper } from "@/components/cart/quantity-stepper"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format-money"
import { cn } from "cn"

type CheckoutOrderSummaryProps = {
  className?: string
  shippingCost?: number
}

export const CheckoutOrderSummary = ({
  className,
  shippingCost = 0,
}: CheckoutOrderSummaryProps) => {
  const {
    items,
    itemCount,
    subtotal,
    decrementItem,
    incrementItem,
    removeItem,
  } = useCart()

  const tax = Number((subtotal * 0.08).toFixed(2))
  const orderTotal = subtotal + tax + shippingCost
  const shippingLabel =
    shippingCost > 0
      ? `$${formatMoney(shippingCost)}`
      : "Free"

  return (
    <aside
      className={cn(
        "bg-transparent p-0 lg:bg-muted lg:p-6 xl:p-8",
        className
      )}
      aria-labelledby="checkout-cart-heading"
    >
      <h2
        id="checkout-cart-heading"
        className="text-center text-xl font-semibold text-brand-navy lg:text-left lg:text-2xl"
      >
        Your Cart
      </h2>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-brand-navy-muted">Your bag is empty.</p>
      ) : (
        <ul className="mt-6 space-y-6" role="list">
          {items.map((item) => (
            <li key={item.id} className="relative flex gap-3 sm:gap-4">
              <div className="relative size-[88px] shrink-0 overflow-hidden bg-muted sm:size-24 lg:size-20 xl:size-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                <Badge className="absolute top-1.5 right-1.5 size-6 p-0 text-xs">
                  {item.quantity}
                </Badge>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5 pr-7">
                <h3 className="text-base font-semibold text-brand-navy">{item.name}</h3>
                <p className="text-sm text-brand-navy-muted">Size: {item.size}</p>
                <p className="text-sm text-brand-navy-muted">Color: {item.color}</p>

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                  <p className="text-base font-semibold text-brand-navy">
                    ${formatMoney(item.price)}
                  </p>
                  <QuantityStepper
                    quantity={item.quantity}
                    label={item.name}
                    onIncrement={() => incrementItem(item.id)}
                    onDecrement={() => decrementItem(item.id)}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="absolute top-0 right-0 text-brand-navy"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 space-y-3 border-t border-brand-border pt-6 text-base text-brand-navy">
        <div className="flex items-center justify-between">
          <span>Subtotal ({itemCount})</span>
          <span>${formatMoney(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Tax</span>
          <span>${formatMoney(tax)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{shippingLabel}</span>
        </div>
        <div className="flex items-center justify-between font-semibold">
          <span>Order Totals</span>
          <span>${formatMoney(orderTotal)}</span>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold leading-[1.7] capitalize text-brand-navy">
        The Total Amount You Pay Includes All Applicable Customs Duties &amp;
        Taxes. We Guarantee No Additional Charges On Delivery.
      </p>
    </aside>
  )
}
