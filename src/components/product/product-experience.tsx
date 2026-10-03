"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel"
import { isColorOption, isSizeOption } from "@/lib/shopify/mappers/color"
import {
  colorForImage,
  selectableOptions,
  selectedColorName,
  selectedImageUrl,
  selectionFromQuery,
} from "@/lib/product-selection"
import type { ProductDetail, ProductMedia } from "@/types/commerce"

type ProductExperienceProps = {
  product: ProductDetail
  initialQuery?: { color?: string; size?: string }
}

const selectionParams = (product: ProductDetail, selected: Record<string, string>) => {
  const params = new URLSearchParams()

  for (const option of selectableOptions(product)) {
    const value = selected[option.name]
    if (!value) {
      continue
    }

    const key = isColorOption(option.name)
      ? "color"
      : isSizeOption(option.name)
        ? "size"
        : option.name.toLowerCase()
    params.set(key, value)
  }

  return params
}

export const ProductExperience = ({
  product,
  initialQuery,
}: ProductExperienceProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const skipUrlWrite = useRef(true)
  const [selected, setSelected] = useState(() =>
    selectionFromQuery(product, initialQuery ?? {})
  )
  const colorName = selectedColorName(product, selected)
  const imageUrl = selectedImageUrl(product, selected)

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false
      return
    }

    const params = selectionParams(product, selected)
    const current = new URLSearchParams(window.location.search)
    if (current.toString() === params.toString()) {
      return
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [pathname, product, router, selected])

  const handleSelectOption = (name: string, value: string) => {
    setSelected((current) => ({ ...current, [name]: value }))
  }

  const handleActiveSlide = (item: ProductMedia) => {
    if (item.type !== "image") {
      return
    }

    const color = colorForImage(product, item.url)
    const colorOption = selectableOptions(product).find((option) =>
      isColorOption(option.name)
    )
    if (!color || !colorOption || selected[colorOption.name] === color) {
      return
    }

    handleSelectOption(colorOption.name, color)
  }

  return (
    <div className="mt-5 grid gap-8 md:mt-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <ProductGallery
          media={product.gallery}
          productName={product.name}
          selectedImageUrl={imageUrl}
          selectedColor={colorName}
          imageColor={(url) => colorForImage(product, url)}
          onActiveSlide={handleActiveSlide}
        />
      </div>
      <div className="min-w-0">
        <ProductPurchasePanel
          product={product}
          selected={selected}
          onSelectOption={handleSelectOption}
        />
      </div>
    </div>
  )
}
