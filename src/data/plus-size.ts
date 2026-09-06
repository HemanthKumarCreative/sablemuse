import type { Product } from "@/data/home"
import type { SearchFilterGroup } from "@/data/search"
import { BEST_SELLERS } from "@/data/home"
import { PANTS_SEARCH_RESULTS } from "@/data/search"

export const PLUS_SIZE_FILTERS: SearchFilterGroup[] = [
  {
    id: "sort",
    label: "Sort By",
    defaultOpen: true,
    options: [
      { id: "featured", label: "Featured" },
      { id: "best-seller", label: "Best Seller", defaultChecked: true },
      { id: "price-asc", label: "Price: Low To High" },
      { id: "price-desc", label: "Price: High To Low" },
    ],
  },
  {
    id: "size",
    label: "Size",
    defaultOpen: true,
    options: [
      { id: "1x", label: "1X / US (18)" },
      { id: "2x", label: "2X / US (20)", defaultChecked: true },
      { id: "3x", label: "3X / US (22)" },
    ],
  },
  {
    id: "color",
    label: "Color",
    defaultOpen: true,
    options: [
      { id: "black", label: "Black", swatch: "#0C0C0C", defaultChecked: true },
      { id: "red", label: "Red", swatch: "#CA2929" },
      { id: "green", label: "Green", swatch: "#748C70" },
      { id: "yellow", label: "Yellow", swatch: "#E8C547" },
      { id: "dark-blue", label: "Dark Blue", swatch: "#1E3A5F" },
      { id: "purple", label: "Purple", swatch: "#9B8AA6" },
      { id: "pink", label: "Pink", swatch: "#E8A0BF" },
      { id: "light-blue", label: "Light Blue", swatch: "#7DC3EB" },
      { id: "orange", label: "Orange", swatch: "#E89B5F" },
      { id: "white", label: "White", swatch: "#FFFFFF" },
    ],
  },
  {
    id: "collection",
    label: "Collection",
    options: [
      { id: "in-stock", label: "In Stock", defaultChecked: true },
      { id: "out-of-stock", label: "Out Of Stock" },
    ],
  },
  {
    id: "fabric",
    label: "Fabric",
    options: [
      { id: "cotton", label: "Cotton" },
      { id: "linen", label: "Linen" },
      { id: "wool", label: "Wool" },
      { id: "silk", label: "Silk" },
      { id: "cashmere", label: "Cashmere" },
    ],
  },
]

export const PLUS_SIZE_FILTERS_DEFAULT_OPEN = PLUS_SIZE_FILTERS.filter(
  (group) => group.defaultOpen
).map((group) => group.id)

export const PLUS_SIZE_HERO_SLIDES = [
  {
    src: "/images/plus-size/pants.png",
    alt: "Modimal plus size look featuring an olive shirt and black trousers",
  },
  {
    src: "/images/plus-size/dresses.png",
    alt: "Modimal plus size dress lookbook",
  },
] as const

export const PLUS_SIZE_PRODUCTS: Product[] = [
  {
    id: "plus-crop-it-up-pants",
    name: "Crop It Up Pants",
    subtitle: "Turn It Up Pants",
    price: 145,
    image: "/images/search/pants-2.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sage", hex: "#748C70" },
      { name: "White", hex: "#FFFFFF" },
    ],
    isRestock: true,
  },
  {
    id: "essential-dress",
    name: "Essential Dress",
    subtitle: "Turn It Up Dress",
    price: 195,
    image: "/images/products/essential-dress/main.png",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sky", hex: "#A8C5D4" },
      { name: "Lavender", hex: "#C5B4D8" },
    ],
  },
  {
    id: "plus-marilyn-dress",
    name: "Marilyn Dress",
    subtitle: "Everyday Soft",
    price: 148,
    image: "/images/products/essential-dress/alt-1.webp",
    colors: [
      { name: "Sage", hex: "#748C70" },
      { name: "Black", hex: "#0C0C0C" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  {
    id: "plus-tailored-blouse",
    name: "Tailored Blouse",
    subtitle: "Easy Soft",
    price: 98,
    image: "/images/plus-size/blouses.png",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#0C0C0C" },
    ],
  },
  {
    id: "plus-wide-pants",
    name: "Wide Leg Pants",
    subtitle: "Relaxed Stretch",
    price: 120,
    image: "/images/plus-size/pants.png",
    colors: [
      { name: "Sage", hex: "#748C70" },
      { name: "Black", hex: "#0C0C0C" },
      { name: "Navy", hex: "#1F2A44" },
    ],
  },
  {
    id: "plus-boss-dress",
    name: "Boss Dress",
    subtitle: "Turn It Up Dress",
    price: 260,
    image: "/images/plus-size/dresses.png",
    colors: [{ name: "Red", hex: "#CA2929" }],
  },
  {
    id: "plus-v-neck-tunic",
    name: "V-Neck Tunic",
    subtitle: "Everyday Soft",
    price: 120,
    image: "/images/modiweek/1.webp",
    colors: [
      { name: "Sky", hex: "#7DC3EB" },
      { name: "Sage", hex: "#748C70" },
    ],
    isNew: true,
  },
  ...BEST_SELLERS.slice(0, 2).map((product) => ({
    ...product,
    id: `plus-${product.id}`,
  })),
  ...PANTS_SEARCH_RESULTS.slice(0, 2).map((product) => ({
    ...product,
    id: `plus-${product.id}`,
  })),
]
