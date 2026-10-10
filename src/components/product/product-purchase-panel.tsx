"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Heart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColorSwatch } from "@/components/product/color-swatch"
import { ProductAccordions } from "@/components/product/product-accordions"
import { useCart } from "@/components/cart/cart-provider"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { shippingCopy } from "@/data/shipping-policy"
import { formatMoney, formatPriceLabel, salePercent } from "@/lib/format-money"
import { buyNowAction } from "@/lib/shopify/cart/actions"
import { isColorOption, isSizeOption } from "@/lib/shopify/mappers/color"
import {
  exactVariant,
  firstMissingOption,
  isSelectionComplete,
  isValuePurchasable,
  matchingVariants,
  selectableOptions,
  selectionPrompt,
} from "@/lib/product-selection"
import type { ProductDetail, ProductVariant } from "@/types/commerce"
import { cn } from "cn"

type ProductPurchasePanelProps = {
  product: ProductDetail
  selected: Record<string, string>
  onSelectOption: (name: string, value: string) => void
  className?: string
}

const compareAtFor = (variant: ProductVariant) =>
  variant.compareAtPrice && variant.compareAtPrice > variant.price
    ? variant.compareAtPrice
    : undefined

export const ProductPurchasePanel = ({
  product,
  selected,
  onSelectOption,
  className,
}: ProductPurchasePanelProps) => {
  const { addItem, openBag, isPending } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const ctaRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState("")
  const [pending, setPending] = useState<"add" | "buy" | null>(null)
  const [stuck, setStuck] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const wishlisted = isWishlisted(product.id)
  const options = selectableOptions(product)
  const policy = shippingCopy(product.shipsFromUs)

  const scoped = useMemo(
    () => matchingVariants(product, selected),
    [product, selected]
  )
  const availableScoped = scoped.filter((variant) => variant.availableForSale)
  const complete = isSelectionComplete(product, selected)
  const exact = exactVariant(product, selected)
  const soldOut =
    (product.variants ?? []).length === 0
      ? true
      : complete
        ? !exact?.availableForSale
        : availableScoped.length === 0
  const priceSource = availableScoped.length > 0 ? availableScoped : scoped
  const prices = priceSource
    .map((variant) => variant.price)
    .filter((price) => Number.isFinite(price))
  const minPrice = prices.length > 0 ? Math.min(...prices) : product.price
  const maxPrice = prices.length > 0 ? Math.max(...prices) : product.price
  const displayPrice = complete && exact ? exact.price : minPrice
  const compareAt = (() => {
    if (complete && exact) {
      return compareAtFor(exact)
    }

    const atMin = priceSource.filter((variant) => variant.price === minPrice)
    const compares = atMin
      .map((variant) => compareAtFor(variant))
      .filter((price): price is number => typeof price === "number")
    if (compares.length > 0 && compares.length === atMin.length) {
      return Math.min(...compares)
    }

    return undefined
  })()
  const discount = salePercent(displayPrice, compareAt)
  const priceLabel =
    complete && exact
      ? `$${formatMoney(exact.price)}`
      : formatPriceLabel(minPrice, maxPrice > minPrice ? maxPrice : undefined)
  const stockLabel =
    soldOut || availableScoped.length === 0
      ? "Sold Out"
      : availableScoped.length < scoped.length
        ? "Some sizes available"
        : "In Stock"
  const sizeOption = options.find((option) => isSizeOption(option.name))
  const sizeValues = sizeOption?.values ?? []
  const sizeRun =
    product.isPlusSize && sizeValues.length > 0
      ? sizeValues.length === 1
        ? `Size ${sizeValues[0]}`
        : `Sizes ${sizeValues[0]}–${sizeValues[sizeValues.length - 1]}`
      : ""
  const selectedSize = sizeOption ? selected[sizeOption.name] ?? "" : ""
  const selectionSummary = options
    .map((option) => {
      const value = selected[option.name]
      if (value) {
        return value
      }
      if (isColorOption(option.name)) {
        return ""
      }
      return `Select ${option.name.toLowerCase()}`
    })
    .filter(Boolean)
    .join(" · ")

  useEffect(() => {
    const node = ctaRef.current
    if (!node) {
      return
    }

    const update = () => {
      setStuck(node.getBoundingClientRect().bottom < 0)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const handleSelectOption = (name: string, value: string) => {
    setError("")
    onSelectOption(name, value)
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product.id)
  }

  const validate = () => {
    const missing = firstMissingOption(product, selected)
    if (missing) {
      setError(selectionPrompt(missing))
      return false
    }

    if (!exact || soldOut) {
      setError("This combination is unavailable")
      return false
    }

    setError("")
    return true
  }

  const handleAddToBag = async () => {
    if (!validate() || !exact) {
      return
    }

    setPending("add")
    try {
      await addItem({ merchandiseId: exact.id, quantity: 1 })
      openBag()
    } catch {
      setError("We could not add this to your bag. Please try again.")
    } finally {
      setPending(null)
    }
  }

  const handleBuyNow = async () => {
    if (!validate() || !exact) {
      return
    }

    setPending("buy")
    try {
      const checkoutUrl = await buyNowAction(exact.id)
      window.location.assign(checkoutUrl)
    } catch {
      setError("Checkout is unavailable right now")
      setPending(null)
    }
  }

  const addLabel =
    pending === "add"
      ? "Adding..."
      : soldOut
        ? "Sold Out"
        : `Add To Bag — ${priceLabel}`
  const buyLabel = pending === "buy" ? "Starting checkout..." : "Buy Now"
  const actionsDisabled = soldOut || pending !== null || isPending

  return (
    <div
      className={cn(
        "flex w-full flex-col",
        stuck && "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0",
        className
      )}
    >
      <h1 id="product-heading" className="heading-page">
        {product.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        <p className="text-2xl font-semibold text-brand-navy">{priceLabel}</p>
        {compareAt ? (
          <p className="text-lg text-brand-navy-muted line-through">
            ${formatMoney(compareAt)}
          </p>
        ) : null}
        {discount > 0 ? (
          <p className="text-sm font-medium text-sale">−{discount}%</p>
        ) : null}
      </div>
      {complete && exact?.sku ? (
        <p className="mt-2 text-xs text-brand-navy-muted">SKU {exact.sku}</p>
      ) : null}

      {(product.variants ?? []).length > 0 ? (
        <Badge
          variant={soldOut ? "inverse" : "outline"}
          className="mt-4 w-fit px-3 py-1 text-xs tracking-eyebrow uppercase"
        >
          {stockLabel}
        </Badge>
      ) : null}

      {options.map((option) => {
        const isColor = isColorOption(option.name)
        const selectedValue = selected[option.name] ?? ""

        return (
          <div key={option.name} className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-brand-navy">
                {option.name}:{" "}
                <span className="font-normal text-brand-navy-muted">
                  {selectedValue || `Select ${option.name.toLowerCase()}`}
                </span>
              </p>
              {isSizeOption(option.name) ? (
                <Button
                  type="button"
                  variant="link"
                  className="h-auto gap-1 px-0 text-sm"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  Size Guide
                </Button>
              ) : null}
            </div>
            {isSizeOption(option.name) && sizeRun ? (
              <p className="mb-3 text-sm text-brand-navy-muted">{sizeRun}</p>
            ) : null}
            {isColor ? (
              <ul className="flex flex-wrap gap-3" aria-label={`Available ${option.name}`}>
                {option.values.map((value) => {
                  const swatch = product.colors.find((color) => color.name === value)
                  const isSelected = selectedValue === value
                  const available = isValuePurchasable(
                    product,
                    selected,
                    option.name,
                    value
                  )
                  return (
                    <li key={value}>
                      <button
                        type="button"
                        onClick={() => handleSelectOption(option.name, value)}
                        aria-label={available ? value : `${value}, sold out`}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative size-11 cursor-pointer overflow-hidden rounded-full bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isSelected && "ring-2 ring-ink ring-offset-2",
                          !available && "opacity-60"
                        )}
                      >
                        {swatch?.image ? (
                          <Image
                            src={swatch.image}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : swatch?.hex ? (
                          <ColorSwatch
                            hex={swatch.hex}
                            name={value}
                            decorative
                            className="size-full border-transparent sm:size-full"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center px-1 text-center text-[10px] leading-tight text-brand-navy">
                            {value}
                          </span>
                        )}
                        {available ? null : (
                          <span className="absolute inset-x-0 bottom-0 bg-background/95 py-0.5 text-center text-[8px] font-medium tracking-wide text-brand-navy uppercase">
                            Sold out
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ul className="flex flex-wrap gap-2" aria-label={`Available ${option.name}`}>
                {option.values.map((value) => {
                  const isSelected = selectedValue === value
                  const available = isValuePurchasable(
                    product,
                    selected,
                    option.name,
                    value
                  )
                  return (
                    <li key={value}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSelectOption(option.name, value)}
                        aria-pressed={isSelected}
                        disabled={!available}
                        className="h-auto min-h-11 min-w-11 px-3 font-medium normal-case tracking-normal whitespace-normal"
                      >
                        {available ? value : `${value} — Sold out`}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}

      {error ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="xl"
          onClick={() => void handleAddToBag()}
          disabled={actionsDisabled}
          aria-busy={pending === "add"}
          className="flex-1"
        >
          {addLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xl"
          onClick={() => void handleBuyNow()}
          disabled={actionsDisabled}
          aria-busy={pending === "buy"}
          className="flex-1"
        >
          {buyLabel}
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

      <p className="mt-4 text-sm text-brand-navy-muted">{policy.summary}</p>

      {product.prose.length > 0 ? (
        <div className="mt-6 space-y-3 border-t border-brand-border pt-6">
          {product.prose.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-copy text-brand-navy">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {product.specs.length > 0 ? (
        <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="border-b border-brand-border pb-2">
              <dt className="text-xs font-semibold tracking-wide text-brand-navy uppercase">
                {spec.label}
              </dt>
              <dd className="text-sm text-brand-navy-muted">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {product.sizeChart ? (
        <Button
          type="button"
          variant="link"
          className="mt-4 h-auto justify-start px-0 text-sm"
          onClick={() => setSizeGuideOpen(true)}
        >
          View size guide
        </Button>
      ) : null}

      <div className="mt-6">
        <ProductAccordions product={product} />
      </div>

      <Dialog open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}>
        <DialogContent className="w-[min(42rem,calc(100%-2rem))] sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Size Guide</DialogTitle>
          </DialogHeader>
          {product.sizeChart ? (
            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full border-collapse text-left text-sm text-brand-navy">
                <thead>
                  <tr>
                    {product.sizeChart.headers.map((header, index) => (
                      <th
                        key={`${header}-${index}`}
                        className="border-b border-brand-border px-2 py-2 font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.sizeChart.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className="border-b border-brand-border px-2 py-2"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm leading-copy text-brand-navy">
              Compare a piece you already own with the size options on this page.
              Email{" "}
              <a
                href="mailto:support@sablemuse.shop"
                className="underline underline-offset-2"
              >
                support@sablemuse.shop
              </a>{" "}
              if you want help before you order.
            </p>
          )}
          {product.sizeChart ? (
            <p className="text-sm leading-copy text-brand-navy">
              Email{" "}
              <a
                href="mailto:support@sablemuse.shop"
                className="underline underline-offset-2"
              >
                support@sablemuse.shop
              </a>{" "}
              if you want help before you order.
            </p>
          ) : null}
        </DialogContent>
      </Dialog>

      {stuck && !sizeGuideOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
          <p className="truncate text-sm text-brand-navy">
            {selectionSummary || "Select options"}
            <span className="text-brand-navy-muted"> · {priceLabel}</span>
          </p>
          {error ? (
            <p className="mt-1 text-sm text-destructive" aria-hidden="true">
              {error}
            </p>
          ) : null}
          <Button
            type="button"
            size="xl"
            onClick={() => void handleAddToBag()}
            disabled={actionsDisabled}
            aria-busy={pending === "add"}
            className="mt-2 w-full"
          >
            {addLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
