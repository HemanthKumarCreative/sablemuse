import { NextResponse } from "next/server"
import { exchangeCustomerCode } from "@/lib/customer/auth"
import { getPkceCookies } from "@/lib/customer/session"

export const GET = async (request: Request) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const error = url.searchParams.get("error")

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, siteUrl))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/login?error=missing_code", siteUrl))
  }

  const pkce = await getPkceCookies()
  if (!pkce || pkce.state !== state) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", siteUrl))
  }

  try {
    await exchangeCustomerCode({
      code,
      state,
      verifier: pkce.verifier,
    })
    return NextResponse.redirect(new URL("/", siteUrl))
  } catch (exchangeError) {
    console.error(exchangeError)
    return NextResponse.redirect(new URL("/login?error=exchange_failed", siteUrl))
  }
}
