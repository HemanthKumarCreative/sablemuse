"use client"

import { useState } from "react"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel"
import {
  initialSelection,
  selectedColorName,
  selectedImageUrl,
} from "@/lib/product-selection"
import type { ProductDetail } from "@/types/commerce"

type ProductExperienceProps = {
  product: ProductDetail
}

export const ProductExperience = ({ product }: ProductExperienceProps) => {
  const [selected, setSelected] = useState(() => initialSelection(product))
  const colorName = selectedColorName(product, selected)
  const imageUrl = selectedImageUrl(product, selected)

  const handleSelectOption = (name: string, value: string) => {
    setSelected((current) => ({ ...current, [name]: value }))
  }

  return (
    <div className="mt-5 grid gap-8 md:mt-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <ProductGallery
          media={product.gallery}
          productName={product.name}
          selectedImageUrl={imageUrl}
          selectedColor={colorName}
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
