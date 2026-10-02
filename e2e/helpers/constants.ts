import type { CartItem, ShopRoute } from "./types"

export const WELCOME_STORAGE_KEY = "modimal-welcome-dismissed"
export const CART_STORAGE_KEY = "modimal-cart"

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

export const SHOP_ROUTES: ShopRoute[] = [
  { path: "/", name: "Home", heading: /Everyday women's clothing/i },
  { path: "/collection", name: "Collection", heading: "Collection" },
  { path: "/new-in", name: "New In redirect", heading: "New Arrivals" },
  { path: "/modiweek", name: "Modiweek redirect", heading: "New Arrivals" },
  { path: "/modiweek/saturday", name: "Modiweek day redirect", heading: "New Arrivals" },
  { path: "/plus-size", name: "Plus Size redirect", heading: "New Arrivals" },
  { path: "/plus-size/shop-all", name: "Plus Size Shop All redirect", heading: "New Arrivals" },
  { path: "/sustainability", name: "Our Story", heading: "Our Story" },
  {
    path: "/sustainability/mission",
    name: "Sable Muse Mission",
    heading: "Our Mission",
  },
  {
    path: "/sustainability/materials",
    name: "Care And Shipping",
    heading: "Care And Shipping",
  },
  { path: "/shop-all", name: "Shop All", heading: "Shop All" },
  { path: "/search?q=pants", name: "Search pants", heading: /Search results for pants/i },
  { path: "/product/wrap-top", name: "Wrap Top", heading: "Wrap Top" },
  { path: "/product/essential-dress", name: "Essential Dress", heading: "Essential Dress" },
  { path: "/cart", name: "Cart", heading: "Your Cart" },
  { path: "/checkout", name: "Checkout info", heading: /Checkout information/i },
  { path: "/checkout/shipping", name: "Checkout shipping", heading: "Shipping" },
  { path: "/checkout/payment", name: "Checkout payment", heading: "Payment" },
  { path: "/checkout/success", name: "Checkout success", heading: "Payment Successful" },
  { path: "/checkout/error", name: "Checkout error", heading: /Sorry, Payment Failed/i },
  { path: "/login", name: "Login", heading: "Log In" },
  { path: "/register", name: "Register", heading: "Create Account" },
  { path: "/wishlist", name: "Wishlist", heading: "My Wish List" },
  { path: "/contact-us", name: "Contact Us", heading: "Contact Us" },
  { path: "/faq", name: "FAQ", heading: "FAQs" },
]
