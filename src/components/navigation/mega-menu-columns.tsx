import Link from "next/link"
import type { MegaMenuColumn } from "@/data/navigation"
import { cn } from "cn"

type MegaMenuColumnsProps = {
  columns: MegaMenuColumn[]
  className?: string
  onNavigate?: () => void
}

export const MegaMenuColumns = ({
  columns,
  className,
  onNavigate,
}: MegaMenuColumnsProps) => {
  return (
    <div className={cn("grid grid-cols-3 gap-10 lg:gap-16", className)}>
      {columns.map((column) => (
        <div key={column.title}>
          <p className="mb-6 text-lg capitalize leading-copy text-brand-navy">
            {column.title}
          </p>
          <ul className="space-y-2">
            {column.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="block text-lg capitalize leading-copy text-brand-navy-muted transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
