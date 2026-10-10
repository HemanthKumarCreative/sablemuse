"use client"

import { useEffect, useId, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

type SearchOverlayProps = {
  open: boolean
  onClose: () => void
  className?: string
}

export const SearchOverlay = ({
  open,
  onClose,
  className,
}: SearchOverlayProps) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const field = inputRef.current
      const close = Array.from(
        document.querySelectorAll<HTMLElement>("[data-search-close]")
      ).find((node) => node.getClientRects().length > 0)

      if (!field || !close) {
        return
      }

      const stops = [field, close]
      const current = stops.indexOf(document.activeElement as HTMLElement)
      const nextIndex = event.shiftKey
        ? current <= 0
          ? stops.length - 1
          : current - 1
        : (current + 1) % stops.length

      event.preventDefault()
      stops[nextIndex]?.focus()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = String(formData.get("q") ?? "").trim()

    onClose()

    if (!query) {
      router.push("/search")
      return
    }

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-50 border-t border-brand-border bg-background",
        className
      )}
      role="search"
      aria-label="Site search"
    >
      <Container className="flex h-24 items-start pt-6 md:h-38 md:pt-8">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full items-center border-b border-brand-border pb-3"
        >
          <label htmlFor={inputId} className="sr-only">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-0 size-5 text-brand-navy-muted md:size-6"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            id={inputId}
            type="search"
            name="q"
            placeholder="Search"
            autoComplete="off"
            defaultValue=""
            className="h-11 rounded-none border-0 bg-transparent py-0 pr-2 pl-9 text-lg leading-copy text-brand-navy shadow-none placeholder:text-brand-navy-muted focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ring md:h-14 md:pl-10 md:text-xl"
          />
        </form>
      </Container>
    </div>
  )
}
