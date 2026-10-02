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


