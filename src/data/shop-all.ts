import type { Product } from "@/data/home"
import type { SearchFilterGroup } from "@/data/search"
import { BEST_SELLERS } from "@/data/home"
import { PANTS_SEARCH_RESULTS } from "@/data/search"

export const SHOP_ALL_FILTERS: SearchFilterGroup[] = [
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
    defaultOpen: true,
    options: [
      { id: "black", label: "Black", swatch: "#0C0C0C" },
      { id: "white", label: "White", swatch: "#FFFFFF", defaultChecked: true },
      { id: "red", label: "Red", swatch: "#CA2929" },
      { id: "green", label: "Green", swatch: "#748C70" },
      { id: "yellow", label: "Yellow", swatch: "#E8C547" },
      { id: "dark-blue", label: "Dark Blue", swatch: "#1E3A5F" },
      { id: "purple", label: "Purple", swatch: "#9B8AA6" },
      { id: "pink", label: "Pink", swatch: "#E8A0BF" },
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

export const SHOP_ALL_FILTERS_DEFAULT_OPEN = SHOP_ALL_FILTERS.filter(
  (group) => group.defaultOpen
).map((group) => group.id)

export const SHOP_ALL_HERO_SLIDES = [
  {
    src: "/images/shop-all/hero-wide.png",
    alt: "Modimal lookbook featuring an olive wrap top against a bright sky",
    objectPosition: "left center",
  },
  {
    src: "/images/shop-all/hero-wide.png",
    alt: "Modimal lookbook featuring a white tee, olive trousers, and woven bag",
    objectPosition: "right center",
  },
] as const

export const SHOP_ALL_PRODUCTS: Product[] = [
  ...BEST_SELLERS,
  {
    id: "wrap-top",
    name: "Wrap Top",
    subtitle: "Soft Linen",
    price: 120,
    image: "/images/products/wrap-top/main.webp",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Sage", hex: "#748C70" },
    ],
    isNew: true,
  },
  ...PANTS_SEARCH_RESULTS.slice(0, 5).map((product) => ({
    ...product,
    id: `shop-${product.id}`,
  })),
]
