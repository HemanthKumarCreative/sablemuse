"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import {
  ChevronDown,
  Menu,
  Search,
  Heart,
  User,
  X,
} from "lucide-react"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { BagSheet } from "@/components/cart/bag-sheet"
import { MegaMenuPanel } from "@/components/navigation/mega-menu-panel"
import { SearchOverlay } from "@/components/navigation/search-overlay"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_ITEMS } from "@/data/navigation"
import { cn } from "cn"

export const SiteHeader = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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

  const handleToggleMobileSection = (label: string) => {
    setMobileExpanded((current) => (current === label ? null : label))
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
      <div className="relative mx-auto flex h-[64px] w-full max-w-[1240px] items-center justify-between px-5 md:h-[72px] md:px-8 lg:px-10">
        <div className="flex items-center gap-1 md:hidden">
          <Sheet>
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
              <Menu className="size-6" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88vw] max-w-sm rounded-none gap-0 overflow-y-auto p-0"
            >
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="font-sans text-base font-semibold text-ink">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-5 py-6">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    if (item.columns) {
                      const isExpanded = mobileExpanded === item.label

                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-ink-muted transition-colors hover:text-brand"
                            aria-expanded={isExpanded}
                            onClick={() => handleToggleMobileSection(item.label)}
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                              strokeWidth={1.5}
                            />
                          </button>
                          {isExpanded ? (
                            <div className="space-y-6 border-l border-border pb-4 pl-4">
                              {item.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="mb-3 text-sm font-bold text-ink">
                                    {column.title}
                                  </p>
                                  <ul className="space-y-3">
                                    {column.links.map((link) => (
                                      <li key={link.label}>
                                        <Link
                                          href={link.href}
                                          className="text-sm text-ink-muted transition-colors hover:text-brand"
                                        >
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              {item.featured ? (
                                <div
                                  className={cn(
                                    "grid gap-3 pt-2",
                                    item.featured.length === 3
                                      ? "grid-cols-3"
                                      : "grid-cols-2"
                                  )}
                                >
                                  {item.featured.map((feature) => (
                                    <Link
                                      key={feature.label}
                                      href={feature.href}
                                      className="block"
                                    >
                                      <div className="relative mb-2 aspect-[3/4] overflow-hidden bg-muted">
                                        <Image
                                          src={feature.image}
                                          alt={feature.alt}
                                          fill
                                          sizes="140px"
                                          className="object-cover"
                                        />
                                      </div>
                                      <span className="text-sm text-ink-muted">
                                        {feature.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </li>
                      )
                    }

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block py-3 text-base font-medium text-ink-muted transition-colors hover:text-brand"
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
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
          aria-label="Modimal home"
        >
          <Image
            src="/images/logo.png"
            alt="Modimal women clothing"
            width={184}
            height={46}
            priority
            className="h-auto w-[160px] lg:w-[184px]"
          />
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
          aria-label="Modimal home"
        >
          <Image
            src="/images/logo-mobile.png"
            alt="Modimal"
            width={120}
            height={36}
            priority
            className="h-auto w-[110px]"
          />
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
          >
            <User className="size-5" strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="rounded-none text-ink"
            render={<Link href="/wishlist" />}
          >
            <Heart className="size-5" strokeWidth={1.5} />
          </Button>
          <BagSheet />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="rounded-none text-ink"
            render={<Link href="/wishlist" />}
          >
            <Heart className="size-5" strokeWidth={1.5} />
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
          className="fixed inset-0 top-[104px] z-40 bg-ink/30 backdrop-blur-[2px]"
          onClick={isSearchOpen ? handleCloseSearch : handleCloseMegaMenu}
        />
      ) : null}
    </header>
  )
}
