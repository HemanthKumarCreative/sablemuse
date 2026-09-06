import { expect, test } from "../helpers/fixtures"
import {
  gotoPath,
  isMobileViewport,
  openBag,
  visibleBagButton,
  waitForCartHydration,
} from "../helpers/shop"

test.describe("Shopping bag and cart", () => {
  test("bag sheet lists seeded items and opens the cart page", async ({
    page,
  }) => {
    await gotoPath(page, "/")
    await waitForCartHydration(page, 3)
    const bag = await openBag(page)
    await expect(bag.getByRole("heading", { name: "Your Cart", exact: true })).toBeVisible()
    await expect(bag.getByRole("heading", { name: "Wrap Top" }).filter({ visible: true })).toBeVisible()
    await bag.getByRole("link", { name: "Check Out" }).click()
    await expect(page).toHaveURL(/\/cart$/)
    await expect(page.getByRole("heading", { name: "Your Cart", level: 1 })).toBeVisible()
  })

  test("cart page shows totals and continues to checkout", async ({ page }) => {
    await gotoPath(page, "/cart")
    await expect(page.getByRole("heading", { name: "Your Cart", level: 1 })).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Wrap Top" }).filter({ visible: true })
    ).toBeVisible()
    await expect(page.getByText("Subtotal (3)")).toBeVisible()
    await expect(page.getByText("Shipping", { exact: true })).toBeVisible()
    await expect(page.getByText("Free")).toBeVisible()
    await page.getByRole("link", { name: "Next" }).click()
    await expect(page).toHaveURL(/\/checkout$/)
  })

  test("quantity can be increased and decreased", async ({ page }) => {
    await gotoPath(page, "/cart")
    await page
      .getByRole("button", { name: "Increase quantity of Wrap Top" })
      .filter({ visible: true })
      .click()
    await expect(page.getByText("Subtotal (4)")).toBeVisible()
    await page
      .getByRole("button", { name: "Decrease quantity of Wrap Top" })
      .filter({ visible: true })
      .click()
    await expect(page.getByText("Subtotal (3)")).toBeVisible()
  })

  test("an item can be removed from the cart", async ({ page }) => {
    await gotoPath(page, "/cart")
    await page
      .getByRole("button", { name: "Remove Wrap Top from cart" })
      .filter({ visible: true })
      .click()
    await expect(page.getByText("Wrap Top")).toHaveCount(0)
    await expect(page.getByText("Subtotal (2)")).toBeVisible()
    await waitForCartHydration(page, 2)
  })

  test("cart layout switches between stacked and table views", async ({
    page,
  }) => {
    await gotoPath(page, "/cart")
    await expect(page.getByText("Order Summary").filter({ visible: true }).first()).toBeVisible()

    if (isMobileViewport(page)) {
      await expect(page.getByRole("link", { name: "Continue Shopping" })).toHaveCount(0)
      return
    }

    await expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible()
  })
})

test.describe("Empty cart", () => {
  test.use({ cart: "empty" })

  test("bag sheet shows discovery links when empty", async ({ page }) => {
    await gotoPath(page, "/")
    await waitForCartHydration(page, 0)
    const bag = await openBag(page)
    await expect(
      bag.getByRole("heading", { name: "Your Shopping Bag Is Empty" })
    ).toBeVisible()
    await bag.getByRole("link", { name: "Collection" }).click()
    await expect(page).toHaveURL(/\/collection$/)
  })

  test("cart page empty state continues shopping", async ({ page }) => {
    await gotoPath(page, "/cart")
    await expect(page.getByText("Your shopping bag is empty.")).toBeVisible()
    await page.getByRole("link", { name: "Continue Shopping" }).click()
    await expect(page).toHaveURL(/\/collection$/)
  })

  test("bag badge has no item count when empty", async ({ page }) => {
    await gotoPath(page, "/")
    await waitForCartHydration(page, 0)
    await expect(visibleBagButton(page)).toHaveAttribute("aria-label", "Shopping bag")
  })
})
