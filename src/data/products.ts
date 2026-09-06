import type { Product } from "@/data/home"

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
  accordionDefaultOpen?: string[]
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
    category: "Tops & Blouses",
    categoryHref: "/shop-all",
    description:
      "Versatile and universally flattering, our wrap blouse can be tied, draped, snapped and wrapped multiple ways.",
    gallery: [
      "/images/products/wrap-top/main.webp",
      "/images/products/wrap-top/alt-1.webp",
      "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
      "/images/products/wrap-top/alt-black.webp",
    ],
    colors: [
      { name: "Red", hex: "#CA2929" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    sizeSelector: "select",
    ctaStyle: "brand",
    accordionDefaultOpen: ["fitting"],
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
    price: 195,
    image: "/images/products/essential-dress/main.png",
    category: "Dresses & Jumpsuits",
    categoryHref: "/plus-size/dresses",
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
    showEasyReturn: false,
    accordionPlacement: "gallery",
    accordionDefaultOpen: ["fitting", "fabric"],
    material: {
      title: "Cuproluxe",
      description:
        "Our CuproLuxe is a regenerated cellulose fabric made from cotton waste. This fabric is made in a zero-waste closed loop process, and is 100% biodegradable. Cupro is breathable, quick drying and durable. This OEKO-TEX®, FSC, and GRS certified material is made in Turkey.",
      tags: ["Quick Dry", "Breathable", "Machine Washable"],
    },
    fitting:
      'Note: size up for a bigger fit. Studio model is 5\'2", usually wears a XL and wears a size here.',
    fabricCare:
      "Fabric: Cupro Luxe, made in Turkey, 100% cupro, 38% elastane, 100% vegan materials. Care: cold machine wash, line dry. Do not tumble dry or dry clean. Do not use bleach or fabric softener.",
    productDetail:
      "Fitted through the body with a clean neckline, soft stretch Cuproluxe fabric, and a silhouette made for everyday polish.",
    shippingReturns:
      "Shipping is free on US orders. Canada orders are $175. Unwashed, unworn items are eligible for returns or exchanges within 30 days of purchase. Final sale items are not eligible for returns or exchanges.",
  },
}

export const RELATED_PRODUCTS: Product[] = [
  {
    id: "casual-dress",
    name: "Casual Dress",
    subtitle: "Turn It Up Dress",
    price: 245,
    image: "/images/products/essential-dress/alt-2.webp",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "Sky", hex: "#A8C5D4" },
      { name: "Sage", hex: "#748C70" },
    ],
  },
  {
    id: "chill-wrap-pants",
    name: "Chill Wrap Pants",
    subtitle: "Turn It Up Pants",
    price: 99,
    image: "/images/search/pants-7.png",
    colors: [{ name: "Burnt Orange", hex: "#C45C26" }],
  },
  {
    id: "related-tailored-shirt",
    name: "Tailored Shirt",
    subtitle: "Classic White",
    price: 98,
    image: "/images/products/shirt-black.webp",
    colors: [
      { name: "Black", hex: "#0C0C0C" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Olive", hex: "#5A6D57" },
    ],
  },
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
