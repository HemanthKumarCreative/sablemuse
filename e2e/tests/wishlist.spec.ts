import { expect, test } from "../helpers/fixtures"
import { gotoPath, visibleWishlistLink } from "../helpers/shop"

test.describe("Wishlist", () => {
  test("shows empty wishlist by default", async ({ page }) => {
    await gotoPath(page, "/wishlist")
    await expect(page.getByRole("heading", { name: "My Wish List" })).toBeVisible()
    await expect(page.getByText(/0 items/i)).toBeVisible()
    await expect(
      page.getByText(/Your wish list is empty/i)
    ).toBeVisible()
  })

  test("header marks wishlist as the current page", async ({ page }) => {
    await gotoPath(page, "/wishlist")
    await expect(visibleWishlistLink(page)).toHaveAttribute("aria-current", "page")
  })
})
