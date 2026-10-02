export const CATALOG_SORTS = [
  "featured",
  "best-selling",
  "price-asc",
  "price-desc",
] as const

export type CatalogSort = (typeof CATALOG_SORTS)[number]

export const CATALOG_SORT_OPTIONS: Array<{ id: CatalogSort; label: string }> = [
  { id: "featured", label: "Featured" },
  { id: "best-selling", label: "Best Seller" },
  { id: "price-asc", label: "Price: Low To High" },
  { id: "price-desc", label: "Price: High To Low" },
]

export const parseCatalogSort = (value?: string | string[]): CatalogSort => {
  const raw = Array.isArray(value) ? value[0] : value
  if (
    raw === "best-selling" ||
    raw === "price-asc" ||
    raw === "price-desc" ||
    raw === "featured"
  ) {
    return raw
  }

  return "featured"
}

export const parseCatalogFilters = (value?: string | string[]) => {
  const list = !value ? [] : Array.isArray(value) ? value : [value]

  return list.flatMap((item) => {
    try {
      const parsed = JSON.parse(item) as unknown
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return [parsed as Record<string, unknown>]
      }
    } catch {
      return []
    }

    return []
  })
}

export const catalogHref = (
  pathname: string,
  current: URLSearchParams,
  updates: { sort?: CatalogSort; filters?: string[] }
) => {
  const params = new URLSearchParams(current.toString())

  if (updates.sort) {
    if (updates.sort === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", updates.sort)
    }
  }

  if (updates.filters) {
    params.delete("filter")
    updates.filters.forEach((filter) => {
      params.append("filter", filter)
    })
  }

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}
