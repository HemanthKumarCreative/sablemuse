"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Search, Heart, User, X } from "lucide-react"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { BagSheet } from "@/components/cart/bag-sheet"
import { MegaMenuPanel } from "@/components/navigation/mega-menu-panel"
import { MobileNavMenu } from "@/components/navigation/mobile-nav-menu"
import { SearchOverlay } from "@/components/navigation/search-overlay"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS } from "@/data/navigation"
import { cn } from "cn"

export const SiteHeader = () => {
  const pathname = usePathname()
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isWishlistActive = pathname.startsWith("/wishlist")

  const activeItem = NAV_ITEMS.find((item) => item.label === activeMegaMenu)

  const handleOpenMegaMenu = (label: string) => {
    if (isSearchOpen) {
      return
    }
    setActiveMegaMenu(label)
  }

  const handleCloseMegaMenu = () => {
    setActiveMegaMenu(null)
  }

  const handleOpenSearch = () => {
    setActiveMegaMenu(null)
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

  const handleHeaderMouseLeave = () => {
    if (isSearchOpen) {
      return
    }
    handleCloseMegaMenu()
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      onMouseLeave={handleHeaderMouseLeave}
    >
      <AnnouncementBar />
      <div className="relative mx-auto flex h-[56px] w-full max-w-[1240px] items-center justify-between px-4 sm:h-[64px] sm:px-5 md:h-[72px] md:px-8 lg:px-10">
        <div className="flex items-center gap-1 md:hidden">
          <MobileNavMenu onOpenSearch={handleOpenSearch} />
          <Button
            variant="ghost"
            size="icon"
            aria-label={isSearchOpen ? "Close search" : "Search"}
            aria-expanded={isSearchOpen}
            className="rounded-none text-ink"
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
          className="hidden shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:block"
          aria-label="Sable Muse home"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-ink uppercase lg:text-3xl">
            Sable Muse
          </span>
        </Link>

        <DesktopNav
          items={NAV_ITEMS}
          activeLabel={activeMegaMenu}
          onOpen={handleOpenMegaMenu}
          onClose={handleCloseMegaMenu}
        />

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:hidden"
          aria-label="Sable Muse home"
        >
          <span className="font-serif text-xl font-bold tracking-tight text-ink uppercase">
            Sable Muse
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={isSearchOpen ? "Close search" : "Search"}
            aria-expanded={isSearchOpen}
            className="rounded-none text-ink"
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
            className="rounded-none text-ink"
            render={<Link href="/login" />}
            nativeButton={false}
          >
            <User className="size-5" strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            aria-current={isWishlistActive ? "page" : undefined}
            className={cn(
              "rounded-none",
              isWishlistActive ? "text-[#CA2929]" : "text-ink"
            )}
            render={<Link href="/wishlist" />}
            nativeButton={false}
          >
            <Heart
              className="size-5"
              strokeWidth={1.5}
              fill={isWishlistActive ? "currentColor" : "none"}
            />
          </Button>
          <BagSheet />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            aria-current={isWishlistActive ? "page" : undefined}
            className={cn(
              "rounded-none",
              isWishlistActive ? "text-[#CA2929]" : "text-ink"
            )}
            render={<Link href="/wishlist" />}
            nativeButton={false}
          >
            <Heart
              className="size-5"
              strokeWidth={1.5}
              fill={isWishlistActive ? "currentColor" : "none"}
            />
          </Button>
          <BagSheet />
        </div>
      </div>

      <SearchOverlay open={isSearchOpen} onClose={handleCloseSearch} />

      {!isSearchOpen && activeItem?.columns && activeItem.featured ? (
        <div className="absolute inset-x-0 top-full z-50 hidden border-t border-border bg-white shadow-[0_16px_40px_rgba(12,12,12,0.08)] md:block">
          <MegaMenuPanel
            label={activeItem.label}
            columns={activeItem.columns}
            featured={activeItem.featured}
            variant={activeItem.megaMenuVariant ?? "collection"}
            onNavigate={handleCloseMegaMenu}
          />
        </div>
      ) : null}

      {isSearchOpen || activeMegaMenu ? (
        <button
          type="button"
          aria-label={isSearchOpen ? "Close search" : "Close menu"}
          className="fixed inset-0 top-[88px] z-40 bg-ink/30 backdrop-blur-[2px] sm:top-[96px] md:top-[104px]"
          onClick={isSearchOpen ? handleCloseSearch : handleCloseMegaMenu}
        />
      ) : null}
    </header>
  )
}
