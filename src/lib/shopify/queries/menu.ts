import { shopifyFetch } from "../client"

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

export const fetchShopifyMenu = async (handle: string = "main-menu"): Promise<ShopifyMenuItem[]> => {
  try {
    const data = await shopifyFetch<ShopifyMenuResponse>({
      query: MENU_QUERY,
      variables: { handle },
      revalidate: 300, // Revalidate cache every 5 minutes
    })
    return data.menu?.items ?? []
  } catch (error) {
    console.warn(`[Shopify] Could not fetch menu "${handle}", using fallback navigation.`, error)
    return []
  }
}
