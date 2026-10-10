"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type FocusEvent, type MouseEvent } from "react"
import { Heart, X } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { formatMoney, formatPriceLabel } from "@/lib/format-money"
import {
  formatColorName,
  isColorOption,
  isMeaningfulColorName,
  isSizeOption,
} from "@/lib/shopify/mappers/color"
import type { Product, ProductVariant } from "@/types/commerce"
import { cn } from "cn"

type ProductCardProps = {
  product: Product
  className?: string
  imageAspectClassName?: string
  favorited?: boolean
  href?: string
}

type SizeChoice = {
  size: string
  variant: ProductVariant
}

const optionValue = (
  variant: ProductVariant,
  match: (name: string) => boolean
) => variant.selectedOptions.find((option) => match(option.name))?.value

const variantsForColor = (product: Product, colorName?: string) =>
  (product.variants ?? []).filter((variant) => {
    if (!colorName) {
      return true
    }

    const color = optionValue(variant, isColorOption)
    return !color || color === colorName
  })

const listSizeValues = (product: Product) =>
  (product.variants ?? []).reduce<string[]>((values, variant) => {
    const size = optionValue(variant, isSizeOption)
    if (size && !values.includes(size)) {
      values.push(size)
    }
    return values
  }, [])

const firstAvailableColor = (product: Product) => {
  for (const color of product.colors) {
    const hasSize = listSizeValues(product).some((size) =>
      variantsForColor(product, color.name).some(
        (variant) =>
          optionValue(variant, isSizeOption) === size && variant.availableForSale
      )
    )
    if (hasSize || product.colors.length === 1) {
      return color.name
    }
  }

  return product.colors[0]?.name ?? ""
}

const displayProductName = (name: string, isPlusSize: boolean) => {
  if (!isPlusSize) {
    return name
  }

  return name.replace(/\s*plus\s*$/i, "").trim() || name
}

const getBadge = (
  product: Product,
  available: boolean,
  salePercent: number
) => {
  if (!available) {
    return "Sold out"
  }

  if (salePercent > 0) {
    return salePercent >= 5 ? `−${salePercent}%` : "Sale"
  }

  if (product.isNew) {
    return "New"
  }

  if (product.isRestock) {
    return "Restock"
  }

  if (product.isBestSeller) {
    return "Best Seller"
  }

  return null
}

type QuickAddPickerProps = {
  sizeChoices: SizeChoice[]
  selectedSize: string
  actionsDisabled: boolean
  pending: boolean
  addError: string
  onSelectSize: (size: string) => void
  onAddToBag: () => void
  sizeButtonClassName?: string
  addButtonClassName?: string
}

const QuickAddPicker = ({
  sizeChoices,
  selectedSize,
  actionsDisabled,
  pending,
  addError,
  onSelectSize,
  onAddToBag,
  sizeButtonClassName,
  addButtonClassName,
}: QuickAddPickerProps) => {
  if (sizeChoices.length === 0) {
    return (
      <p className="text-xs text-brand-navy-muted">Sold out in this color</p>
    )
  }

  return (
    <>
      <ul className="flex flex-wrap gap-1.5" aria-label="Available sizes">
        {sizeChoices.map((choice) => (
          <li key={choice.size}>
            <Button
              type="button"
              variant="outline"
              aria-pressed={selectedSize === choice.size}
              onClick={() => onSelectSize(choice.size)}
              className={cn(
                "h-auto min-h-10 min-w-10 bg-background px-2.5 font-medium normal-case tracking-normal whitespace-normal",
                sizeButtonClassName
              )}
            >
              {choice.size}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="default"
        className={cn(
          "h-11 w-full px-4 text-sm font-semibold tracking-normal normal-case",
          addButtonClassName
        )}
        disabled={actionsDisabled || !sizeChoices.some((choice) => choice.size === selectedSize)}
        aria-busy={pending}
        onClick={onAddToBag}
      >
        {pending ? "Adding..." : "Add to bag"}
      </Button>
      {addError ? (
        <p className="text-xs text-destructive" role="alert">
          {addError}
        </p>
      ) : null}
    </>
  )
}

export const ProductCard = ({
  product,
  className,
  imageAspectClassName = "aspect-[3/4]",
  favorited = false,
  href,
}: ProductCardProps) => {
  const { isHydrated, isWishlisted, toggleWishlist } = useWishlist()
  const { addItem, openBag, isPending } = useCart()
  const saved = isHydrated && (favorited || isWishlisted(product.id))
  const [selectedColorName, setSelectedColorName] = useState(() =>
    firstAvailableColor(product)
  )
  const [previewColorName, setPreviewColorName] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [cardActive, setCardActive] = useState(false)
  const [desktopPickerOpen, setDesktopPickerOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [addError, setAddError] = useState("")
  const [pending, setPending] = useState(false)
  const colorQuery = selectedColorName
    ? `?color=${encodeURIComponent(selectedColorName)}`
    : ""
  const productHref = href ?? `/product/${product.id}${colorQuery}`
  const available = product.availableForSale !== false
  const activeColorName = previewColorName ?? selectedColorName
  const activeColor =
    product.colors.find((color) => color.name === activeColorName) ??
    product.colors[0]
  const colorVariants = variantsForColor(product, activeColor?.name)
  const prices = colorVariants
    .map((variant) => variant.price)
    .filter((price) => Number.isFinite(price))
  const minPrice = prices.length > 0 ? Math.min(...prices) : product.price
  const maxPrice = prices.length > 0 ? Math.max(...prices) : product.price
  const atMinPrice = colorVariants.filter((variant) => variant.price === minPrice)
  const compareCandidates = atMinPrice
    .map((variant) => variant.compareAtPrice)
    .filter((price): price is number => typeof price === "number" && price > minPrice)
  const compareAtPrice =
    atMinPrice.length > 0 && compareCandidates.length === atMinPrice.length
      ? Math.min(...compareCandidates)
      : undefined
  const salePercent = compareAtPrice
    ? Math.round((1 - minPrice / compareAtPrice) * 100)
    : 0
  const badge = getBadge(product, available, salePercent)
  const displayImage = activeColor?.image || product.image
  const showSecondary =
    Boolean(product.secondaryImage) &&
    displayImage === product.image &&
    product.secondaryImage !== product.image
  const visibleColors = product.colors.slice(0, 4)
  const hiddenColorCount = product.colors.length - visibleColors.length
  const colorNames = new Set(
    product.colors.map((color) => color.name.trim().toLowerCase())
  )
  const subtitle = product.subtitle.trim()
  const sizeValues = listSizeValues(product)
  const hasSizes = sizeValues.length > 0
  const selectedVariants = variantsForColor(product, selectedColorName || undefined)
  const sizeChoices = sizeValues.flatMap((size) => {
    const purchasable = selectedVariants.find(
      (variant) =>
        optionValue(variant, isSizeOption) === size && variant.availableForSale
    )
    if (!purchasable) {
      return []
    }

    return [{ size, variant: purchasable }]
  })
  const selectedChoice = sizeChoices.find((choice) => choice.size === selectedSize)
  const showSubtitle =
    subtitle.length > 0 &&
    subtitle.toLowerCase() !== "sable muse" &&
    !colorNames.has(subtitle.toLowerCase())
  const title = displayProductName(product.name, product.isPlusSize)
  const showColorLabel =
    Boolean(activeColor) && isMeaningfulColorName(activeColor!.name)
  const actionsDisabled = pending || isPending
  const showDesktopChrome = cardActive || desktopPickerOpen
  const priceLabel = formatPriceLabel(
    minPrice,
    maxPrice > minPrice ? maxPrice : undefined
  )

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggleWishlist(product.id)
  }

  const handlePreviewColor = (name: string) => {
    setPreviewColorName(name)
  }

  const handleClearPreview = () => {
    setPreviewColorName(null)
  }

  const handleSelectColor = (name: string) => {
    setSelectedColorName(name)
    setPreviewColorName(null)
    setAddError("")
    setSelectedSize((current) => {
      if (!current) {
        return ""
      }

      const stillAvailable = variantsForColor(product, name).some(
        (variant) =>
          optionValue(variant, isSizeOption) === current &&
          variant.availableForSale
      )
      return stillAvailable ? current : ""
    })
  }

  const handleSelectSize = (size: string) => {
    setSelectedSize(size)
    setAddError("")
  }

  const handleResetDesktopQuickAdd = () => {
    setCardActive(false)
    setDesktopPickerOpen(false)
  }

  const handleCardBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget
    if (next instanceof Node && event.currentTarget.contains(next)) {
      return
    }

    handleResetDesktopQuickAdd()
  }

  const handleOpenSheet = () => {
    setAddError("")
    setSheetOpen(true)
  }

  const handleAddToBag = async () => {
    if (!selectedChoice?.variant) {
      setAddError("Select a size")
      return
    }

    setAddError("")
    setPending(true)
    try {
      await addItem({ merchandiseId: selectedChoice.variant.id, quantity: 1 })
      setSheetOpen(false)
      setDesktopPickerOpen(false)
      openBag()
    } catch {
      setAddError("We could not add this to your bag. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <article
      className={cn("group relative flex h-full flex-col", className)}
      onMouseEnter={() => setCardActive(true)}
      onMouseLeave={handleResetDesktopQuickAdd}
      onFocusCapture={() => setCardActive(true)}
      onBlurCapture={handleCardBlur}
    >
      <div className="relative">
        <Link
          href={productHref}
          className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${title}`}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              imageAspectClassName
            )}
          >
            <Image
              src={displayImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
              className={cn(
                "object-contain object-center motion-reduce:transition-none",
                !available && "grayscale",
                showSecondary
                  ? "opacity-100 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-0"
                  : null
              )}
            />
            {showSecondary && product.secondaryImage ? (
              <Image
                src={product.secondaryImage}
                alt=""
                fill
                sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
                className="object-contain object-center opacity-0 transition-opacity duration-500 motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
              />
            ) : null}
          </div>
          {badge ? (
            <div className="absolute top-2.5 left-2.5 z-10 sm:top-3.5 sm:left-3.5">
              <Badge
                variant={available && salePercent > 0 ? "sale" : "neutral"}
                className="px-2.5 py-1 text-xs capitalize sm:px-3"
              >
                {badge}
              </Badge>
            </div>
          ) : null}
        </Link>

        <button
          type="button"
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${title} from wish list`
              : `Add ${title} to wish list`
          }
          className={cn(
            "absolute top-2.5 right-2.5 z-20 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/90 text-brand-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:top-3.5 sm:right-3.5 sm:size-9",
            saved && "text-ink"
          )}
          onClick={handleToggleWishlist}
        >
          <Heart
            className="size-4 sm:size-5"
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        {hasSizes && showDesktopChrome ? (
          <div className="absolute inset-x-0 bottom-0 z-20 hidden bg-background/95 p-2 shadow-[0_-8px_24px_rgba(28,26,23,0.12)] backdrop-blur-sm [@media(hover:hover)]:block">
            {desktopPickerOpen ? (
              <div className="flex max-h-[40%] flex-col gap-2 overflow-y-auto">
                <QuickAddPicker
                  sizeChoices={sizeChoices}
                  selectedSize={selectedSize}
                  actionsDisabled={actionsDisabled}
                  pending={pending}
                  addError={addError}
                  onSelectSize={handleSelectSize}
                  onAddToBag={() => void handleAddToBag()}
                  sizeButtonClassName="min-h-9 min-w-9"
                  addButtonClassName="h-10"
                />
              </div>
            ) : (
              <Button
                type="button"
                variant="default"
                className="h-10 w-full px-4 text-sm font-semibold tracking-normal normal-case"
                onClick={() => {
                  setAddError("")
                  setDesktopPickerOpen(true)
                }}
              >
                Quick add
              </Button>
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-1 p-1 sm:mt-2.5 sm:p-1.5">
        <Link
          href={productHref}
          className="flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h3 className="truncate text-sm font-medium leading-snug text-brand-navy sm:text-base">
            {title}
          </h3>
          {showSubtitle ? (
            <p className="truncate text-xs text-brand-navy-muted sm:text-sm">
              {subtitle}
            </p>
          ) : null}
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm font-medium text-brand-navy tabular-nums sm:text-base">
            <span>{priceLabel}</span>
            {compareAtPrice ? (
              <span className="text-xs font-normal text-brand-navy-muted line-through sm:text-sm">
                ${formatMoney(compareAtPrice)}
              </span>
            ) : null}
          </p>
        </Link>

        {visibleColors.length > 0 ? (
          <div className="mt-1">
            <p
              className={cn(
                "mb-1.5 h-4 truncate text-xs text-brand-navy-muted",
                !showColorLabel && "invisible"
              )}
              aria-hidden={!showColorLabel}
            >
              {showColorLabel && activeColor
                ? formatColorName(activeColor.name)
                : "\u00a0"}
            </p>
            <ul
              className="flex flex-wrap items-center gap-1"
              aria-label="Available colors"
              onMouseLeave={handleClearPreview}
            >
              {visibleColors.map((color) => {
                const selected = color.name === selectedColorName
                const previewing = color.name === previewColorName
                const colorLabel = formatColorName(color.name)

                return (
                  <li key={color.name}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={
                        selected ? `${colorLabel}, selected` : colorLabel
                      }
                      className="group/swatch inline-flex size-6 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onMouseEnter={() => handlePreviewColor(color.name)}
                      onFocus={() => handlePreviewColor(color.name)}
                      onBlur={handleClearPreview}
                      onClick={() => handleSelectColor(color.name)}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-3.5 rounded-full border border-black/15 transition-shadow duration-150",
                          selected
                            ? "shadow-[0_0_0_2px_var(--background),0_0_0_3.5px_var(--ink)]"
                            : previewing
                              ? "shadow-[0_0_0_2px_var(--background),0_0_0_3.5px_var(--brand-border)]"
                              : "shadow-[0_0_0_2px_transparent,0_0_0_3.5px_transparent] group-hover/swatch:shadow-[0_0_0_2px_var(--background),0_0_0_3.5px_var(--brand-border)]"
                        )}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  </li>
                )
              })}
              {hiddenColorCount > 0 ? (
                <li className="pl-0.5 text-xs text-brand-navy-muted">
                  +{hiddenColorCount}
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {hasSizes ? (
          <div className="mt-2 [@media(hover:hover)]:hidden">
            <Button
              type="button"
              variant="link"
              className="h-auto px-0 py-0 text-xs font-semibold tracking-eyebrow text-brand-navy uppercase"
              onClick={handleOpenSheet}
            >
              Quick add
            </Button>
          </div>
        ) : null}
      </div>

      {hasSizes ? (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="gap-0 border-t border-brand-border p-0 [@media(hover:hover)]:hidden"
          >
            <div className="flex flex-col bg-background px-5 pt-5 pb-6">
              <SheetHeader className="gap-3 p-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden bg-muted">
                      <Image
                        src={displayImage}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain object-center"
                      />
                    </div>
                    <div className="min-w-0">
                      <SheetTitle className="truncate text-base font-medium text-brand-navy">
                        {title}
                      </SheetTitle>
                      <SheetDescription className="mt-1 text-sm font-medium text-brand-navy tabular-nums">
                        {priceLabel}
                        {compareAtPrice ? (
                          <span className="ml-2 font-normal text-brand-navy-muted line-through">
                            ${formatMoney(compareAtPrice)}
                          </span>
                        ) : null}
                      </SheetDescription>
                    </div>
                  </div>
                  <SheetClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close quick add"
                        className="shrink-0 rounded-none text-brand-navy"
                      />
                    }
                  >
                    <X className="size-5" strokeWidth={1.5} />
                  </SheetClose>
                </div>
              </SheetHeader>

              {visibleColors.length > 1 ? (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold tracking-eyebrow text-brand-navy uppercase">
                    Color
                    {selectedColorName && isMeaningfulColorName(selectedColorName)
                      ? ` · ${formatColorName(selectedColorName)}`
                      : ""}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label="Available colors">
                    {product.colors.map((color) => {
                      const selected = color.name === selectedColorName
                      const colorLabel = formatColorName(color.name)

                      return (
                        <li key={color.name}>
                          <button
                            type="button"
                            aria-pressed={selected}
                            aria-label={
                              selected ? `${colorLabel}, selected` : colorLabel
                            }
                            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => handleSelectColor(color.name)}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "size-5 rounded-full border border-black/15",
                                selected &&
                                  "shadow-[0_0_0_2px_var(--background),0_0_0_3.5px_var(--ink)]"
                              )}
                              style={{ backgroundColor: color.hex }}
                            />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-3">
                <p className="text-xs font-semibold tracking-eyebrow text-brand-navy uppercase">
                  Size
                </p>
                <QuickAddPicker
                  sizeChoices={sizeChoices}
                  selectedSize={selectedSize}
                  actionsDisabled={actionsDisabled}
                  pending={pending}
                  addError={addError}
                  onSelectSize={handleSelectSize}
                  onAddToBag={() => void handleAddToBag()}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </article>
  )
}
