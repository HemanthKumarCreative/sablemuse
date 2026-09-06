import { expect, test } from "../helpers/fixtures"
import {
  assertShellVisible,
  footer,
  gotoPath,
  isMobileViewport,
  pageHeading,
  visibleSearchButton,
} from "../helpers/shop"

test.describe("Home", () => {
  test("renders hero, catalog sections, and site chrome", async ({ page }) => {
    await gotoPath(page, "/")
    await assertShellVisible(page)
    await expect(page).toHaveTitle(/Modimal/i)
    await expect(page.getByRole("heading", { name: /Elegance in simplicity/i })).toBeVisible()
    await expect(page.getByRole("button", { name: "New In", exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Best Sellers" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Collection" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "ModiWeek" })).toBeVisible()
    await expect(visibleSearchButton(page)).toBeVisible()
    await expect(footer(page).getByRole("heading", { name: /Join our club/i })).toBeVisible()
  })

  test("hero CTA opens New In", async ({ page }) => {
    await gotoPath(page, "/")
    await page.getByRole("button", { name: "New In", exact: true }).click()
    await expect(page).toHaveURL(/\/new-in$/)
    await expect(page.getByRole("heading", { name: "New In" })).toBeVisible()
  })

  test("best seller card opens a product page", async ({ page }) => {
    await gotoPath(page, "/")
    const card = page.getByRole("link", { name: /View Tailored Shirt/i }).first()
    await expect(card).toBeVisible()
    await card.click()
    await expect(page).toHaveURL(/\/product\/1$/)
  })

  test("newsletter form can be filled from the footer", async ({ page }) => {
    await gotoPath(page, "/")
    const email = footer(page).getByLabel("Email address")
    await email.scrollIntoViewIfNeeded()
    await email.fill("ada@modimal.test")
    await footer(page).getByRole("button", { name: "Subscribe to newsletter" }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(email).toHaveValue("ada@modimal.test")
  })

  test("footer help links reach FAQ and contact", async ({ page }) => {
    await gotoPath(page, "/")
    await footer(page).getByRole("link", { name: "FAQs" }).click()
    await expect(page).toHaveURL(/\/faq$/)
    await expect(page.getByRole("heading", { name: "FAQs" })).toBeVisible()

    await footer(page).getByRole("link", { name: "Contact Us" }).click()
    await expect(page).toHaveURL(/\/contact-us$/)
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible()
  })

  test("mobile home uses a product carousel for best sellers", async ({ page }) => {
    test.skip(!isMobileViewport(page), "carousel is mobile-only")
    await gotoPath(page, "/")
    await expect(page.getByRole("region", { name: "Best sellers", exact: true })).toBeVisible()
  })
})

test.describe("Welcome dialog", () => {
  test.use({ dismissWelcome: false })

  test("shows on a first visit and can be dismissed", async ({ page }) => {
    await page.goto("/")
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("heading", { name: "Welcome To Modimal" })).toBeVisible()
    await dialog.getByRole("button", { name: "Close welcome" }).click()
    await expect(dialog).toBeHidden()
    await expect(page.getByRole("heading", { name: /Elegance in simplicity/i })).toBeVisible()
  })

  test("create-your-style CTA goes to collection and stays dismissed", async ({
    page,
  }) => {
    await page.goto("/")
    const dialog = page.getByRole("dialog")
    await expect(dialog.getByRole("heading", { name: "Welcome To Modimal" })).toBeVisible()
    await dialog.getByText("Create Your Own Style").click()
    await expect(page).toHaveURL(/\/collection$/)
    await expect(pageHeading(page, "Collection")).toBeVisible()
    await expect(page.getByRole("dialog")).toHaveCount(0)
  })
})
