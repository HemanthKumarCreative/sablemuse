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
}

export const ProductCard = ({
  product,
  className,
  imageAspectClassName = "aspect-square",
  favorited = false,
}: ProductCardProps) => {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        aria-label={`View ${product.name} ${product.subtitle}`}
      >
        <div
          className={cn(
            "relative w-full bg-muted",
            imageAspectClassName
          )}
        >
          <Image
            src={product.image}
            alt={`${product.name} ${product.subtitle}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 392px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        {product.isNew ? (
          <span className="absolute top-4 left-4 bg-white px-6 py-2 text-sm capitalize text-ink">
            New
          </span>
        ) : null}
        <span
          className={cn(
            "absolute top-4 right-4 inline-flex size-9 items-center justify-center",
            favorited ? "text-[#CA2929]" : "bg-white/90 text-ink"
          )}
          aria-hidden="true"
        >
          <Heart
            className="size-5"
            strokeWidth={1.5}
            fill={favorited ? "currentColor" : "none"}
          />
        </span>
      </Link>

      <div className="mt-2 flex items-start justify-between gap-3 p-1.5">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-bold capitalize text-ink">{product.name}</h3>
          <p className="text-sm capitalize text-ink-muted">{product.subtitle}</p>
          <ul className="mt-2 flex gap-1.5" aria-label="Available colors">
            {product.colors.map((color) => (
              <li key={color.name}>
                <span
                  className={cn(
                    "inline-block size-6 rounded-full border",
                    color.hex === "#FFFFFF" ? "border-border" : "border-transparent"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="pr-2 font-bold text-ink">${product.price}</p>
      </div>
    </article>
  )
}
