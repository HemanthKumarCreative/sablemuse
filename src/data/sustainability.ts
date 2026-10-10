export type SustainabilityMaterial = {
  title: string
  body: string
}

export type SustainabilityGalleryItem = {
  src: string
  alt: string
}

export type SustainabilityMaterialDetail = {
  id: string
  title: string
  body: string
  preview: string
  image: string
  secondaryImage: string
  imageAlt: string
  imagePosition: "left" | "right"
}

export const MATERIALS_INTRO =
  "Sable Muse sells women's dresses, tops, jeans, and matching sets for customers in the United States. Prices are in US dollars. Shipping is free on orders within the United States. Care notes below are general guidance for everyday clothes. Check the product page when a piece needs something more specific."

export const MATERIALS_CLOSING = [
  "If a wash, a size, or a delivery question is not covered here, email support@sablemuse.shop. We reply Monday through Friday, 9 am to 5 pm Eastern Time.",
] as const

export const MATERIALS_REPORT_PREFIX =
  "Orders ship to United States addresses. A tracking note is sent by email after the package leaves."

export const SUSTAINABILITY_MATERIALS: SustainabilityMaterial[] = [
  {
    title: "What We Sell",
    body: "The shop is built around new arrivals, dresses and jumpsuits, tops and blouses, jeans and pants, and matching sets. Each collection is shoppable from the header.",
  },
  {
    title: "How Orders Ship",
    body: "Sable Muse ships within the United States. Prices are in US dollars, and shipping is free on US orders. Most orders leave within one to two business days.",
  },
]

export const SUSTAINABILITY_MATERIAL_DETAILS: SustainabilityMaterialDetail[] = [
  {
    id: "shipping",
    title: "Shipping",
    preview: "Orders ship within the United States...",
    body: "Sable Muse ships to addresses in the United States. Shipping is free on US orders. Prices on the site are in US dollars. Most orders ship within one to two business days, and tracking arrives by email.",
    image: "/images/sustainability.png",
    secondaryImage:
      "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
    imageAlt: "A Sable Muse top prepared for a United States order",
    imagePosition: "left",
  },
  {
    id: "returns",
    title: "Returns",
    preview: "Returns are accepted within 7 days...",
    body: "Returns are accepted within 7 days of delivery for unworn items in their original condition. Email support@sablemuse.shop with your order number to start a return.",
    image: "/images/products/shirt-black.webp",
    secondaryImage: "/images/followus/3.jpg",
    imageAlt: "A Sable Muse top",
    imagePosition: "right",
  },
  {
    id: "care",
    title: "Care",
    preview: "Wash cold and line dry unless...",
    body: "Most pieces do best with a cold machine wash and line dry. Skip bleach, fabric softener, and high heat unless the product page gives different instructions.",
    image:
      "/images/collection/Save_The_Date_Dress_Khaki_Lifestyle_Khaki_Main_720x.webp",
    secondaryImage: "/images/sustainability/materials.png",
    imageAlt: "A Sable Muse dress",
    imagePosition: "left",
  },
  {
    id: "sizing",
    title: "Sizing",
    preview: "Use the size options on the product...",
    body: "Choose a size from the options on the product page. Compare it with a piece you already own. If you want help before you order, email support@sablemuse.shop.",
    image: "/images/followus/5.webp",
    secondaryImage: "/images/products/dress-offwhite.webp",
    imageAlt: "A Sable Muse dress on a product page",
    imagePosition: "right",
  },
  {
    id: "collections",
    title: "Collections",
    preview: "Shop by the collections in the header...",
    body: "Browse New Arrivals, Dresses and Jumpsuits, Tops and Blouses, Jeans and Pants, and Matching Sets. Those are the collections published in the shop.",
    image: "/images/followus/2.jpg",
    secondaryImage: "/images/collection/ezgif-2-f137fd9d7d.png",
    imageAlt: "A matching set from Sable Muse",
    imagePosition: "left",
  },
]

export const SUSTAINABILITY_GALLERY: SustainabilityGalleryItem[] = [
  {
    src: "/images/followus/follow-1.png",
    alt: "Studio styling",
  },
  {
    src: "/images/followus/2.jpg",
    alt: "Clothing from the Sable Muse edit",
  },
  {
    src: "/images/followus/3.jpg",
    alt: "Close-up of woven textile detail",
  },
  {
    src: "/images/followus/4.jpg",
    alt: "Garment finishing on the worktable",
  },
  {
    src: "/images/followus/5.webp",
    alt: "Natural light fitting session",
  },
  {
    src: "/images/modiweek/2.webp",
    alt: "A Sable Muse look in soft neutrals",
  },
]

export type MissionPillar = {
  id: string
  title: string
  body: string
}

export const MISSION_INTRO =
  "Sable Muse is a women's clothing shop for the United States. The mission is straightforward: make dresses, tops, jeans, and matching sets easy to shop, price them in US dollars, and ship them within the country."

export const MISSION_HERO = {
  src: "/images/sustainability/hero-fabrics.png",
  alt: "Women's clothing from Sable Muse",
  caption: "Women's Clothing For The United States",
} as const

export const MISSION_STATEMENT =
  "Shop the collections in the header, pay in US dollars, and reach support@sablemuse.shop if you need help with an order."

export const MISSION_PILLARS: MissionPillar[] = [
  {
    id: "edit",
    title: "The Edit",
    body: "The shop is organized into new arrivals, dresses and jumpsuits, tops and blouses, jeans and pants, and matching sets.",
  },
  {
    id: "united-states",
    title: "United States",
    body: "Checkout collects a United States shipping address. Orders are prepared for delivery inside the country.",
  },
  {
    id: "dollars",
    title: "US Dollars",
    body: "Product prices, the bag, and checkout totals are shown in US dollars.",
  },
  {
    id: "shipping",
    title: "Free US Shipping",
    body: "Shipping is free on orders within the United States. Most orders leave within one to two business days.",
  },
  {
    id: "care",
    title: "Care",
    body: "Wash cold and line dry unless the product page says otherwise. Skip bleach and high heat.",
  },
  {
    id: "care-team",
    title: "Customer Care",
    body: "Email support@sablemuse.shop Monday through Friday, 9 am to 5 pm Eastern Time. We aim to reply within one business day.",
  },
]

export const MISSION_SUPPLIER_IMAGES: SustainabilityGalleryItem[] = [
  {
    src: "/images/followus/2.jpg",
    alt: "Sable Muse clothing detail",
  },
  {
    src: "/images/followus/3.jpg",
    alt: "Sable Muse textile detail",
  },
  {
    src: "/images/followus/4.jpg",
    alt: "A finished Sable Muse piece",
  },
  {
    src: "/images/followus/5.webp",
    alt: "Sable Muse outfit in natural light",
  },
]
