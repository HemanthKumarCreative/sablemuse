import { expect, test } from "../helpers/fixtures"
import { gotoPath } from "../helpers/shop"

test.describe("Retired lookbook routes", () => {
  test("modiweek index redirects to new arrivals", async ({ page }) => {
    await gotoPath(page, "/modiweek")
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
  })

  test("a modiweek day redirects to new arrivals", async ({ page }) => {
    await gotoPath(page, "/modiweek/monday")
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
  })
})
