"use client"

import { useEffect, useId, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
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
      }
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
        "absolute inset-x-0 top-full z-50 border-t border-border bg-white shadow-[0_16px_40px_rgba(12,12,12,0.08)]",
        className
      )}
      role="search"
      aria-label="Site search"
    >
      <div className="mx-auto flex h-[120px] w-full max-w-[1240px] items-start px-5 pt-8 md:h-[152px] md:px-8 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full items-center border-b border-[#adadad] pb-3"
        >
          <label htmlFor={inputId} className="sr-only">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-0 size-6 text-ink-muted"
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
            className="h-14 rounded-none border-0 bg-transparent py-0 pr-2 pl-10 text-xl capitalize leading-[1.8] text-ink shadow-none placeholder:text-[#adadad] focus-visible:border-0 focus-visible:ring-0 md:text-[20px]"
          />
        </form>
      </div>
    </div>
  )
}
