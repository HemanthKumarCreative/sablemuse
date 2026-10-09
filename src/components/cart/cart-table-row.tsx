"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { QuantityStepper } from "@/components/cart/quantity-stepper"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format-money"
import type { CartItem } from "@/types/commerce"
import { cn } from "cn"

type CartTableRowProps = {
  item: CartItem
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  className?: string
  quantityDisabled?: boolean
}

export const CartTableRow = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  className,
  quantityDisabled = false,
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
        "grid grid-cols-1 gap-4 border-b border-brand-border py-6 md:grid-cols-[minmax(0,1.4fr)_0.7fr_0.7fr_0.7fr] md:items-start md:gap-6",
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
            <h3 className="text-base font-semibold text-brand-navy">{item.name}</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              aria-label={`Remove ${item.name} from cart`}
              className="shrink-0 text-brand-navy md:hidden"
            >
              <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
          <p className="text-sm text-brand-navy-muted">Size: {item.size}</p>
          <p className="text-sm text-brand-navy-muted">Color: {item.color}</p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="hidden shrink-0 text-brand-navy md:inline-flex"
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>

      <div className="flex items-center justify-between md:block md:pt-2">
        <span className="text-sm text-brand-navy-muted md:hidden">Price</span>
        <p className="text-base text-brand-navy">${formatMoney(item.price)}</p>
      </div>

      <div className="flex items-center justify-between md:block md:pt-2">
        <span className="text-sm text-brand-navy-muted md:hidden">Quantity</span>
        <QuantityStepper
          quantity={item.quantity}
          label={item.name}
          disabled={quantityDisabled}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>

      <div className="flex items-center justify-between md:block md:pt-2 md:text-right">
        <span className="text-sm text-brand-navy-muted md:hidden">Total</span>
        <p className="text-base font-medium text-brand-navy">
          ${formatMoney(lineTotal)}
        </p>
      </div>
    </div>
  )
}
