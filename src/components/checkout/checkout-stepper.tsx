import Link from "next/link"
import { cn } from "cn"

export type CheckoutStep = "cart" | "info" | "shipping" | "payment"

const STEPS: { id: CheckoutStep; label: string; href: string }[] = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "info", label: "Info", href: "/checkout" },
  { id: "shipping", label: "Shipping", href: "/checkout/shipping" },
  { id: "payment", label: "Payment", href: "/checkout/payment" },
]

type CheckoutStepperProps = {
  current: CheckoutStep
  className?: string
}

export const CheckoutStepper = ({
  current,
  className,
}: CheckoutStepperProps) => {
  const currentIndex = STEPS.findIndex((step) => step.id === current)

  return (
    <nav aria-label="Checkout progress" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm md:justify-start md:text-base">
        {STEPS.map((step, index) => {
          const isCurrent = step.id === current
          const isComplete = index < currentIndex
          const isClickable = isComplete || isCurrent

          return (
            <li key={step.id} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="text-brand-navy-muted" aria-hidden="true">
                  /
                </span>
              ) : null}
              {isClickable ? (
                <Link
                  href={step.href}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    isCurrent
                      ? "font-semibold text-brand-navy"
                      : "text-brand-navy-muted hover:text-brand-navy"
                  )}
                >
                  {step.label}
                </Link>
              ) : (
                <span className="capitalize text-brand-navy-muted">{step.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
