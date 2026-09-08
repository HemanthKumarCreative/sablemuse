export type CollectionRouteKey =
  | "best-sellers"
  | "shop-all"
  | "new-in"
  | "collection"
  | "plus-size"
  | "plus-size-shop-all"
  | "dresses-jumpsuits"
  | "tops-blouses"
  | "jeans-pants"
  | "matching-sets-lounge"

/**
 * Map storefront routes to Shopify collection handles.
 * Update these to match collections published to the Headless channel.
 */
export const COLLECTION_HANDLES: Record<CollectionRouteKey, string> = {
  "best-sellers": "best-sellers",
  "shop-all": "all",
  "new-in": "new-arrivals", // Mapping 'new-in' to 'new-arrivals' handle
  collection: "frontpage",
  "plus-size": "plus-size",
  "plus-size-shop-all": "plus-size",
  "dresses-jumpsuits": "dresses-jumpsuits",
  "tops-blouses": "tops-blouses",
  "jeans-pants": "jeans-pants",
  "matching-sets-lounge": "matching-sets-lounge",
}
