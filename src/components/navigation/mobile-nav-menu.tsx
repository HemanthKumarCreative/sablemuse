"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Heart, Search, ShoppingBag, User, X } from "lucide-react"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
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
            className="rounded-none text-brand-navy"
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

        <div className="relative flex h-14 items-center justify-between px-4 sm:h-16 sm:px-5">
          <div className="flex items-center gap-1">
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  className="rounded-none text-brand-navy"
                />
              }
            >
              <X className="size-6" strokeWidth={1.5} />
            </SheetClose>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="rounded-none text-brand-navy"
              onClick={handleSearchClick}
            >
              <Search className="size-5" strokeWidth={1.5} />
            </Button>
          </div>

          <Link
            href="/"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Sable Muse home"
            onClick={handleNavigate}
          >
            <span className="font-serif text-xl font-medium tracking-wordmark text-brand-navy uppercase">
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
                isWishlistActive ? "text-ink" : "text-brand-navy"
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
              className="relative rounded-none text-brand-navy"
              render={<Link href="/cart" onClick={handleNavigate} />}
              nativeButton={false}
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              {itemCount > 0 ? (
                <Badge
                  variant="inverse"
                  className="absolute top-1.5 right-1.5 size-4 p-0 text-xs font-semibold leading-none"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </Badge>
              ) : null}
            </Button>
          </div>
        </div>

        <nav
          aria-label="Mobile"
          className="flex min-h-[calc(100dvh-96px)] flex-col px-5 pb-8 pt-2"
        >
          <ul className="divide-y divide-border border-y border-brand-border">
            {NAV_ITEMS.map((item) => {
              const links = getFlattenedLinks(item)
              const hasChildren = links.length > 0
              const isExpanded = expanded === item.label

              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block py-4 text-base font-medium text-brand-navy underline-offset-2 hover:underline"
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
                      className="flex-1 py-4 text-base font-medium text-brand-navy underline-offset-2 hover:underline"
                      onClick={handleNavigate}
                    >
                      {item.label}
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-brand-navy"
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
                    </Button>
                  </div>

                  {isExpanded ? (
                    <ul className="space-y-1 pb-4 pl-3">
                      {links.map((link) => (
                        <li key={`${item.label}-${link.label}`}>
                          <Link
                            href={link.href}
                            className="block py-2.5 text-sm text-brand-navy-muted transition-colors hover:text-brand-navy"
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
              size="xl"
              className="w-full gap-2 border-brand-border px-4 font-medium normal-case tracking-normal hover:bg-muted"
              render={<Link href="/login" onClick={handleNavigate} />}
              nativeButton={false}
            >
              <User className="size-4" strokeWidth={1.5} />
              Log In
            </Button>
            <Button
              size="xl"
              className="w-full px-4"
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
