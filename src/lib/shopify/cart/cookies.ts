import { cookies } from "next/headers"

export const CART_COOKIE = "modimal_cart_id"

export const getCartId = async () => {
  const store = await cookies()
  return store.get(CART_COOKIE)?.value
}

export const setCartId = async (cartId: string) => {
  const store = await cookies()
  store.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  })
}

export const clearCartId = async () => {
  const store = await cookies()
  store.delete(CART_COOKIE)
}
