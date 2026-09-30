"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Heart, Search, ShoppingBag, User, X } from "lucide-react"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_ITEMS, type NavItem } from "@/data/navigation"
import { cn } from "cn"

type MobileNavMenuProps = {
  onOpenSearch: () => void
}

const getFlattenedLinks = (item: NavItem) => {
  if (!item.columns) {
    return []
  }

  return item.columns.flatMap((column) => column.links)
}

export const MobileNavMenu = ({ onOpenSearch }: MobileNavMenuProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { itemCount } = useCart()
  const isWishlistActive = pathname.startsWith("/wishlist")

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setExpanded(null)
    }
  }

  const handleToggleSection = (label: string) => {
    setExpanded((current) => (current === label ? null : label))
  }

  const handleNavigate = () => {
    setOpen(false)
    setExpanded(null)
  }

  const handleSearchClick = () => {
    setOpen(false)
    onOpenSearch()
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="rounded-none text-ink"
          />
        }
      >
        <span className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="inset-0 h-dvh max-w-none gap-0 overflow-y-auto rounded-none border-0 p-0 data-[side=left]:w-screen data-[side=left]:max-w-none sm:max-w-none"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>

        <AnnouncementBar />

        <div className="relative flex h-[56px] items-center justify-between px-4 sm:h-[64px] sm:px-5">
          <div className="flex items-center gap-1">
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  className="rounded-none text-ink"
                />
              }
            >
              <X className="size-6" strokeWidth={1.5} />
            </SheetClose>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="rounded-none text-ink"
              onClick={handleSearchClick}
            >
              <Search className="size-5" strokeWidth={1.5} />
            </Button>
          </div>

          <Link
            href="/"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Sable Muse home"
            onClick={handleNavigate}
          >
            <span className="font-serif text-xl font-bold tracking-tight text-ink uppercase">
              Sable Muse
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              aria-current={isWishlistActive ? "page" : undefined}
              className={cn(
                "rounded-none",
                isWishlistActive ? "text-[#CA2929]" : "text-ink"
              )}
              render={<Link href="/wishlist" onClick={handleNavigate} />}
              nativeButton={false}
            >
              <Heart
                className="size-5"
                strokeWidth={1.5}
                fill={isWishlistActive ? "currentColor" : "none"}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                itemCount > 0
                  ? `Shopping bag, ${itemCount} items`
                  : "Shopping bag"
              }
              className="relative rounded-none text-ink"
              render={<Link href="/cart" onClick={handleNavigate} />}
              nativeButton={false}
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              {itemCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </Button>
          </div>
        </div>

        <nav
          aria-label="Mobile"
          className="flex min-h-[calc(100dvh-96px)] flex-col px-5 pb-8 pt-2"
        >
          <ul className="divide-y divide-border border-y border-border">
            {NAV_ITEMS.map((item) => {
              const links = getFlattenedLinks(item)
              const hasChildren = links.length > 0
              const isExpanded = expanded === item.label

              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block py-4 text-base font-medium text-ink transition-colors hover:text-brand"
                      onClick={handleNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }

              return (
                <li key={item.label}>
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={item.href}
                      className="flex-1 py-4 text-base font-medium text-ink transition-colors hover:text-brand"
                      onClick={handleNavigate}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center text-ink"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                      onClick={() => handleToggleSection(item.label)}
                    >
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  {isExpanded ? (
                    <ul className="space-y-1 pb-4 pl-3">
                      {links.map((link) => (
                        <li key={`${item.label}-${link.label}`}>
                          <Link
                            href={link.href}
                            className="block py-2.5 text-sm text-ink-muted transition-colors hover:text-brand"
                            onClick={handleNavigate}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
            <Button
              variant="outline"
              className="h-12 gap-2 rounded-none border-brand text-sm font-medium text-ink hover:bg-brand/5"
              render={<Link href="/login" onClick={handleNavigate} />}
              nativeButton={false}
            >
              <User className="size-4" strokeWidth={1.5} />
              Log In
            </Button>
            <Button
              className="h-12 rounded-none bg-brand text-sm font-medium text-white hover:bg-brand/90"
              render={<Link href="/register" onClick={handleNavigate} />}
              nativeButton={false}
            >
              Create Account
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
