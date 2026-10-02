import Image from "next/image"
import Link from "next/link"
import type { MegaMenuFeatured, MegaMenuLink } from "@/data/navigation"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "cn"

type CategoryCardProps = {
  item: MegaMenuFeatured | (MegaMenuLink & { image?: string; alt?: string })
  className?: string
}

export const CategoryCard = ({ item, className }: CategoryCardProps) => {
  const image = "image" in item ? item.image : undefined
  const alt = "alt" in item && item.alt ? item.alt : item.label

  return (
    <Link
      href={item.href}
      className={cn(
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={`Shop ${item.label}`}
    >
      {image ? (
        <AspectRatio ratio={3 / 4} className="overflow-hidden bg-muted">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </AspectRatio>
      ) : (
        <div className="flex aspect-[3/4] items-end bg-muted p-5">
          <span className="text-lg font-semibold text-brand-navy">{item.label}</span>
        </div>
      )}
      <span className="mt-3 block text-sm font-medium text-brand-navy-muted transition-colors group-hover:text-brand-navy md:text-base">
        {item.label}
      </span>
    </Link>
  )
}
