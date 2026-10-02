"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { QuantityStepper } from "@/components/cart/quantity-stepper"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format-money"
import type { CartItem } from "@/types/commerce"
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
          <span className="absolute top-2 right-2 flex size-7 items-center justify-center bg-background text-sm font-medium text-brand-navy">
            {item.quantity}
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pr-8">
        <h3 className="text-base font-semibold text-brand-navy">{item.name}</h3>
        <p className="text-sm text-brand-navy-muted">Size: {item.size}</p>
        <p className="text-sm text-brand-navy-muted">Color: {item.color}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="text-base font-semibold text-brand-navy">
            ${formatMoney(item.price)}
          </p>

          <QuantityStepper
            quantity={item.quantity}
            label={item.name}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        aria-label={`Remove ${item.name} from cart`}
        className="absolute top-0 right-0 text-brand-navy"
      >
        <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </Button>
    </article>
  )
}
