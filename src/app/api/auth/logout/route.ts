import { NextResponse } from "next/server"
import { getCustomerLogoutUrl } from "@/lib/customer/auth"
import { clearCustomerSession } from "@/lib/customer/session"

export const GET = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  await clearCustomerSession()
  const logoutUrl = await getCustomerLogoutUrl()

  if (logoutUrl.startsWith("http")) {
    return NextResponse.redirect(logoutUrl)
  }

  return NextResponse.redirect(new URL(logoutUrl, siteUrl))
}
