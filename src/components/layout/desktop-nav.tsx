"use client"

import Link from "next/link"
import type { NavItem } from "@/data/navigation"
import { cn } from "cn"

type DesktopNavProps = {
  items: NavItem[]
  activeLabel: string | null
  onOpen: (label: string) => void
  onClose: () => void
}

export const DesktopNav = ({
  items,
  activeLabel,
  onOpen,
  onClose,
}: DesktopNavProps) => {
  return (
    <nav className="hidden md:block" aria-label="Primary">
      <ul className="flex items-center gap-4 lg:gap-7">
        {items.map((item) => {
          const hasMegaMenu = Boolean(item.columns)
          const isOpen = activeLabel === item.label && hasMegaMenu

          return (
            <li
              key={item.label}
              onMouseEnter={() => {
                if (hasMegaMenu) {
                  onOpen(item.label)
                  return
                }
                onClose()
              }}
            >
              <Link
                href={item.href}
                title={item.title}
                className={cn(
                  "relative whitespace-nowrap text-sm font-medium tracking-[0.04em] text-brand-navy-muted transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isOpen && "text-brand-navy underline decoration-1 underline-offset-8"
                )}
                aria-expanded={hasMegaMenu ? isOpen : undefined}
                aria-haspopup={hasMegaMenu ? "true" : undefined}
                onFocus={() => {
                  if (hasMegaMenu) {
                    onOpen(item.label)
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
