import { shopifyConfig } from "../config"

type CachedAdminToken = {
  accessToken: string
  expiresAt: number
}

let cachedToken: CachedAdminToken | null = null

const shopSubdomain = () => {
  const domain = shopifyConfig.domain
  if (!domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  }

  return domain.replace(/\.myshopify\.com$/i, "")
}

const fetchClientCredentialsToken = async () => {
  const clientId = shopifyConfig.adminClientId
  const clientSecret = shopifyConfig.adminClientSecret

  if (!clientId || !clientSecret) {
    throw new Error(
      "Shopify Admin client credentials are not configured. Set SHOPIFY_ADMIN_CLIENT_ID and SHOPIFY_ADMIN_CLIENT_SECRET."
    )
  }

  const response = await fetch(
    `https://${shopSubdomain()}.myshopify.com/admin/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: "no-store",
    }
  )

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(
      detail
        ? `Admin token request failed (${response.status}): ${detail}`
        : `Admin token request failed (${response.status})`
    )
  }

  const body = (await response.json()) as {
    access_token?: string
    expires_in?: number
  }

  if (!body.access_token) {
    throw new Error("Admin token response did not include access_token")
  }

  const expiresInSeconds = body.expires_in ?? 86399
  cachedToken = {
    accessToken: body.access_token,
    expiresAt: Date.now() + expiresInSeconds * 1000,
  }

  return cachedToken.accessToken
}

export const getAdminAccessToken = async () => {
  if (shopifyConfig.adminAccessToken) {
    return shopifyConfig.adminAccessToken
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.accessToken
  }

  return fetchClientCredentialsToken()
}
