export type MegaMenuLink = {
  label: string
  href: string
}

export type MegaMenuColumn = {
  title: string
  links: MegaMenuLink[]
}

export type MegaMenuFeatured = {
  label: string
  href: string
  image: string
  alt: string
}

export type MegaMenuVariant = "collection" | "new-in" | "plus-size" | "sustainability"

export type NavItem = {
  label: string
  href: string
  columns?: MegaMenuColumn[]
  featured?: MegaMenuFeatured[]
  megaMenuVariant?: MegaMenuVariant
}

const DRESSES_IMAGE =
  "https://cdn.shopify.com/s/files/1/0837/3767/3967/files/a1c77587142f47a3a297470e58d8cd05-Max.jpg?v=1788868696"
const TOPS_IMAGE =
  "https://cdn.shopify.com/s/files/1/0837/3767/3967/files/7f277721bd234f4db3cba707ffe5b721-Max.jpg?v=1788868751"
const SETS_IMAGE =
  "https://cdn.shopify.com/s/files/1/0837/3767/3967/files/1f72c81784154f1faf3133ab9d13b778-Max.jpg?v=1788868563"

export const COLLECTION_MEGA_MENU = {
  columns: [
    {
      title: "Collections",
      links: [
        { label: "Shop All", href: "/shop-all" },
        { label: "New Arrivals", href: "/collection/new-arrivals" },
        { label: "Dresses & Jumpsuits", href: "/collection/dresses-jumpsuits" },
        { label: "Tops & Blouses", href: "/collection/tops-blouses" },
        { label: "Jeans & Pants", href: "/collection/jeans-pants" },
        { label: "Matching Sets & Lounge", href: "/collection/matching-sets-lounge" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Dresses & Jumpsuits",
      href: "/collection/dresses-jumpsuits",
      image: DRESSES_IMAGE,
      alt: "A dress from the Sable Muse dresses and jumpsuits collection",
    },
    {
      label: "Matching Sets & Lounge",
      href: "/collection/matching-sets-lounge",
      image: SETS_IMAGE,
      alt: "A matching set from the Sable Muse lounge collection",
    },
  ] satisfies MegaMenuFeatured[],
}

export const SUSTAINABILITY_MEGA_MENU = {
  columns: [
    {
      title: "Sable Muse",
      links: [
        { label: "Our Story", href: "/sustainability" },
        { label: "Mission", href: "/sustainability/mission" },
        { label: "Care & Shipping", href: "/sustainability/materials" },
        { label: "FAQs", href: "/faq" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Our Story",
      href: "/sustainability",
      image: "/images/sustainability/lifestyle.png",
      alt: "Women's clothing from the Sable Muse collection",
    },
    {
      label: "Care & Shipping",
      href: "/sustainability/materials",
      image: TOPS_IMAGE,
      alt: "A top from the Sable Muse collection",
    },
  ] satisfies MegaMenuFeatured[],
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Collection",
    href: "/collection",
    columns: COLLECTION_MEGA_MENU.columns,
    featured: COLLECTION_MEGA_MENU.featured,
    megaMenuVariant: "collection",
  },
  {
    label: "New Arrivals",
    href: "/collection/new-arrivals",
  },
  {
    label: "Dresses & Jumpsuits",
    href: "/collection/dresses-jumpsuits",
  },
  {
    label: "Tops & Blouses",
    href: "/collection/tops-blouses",
  },
  {
    label: "Jeans & Pants",
    href: "/collection/jeans-pants",
  },
  {
    label: "Matching Sets",
    href: "/collection/matching-sets-lounge",
  },
]

export const FOOTER_LINKS = {
  about: [
    { label: "Collection", href: "/collection" },
    { label: "New Arrivals", href: "/collection/new-arrivals" },
    { label: "Our Story", href: "/sustainability" },
  ],
  help: [
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  club: [
    { label: "Our Mission", href: "/sustainability/mission" },
    { label: "Care", href: "/sustainability/materials" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
}
