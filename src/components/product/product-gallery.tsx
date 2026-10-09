"use client"

import Image from "next/image"
import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight, Play, ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ProductMedia } from "@/types/commerce"
import { cn } from "cn"

type ProductGalleryProps = {
  media: ProductMedia[]
  productName: string
  selectedImageUrl?: string
  selectedColor?: string
  imageColor?: (url: string) => string
  onActiveSlide?: (item: ProductMedia) => void
  className?: string
}

const fileKey = (url: string) => {
  const path = url.split("?")[0] ?? url
  const parts = path.split("/")
  return parts[parts.length - 1] ?? path
}

const indexForImage = (items: ProductMedia[], url: string | undefined) => {
  if (!url) {
    return 0
  }

  const key = fileKey(url)
  const index = items.findIndex(
    (item) => item.type === "image" && fileKey(item.url) === key
  )
  return index >= 0 ? index : 0
}

const slideLabel = (
  item: ProductMedia,
  index: number,
  productName: string,
  selectedColor: string | undefined
) => {
  if (item.alt) {
    return item.alt
  }

  const color = selectedColor ? `, ${selectedColor}` : ""
  if (item.type === "video" || item.type === "external-video") {
    return `${productName}${color}, video ${index + 1}`
  }
  if (item.type === "model") {
    return `${productName}${color}, 3D view ${index + 1}`
  }
  return `${productName}${color}, image ${index + 1}`
}

const thumbLabel = (
  item: ProductMedia,
  index: number,
  knownColor: string
) => {
  const color = knownColor ? `, ${knownColor}` : ""
  if (item.type === "video" || item.type === "external-video") {
    return `Video ${index + 1}${color}`
  }
  if (item.type === "model") {
    return `3D view ${index + 1}`
  }
  return `View image ${index + 1}${color}`
}

export const ProductGallery = ({
  media,
  productName,
  selectedImageUrl,
  selectedColor,
  imageColor,
  onActiveSlide,
  className,
}: ProductGalleryProps) => {
  const slides = useMemo(() => {
    if (!selectedImageUrl) {
      return media
    }

    const key = fileKey(selectedImageUrl)
    const exists = media.some(
      (item) => item.type === "image" && fileKey(item.url) === key
    )
    if (exists) {
      return media
    }

    return [
      { type: "image" as const, url: selectedImageUrl, alt: "" },
      ...media,
    ]
  }, [media, selectedImageUrl])
  const [activeIndex, setActiveIndex] = useState(() =>
    indexForImage(slides, selectedImageUrl)
  )
  const [trackedImageUrl, setTrackedImageUrl] = useState(selectedImageUrl)
  const [zoomed, setZoomed] = useState(false)
  const touchStart = useRef<number | null>(null)
  const swiped = useRef(false)
  const thumbsRef = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const list = thumbsRef.current
    if (!list) {
      return
    }

    const reveal = () => {
      const thumb = list.children.item(activeIndex)
      if (!(thumb instanceof HTMLElement)) {
        return
      }

      const listRect = list.getBoundingClientRect()
      const thumbRect = thumb.getBoundingClientRect()
      const horizontal = list.scrollWidth > list.clientWidth + 1
      const vertical = list.scrollHeight > list.clientHeight + 1

      if (
        horizontal &&
        (thumbRect.left < listRect.left - 1 || thumbRect.right > listRect.right + 1)
      ) {
        list.scrollLeft +=
          thumbRect.left - listRect.left - (list.clientWidth - thumbRect.width) / 2
      }

      if (
        vertical &&
        (thumbRect.top < listRect.top - 1 || thumbRect.bottom > listRect.bottom + 1)
      ) {
        list.scrollTop +=
          thumbRect.top - listRect.top - (list.clientHeight - thumbRect.height) / 2
      }
    }

    reveal()
    const observer = new ResizeObserver(reveal)
    observer.observe(list)
    return () => observer.disconnect()
  }, [activeIndex, slides])

  if (trackedImageUrl !== selectedImageUrl) {
    setTrackedImageUrl(selectedImageUrl)
    setActiveIndex(indexForImage(slides, selectedImageUrl))
  }

  const activeItem = slides[activeIndex] ?? slides[0]
  const labelFor = (item: ProductMedia, index: number) =>
    slideLabel(item, index, productName, selectedColor)

  if (!activeItem) {
    return null
  }

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    const item = slides[index]
    if (item) {
      onActiveSlide?.(item)
    }
  }

  const handleStep = (direction: -1 | 1) => {
    const next = activeIndex + direction
    if (next < 0 || next >= slides.length) {
      return
    }

    setActiveIndex(next)
    const item = slides[next]
    if (item) {
      onActiveSlide?.(item)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (slides.length < 2) {
      return
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      handleStep(1)
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      handleStep(-1)
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current == null) {
      return
    }

    const end = event.changedTouches[0]?.clientX ?? touchStart.current
    const delta = end - touchStart.current
    touchStart.current = null

    if (Math.abs(delta) < 40) {
      return
    }

    swiped.current = true
    handleStep(delta < 0 ? 1 : -1)
  }

  const handleZoom = () => {
    if (swiped.current) {
      swiped.current = false
      return
    }

    setZoomed(true)
  }

  const activeLabel = labelFor(activeItem, activeIndex)

  return (
    <div className={cn("w-full", className)}>
      <div
        role="region"
        aria-label={`${productName} gallery`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[88px_minmax(0,1fr)] md:items-start md:gap-5">
          {slides.length > 1 ? (
            <ul
              ref={thumbsRef}
              className="order-2 flex gap-2 overflow-x-auto md:order-1 md:max-h-[720px] md:flex-col md:overflow-y-auto"
              aria-label="Product image thumbnails"
            >
              {slides.map((item, index) => {
                const thumb = item.type === "image" ? item.url : item.poster
                const isActive = index === activeIndex
                const knownColor =
                  item.type === "image" ? imageColor?.(item.url) ?? "" : ""

                return (
                  <li key={`${item.type}-${item.url}-${index}`} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      aria-label={thumbLabel(item, index, knownColor)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative block size-16 cursor-pointer overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[104px] md:w-[88px]",
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
                      ) : (
                        <span className="flex h-full items-center justify-center px-1 text-center text-[10px] text-brand-navy">
                          {item.type === "video" || item.type === "external-video"
                            ? "Video"
                            : "3D"}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}

          <div className="order-1 min-w-0 md:order-2">
            <div
              className="relative aspect-[2/3] w-full overflow-hidden bg-muted"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <MediaSlide
                item={activeItem}
                label={activeLabel}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                onZoom={activeItem.type === "image" ? handleZoom : undefined}
              />
              {activeItem.type === "image" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleZoom}
                  aria-label="Zoom image"
                  className="absolute top-3 right-3 bg-background"
                >
                  <ZoomIn className="size-4" aria-hidden="true" />
                </Button>
              ) : null}
            </div>
            {selectedColor || slides.length > 1 ? (
              <p
                className="mt-3 text-center text-sm text-brand-navy-muted"
                aria-live="polite"
              >
                {selectedColor ? `${selectedColor}` : ""}
                {selectedColor && slides.length > 1 ? " · " : ""}
                {slides.length > 1 ? `${activeIndex + 1} / ${slides.length}` : ""}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <Dialog open={zoomed} onOpenChange={setZoomed}>
        <DialogContent className="inset-0 top-0 left-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-3 rounded-none bg-background p-4 sm:max-w-none">
          <DialogTitle className="sr-only">{activeLabel}</DialogTitle>
          <div className="relative min-h-0 flex-1">
            <MediaSlide
              item={activeItem}
              label={activeLabel}
              sizes="100vw"
              framed
            />
          </div>
          {slides.length > 1 ? (
            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleStep(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <p className="text-sm text-brand-navy">
                {activeIndex + 1} / {slides.length}
              </p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleStep(1)}
                disabled={activeIndex === slides.length - 1}
                aria-label="Next image"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const MediaSlide = ({
  item,
  label,
  priority,
  sizes,
  onZoom,
  framed = false,
}: {
  item: ProductMedia
  label: string
  priority?: boolean
  sizes: string
  onZoom?: () => void
  framed?: boolean
}) => {
  if (item.type === "video") {
    return (
      <video
        key={item.url}
        controls
        playsInline
        poster={item.poster}
        preload="none"
        className="h-full w-full object-contain"
        aria-label={label}
      >
        <source src={item.url} type={item.mimeType || "video/mp4"} />
      </video>
    )
  }

  if (item.type === "external-video") {
    return <ExternalVideo item={item} label={label} />
  }

  if (item.type === "model") {
    return (
      <div className="relative h-full w-full">
        {item.poster ? (
          <Image
            src={item.poster}
            alt={label}
            fill
            sizes={sizes}
            className="object-contain"
          />
        ) : null}
        <p className="absolute inset-x-0 bottom-0 bg-background/95 px-4 py-3 text-center text-sm text-brand-navy">
          A 3D view of this product is not available here.
        </p>
      </div>
    )
  }

  const image = (
    <Image
      src={item.url}
      alt={label}
      fill
      priority={priority}
      sizes={sizes}
      className="object-contain"
    />
  )

  if (!onZoom || framed) {
    return <div className="relative h-full w-full">{image}</div>
  }

  return (
    <button
      type="button"
      onClick={onZoom}
      aria-label={`Zoom ${label}`}
      className="relative block h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {image}
    </button>
  )
}

const ExternalVideo = ({
  item,
  label,
}: {
  item: Extract<ProductMedia, { type: "external-video" }>
  label: string
}) => {
  const [playing, setPlaying] = useState(false)

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${label}`}
        className="relative block h-full w-full cursor-pointer bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {item.poster ? (
          <Image
            src={item.poster}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        ) : null}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 bg-background px-4 py-2 text-sm font-medium text-brand-navy">
            <Play className="size-4" aria-hidden="true" />
            Play video
          </span>
        </span>
      </button>
    )
  }

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
