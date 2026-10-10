"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Search, Heart, User, X } from "lucide-react"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { BagSheet } from "@/components/cart/bag-sheet"

import { MobileNavMenu } from "@/components/navigation/mobile-nav-menu"
import { SearchOverlay } from "@/components/navigation/search-overlay"
import { Container } from "@/components/shared/container"
import { IconCountBadge } from "@/components/shared/icon-count-badge"
import { Button } from "@/components/ui/button"
import { overlayScrimClassName } from "@/components/ui/overlay-scrim"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { NAV_ITEMS } from "@/data/navigation"
import { cn } from "cn"

export const SiteHeader = () => {
  const pathname = usePathname()
  const { handles, isHydrated } = useWishlist()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isWishlistActive = pathname.startsWith("/wishlist")
  const wishlistCount = isHydrated ? handles.length : 0

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      handleCloseSearch()
      return
    }
    handleOpenSearch()
  }

  return (
    <header className="sticky top-0 z-50 bg-background">
      <AnnouncementBar />
      <Container className="relative flex h-14 items-center justify-between gap-6 overflow-visible sm:h-16 lg:h-18 lg:gap-8">
        <div className="flex items-center gap-1 lg:hidden">
          <MobileNavMenu onOpenSearch={handleOpenSearch} />
          <Button
            variant="ghost"
            size="icon"
            aria-label={isSearchOpen ? "Close search" : "Search"}
            aria-expanded={isSearchOpen}
            className="rounded-none text-brand-navy"
            data-search-close={isSearchOpen ? "" : undefined}
            onClick={handleToggleSearch}
          >
            {isSearchOpen ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Search className="size-5" strokeWidth={1.5} />
            )}
          </Button>
        </div>

        <Link
          href="/"
          className="hidden shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:block"
          aria-label="Sable Muse home"
        >
          <span className="font-serif text-2xl font-medium tracking-wordmark text-brand-navy uppercase lg:text-3xl">
            Sable Muse
          </span>
        </Link>

        <DesktopNav items={NAV_ITEMS} />

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 lg:hidden"
          aria-label="Sable Muse home"
        >
          <span className="font-serif text-xl font-medium tracking-wordmark text-brand-navy uppercase">
            Sable Muse
          </span>
        </Link>

        <div className="hidden items-center gap-3 overflow-visible pr-1.5 lg:flex lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label={isSearchOpen ? "Close search" : "Search"}
            aria-expanded={isSearchOpen}
            className="rounded-none text-brand-navy"
            data-search-close={isSearchOpen ? "" : undefined}
            onClick={handleToggleSearch}
          >
            {isSearchOpen ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Search className="size-5" strokeWidth={1.5} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="rounded-none text-brand-navy"
            render={<Link href="/login" />}
            nativeButton={false}
          >
            <User className="size-5" strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              wishlistCount > 0
                ? `Wishlist, ${wishlistCount} items`
                : "Wishlist"
            }
            aria-current={isWishlistActive ? "page" : undefined}
            className={cn(
              "relative overflow-visible rounded-none",
              isWishlistActive ? "text-ink" : "text-brand-navy"
            )}
            render={<Link href="/wishlist" />}
            nativeButton={false}
          >
            <Heart
              className="size-5"
              strokeWidth={1.5}
              fill={isWishlistActive ? "currentColor" : "none"}
            />
            <IconCountBadge count={wishlistCount} />
          </Button>
          <BagSheet />
        </div>

        <div className="flex items-center gap-2 overflow-visible pr-1.5 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              wishlistCount > 0
                ? `Wishlist, ${wishlistCount} items`
                : "Wishlist"
            }
            aria-current={isWishlistActive ? "page" : undefined}
            className={cn(
              "relative overflow-visible rounded-none",
              isWishlistActive ? "text-ink" : "text-brand-navy"
            )}
            render={<Link href="/wishlist" />}
            nativeButton={false}
          >
            <Heart
              className="size-5"
              strokeWidth={1.5}
              fill={isWishlistActive ? "currentColor" : "none"}
            />
            <IconCountBadge count={wishlistCount} />
          </Button>
          <BagSheet />
        </div>
      </Container>

      <SearchOverlay open={isSearchOpen} onClose={handleCloseSearch} />

      {isSearchOpen ? (
        <button
          type="button"
          aria-label="Close search"
          className={cn(
            "absolute inset-x-0 top-full z-40 h-dvh",
            overlayScrimClassName
          )}
          onClick={handleCloseSearch}
        />
      ) : null}
    </header>
  )
}
