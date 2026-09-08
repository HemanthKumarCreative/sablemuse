import { NextResponse } from "next/server"
import { startCustomerLogin } from "@/lib/customer/auth"
import { isCustomerAuthConfigured } from "@/lib/customer/config"

export const GET = async () => {
  if (!isCustomerAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/login?error=auth_not_configured", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
    )
  }

  try {
    const url = await startCustomerLogin()
    return NextResponse.redirect(url)
  } catch (error) {
    console.error(error)
    return NextResponse.redirect(
      new URL("/login?error=login_failed", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
    )
  }
}
