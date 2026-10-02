import { expect, test } from "../helpers/fixtures"
import { gotoPath } from "../helpers/shop"

test.describe("Sustainability", () => {
  test("landing page links to materials and mission", async ({ page }) => {
    await gotoPath(page, "/sustainability")
    await expect(page.getByRole("heading", { name: "Our Story" })).toBeVisible()
    await page.getByRole("link", { name: "Care And Shipping" }).first().click()
    await expect(page).toHaveURL(/\/sustainability\/materials$/)
    await expect(
      page.getByRole("heading", { name: "Care And Shipping" })
    ).toBeVisible()

    await gotoPath(page, "/sustainability")
    await page.getByRole("link", { name: "Our Mission" }).click()
    await expect(page).toHaveURL(/\/sustainability\/mission$/)
    await expect(
      page.getByRole("heading", { name: "Our Mission" }).first()
    ).toBeVisible()
  })

  test("materials page lists fiber stories", async ({ page }) => {
    await gotoPath(page, "/sustainability/materials")
    await expect(page.getByRole("heading", { name: /Shipping/i }).first()).toBeVisible()
    await expect(page.getByRole("heading", { name: /Care/i }).first()).toBeVisible()
  })

  test("mission pillars accordion can expand a closed item", async ({
    page,
  }) => {
    await gotoPath(page, "/sustainability/mission")
    await expect(page.getByRole("heading", { name: /Our Mission/i })).toBeVisible()
    await page.getByRole("button", { name: /The Edit/i }).click()
    await expect(page.getByText(/new arrivals/i).first()).toBeVisible()
  })
})
