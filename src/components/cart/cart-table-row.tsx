"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import type { CartItem } from "@/data/cart"
import { cn } from "cn"

type CartTableRowProps = {
  item: CartItem
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  className?: string
}

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const CartTableRow = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  className,
}: CartTableRowProps) => {
  const lineTotal = item.price * item.quantity

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
    <div
      className={cn(
        "grid grid-cols-1 gap-4 border-b border-[#DFDFDF] py-6 md:grid-cols-[minmax(0,1.4fr)_0.7fr_0.7fr_0.7fr] md:items-start md:gap-6",
        className
      )}
    >
      <div className="flex gap-3 md:gap-4">
        <div className="relative size-[112px] shrink-0 overflow-hidden bg-muted md:size-[142px]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="142px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-ink">{item.name}</h3>
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${item.name} from cart`}
              className="inline-flex size-8 shrink-0 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
            >
              <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-ink-muted">Size : {item.size}</p>
          <p className="text-sm text-ink-muted">Color : {item.color}</p>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="hidden size-8 shrink-0 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:inline-flex"
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-between md:block md:pt-2">
        <span className="text-sm text-ink-muted md:hidden">Price</span>
        <p className="text-base text-ink">${formatMoney(item.price)}</p>
      </div>

      <div className="flex items-center justify-between md:block md:pt-2">
        <span className="text-sm text-ink-muted md:hidden">Quantity</span>
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

      <div className="flex items-center justify-between md:block md:pt-2 md:text-right">
        <span className="text-sm text-ink-muted md:hidden">Total</span>
        <p className="text-base font-medium text-ink">
          ${formatMoney(lineTotal)}
        </p>
      </div>
    </div>
  )
}
