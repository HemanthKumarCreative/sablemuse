import { expect, type Locator, type Page } from "@playwright/test"

export const getViewportWidth = (page: Page) => page.viewportSize()?.width ?? 1280

export const isMobileViewport = (page: Page) => getViewportWidth(page) < 768

export const isLargeDesktop = (page: Page) => getViewportWidth(page) >= 1024

export const header = (page: Page) => page.locator("header").first()

export const footer = (page: Page) => page.locator("footer").first()

export const main = (page: Page) => page.locator("main")

export const pageHeading = (page: Page, name: string | RegExp) =>
  page.getByRole("heading", { name, level: 1 })

export const mainTextbox = (page: Page, name: string | RegExp) =>
  main(page).getByRole("textbox", { name, exact: typeof name === "string" })

export const visibleHeading = (
  root: Page | Locator,
  name: string | RegExp
) => root.getByRole("heading", { name }).filter({ visible: true })

export const visibleCheckbox = (root: Page | Locator, name: string | RegExp) =>
  root.getByRole("checkbox", { name })

export const visibleSearchButton = (page: Page) =>
  header(page).getByRole("button", { name: /search/i })

export const visibleBagButton = (page: Page) =>
  header(page).getByRole("button", { name: /shopping bag/i })

export const visibleWishlistLink = (page: Page) =>
  header(page).locator('a[href="/wishlist"]').filter({ visible: true })

export const visibleAccountLink = (page: Page) =>
  header(page).locator('a[href="/login"]').filter({ visible: true })

export const gotoPath = async (page: Page, path: string) => {
  await page.goto(path, { waitUntil: "domcontentloaded" })
  await expect(header(page)).toBeVisible()
}

export const assertNoHorizontalOverflow = async (page: Page) => {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement
    return root.scrollWidth > root.clientWidth + 2
  })

  expect(overflow, "page should not overflow horizontally").toBeFalsy()
}

export const assertShellVisible = async (page: Page) => {
  await expect(header(page)).toBeVisible()
  await expect(page.locator("main")).toBeVisible()
  await expect(footer(page)).toBeVisible()
}

export const openSearch = async (page: Page) => {
  await visibleSearchButton(page).click()
  await expect(page.getByRole("search", { name: "Site search" })).toBeVisible()
  return page.getByRole("searchbox", { name: /search products/i })
}

export const openBag = async (page: Page) => {
  await visibleBagButton(page).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  return dialog
}

export const openMobileMenu = async (page: Page) => {
  await header(page).getByRole("button", { name: "Open menu" }).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("navigation", { name: "Mobile" })).toBeVisible()
  return dialog
}

export const fillCheckoutInfo = async (page: Page) => {
  const form = main(page)
  await form.getByRole("textbox", { name: "Email", exact: true }).fill("ada@modimal.test")
  await form.getByRole("textbox", { name: "First Name" }).fill("Ada")
  await form.getByRole("textbox", { name: "Last Name" }).fill("Lovelace")
  await form.getByRole("textbox", { name: "Address", exact: true }).fill("12 Harmony Street")
  await form.getByRole("textbox", { name: "Postal Code" }).fill("10001")
  await form.getByRole("textbox", { name: "City" }).fill("New York")
  await form.getByRole("textbox", { name: "Phone" }).fill("9294603208")
}

export const fillPaymentForm = async (page: Page) => {
  const sameAsShipping = page.getByLabel(/Default \(Same As Shipping Address\)/i)

  if (await sameAsShipping.count()) {
    await sameAsShipping.check()
  }

  const form = main(page)
  await form.getByRole("textbox", { name: "Card Number" }).fill("4111111111111111")
  await form.getByRole("textbox", { name: "Expiry Month" }).fill("12")
  await form.getByRole("textbox", { name: "Expiry Year" }).fill("2030")
  await form.getByRole("textbox", { name: "Security Code" }).fill("123")
}

export const fillContactForm = async (form: Locator, options?: { modal?: boolean }) => {
  await form.getByLabel("Full Name").fill("Ada Lovelace")
  await form.getByLabel("Email").fill("ada@modimal.test")

  if (options?.modal) {
    await form.getByLabel("Subject").selectOption("Order Inquiry")
  } else {
    await form.getByLabel("Subject").fill("Order question")
  }

  await form.getByLabel("Order Number").fill("MD-1001")
  await form.getByLabel("Message").fill("Please confirm the status of my order.")
  await form.getByRole("checkbox", { name: /I have read and understood/i }).check()
}

export const waitForCartHydration = async (page: Page, expectedCount: number) => {
  const bag = visibleBagButton(page)

  if (expectedCount === 0) {
    await expect(bag).toHaveAttribute("aria-label", "Shopping bag")
    return
  }

  await expect(bag).toHaveAttribute(
    "aria-label",
    `Shopping bag, ${expectedCount} items`
  )
}
