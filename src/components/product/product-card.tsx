import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Product } from "@/data/home"
import { cn } from "cn"

type ProductCardProps = {
  product: Product
  className?: string
  imageAspectClassName?: string
  favorited?: boolean
  href?: string
}

export const ProductCard = ({
  product,
  className,
  imageAspectClassName = "aspect-[3/4] md:aspect-square",
  favorited = false,
  href,
}: ProductCardProps) => {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={href ?? `/product/${product.id}`}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        aria-label={`View ${product.name} ${product.subtitle}`}
      >
        <div className={cn("relative w-full bg-muted", imageAspectClassName)}>
          <Image
            src={product.image}
            alt={`${product.name} ${product.subtitle}`}
            fill
            sizes="(max-width: 768px) 46vw, (max-width: 1200px) 33vw, 392px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        {product.isRestock ? (
          <span className="absolute top-2.5 left-2.5 bg-white px-3 py-1 text-xs capitalize text-ink sm:top-4 sm:left-4 sm:px-6 sm:py-2 sm:text-sm">
            Restock
          </span>
        ) : product.isNew ? (
          <span className="absolute top-2.5 left-2.5 bg-white px-3 py-1 text-xs capitalize text-ink sm:top-4 sm:left-4 sm:px-6 sm:py-2 sm:text-sm">
            New
          </span>
        ) : null}
        <span
          className={cn(
            "absolute top-2.5 right-2.5 inline-flex size-7 items-center justify-center sm:top-4 sm:right-4 sm:size-9",
            favorited ? "text-[#CA2929]" : "text-ink sm:bg-white/90"
          )}
          aria-hidden="true"
        >
          <Heart
            className="size-4 sm:size-5"
            strokeWidth={1.5}
            fill={favorited ? "currentColor" : "none"}
          />
        </span>
      </Link>

      <div className="mt-2 flex items-start justify-between gap-2 p-1 sm:gap-3 sm:p-1.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-sm font-bold capitalize text-ink sm:text-base">
            {product.name}
          </h3>
          <p className="truncate text-xs capitalize text-ink-muted sm:text-sm">
            {product.subtitle}
          </p>
          <ul className="mt-1.5 flex gap-1 sm:mt-2 sm:gap-1.5" aria-label="Available colors">
            {product.colors.map((color) => (
              <li key={color.name}>
                <span
                  className={cn(
                    "inline-block size-4 rounded-full border sm:size-6",
                    color.hex === "#FFFFFF"
                      ? "border-border"
                      : "border-transparent"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="shrink-0 pr-1 text-sm font-bold text-ink sm:pr-2 sm:text-base">
          ${product.price}
        </p>
      </div>
    </article>
  )
}
