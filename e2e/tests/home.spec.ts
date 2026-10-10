import { expect, test } from "../helpers/fixtures"
import {
  assertShellVisible,
  footer,
  gotoPath,
  isMobileViewport,
} from "../helpers/shop"

test.describe("Home", () => {
  test("renders hero, catalog sections, and site chrome", async ({ page }) => {
    await gotoPath(page, "/")
    await assertShellVisible(page)
    await expect(page).toHaveTitle(/Sable Muse/i)
    await expect(page.getByRole("heading", { name: /Everyday women's clothing/i })).toBeVisible()
    await expect(page.getByRole("button", { name: "Shop New Arrivals", exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Dresses & Jumpsuits" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Tops & Blouses" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Jeans & Pants" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Matching Sets & Lounge" })).toBeVisible()
    await expect(footer(page).getByRole("link", { name: "Free US shipping" })).toBeVisible()
    await expect(footer(page).getByRole("link", { name: "Returns within 7 days" })).toBeVisible()
    await expect(footer(page).getByRole("link", { name: "support@sablemuse.shop", exact: true })).toBeVisible()
    await expect(footer(page).getByRole("heading", { name: /Get new arrivals and shipping updates/i })).toBeVisible()
    await expect(footer(page).getByText(/Saved to Sable Muse in Shopify/i)).toBeVisible()
    await expect(footer(page).getByRole("link", { name: "Privacy Policy" })).toBeVisible()
    await expect(footer(page).getByRole("link", { name: "Terms of Service" })).toBeVisible()
  })

  test("hero CTA opens new arrivals", async ({ page }) => {
    await gotoPath(page, "/")
    await page.getByRole("button", { name: "Shop New Arrivals", exact: true }).click()
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible()
  })

  test("product card opens a product page", async ({ page }) => {
    await gotoPath(page, "/")
    const card = page.getByRole("link", { name: /^View /i }).first()
    await expect(card).toBeVisible()
    await card.click()
    await expect(page).toHaveURL(/\/product\/[^/]+$/)
  })

  test("newsletter form can be filled from the footer", async ({ page }) => {
    await gotoPath(page, "/")
    const email = footer(page).getByLabel("Email address")
    await email.scrollIntoViewIfNeeded()
    await email.fill("ada@sablemuse.test")
    await footer(page).getByRole("button", { name: "Email support@sablemuse.shop" }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(email).toHaveValue("ada@sablemuse.test")
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
    await expect(page.getByRole("region", { name: "New arrivals", exact: true })).toBeVisible()
  })
})
