export type { Product, ProductColor } from "@/types/commerce"
import type { Product } from "@/types/commerce"

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



export const COLLECTIONS: CollectionTile[] = [
  {
    id: "tops-blouses",
    name: "Tops & Blouses",
    href: "/collection/tops-blouses",
    image: "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
    heightClass: "min-h-[180px] sm:min-h-[240px] md:min-h-[400px]",
  },
  {
    id: "jeans-pants",
    name: "Jeans & Pants",
    href: "/collection/jeans-pants",
    image: "/images/collection/Moodboard2_71ade389-dc80-49eb-b7e8-1c90a0273a2a_700x.webp",
    heightClass: "min-h-[280px] sm:min-h-[360px] md:min-h-[700px]",
  },
  {
    id: "dresses-jumpsuits",
    name: "Dresses & Jumpsuits",
    href: "/collection/dresses-jumpsuits",
    image: "/images/collection/Save_The_Date_Dress_Khaki_Lifestyle_Khaki_Main_720x.webp",
    heightClass: "min-h-[260px] sm:min-h-[320px] md:min-h-[600px]",
  },
  {
    id: "matching-sets-lounge",
    name: "Matching Sets",
    href: "/collection/matching-sets-lounge",
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
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

export const FOLLOW_US = [
  {
    id: "1",
    image: "/images/followus/follow-1.png",
    alt: "Modimal lookbook editorial",
    className: "row-span-2 min-h-[320px] md:min-h-[640px]",
  },
  {
    id: "2",
    image: "/images/followus/2.jpg",
    alt: "Modimal style detail",
    className: "min-h-[160px] md:min-h-[315px]",
  },
  {
    id: "3",
    image: "/images/followus/3.jpg",
    alt: "Modimal outfit inspiration",
    className: "min-h-[160px] md:min-h-[315px]",
  },
  {
    id: "4",
    image: "/images/followus/4.jpg",
    alt: "Modimal everyday look",
    className: "min-h-[160px] md:min-h-[315px]",
  },
  {
    id: "5",
    image: "/images/followus/5.webp",
    alt: "Modimal community style",
    className: "min-h-[160px] md:min-h-[315px]",
  },
]
