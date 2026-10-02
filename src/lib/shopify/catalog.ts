import type { CatalogSort } from "@/lib/catalog-params"
import type { Product } from "@/types/commerce"
import { shopifyFetch } from "./client"
import {
  IMAGE_FRAGMENT,
  MONEY_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from "./fragments/product"
import { mapProductCard } from "./mappers/product"

export type CatalogSource =
  | { kind: "collection"; handle: string }
  | { kind: "products" }
  | { kind: "search"; query: string }

export type CatalogFilterValue = {
  id: string
  label: string
  count: number
  input: string
}

export type CatalogFilterGroup = {
  id: string
  label: string
  type: string
  values: CatalogFilterValue[]
}

export type CatalogPage = {
  products: Product[]
  hasNextPage: boolean
  endCursor: string | null
  totalCount: number | null
  filters: CatalogFilterGroup[]
}

type ShopifyFilter = {
  id: string
  label: string
  type?: string | null
  values: Array<{
    id: string
    label: string
    count: number
    input: unknown
  }>
}

type ProductEdge = {
  node: Parameters<typeof mapProductCard>[0]
}

const FILTER_FIELDS = `
  id
  label
  type
  values {
    id
    label
    count
    input
  }
`

const emptyPage = (): CatalogPage => ({
  products: [],
  hasNextPage: false,
  endCursor: null,
  totalCount: null,
  filters: [],
})

const filterInputString = (input: unknown) => {
  if (typeof input === "string") {
    try {
      return JSON.stringify(JSON.parse(input))
    } catch {
      return input
    }
  }

  if (input && typeof input === "object") {
    return JSON.stringify(input)
  }

  return ""
}

const mapFilters = (filters?: ShopifyFilter[] | null): CatalogFilterGroup[] =>
  (filters ?? [])
    .map((filter) => ({
      id: filter.id,
      label: filter.label,
      type: filter.type ?? "LIST",
      values: filter.values.flatMap((value) => {
        const input = filterInputString(value.input)
        if (!input) {
          return []
        }

        return [
          {
            id: value.id,
            label: value.label,
            count: value.count,
            input,
          },
        ]
      }),
    }))
    .filter((filter) => filter.values.length > 0)

const mapEdges = (edges?: ProductEdge[]) =>
  (edges ?? [])
    .map(({ node }) => (node?.handle ? mapProductCard(node) : null))
    .filter((product): product is Product => Boolean(product))

const collectionSort = (sort: CatalogSort) => {
  if (sort === "best-selling") {
    return { sortKey: "BEST_SELLING", reverse: false }
  }
  if (sort === "price-asc") {
    return { sortKey: "PRICE", reverse: false }
  }
  if (sort === "price-desc") {
    return { sortKey: "PRICE", reverse: true }
  }
  return { sortKey: "COLLECTION_DEFAULT", reverse: false }
}

const productSort = (sort: CatalogSort) => {
  if (sort === "best-selling") {
    return { sortKey: "BEST_SELLING", reverse: false }
  }
  if (sort === "price-asc") {
    return { sortKey: "PRICE", reverse: false }
  }
  if (sort === "price-desc") {
    return { sortKey: "PRICE", reverse: true }
  }
  return { sortKey: "CREATED_AT", reverse: true }
}

const searchSort = (sort: CatalogSort) => {
  if (sort === "price-asc") {
    return { sortKey: "PRICE", reverse: false }
  }
  if (sort === "price-desc") {
    return { sortKey: "PRICE", reverse: true }
  }
  return { sortKey: "RELEVANCE", reverse: false }
}

const filtersToProductQuery = (filters: Array<Record<string, unknown>>) => {
  const parts = filters.flatMap((filter) => {
    if (typeof filter.available === "boolean") {
      return [`available_for_sale:${filter.available}`]
    }

    if (typeof filter.tag === "string") {
      return [`tag:"${filter.tag.replace(/"/g, "")}"`]
    }

    if (typeof filter.productType === "string") {
      return [`product_type:"${filter.productType.replace(/"/g, "")}"`]
    }

    const price = filter.price
    if (price && typeof price === "object") {
      const range = price as { min?: number; max?: number }
      const clauses = []
      if (typeof range.min === "number") {
        clauses.push(`variants.price:>=${range.min}`)
      }
      if (typeof range.max === "number") {
        clauses.push(`variants.price:<=${range.max}`)
      }
      return clauses
    }

    return []
  })

  return parts.join(" ")
}

const fetchSearchFilters = async () => {
  try {
    const data = await shopifyFetch<{
      search: { productFilters: ShopifyFilter[] }
    }>({
      query: `
        query catalogFacetFilters {
          search(query: "*", first: 1, types: PRODUCT) {
            productFilters { ${FILTER_FIELDS} }
          }
        }
      `,
    })

    return mapFilters(data.search.productFilters)
  } catch (error) {
    console.error("Failed to fetch catalog filters", error)
    return []
  }
}

export const getCatalogPage = async ({
  source,
  limit = 24,
  cursor,
  sort = "featured",
  filters = [],
}: {
  source: CatalogSource
  limit?: number
  cursor?: string | null
  sort?: CatalogSort
  filters?: Array<Record<string, unknown>>
}): Promise<CatalogPage> => {
  try {
    if (source.kind === "collection") {
      const sorted = collectionSort(sort)
      const data = await shopifyFetch<{
        collection: {
          products: {
            filters: ShopifyFilter[]
            pageInfo: { hasNextPage: boolean; endCursor: string | null }
            edges: ProductEdge[]
          }
        } | null
      }>({
        query: `
          ${MONEY_FRAGMENT}
          ${IMAGE_FRAGMENT}
          ${PRODUCT_CARD_FRAGMENT}
          query catalogCollection(
            $handle: String!
            $first: Int!
            $after: String
            $sortKey: ProductCollectionSortKeys
            $reverse: Boolean
            $filters: [ProductFilter!]
          ) {
            collection(handle: $handle) {
              products(
                first: $first
                after: $after
                sortKey: $sortKey
                reverse: $reverse
                filters: $filters
              ) {
                filters { ${FILTER_FIELDS} }
                pageInfo { hasNextPage endCursor }
                edges { node { ...ProductCardFields } }
              }
            }
          }
        `,
        variables: {
          handle: source.handle,
          first: limit,
          after: cursor || null,
          sortKey: sorted.sortKey,
          reverse: sorted.reverse,
          filters,
        },
      })

      if (!data.collection) {
        return emptyPage()
      }

      return {
        products: mapEdges(data.collection.products.edges),
        hasNextPage: data.collection.products.pageInfo.hasNextPage,
        endCursor: data.collection.products.pageInfo.endCursor,
        totalCount: null,
        filters: mapFilters(data.collection.products.filters),
      }
    }

    if (source.kind === "search") {
      const sorted = searchSort(sort)
      const data = await shopifyFetch<{
        search: {
          totalCount: number
          productFilters: ShopifyFilter[]
          pageInfo: { hasNextPage: boolean; endCursor: string | null }
          edges: ProductEdge[]
        }
      }>({
        query: `
          ${MONEY_FRAGMENT}
          ${IMAGE_FRAGMENT}
          ${PRODUCT_CARD_FRAGMENT}
          query catalogSearch(
            $query: String!
            $first: Int!
            $after: String
            $sortKey: SearchSortKeys
            $reverse: Boolean
            $productFilters: [ProductFilter!]
          ) {
            search(
              query: $query
              first: $first
              after: $after
              sortKey: $sortKey
              reverse: $reverse
              types: PRODUCT
              productFilters: $productFilters
            ) {
              totalCount
              productFilters { ${FILTER_FIELDS} }
              pageInfo { hasNextPage endCursor }
              edges {
                node {
                  ... on Product {
                    ...ProductCardFields
                  }
                }
              }
            }
          }
        `,
        variables: {
          query: source.query,
          first: limit,
          after: cursor || null,
          sortKey: sorted.sortKey,
          reverse: sorted.reverse,
          productFilters: filters,
        },
        cache: "no-store",
      })

      return {
        products: mapEdges(data.search.edges),
        hasNextPage: data.search.pageInfo.hasNextPage,
        endCursor: data.search.pageInfo.endCursor,
        totalCount: data.search.totalCount,
        filters: mapFilters(data.search.productFilters),
      }
    }

    const sorted = productSort(sort)
    const query = filtersToProductQuery(filters)
    const data = await shopifyFetch<{
      products: {
        filters: ShopifyFilter[]
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
        edges: ProductEdge[]
      }
    }>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query catalogProducts(
          $first: Int!
          $after: String
          $sortKey: ProductSortKeys
          $reverse: Boolean
          $query: String
        ) {
          products(
            first: $first
            after: $after
            sortKey: $sortKey
            reverse: $reverse
            query: $query
          ) {
            filters { ${FILTER_FIELDS} }
            pageInfo { hasNextPage endCursor }
            edges { node { ...ProductCardFields } }
          }
        }
      `,
      variables: {
        first: limit,
        after: cursor || null,
        sortKey: sorted.sortKey,
        reverse: sorted.reverse,
        query: query || null,
      },
    })

    const filtersFromProducts = mapFilters(data.products.filters)

    return {
      products: mapEdges(data.products.edges),
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
      totalCount: null,
      filters:
        filtersFromProducts.length > 0
          ? filtersFromProducts
          : await fetchSearchFilters(),
    }
  } catch (error) {
    console.error("Failed to fetch catalog page", error)
    return emptyPage()
  }
}
