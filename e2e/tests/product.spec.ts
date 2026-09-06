import { expect, test } from "../helpers/fixtures"
import { gotoPath, isLargeDesktop, pageHeading } from "../helpers/shop"

test.describe("Product detail", () => {
  test("wrap top shows gallery, colors, size select, and related products", async ({
    page,
  }) => {
    await gotoPath(page, "/product/wrap-top")
    await expect(pageHeading(page, "Wrap Top")).toBeVisible()
    await expect(page.getByRole("list", { name: "Available colors" })).toBeVisible()
    await expect(page.getByLabel("Select size")).toBeVisible()
    await expect(page.getByRole("button", { name: "Add To Cart" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "You May Also Like" })).toBeVisible()
  })

  test("color and size can be selected on wrap top", async ({ page }) => {
    await gotoPath(page, "/product/wrap-top")
    const white = page.getByRole("button", { name: "White" })
    const red = page.getByRole("button", { name: "Red" })
    await expect(red).toHaveAttribute("aria-pressed", "true")
    await white.click()
    await expect(white).toHaveAttribute("aria-pressed", "true")
    await page.getByLabel("Select size").selectOption("M")
    await expect(page.getByLabel("Select size")).toHaveValue("M")
  })

  test("size guide dialog opens from wrap top", async ({ page }) => {
    await gotoPath(page, "/product/wrap-top")
    await page.getByLabel("Open size guide").click()
    await expect(page.getByRole("heading", { name: /Women/i })).toBeVisible()
    await expect(page.getByRole("columnheader", { name: "Waist" })).toBeVisible()
  })

  test("wishlist control toggles on wrap top", async ({ page }) => {
    await gotoPath(page, "/product/wrap-top")
    const wishlist = page.getByRole("button", { name: "Add To Wishlist" })
    await wishlist.scrollIntoViewIfNeeded()
    await expect(wishlist).toHaveAttribute("aria-pressed", "false")
    await wishlist.click()
    await expect(wishlist).toHaveAttribute("aria-pressed", "true")
  })

  test("product accordion can expand shipping details", async ({ page }) => {
    await gotoPath(page, "/product/wrap-top")
    const trigger = page.getByRole("button", { name: /Shipping/i }).first()
    await trigger.click()
    await expect(page.getByText(/eligible for returns/i).first()).toBeVisible()
  })

  test("essential dress uses the priced cart CTA and material block on desktop", async ({
    page,
  }) => {
    await gotoPath(page, "/product/essential-dress")
    await expect(pageHeading(page, "Essential Dress")).toBeVisible()
    await expect(page.getByRole("button", { name: /Add To Cart \+ \$195/i })).toBeVisible()
    await page.getByRole("button", { name: "Sky" }).click()
    await expect(page.getByRole("button", { name: "Sky" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )

    if (isLargeDesktop(page)) {
      await expect(page.getByRole("heading", { name: "Cuproluxe" })).toBeVisible()
    }
  })

  test("unknown product ids return not found", async ({ page }) => {
    const response = await page.goto("/product/does-not-exist")
    expect(response?.status()).toBe(404)
  })
})
