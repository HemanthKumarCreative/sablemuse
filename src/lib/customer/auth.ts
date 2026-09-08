import {
  customerConfig,
  getCustomerDiscoveryUrl,
  isCustomerAuthConfigured,
} from "./config"
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateNonce,
  generateState,
} from "./pkce"
import {
  clearPkceCookies,
  setCustomerSession,
  setPkceCookies,
} from "./session"

type OpenIdConfig = {
  authorization_endpoint: string
  token_endpoint: string
  end_session_endpoint?: string
}

export const getOpenIdConfig = async (): Promise<OpenIdConfig> => {
  const response = await fetch(getCustomerDiscoveryUrl(), {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to load Customer Account OpenID configuration")
  }

  return (await response.json()) as OpenIdConfig
}

export const startCustomerLogin = async () => {
  if (!isCustomerAuthConfigured()) {
    throw new Error("Customer Account API is not configured")
  }

  const config = await getOpenIdConfig()
  const verifier = generateCodeVerifier()
  const challenge = generateCodeChallenge(verifier)
  const state = generateState()
  const nonce = generateNonce()

  await setPkceCookies({ verifier, state, nonce })

  const url = new URL(config.authorization_endpoint)
  url.searchParams.set("client_id", customerConfig.clientId!)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("redirect_uri", customerConfig.callbackUrl)
  url.searchParams.set("scope", customerConfig.scopes)
  url.searchParams.set("state", state)
  url.searchParams.set("nonce", nonce)
  url.searchParams.set("code_challenge", challenge)
  url.searchParams.set("code_challenge_method", "S256")

  return url.toString()
}

export const exchangeCustomerCode = async (input: {
  code: string
  state: string
  verifier: string
}) => {
  const config = await getOpenIdConfig()
  const response = await fetch(config.token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: customerConfig.clientId!,
      redirect_uri: customerConfig.callbackUrl,
      code: input.code,
      code_verifier: input.verifier,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Token exchange failed: ${text}`)
  }

  const token = (await response.json()) as {
    access_token: string
    refresh_token?: string
    expires_in: number
  }

  await setCustomerSession({
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + token.expires_in * 1000,
  })
  await clearPkceCookies()
}

export const getCustomerLogoutUrl = async () => {
  try {
    const config = await getOpenIdConfig()
    return config.end_session_endpoint ?? "/login"
  } catch {
    return "/login"
  }
}
