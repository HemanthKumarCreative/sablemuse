export type CartItem = {
  id: string
  productId: string
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}

export const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: "wrap-top-s-white",
    productId: "wrap-top",
    name: "Wrap Top",
    image: "/images/products/wrap-top/main.webp",
    price: 160,
    size: "S",
    color: "White",
    quantity: 1,
  },
  {
    id: "casual-wide-leg-s-navy",
    productId: "casual-wide-leg",
    name: "Casual Wild Leg",
    image: "/images/plus-size/pants.png",
    price: 130,
    size: "S",
    color: "Dark Blue",
    quantity: 1,
  },
  {
    id: "essential-dress-2x-black",
    productId: "essential-dress",
    name: "Essential Dress",
    image: "/images/products/essential-dress/main.png",
    price: 195,
    size: "2X",
    color: "Black",
    quantity: 1,
  },
]

export const CART_STORAGE_KEY = "modimal-cart"

export const getCartItemKey = (
  productId: string,
  size: string,
  color: string
) => `${productId}-${size}-${color}`.toLowerCase().replace(/\s+/g, "-")
