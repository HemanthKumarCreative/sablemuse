import { expect, test } from "../helpers/fixtures"
import { gotoPath } from "../helpers/shop"

test.describe("Sustainability", () => {
  test("landing page links to materials and mission", async ({ page }) => {
    await gotoPath(page, "/sustainability")
    await expect(page.getByRole("heading", { name: "Sustainability" })).toBeVisible()
    await page.getByRole("link", { name: "Explore Materials" }).click()
    await expect(page).toHaveURL(/\/sustainability\/materials$/)
    await expect(
      page.getByRole("heading", { name: "Sustainably Sourced Materials" })
    ).toBeVisible()

    await gotoPath(page, "/sustainability")
    await page.getByRole("link", { name: "Our Mission" }).click()
    await expect(page).toHaveURL(/\/sustainability\/mission$/)
    await expect(
      page.getByRole("heading", { name: "Sustainability At Modimal" })
    ).toBeVisible()
  })

  test("materials page lists fiber stories", async ({ page }) => {
    await gotoPath(page, "/sustainability/materials")
    await expect(page.getByRole("heading", { name: /Cotton/i }).first()).toBeVisible()
    await expect(page.getByRole("heading", { name: /Linen/i }).first()).toBeVisible()
  })

  test("mission pillars accordion can expand a closed item", async ({
    page,
  }) => {
    await gotoPath(page, "/sustainability/mission")
    await expect(page.getByRole("heading", { name: /Our Mission/i })).toBeVisible()
    await page.getByRole("button", { name: /Minimalism/i }).click()
    await expect(page.getByText(/fewer, better/i).or(page.getByText(/Minimalism/i)).first()).toBeVisible()
  })
})
