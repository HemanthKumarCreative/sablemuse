import type {
  CartItem,
  CartSummary,
  DeliveryGroup,
  Product,
  ProductDetail,
  ProductMedia,
  ProductOption,
  ProductVariant,
} from "@/types/commerce"
import { colorNameToHex, isColorOption, isSizeOption } from "./color"

type MoneyNode = {
  amount: string
  currencyCode: string
}

type ImageNode = {
  url: string
  altText?: string | null
}

type ShopifyProductCard = {
  id: string
  title: string
  handle: string
  description?: string | null
  tags?: string[]
  featuredImage?: ImageNode | null
  priceRange: {
    minVariantPrice: MoneyNode
    maxVariantPrice?: MoneyNode
  }
  compareAtPriceRange?: {
    minVariantPrice?: MoneyNode | null
  } | null
  options?: Array<{ name: string; values: string[] }>
  images?: {
    edges: Array<{ node: ImageNode }>
  }
}

type ShopifyMediaNode = {
  mediaContentType?: string
  alt?: string | null
  image?: ImageNode | null
  sources?: Array<{ url: string; mimeType?: string | null }>
  embedUrl?: string | null
  previewImage?: ImageNode | null
}

type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  sku?: string | null
  selectedOptions: Array<{ name: string; value: string }>
  price: MoneyNode
  compareAtPrice?: MoneyNode | null
  image?: ImageNode | null
}

type ShopifyProductDetail = ShopifyProductCard & {
  productType?: string | null
  media?: {
    edges: Array<{ node: ShopifyMediaNode }>
  }
  variants: {
    edges: Array<{ node: ShopifyVariant }>
  }
}

type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: Array<{ name: string; value: string }>
    price: MoneyNode
    image?: ImageNode | null
    product: {
      handle: string
      title: string
      featuredImage?: ImageNode | null
    }
  }
}

type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: MoneyNode
    totalAmount: MoneyNode
  }
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
  deliveryGroups?: {
    edges: Array<{
      node: {
        id: string
        deliveryOptions: Array<{
          handle: string
          title: string
          description?: string | null
          estimatedCost: MoneyNode
        }>
        selectedDeliveryOption?: { handle: string } | null
      }
    }>
  }
}

const parseAmount = (amount: string) => Number.parseFloat(amount)

const hasTag = (tags: string[] | undefined, name: string) =>
  tags?.some((tag) => tag.trim().toLowerCase() === name) ?? false

const compareAtAbove = (price: number, compareAt?: MoneyNode | null) => {
  if (!compareAt) {
    return undefined
  }

  const amount = parseAmount(compareAt.amount)
  return amount > price ? amount : undefined
}

const mapMediaNode = (node: ShopifyMediaNode): ProductMedia | null => {
  if (node.mediaContentType === "IMAGE" && node.image?.url) {
    return {
      type: "image",
      url: node.image.url,
      alt: node.image.altText || node.alt || "",
    }
  }

  if (node.mediaContentType === "VIDEO") {
    const source =
      node.sources?.find((item) => item.mimeType?.includes("mp4")) ??
      node.sources?.[0]

    if (!source?.url) {
      return null
    }

    return {
      type: "video",
      url: source.url,
      alt: node.previewImage?.altText || node.alt || "",
      poster: node.previewImage?.url,
    }
  }

  if (node.mediaContentType === "EXTERNAL_VIDEO" && node.embedUrl) {
    return {
      type: "external-video",
      url: node.embedUrl,
      alt: node.previewImage?.altText || node.alt || "",
      poster: node.previewImage?.url,
    }
  }

  return null
}

const mapColorsFromOptions = (
  options?: Array<{ name: string; values: string[] }>
) => {
  const colorOption = options?.find((option) => isColorOption(option.name))
  if (!colorOption) {
    return []
  }

  return colorOption.values.map((value) => ({
    name: value,
    hex: colorNameToHex(value),
  }))
}

const mapSubtitle = (product: ShopifyProductCard) => {
  const color = mapColorsFromOptions(product.options)[0]?.name
  if (color) {
    return color
  }

  if (product.tags?.includes("new")) {
    return "New Arrival"
  }

  return "Sable Muse"
}

export const mapProductCard = (
  product: ShopifyProductCard,
  flags?: Partial<Pick<Product, "isNew" | "isBestSeller" | "isRestock">>
): Product => {
  const imageUrls = [
    product.featuredImage?.url,
    ...(product.images?.edges.map(({ node }) => node.url) ?? []),
  ].filter((url): url is string => Boolean(url))
  const uniqueImages = [...new Set(imageUrls)]
  const image = uniqueImages[0] || "/images/placeholder.jpg"
  const price = parseAmount(product.priceRange.minVariantPrice.amount)
  const maxPrice = product.priceRange.maxVariantPrice
    ? parseAmount(product.priceRange.maxVariantPrice.amount)
    : price

  return {
    id: product.handle,
    name: product.title,
    subtitle: mapSubtitle(product),
    price,
    priceMax: maxPrice > price ? maxPrice : undefined,
    compareAtPrice: compareAtAbove(
      price,
      product.compareAtPriceRange?.minVariantPrice
    ),
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    image,
    secondaryImage: uniqueImages[1],
    colors: mapColorsFromOptions(product.options),
    isNew: flags?.isNew ?? hasTag(product.tags, "new"),
    isBestSeller:
      flags?.isBestSeller ??
      (hasTag(product.tags, "best-seller") || hasTag(product.tags, "best seller")),
    isRestock: flags?.isRestock ?? hasTag(product.tags, "restock"),
    shipsFromUs: hasTag(product.tags, "ship from usa"),
  }
}

export const mapProductDetail = (
  product: ShopifyProductDetail
): ProductDetail => {
  const variants: ProductVariant[] = product.variants.edges.map(({ node }) => {
    const price = parseAmount(node.price.amount)

    return {
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      price,
      compareAtPrice: compareAtAbove(price, node.compareAtPrice),
      currencyCode: node.price.currencyCode,
      selectedOptions: node.selectedOptions,
      image: node.image?.url,
      sku: node.sku || undefined,
    }
  })

  const options: ProductOption[] = (product.options ?? []).map((option) => ({
    name: option.name,
    values: option.values,
  }))

  const sizeOption = options.find((option) => isSizeOption(option.name))
  const sizes = sizeOption?.values ?? variants.map((variant) => variant.title)
  const card = mapProductCard(product)
  const gallery =
    product.media?.edges
      .map(({ node }) => mapMediaNode(node))
      .filter((item): item is ProductMedia => Boolean(item)) ?? []
  const imageGallery: ProductMedia[] = (
    product.images?.edges.map(({ node }) => node.url).filter(Boolean) ?? []
  ).map((url) => ({
    type: "image" as const,
    url,
    alt: product.title,
  }))

  return {
    ...card,
    gid: product.id,
    category: product.productType || "Shop",
    categoryHref: "/shop-all",
    description: product.description || "No description available.",
    gallery:
      gallery.length > 0
        ? gallery
        : imageGallery.length > 0
          ? imageGallery
          : [{ type: "image", url: card.image, alt: product.title }],
    sizes,
    options,
    variants,
    fitting: "We recommend taking your usual size.",
    fabricCare: "Machine wash cold. Do not tumble dry.",
    productDetail: product.description || "Detailed product information.",
    shippingReturns:
      "Prices are in US dollars. Free shipping on orders within the United States. Returns accepted within 30 days.",
    sizeSelector: "select",
    ctaStyle: "brand",
    showCtaPrice: true,
  }
}

export const mapCart = (cart: ShopifyCart): CartSummary => {
  const items: CartItem[] = cart.lines.edges.map(({ node }) => {
    const size =
      node.merchandise.selectedOptions.find((option) =>
        isSizeOption(option.name)
      )?.value ?? ""
    const color =
      node.merchandise.selectedOptions.find((option) =>
        isColorOption(option.name)
      )?.value ??
      node.merchandise.selectedOptions.find(
        (option) => !isSizeOption(option.name)
      )?.value ??
      ""

    return {
      id: node.id,
      merchandiseId: node.merchandise.id,
      productId: node.merchandise.product.handle,
      name: node.merchandise.product.title,
      image:
        node.merchandise.image?.url ||
        node.merchandise.product.featuredImage?.url ||
        "/images/placeholder.jpg",
      price: parseAmount(node.merchandise.price.amount),
      size,
      color,
      quantity: node.quantity,
    }
  })

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseAmount(cart.cost.subtotalAmount.amount),
    currencyCode: cart.cost.subtotalAmount.currencyCode,
    items,
  }
}

export const mapDeliveryGroups = (cart: ShopifyCart): DeliveryGroup[] => {
  return (
    cart.deliveryGroups?.edges.map(({ node }) => ({
      id: node.id,
      groupId: node.id,
      selectedHandle: node.selectedDeliveryOption?.handle,
      options: node.deliveryOptions.map((option) => ({
        handle: option.handle,
        title: option.title,
        description: option.description ?? undefined,
        price: parseAmount(option.estimatedCost.amount),
        currencyCode: option.estimatedCost.currencyCode,
      })),
    })) ?? []
  )
}
