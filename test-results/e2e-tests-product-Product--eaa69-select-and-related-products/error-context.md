# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\product.spec.ts >> Product detail >> wrap top shows gallery, colors, size select, and related products
- Location: e2e\tests\product.spec.ts:5:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/product/wrap-top", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | import { expect, type Locator, type Page } from "@playwright/test"
  2   | 
  3   | export const getViewportWidth = (page: Page) => page.viewportSize()?.width ?? 1280
  4   | 
  5   | export const isMobileViewport = (page: Page) => getViewportWidth(page) < 768
  6   | 
  7   | export const isLargeDesktop = (page: Page) => getViewportWidth(page) >= 1024
  8   | 
  9   | export const header = (page: Page) => page.locator("header").first()
  10  | 
  11  | export const footer = (page: Page) => page.locator("footer").first()
  12  | 
  13  | export const main = (page: Page) => page.locator("main")
  14  | 
  15  | export const pageHeading = (page: Page, name: string | RegExp) =>
  16  |   page.getByRole("heading", { name, level: 1 })
  17  | 
  18  | export const mainTextbox = (page: Page, name: string | RegExp) =>
  19  |   main(page).getByRole("textbox", { name, exact: typeof name === "string" })
  20  | 
  21  | export const visibleHeading = (
  22  |   root: Page | Locator,
  23  |   name: string | RegExp
  24  | ) => root.getByRole("heading", { name }).filter({ visible: true })
  25  | 
  26  | export const visibleCheckbox = (root: Page | Locator, name: string | RegExp) =>
  27  |   root.getByRole("checkbox", { name })
  28  | 
  29  | export const visibleSearchButton = (page: Page) =>
  30  |   header(page).getByRole("button", { name: /search/i })
  31  | 
  32  | export const visibleBagButton = (page: Page) =>
  33  |   header(page).getByRole("button", { name: /shopping bag/i })
  34  | 
  35  | export const visibleWishlistLink = (page: Page) =>
  36  |   header(page).locator('a[href="/wishlist"]').filter({ visible: true })
  37  | 
  38  | export const visibleAccountLink = (page: Page) =>
  39  |   header(page).locator('a[href="/login"]').filter({ visible: true })
  40  | 
  41  | export const gotoPath = async (page: Page, path: string) => {
> 42  |   await page.goto(path, { waitUntil: "domcontentloaded" })
      |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  43  |   await expect(header(page)).toBeVisible()
  44  | }
  45  | 
  46  | export const assertNoHorizontalOverflow = async (page: Page) => {
  47  |   const overflow = await page.evaluate(() => {
  48  |     const root = document.documentElement
  49  |     return root.scrollWidth > root.clientWidth + 2
  50  |   })
  51  | 
  52  |   expect(overflow, "page should not overflow horizontally").toBeFalsy()
  53  | }
  54  | 
  55  | export const assertShellVisible = async (page: Page) => {
  56  |   await expect(header(page)).toBeVisible()
  57  |   await expect(page.locator("main")).toBeVisible()
  58  |   await expect(footer(page)).toBeVisible()
  59  | }
  60  | 
  61  | export const openSearch = async (page: Page) => {
  62  |   await visibleSearchButton(page).click()
  63  |   await expect(page.getByRole("search", { name: "Site search" })).toBeVisible()
  64  |   return page.getByRole("searchbox", { name: /search products/i })
  65  | }
  66  | 
  67  | export const openBag = async (page: Page) => {
  68  |   await visibleBagButton(page).click()
  69  |   const dialog = page.getByRole("dialog")
  70  |   await expect(dialog).toBeVisible()
  71  |   return dialog
  72  | }
  73  | 
  74  | export const openMobileMenu = async (page: Page) => {
  75  |   await header(page).getByRole("button", { name: "Open menu" }).click()
  76  |   const dialog = page.getByRole("dialog")
  77  |   await expect(dialog).toBeVisible()
  78  |   await expect(dialog.getByRole("navigation", { name: "Mobile" })).toBeVisible()
  79  |   return dialog
  80  | }
  81  | 
  82  | export const fillCheckoutInfo = async (page: Page) => {
  83  |   const form = main(page)
  84  |   await form.getByRole("textbox", { name: "Email", exact: true }).fill("ada@modimal.test")
  85  |   await form.getByRole("textbox", { name: "First Name" }).fill("Ada")
  86  |   await form.getByRole("textbox", { name: "Last Name" }).fill("Lovelace")
  87  |   await form.getByRole("textbox", { name: "Address", exact: true }).fill("12 Harmony Street")
  88  |   await form.getByRole("textbox", { name: "Postal Code" }).fill("10001")
  89  |   await form.getByRole("textbox", { name: "City" }).fill("New York")
  90  |   await form.getByRole("textbox", { name: "Phone" }).fill("9294603208")
  91  | }
  92  | 
  93  | export const fillPaymentForm = async (page: Page) => {
  94  |   const sameAsShipping = page.getByLabel(/Default \(Same As Shipping Address\)/i)
  95  | 
  96  |   if (await sameAsShipping.count()) {
  97  |     await sameAsShipping.check()
  98  |   }
  99  | 
  100 |   const form = main(page)
  101 |   await form.getByRole("textbox", { name: "Card Number" }).fill("4111111111111111")
  102 |   await form.getByRole("textbox", { name: "Expiry Month" }).fill("12")
  103 |   await form.getByRole("textbox", { name: "Expiry Year" }).fill("2030")
  104 |   await form.getByRole("textbox", { name: "Security Code" }).fill("123")
  105 | }
  106 | 
  107 | export const fillContactForm = async (form: Locator, options?: { modal?: boolean }) => {
  108 |   await form.getByLabel("Full Name").fill("Ada Lovelace")
  109 |   await form.getByLabel("Email").fill("ada@modimal.test")
  110 | 
  111 |   if (options?.modal) {
  112 |     await form.getByLabel("Subject").selectOption("Order Inquiry")
  113 |   } else {
  114 |     await form.getByLabel("Subject").fill("Order question")
  115 |   }
  116 | 
  117 |   await form.getByLabel("Order Number").fill("MD-1001")
  118 |   await form.getByLabel("Message").fill("Please confirm the status of my order.")
  119 |   await form.getByRole("checkbox", { name: /I have read and understood/i }).check()
  120 | }
  121 | 
  122 | export const waitForCartHydration = async (page: Page, expectedCount: number) => {
  123 |   const bag = visibleBagButton(page)
  124 | 
  125 |   if (expectedCount === 0) {
  126 |     await expect(bag).toHaveAttribute("aria-label", "Shopping bag")
  127 |     return
  128 |   }
  129 | 
  130 |   await expect(bag).toHaveAttribute(
  131 |     "aria-label",
  132 |     `Shopping bag, ${expectedCount} items`
  133 |   )
  134 | }
  135 | 
```