"use client"

import { useEffect, useId, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

type SearchResultsBarProps = {
  initialQuery: string
  className?: string
}

export const SearchResultsBar = ({
  initialQuery,
  className,
}: SearchResultsBarProps) => {
  const router = useRouter()
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextQuery = query.trim()

    if (!nextQuery) {
      router.push("/search")
      return
    }

    router.push(`/search?q=${encodeURIComponent(nextQuery)}`)
  }

  const handleClear = () => {
    setQuery("")
    router.push("/search")
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search results"
      className={cn(
        "flex h-12 w-full items-center gap-2 border-b border-[#adadad] px-1 sm:h-14 sm:border-brand-light sm:px-4",
        className
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <Search
        className="size-5 shrink-0 text-ink-muted sm:size-6"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Input
        id={inputId}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
        autoComplete="off"
        className="h-full flex-1 rounded-none border-0 bg-transparent px-0 text-lg capitalize leading-[1.8] text-ink shadow-none placeholder:text-[#adadad] focus-visible:border-0 focus-visible:ring-0 sm:text-xl md:text-[20px]"
      />
      {query ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="hidden size-6 shrink-0 items-center justify-center text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:inline-flex"
        >
          <X className="size-5 sm:size-6" strokeWidth={1.5} />
        </button>
      ) : null}
    </form>
  )
}
