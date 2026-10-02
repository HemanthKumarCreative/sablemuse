"use server"

import { parseCatalogFilters, type CatalogSort } from "@/lib/catalog-params"
import { getCatalogPage, type CatalogSource } from "./catalog"

export const loadMoreCatalog = async (input: {
  source: CatalogSource
  cursor: string
  sort: CatalogSort
  filters: string[]
}) =>
  getCatalogPage({
    source: input.source,
    cursor: input.cursor,
    sort: input.sort,
    filters: parseCatalogFilters(input.filters),
    limit: 24,
  })
