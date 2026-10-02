export type ProductColor = {
  name: string
  hex: string
}

export type ProductMedia =
  | {
      type: "image"
      url: string
      alt: string
    }
  | {
      type: "video"
      url: string
      alt: string
      poster?: string
    }
  | {
      type: "external-video"
      url: string
      alt: string
      poster?: string
    }

export type Product = {
  id: string
  name: string
  subtitle: string
  price: number
  priceMax?: number
  compareAtPrice?: number
  image: string
  secondaryImage?: string
  colors: ProductColor[]
  isNew?: boolean
  isRestock?: boolean
  isBestSeller?: boolean
  shipsFromUs?: boolean
  currencyCode?: string
}

export type ProductOption = {
  name: string
  values: string[]
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: number
  compareAtPrice?: number
  currencyCode: string
  selectedOptions: Array<{ name: string; value: string }>
  image?: string
  sku?: string
}

export type ProductMaterial = {
  title: string
  description: string
  tags: string[]
}

export type ProductDetail = Product & {
  gid?: string
  category: string
  categoryHref: string
  description: string
  gallery: ProductMedia[]
  sizes: string[]
  options?: ProductOption[]
  variants?: ProductVariant[]
  fitting: string
  fabricCare: string
  productDetail: string
  shippingReturns: string
  sizeSelector?: "buttons" | "select"
  ctaStyle?: "ink" | "brand"
  showCtaPrice?: boolean
  showEasyReturn?: boolean
  accordionDefaultOpen?: string[]
  material?: ProductMaterial
  accordionPlacement?: "panel" | "gallery"
}

export type CartItem = {
  id: string
  merchandiseId: string
  productId: string
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}

export type CartSummary = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  subtotal: number
  currencyCode: string
  items: CartItem[]
}

export type DeliveryOption = {
  handle: string
  title: string
  description?: string
  price: number
  currencyCode: string
}

export type DeliveryGroup = {
  id: string
  groupId: string
  options: DeliveryOption[]
  selectedHandle?: string
}
