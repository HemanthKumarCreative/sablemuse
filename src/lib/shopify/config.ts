const trimEnv = (value?: string) => value?.trim() || undefined

export const shopifyConfig = {
  domain: trimEnv(process.env.SHOPIFY_STORE_DOMAIN),
  storefrontAccessToken: trimEnv(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  apiVersion: trimEnv(process.env.SHOPIFY_STOREFRONT_API_VERSION) ?? "2025-10",
  useMockFallback:
    process.env.NODE_ENV === "production"
      ? process.env.SHOPIFY_USE_MOCK_FALLBACK === "true"
      : process.env.SHOPIFY_USE_MOCK_FALLBACK !== "false",
}

export const getStorefrontEndpoint = () => {
  if (!shopifyConfig.domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  }

  return `https://${shopifyConfig.domain}/api/${shopifyConfig.apiVersion}/graphql.json`
}

export const assertStorefrontConfigured = () => {
  if (!shopifyConfig.domain || !shopifyConfig.storefrontAccessToken) {
    throw new Error(
      "Shopify Storefront is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    )
  }
}
