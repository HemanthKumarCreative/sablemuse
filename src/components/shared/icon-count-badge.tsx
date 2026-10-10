import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

type IconCountBadgeProps = {
  count: number
  className?: string
}

export const IconCountBadge = ({ count, className }: IconCountBadgeProps) => {
  if (count <= 0) {
    return null
  }

  return (
    <Badge
      variant="inverse"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 right-0 z-10 flex h-4 min-w-4 translate-x-1/3 -translate-y-1/3 items-center justify-center px-1 text-[10px] font-semibold leading-none tabular-nums ring-2 ring-background",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
