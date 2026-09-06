import type { Product } from "@/data/home"
import type { SearchFilterGroup } from "@/data/search"
import { BEST_SELLERS } from "@/data/home"
import { PANTS_SEARCH_RESULTS } from "@/data/search"

export const SHOP_ALL_FILTERS: SearchFilterGroup[] = [
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
      { id: "xs", label: "XS" },
      { id: "s", label: "S", defaultChecked: true },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
    ],
  },
  {
    id: "color",
    label: "Color",
    defaultOpen: true,
    options: [
      { id: "black", label: "Black", swatch: "#0C0C0C", defaultChecked: true },
      { id: "white", label: "White", swatch: "#FFFFFF" },
      { id: "beige", label: "Beige", swatch: "#E8DFD0" },
      { id: "blue", label: "Blue", swatch: "#7DC3EB" },
      { id: "red", label: "Red", swatch: "#CA2929" },
      { id: "green", label: "Green", swatch: "#748C70" },
    ],
  },
  {
    id: "collection",
    label: "Collection",
    options: [
      { id: "blouses", label: "Blouses & Tops" },
      { id: "pants", label: "Pants" },
      { id: "dresses", label: "Dresses & Jumpsuits" },
      { id: "outwear", label: "Outwear & Jackets" },
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
