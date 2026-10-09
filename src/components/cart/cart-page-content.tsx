"use client"

import Link from "next/link"
import { CartLineItem } from "@/components/cart/cart-line-item"
import { CartTableRow } from "@/components/cart/cart-table-row"
import { useCart } from "@/components/cart/cart-provider"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format-money"

export const CartPageContent = () => {
  const {
    items,
    itemCount,
    subtotal,
    isPending,
    decrementItem,
    incrementItem,
    removeItem,
  } = useCart()

  const orderTotal = subtotal

  if (items.length === 0) {
    return (
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 md:mt-8 md:gap-4">
            <Link
              href="/collection"
              className="text-base text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Back
            </Link>
            <h1 className="heading-page text-center">
              Your Cart
            </h1>
            <span className="w-12" aria-hidden="true" />
          </div>
          <p className="mt-10 text-center text-brand-navy-muted">
            Your shopping bag is empty.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              render={<Link href="/collection" />}
              size="xl"
              className="px-10"
            >
              Continue Shopping
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 md:mt-8 md:gap-4">
          <Link
            href="/collection"
              className="text-base text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back
          </Link>
          <h1 className="heading-page text-center">
            Your Cart
          </h1>
          <Link
            href="/shop-all"
            className="hidden text-base text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline"
          >
            Continue Shopping
          </Link>
          <span className="w-12 md:hidden" aria-hidden="true" />
        </div>

        <div
          className="mt-10 hidden border-b-2 border-brand-border pb-4 md:grid md:grid-cols-[minmax(0,1.4fr)_0.7fr_0.7fr_0.7fr] md:gap-6"
          aria-hidden="true"
        >
          <p className="text-base text-brand-navy">Order Summary</p>
          <p className="text-base text-brand-navy">Price</p>
          <p className="text-base text-brand-navy">Quantity</p>
          <p className="text-right text-base text-brand-navy">Total</p>
        </div>
        <h2 className="mt-8 text-lg font-semibold text-brand-navy md:hidden">
          Order Summary
        </h2>

        <ul className="mt-6 space-y-8 md:hidden" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <CartLineItem
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
                quantityDisabled={isPending}
              />
            </li>
          ))}
        </ul>

        <ul className="mt-2 hidden md:mt-0 md:block" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <CartTableRow
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
                quantityDisabled={isPending}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-end md:mt-10">
          <div className="w-full max-w-md">
            <div className="space-y-4 text-base text-brand-navy">
              <div className="flex items-center justify-between">
                <span>Subtotal ({itemCount})</span>
                <span>${formatMoney(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Order Totals</span>
                <span>${formatMoney(orderTotal)}</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-[1.7] text-brand-navy">
              Tax is calculated at checkout from your shipping address.{" "}
              <Link
                href="/shipping"
                className="underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Shipping
              </Link>
              {" · "}
              <Link
                href="/returns"
                className="underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Returns
              </Link>
            </p>

            <div className="mt-8 flex justify-end">
              <Button
                render={<Link href="/checkout" />}
                nativeButton={false}
                size="xl"
                className="px-12"
              >
                Continue to checkout
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
