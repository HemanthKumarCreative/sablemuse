"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import type { CartItem } from "@/data/cart"
import { cn } from "cn"

type CartLineItemProps = {
  item: CartItem
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  className?: string
  showImageBadge?: boolean
}

export const CartLineItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  className,
  showImageBadge = true,
}: CartLineItemProps) => {
  const handleIncrement = () => {
    onIncrement(item.id)
  }

  const handleDecrement = () => {
    onDecrement(item.id)
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  return (
    <article className={cn("relative flex gap-4", className)}>
      <div className="relative size-[112px] shrink-0 overflow-hidden bg-muted md:size-[142px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="142px"
          className="object-cover"
        />
        {showImageBadge ? (
          <span className="absolute top-2 right-2 flex size-7 items-center justify-center bg-white text-sm font-medium text-ink">
            {item.quantity}
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pr-8">
        <h3 className="text-base font-semibold text-ink">{item.name}</h3>
        <p className="text-sm text-ink-muted">Size: {item.size}</p>
        <p className="text-sm text-ink-muted">Color: {item.color}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="text-base font-semibold text-ink">$ {item.price}</p>

          <div
            className="inline-flex h-10 items-center gap-4 bg-[#D1D9CF] px-3"
            role="group"
            aria-label={`${item.name} quantity`}
          >
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Decrease quantity of ${item.name}`}
              className="inline-flex size-6 items-center justify-center text-[#404E3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Minus className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <span className="min-w-4 text-center text-sm font-medium text-ink">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${item.name}`}
              className="inline-flex size-6 items-center justify-center text-[#404E3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Plus className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${item.name} from cart`}
        className="absolute top-0 right-0 inline-flex size-8 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </article>
  )
}
