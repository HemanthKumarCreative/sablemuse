"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

export type ShopAllHeroSlide = {
  src: string
  alt: string
  objectPosition?: string
}

type ShopAllHeroProps = {
  slides: ShopAllHeroSlide[]
  className?: string
  ariaLabel?: string
  desktopMode?: "single" | "split"
}

export const ShopAllHero = ({
  slides,
  className,
  ariaLabel = "Lookbook",
  desktopMode = "single",
}: ShopAllHeroProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const desktopSlide = slides[0]
  const splitSlides = slides.slice(0, 2)

  useEffect(() => {
    const track = trackRef.current

    if (!track || slides.length <= 1) {
      return
    }

    const handleScroll = () => {
      const width = track.clientWidth
      if (width <= 0) {
        return
      }

      const nextIndex = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / width))
      )
      setActiveIndex(nextIndex)
    }

    handleScroll()
    track.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      track.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [slides.length])

  const handleDotClick = (index: number) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    setActiveIndex(index)
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" })
  }

  if (slides.length === 0 || !desktopSlide) {
    return null
  }

  return (
    <div className={cn("w-full", className)}>
      {desktopMode === "split" && splitSlides.length >= 2 ? (
        <div className="hidden grid-cols-2 lg:grid">
          {splitSlides.map((slide, index) => (
            <div
              key={`${slide.src}-desktop-${index}`}
              className="relative min-h-[360px] overflow-hidden bg-muted lg:min-h-[420px]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="50vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative hidden aspect-[21/9] min-h-[360px] overflow-hidden bg-muted lg:block lg:min-h-[420px]">
          <Image
            src={desktopSlide.src}
            alt={desktopSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{
              objectPosition: desktopSlide.objectPosition ?? "center",
            }}
          />
        </div>
      )}

      <div className="lg:hidden">
        <div
          ref={trackRef}
          role="region"
          aria-label={ariaLabel}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${slide.objectPosition ?? "center"}-${index}`}
              className="relative aspect-[390/320] w-full shrink-0 snap-center overflow-hidden bg-muted sm:aspect-[16/9]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: slide.objectPosition ?? "center",
                }}
              />
            </div>
          ))}
        </div>

        {slides.length > 1 ? (
          <div
            className="mt-3 flex justify-center gap-2"
            role="tablist"
            aria-label={`${ariaLabel} pagination`}
          >
            {slides.map((slide, index) => (
              <button
                key={`${slide.src}-dot-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Go to slide ${index + 1}`}
                tabIndex={0}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  activeIndex === index ? "bg-ink" : "bg-[#adadad]"
                )}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
