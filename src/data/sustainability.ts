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
  image: string
  imageAlt: string
  imagePosition: "left" | "right"
}

export const SUSTAINABILITY_MATERIALS: SustainabilityMaterial[] = [
  {
    title: "Natural Fibers",
    body: "We prioritize natural and regenerative fibers — organic cotton, linen, and Cuproluxe — chosen for breathability, longevity, and a lighter footprint from field to finish.",
  },
  {
    title: "Closed-Loop Innovation",
    body: "Wherever possible we use materials made in zero-waste or closed-loop processes, reducing water use and keeping textiles in circulation instead of landfill.",
  },
]

export const SUSTAINABILITY_MATERIAL_DETAILS: SustainabilityMaterialDetail[] = [
  {
    id: "cotton",
    title: "Cotton",
    body: "We source organic and better-cotton programs that reduce water use and eliminate harmful pesticides. Soft, breathable, and built for everyday wear that lasts season after season.",
    image: "/images/sustainability.png",
    imageAlt: "Natural cotton boll representing Modimal cotton sourcing",
    imagePosition: "left",
  },
  {
    id: "wool",
    title: "Wool",
    body: "Our wool is selected from farms that prioritize animal welfare and land stewardship. Naturally temperature-regulating and resilient, it ages beautifully with care.",
    image: "/images/products/shirt-black.webp",
    imageAlt: "Wool knit texture in Modimal wardrobe essentials",
    imagePosition: "right",
  },
  {
    id: "linen",
    title: "Linen",
    body: "Linen requires far less water than conventional cotton and becomes softer with every wash. A low-impact fiber for warm-weather ease and lasting structure.",
    image: "/images/sustainability/materials.png",
    imageAlt: "Folded linen fabrics in earthy Modimal greens",
    imagePosition: "left",
  },
  {
    id: "silk",
    title: "Silk",
    body: "We favor responsibly produced silk with a fluid hand-feel and quiet sheen. Chosen for longevity and a refined drape that elevates everyday dressing.",
    image: "/images/products/dress-offwhite.webp",
    imageAlt: "Soft silk-inspired Modimal dress silhouette",
    imagePosition: "right",
  },
  {
    id: "cashmere",
    title: "Cashmere",
    body: "Traceable cashmere selected for warmth without weight. Designed as a long-term investment piece — repairable, wearable, and meant to stay in rotation.",
    image: "/images/collection/ezgif-2-f137fd9d7d.png",
    imageAlt: "Cashmere-inspired outerwear silhouette",
    imagePosition: "left",
  },
]

export const SUSTAINABILITY_GALLERY: SustainabilityGalleryItem[] = [
  {
    src: "/images/followus/follow-1.png",
    alt: "Studio styling with natural textures",
  },
  {
    src: "/images/followus/2.jpg",
    alt: "Team reviewing sustainable fabric samples",
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
    alt: "Everyday Modimal look in soft neutrals",
  },
]
