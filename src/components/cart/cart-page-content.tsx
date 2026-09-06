"use client"

import Link from "next/link"
import { CartTableRow } from "@/components/cart/cart-table-row"
import { useCart } from "@/components/cart/cart-provider"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const CartPageContent = () => {
  const {
    items,
    itemCount,
    subtotal,
    decrementItem,
    incrementItem,
    removeItem,
  } = useCart()

  const tax = Number((subtotal * 0.08).toFixed(2))
  const orderTotal = subtotal + tax

  if (items.length === 0) {
    return (
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="mt-8 flex items-center justify-between gap-4">
            <Link
              href="/collection"
              className="text-base text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Back
            </Link>
            <h1 className="text-[2rem] font-bold text-ink md:text-[2.5rem]">
              Your Cart
            </h1>
            <span className="w-12" aria-hidden="true" />
          </div>
          <p className="mt-10 text-center text-ink-muted">
            Your shopping bag is empty.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              render={<Link href="/collection" />}
              className="h-12 rounded-none bg-brand px-10 text-base font-medium capitalize text-white hover:bg-brand/90"
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
        <div className="mt-8 flex items-center justify-between gap-4">
          <Link
            href="/collection"
            className="text-base text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Back
          </Link>
          <h1 className="text-[2rem] font-bold text-ink md:text-[2.5rem]">
            Your Cart
          </h1>
          <Link
            href="/shop-all"
            className="text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Continue Shopping
          </Link>
        </div>

        <div
          className="mt-10 hidden border-b-2 border-[#DFDFDF] pb-4 md:grid md:grid-cols-[minmax(0,1.4fr)_0.7fr_0.7fr_0.7fr] md:gap-6"
          aria-hidden="true"
        >
          <p className="text-base text-ink">Order Summary</p>
          <p className="text-base text-ink">Price</p>
          <p className="text-base text-ink">Quantity</p>
          <p className="text-right text-base text-ink">Total</p>
        </div>
        <h2 className="mt-10 text-lg font-semibold text-ink md:hidden">
          Order Summary
        </h2>

        <ul className="mt-2 md:mt-0" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <CartTableRow
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-end md:mt-10">
          <div className="w-full max-w-md">
            <div className="space-y-4 text-base text-ink">
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
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>Order Total :</span>
                <span>${formatMoney(orderTotal)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold leading-[1.7] text-ink">
              The total amount you pay includes all applicable customs duties
              &amp; taxes. We guarantee no additional charges on delivery.
            </p>

            <div className="mt-8 flex justify-end">
              <Button
                render={<Link href="/checkout" />}
                className="h-12 rounded-none bg-brand px-12 text-base font-medium capitalize text-white hover:bg-brand/90"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
