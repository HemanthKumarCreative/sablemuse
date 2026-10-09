"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type MouseEvent } from "react"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { formatMoney, formatPriceLabel } from "@/lib/format-money"
import { isColorOption } from "@/lib/shopify/mappers/color"
import type { Product, ProductVariant } from "@/types/commerce"
import { cn } from "cn"

type ProductCardProps = {
  product: Product
  className?: string
  imageAspectClassName?: string
  favorited?: boolean
  href?: string
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

export const ProductCard = ({
  product,
  className,
  imageAspectClassName = "aspect-[3/4] md:aspect-square",
  favorited = false,
  href,
}: ProductCardProps) => {
  const { isHydrated, isWishlisted, toggleWishlist } = useWishlist()
  const saved = isHydrated && (favorited || isWishlisted(product.id))
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0]?.name ?? ""
  )
  const [previewColorName, setPreviewColorName] = useState<string | null>(null)
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
  const compareCandidates = colorVariants
    .map((variant) => variant.compareAtPrice)
    .filter((price): price is number => typeof price === "number" && price > minPrice)
  const compareAtPrice =
    compareCandidates.length > 0
      ? Math.min(...compareCandidates)
      : product.compareAtPrice && product.compareAtPrice > minPrice
        ? product.compareAtPrice
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
  const showSubtitle =
    subtitle.length > 0 &&
    subtitle.toLowerCase() !== "sable muse" &&
    !colorNames.has(subtitle.toLowerCase())

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
  }

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
        <Link
          href={productHref}
          className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${product.name}`}
        >
          <div className={cn("relative w-full bg-muted", imageAspectClassName)}>
            <Image
              src={displayImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
              className={cn(
                "object-cover",
                !available && "grayscale",
                showSecondary
                  ? "transition-opacity duration-500 group-hover:opacity-0 motion-reduce:transition-none"
                  : "transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
              )}
            />
            {showSecondary && product.secondaryImage ? (
              <Image
                src={product.secondaryImage}
                alt=""
                fill
                sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              />
            ) : null}
          </div>
          {badge ? (
            <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5">
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
              ? `Remove ${product.name} from wish list`
              : `Add ${product.name} to wish list`
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
      </div>

      <div className="mt-2 flex flex-col gap-1 p-1 sm:mt-2.5 sm:p-1.5">
        <Link
          href={productHref}
          className="flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-brand-navy sm:text-base">
            {product.name}
          </h3>
          {product.isPlusSize ? (
            <p className="text-[11px] tracking-[0.14em] text-brand-navy-muted uppercase">
              Plus
            </p>
          ) : null}
          {showSubtitle ? (
            <p className="truncate text-xs text-brand-navy-muted sm:text-sm">
              {subtitle}
            </p>
          ) : null}
          <p className="text-sm font-medium text-brand-navy tabular-nums sm:text-base">
            {formatPriceLabel(
              minPrice,
              maxPrice > minPrice ? maxPrice : undefined
            )}
          </p>
          {compareAtPrice ? (
            <p className="text-xs text-brand-navy-muted tabular-nums line-through sm:text-sm">
              ${formatMoney(compareAtPrice)}
            </p>
          ) : null}
        </Link>

        {visibleColors.length > 0 ? (
          <div className="mt-1">
            {activeColor ? (
              <p className="mb-1.5 h-4 truncate text-xs text-brand-navy-muted">
                {activeColor.name}
              </p>
            ) : null}
            <ul
              className="flex flex-wrap items-center gap-1"
              aria-label="Available colors"
              onMouseLeave={handleClearPreview}
            >
              {visibleColors.map((color) => {
                const selected = color.name === selectedColorName
                const previewing = color.name === previewColorName

                return (
                  <li key={color.name}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={
                        selected ? `${color.name}, selected` : color.name
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
      </div>
    </article>
  )
}
