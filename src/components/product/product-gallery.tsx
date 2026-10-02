"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { CarouselDots } from "@/components/shared/carousel-dots"
import { cn } from "cn"

type ProductGalleryProps = {
  images: string[]
  alt: string
  className?: string
}

export const ProductGallery = ({
  images,
  alt,
  className,
}: ProductGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  useEffect(() => {
    const track = trackRef.current

    if (!track || images.length <= 1) {
      return
    }

    const handleScroll = () => {
      const width = track.clientWidth
      if (width <= 0) {
        return
      }

      const nextIndex = Math.min(
        images.length - 1,
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
  }, [images.length])

  if (!activeImage) {
    return null
  }

  const handleSelectImage = (index: number) => {
    setActiveIndex(index)
  }

  const handleDotClick = (index: number) => {
    const track = trackRef.current

    setActiveIndex(index)

    if (!track) {
      return
    }

    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" })
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="md:hidden">
        <div
          ref={trackRef}
          role="region"
          aria-label={`${alt} gallery`}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto scrollbar-none sm:-mx-5"
        >
          {images.map((image, index) => (
            <div
              key={`${image}-mobile-${index}`}
              className="relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-muted"
            >
              <Image
                src={image}
                alt={`${alt} — image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <CarouselDots
          count={images.length}
          activeIndex={activeIndex}
          onSelect={handleDotClick}
          ariaLabel="Product image pagination"
          getLabel={(index) => `Go to image ${index + 1}`}
        />
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-[88px_minmax(0,1fr)] md:gap-5">
        <ul
          className="flex flex-col gap-3"
          aria-label="Product image thumbnails"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex

            return (
              <li key={`${image}-thumb-${index}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelectImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative block h-[104px] w-[88px] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "ring-2 ring-brand" : "ring-1 ring-transparent"
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </button>
              </li>
            )
          })}
        </ul>

        <div className="relative min-h-[640px] w-full overflow-hidden bg-muted">
          <Image
            src={activeImage}
            alt={alt}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
