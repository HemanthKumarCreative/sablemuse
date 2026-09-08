import { expect, test } from "../helpers/fixtures"
import { fillCheckoutInfo, gotoPath, isLargeDesktop } from "../helpers/shop"

test.describe("Checkout", () => {
  test("info step shows the stepper and contact form", async ({ page }) => {
    await gotoPath(page, "/checkout")
    await expect(page.getByRole("navigation", { name: "Checkout progress" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Info" })).toHaveAttribute(
      "aria-current",
      "step"
    )
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Shipping Address" })).toBeVisible()
    await fillCheckoutInfo(page)
    await page.getByRole("checkbox", { name: "Email Me With News And Offers" }).check()
  })

  test("info step can return to the cart", async ({ page }) => {
    await gotoPath(page, "/checkout")
    await page.getByRole("link", { name: /Return To Cart/i }).click()
    await expect(page).toHaveURL(/\/cart$/)
  })

  test("shipping step shows delivery options heading", async ({ page }) => {
    await gotoPath(page, "/checkout/shipping")
    await expect(page.getByRole("heading", { name: "Delivery Options" })).toBeVisible()
    await page.getByRole("link", { name: "Change" }).first().click()
    await expect(page).toHaveURL(/\/checkout$/)
  })

  test("payment step shows secure Shopify payment CTA", async ({ page }) => {
    await gotoPath(page, "/checkout/payment")
    await expect(page.getByRole("heading", { name: "Payment", level: 2 })).toBeVisible()
    await expect(page.getByText(/securely on Shopify Checkout/i)).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Continue To Secure Payment" })
    ).toBeVisible()
    await expect(page.getByRole("link", { name: /Return To Shipping/i })).toBeVisible()
  })

  test("success page clears the bag label", async ({ page }) => {
    await gotoPath(page, "/checkout/success")
    await expect(page.getByRole("heading", { name: "Payment Successful" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Shopping bag" })).toBeVisible()
  })

  test("payment failure page can retry", async ({ page }) => {
    await gotoPath(page, "/checkout/error")
    await expect(page.getByRole("heading", { name: /Sorry, Payment Failed/i })).toBeVisible()
    await page.getByRole("link", { name: "Retry" }).click()
    await expect(page).toHaveURL(/\/checkout\/payment$/)
  })

  test("order summary region is present on info", async ({ page }) => {
    await gotoPath(page, "/checkout")
    await expect(
      page.getByText("Order Summary").or(page.getByRole("heading", { name: "Contact" }))
    ).toBeVisible()

    if (isLargeDesktop(page)) {
      await expect(page.getByText("Order Summary").first()).toBeVisible()
    }
  })
})
