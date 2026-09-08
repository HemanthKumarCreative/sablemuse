import type {
  CartItem,
  CartSummary,
  DeliveryGroup,
  Product,
  ProductDetail,
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
  }
  options?: Array<{ name: string; values: string[] }>
  images?: {
    edges: Array<{ node: ImageNode }>
  }
}

type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: Array<{ name: string; value: string }>
  price: MoneyNode
  image?: ImageNode | null
}

type ShopifyProductDetail = ShopifyProductCard & {
  productType?: string | null
  priceRange: {
    minVariantPrice: MoneyNode
    maxVariantPrice: MoneyNode
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

  return "Modimal"
}

export const mapProductCard = (
  product: ShopifyProductCard,
  flags?: Partial<Pick<Product, "isNew" | "isBestSeller" | "isRestock">>
): Product => {
  const image =
    product.featuredImage?.url ||
    product.images?.edges?.[0]?.node?.url ||
    "/images/placeholder.jpg"

  return {
    id: product.handle,
    name: product.title,
    subtitle: mapSubtitle(product),
    price: parseAmount(product.priceRange.minVariantPrice.amount),
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    image,
    colors: mapColorsFromOptions(product.options),
    isNew: flags?.isNew ?? product.tags?.includes("new"),
    isBestSeller: flags?.isBestSeller ?? product.tags?.includes("best-seller"),
    isRestock: flags?.isRestock ?? product.tags?.includes("restock"),
  }
}

export const mapProductDetail = (
  product: ShopifyProductDetail
): ProductDetail => {
  const variants: ProductVariant[] = product.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    availableForSale: node.availableForSale,
    price: parseAmount(node.price.amount),
    currencyCode: node.price.currencyCode,
    selectedOptions: node.selectedOptions,
    image: node.image?.url,
  }))

  const options: ProductOption[] = (product.options ?? []).map((option) => ({
    name: option.name,
    values: option.values,
  }))

  const sizeOption = options.find((option) => isSizeOption(option.name))
  const sizes = sizeOption?.values ?? variants.map((variant) => variant.title)
  const gallery =
    product.images?.edges?.map(({ node }) => node.url).filter(Boolean) ?? []
  const card = mapProductCard(product)

  return {
    ...card,
    gid: product.id,
    category: product.productType || "Shop",
    categoryHref: "/shop-all",
    description: product.description || "No description available.",
    gallery: gallery.length > 0 ? gallery : [card.image],
    sizes,
    options,
    variants,
    fitting: "We recommend taking your usual size.",
    fabricCare: "Machine wash cold. Do not tumble dry.",
    productDetail: product.description || "Detailed product information.",
    shippingReturns:
      "Free shipping on orders over $150. Returns accepted within 30 days.",
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
