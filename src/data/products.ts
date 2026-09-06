import type { Product } from "@/data/home"
import { BEST_SELLERS } from "@/data/home"

export type ProductMaterial = {
  title: string
  description: string
  tags: string[]
}

export type ProductDetail = Product & {
  category: string
  categoryHref: string
  description: string
  gallery: string[]
  sizes: string[]
  fitting: string
  fabricCare: string
  productDetail: string
  shippingReturns: string
  sizeSelector?: "buttons" | "select"
  ctaStyle?: "ink" | "brand"
  showCtaPrice?: boolean
  showEasyReturn?: boolean
  material?: ProductMaterial
  accordionPlacement?: "panel" | "gallery"
}

export const PRODUCTS: Record<string, ProductDetail> = {
  "wrap-top": {
    id: "wrap-top",
    name: "Wrap Top",
    subtitle: "Soft Linen",
    price: 120,
    image: "/images/products/wrap-top/main.webp",
    category: "Tops",
    categoryHref: "/shop-all",
    description:
      "A soft wrap silhouette designed for everyday ease — light, breathable, and easy to style from morning to evening.",
    gallery: [
      "/images/products/wrap-top/main.webp",
      "/images/products/wrap-top/alt-1.webp",
      "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
      "/images/products/wrap-top/alt-black.webp",
    ],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Red", hex: "#CA2929" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    fitting:
      "We recommend taking your usual size. On average, customers say this style fits true to size. Amee (Studio Model) is 5'2, usually wears an XS and wears a size XS here.",
    fabricCare:
      "Fabric: cupro luxe, made in Turkey, 100% cupro with stretch. Vegan materials. Care: cold machine wash, line dry. Do not tumble dry or dry clean. Do not use bleach or fabric softener.",
    productDetail:
      "Soft wrap fit, adjustable front tie, sleeveless cut, clean neckline, lined bodice, and a lightly draped hem for everyday wear.",
    shippingReturns:
      "Shipping is free on US and Canada orders over $175. Unwashed, unworn items are eligible for returns or exchanges within 30 days of purchase. Final sale items are not eligible.",
  },
  "essential-dress": {
    id: "essential-dress",
    name: "Essential Dress",
    subtitle: "Fitted Soft",
    price: 160,
    image: "/images/products/essential-dress/main.png",
    category: "Plus Size",
    categoryHref: "/plus-size/shop-all",
    description:
      "A dress that embodies success. Our best-selling dress designed to be fitted through the body.",
    gallery: [
      "/images/products/essential-dress/main.png",
      "/images/products/essential-dress/alt-1.webp",
      "/images/products/essential-dress/alt-2.webp",
      "/images/products/essential-dress/alt-3.webp",
    ],
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sky", hex: "#A8C5D4" },
      { name: "Lavender", hex: "#C5B4D8" },
    ],
    sizes: ["1X", "2X", "3X", "4X"],
    isNew: true,
    sizeSelector: "select",
    ctaStyle: "brand",
    showCtaPrice: true,
    showEasyReturn: true,
    accordionPlacement: "gallery",
    material: {
      title: "Cuproluxe",
      description:
        "Our CuproLuxe is a regenerated cellulose fabric made from cotton waste. This fabric is made in a zero-waste closed loop process, and is 100% biodegradable. Cupro is breathable, quick drying and durable. This OEKO-TEX®, FSC, and GRS certified material is made in Turkey.",
      tags: ["Quick Dry", "Breathable", "Machine Washable"],
    },
    fitting:
      "We recommend taking your usual size. On average, customers say this style fits true to size. Designed with an inclusive plus-size fit through the body.",
    fabricCare:
      "Fabric: Cupro Luxe, made in Turkey, 100% cupro, 38% elastane, 100% vegan materials. Care: cold machine wash, line dry. Do not tumble dry or dry clean. Do not use bleach or fabric softener.",
    productDetail:
      "Fitted through the body with a clean neckline, soft stretch Cuproluxe fabric, and a silhouette made for everyday polish.",
    shippingReturns:
      "Shipping is free on US orders. Canada orders are $175. Unwashed, unworn items are eligible for returns or exchanges within 30 days of purchase. Final sale items are not eligible for returns or exchanges.",
  },
}

export const RELATED_PRODUCTS: Product[] = [
  BEST_SELLERS[1],
  BEST_SELLERS[0],
  BEST_SELLERS[2],
]

export const getProductById = (id: string): ProductDetail | null => {
  if (PRODUCTS[id]) {
    return PRODUCTS[id]
  }

  if (id === "shop-wrap-top") {
    return PRODUCTS["wrap-top"]
  }

  if (id === "plus-essential-dress" || id === "plus-marilyn-dress") {
    return PRODUCTS["essential-dress"]
  }

  return null
}
