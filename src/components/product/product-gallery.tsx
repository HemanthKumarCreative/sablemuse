"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { CarouselDots } from "@/components/shared/carousel-dots"
import type { ProductMedia } from "@/types/commerce"
import { cn } from "cn"

type ProductGalleryProps = {
  media: ProductMedia[]
  alt: string
  className?: string
}

const posterFor = (item: ProductMedia) =>
  item.type === "image" ? item.url : item.poster

export const ProductGallery = ({
  media,
  alt,
  className,
}: ProductGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = media[activeIndex] ?? media[0]

  useEffect(() => {
    const track = trackRef.current

    if (!track || media.length <= 1) {
      return
    }

    const handleScroll = () => {
      const width = track.clientWidth
      if (width <= 0) {
        return
      }

      const nextIndex = Math.min(
        media.length - 1,
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
  }, [media.length])

  if (!activeItem) {
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
          {media.map((item, index) => (
            <div
              key={`${item.url}-mobile-${index}`}
              className="relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-muted"
            >
              <MediaFrame
                item={item}
                alt={alt}
                index={index}
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <CarouselDots
          count={media.length}
          activeIndex={activeIndex}
          onSelect={handleDotClick}
          ariaLabel="Product image pagination"
          getLabel={(index) => `Go to image ${index + 1}`}
        />
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-[88px_minmax(0,1fr)] md:gap-5">
        <ul
          className="flex max-h-[640px] flex-col gap-3 overflow-y-auto"
          aria-label="Product image thumbnails"
        >
          {media.map((item, index) => {
            const isActive = index === activeIndex
            const thumb = posterFor(item)

            return (
              <li key={`${item.url}-thumb-${index}`} className="shrink-0">
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
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="relative aspect-[3/4] min-h-[640px] w-full overflow-hidden bg-muted">
          <MediaFrame
            item={activeItem}
            alt={alt}
            index={activeIndex}
            priority
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  )
}

const MediaFrame = ({
  item,
  alt,
  index,
  priority,
  sizes,
}: {
  item: ProductMedia
  alt: string
  index: number
  priority?: boolean
  sizes: string
}) => {
  const label = item.alt || `${alt} — image ${index + 1}`

  if (item.type === "video") {
    return (
      <video
        key={item.url}
        controls
        poster={item.poster}
        preload="none"
        className="h-full w-full object-cover"
        aria-label={label}
      >
        <source src={item.url} />
      </video>
    )
  }

  if (item.type === "external-video") {
    return (
      <iframe
        src={item.url}
        title={label}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <Image
      src={item.url}
      alt={label}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  )
}
