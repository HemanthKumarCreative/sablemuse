import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { MegaMenuFeatured } from "@/data/navigation"
import { cn } from "cn"

type MegaMenuFeaturedProps = {
  items: MegaMenuFeatured[]
  className?: string
  ratio?: number
  showLabels?: boolean
  onNavigate?: () => void
}

export const MegaMenuFeaturedCards = ({
  items,
  className,
  ratio = 3 / 4,
  showLabels = true,
  onNavigate,
}: MegaMenuFeaturedProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4 lg:gap-5", className)}>
      {items.map((item) => (
        <Link
          key={`${item.href}-${item.label}`}
          href={item.href}
          onClick={onNavigate}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={item.label}
        >
          <AspectRatio ratio={ratio} className="overflow-hidden bg-[#d9d9d9]">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 392px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </AspectRatio>
          {showLabels ? (
            <span className="mt-3 block text-left text-base capitalize leading-[1.8] text-brand-navy transition-colors group-hover:text-brand">
              {item.label}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
