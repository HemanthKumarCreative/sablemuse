import { expect, test } from "../helpers/fixtures"
import { gotoPath, isMobileViewport } from "../helpers/shop"

test.describe("Modiweek", () => {
  test("index redirects to Saturday", async ({ page }) => {
    await gotoPath(page, "/modiweek")
    await expect(page).toHaveURL(/\/modiweek\/saturday$/)
    await expect(page.getByRole("heading", { name: "Saturday" })).toBeVisible()
  })

  test("day page shows the look and other days", async ({ page }) => {
    await gotoPath(page, "/modiweek/monday")
    await expect(page.getByRole("heading", { name: "Monday" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Shop The Look" })).toBeVisible()
    await expect(page.getByRole("navigation", { name: "ModiWeek days" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "More Days" })).toBeVisible()
  })

  test("day nav can switch to Friday", async ({ page }) => {
    await gotoPath(page, "/modiweek/saturday")
    await page.getByRole("navigation", { name: "ModiWeek days" }).getByRole("link", { name: /Friday/i }).click()
    await expect(page).toHaveURL(/\/modiweek\/friday$/)
    await expect(page.getByRole("heading", { name: "Friday" })).toBeVisible()
  })

  test("desktop look section links to shop all", async ({ page }) => {
    test.skip(isMobileViewport(page), "Shop All in the look header is md+")
    await gotoPath(page, "/modiweek/saturday")
    await page.getByRole("link", { name: "Shop All" }).first().click()
    await expect(page).toHaveURL(/\/shop-all$/)
  })
})
