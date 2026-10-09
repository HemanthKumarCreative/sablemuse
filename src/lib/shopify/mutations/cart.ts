import { shopifyFetch } from "../client"
import { CART_FRAGMENT } from "../fragments/cart"
import { mapCart, mapCartContact, mapDeliveryGroups } from "../mappers/product"
import type { CartSummary, DeliveryGroup } from "@/types/commerce"

type CartResponse = {
  cart: Parameters<typeof mapCart>[0] | null
}

type CartMutationResponse = {
  cartCreate?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartLinesAdd?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartLinesUpdate?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartLinesRemove?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartBuyerIdentityUpdate?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartDeliveryAddressesAdd?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
  cartSelectedDeliveryOptionsUpdate?: {
    cart: Parameters<typeof mapCart>[0] | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
}

const throwUserErrors = (
  userErrors?: Array<{ message: string }>
) => {
  if (userErrors?.length) {
    throw new Error(userErrors[0]?.message ?? "Cart mutation failed")
  }
}

export const getCart = async (cartId: string): Promise<CartSummary | null> => {
  const data = await shopifyFetch<CartResponse>({
    query: `
      ${CART_FRAGMENT}
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    variables: { cartId },
    cache: "no-store",
  })

  return data.cart ? mapCart(data.cart) : null
}

export const getCartWithDelivery = async (
  cartId: string
): Promise<{
  cart: CartSummary
  deliveryGroups: DeliveryGroup[]
  contactEmail: string
  shipToSummary: string
} | null> => {
  const data = await shopifyFetch<CartResponse>({
    query: `
      ${CART_FRAGMENT}
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    variables: { cartId },
    cache: "no-store",
  })

  if (!data.cart) {
    return null
  }

  return {
    cart: mapCart(data.cart),
    deliveryGroups: mapDeliveryGroups(data.cart),
    ...mapCartContact(data.cart),
  }
}

export const createCart = async (lines: Array<{ merchandiseId: string; quantity: number }>) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { lines },
    cache: "no-store",
  })

  throwUserErrors(data.cartCreate?.userErrors)
  if (!data.cartCreate?.cart) {
    throw new Error("Failed to create cart")
  }

  return mapCart(data.cartCreate.cart)
}

export const addCartLines = async (
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, lines },
    cache: "no-store",
  })

  throwUserErrors(data.cartLinesAdd?.userErrors)
  if (!data.cartLinesAdd?.cart) {
    throw new Error("Failed to add cart lines")
  }

  return mapCart(data.cartLinesAdd.cart)
}

export const updateCartLines = async (
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, lines },
    cache: "no-store",
  })

  throwUserErrors(data.cartLinesUpdate?.userErrors)
  if (!data.cartLinesUpdate?.cart) {
    throw new Error("Failed to update cart lines")
  }

  return mapCart(data.cartLinesUpdate.cart)
}

export const removeCartLines = async (cartId: string, lineIds: string[]) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, lineIds },
    cache: "no-store",
  })

  throwUserErrors(data.cartLinesRemove?.userErrors)
  if (!data.cartLinesRemove?.cart) {
    throw new Error("Failed to remove cart lines")
  }

  return mapCart(data.cartLinesRemove.cart)
}

export const updateCartBuyerIdentity = async (
  cartId: string,
  buyerIdentity: {
    email?: string
    phone?: string
    countryCode?: string
    customerAccessToken?: string
  }
) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, buyerIdentity },
    cache: "no-store",
  })

  throwUserErrors(data.cartBuyerIdentityUpdate?.userErrors)
  if (!data.cartBuyerIdentityUpdate?.cart) {
    throw new Error("Failed to update buyer identity")
  }

  return mapCart(data.cartBuyerIdentityUpdate.cart)
}

export const addCartDeliveryAddress = async (
  cartId: string,
  address: {
    address1: string
    address2?: string
    city: string
    company?: string
    countryCode: string
    firstName: string
    lastName: string
    phone?: string
    provinceCode?: string
    zip: string
  }
) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartDeliveryAddressesAdd($cartId: ID!, $addresses: [CartSelectableAddressInput!]!) {
        cartDeliveryAddressesAdd(cartId: $cartId, addresses: $addresses) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      addresses: [
        {
          selected: true,
          address: {
            deliveryAddress: address,
          },
        },
      ],
    },
    cache: "no-store",
  })

  throwUserErrors(data.cartDeliveryAddressesAdd?.userErrors)
  if (!data.cartDeliveryAddressesAdd?.cart) {
    throw new Error("Failed to add delivery address")
  }

  return mapCart(data.cartDeliveryAddressesAdd.cart)
}

export const updateSelectedDeliveryOption = async (
  cartId: string,
  groupId: string,
  deliveryOptionHandle: string
) => {
  const data = await shopifyFetch<CartMutationResponse>({
    query: `
      ${CART_FRAGMENT}
      mutation cartSelectedDeliveryOptionsUpdate(
        $cartId: ID!
        $selectedDeliveryOptions: [CartSelectedDeliveryOptionInput!]!
      ) {
        cartSelectedDeliveryOptionsUpdate(
          cartId: $cartId
          selectedDeliveryOptions: $selectedDeliveryOptions
        ) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      selectedDeliveryOptions: [{ deliveryGroupId: groupId, deliveryOptionHandle }],
    },
    cache: "no-store",
  })

  throwUserErrors(data.cartSelectedDeliveryOptionsUpdate?.userErrors)
  if (!data.cartSelectedDeliveryOptionsUpdate?.cart) {
    throw new Error("Failed to update delivery option")
  }

  return mapCart(data.cartSelectedDeliveryOptionsUpdate.cart)
}
