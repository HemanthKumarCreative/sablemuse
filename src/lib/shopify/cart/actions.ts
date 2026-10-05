"use server"

import { revalidatePath } from "next/cache"
import { clearCartId, getCartId, setCartId } from "./cookies"
import {
  addCartDeliveryAddress,
  addCartLines,
  createCart,
  getCart,
  getCartWithDelivery,
  removeCartLines,
  updateCartBuyerIdentity,
  updateCartLines,
  updateSelectedDeliveryOption,
} from "../mutations/cart"
import type { CartSummary, DeliveryGroup } from "@/types/commerce"

const emptyCart = (): CartSummary => ({
  id: "",
  checkoutUrl: "",
  totalQuantity: 0,
  subtotal: 0,
  currencyCode: "USD",
  items: [],
})

export const fetchCart = async (): Promise<CartSummary> => {
  const cartId = await getCartId()
  if (!cartId) {
    return emptyCart()
  }

  try {
    const cart = await getCart(cartId)
    if (!cart) {
      return emptyCart()
    }

    return cart
  } catch (error) {
    console.error("Failed to fetch cart", error)
    return emptyCart()
  }
}

export const fetchCartDelivery = async (): Promise<{
  cart: CartSummary
  deliveryGroups: DeliveryGroup[]
}> => {
  const cartId = await getCartId()
  if (!cartId) {
    return { cart: emptyCart(), deliveryGroups: [] }
  }

  const result = await getCartWithDelivery(cartId)
  if (!result) {
    return { cart: emptyCart(), deliveryGroups: [] }
  }

  return result
}

export const buyNowAction = async (merchandiseId: string) => {
  const cart = await createCart([{ merchandiseId, quantity: 1 }])

  if (!cart.checkoutUrl) {
    throw new Error("Checkout is unavailable right now")
  }

  return cart.checkoutUrl
}

export const addToCartAction = async (input: {
  merchandiseId: string
  quantity?: number
}) => {
  const quantity = input.quantity ?? 1
  const cartId = await getCartId()

  let cart

  if (cartId) {
    try {
      cart = await addCartLines(cartId, [
        { merchandiseId: input.merchandiseId, quantity },
      ])
    } catch (e) {
      console.warn("Failed to add to existing cart, creating new cart", e)
      cart = await createCart([{ merchandiseId: input.merchandiseId, quantity }])
    }
  } else {
    cart = await createCart([{ merchandiseId: input.merchandiseId, quantity }])
  }

  await setCartId(cart.id)
  revalidatePath("/", "layout")
  return cart
}

export const updateCartLineAction = async (input: {
  lineId: string
  quantity: number
}) => {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error("Cart not found")
  }

  const cart =
    input.quantity <= 0
      ? await removeCartLines(cartId, [input.lineId])
      : await updateCartLines(cartId, [
          { id: input.lineId, quantity: input.quantity },
        ])

  await setCartId(cart.id)
  revalidatePath("/", "layout")
  return cart
}

export const removeCartLineAction = async (lineId: string) => {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error("Cart not found")
  }

  const cart = await removeCartLines(cartId, [lineId])
  await setCartId(cart.id)
  revalidatePath("/", "layout")
  return cart
}

export const clearCartAction = async () => {
  await clearCartId()
  revalidatePath("/", "layout")
}

export const updateCheckoutInfoAction = async (input: {
  email: string
  phone?: string
  countryCode: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  zip: string
  provinceCode?: string
  customerAccessToken?: string
}) => {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error("Cart not found")
  }

  await updateCartBuyerIdentity(cartId, {
    email: input.email,
    phone: input.phone,
    countryCode: input.countryCode,
    customerAccessToken: input.customerAccessToken,
  })

  const cart = await addCartDeliveryAddress(cartId, {
    address1: input.address1,
    address2: input.address2,
    city: input.city,
    company: input.company,
    countryCode: input.countryCode,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    provinceCode: input.provinceCode,
    zip: input.zip,
  })

  await setCartId(cart.id)
  revalidatePath("/checkout")
  return cart
}

export const selectDeliveryOptionAction = async (input: {
  groupId: string
  deliveryOptionHandle: string
}) => {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error("Cart not found")
  }

  const cart = await updateSelectedDeliveryOption(
    cartId,
    input.groupId,
    input.deliveryOptionHandle
  )

  await setCartId(cart.id)
  revalidatePath("/checkout")
  return cart
}

export const getCheckoutUrlAction = async () => {
  const cart = await fetchCart()
  if (!cart.checkoutUrl) {
    throw new Error("Checkout URL unavailable")
  }

  return cart.checkoutUrl
}
