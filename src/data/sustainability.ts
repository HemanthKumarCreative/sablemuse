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
  "At Modimal, We Believe In Investing In The Now To Design For The Future. That’s Why We Are Committed To Sourcing Quality Materials That Will Have Less Impact On The Environment. So Far In 2022, 92% Of The Base Fabrics In Our Collection Are More Sustainably Sourced. Our Goal Is To Use Only 100% Sustainably Sourced Materials By 2025. There Are Five Kinds Of Fabrics In Our Collections That Are Organic And Responsible Sourced, And We Highlight These So You Can Make Considered Choices When You Shop."

export const MATERIALS_CLOSING = [
  "We Are Continually Exploring More Sustainable Alternatives That Offer The Same Quality And Performance. We Will Soon Add New Fabrics In To Our Collections Which Are Recycling And Repurposing. By Giving A New Life To Leftover Fabrics Through Recycling And Repurposing, We Can Reduce Our Demand On The Planet’s Limited Natural Resources. Recycled Fabrics Are Made Using The Waste From Both The Pre- And Post-Consumer Stage Of A Product’s Life.",
] as const

export const MATERIALS_REPORT_PREFIX =
  "We Track Our Material Usage And Progress Annually As Part Of Textile Exchange’s Corporate Fibers And Materials Benchmark, View Our Latest Report"

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
    preview: "We Source Certified Organic Cotton, Which Is...",
    body: "We Source Certified Organic Cotton, Which Is Grown Without The Use Of Pesticides Or Synthetic Fertilizers And Requires Less Irrigation As It Relies Mainly On Rainwater. This Preserves Soil Biodiversity And Protects The Health Of Communities. Our Fabrics Are Made Using Organic Cotton Yarns That Are Certified To The Global Organic Textile Standard (GOTS).",
    image: "/images/sustainability.png",
    secondaryImage:
      "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
    imageAlt: "Organic cotton and a tailored white Modimal shirt",
    imagePosition: "left",
  },
  {
    id: "wool",
    title: "Wool",
    preview: "Wool Is A Natural Fiber With Added...",
    body: "Wool Is A Natural Fiber With Added Performance Attributes Such As Temperature Regulation, Durability, And Natural Water Repellency. Considered A Circular Product By Nature, Wool Can Be Recycled Or Biodegraded Easily. Animal Welfare Is Extremely Important To Us, And Therefore We Only Source Mulesing-Free Wool From Producers That Follow Humane And Eco-Friendly Processes Aligned With Our Animal Welfare Guidelines.",
    image: "/images/products/shirt-black.webp",
    secondaryImage: "/images/followus/3.jpg",
    imageAlt: "Wool coat silhouette and raw wool fiber texture",
    imagePosition: "right",
  },
  {
    id: "linen",
    title: "Linen",
    preview: "Found Throughout Our Collections, Linen Is A...",
    body: "Found Throughout Our Collections, Linen Is A Sustainable Fiber Made From The Flax Plant That Requires Significantly Less Water And Energy To Produce Than Conventional Cotton. The Flax Plant Is Naturally Pest Resistant And Sequesters Carbon Into The Soil, Which Removes Carbon Dioxide From The Atmosphere And Is Beneficial For Improving Soil Health.",
    image:
      "/images/collection/Save_The_Date_Dress_Khaki_Lifestyle_Khaki_Main_720x.webp",
    secondaryImage: "/images/sustainability/materials.png",
    imageAlt: "Linen dress and flax plant materials",
    imagePosition: "left",
  },
  {
    id: "silk",
    title: "Silk",
    preview: "Organic Silk Is A More Responsible Alternative...",
    body: "Organic Silk Is A More Responsible Alternative To Conventional Silk. Silkworms Are Fed Mulberry Leaves From Trees Grown Without Pesticides And Harmful Chemicals, Creating An Environment That Supports Exquisite Quality With A Lighter Footprint.",
    image: "/images/followus/5.webp",
    secondaryImage: "/images/products/dress-offwhite.webp",
    imageAlt: "Silk cocoons and a fluid Modimal silk dress",
    imagePosition: "right",
  },
  {
    id: "cashmere",
    title: "Cashmere",
    preview: "We’re Proud To Source Our Cashmere Throug...",
    body: "We’re Proud To Source Our Cashmere Through The Good Cashmere Standard By The Aid By Trade Foundation (AbTF), Which Ensures Traceable, Sustainably Certified Cashmere That Protects The Environment And The Welfare Of Cashmere Goats And Herders.",
    image: "/images/followus/2.jpg",
    secondaryImage: "/images/collection/ezgif-2-f137fd9d7d.png",
    imageAlt: "Cashmere source imagery and a soft Modimal outerwear piece",
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

export type MissionPillar = {
  id: string
  title: string
  body: string
}

export const MISSION_INTRO =
  "At Modimal, We Believe That Fashion Can Be Both Beautiful And Responsible. Our Mission Is Rooted In Six Pillars That Guide Every Decision — From Design To Delivery."

export const MISSION_HERO = {
  src: "/images/sustainability/hero-fabrics.png",
  alt: "Neutral Modimal tank tops draped over an arm against a textured wall",
  caption: "Elegance In Simplicity, Earth’s Harmony",
} as const

export const MISSION_STATEMENT =
  "With Modimal, You're Not Just Wearing Fashion – You're Making A Statement. A Statement That Elegance And Sustainability Can Coexist, Shaping A More Responsible And Beautiful Future For Us All."

export const MISSION_PILLARS: MissionPillar[] = [
  {
    id: "minimalism",
    title: "Minimalism",
    body: "We design fewer, better pieces — timeless silhouettes meant to be worn often and kept longer, reducing excess without reducing joy.",
  },
  {
    id: "ethical",
    title: "Ethical",
    body: "Fair wages, safe workplaces, and respectful partnerships are non-negotiable. We choose makers who treat people with care at every step.",
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly Materials",
    body: "From organic cotton to Cuproluxe and regenerative fibers, we prioritize materials that feel exceptional and tread more lightly on the planet.",
  },
  {
    id: "circular",
    title: "Circular",
    body: "We design for longevity, repairability, and end-of-life thinking — keeping textiles in use and out of landfill whenever we can.",
  },
  {
    id: "transparency",
    title: "Transparency",
    body: "We share our progress from sourcing to production and update our information every six months so you can follow the journey with us.",
  },
  {
    id: "community",
    title: "Community And Empowerment",
    body: "We invest in communities connected to our supply chain and invite customers into a culture of care, education, and collective impact.",
  },
]

export const MISSION_SUPPLIER_IMAGES: SustainabilityGalleryItem[] = [
  {
    src: "/images/followus/2.jpg",
    alt: "Supplier reviewing natural fiber samples",
  },
  {
    src: "/images/followus/3.jpg",
    alt: "Artisan hands working with textile materials",
  },
  {
    src: "/images/followus/4.jpg",
    alt: "Production partner finishing a garment",
  },
  {
    src: "/images/followus/5.webp",
    alt: "Workshop team collaborating on sustainable pieces",
  },
]
