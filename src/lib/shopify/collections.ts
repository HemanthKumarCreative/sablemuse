export type CollectionRouteKey =
  | "best-sellers"
  | "shop-all"
  | "new-in"
  | "collection"
  | "plus-size"
  | "plus-size-shop-all"

/**
 * Map storefront routes to Shopify collection handles.
 * Update these to match collections published to the Headless channel.
 */
export const COLLECTION_HANDLES: Record<CollectionRouteKey, string> = {
  "best-sellers": "best-sellers",
  "shop-all": "all",
  "new-in": "new-in",
  collection: "frontpage",
  "plus-size": "plus-size",
  "plus-size-shop-all": "plus-size",
}
