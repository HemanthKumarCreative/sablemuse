import { expect, test } from "../helpers/fixtures"
import {
  gotoPath,
  isMobileViewport,
  openBag,
  visibleBagButton,
  waitForCartHydration,
} from "../helpers/shop"

test.describe("Shopping bag and cart", () => {
  test("empty bag sheet shows continue shopping links", async ({ page }) => {
    await gotoPath(page, "/")
    await waitForCartHydration(page, 0)
    const bag = await openBag(page)
    await expect(bag.getByRole("heading", { name: /Your Shopping Bag Is Empty/i })).toBeVisible()
    await expect(bag.getByRole("link", { name: "Collection" })).toBeVisible()
  })

  test("cart page shows empty state and continue shopping", async ({ page }) => {
    await gotoPath(page, "/cart")
    await expect(page.getByRole("heading", { name: "Your Cart", level: 1 })).toBeVisible()
    await expect(page.getByText(/Your shopping bag is empty/i)).toBeVisible()
    await expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible()
  })

  test("bag button starts with empty aria label", async ({ page }) => {
    await gotoPath(page, "/")
    await waitForCartHydration(page, 0)
    await expect(visibleBagButton(page)).toHaveAttribute("aria-label", "Shopping bag")
  })

  test("cart layout empty state works on mobile and desktop", async ({
    page,
  }) => {
    await gotoPath(page, "/cart")
    await expect(page.getByRole("heading", { name: "Your Cart", level: 1 })).toBeVisible()

    if (isMobileViewport(page)) {
      await expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible()
      return
    }

    await expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible()
  })
})
