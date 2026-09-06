import type { Product } from "@/data/home"
import type { SearchFilterGroup } from "@/data/search"
import { BEST_SELLERS } from "@/data/home"
import { PANTS_SEARCH_RESULTS } from "@/data/search"

export const PLUS_SIZE_FILTERS: SearchFilterGroup[] = [
  {
    id: "sort",
    label: "Sort by",
    options: [
      { id: "newest", label: "Newest" },
      { id: "price-asc", label: "Price (Low to High)" },
      { id: "price-desc", label: "Price (High to Low)" },
      { id: "top-rated", label: "Top Rated" },
    ],
  },
  {
    id: "size",
    label: "Size",
    defaultOpen: true,
    options: [
      { id: "1x", label: "1X", defaultChecked: true },
      { id: "2x", label: "2X" },
      { id: "3x", label: "3X" },
      { id: "4x", label: "4X" },
    ],
  },
  {
    id: "color",
    label: "Color",
    defaultOpen: true,
    options: [
      { id: "black", label: "Black", swatch: "#0C0C0C", defaultChecked: true },
      { id: "white", label: "White", swatch: "#FFFFFF" },
      { id: "green", label: "Green", swatch: "#748C70" },
      { id: "beige", label: "Beige", swatch: "#E8DFD0" },
      { id: "navy", label: "Navy", swatch: "#1F2A44" },
    ],
  },
  {
    id: "collection",
    label: "Collection",
    options: [
      { id: "holiday", label: "Holiday" },
      { id: "basics", label: "Basics" },
      { id: "best-sellers", label: "Best Sellers" },
      { id: "new-in", label: "New In" },
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
    ],
  },
]

export const PLUS_SIZE_FILTERS_DEFAULT_OPEN = PLUS_SIZE_FILTERS.filter(
  (group) => group.defaultOpen
).map((group) => group.id)

export const PLUS_SIZE_PRODUCTS: Product[] = [
  {
    id: "essential-dress",
    name: "Essential Dress",
    subtitle: "Fitted Soft",
    price: 160,
    image: "/images/products/essential-dress/main.png",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sky", hex: "#A8C5D4" },
      { name: "Lavender", hex: "#C5B4D8" },
    ],
    isNew: true,
  },
  {
    id: "plus-marilyn-dress",
    name: "Marilyn Dress",
    subtitle: "Everyday Soft",
    price: 148,
    image: "/images/plus-size/dresses.png",
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
  ...BEST_SELLERS.slice(0, 2).map((product) => ({
    ...product,
    id: `plus-${product.id}`,
  })),
  ...PANTS_SEARCH_RESULTS.slice(0, 2).map((product) => ({
    ...product,
    id: `plus-${product.id}`,
  })),
]
