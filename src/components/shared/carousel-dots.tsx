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
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => onSelect(index)}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full transition-colors",
              activeIndex === index ? "bg-ink" : "bg-brand-navy-muted"
            )}
          />
        </button>
      ))}
    </div>
  )
}
