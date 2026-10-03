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

export type ProductLoadResult =
  | { status: "ready"; product: ProductDetail }
  | { status: "missing" }
  | { status: "error" }
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

const PRODUCT_QUERY = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_DETAIL_FRAGMENT}
  query getProduct($handle: String!, $mediaAfter: String, $variantAfter: String) {
    product(handle: $handle) {
      ...ProductDetailFields
    }
  }
`

type DetailNode = NonNullable<ProductResponse["product"]>
type MediaEdge = NonNullable<DetailNode["media"]>["edges"][number]
type VariantEdge = DetailNode["variants"]["edges"][number]

type Connection<T> = {
  pageInfo?: { hasNextPage: boolean; endCursor?: string | null }
  edges: T[]
}

export const getProduct = async (
  handle: string
): Promise<ProductLoadResult> => {
  try {
    let mediaAfter: string | null = null
    let variantAfter: string | null = null
    let product: ProductResponse["product"] = null
    let mediaEdges: MediaEdge[] = []
    let variantEdges: VariantEdge[] = []
    let readMedia = true
    let readVariants = true

    for (let page = 0; page < 20 && (readMedia || readVariants); page += 1) {
      const data = await shopifyFetch<ProductResponse>({
        query: PRODUCT_QUERY,
        variables: { handle, mediaAfter, variantAfter },
        revalidate: 60,
      })

      if (!data.product) {
        return { status: "missing" }
      }

      product = data.product
      const media = data.product.media as Connection<(typeof mediaEdges)[number]> | undefined
      const variants = data.product.variants as Connection<(typeof variantEdges)[number]>

      if (readMedia) {
        mediaEdges = mediaEdges.concat(media?.edges ?? [])
      }
      if (readVariants) {
        variantEdges = variantEdges.concat(variants.edges ?? [])
      }

      readMedia = Boolean(media?.pageInfo?.hasNextPage && media.pageInfo.endCursor)
      readVariants = Boolean(
        variants.pageInfo?.hasNextPage && variants.pageInfo.endCursor
      )
      mediaAfter = readMedia ? media?.pageInfo?.endCursor ?? null : mediaAfter
      variantAfter = readVariants ? variants.pageInfo?.endCursor ?? null : variantAfter
    }

    if (!product) {
      return { status: "missing" }
    }

    return {
      status: "ready",
      product: mapProductDetail({
        ...product,
        media: { edges: mediaEdges },
        variants: { edges: variantEdges },
      }),
    }
  } catch (error) {
    console.error("Failed to fetch product from Shopify", error)
    return { status: "error" }
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
