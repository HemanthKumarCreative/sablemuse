"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

type ScrollCarouselProps = {
  children: React.ReactNode
  itemCount: number
  className?: string
  trackClassName?: string
  dotsClassName?: string
  ariaLabel?: string
}

export const ScrollCarousel = ({
  children,
  itemCount,
  className,
  trackClassName,
  dotsClassName,
  ariaLabel = "Carousel",
}: ScrollCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const track = trackRef.current

    if (!track || itemCount <= 0) {
      return
    }

    const handleUpdate = () => {
      const firstChild = track.firstElementChild as HTMLElement | null

      if (!firstChild) {
        return
      }

      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0
      const itemWidth = firstChild.getBoundingClientRect().width + gap
      const visibleCount = Math.max(
        1,
        Math.round(track.clientWidth / Math.max(itemWidth, 1))
      )
      const nextDotCount = Math.max(1, itemCount - visibleCount + 1)
      const nextIndex = Math.min(
        nextDotCount - 1,
        Math.max(0, Math.round(track.scrollLeft / Math.max(itemWidth, 1)))
      )

      setDotCount(nextDotCount)
      setActiveIndex(nextIndex)
    }

    handleUpdate()
    track.addEventListener("scroll", handleUpdate, { passive: true })
    window.addEventListener("resize", handleUpdate)

    return () => {
      track.removeEventListener("scroll", handleUpdate)
      window.removeEventListener("resize", handleUpdate)
    }
  }, [itemCount])

  const handleDotClick = (index: number) => {
    const track = trackRef.current
    const firstChild = track?.firstElementChild as HTMLElement | null

    if (!track || !firstChild) {
      return
    }

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0
    const itemWidth = firstChild.getBoundingClientRect().width + gap
    track.scrollTo({ left: itemWidth * index, behavior: "smooth" })
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 scrollbar-none sm:-mx-5 sm:px-5",
          trackClassName
        )}
      >
        {children}
      </div>

      {dotCount > 1 ? (
        <div
          className={cn("mt-4 flex justify-center gap-2", dotsClassName)}
          role="tablist"
          aria-label={`${ariaLabel} pagination`}
        >
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
              className={cn(
                "size-2 rounded-full transition-colors",
                activeIndex === index ? "bg-brand" : "bg-[#adadad]"
              )}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
