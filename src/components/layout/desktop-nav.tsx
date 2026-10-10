"use client"

import Link from "next/link"
import type { NavItem } from "@/data/navigation"
import { cn } from "cn"

type DesktopNavProps = {
  items: NavItem[]
}

export const DesktopNav = ({ items }: DesktopNavProps) => {
  return (
    <nav className="hidden lg:block" aria-label="Primary">
      <ul className="flex items-center gap-4 lg:gap-7">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              title={item.title}
              className="relative whitespace-nowrap text-sm font-medium tracking-[0.04em] text-brand-navy-muted transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
