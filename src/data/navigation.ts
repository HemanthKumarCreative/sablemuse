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

export const COLLECTION_MEGA_MENU = {
  columns: [
    {
      title: "Category",
      links: [
        { label: "Shop All", href: "/shop-all" },
        { label: "New Arrivals", href: "/collection/new-arrivals" },
        { label: "Tops & Blouses", href: "/collection/tops-blouses" },
        { label: "Jeans & Pants", href: "/collection/jeans-pants" },
        { label: "Dresses & Jumpsuits", href: "/collection/dresses-jumpsuits" },
        { label: "Matching Sets & Lounge", href: "/collection/matching-sets-lounge" },
      ],
    },
    {
      title: "Featured",
      links: [
        { label: "New In", href: "/new-in" },
        { label: "Modiweek", href: "/modiweek" },
        { label: "Plus Size", href: "/plus-size" },
        { label: "Best Seller", href: "/collection/best-sellers" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Bundles", href: "/collection/bundles" },
        { label: "Occasion Wear", href: "/collection/occasion" },
        { label: "Matching Set", href: "/collection/matching-set" },
        { label: "Suiting", href: "/collection/suiting" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Tops & Blouses",
      href: "/collection/tops-blouses",
      image:
        "/images/collection/Lifestyle_Detail_Something_Tailored_Shirt_White_1400x.webp",
      alt: "Woman wearing a white tailored blouse",
    },
    {
      label: "Plus Size",
      href: "/plus-size",
      image: "/images/products/dress-offwhite.webp",
      alt: "Woman wearing a navy plus size dress",
    },
  ] satisfies MegaMenuFeatured[],
}

export const NEW_IN_MEGA_MENU = {
  columns: [
    {
      title: "Category",
      links: [
        { label: "Shop All", href: "/new-in" },
        { label: "Tops & Blouses", href: "/new-in/tops" },
        { label: "Tees", href: "/new-in/tees" },
        { label: "Pants", href: "/new-in/pants" },
        { label: "Jackets & Outwears", href: "/new-in/jackets" },
        { label: "Pullovers", href: "/new-in/pullovers" },
        { label: "Dresses & Jumpsuits", href: "/new-in/dresses" },
        { label: "Shorts & Skirts", href: "/new-in/shorts" },
      ],
    },
    {
      title: "Trending",
      links: [
        { label: "Plus Size", href: "/plus-size" },
        { label: "Fall Collection", href: "/new-in/fall" },
        { label: "Modiweek", href: "/modiweek" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Fall Collection",
      href: "/new-in/fall",
      image: "/images/new-in/fall-collection.png",
      alt: "Woman in olive green dress from the fall collection",
    },
    {
      label: "Blouses",
      href: "/new-in/tops",
      image: "/images/new-in/blouses.png",
      alt: "Woman wearing a white blouse and olive pants",
    },
    {
      label: "Dresses",
      href: "/new-in/dresses",
      image: "/images/new-in/dresses.png",
      alt: "Woman wearing a black sleeveless dress",
    },
  ] satisfies MegaMenuFeatured[],
}

export const PLUS_SIZE_MEGA_MENU = {
  columns: [
    {
      title: "Category",
      links: [
        { label: "Shop All", href: "/plus-size/shop-all" },
        { label: "Tops & Blouses", href: "/plus-size/tops" },
        { label: "Tees", href: "/plus-size/tees" },
        { label: "Pants", href: "/plus-size/pants" },
        { label: "Jackets & Outwears", href: "/plus-size/jackets" },
        { label: "Pullovers", href: "/plus-size/pullovers" },
        { label: "Dresses & Jumpsuits", href: "/plus-size/dresses" },
        { label: "Shorts & Skirts", href: "/plus-size/shorts" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Pants",
      href: "/plus-size/pants",
      image: "/images/plus-size/pants.png",
      alt: "Plus size pants look featuring patterned top and blue trousers",
    },
    {
      label: "Dresses",
      href: "/plus-size/dresses",
      image: "/images/plus-size/dresses.png",
      alt: "Plus size white sleeveless wrap dress",
    },
    {
      label: "Blouses",
      href: "/plus-size/tops",
      image: "/images/plus-size/blouses.png",
      alt: "Plus size black blouse with blue leggings",
    },
  ] satisfies MegaMenuFeatured[],
}

export const SUSTAINABILITY_MEGA_MENU = {
  columns: [
    {
      title: "Sustainability",
      links: [
        { label: "Mission", href: "/sustainability/mission" },
        { label: "Processing", href: "/sustainability/processing" },
        { label: "Materials", href: "/sustainability/materials" },
        { label: "Packaging", href: "/sustainability/packaging" },
        { label: "Product Care", href: "/sustainability/product-care" },
        { label: "Our Suppliers", href: "/sustainability/suppliers" },
      ],
    },
  ] satisfies MegaMenuColumn[],
  featured: [
    {
      label: "Mission",
      href: "/sustainability/mission",
      image: "/images/sustainability/lifestyle.png",
      alt: "Woman in a linen dress standing in a minimalist natural interior",
    },
    {
      label: "Materials",
      href: "/sustainability/materials",
      image: "/images/sustainability/materials.png",
      alt: "Sustainable linen fabric stacks with wooden thread spools and dried flowers",
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
    label: "New In",
    href: "/new-in",
    columns: NEW_IN_MEGA_MENU.columns,
    featured: NEW_IN_MEGA_MENU.featured,
    megaMenuVariant: "new-in",
  },
  { label: "Modiweek", href: "/modiweek" },
  {
    label: "Plus Size",
    href: "/plus-size",
    columns: PLUS_SIZE_MEGA_MENU.columns,
    featured: PLUS_SIZE_MEGA_MENU.featured,
    megaMenuVariant: "plus-size",
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    columns: SUSTAINABILITY_MEGA_MENU.columns,
    featured: SUSTAINABILITY_MEGA_MENU.featured,
    megaMenuVariant: "sustainability",
  },
]

export const FOOTER_LINKS = {
  about: [
    { label: "Collection", href: "/collection" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Support System", href: "/support" },
    { label: "Terms & Condition", href: "/terms" },
    { label: "Copyright Notice", href: "/copyright" },
  ],
  help: [
    { label: "Orders & Shipping", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  club: [
    { label: "Careers", href: "/careers" },
    { label: "Visit Us", href: "/visit-us" },
  ],
}
