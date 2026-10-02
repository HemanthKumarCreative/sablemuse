"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Minus, Plus, SlidersHorizontal, X } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  CATALOG_SORT_OPTIONS,
  catalogHref,
  type CatalogSort,
} from "@/lib/catalog-params"
import type { CatalogFilterGroup } from "@/lib/shopify/catalog"
import { cn } from "cn"

type CatalogFiltersProps = {
  groups: CatalogFilterGroup[]
  sort: CatalogSort
  selected: string[]
  headingId: string
  layout?: "sidebar" | "sheet"
  className?: string
}

const sameFilter = (left: string, right: string) => {
  try {
    return JSON.stringify(JSON.parse(left)) === JSON.stringify(JSON.parse(right))
  } catch {
    return left === right
  }
}

const isPriceFilter = (value: string) => {
  try {
    return "price" in (JSON.parse(value) as Record<string, unknown>)
  } catch {
    return false
  }
}

export const CatalogFilters = ({
  groups,
  sort,
  selected,
  headingId,
  layout = "sidebar",
  className,
}: CatalogFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSort = (nextSort: CatalogSort) => {
    router.push(
      catalogHref(pathname, new URLSearchParams(searchParams.toString()), {
        sort: nextSort,
      })
    )
  }

  const handleToggle = (input: string) => {
    const next = selected.some((item) => sameFilter(item, input))
      ? selected.filter((item) => !sameFilter(item, input))
      : [...selected, input]

    router.push(
      catalogHref(pathname, new URLSearchParams(searchParams.toString()), {
        filters: next,
      })
    )
  }

  const handleApplyPrice = (input: string | null) => {
    const withoutPrice = selected.filter((item) => !isPriceFilter(item))
    const next = input ? [...withoutPrice, input] : withoutPrice
    router.push(
      catalogHref(pathname, new URLSearchParams(searchParams.toString()), {
        filters: next,
      })
    )
  }

  const handleClear = () => {
    router.push(
      catalogHref(pathname, new URLSearchParams(searchParams.toString()), {
        filters: [],
      })
    )
  }

  const body = (
    <FilterBody
      groups={groups}
      sort={sort}
      selected={selected}
      headingId={headingId}
      hideHeading={layout === "sheet"}
      onSort={handleSort}
      onToggle={handleToggle}
      onApplyPrice={handleApplyPrice}
    />
  )

  if (layout === "sheet") {
    return (
      <div className={cn("lg:hidden", className)}>
        <Sheet>
          <div className="flex justify-center">
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-auto gap-2 rounded-none px-3 py-2 text-base font-medium text-brand-navy underline-offset-2 hover:bg-transparent hover:underline"
                />
              }
            >
              <SlidersHorizontal
                className="size-5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>Filter</span>
            </SheetTrigger>
          </div>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="inset-x-0 gap-0 overflow-hidden rounded-none border-t border-brand-border p-0 opacity-100 data-starting-style:opacity-100 data-[side=bottom]:inset-x-0 data-[side=bottom]:h-[min(94dvh,920px)] data-[side=bottom]:max-h-[94dvh]"
          >
            <div className="flex h-full min-h-0 flex-col bg-background">
              <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-2">
                <SheetTitle className="heading-section capitalize">
                  Filters
                </SheetTitle>
                <SheetClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close filters"
                      className="rounded-none text-brand-navy"
                    />
                  }
                >
                  <X className="size-6" strokeWidth={1.5} />
                </SheetClose>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-6">
                {body}
              </div>
              <div className="grid shrink-0 grid-cols-2 items-center gap-4 px-5 py-5">
                <button
                  type="button"
                  onClick={handleClear}
                  className="justify-self-start text-base font-normal capitalize text-brand-navy underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Clear Filter
                </button>
                <SheetClose
                  render={
                    <Button size="xl" className="w-full justify-self-end px-6" />
                  }
                >
                  Apply Filter
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return <div className={className}>{body}</div>
}

const FilterBody = ({
  groups,
  sort,
  selected,
  headingId,
  hideHeading,
  onSort,
  onToggle,
  onApplyPrice,
}: {
  groups: CatalogFilterGroup[]
  sort: CatalogSort
  selected: string[]
  headingId: string
  hideHeading: boolean
  onSort: (sort: CatalogSort) => void
  onToggle: (input: string) => void
  onApplyPrice: (input: string | null) => void
}) => {
  const listGroups = groups.filter((group) => group.type !== "PRICE_RANGE")
  const priceGroup = groups.find((group) => group.type === "PRICE_RANGE")

  return (
    <aside className="w-full" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className={cn("mb-4 heading-section capitalize", hideHeading && "sr-only")}
      >
        Filters
      </h2>
      <Accordion
        multiple
        defaultValue={["sort", ...listGroups.map((group) => group.id)]}
        className="gap-4"
      >
        <AccordionItem
          value="sort"
          className="border border-transparent not-last:border-b-0 data-open:border-brand-border"
        >
          <AccordionTrigger
            className="h-12 rounded-none border-0 bg-ink px-4 py-0 text-base font-semibold capitalize text-background hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden aria-expanded:bg-background aria-expanded:text-brand-navy"
            aria-label="Sort by"
          >
            <span className="flex-1 text-left">Sort By</span>
            <Plus className="size-3.5 shrink-0 group-aria-expanded/accordion-trigger:hidden" />
            <Minus className="hidden size-3.5 shrink-0 group-aria-expanded/accordion-trigger:inline" />
          </AccordionTrigger>
          <AccordionContent className="bg-background px-4 pt-2 pb-4">
            <ul className="space-y-3">
              {CATALOG_SORT_OPTIONS.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={sort === option.id}
                    onClick={() => onSort(option.id)}
                    className={cn(
                      "text-sm text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      sort === option.id && "font-semibold"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {listGroups.map((group) => (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="border border-transparent not-last:border-b-0 data-open:border-brand-border"
          >
            <AccordionTrigger
              className="h-12 rounded-none border-0 bg-ink px-4 py-0 text-base font-semibold capitalize text-background hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden aria-expanded:bg-background aria-expanded:text-brand-navy"
              aria-label={`${group.label} filter`}
            >
              <span className="flex-1 text-left">{group.label}</span>
              <Plus className="size-3.5 shrink-0 group-aria-expanded/accordion-trigger:hidden" />
              <Minus className="hidden size-3.5 shrink-0 group-aria-expanded/accordion-trigger:inline" />
            </AccordionTrigger>
            <AccordionContent className="bg-background px-4 pt-2 pb-4">
              <ul className="space-y-4">
                {group.values.map((value) => {
                  const optionId = `${headingId}-${group.id}-${value.id}`
                  const checked = selected.some((item) =>
                    sameFilter(item, value.input)
                  )

                  return (
                    <li key={value.id} className="flex items-center gap-3">
                      <Checkbox
                        id={optionId}
                        checked={checked}
                        onCheckedChange={() => onToggle(value.input)}
                        className="size-4 rounded-none border-ink data-checked:border-ink data-checked:bg-ink data-checked:text-background"
                      />
                      <label
                        htmlFor={optionId}
                        className="cursor-pointer text-sm capitalize leading-copy text-brand-navy"
                      >
                        {value.label}
                        {value.count > 0 ? ` (${value.count})` : ""}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {priceGroup ? (
        <PriceRange
          group={priceGroup}
          selected={selected}
          onApply={onApplyPrice}
        />
      ) : null}
    </aside>
  )
}

const PriceRange = ({
  group,
  selected,
  onApply,
}: {
  group: CatalogFilterGroup
  selected: string[]
  onApply: (input: string | null) => void
}) => {
  const bounds = (() => {
    try {
      const parsed = JSON.parse(group.values[0]?.input ?? "{}") as {
        price?: { min?: number; max?: number }
      }
      return parsed.price ?? {}
    } catch {
      return {}
    }
  })()
  const active = selected.find((item) => isPriceFilter(item))
  const activePrice = (() => {
    if (!active) {
      return {}
    }
    try {
      return (
        JSON.parse(active) as { price?: { min?: number; max?: number } }
      ).price ?? {}
    } catch {
      return {}
    }
  })()
  const [min, setMin] = useState(
    activePrice.min != null ? String(activePrice.min) : ""
  )
  const [max, setMax] = useState(
    activePrice.max != null ? String(activePrice.max) : ""
  )

  const handleApply = () => {
    const price: { min?: number; max?: number } = {}
    if (min.trim()) {
      price.min = Number(min)
    }
    if (max.trim()) {
      price.max = Number(max)
    }
    if (
      (price.min != null && Number.isNaN(price.min)) ||
      (price.max != null && Number.isNaN(price.max))
    ) {
      return
    }
    if (price.min == null && price.max == null) {
      onApply(null)
      return
    }
    onApply(JSON.stringify({ price }))
  }

  return (
    <div className="mt-4 border border-brand-border px-4 py-4">
      <p className="text-sm font-semibold text-brand-navy">{group.label}</p>
      <div className="mt-3 flex items-center gap-2">
        <label className="sr-only" htmlFor={`${group.id}-min`}>
          Minimum price
        </label>
        <input
          id={`${group.id}-min`}
          inputMode="decimal"
          value={min}
          placeholder={bounds.min != null ? String(bounds.min) : "Min"}
          onChange={(event) => setMin(event.target.value)}
          className="h-10 w-full border border-brand-border px-3 text-sm text-brand-navy"
        />
        <label className="sr-only" htmlFor={`${group.id}-max`}>
          Maximum price
        </label>
        <input
          id={`${group.id}-max`}
          inputMode="decimal"
          value={max}
          placeholder={bounds.max != null ? String(bounds.max) : "Max"}
          onChange={(event) => setMax(event.target.value)}
          className="h-10 w-full border border-brand-border px-3 text-sm text-brand-navy"
        />
      </div>
      <Button type="button" className="mt-3" onClick={handleApply}>
        Apply Price
      </Button>
    </div>
  )
}
