import {
  assertAdminConfigured,
  getAdminEndpoint,
} from "../config"
import { getAdminAccessToken } from "./token"

type AdminFetchOptions = {
  query: string
  variables?: Record<string, unknown>
}

type ShopifyError = {
  message: string
}

export const adminFetch = async <T>({
  query,
  variables = {},
}: AdminFetchOptions): Promise<T> => {
  assertAdminConfigured()

  const accessToken = await getAdminAccessToken()

  const result = await fetch(getAdminEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const body = (await result.json()) as {
    data?: T
    errors?: ShopifyError[]
  }

  if (body.errors?.length) {
    throw new Error(body.errors[0]?.message ?? "Shopify Admin GraphQL error")
  }

  if (!body.data) {
    throw new Error("Shopify Admin returned an empty response")
  }

  return body.data
}
