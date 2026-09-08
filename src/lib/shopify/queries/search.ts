import { shopifyFetch } from "../client"
import { shopifyConfig } from "../config"
import {
  IMAGE_FRAGMENT,
  MONEY_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from "../fragments/product"
import { mapProductCard } from "../mappers/product"
import type { Product } from "@/types/commerce"
import { getSearchResults as getMockSearchResults } from "@/data/search"

type SearchResponse = {
  search: {
    edges: Array<{
      node: Parameters<typeof mapProductCard>[0]
    }>
  }
}

type PredictiveSearchResponse = {
  predictiveSearch: {
    products: Array<Parameters<typeof mapProductCard>[0]>
  }
}

export const searchProducts = async (
  query: string,
  limit = 24
): Promise<Product[]> => {
  const trimmed = query.trim()
  if (!trimmed) {
    return []
  }

  try {
    const data = await shopifyFetch<SearchResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query searchProducts($query: String!, $first: Int!) {
          search(query: $query, first: $first, types: PRODUCT) {
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
      variables: { query: trimmed, first: limit },
      cache: "no-store",
    })

    const products = data.search.edges
      .map(({ node }) => {
        if (!node?.handle) {
          return null
        }

        return mapProductCard(node)
      })
      .filter((product): product is Product => Boolean(product))

    if (products.length === 0 && shopifyConfig.useMockFallback) {
      return getMockSearchResults(trimmed)
    }

    return products
  } catch (error) {
    console.error("Failed to search products", error)
    if (shopifyConfig.useMockFallback) {
      return getMockSearchResults(trimmed)
    }

    return []
  }
}

export const predictiveSearchProducts = async (
  query: string,
  limit = 8
): Promise<Product[]> => {
  const trimmed = query.trim()
  if (!trimmed) {
    return []
  }

  try {
    const data = await shopifyFetch<PredictiveSearchResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query predictiveSearchProducts($query: String!, $limit: Int!) {
          predictiveSearch(query: $query, limit: $limit, types: [PRODUCT]) {
            products {
              ...ProductCardFields
            }
          }
        }
      `,
      variables: { query: trimmed, limit },
      cache: "no-store",
    })

    return data.predictiveSearch.products.map((node) => mapProductCard(node))
  } catch (error) {
    console.error("Failed predictive search", error)
    return searchProducts(trimmed, limit)
  }
}
