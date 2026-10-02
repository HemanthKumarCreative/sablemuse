import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type QuantityStepperProps = {
  quantity: number
  label: string
  onIncrement: () => void
  onDecrement: () => void
}

export const QuantityStepper = ({
  quantity,
  label,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) => {
  return (
    <div
      className="inline-flex h-10 items-center gap-1 bg-muted px-1"
      role="group"
      aria-label={`${label} quantity`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Decrease quantity of ${label}`}
        className="text-brand-navy"
        onClick={onDecrement}
      >
        <Minus className="size-3.5" strokeWidth={2} aria-hidden="true" />
      </Button>
      <span className="min-w-4 text-center text-sm font-medium text-brand-navy">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Increase quantity of ${label}`}
        className="text-brand-navy"
        onClick={onIncrement}
      >
        <Plus className="size-3.5" strokeWidth={2} aria-hidden="true" />
      </Button>
    </div>
  )
}
