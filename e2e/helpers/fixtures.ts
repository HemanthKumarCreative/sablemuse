import { test as base } from "@playwright/test"
import { CART_STORAGE_KEY, SAMPLE_CART_ITEMS, WELCOME_STORAGE_KEY } from "./constants"
import type { CartItem } from "./types"

type ShopFixtures = {
  dismissWelcome: boolean
  cart: "sample" | "empty" | CartItem[]
}

export const test = base.extend<ShopFixtures>({
  dismissWelcome: [true, { option: true }],
  cart: ["sample", { option: true }],

  page: async ({ page, dismissWelcome, cart }, use) => {
    await page.addInitScript(
      ({ dismissWelcome, cart, welcomeKey, cartKey }) => {
        if (dismissWelcome) {
          window.localStorage.setItem(welcomeKey, "true")
        } else {
          window.localStorage.removeItem(welcomeKey)
        }

        if (cart === "empty") {
          window.localStorage.setItem(cartKey, "[]")
          return
        }

        if (cart === "sample") {
          window.localStorage.removeItem(cartKey)
          return
        }

        window.localStorage.setItem(cartKey, JSON.stringify(cart))
      },
      {
        dismissWelcome,
        cart,
        welcomeKey: WELCOME_STORAGE_KEY,
        cartKey: CART_STORAGE_KEY,
      }
    )

    await use(page)
  },
})

export { expect } from "@playwright/test"
export { SAMPLE_CART_ITEMS }
