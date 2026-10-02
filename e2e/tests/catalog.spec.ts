import { expect, test } from "../helpers/fixtures"
import { gotoPath, isLargeDesktop } from "../helpers/shop"

test.describe("Catalog pages", () => {
  test("collection lists categories and best sellers", async ({ page }) => {
    await gotoPath(page, "/collection")
    await expect(page.getByRole("heading", { name: "Collection" })).toBeVisible()
    await expect(page.getByRole("link", { name: /Shop Shop All/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
  })

  test("collection Shop All card opens the shop listing", async ({ page }) => {
    await gotoPath(page, "/collection")
    await page.getByRole("link", { name: /Shop Shop All/i }).click()
    await expect(page).toHaveURL(/\/shop-all$/)
    await expect(page.getByRole("heading", { name: "Shop All" })).toBeAttached()
  })

  test("retired landings redirect to new arrivals", async ({ page }) => {
    await gotoPath(page, "/new-in")
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()

    await gotoPath(page, "/plus-size")
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
  })

  test("shop all shows products and breakpoint-specific filters", async ({
    page,
  }) => {
    await gotoPath(page, "/shop-all")
    await expect(page.getByRole("heading", { name: "Shop All" })).toBeAttached()
    await expect(page.getByRole("link", { name: /View /i }).first()).toBeVisible()

    if (isLargeDesktop(page)) {
      await expect(page.getByRole("heading", { name: "Filters" })).toBeVisible()
      return
    }

    await page.getByRole("button", { name: "Filter" }).click()
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Filters" }).first()).toBeVisible()
  })

  test("plus-size shop all redirects to new arrivals", async ({ page }) => {
    await gotoPath(page, "/plus-size/shop-all")
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
    await expect(page.getByRole("link", { name: /View /i }).first()).toBeVisible()
  })

  test("shop all product card opens a product detail page", async ({ page }) => {
    await gotoPath(page, "/shop-all")
    const firstCard = page.getByRole("link", { name: /View /i }).first()
    const label = await firstCard.getAttribute("aria-label")
    await firstCard.click()
    await expect(page).toHaveURL(/\/product\//)

    if (label?.includes("Wrap Top")) {
      await expect(page.getByRole("heading", { name: "Wrap Top" })).toBeVisible()
    }
  })
})
