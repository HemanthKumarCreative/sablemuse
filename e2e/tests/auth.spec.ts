import { expect, test } from "../helpers/fixtures"
import { gotoPath, isLargeDesktop, main, mainTextbox, pageHeading } from "../helpers/shop"

test.describe("Authentication", () => {
  test("login form can be filled and password visibility toggled", async ({
    page,
  }) => {
    await gotoPath(page, "/login")
    await expect(pageHeading(page, "Log In")).toBeVisible()
    await mainTextbox(page, "Email").fill("ada@modimal.test")
    const password = mainTextbox(page, "Password")
    await password.fill("secret-pass")
    await expect(password).toHaveAttribute("type", "password")
    await page.getByRole("button", { name: "Show password" }).click()
    await expect(password).toHaveAttribute("type", "text")
    await page.getByRole("button", { name: "Hide password" }).click()
    await expect(password).toHaveAttribute("type", "password")
    await page.getByRole("button", { name: "Log In" }).click()
    await expect(page).toHaveURL(/\/login$/)
  })

  test("login links to create account", async ({ page }) => {
    await gotoPath(page, "/login")
    await page.getByRole("link", { name: "Create An Account" }).click()
    await expect(page).toHaveURL(/\/register$/)
    await expect(pageHeading(page, "Create Account")).toBeVisible()
  })

  test("register shows a verify-email dialog after submit", async ({ page }) => {
    await gotoPath(page, "/register")
    await mainTextbox(page, "First Name").fill("Ada")
    await mainTextbox(page, "Last Name").fill("Lovelace")
    await mainTextbox(page, "Email").fill("ada@modimal.test")
    await mainTextbox(page, "Password").fill("secret-pass")
    await page.getByRole("button", { name: "Register Now" }).click()

    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("heading", { name: "Verify Your Email" })).toBeVisible()
    await expect(dialog.getByText("ada@modimal.test")).toBeVisible()
  })

  test("register can change the submitted email", async ({ page }) => {
    await gotoPath(page, "/register")
    await mainTextbox(page, "Email").fill("ada@modimal.test")
    await page.getByRole("button", { name: "Register Now" }).click()
    await page.getByRole("dialog").getByRole("button", { name: "Click Here" }).click()
    await expect(page.getByRole("dialog")).toHaveCount(0)
    await expect(mainTextbox(page, "Email")).toBeFocused()
  })

  test("login and register show a side image on large screens", async ({
    page,
  }) => {
    await gotoPath(page, "/login")
    const loginImage = page.getByRole("img", { name: /Modimal model/i })

    if (isLargeDesktop(page)) {
      await expect(loginImage.first()).toBeVisible()
      return
    }

    await expect(loginImage.first()).toBeVisible()
  })
})
