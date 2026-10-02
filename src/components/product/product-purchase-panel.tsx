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
import { ColorSwatch } from "@/components/product/color-swatch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { inputVariants } from "@/components/ui/input"
import { ProductAccordions } from "@/components/product/product-accordions"
import { useCart } from "@/components/cart/cart-provider"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { formatMoney } from "@/lib/format-money"
import type { ProductDetail, ProductVariant } from "@/types/commerce"
import { isColorOption, isSizeOption } from "@/lib/shopify/mappers/color"
import { cn } from "cn"

type ProductPurchasePanelProps = {
  product: ProductDetail
  className?: string
  showAccordions?: boolean
}

const variantMatches = (
  variant: ProductVariant,
  selectedSize: string,
  selectedColor: string
) => {
  const sizeValue = variant.selectedOptions.find((option) =>
    isSizeOption(option.name)
  )?.value
  const colorValue = variant.selectedOptions.find((option) =>
    isColorOption(option.name)
  )?.value
  const sizeOk = selectedSize ? sizeValue === selectedSize : true
  const colorOk = selectedColor ? colorValue === selectedColor : true
  return sizeOk && colorOk
}

const findVariantId = (
  product: ProductDetail,
  selectedSize: string,
  selectedColor: string
) => {
  const variants = product.variants ?? []
  if (variants.length === 0) {
    return null
  }

  const match = variants.find(
    (variant) =>
      variant.availableForSale &&
      variantMatches(variant, selectedSize, selectedColor)
  )

  return match?.id ?? null
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
  const wishlisted = isWishlisted(product.id)

  const inStock = useMemo(() => {
    const variants = product.variants ?? []
    if (variants.length === 0) {
      return null
    }

    const relevant = variants.filter((variant) =>
      variantMatches(variant, selectedSize, selectedColor)
    )

    if (relevant.length === 0) {
      return false
    }

    return relevant.some((variant) => variant.availableForSale)
  }, [product.variants, selectedColor, selectedSize])

  const selectedVariantId = useMemo(
    () => findVariantId(product, selectedSize, selectedColor),
    [product, selectedSize, selectedColor]
  )

  const scopedVariants = useMemo(() => {
    const variants = product.variants ?? []
    return variants.filter((variant) =>
      variantMatches(variant, selectedSize, selectedColor)
    )
  }, [product.variants, selectedColor, selectedSize])

  const displayPrice = scopedVariants.length
    ? Math.min(...scopedVariants.map((variant) => variant.price))
    : product.price
  const displayMax = scopedVariants.length
    ? Math.max(...scopedVariants.map((variant) => variant.price))
    : product.price
  const showFrom = displayMax > displayPrice
  const selectedVariant =
    scopedVariants.length === 1 ? scopedVariants[0] : undefined
  const sizeRequired = (product.sizes?.length ?? 0) > 0
  const selectionSoldOut = Boolean(selectedSize) && inStock === false

  const isSizeAvailable = (size: string) =>
    (product.variants ?? []).some(
      (variant) =>
        variant.availableForSale &&
        variantMatches(variant, size, selectedColor)
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
    if (!selectedSize && sizeRequired) {
      setError("Please select a size")
      return
    }

    if (!selectedVariantId || selectionSoldOut) {
      setError("This combination is unavailable")
      return
    }

    setError("")
    await addItem({ merchandiseId: selectedVariantId, quantity: 1 })
    setAdded(true)
  }

  const handleBuyNow = async () => {
    if (!selectedSize && sizeRequired) {
      setError("Please select a size")
      return
    }

    if (!selectedVariantId || selectionSoldOut) {
      setError("This combination is unavailable")
      return
    }

    setError("")
    const nextCart = await addItem({
      merchandiseId: selectedVariantId,
      quantity: 1,
    })

    if (!nextCart.checkoutUrl) {
      setError("Checkout is unavailable right now")
      return
    }

    window.location.assign(nextCart.checkoutUrl)
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <h1 id="product-heading" className="heading-page capitalize">
        {product.name}
      </h1>

      <div className="mt-3 flex items-baseline gap-3">
        <p className="text-2xl font-semibold text-brand-navy">
          {showFrom ? "From " : null}${formatMoney(displayPrice)}
        </p>
        {selectedVariant?.compareAtPrice ? (
          <p className="text-lg text-brand-navy-muted line-through">
            ${formatMoney(selectedVariant.compareAtPrice)}
          </p>
        ) : null}
      </div>
      {selectedVariant?.sku ? (
        <p className="mt-2 text-xs text-brand-navy-muted">
          SKU {selectedVariant.sku}
        </p>
      ) : null}

      {inStock !== null ? (
        <Badge
          variant={inStock ? "outline" : "inverse"}
          className="mt-4 w-fit px-3 py-1 text-xs tracking-eyebrow uppercase"
        >
          {inStock ? "In Stock" : "Sold Out"}
        </Badge>
      ) : null}

      {product.colors.length > 0 ? (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium capitalize text-brand-navy">
            Color: <span className="text-brand-navy-muted font-normal">{selectedColor}</span>
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
                      "size-8 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected && "ring-2 ring-ink ring-offset-2"
                    )}
                  >
                    <ColorSwatch
                      hex={color.hex}
                      name={color.name}
                      decorative
                      className="size-full"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium capitalize text-brand-navy">
            Size: <span className="text-brand-navy-muted font-normal">{selectedSize || "Select size"}</span>
          </p>
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="link"
                  className="h-auto gap-1 px-0 text-sm"
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
              <p className="text-sm leading-copy text-brand-navy">
                Compare a piece you already own with the size options on this
                page. Measurements are listed in inches when the product
                description includes them. Email{" "}
                <a
                  href="mailto:hello@sablemuse.shop"
                  className="underline underline-offset-2"
                >
                  hello@sablemuse.shop
                </a>{" "}
                if you want help before you order.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        {usesSelect ? (
          <select
            value={selectedSize}
            onChange={handleSizeChange}
            aria-label="Select size"
            className={inputVariants({ size: "xl", className: "appearance-none" })}
          >
            <option value="">Select size</option>
            {product.sizes.map((size) => {
              const available = isSizeAvailable(size)
              return (
                <option key={size} value={size} disabled={!available}>
                  {available ? size : `${size} — Sold out`}
                </option>
              )
            })}
          </select>
        ) : (
          <ul className="flex flex-wrap gap-2" aria-label="Available sizes">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size
              const available = isSizeAvailable(size)
              return (
                <li key={size}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSelectSize(size)}
                    aria-pressed={isSelected}
                    disabled={!available}
                    className="h-10 min-w-12 px-3 font-medium normal-case tracking-normal"
                  >
                    {available ? size : `${size} — Sold out`}
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      {added ? (
        <p className="mt-3 text-sm font-medium text-brand-navy">Added to bag successfully.</p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="xl"
          onClick={() => void handleAddToBag()}
          disabled={isPending || selectionSoldOut}
          className="flex-1"
        >
          {isPending
            ? "Adding..."
            : selectionSoldOut
              ? "Sold Out"
              : `Add To Bag — $${formatMoney(displayPrice)}`}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xl"
          onClick={() => void handleBuyNow()}
          disabled={isPending || selectionSoldOut}
          className="flex-1"
        >
          Buy Now
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleToggleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          size="xl"
          className="px-4"
        >
          <Heart
            className={cn("size-5", wishlisted && "fill-ink text-ink")}
            aria-hidden="true"
          />
        </Button>
      </div>

      {product.showEasyReturn !== false ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-brand-navy-muted">
          <RefreshCcw className="size-4" aria-hidden="true" />
          Free shipping in the United States. Most orders ship in 1–2 business
          days. Returns within 30 days of delivery.
        </p>
      ) : null}

      {product.description ? (
        <div className="mt-6 border-t border-brand-border pt-6">
          <p className="text-sm leading-copy text-brand-navy">
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
