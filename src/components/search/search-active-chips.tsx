"use client"

import { X } from "lucide-react"
import { useState } from "react"
import type { SearchFilterGroup } from "@/data/search"
import { SEARCH_FILTERS } from "@/data/search"
import { cn } from "cn"

type ActiveChip = {
  groupId: string
  optionId: string
  label: string
}

type SearchActiveChipsProps = {
  filters?: SearchFilterGroup[]
  className?: string
  groupIds?: string[]
}

const getDefaultChips = (
  filters: SearchFilterGroup[],
  groupIds?: string[]
): ActiveChip[] => {
  return filters
    .filter((group) => !groupIds || groupIds.includes(group.id))
    .flatMap((group) =>
      group.options
        .filter((option) => option.defaultChecked)
        .map((option) => ({
          groupId: group.id,
          optionId: option.id,
          label: option.label,
        }))
    )
}

export const SearchActiveChips = ({
  filters = SEARCH_FILTERS,
  className,
  groupIds,
}: SearchActiveChipsProps) => {
  const [chips, setChips] = useState<ActiveChip[]>(() =>
    getDefaultChips(filters, groupIds)
  )

  if (chips.length === 0) {
    return null
  }

  const handleRemove = (optionId: string) => {
    setChips((current) => current.filter((chip) => chip.optionId !== optionId))
  }

  return (
    <ul
      className={cn(
        "flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center",
        className
      )}
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <li key={`${chip.groupId}-${chip.optionId}`}>
          <button
            type="button"
            className="inline-flex h-10 min-w-[10.5rem] items-center justify-between gap-3 bg-surface-soft px-4 text-sm capitalize text-brand-navy transition-colors hover:bg-brand-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-8 sm:min-w-0 sm:justify-center sm:gap-2 sm:px-3"
            aria-label={`Remove ${chip.label} filter`}
            onClick={() => handleRemove(chip.optionId)}
          >
            <span>{chip.label}</span>
            <X className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  )
}
