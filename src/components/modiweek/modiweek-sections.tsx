import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product/product-card"
import type { ModiweekDayDetail } from "@/data/modiweek"
import { MODIWEEK_DAYS } from "@/data/modiweek"
import { MODIWEEK } from "@/data/home"
import { cn } from "cn"

type ModiweekDayNavProps = {
  activeSlug: string
  className?: string
}

export const ModiweekDayNav = ({
  activeSlug,
  className,
}: ModiweekDayNavProps) => {
  return (
    <nav aria-label="ModiWeek days" className={cn("w-full", className)}>
      <ul className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-7">
        {MODIWEEK_DAYS.map((day, index) => {
          const isActive = day.slug === activeSlug
          const thumb = MODIWEEK[index]?.image ?? day.heroImage

          return (
            <li key={day.slug} className="w-[42vw] shrink-0 md:w-auto">
              <Link
                href={`/modiweek/${day.slug}`}
                aria-current={isActive ? "page" : undefined}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden bg-muted",
                    isActive && "ring-2 ring-brand"
                  )}
                >
                  <Image
                    src={thumb}
                    alt={`${day.day} ModiWeek look`}
                    fill
                    sizes="(max-width: 768px) 42vw, 14vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p
                  className={cn(
                    "pt-3 text-sm font-semibold capitalize text-ink md:text-base",
                    isActive && "text-brand"
                  )}
                >
                  {day.day}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

type ModiweekLookSectionProps = {
  day: ModiweekDayDetail
  className?: string
}

export const ModiweekLookSection = ({
  day,
  className,
}: ModiweekLookSectionProps) => {
  const itemCount = day.shopTheLook.length

  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12",
        className
      )}
    >
      <div className="relative -mx-4 aspect-[390/480] overflow-hidden bg-muted sm:-mx-5 md:mx-0 md:aspect-auto md:min-h-[640px]">
        <Image
          src={day.heroImage}
          alt={day.heroAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-col">
        <div className="mb-3 md:mb-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold capitalize text-ink md:text-2xl">
              Shop The Look
            </h2>
            <Link
              href="/shop-all"
              className="hidden text-sm font-medium text-brand transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:inline"
            >
              Shop All
            </Link>
          </div>
          <p className="mt-1 text-sm capitalize text-ink-muted md:mt-2" aria-live="polite">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {day.shopTheLook.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                href={product.href}
                imageAspectClassName="aspect-[3/4]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
