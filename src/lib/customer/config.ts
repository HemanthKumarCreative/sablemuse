const trimEnv = (value?: string) => value?.trim() || undefined

export const customerConfig = {
  clientId: trimEnv(process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID),
  shopId: trimEnv(process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID),
  callbackUrl:
    trimEnv(process.env.SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL) ??
    "http://localhost:3000/api/auth/callback",
  sessionSecret: trimEnv(process.env.CUSTOMER_SESSION_SECRET),
  scopes: "openid email customer-account-api:full",
}

export const isCustomerAuthConfigured = () =>
  Boolean(
    customerConfig.clientId &&
      customerConfig.shopId &&
      customerConfig.sessionSecret
  )

export const getCustomerDiscoveryUrl = () => {
  if (!customerConfig.shopId) {
    throw new Error("Missing SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID")
  }

  return `https://shopify.com/${customerConfig.shopId}/.well-known/openid-configuration`
}
