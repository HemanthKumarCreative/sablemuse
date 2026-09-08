import {
  assertStorefrontConfigured,
  getStorefrontEndpoint,
  shopifyConfig,
} from "./config"

type ShopifyFetchOptions = {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  revalidate?: number | false
}

type ShopifyError = {
  message: string
  extensions?: Record<string, unknown>
}

export const shopifyFetch = async <T>({
  query,
  variables = {},
  cache,
  revalidate = 3600,
}: ShopifyFetchOptions): Promise<T> => {
  assertStorefrontConfigured()

  const endpoint = getStorefrontEndpoint()
  const isMutation = /^\s*mutation\b/i.test(query)
  const nextOptions =
    isMutation || cache === "no-store" || revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate: typeof revalidate === "number" ? revalidate : 3600 } }

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyConfig.storefrontAccessToken!,
    },
    body: JSON.stringify({ query, variables }),
    ...nextOptions,
  })

  const body = (await result.json()) as {
    data?: T
    errors?: ShopifyError[]
  }

  if (body.errors?.length) {
    throw new Error(body.errors[0]?.message ?? "Shopify GraphQL error")
  }

  if (!body.data) {
    throw new Error("Shopify returned an empty response")
  }

  return body.data
}
