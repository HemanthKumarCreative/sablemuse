import { shopifyFetch } from "../client"
import {
  IMAGE_FRAGMENT,
  MONEY_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_DETAIL_FRAGMENT,
} from "../fragments/product"
import { mapProductCard, mapProductDetail } from "../mappers/product"
import { getCatalogPage } from "../catalog"
import type { Product, ProductDetail } from "@/types/commerce"
type ProductsResponse = {
  products: {
    edges: Array<{ node: Parameters<typeof mapProductCard>[0] }>
  }
}

type ProductResponse = {
  product: (Parameters<typeof mapProductDetail>[0] & { id: string }) | null
}

type RecommendationsResponse = {
  productRecommendations: Array<Parameters<typeof mapProductCard>[0]> | null
}



export const getProducts = async (limit = 12): Promise<Product[]> => {
  try {
    const data = await shopifyFetch<ProductsResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query getProducts($first: Int!) {
          products(first: $first) {
            edges {
              node {
                ...ProductCardFields
              }
            }
          }
        }
      `,
      variables: { first: limit },
    })

    const products = data.products.edges.map(({ node }) => mapProductCard(node))
    return products
  } catch (error) {
    console.error("Failed to fetch products from Shopify", error)
    return []
  }
}

export const getProduct = async (
  handle: string
): Promise<ProductDetail | null> => {
  try {
    const data = await shopifyFetch<ProductResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_DETAIL_FRAGMENT}
        query getProduct($handle: String!) {
          product(handle: $handle) {
            ...ProductDetailFields
          }
        }
      `,
      variables: { handle },
    })

    if (!data.product) {
      return null
    }

    return mapProductDetail(data.product)
  } catch (error) {
    console.error("Failed to fetch product from Shopify", error)
    return null
  }
}

export const getCollectionProducts = async (
  handle: string,
  limit = 24
): Promise<Product[]> => {
  const page = await getCatalogPage({
    source: { kind: "collection", handle },
    limit,
  })
  return page.products
}

export const getProductRecommendations = async (
  productId: string,
  limit = 4
): Promise<Product[]> => {
  try {
    const data = await shopifyFetch<RecommendationsResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query getProductRecommendations($productId: ID!) {
          productRecommendations(productId: $productId) {
            ...ProductCardFields
          }
        }
      `,
      variables: { productId },
    })

    const products =
      data.productRecommendations?.map((node) => mapProductCard(node)) ?? []

    return products.slice(0, limit)
  } catch (error) {
    console.error("Failed to fetch product recommendations", error)
    return []
  }
}
