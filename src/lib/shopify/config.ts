const trimEnv = (value?: string) => value?.trim() || undefined

export const shopifyConfig = {
  domain: trimEnv(process.env.SHOPIFY_STORE_DOMAIN),
  storefrontAccessToken: trimEnv(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  apiVersion: trimEnv(process.env.SHOPIFY_STOREFRONT_API_VERSION) ?? "2025-10",
  /** Legacy admin-created custom app token (`shpat_...`). Optional if client credentials are set. */
  adminAccessToken: trimEnv(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN),
  /** Dev Dashboard app credentials (preferred for new Shopify apps). */
  adminClientId: trimEnv(process.env.SHOPIFY_ADMIN_CLIENT_ID),
  adminClientSecret: trimEnv(process.env.SHOPIFY_ADMIN_CLIENT_SECRET),
  adminApiVersion:
    trimEnv(process.env.SHOPIFY_ADMIN_API_VERSION) ??
    trimEnv(process.env.SHOPIFY_STOREFRONT_API_VERSION) ??
    "2025-10",
}

export const isAdminConfigured = () =>
  Boolean(
    shopifyConfig.domain &&
      (shopifyConfig.adminAccessToken ||
        (shopifyConfig.adminClientId && shopifyConfig.adminClientSecret))
  )

export const getStorefrontEndpoint = () => {
  if (!shopifyConfig.domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  }

  return `https://${shopifyConfig.domain}/api/${shopifyConfig.apiVersion}/graphql.json`
}

export const getAdminEndpoint = () => {
  if (!shopifyConfig.domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  }

  return `https://${shopifyConfig.domain}/admin/api/${shopifyConfig.adminApiVersion}/graphql.json`
}

export const assertStorefrontConfigured = () => {
  if (!shopifyConfig.domain || !shopifyConfig.storefrontAccessToken) {
    throw new Error(
      "Shopify Storefront is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    )
  }
}

export const assertAdminConfigured = () => {
  if (!isAdminConfigured()) {
    throw new Error(
      "Shopify Admin is not configured. Set SHOPIFY_ADMIN_CLIENT_ID and SHOPIFY_ADMIN_CLIENT_SECRET (Dev Dashboard), or SHOPIFY_ADMIN_ACCESS_TOKEN for a legacy custom app. Scopes: read_customers, write_customers."
    )
  }
}
