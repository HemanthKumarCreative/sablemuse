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
import { formatDisplayTitle } from "@/lib/format-display-title"
import { colorNameToHex, isColorOption, isSizeOption } from "./color"

type MoneyNode = {
  amount: string
  currencyCode: string
}

type ImageNode = {
  url: string
  altText?: string | null
}

type ShopifyCardVariant = {
  id: string
  title?: string
  availableForSale: boolean
  sku?: string | null
  selectedOptions: Array<{ name: string; value: string }>
  price?: MoneyNode
  compareAtPrice?: MoneyNode | null
  image?: ImageNode | null
}

type ShopifyProductCard = {
  id: string
  title: string
  handle: string
  vendor?: string | null
  description?: string | null
  tags?: string[]
  availableForSale?: boolean
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
  variants?: {
    edges: Array<{ node: ShopifyCardVariant }>
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
      vendor?: string | null
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

const PLUS_SIZE_PATTERN = /\b(full[\s-]?size|plus[\s-]?size|plus)\b/i

const isPlusSizeProduct = (title: string, tags?: string[]) =>
  PLUS_SIZE_PATTERN.test(title) ||
  (tags ?? []).some((tag) => PLUS_SIZE_PATTERN.test(tag))

const mapCardVariants = (product: ShopifyProductCard): ProductVariant[] => {
  const fallbackPrice = parseAmount(product.priceRange.minVariantPrice.amount)
  const fallbackCurrency = product.priceRange.minVariantPrice.currencyCode

  return (
    product.variants?.edges.map(({ node }) => {
      const price = node.price ? parseAmount(node.price.amount) : fallbackPrice

      return {
        id: node.id,
        title:
          node.title ||
          node.selectedOptions.map((option) => option.value).join(" / ") ||
          "Default",
        availableForSale: node.availableForSale,
        price,
        compareAtPrice: node.price
          ? compareAtAbove(price, node.compareAtPrice)
          : undefined,
        currencyCode: node.price?.currencyCode ?? fallbackCurrency,
        selectedOptions: node.selectedOptions,
        image: node.image?.url,
        sku: node.sku || undefined,
      }
    }) ?? []
  )
}

const mapColorsFromOptions = (
  options: Array<{ name: string; values: string[] }> | undefined,
  variants: ProductVariant[]
) => {
  const colorOption = options?.find((option) => isColorOption(option.name))
  if (!colorOption) {
    return []
  }

  return colorOption.values.map((value) => {
    const match = variants.find(
      (variant) =>
        variant.image &&
        variant.selectedOptions.some(
          (option) => isColorOption(option.name) && option.value === value
        )
    )

    return {
      name: value,
      hex: colorNameToHex(value),
      image: match?.image,
    }
  })
}

const mapSubtitle = (product: ShopifyProductCard) => {
  // Color belongs on swatches; avoid cryptic codes like "DK" under the title.
  if (hasTag(product.tags, "new")) {
    return "New Arrival"
  }

  return ""
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
  const variants = mapCardVariants(product)
  const availableForSale =
    product.availableForSale ??
    (variants.length > 0 ? variants.some((variant) => variant.availableForSale) : true)

  return {
    id: product.handle,
    name: formatDisplayTitle(product.title, product.vendor),
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
    colors: mapColorsFromOptions(product.options, variants),
    isNew: flags?.isNew ?? hasTag(product.tags, "new"),
    isBestSeller:
      flags?.isBestSeller ??
      (hasTag(product.tags, "best-seller") || hasTag(product.tags, "best seller")),
    isRestock: flags?.isRestock ?? hasTag(product.tags, "restock"),
    isPlusSize: isPlusSizeProduct(product.title, product.tags),
    availableForSale,
    shipsFromUs: hasTag(product.tags, "ship from usa"),
    variants,
  }
}

export const mapProductDetail = (
  product: ShopifyProductDetail
): ProductDetail => {
  const variants: ProductVariant[] = product.variants.edges.map(({ node }) => {
    const price = parseAmount(
      node.price?.amount ?? product.priceRange.minVariantPrice.amount
    )

    return {
      id: node.id,
      title:
        node.title ||
        node.selectedOptions.map((option) => option.value).join(" / ") ||
        "Default",
      availableForSale: node.availableForSale,
      price,
      compareAtPrice: compareAtAbove(price, node.compareAtPrice),
      currencyCode:
        node.price?.currencyCode ??
        product.priceRange.minVariantPrice.currencyCode,
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
    alt: card.name,
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
          : [{ type: "image", url: card.image, alt: card.name }],
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
      name: formatDisplayTitle(
        node.merchandise.product.title,
        node.merchandise.product.vendor
      ),
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
