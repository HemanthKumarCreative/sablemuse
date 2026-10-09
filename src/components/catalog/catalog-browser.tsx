"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import { CatalogFilters } from "@/components/catalog/catalog-filters"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { catalogHref, type CatalogSort } from "@/lib/catalog-params"
import { loadMoreCatalog } from "@/lib/shopify/catalog-actions"
import type { CatalogPage, CatalogSource } from "@/lib/shopify/catalog"
import type { Product } from "@/types/commerce"

type CatalogBrowserProps = {
  page: CatalogPage
  sort: CatalogSort
  selectedFilters: string[]
  source: CatalogSource
  emptyLabel: string
  headingId: string
}

const chipLabel = (input: string, page: CatalogPage) => {
  const match = page.filters
    .flatMap((group) => group.values)
    .find((value) => {
      try {
        return (
          JSON.stringify(JSON.parse(value.input)) ===
          JSON.stringify(JSON.parse(input))
        )
      } catch {
        return value.input === input
      }
    })

  if (match) {
    return match.label
  }

  try {
    const parsed = JSON.parse(input) as {
      price?: { min?: number; max?: number }
    }
    if (parsed.price) {
      const min = parsed.price.min != null ? `$${parsed.price.min}` : ""
      const max = parsed.price.max != null ? `$${parsed.price.max}` : ""
      return `Price ${min}${min && max ? "–" : ""}${max}`
    }
  } catch {
    return "Filter"
  }

  return "Filter"
}

export const CatalogBrowser = ({
  page,
  sort,
  selectedFilters,
  source,
  emptyLabel,
  headingId,
}: CatalogBrowserProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [extraProducts, setExtraProducts] = useState<Product[]>([])
  const [cursor, setCursor] = useState(page.endCursor)
  const [hasNextPage, setHasNextPage] = useState(page.hasNextPage)
  const [isLoading, setIsLoading] = useState(false)
  const products = [...page.products, ...extraProducts]

  const handleLoadMore = async () => {
    if (!cursor || isLoading) {
      return
    }

    setIsLoading(true)
    try {
      const next = await loadMoreCatalog({
        source,
        cursor,
        sort,
        filters: selectedFilters,
      })
      setExtraProducts((current) => [...current, ...next.products])
      setCursor(next.endCursor)
      setHasNextPage(next.hasNextPage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFilter = (input: string) => {
    router.push(
      catalogHref(pathname, new URLSearchParams(searchParams.toString()), {
        filters: selectedFilters.filter((item) => item !== input),
      })
    )
  }

  return (
    <>
      <CatalogFilters
        className="mt-5 lg:mt-6"
        layout="sheet"
        groups={page.filters}
        sort={sort}
        selected={selectedFilters}
        headingId={`${headingId}-mobile`}
      />

      <div className="mt-5 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
        <CatalogFilters
          className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[320px] xl:w-[392px]"
          groups={page.filters}
          sort={sort}
          selected={selectedFilters}
          headingId={headingId}
        />

        <div className="min-w-0 flex-1">
          {selectedFilters.length > 0 ? (
            <ul className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">
              {selectedFilters.map((input) => (
                <li key={input}>
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(input)}
                    aria-label={`Remove ${chipLabel(input, page)} filter`}
                    className="inline-flex h-8 cursor-pointer items-center gap-2 bg-muted px-3 text-sm capitalize text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{chipLabel(input, page)}</span>
                    <X className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p
            className="sr-only mb-5 text-sm text-brand-navy-muted md:mb-6 md:text-base lg:not-sr-only"
            aria-live="polite"
          >
            {page.totalCount != null
              ? `Showing ${products.length} of ${page.totalCount}`
              : `Showing ${products.length}`}
          </p>

          {products.length === 0 ? (
            <p className="py-20 text-center text-brand-navy-muted">{emptyLabel}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
                />
              ))}
            </div>
          )}

          {hasNextPage ? (
            <div className="mt-10 flex justify-center">
              <Button
                type="button"
                size="xl"
                variant="outline"
                onClick={() => void handleLoadMore()}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
