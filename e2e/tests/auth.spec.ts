import { expect, test } from "../helpers/fixtures"
import { gotoPath, isLargeDesktop, pageHeading } from "../helpers/shop"

test.describe("Authentication", () => {
  test("login offers Shopify customer account sign-in", async ({ page }) => {
    await gotoPath(page, "/login")
    await expect(pageHeading(page, "Log In")).toBeVisible()
    await expect(
      page.getByText(/Sign in securely with your Shopify customer account/i)
    ).toBeVisible()
    await expect(
      page.getByRole("link", { name: "Continue With Shopify" })
    ).toHaveAttribute("href", "/api/auth/login")
  })

  test("login links to create account", async ({ page }) => {
    await gotoPath(page, "/login")
    await page.getByRole("link", { name: "Create An Account" }).click()
    await expect(page).toHaveURL(/\/register$/)
    await expect(pageHeading(page, "Create Account")).toBeVisible()
  })

  test("register offers Shopify account creation", async ({ page }) => {
    await gotoPath(page, "/register")
    await expect(pageHeading(page, "Create Account")).toBeVisible()
    await expect(
      page.getByRole("link", { name: "Continue With Shopify" })
    ).toHaveAttribute("href", "/api/auth/login")
    await expect(page.getByRole("link", { name: "Log In" })).toBeVisible()
  })

  test("login and register show a side image on large screens", async ({
    page,
  }) => {
    await gotoPath(page, "/login")
    const loginImage = page.getByRole("img", { name: /Sable Muse outfit/i })

    if (isLargeDesktop(page)) {
      await expect(loginImage.first()).toBeVisible()
      return
    }

    await expect(loginImage.first()).toBeVisible()
  })
})
