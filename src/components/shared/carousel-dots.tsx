import { cn } from "cn"

type CarouselDotsProps = {
  count: number
  activeIndex: number
  onSelect: (index: number) => void
  ariaLabel: string
  getLabel?: (index: number) => string
  className?: string
}

export const CarouselDots = ({
  count,
  activeIndex,
  onSelect,
  ariaLabel,
  getLabel,
  className,
}: CarouselDotsProps) => {
  if (count <= 1) {
    return null
  }

  return (
    <div
      className={cn("mt-3 flex justify-center gap-2", className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={activeIndex === index}
          aria-label={getLabel?.(index) ?? `Go to slide ${index + 1}`}
          tabIndex={0}
          className={cn(
            "size-2 rounded-full transition-colors",
            activeIndex === index ? "bg-ink" : "bg-brand-navy-muted"
          )}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  )
}
