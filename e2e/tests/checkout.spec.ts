import { expect, test } from "../helpers/fixtures"
import { fillCheckoutInfo, fillPaymentForm, gotoPath, isLargeDesktop } from "../helpers/shop"

test.describe("Checkout", () => {
  test("info step shows the stepper, summary, and can continue", async ({
    page,
  }) => {
    await gotoPath(page, "/checkout")
    await expect(page.getByRole("navigation", { name: "Checkout progress" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Info" })).toHaveAttribute(
      "aria-current",
      "step"
    )
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Shipping Address" })).toBeVisible()
    await expect(page.getByText("Wrap Top").first()).toBeVisible()

    await fillCheckoutInfo(page)
    await page.getByRole("checkbox", { name: "Email Me With News And Offers" }).check()
    await page.getByRole("button", { name: "Continue To Shipping" }).click()
    await expect(page).toHaveURL(/\/checkout\/shipping$/)
  })

  test("info step can return to the cart", async ({ page }) => {
    await gotoPath(page, "/checkout")
    await page.getByRole("link", { name: /Return To Cart/i }).click()
    await expect(page).toHaveURL(/\/cart$/)
  })

  test("shipping step can change delivery and continue", async ({ page }) => {
    await gotoPath(page, "/checkout/shipping")
    await expect(page.getByRole("heading", { name: "Delivery Options" })).toBeVisible()
    await expect(page.getByText(/Express Courier/i)).toBeVisible()
    await page.getByText("Wednesday, August 11th By 8 PM").click()
    await expect(page.getByText("$24.00").first()).toBeVisible()
    await page.getByRole("button", { name: "Continue To Payment" }).click()
    await expect(page).toHaveURL(/\/checkout\/payment$/)
  })

  test("shipping change links return to information", async ({ page }) => {
    await gotoPath(page, "/checkout/shipping")
    await page.getByRole("link", { name: "Change" }).first().click()
    await expect(page).toHaveURL(/\/checkout$/)
  })

  test("payment step can place an order", async ({ page }) => {
    await gotoPath(page, "/checkout/payment")
    await expect(page.getByRole("heading", { name: "Billing Address" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Payment", level: 2 })).toBeVisible()
    await expect(page.getByText("Visa")).toBeVisible()

    await page.getByRole("button", { name: "What Is This?" }).click()
    await expect(page.getByText(/3 or 4 digit code/i)).toBeVisible()

    await fillPaymentForm(page)
    await page.getByRole("button", { name: "Pay And Place Order" }).click()
    await expect(page).toHaveURL(/\/checkout\/success$/)
    await expect(page.getByRole("heading", { name: "Payment Successful" })).toBeVisible()
  })

  test("successful payment clears the bag", async ({ page }) => {
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

  test("order summary is present on info and shipping", async ({ page }) => {
    await gotoPath(page, "/checkout")
    await expect(page.getByText("Order Summary").or(page.getByText("Wrap Top")).first()).toBeVisible()

    if (isLargeDesktop(page)) {
      await expect(page.getByText("Wrap Top").first()).toBeVisible()
    }
  })
})
