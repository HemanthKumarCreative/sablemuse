import type { SearchFilterGroup } from "@/data/search"

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


