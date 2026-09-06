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
      className={cn("bg-[#F0F2EF] p-6 md:p-8", className)}
      aria-labelledby="checkout-cart-heading"
    >
      <h2
        id="checkout-cart-heading"
        className="text-xl font-semibold text-ink md:text-2xl"
      >
        Your Cart
      </h2>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink-muted">Your bag is empty.</p>
      ) : (
        <ul className="mt-6 space-y-6" role="list">
          {items.map((item) => (
            <li key={item.id} className="relative flex gap-3">
              <div className="relative size-20 shrink-0 overflow-hidden bg-muted md:size-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 pr-6">
                <h3 className="text-sm font-semibold text-ink md:text-base">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-ink-muted md:text-sm">
                  Size : {item.size}
                </p>
                <p className="text-xs text-ink-muted md:text-sm">
                  Color : {item.color}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div
                    className="inline-flex h-8 items-center gap-3 bg-[#D1D9CF] px-2"
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
                  <p className="text-sm font-semibold text-ink">
                    ${item.price}
                  </p>
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

      <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-ink md:text-base">
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
          <span>Total Orders :</span>
          <span>${formatMoney(orderTotal)}</span>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold leading-[1.7] text-ink md:text-sm">
        The total amount you pay includes all applicable customs duties &amp;
        taxes. We guarantee no additional charges on delivery.
      </p>
    </aside>
  )
}
