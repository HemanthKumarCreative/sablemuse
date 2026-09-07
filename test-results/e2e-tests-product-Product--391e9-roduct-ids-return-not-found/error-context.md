# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\product.spec.ts >> Product detail >> unknown product ids return not found
- Location: e2e\tests\product.spec.ts:67:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/product/does-not-exist", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "../helpers/fixtures"
  2  | import { gotoPath, isLargeDesktop, pageHeading } from "../helpers/shop"
  3  | 
  4  | test.describe("Product detail", () => {
  5  |   test("wrap top shows gallery, colors, size select, and related products", async ({
  6  |     page,
  7  |   }) => {
  8  |     await gotoPath(page, "/product/wrap-top")
  9  |     await expect(pageHeading(page, "Wrap Top")).toBeVisible()
  10 |     await expect(page.getByRole("list", { name: "Available colors" }).first()).toBeVisible()
  11 |     await expect(page.getByLabel("Select size")).toBeVisible()
  12 |     await expect(page.getByRole("button", { name: "Add To Cart" })).toBeVisible()
  13 |     await expect(page.getByRole("heading", { name: "You May Also Like" })).toBeVisible()
  14 |   })
  15 | 
  16 |   test("color and size can be selected on wrap top", async ({ page }) => {
  17 |     await gotoPath(page, "/product/wrap-top")
  18 |     const white = page.getByRole("button", { name: "White" })
  19 |     const red = page.getByRole("button", { name: "Red" })
  20 |     await expect(red).toHaveAttribute("aria-pressed", "true")
  21 |     await white.click()
  22 |     await expect(white).toHaveAttribute("aria-pressed", "true")
  23 |     await page.getByLabel("Select size").selectOption("M")
  24 |     await expect(page.getByLabel("Select size")).toHaveValue("M")
  25 |   })
  26 | 
  27 |   test("size guide dialog opens from wrap top", async ({ page }) => {
  28 |     await gotoPath(page, "/product/wrap-top")
  29 |     await page.getByLabel("Open size guide").click()
  30 |     await expect(page.getByRole("heading", { name: /Women/i })).toBeVisible()
  31 |     await expect(page.getByRole("columnheader", { name: "Waist" })).toBeVisible()
  32 |   })
  33 | 
  34 |   test("wishlist control toggles on wrap top", async ({ page }) => {
  35 |     await gotoPath(page, "/product/wrap-top")
  36 |     const wishlist = page.getByRole("button", { name: "Add To Wishlist" })
  37 |     await wishlist.scrollIntoViewIfNeeded()
  38 |     await expect(wishlist).toHaveAttribute("aria-pressed", "false")
  39 |     await wishlist.click()
  40 |     await expect(wishlist).toHaveAttribute("aria-pressed", "true")
  41 |   })
  42 | 
  43 |   test("product accordion can expand shipping details", async ({ page }) => {
  44 |     await gotoPath(page, "/product/wrap-top")
  45 |     const trigger = page.getByRole("button", { name: /Shipping/i }).first()
  46 |     await trigger.click()
  47 |     await expect(page.getByText(/eligible for returns/i).first()).toBeVisible()
  48 |   })
  49 | 
  50 |   test("essential dress uses the priced cart CTA and material block on desktop", async ({
  51 |     page,
  52 |   }) => {
  53 |     await gotoPath(page, "/product/essential-dress")
  54 |     await expect(pageHeading(page, "Essential Dress")).toBeVisible()
  55 |     await expect(page.getByRole("button", { name: /Add To Cart \+ \$195/i })).toBeVisible()
  56 |     await page.getByRole("button", { name: "Sky" }).click()
  57 |     await expect(page.getByRole("button", { name: "Sky" })).toHaveAttribute(
  58 |       "aria-pressed",
  59 |       "true"
  60 |     )
  61 | 
  62 |     if (isLargeDesktop(page)) {
  63 |       await expect(page.getByRole("heading", { name: "Cuproluxe" })).toBeVisible()
  64 |     }
  65 |   })
  66 | 
  67 |   test("unknown product ids return not found", async ({ page }) => {
> 68 |     const response = await page.goto("/product/does-not-exist")
     |                                 ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  69 |     expect(response?.status()).toBe(404)
  70 |   })
  71 | })
  72 | 
```