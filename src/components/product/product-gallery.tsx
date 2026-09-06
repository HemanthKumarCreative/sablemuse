"use client"

import Image from "next/image"
import { useState } from "react"
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
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  if (!activeImage) {
    return null
  }

  const handleSelectImage = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-[88px_minmax(0,1fr)] md:gap-5",
        className
      )}
    >
      <ul
        className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible"
        aria-label="Product image thumbnails"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex

          return (
            <li key={`${image}-${index}`} className="shrink-0">
              <button
                type="button"
                onClick={() => handleSelectImage(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={isActive}
                className={cn(
                  "relative block size-20 overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:h-[104px] md:w-[88px]",
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

      <div className="relative order-1 aspect-[3/4] w-full overflow-hidden bg-muted md:order-2 md:min-h-[640px] md:aspect-auto">
        <Image
          src={activeImage}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
