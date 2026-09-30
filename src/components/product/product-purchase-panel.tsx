"use client"

import { useMemo, useState, type ChangeEvent } from "react"
import { ChevronDown, Heart, RefreshCcw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductAccordions } from "@/components/product/product-accordions"
import { useCart } from "@/components/cart/cart-provider"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import type { ProductDetail } from "@/types/commerce"
import { isColorOption, isSizeOption } from "@/lib/shopify/mappers/color"
import { cn } from "cn"

type ProductPurchasePanelProps = {
  product: ProductDetail
  className?: string
  showAccordions?: boolean
}

const SIZE_GUIDE_ROWS = [
  { size: "1X", waist: "86–91", hips: "112–117", bust: "107–112" },
  { size: "2X", waist: "94–99", hips: "119–124", bust: "114–119" },
  { size: "3X", waist: "102–107", hips: "127–132", bust: "122–127" },
  { size: "4X", waist: "109–114", hips: "135–140", bust: "130–135" },
]

const findVariantId = (
  product: ProductDetail,
  selectedSize: string,
  selectedColor: string
) => {
  const variants = product.variants ?? []
  if (variants.length === 0) {
    return null
  }

  const match = variants.find((variant) => {
    const sizeValue = variant.selectedOptions.find((option) =>
      isSizeOption(option.name)
    )?.value
    const colorValue = variant.selectedOptions.find((option) =>
      isColorOption(option.name)
    )?.value

    const sizeOk = selectedSize ? sizeValue === selectedSize : true
    const colorOk = selectedColor ? colorValue === selectedColor : true
    return sizeOk && colorOk
  })

  return match?.availableForSale ? match.id : match?.id ?? null
}

export const ProductPurchasePanel = ({
  product,
  className,
  showAccordions = true,
}: ProductPurchasePanelProps) => {
  const { addItem, isPending } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? ""
  )
  const [selectedSize, setSelectedSize] = useState("")
  const [error, setError] = useState("")
  const [added, setAdded] = useState(false)

  const usesSelect = product.sizeSelector === "select"
  const ctaBrand = product.ctaStyle === "brand"
  const wishlisted = isWishlisted(product.id)

  const selectedVariantId = useMemo(
    () => findVariantId(product, selectedSize, selectedColor),
    [product, selectedSize, selectedColor]
  )

  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName)
    setAdded(false)
  }

  const handleSelectSize = (size: string) => {
    setSelectedSize(size)
    setError("")
    setAdded(false)
  }

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value)
    setError("")
    setAdded(false)
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product.id)
  }

  const handleAddToBag = async () => {
    if (!selectedSize && (product.sizes?.length ?? 0) > 0) {
      setError("Please select a size")
      return
    }

    if (!selectedVariantId) {
      setError("This combination is unavailable")
      return
    }

    setError("")
    await addItem({ merchandiseId: selectedVariantId, quantity: 1 })
    setAdded(true)
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <h1 className="text-[1.75rem] font-bold capitalize leading-[1.3] text-ink md:text-[2.25rem]">
        {product.name}
      </h1>
      
      <div className="mt-3 flex items-baseline gap-3">
        <p className="text-2xl font-bold text-ink">${product.price}</p>
        {product.compareAtPrice ? (
          <p className="text-lg text-ink-muted line-through">${product.compareAtPrice}</p>
        ) : null}
      </div>

      {product.colors.length > 0 ? (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium capitalize text-ink">
            Color: <span className="text-ink-muted font-normal">{selectedColor}</span>
          </p>
          <ul className="flex flex-wrap gap-3" aria-label="Available colors">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name
              return (
                <li key={color.name}>
                  <button
                    type="button"
                    onClick={() => handleSelectColor(color.name)}
                    aria-label={color.name}
                    aria-pressed={isSelected}
                    className={cn(
                      "size-8 rounded-full border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      isSelected && "ring-2 ring-brand ring-offset-2"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium capitalize text-ink">
            Size: <span className="text-ink-muted font-normal">{selectedSize || "Select size"}</span>
          </p>
          <Dialog>
            <DialogTrigger
              render={
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                />
              }
            >
              Size Guide
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-none">
              <DialogHeader>
                <DialogTitle>Size Guide</DialogTitle>
              </DialogHeader>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2">Size</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Hips</th>
                    <th className="py-2">Bust</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE_ROWS.map((row) => (
                    <tr key={row.size} className="border-b border-border">
                      <td className="py-2">{row.size}</td>
                      <td className="py-2">{row.waist}</td>
                      <td className="py-2">{row.hips}</td>
                      <td className="py-2">{row.bust}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DialogContent>
          </Dialog>
        </div>

        {usesSelect ? (
          <select
            value={selectedSize}
            onChange={handleSizeChange}
            aria-label="Select size"
            className="h-12 w-full rounded-none border border-border bg-white px-4 text-base text-ink"
          >
            <option value="">Select size</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        ) : (
          <ul className="flex flex-wrap gap-2" aria-label="Available sizes">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size
              return (
                <li key={size}>
                  <button
                    type="button"
                    onClick={() => handleSelectSize(size)}
                    aria-pressed={isSelected}
                    className={cn(
                      "inline-flex h-10 min-w-12 items-center justify-center border border-border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      isSelected && "border-brand bg-brand text-white"
                    )}
                  >
                    {size}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {added ? (
        <p className="mt-3 text-sm text-brand font-medium">✓ Added to bag successfully!</p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={() => void handleAddToBag()}
          disabled={isPending}
          className={cn(
            "h-12 flex-1 rounded-none text-base font-semibold uppercase tracking-wide text-white hover:opacity-90",
            ctaBrand ? "bg-brand" : "bg-ink"
          )}
        >
          {isPending ? "Adding..." : `Add To Bag — $${product.price}`}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleToggleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="h-12 rounded-none border-border px-4"
        >
          <Heart
            className={cn("size-5", wishlisted && "fill-brand text-brand")}
            aria-hidden="true"
          />
        </Button>
      </div>

      {product.showEasyReturn !== false ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted">
          <RefreshCcw className="size-4" aria-hidden="true" />
          Fast US Shipping (2–5 Days) & Easy 14-Day Returns
        </p>
      ) : null}

      {product.description ? (
        <div className="mt-6 border-t border-border pt-6">
          <p className="text-sm leading-[1.8] text-ink">
            {product.description}
          </p>
        </div>
      ) : null}

      {showAccordions ? (
        <div className="mt-6">
          <ProductAccordions product={product} />
        </div>
      ) : null}
    </div>
  )
}
