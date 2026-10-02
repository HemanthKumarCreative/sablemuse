import { expect, test } from "../helpers/fixtures"
import {
  gotoPath,
  header,
  isMobileViewport,
  openMobileMenu,
  pageHeading,
  visibleAccountLink,
  visibleWishlistLink,
} from "../helpers/shop"

test.describe("Header navigation", () => {
  test("logo returns home", async ({ page }) => {
    await gotoPath(page, "/faq")
    await header(page).getByRole("link", { name: /Sable Muse/i }).first().click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole("heading", { name: /Everyday women's clothing/i })).toBeVisible()
  })

  test("wishlist icon opens the wish list", async ({ page }) => {
    await gotoPath(page, "/")
    await visibleWishlistLink(page).click()
    await expect(page).toHaveURL(/\/wishlist$/)
    await expect(page.getByRole("heading", { name: "My Wish List" })).toBeVisible()
  })

  test("desktop primary links reach catalog pages", async ({ page }) => {
    test.skip(isMobileViewport(page), "desktop nav is hidden below md")
    await gotoPath(page, "/")
    const nav = page.getByRole("navigation", { name: "Primary" })

    await nav.getByRole("link", { name: "Collection" }).click()
    await expect(page).toHaveURL(/\/collection$/)

    await nav.getByRole("link", { name: "New", exact: true }).click()
    await expect(page).toHaveURL(/\/collection\/new-arrivals$/)

    await nav.getByRole("link", { name: "Dresses", exact: true }).click()
    await expect(page).toHaveURL(/\/collection\/dresses-jumpsuits$/)

    await nav.getByRole("link", { name: "Jeans", exact: true }).click()
    await expect(page).toHaveURL(/\/collection\/jeans-pants$/)
  })

  test("desktop account icon opens login", async ({ page }) => {
    test.skip(isMobileViewport(page), "account icon is desktop-only")
    await gotoPath(page, "/")
    await visibleAccountLink(page).click()
    await expect(page).toHaveURL(/\/login$/)
    await expect(pageHeading(page, "Log In")).toBeVisible()
  })

  test("desktop mega menu exposes Shop All", async ({ page }) => {
    test.skip(isMobileViewport(page), "mega menu is desktop-only")
    await gotoPath(page, "/")
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Collection" }).hover()
    const shopAll = page.getByRole("link", { name: "Shop All" }).first()
    await expect(shopAll).toBeVisible()
    await shopAll.click()
    await expect(page).toHaveURL(/\/shop-all$/)
  })

  test("mobile menu opens, expands Collection, and navigates", async ({ page }) => {
    test.skip(!isMobileViewport(page), "hamburger is mobile-only")
    await gotoPath(page, "/")
    const menu = await openMobileMenu(page)

    await menu.getByRole("button", { name: "Expand Collection" }).click()
    await expect(menu.getByRole("link", { name: "Shop All" })).toBeVisible()
    await menu.getByRole("link", { name: "Shop All" }).click()
    await expect(page).toHaveURL(/\/shop-all$/)
    await expect(page.getByRole("dialog")).toHaveCount(0)
  })

  test("mobile menu reaches login and register", async ({ page }) => {
    test.skip(!isMobileViewport(page), "auth CTAs live in the mobile drawer")
    await gotoPath(page, "/")
    const menu = await openMobileMenu(page)
    await menu.getByRole("button", { name: "Log In" }).click()
    await expect(page).toHaveURL(/\/login$/)

    await gotoPath(page, "/")
    const nextMenu = await openMobileMenu(page)
    await nextMenu.getByRole("button", { name: "Create Account" }).click()
    await expect(page).toHaveURL(/\/register$/)
  })
})
