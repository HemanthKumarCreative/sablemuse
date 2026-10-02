import { SHOP_ROUTES } from "../helpers/constants"
import { expect, test } from "../helpers/fixtures"
import {
  assertNoHorizontalOverflow,
  assertShellVisible,
  getViewportWidth,
  gotoPath,
  header,
  isLargeDesktop,
  isMobileViewport,
  openMobileMenu,
} from "../helpers/shop"

test.describe("Responsiveness", () => {
  for (const route of SHOP_ROUTES) {
    test(`${route.name} (${route.path}) keeps the shell and does not overflow`, async ({
      page,
    }) => {
      await gotoPath(page, route.path)
      await assertShellVisible(page)
      await assertNoHorizontalOverflow(page)

      if (route.heading) {
        await expect(
          page.getByRole("heading", { name: route.heading }).first()
        ).toBeAttached()
      }

      if (route.path === "/modiweek" || route.path === "/new-in" || route.path === "/plus-size") {
        await expect(page).toHaveURL(/\/collection\/new-arrivals$/)
      }
    })
  }

  test("header chrome matches the current breakpoint", async ({ page }) => {
    await gotoPath(page, "/")

    if (isMobileViewport(page)) {
      await expect(header(page).getByRole("button", { name: "Open menu" })).toBeVisible()
      await expect(page.getByRole("navigation", { name: "Primary" })).toHaveCount(0)
      return
    }

    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible()
    await expect(header(page).getByRole("button", { name: "Open menu" })).toHaveCount(0)
    await expect(header(page).getByRole("button", { name: "Account" })).toBeVisible()
  })

  test("search and cart stay reachable at this viewport", async ({ page }) => {
    await gotoPath(page, "/")
    await expect(header(page).getByRole("button", { name: /search/i })).toBeVisible()
    await expect(header(page).getByRole("button", { name: /shopping bag/i })).toBeVisible()
    await expect(header(page).getByRole("button", { name: /wishlist/i })).toBeVisible()
  })

  test("listing filters follow the lg breakpoint", async ({ page }) => {
    await gotoPath(page, "/shop-all")

    if (isLargeDesktop(page)) {
      await expect(page.getByRole("heading", { name: "Filters" })).toBeVisible()
      await expect(page.getByRole("button", { name: "Filter" })).toHaveCount(0)
      return
    }

    await expect(page.getByRole("button", { name: "Filter" })).toBeVisible()
  })

  test("contact layout follows the md breakpoint", async ({ page }) => {
    await gotoPath(page, "/contact-us")

    if (isMobileViewport(page)) {
      await expect(page.getByRole("button", { name: "Write Us" })).toBeVisible()
      await expect(page.getByRole("heading", { name: "Write Us" })).toHaveCount(0)
      return
    }

    await expect(page.getByRole("heading", { name: "Write Us" })).toBeVisible()
    await expect(page.getByRole("list", { name: "Contact channels" })).toBeVisible()
  })

  test("cart summary layout follows the md breakpoint", async ({ page }) => {
    await gotoPath(page, "/cart")

    if (isMobileViewport(page)) {
      await expect(page.getByRole("heading", { name: "Order Summary" })).toBeVisible()
      await expect(page.getByRole("link", { name: "Continue Shopping" })).toHaveCount(0)
      return
    }

    await expect(page.getByText("Price").first()).toBeVisible()
    await expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible()
  })

  test("mobile menu covers the viewport without trapping the page overflow", async ({
    page,
  }) => {
    test.skip(!isMobileViewport(page), "full-screen menu is mobile-only")
    await gotoPath(page, "/")
    const menu = await openMobileMenu(page)
    const box = await menu.boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(getViewportWidth(page) - 2)
    await assertNoHorizontalOverflow(page)
  })
})
