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

export type ShopRoute = {
  path: string
  name: string
  heading?: string | RegExp
}
