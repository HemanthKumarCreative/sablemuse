"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { cn } from "cn"

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

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
      ? `$${shippingCost.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "Free"

  return (
    <aside
      className={cn(
        "bg-transparent p-0 lg:bg-[#F0F2EF] lg:p-6 xl:p-8",
        className
      )}
      aria-labelledby="checkout-cart-heading"
    >
      <h2
        id="checkout-cart-heading"
        className="text-center text-xl font-semibold text-ink lg:text-left lg:text-2xl"
      >
        Your Cart
      </h2>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink-muted">Your bag is empty.</p>
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
                <span className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center bg-white text-xs font-medium text-ink">
                  {item.quantity}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5 pr-7">
                <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                <p className="text-sm text-ink-muted">Size: {item.size}</p>
                <p className="text-sm text-ink-muted">Color: {item.color}</p>

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                  <p className="text-base font-semibold text-ink">
                    $ {item.price}
                  </p>
                  <div
                    className="inline-flex h-9 items-center gap-3 bg-[#D1D9CF] px-2.5"
                    role="group"
                    aria-label={`${item.name} quantity`}
                  >
                    <button
                      type="button"
                      onClick={() => decrementItem(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="inline-flex size-5 items-center justify-center text-[#404E3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <Minus className="size-3" strokeWidth={2} aria-hidden="true" />
                    </button>
                    <span className="min-w-3 text-center text-sm text-ink">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementItem(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="inline-flex size-5 items-center justify-center text-[#404E3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <Plus className="size-3" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="absolute top-0 right-0 inline-flex size-7 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 space-y-3 border-t border-border pt-6 text-base text-ink">
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
        <div className="flex items-center justify-between font-bold">
          <span>Order Totals</span>
          <span>${formatMoney(orderTotal)}</span>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold leading-[1.7] capitalize text-ink">
        The Total Amount You Pay Includes All Applicable Customs Duties &amp;
        Taxes. We Guarantee No Additional Charges On Delivery.
      </p>
    </aside>
  )
}
