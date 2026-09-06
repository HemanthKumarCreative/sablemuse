import { expect, test } from "../helpers/fixtures"
import { gotoPath } from "../helpers/shop"

test.describe("FAQ", () => {
  test("renders questions and default open answers", async ({ page }) => {
    await gotoPath(page, "/faq")
    await expect(page.getByRole("heading", { name: "FAQs" })).toBeVisible()
    await expect(
      page.getByRole("button", { name: /How Do I Contact Your Customer Service/i })
    ).toBeVisible()
    await expect(page.getByText(/Hello@Modimal.Com/i).first()).toBeVisible()
    await expect(page.getByText(/Size Guide/i).first()).toBeVisible()
  })

  test("a closed question can be expanded", async ({ page }) => {
    await gotoPath(page, "/faq")
    const trigger = page.getByRole("button", { name: /When Will My Order Ship/i })
    await trigger.click()
    await expect(page.getByText(/Typically Ship Within 1–2 Business Days/i)).toBeVisible()
  })

  test("breadcrumbs can return home", async ({ page }) => {
    await gotoPath(page, "/faq")
    await page.getByRole("navigation", { name: /breadcrumb/i }).getByRole("link", { name: "Home" }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})
