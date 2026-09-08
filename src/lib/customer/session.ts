import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { customerConfig } from "./config"

const ACCESS_COOKIE = "modimal_customer_access"
const REFRESH_COOKIE = "modimal_customer_refresh"
const PKCE_COOKIE = "modimal_customer_pkce"

type SessionPayload = {
  accessToken: string
  refreshToken?: string
  expiresAt: number
}

const sign = (value: string) => {
  if (!customerConfig.sessionSecret) {
    throw new Error("Missing CUSTOMER_SESSION_SECRET")
  }

  return createHmac("sha256", customerConfig.sessionSecret)
    .update(value)
    .digest("base64url")
}

const encode = (payload: unknown) => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${body}.${sign(body)}`
}

const decode = <T>(token?: string): T | null => {
  if (!token) {
    return null
  }

  const [body, signature] = token.split(".")
  if (!body || !signature) {
    return null
  }

  const expected = sign(body)
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T
  } catch {
    return null
  }
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

export const setPkceCookies = async (input: {
  verifier: string
  state: string
  nonce: string
}) => {
  const store = await cookies()
  store.set(PKCE_COOKIE, encode(input), {
    ...cookieOptions,
    maxAge: 60 * 10,
  })
}

export const getPkceCookies = async () => {
  const store = await cookies()
  return decode<{ verifier: string; state: string; nonce: string }>(
    store.get(PKCE_COOKIE)?.value
  )
}

export const clearPkceCookies = async () => {
  const store = await cookies()
  store.delete(PKCE_COOKIE)
}

export const setCustomerSession = async (session: SessionPayload) => {
  const store = await cookies()
  store.set(ACCESS_COOKIE, encode(session), {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  })

  if (session.refreshToken) {
    store.set(REFRESH_COOKIE, encode({ refreshToken: session.refreshToken }), {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    })
  }
}

export const getCustomerSession = async (): Promise<SessionPayload | null> => {
  const store = await cookies()
  const session = decode<SessionPayload>(store.get(ACCESS_COOKIE)?.value)
  if (!session) {
    return null
  }

  if (session.expiresAt <= Date.now()) {
    return null
  }

  return session
}

export const clearCustomerSession = async () => {
  const store = await cookies()
  store.delete(ACCESS_COOKIE)
  store.delete(REFRESH_COOKIE)
  store.delete(PKCE_COOKIE)
}
