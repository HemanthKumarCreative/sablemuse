export type { Product, ProductColor } from "@/types/commerce"

export type CollectionTile = {
  id: string
  name: string
  href: string
  image: string
  heightClass: string
}

export type ModiWeekDay = {
  day: string
  image: string
}

export const COLLECTION_TILES: Array<
  Omit<CollectionTile, "image"> & { handle: string }
> = [
  {
    id: "tops-blouses",
    name: "Tops & Blouses",
    href: "/collection/tops-blouses",
    handle: "tops-blouses",
    heightClass: "min-h-[180px] sm:min-h-[240px] md:min-h-[400px]",
  },
  {
    id: "jeans-pants",
    name: "Jeans & Pants",
    href: "/collection/jeans-pants",
    handle: "jeans-pants",
    heightClass: "min-h-[280px] sm:min-h-[360px] md:min-h-[700px]",
  },
  {
    id: "dresses-jumpsuits",
    name: "Dresses & Jumpsuits",
    href: "/collection/dresses-jumpsuits",
    handle: "dresses-jumpsuits",
    heightClass: "min-h-[260px] sm:min-h-[320px] md:min-h-[600px]",
  },
  {
    id: "matching-sets-lounge",
    name: "Matching Sets",
    href: "/collection/matching-sets-lounge",
    handle: "matching-sets-lounge",
    heightClass: "min-h-[160px] sm:min-h-[200px] md:min-h-[300px]",
  },
]

export const MODIWEEK: ModiWeekDay[] = [
  { day: "Monday", image: "/images/modiweek/1.webp" },
  { day: "Tuesday", image: "/images/modiweek/2.webp" },
  { day: "Wednesday", image: "/images/modiweek/3.webp" },
  { day: "Thursday", image: "/images/modiweek/4.webp" },
  { day: "Friday", image: "/images/modiweek/5.webp" },
  { day: "Saturday", image: "/images/modiweek/6.webp" },
  { day: "Sunday", image: "/images/modiweek/7.webp" },
]
