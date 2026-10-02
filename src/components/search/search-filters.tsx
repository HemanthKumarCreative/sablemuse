"use client"

import { useEffect, useState } from "react"
import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ColorSwatch } from "@/components/product/color-swatch"
import { Checkbox } from "@/components/ui/checkbox"
import type { SearchFilterGroup } from "@/data/search"
import {
  SEARCH_FILTERS,
  SEARCH_FILTERS_DEFAULT_OPEN,
} from "@/data/search"
import { cn } from "cn"

type SearchFiltersProps = {
  className?: string
  filters?: SearchFilterGroup[]
  defaultOpen?: string[]
  headingId?: string
}

export const SearchFilters = ({
  className,
  filters = SEARCH_FILTERS,
  defaultOpen = SEARCH_FILTERS_DEFAULT_OPEN,
  headingId = "filters-heading",
}: SearchFiltersProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <aside className={cn("w-full", className)} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-4 heading-section capitalize"
      >
        Filters
      </h2>

      {!isMounted ? (
        <div className="flex flex-col gap-4" aria-hidden="true">
          {filters.map((group) => (
            <div
              key={group.id}
              className="flex h-12 items-center bg-ink px-4 text-base font-semibold capitalize text-background"
            >
              {group.label}
            </div>
          ))}
        </div>
      ) : (
        <Accordion multiple defaultValue={defaultOpen} className="gap-4">
          {filters.map((group) => (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="border border-transparent not-last:border-b-0 data-open:border-brand-border"
            >
              <AccordionTrigger
                className={cn(
                  "h-12 rounded-none border-0 bg-ink px-4 py-0 text-base font-semibold capitalize text-background hover:no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-expanded:bg-background aria-expanded:text-brand-navy **:data-[slot=accordion-trigger-icon]:hidden"
                )}
                aria-label={`${group.label} filter`}
              >
                <span className="flex-1 text-left">{group.label}</span>
                <Plus
                  className="size-3.5 shrink-0 text-current group-aria-expanded/accordion-trigger:hidden"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Minus
                  className="hidden size-3.5 shrink-0 text-current group-aria-expanded/accordion-trigger:inline"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </AccordionTrigger>
              <AccordionContent className="bg-background px-4 pt-2 pb-4">
                <ul className="space-y-4" role="list">
                  {group.options.map((option) => {
                    const optionId = `${headingId}-${group.id}-${option.id}`

                    return (
                      <li key={option.id} className="flex items-center gap-3">
                        <Checkbox
                          id={optionId}
                          defaultChecked={option.defaultChecked}
                          className="size-4 rounded-none border-ink data-checked:border-ink data-checked:bg-ink data-checked:text-background"
                        />
                        {option.swatch ? (
                          <ColorSwatch
                            hex={option.swatch}
                            name={option.label}
                            decorative
                            className="size-5 shrink-0"
                          />
                        ) : null}
                        <label
                          htmlFor={optionId}
                          className="cursor-pointer text-sm capitalize leading-copy text-brand-navy"
                        >
                          {option.label}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </aside>
  )
}
