"use client"

import { useState, type ChangeEvent } from "react"
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
import type { ProductDetail } from "@/data/products"
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

export const ProductPurchasePanel = ({
  product,
  className,
  showAccordions = true,
}: ProductPurchasePanelProps) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? ""
  )
  const [selectedSize, setSelectedSize] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const usesSelect = product.sizeSelector === "select"
  const ctaBrand = product.ctaStyle === "brand"

  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName)
  }

  const handleSelectSize = (size: string) => {
    setSelectedSize(size)
  }

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted((current) => !current)
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      return
    }
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <h1 className="text-[2rem] font-bold capitalize leading-[1.3] text-ink md:text-[2.5rem]">
        {product.name}
      </h1>
      {!product.showCtaPrice && product.sizeSelector !== "select" ? (
        <p className="mt-3 text-xl font-medium text-ink">${product.price}</p>
      ) : null}
      <p className="mt-4 text-sm leading-[1.8] capitalize text-ink md:text-base md:normal-case">
        {product.description}
      </p>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium capitalize text-ink">Color</p>
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
                    "inline-flex size-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    isSelected ? "ring-1 ring-ink ring-offset-2" : ""
                  )}
                >
                  <span
                    className={cn(
                      "size-6 rounded-full border",
                      color.hex === "#FFFFFF"
                        ? "border-border"
                        : "border-transparent"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-8">
        {usesSelect ? (
          <>
            <div className="mb-3 flex items-center justify-end">
              <Dialog>
                <DialogTrigger
                  className="text-sm text-ink-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Open size guide"
                >
                  Size Guide
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-none border-border bg-white p-6 sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-ink">
                      Women&apos;s Clothing Chart
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-ink">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2 pr-3 font-semibold">Size (cm)</th>
                          <th className="py-2 pr-3 font-semibold">Waist</th>
                          <th className="py-2 pr-3 font-semibold">Hips</th>
                          <th className="py-2 font-semibold">Bust</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_GUIDE_ROWS.map((row) => (
                          <tr key={row.size} className="border-b border-border">
                            <td className="py-2 pr-3">{row.size}</td>
                            <td className="py-2 pr-3">{row.waist}</td>
                            <td className="py-2 pr-3">{row.hips}</td>
                            <td className="py-2">{row.bust}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <label className="sr-only" htmlFor={`${product.id}-size`}>
              Size
            </label>
            <div className="relative">
              <select
                id={`${product.id}-size`}
                value={selectedSize}
                onChange={handleSizeChange}
                aria-label="Select size"
                className="h-12 w-full appearance-none rounded-none border border-border bg-white px-4 pr-10 text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <option value="" disabled>
                  Size
                </option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink"
                aria-hidden="true"
              />
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-sm font-medium capitalize text-ink">Size</p>
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
                        "inline-flex h-11 min-w-11 items-center justify-center border px-3 text-sm font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                        isSelected
                          ? "border-ink bg-ink text-white"
                          : "border-border bg-white text-ink hover:border-ink"
                      )}
                    >
                      {size}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>

      <div className={cn("mt-8", usesSelect ? "" : "flex gap-3")}>
        <Button
          type="button"
          onClick={handleAddToBag}
          className={cn(
            "h-12 w-full rounded-none text-base font-medium tracking-[0.04em] text-white",
            ctaBrand
              ? "bg-brand uppercase hover:bg-brand/90"
              : "flex-1 bg-ink uppercase hover:bg-ink/90"
          )}
        >
          {product.showCtaPrice
            ? `Add To Cart + $${product.price}`
            : ctaBrand
              ? "Add To Cart"
              : "Add To Bag"}
        </Button>
        {!usesSelect ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleToggleWishlist}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            className="size-12 rounded-none border-border text-ink hover:bg-muted"
          >
            <Heart
              className="size-5"
              strokeWidth={1.5}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </Button>
        ) : null}
      </div>

      {product.showEasyReturn || usesSelect ? (
        <div
          className={cn(
            "mt-8 flex flex-col gap-4 text-sm text-ink-muted",
            product.showEasyReturn
              ? "sm:flex-row sm:items-center sm:justify-between"
              : "items-center"
          )}
        >
          {product.showEasyReturn ? (
            <p className="inline-flex items-center gap-2">
              <RefreshCcw className="size-5 shrink-0" aria-hidden="true" />
              Easy Return
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-pressed={isWishlisted}
            className="inline-flex items-center gap-2 capitalize text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Heart
              className="size-5 shrink-0"
              strokeWidth={1.5}
              fill={isWishlisted ? "currentColor" : "none"}
              aria-hidden="true"
            />
            Add To Wishlist
          </button>
        </div>
      ) : null}

      {product.material ? (
        <div className="mt-8 hidden bg-[#F0F2EF] p-6 md:p-8 lg:block">
          <h2 className="border-b border-[#ADADAD] pb-4 text-lg font-semibold text-ink">
            {product.material.title}
          </h2>
          <p className="mt-4 text-sm leading-[1.8] text-ink-muted md:text-base">
            {product.material.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Material benefits">
            {product.material.tags.map((tag) => (
              <li
                key={tag}
                className="bg-white px-3 py-2 text-sm capitalize text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {showAccordions ? (
        <ProductAccordions
          product={product}
          defaultOpen={product.accordionDefaultOpen ?? ["fitting"]}
          className="mt-10"
        />
      ) : null}
    </div>
  )
}
