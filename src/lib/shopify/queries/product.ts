import { shopifyFetch } from "../client"
import { shopifyConfig } from "../config"
import {
  IMAGE_FRAGMENT,
  MONEY_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_DETAIL_FRAGMENT,
} from "../fragments/product"
import { mapProductCard, mapProductDetail } from "../mappers/product"
import type { Product, ProductDetail } from "@/types/commerce"
import { BEST_SELLERS } from "@/data/home"
import { getProductById as getMockProductById } from "@/data/products"

type ProductsResponse = {
  products: {
    edges: Array<{ node: Parameters<typeof mapProductCard>[0] }>
  }
}

type ProductResponse = {
  product: (Parameters<typeof mapProductDetail>[0] & { id: string }) | null
}

type CollectionProductsResponse = {
  collection: {
    id: string
    title: string
    handle: string
    products: {
      edges: Array<{ node: Parameters<typeof mapProductCard>[0] }>
    }
  } | null
}

type RecommendationsResponse = {
  productRecommendations: Array<Parameters<typeof mapProductCard>[0]> | null
}

const withMockProducts = (products: Product[], limit?: number) => {
  if (products.length > 0) {
    return limit ? products.slice(0, limit) : products
  }

  if (!shopifyConfig.useMockFallback) {
    return []
  }

  return limit ? BEST_SELLERS.slice(0, limit) : BEST_SELLERS
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
    return withMockProducts(products, limit)
  } catch (error) {
    console.error("Failed to fetch products from Shopify", error)
    return withMockProducts([], limit)
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
      if (shopifyConfig.useMockFallback) {
        const mock = getMockProductById(handle)
        if (!mock) {
          return null
        }

        return {
          ...mock,
          gid: `gid://shopify/Product/mock-${mock.id}`,
          options: [
            { name: "Color", values: mock.colors.map((color) => color.name) },
            { name: "Size", values: mock.sizes },
          ],
          variants: mock.sizes.flatMap((size) =>
            mock.colors.map((color) => ({
              id: `gid://shopify/ProductVariant/mock-${mock.id}-${size}-${color.name}`,
              title: `${size} / ${color.name}`,
              availableForSale: true,
              price: mock.price,
              currencyCode: "USD",
              selectedOptions: [
                { name: "Size", value: size },
                { name: "Color", value: color.name },
              ],
              image: mock.image,
            }))
          ),
        }
      }

      return null
    }

    return mapProductDetail(data.product)
  } catch (error) {
    console.error("Failed to fetch product from Shopify", error)
    if (shopifyConfig.useMockFallback) {
      const mock = getMockProductById(handle)
      if (!mock) {
        return null
      }

      return {
        ...mock,
        gid: `gid://shopify/Product/mock-${mock.id}`,
        options: [
          { name: "Color", values: mock.colors.map((color) => color.name) },
          { name: "Size", values: mock.sizes },
        ],
        variants: [],
      }
    }

    return null
  }
}

export const getCollectionProducts = async (
  handle: string,
  limit = 24
): Promise<Product[]> => {
  try {
    const data = await shopifyFetch<CollectionProductsResponse>({
      query: `
        ${MONEY_FRAGMENT}
        ${IMAGE_FRAGMENT}
        ${PRODUCT_CARD_FRAGMENT}
        query getCollectionProducts($handle: String!, $first: Int!) {
          collection(handle: $handle) {
            id
            title
            handle
            products(first: $first) {
              edges {
                node {
                  ...ProductCardFields
                }
              }
            }
          }
        }
      `,
      variables: { handle, first: limit },
    })

    const products =
      data.collection?.products.edges.map(({ node }) => mapProductCard(node)) ??
      []

    if (products.length === 0) {
      return getProducts(limit)
    }

    return products
  } catch (error) {
    console.error("Failed to fetch collection products from Shopify", error)
    return getProducts(limit)
  }
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
