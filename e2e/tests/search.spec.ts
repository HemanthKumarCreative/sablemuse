import { expect, test } from "../helpers/fixtures"
import {
  gotoPath,
  isLargeDesktop,
  isMobileViewport,
  openSearch,
} from "../helpers/shop"

test.describe("Search", () => {
  test("header overlay submits a query and shows matching products", async ({
    page,
  }) => {
    await gotoPath(page, "/")
    const input = await openSearch(page)
    await input.fill("pants")
    await input.press("Enter")
    await expect(page).toHaveURL(/\/search\?q=pants/)
    await expect(page.getByRole("heading", { name: /Search results for pants/i })).toBeAttached()
    await expect(page.getByRole("link", { name: /View /i }).first()).toBeVisible()
    await expect(page.getByText(/items/i).first()).toBeAttached()
  })

  test("empty overlay submit lands on the empty search page", async ({ page }) => {
    await gotoPath(page, "/")
    const input = await openSearch(page)
    await input.press("Enter")
    await expect(page).toHaveURL(/\/search$/)
    await expect(page.getByText("Enter a search term to see products.")).toBeVisible()
  })

  test("Escape closes the overlay", async ({ page }) => {
    await gotoPath(page, "/")
    await openSearch(page)
    await page.keyboard.press("Escape")
    await expect(page.getByRole("search", { name: "Site search" })).toHaveCount(0)
  })

  test("results page can refine the query", async ({ page }) => {
    await gotoPath(page, "/search?q=pants")
    const resultsSearch = page.getByRole("search", { name: "Search results" })
    const searchInput = resultsSearch.getByRole("searchbox", { name: /search products/i })
    await searchInput.fill("wide")
    await searchInput.press("Enter")
    await expect(page).toHaveURL(/q=wide/)
  })

  test("unknown query shows an empty state", async ({ page }) => {
    await gotoPath(page, "/search?q=zzzz-no-match")
    await expect(
      page.getByText(/No products matched “zzzz-no-match”/i)
    ).toBeVisible()
  })

  test("desktop search shows the filter sidebar", async ({ page }) => {
    test.skip(!isLargeDesktop(page), "sidebar filters start at lg")
    await gotoPath(page, "/search?q=pants")
    await expect(page.getByRole("heading", { name: "Filters" })).toBeVisible()
    await page.getByRole("button", { name: "Color filter" }).click()
    await expect(page.getByRole("checkbox", { name: "Black" })).toBeVisible()
  })

  test("narrow viewports open filters in a sheet", async ({ page }) => {
    test.skip(isLargeDesktop(page), "sheet filters are below lg")
    await gotoPath(page, "/search?q=pants")
    await page.getByRole("button", { name: "Filter", exact: true }).click()
    const sheet = page.getByRole("dialog")
    await expect(sheet).toBeVisible()
    await expect(sheet.getByRole("heading", { name: "Filters" }).first()).toBeVisible()
    await sheet.getByRole("button", { name: "Close filters" }).click()
    await expect(sheet).toBeHidden()
  })

  test("mobile header search is available without opening the menu", async ({
    page,
  }) => {
    test.skip(!isMobileViewport(page), "checks the compact header search")
    await gotoPath(page, "/")
    await openSearch(page)
    await expect(page.getByRole("searchbox", { name: /search products/i })).toBeFocused()
  })
})
