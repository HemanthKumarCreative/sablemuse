"use client"

import { useEffect, useState } from "react"
import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
        className="mb-4 text-[2rem] font-semibold capitalize leading-[1.4] text-ink"
      >
        Filters
      </h2>

      {!isMounted ? (
        <div className="flex flex-col gap-4" aria-hidden="true">
          {filters.map((group) => (
            <div
              key={group.id}
              className="flex h-12 items-center bg-brand-light px-4 text-base font-bold capitalize text-white"
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
              className="border border-transparent not-last:border-b-0 data-open:border-border"
            >
              <AccordionTrigger
                className={cn(
                  "h-12 rounded-none border-0 bg-brand-light px-4 py-0 text-base font-bold capitalize text-white hover:no-underline focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 aria-expanded:bg-white aria-expanded:text-ink **:data-[slot=accordion-trigger-icon]:hidden"
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
              <AccordionContent className="bg-white px-4 pt-2 pb-4">
                <ul className="space-y-4" role="list">
                  {group.options.map((option) => {
                    const optionId = `${headingId}-${group.id}-${option.id}`

                    return (
                      <li key={option.id} className="flex items-center gap-3">
                        <Checkbox
                          id={optionId}
                          defaultChecked={option.defaultChecked}
                          className="size-4 rounded-none border-ink data-checked:border-brand data-checked:bg-brand data-checked:text-white"
                        />
                        {option.swatch ? (
                          <span
                            className={cn(
                              "inline-block size-5 shrink-0 rounded-full border",
                              option.swatch === "#FFFFFF"
                                ? "border-border"
                                : "border-transparent"
                            )}
                            style={{ backgroundColor: option.swatch }}
                            aria-hidden="true"
                          />
                        ) : null}
                        <label
                          htmlFor={optionId}
                          className="cursor-pointer text-sm capitalize leading-[1.8] text-ink"
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
