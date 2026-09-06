import { expect, test } from "../helpers/fixtures"
import { fillContactForm, gotoPath, isMobileViewport } from "../helpers/shop"

test.describe("Contact us", () => {
  test("desktop write-us form submits a message", async ({ page }) => {
    test.skip(isMobileViewport(page), "inline form starts at md")
    await gotoPath(page, "/contact-us")
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Write Us" })).toBeVisible()

    const form = page.locator("form").filter({ has: page.getByLabel("Full Name") })
    await fillContactForm(form)
    await form.getByRole("button", { name: "Send" }).click()
    await expect(form.getByRole("status")).toContainText(/your message is on its way/i)
  })

  test("desktop contact cards expose chat, call, and email", async ({
    page,
  }) => {
    test.skip(isMobileViewport(page), "channel cards start at md")
    await gotoPath(page, "/contact-us")
    await expect(page.getByRole("heading", { name: "Chat With Us" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Call Us" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Email Us" })).toBeVisible()
    await expect(page.getByRole("button", { name: /929/ })).toBeVisible()
    await expect(page.getByRole("button", { name: "Send Email" })).toBeVisible()
  })

  test("mobile write-us dialog can send a message", async ({ page }) => {
    test.skip(!isMobileViewport(page), "write-us dialog is mobile-only")
    await gotoPath(page, "/contact-us")
    await page.getByRole("button", { name: "Write Us" }).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await fillContactForm(dialog.locator("form"), { modal: true })
    await dialog.getByRole("button", { name: "Send" }).click()
    await expect(dialog).toBeHidden()
  })

  test("mobile channel accordion can expand call us", async ({ page }) => {
    test.skip(!isMobileViewport(page), "accordion channels are mobile-only")
    await gotoPath(page, "/contact-us")
    await page.getByRole("button", { name: /Call Us/i }).click()
    await expect(page.getByRole("button", { name: /929/ })).toBeVisible()
  })
})
