import type { Product } from "@/data/home"
import { MODIWEEK } from "@/data/home"

export type ModiweekDaySlug =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type ModiweekLookProduct = Product & {
  href: string
}

export type ModiweekDayDetail = {
  slug: ModiweekDaySlug
  day: string
  heroImage: string
  heroAlt: string
  shopTheLook: ModiweekLookProduct[]
}

const dayOrder: ModiweekDaySlug[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

const dayMeta: Record<
  ModiweekDaySlug,
  { day: string; imageIndex: number; heroImage?: string; heroAlt: string }
> = {
  monday: {
    day: "Monday",
    imageIndex: 0,
    heroAlt: "ModiWeek Monday outfit look",
  },
  tuesday: {
    day: "Tuesday",
    imageIndex: 1,
    heroAlt: "ModiWeek Tuesday outfit look",
  },
  wednesday: {
    day: "Wednesday",
    imageIndex: 2,
    heroAlt: "ModiWeek Wednesday outfit look",
  },
  thursday: {
    day: "Thursday",
    imageIndex: 3,
    heroAlt: "ModiWeek Thursday outfit look",
  },
  friday: {
    day: "Friday",
    imageIndex: 4,
    heroAlt: "ModiWeek Friday outfit look",
  },
  saturday: {
    day: "Saturday",
    imageIndex: 5,
    heroImage: "/images/products/dress-offwhite.webp",
    heroAlt: "ModiWeek Saturday white dress look",
  },
  sunday: {
    day: "Sunday",
    imageIndex: 6,
    heroAlt: "ModiWeek Sunday outfit look",
  },
}

const sharedLooks: ModiweekLookProduct[] = [
  {
    id: "modiweek-coat",
    name: "Soft Wrap Coat",
    subtitle: "Ivory",
    price: 220,
    image: "/images/products/wrap-top/main.webp",
    href: "/product/wrap-top",
    colors: [
      { name: "Ivory", hex: "#F5F2EB" },
      { name: "Black", hex: "#0C0C0C" },
    ],
  },
  {
    id: "modiweek-slip",
    name: "Fluid Slip Dress",
    subtitle: "Off White",
    price: 168,
    image: "/images/products/dress-offwhite.webp",
    href: "/shop-all",
    colors: [
      { name: "Off White", hex: "#F5F2EB" },
      { name: "Coconut", hex: "#E8DFD0" },
    ],
  },
]

export const MODIWEEK_DAYS: ModiweekDayDetail[] = dayOrder.map((slug) => {
  const meta = dayMeta[slug]
  const stripImage = MODIWEEK[meta.imageIndex]?.image ?? "/images/modiweek/1.webp"

  return {
    slug,
    day: meta.day,
    heroImage: meta.heroImage ?? stripImage,
    heroAlt: meta.heroAlt,
    shopTheLook: sharedLooks,
  }
})

export const getModiweekDay = (slug: string): ModiweekDayDetail | null => {
  return MODIWEEK_DAYS.find((day) => day.slug === slug.toLowerCase()) ?? null
}

export const MODIWEEK_DEFAULT_SLUG: ModiweekDaySlug = "saturday"
