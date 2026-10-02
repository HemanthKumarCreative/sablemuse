"use client"

import Image from "next/image"
import Link from "next/link"
import type { MouseEvent } from "react"
import { Heart } from "lucide-react"
import { ColorSwatch } from "@/components/product/color-swatch"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { formatMoney } from "@/lib/format-money"
import type { Product } from "@/types/commerce"
import { cn } from "cn"

type ProductCardProps = {
  product: Product
  className?: string
  imageAspectClassName?: string
  favorited?: boolean
  href?: string
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
  const visibleColors = product.colors.slice(0, 4)
  const hiddenColorCount = product.colors.length - visibleColors.length

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={href ?? `/product/${product.id}`}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${product.name} ${product.subtitle}`}
      >
        <div className={cn("relative w-full bg-muted", imageAspectClassName)}>
          <Image
            src={product.image}
            alt={`${product.name} ${product.subtitle}`}
            fill
            sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
            className={cn(
              "object-cover",
              product.secondaryImage
                ? "transition-opacity duration-500 group-hover:opacity-0"
                : "transition-transform duration-500 group-hover:scale-[1.03]"
            )}
          />
          {product.secondaryImage ? (
            <Image
              src={product.secondaryImage}
              alt=""
              fill
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </div>
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 sm:top-4 sm:left-4">
          {product.isRestock ? (
            <Badge className="px-3 py-1 text-xs capitalize sm:px-6 sm:py-2 sm:text-sm">
              Restock
            </Badge>
          ) : null}
          {product.isNew ? (
            <Badge className="px-3 py-1 text-xs capitalize sm:px-6 sm:py-2 sm:text-sm">
              New
            </Badge>
          ) : null}
          {product.isBestSeller ? (
            <Badge className="px-3 py-1 text-xs capitalize sm:px-6 sm:py-2 sm:text-sm">
              Best Seller
            </Badge>
          ) : null}
          {product.shipsFromUs ? (
            <Badge className="px-3 py-1 text-xs capitalize sm:px-6 sm:py-2 sm:text-sm">
              Ships from US
            </Badge>
          ) : null}
        </div>
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
          "absolute top-2.5 right-2.5 z-10 inline-flex size-7 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:top-4 sm:right-4 sm:size-9",
          saved ? "text-ink" : "text-brand-navy sm:bg-background/90"
        )}
        onClick={handleToggleWishlist}
      >
        <Heart
          className="size-4 sm:size-5"
          strokeWidth={1.5}
          fill={saved ? "currentColor" : "none"}
        />
      </button>

      <div className="mt-2 flex items-start justify-between gap-2 p-1 sm:gap-3 sm:p-1.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="line-clamp-2 text-base font-medium text-brand-navy">
            {product.name}
          </h3>
          <p className="truncate text-xs text-brand-navy-muted sm:text-sm">
            {product.subtitle}
          </p>
          <ul className="mt-1.5 flex flex-wrap items-center gap-1 sm:mt-2 sm:gap-1.5" aria-label="Available colors">
            {visibleColors.map((color) => (
              <li key={color.name}>
                <ColorSwatch hex={color.hex} name={color.name} />
              </li>
            ))}
            {hiddenColorCount > 0 ? (
              <li className="text-xs text-brand-navy-muted">+{hiddenColorCount}</li>
            ) : null}
          </ul>
        </div>
        <div className="shrink-0 pr-1 text-right sm:pr-2">
          <p className="text-base font-medium text-brand-navy">
            {product.priceMax && product.priceMax > product.price
              ? `From $${formatMoney(product.price)}`
              : `$${formatMoney(product.price)}`}
          </p>
          {product.compareAtPrice ? (
            <p className="text-sm text-brand-navy-muted line-through">
              ${formatMoney(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
