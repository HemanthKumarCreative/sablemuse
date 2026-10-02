"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { SearchActiveChips } from "@/components/search/search-active-chips"
import { SearchFilters } from "@/components/search/search-filters"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { SearchFilterGroup } from "@/data/search"
import { cn } from "cn"

type SearchFiltersMobileProps = {
  className?: string
  filters?: SearchFilterGroup[]
  defaultOpen?: string[]
  headingId?: string
  showActiveChips?: boolean
}

export const SearchFiltersMobile = ({
  className,
  filters,
  defaultOpen,
  headingId = "mobile-filters-heading",
  showActiveChips = true,
}: SearchFiltersMobileProps) => {
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
            <SlidersHorizontal className="size-5" strokeWidth={1.5} aria-hidden="true" />
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
              {showActiveChips ? (
                <SearchActiveChips
                  filters={filters}
                  className="mb-5 flex-row flex-wrap items-center justify-start gap-2 [&_button]:h-8 [&_button]:min-w-0 [&_button]:bg-muted [&_button]:px-3"
                />
              ) : null}

              <SearchFilters
                filters={filters}
                defaultOpen={defaultOpen}
                headingId={headingId}
                className="[&_h2]:sr-only [&_[data-slot=accordion]]:gap-2.5"
              />
            </div>

            <div className="grid shrink-0 grid-cols-2 items-center gap-4 px-5 py-5">
              <SheetClose
                render={
                  <button
                    type="button"
                    className="justify-self-start text-base font-normal capitalize text-brand-navy underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
              >
                Clear Filter
              </SheetClose>
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
