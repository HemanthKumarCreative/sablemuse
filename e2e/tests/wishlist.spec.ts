import { expect, test } from "../helpers/fixtures"
import { gotoPath, visibleWishlistLink } from "../helpers/shop"

test.describe("Wishlist", () => {
  test("lists saved items and can open a product", async ({ page }) => {
    await gotoPath(page, "/wishlist")
    await expect(page.getByRole("heading", { name: "My Wish List" })).toBeVisible()
    await expect(page.getByText(/1 item/i)).toBeVisible()
    const card = page.getByRole("link", { name: /View Casual Wild Leg/i })
    await expect(card).toBeVisible()
    await card.click()
    await expect(page).toHaveURL(/\/product\/wishlist-casual-wild-leg$/)
  })

  test("header marks wishlist as the current page", async ({ page }) => {
    await gotoPath(page, "/wishlist")
    await expect(visibleWishlistLink(page)).toHaveAttribute("aria-current", "page")
  })
})
