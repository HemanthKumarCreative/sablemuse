import { shopifyFetch } from "../client"
import { NAV_ITEMS, type NavItem } from "@/data/navigation"

export type ShopifyMenuItem = {
  id: string
  title: string
  url: string
  items?: ShopifyMenuItem[]
}

export type ShopifyMenuResponse = {
  menu: {
    id: string
    title: string
    items: ShopifyMenuItem[]
  } | null
}

const MENU_QUERY = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`

export const fetchShopifyNavItems = async (handle: string = "main-menu"): Promise<NavItem[]> => {
  try {
    const data = await shopifyFetch<ShopifyMenuResponse>({
      query: MENU_QUERY,
      variables: { handle },
      revalidate: 300,
    })

    if (!data.menu?.items?.length) {
      return NAV_ITEMS
    }

    return data.menu.items.map((item) => {
      // Normalize URLs (/collections/new-arrivals -> /collection/new-arrivals)
      let href = item.url.replace(/^\/collections\//, "/collection/")
      if (!href.startsWith("/")) {
        try {
          const parsed = new URL(href)
          href = parsed.pathname.replace(/^\/collections\//, "/collection/")
        } catch {
          href = `/${href}`
        }
      }

      // Check if there is an existing mega menu layout for this item
      const matchingDefault = NAV_ITEMS.find(
        (d) => d.label.toLowerCase() === item.title.toLowerCase() || d.href === href
      )

      return {
        label: item.title,
        href,
        columns: matchingDefault?.columns,
        featured: matchingDefault?.featured,
        megaMenuVariant: matchingDefault?.megaMenuVariant,
      }
    })
  } catch (error) {
    console.warn(`[Shopify Navigation] Failed to fetch live menu "${handle}". Falling back to static configuration.`, error)
    return NAV_ITEMS
  }
}
