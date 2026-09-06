import type { Product } from "@/data/home"

export type SearchFilterOption = {
  id: string
  label: string
  defaultChecked?: boolean
  swatch?: string
}

export type SearchFilterGroup = {
  id: string
  label: string
  defaultOpen?: boolean
  options: SearchFilterOption[]
}

export const SEARCH_FILTERS: SearchFilterGroup[] = [
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
      { id: "xs", label: "XS / US (0-4)" },
      { id: "s", label: "S / US (4-6)", defaultChecked: true },
      { id: "m", label: "M / US (6-10)" },
      { id: "l", label: "L / US (10-14)" },
      { id: "xl", label: "XL / US (12-16)" },
    ],
  },
  {
    id: "color",
    label: "Color",
    options: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "sage", label: "Green" },
      { id: "blue", label: "Blue" },
      { id: "red", label: "Red" },
      { id: "lavender", label: "Purple" },
    ],
  },
  {
    id: "collection",
    label: "Collection",
    defaultOpen: true,
    options: [
      { id: "in-stock", label: "In Stock", defaultChecked: true },
      { id: "out-of-stock", label: "Out Of Stock" },
    ],
  },
  {
    id: "fabric",
    label: "Fabric",
    defaultOpen: true,
    options: [
      { id: "cotton", label: "Cotton", defaultChecked: true },
      { id: "linen", label: "Linen" },
      { id: "wool", label: "Wool" },
      { id: "silk", label: "Silk" },
      { id: "cashmere", label: "Cashmere" },
    ],
  },
]

export const SEARCH_FILTERS_DEFAULT_OPEN = SEARCH_FILTERS.filter(
  (group) => group.defaultOpen
).map((group) => group.id)

export const PANTS_SEARCH_RESULTS: Product[] = [
  {
    id: "pants-1",
    name: "Elastic Waist",
    subtitle: "Turn It Up Pants",
    price: 110,
    image: "/images/search/pants-1.jpg",
    colors: [
      { name: "Sky", hex: "#7DC3EB" },
      { name: "Sage", hex: "#748C70" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  {
    id: "pants-2",
    name: "Tailored Stretch",
    subtitle: "Turn It Up Pants",
    price: 150,
    image: "/images/search/pants-2.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  {
    id: "pants-3",
    name: "Tailored Stretch",
    subtitle: "Turn It Up Pants",
    price: 140,
    image: "/images/search/pants-4.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Red", hex: "#CA2929" },
      { name: "Sage", hex: "#748C70" },
    ],
  },
  {
    id: "pants-4",
    name: "High Tillie",
    subtitle: "Turn It Up Pants",
    price: 110,
    image: "/images/search/pants-3.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Olive", hex: "#909225" },
      { name: "Sage", hex: "#748C70" },
    ],
    isNew: true,
  },
  {
    id: "pants-5",
    name: "Casual Wild Leg",
    subtitle: "Turn It Up Pants",
    price: 130,
    image: "/images/search/pants-7.png",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sage", hex: "#748C70" },
    ],
  },
  {
    id: "pants-6",
    name: "Linen Wide Leg",
    subtitle: "Turn It Up Pants",
    price: 180,
    image: "/images/search/pants-5.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Lavender", hex: "#D0A5EA" },
    ],
  },
  {
    id: "pants-7",
    name: "Soft Pleat",
    subtitle: "Turn It Up Pants",
    price: 125,
    image: "/images/search/pants-1.jpg",
    colors: [
      { name: "Sage", hex: "#748C70" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  {
    id: "pants-8",
    name: "Everyday Straight",
    subtitle: "Turn It Up Pants",
    price: 120,
    image: "/images/search/pants-2.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sky", hex: "#7DC3EB" },
    ],
  },
  {
    id: "pants-9",
    name: "Relaxed Crop",
    subtitle: "Turn It Up Pants",
    price: 115,
    image: "/images/search/pants-4.jpg",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sage", hex: "#748C70" },
      { name: "White", hex: "#FFFFFF" },
    ],
    isNew: true,
  },
  {
    id: "pants-10",
    name: "Studio Wide",
    subtitle: "Turn It Up Pants",
    price: 160,
    image: "/images/search/pants-7.png",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Olive", hex: "#909225" },
    ],
  },
]

export const getSearchResults = (query: string): Product[] => {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return []
  }

  if (normalized.includes("pant")) {
    return PANTS_SEARCH_RESULTS
  }

  return PANTS_SEARCH_RESULTS.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.subtitle.toLowerCase().includes(normalized)
  )
}
