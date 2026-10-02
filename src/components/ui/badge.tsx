import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-background text-brand-navy",
        inverse: "bg-ink text-background",
        outline: "border border-brand-border bg-background text-brand-navy",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
