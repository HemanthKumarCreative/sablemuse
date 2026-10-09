# Sable Muse — App Router page inventory

Inventory of every `src/app/**/page.tsx`. Shared chrome from `src/app/layout.tsx` applies to all routes unless noted.

## Shared layout (all pages)

On every page:

1. **AnnouncementBar** — “Free Shipping On Orders Within The United States”.
2. **SiteHeader** — logo, flat desktop nav (`NAV_ITEMS` from `src/data/navigation.ts`: New Arrivals, Dresses, Tops, Jeans, Matching Sets), mobile nav, search overlay, wishlist link, account link, bag sheet (cart from Shopify via `CartProvider` / `fetchCart()`). There is no mega menu in the header; `MegaMenuPanel` is unused.
3. **`<main>`** — page content below.
4. **SiteFooter** — email update form (`mailto:hello@sablemuse.shop`), footer link columns (`FOOTER_LINKS`), social icons.

Providers: `WishlistProvider` (localStorage key `modimal-wishlist`) → `CartProvider` (Shopify cart). Root metadata default title: `Sable Muse | Contemporary Women's Fashion`.

## `next.config.ts` redirects

**None.** `next.config.ts` only configures `images` (`cdn.shopify.com`, `images.unsplash.com`). All route redirects are in-page via `redirect()` from `next/navigation`.

---

## Redirect-only pages

These render no UI; they immediately redirect to `/collection/new-arrivals`.

| Route | File | Redirect target |
| --- | --- | --- |
| `/modiweek` | `src/app/modiweek/page.tsx` | `/collection/new-arrivals` |
| `/modiweek/[day]` | `src/app/modiweek/[day]/page.tsx` | `/collection/new-arrivals` |
| `/plus-size` | `src/app/plus-size/page.tsx` | `/collection/new-arrivals` |
| `/plus-size/shop-all` | `src/app/plus-size/shop-all/page.tsx` | `/collection/new-arrivals` |
| `/new-in` | `src/app/new-in/page.tsx` | `/collection/new-arrivals` |

No metadata, no sections, no data fetches. Legacy ModiWeek / plus-size components and `src/data` files may still exist on disk; they are not rendered by these routes.

---

## `/` — Home

| | |
| --- | --- |
| **File** | `src/app/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | Absolute title `Sable Muse \| Women's Clothing`. Marketing homepage: hero and category product rails. Also sets `description` and Open Graph image `/images/hero.jpg`. |
| **Revalidate** | `3600` |

### Sections

1. **JSON-LD** — Organization schema for Sable Muse.
2. **WelcomeDialog** — First-visit modal (`localStorage` key `sablemuse-welcome-dismissed`): “Welcome To Sable Muse”, CTA **“Explore New Arrivals”** → `/collection/new-arrivals`.
3. **HeroSection** — Full-width `/images/hero.jpg`, headline “Elevated essentials, made to last”, CTA “Shop New Arrivals” → `/collection/new-arrivals`. Static image.
4. **BestSellersSection (“New Arrivals”)** — Up to 3 products from Shopify collection `COLLECTION_HANDLES["new-in"]` (`new-arrivals`). Uses `ProductCardRail` (carousel on small screens, grid on `md+`). Link to `/collection/new-arrivals`.
5. **BestSellersSection (“Dresses & Jumpsuits”)** — Up to 4 products from Shopify `dresses-jumpsuits`. Link to `/collection/dresses-jumpsuits`.
6. **BestSellersSection (“Tops & Blouses”)** — Up to 4 products from Shopify `tops-blouses`. Link to `/collection/tops-blouses`.
7. **BestSellersSection (“Jeans & Pants”)** — Up to 4 products from Shopify `jeans-pants`. Link to `/collection/jeans-pants`.
8. **BestSellersSection (“Matching Sets & Lounge”)** — Up to 4 products from Shopify `matching-sets-lounge`. Link to `/collection/matching-sets-lounge`.

Empty collection rails render nothing (`BestSellersSection` returns `null`).

### Key components / data

- Components: `WelcomeDialog`, `HeroSection`, `BestSellersSection` → `ProductCardRail` → `ProductCard` / `ScrollCarousel`
- Data: Shopify only (`getCollectionProducts` via `COLLECTION_HANDLES`). Does **not** import `src/data/home`.

Unused home components still on disk (not imported by `/`): `ModiweekSection`, `FollowUsSection`, `SustainabilitySection`, `CollectionSection`.

---

## `/collection` — Collection hub

| | |
| --- | --- |
| **File** | `src/app/collection/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Collection`. Hub to browse category cards, featured edits, and a new-arrivals preview. |
| **Revalidate** | `3600` |

### Sections

1. **JSON-LD** — CollectionPage schema.
2. **MerchandisingHero** — Eyebrow “Shop”, title “Collection”, short description; grid of category cards from first mega-menu column (`COLLECTION_MEGA_MENU`). Card images from Shopify (first product per handle; `/shop-all` uses new-in).
3. **Featured** — SectionHeader + 2 `CategoryCard`s from `COLLECTION_MEGA_MENU.featured` (static images/links).
4. **New Arrivals** — SectionHeader linking to `/collection/new-arrivals`; up to 3 `ProductCard`s from Shopify new-in.

### Key components / data

- Components: `MerchandisingHero`, `CategoryCard`, `ProductCard`, `SectionHeader`, `Container`
- Data: static `COLLECTION_MEGA_MENU` + Shopify product images / new arrivals

---

## `/collection/[slug]` — Collection PLP

| | |
| --- | --- |
| **File** | `src/app/collection/[slug]/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | Metadata title `Collection`. Product listing for a Shopify collection handle (mapped via `COLLECTION_HANDLES` or raw slug). Supports `?sort=` and `?filter=`. |

### Sections

1. **JSON-LD** — CollectionPage + ItemList of products.
2. **Breadcrumbs** — Home → Collection → `{Category Name}` (mobile bar + desktop).
3. **Page title (h1)** — Title-cased slug (e.g. `new-arrivals` → “New Arrivals”).
4. **CatalogBrowser** — Mobile filter sheet + desktop sticky filters (`CatalogFilters`), active filter chips, product grid (`ProductCard`), optional “Load More” via server action `loadMoreCatalog`. URL `sort` / `filter` params are parsed by `src/lib/catalog-params.ts` and passed into `getCatalogPage`, which applies Shopify `sortKey` / `ProductFilter` inputs.

### Key components / data

- Components: `CatalogBrowser`, `CatalogFilters`, `ProductCard`, `Breadcrumbs`, `Container`
- Data: Shopify via `getCatalogPage({ source: { kind: "collection", handle }, sort, filters })`

---

## `/shop-all` — Shop all PLP

| | |
| --- | --- |
| **File** | `src/app/shop-all/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Shop All`. Full catalog browse with lookbook hero. |

### Sections

1. **JSON-LD** — CollectionPage + ItemList.
2. **Breadcrumbs (mobile)** — Home → Shop All.
3. **ShopAllHero** — Lookbook carousel from static `SHOP_ALL_HERO_SLIDES` (`src/data/shop-all`).
4. **Breadcrumbs (desktop)** — Same trail under the hero.
5. **CatalogBrowser** — Same PLP chrome as collection slug; source is all products (`source: { kind: "products" }`), not the `all` collection handle.

### Key components / data

- Components: `ShopAllHero`, `CatalogBrowser`, `Breadcrumbs`
- Data: static hero slides + Shopify catalog (`getCatalogPage`)

---

## `/search` — Search

| | |
| --- | --- |
| **File** | `src/app/search/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | Dynamic: `Search` or `Search: {q}`. Storefront product search. |

### Sections

1. **sr-only h1** — “Search results”.
2. **SearchResultsBar** — Search input; submits to `/search?q=…`.
3. **Empty prompt** — If no query: “Enter a search term…”.
4. **CatalogBrowser** — When `q` present: Shopify search results with filters/sort/load more via `getCatalogPage({ source: { kind: "search", query }, sort, filters })`.

### Key components / data

- Components: `SearchResultsBar`, `CatalogBrowser`
- Data: Shopify search via `getCatalogPage` when `q` is set

Legacy `src/components/search/search-filters*.tsx` and static `SEARCH_FILTERS` in `src/data/search.ts` are unused by this page; live filters come from Shopify through `CatalogFilters`.

---

## `/product/[id]` — Product detail

| | |
| --- | --- |
| **File** | `src/app/product/[id]/page.tsx` |
| **Redirects** | No. `[id]` is the Shopify **handle**. Missing product → `notFound()`. Catalog error → retry panel (not `notFound`). |
| **Title / purpose** | Dynamic product name (plus meta description / Open Graph / Twitter / canonical from `productMetaDescription`). PDP with gallery, purchase controls, related products. |

### Sections

1. **JSON-LD** — Product (or AggregateOffer) + BreadcrumbList.
2. **Breadcrumbs** — Home → category → product name.
3. **ProductExperience** — Wraps gallery + purchase column:
   - **ProductGallery** — Image/video media from Shopify.
   - **ProductPurchasePanel** — Name, price, color swatches, size buttons, add to cart (`addToCartAction`), buy now (`buyNowAction` → Shopify `checkoutUrl`), wishlist toggle (localStorage), fit/size dialog; embeds **ProductAccordions** (fitting, care, shipping/returns).
4. **You May Also Like** — Only when recommendations return products: SectionHeader + `ProductCardRail`. Fetches `getProductRecommendations(product.gid, 4)`. If there is no `gid` or the list is empty, the section is omitted (no `getProducts` fallback).

Supports `?color=` and `?size=` query params for initial selection (`selectionFromQuery` / `exactVariant` in `src/lib/product-selection.ts`).

### Key components / data

- Components: `ProductExperience`, `ProductGallery`, `ProductPurchasePanel`, `ProductAccordions`, `ProductCardRail`, `Breadcrumbs`
- Data: Shopify (`getProduct`, `getProductRecommendations`); wishlist local

---

## `/cart` — Shopping bag

| | |
| --- | --- |
| **File** | `src/app/cart/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Your Cart`. Review bag before checkout. |

### Sections (`CartPageContent`)

**Empty state:** Back link, “Your Cart”, empty message, “Continue Shopping” → `/collection`.

**With items:**

1. Header row — Back → `/collection`, title, “Continue Shopping” → `/shop-all` (desktop).
2. Order summary list — Mobile `CartLineItem`s / desktop `CartTableRow`s (qty, remove; cart from Shopify via provider).
3. Totals — Subtotal, tax “Calculated at checkout”, shipping “Free”, order total; CTA “Next” → `/checkout`.

### Key components / data

- Components: `CartPageContent`, `CartLineItem`, `CartTableRow`
- Data: Shopify cart via `CartProvider` / `fetchCart()` (layout)

---

## `/checkout` — Checkout information

| | |
| --- | --- |
| **File** | `src/app/checkout/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Checkout Information`. Contact + US shipping address. |

### Sections

1. **CheckoutStepper** — Cart / Info / Shipping / Payment (current: Info).
2. **CheckoutInfoForm** — Contact email, newsletter checkbox (local only), US address fields, phone, country select (**United States / `US` only**), save-info checkbox (local only); saves via Shopify cart buyer identity / address action; continues to `/checkout/shipping`. Login link → `/login`. Optional customer access token from Customer Account session.
3. **CheckoutOrderSummary** — Line items, qty controls, subtotal / shipping / tax “Calculated at checkout” / total. On mobile, summary appears above the form.

### Key components / data

- Components: `CheckoutStepper`, `CheckoutInfoForm`, `CheckoutOrderSummary`
- Data: Shopify cart + Customer Account session (`getCustomerSession`)

---

## `/checkout/shipping` — Shipping method

| | |
| --- | --- |
| **File** | `src/app/checkout/shipping/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Shipping`. Choose delivery option for the cart. |

### Sections (`CheckoutShippingContent`)

1. **CheckoutStepper** — current: Shipping.
2. **CheckoutShippingForm** — Contact/ship-to summary strip, delivery option radios from Shopify delivery groups, continue → `/checkout/payment` after `selectDeliveryOptionAction`.
3. **CheckoutOrderSummary** — Sticky on large screens; shipping cost reflects selected option.

### Key components / data

- Components: `CheckoutShippingContent`, `CheckoutShippingForm`, `CheckoutOrderSummary`, `CheckoutStepper`
- Data: Shopify `fetchCartDelivery()` + cart provider

---

## `/checkout/payment` — Payment handoff

| | |
| --- | --- |
| **File** | `src/app/checkout/payment/page.tsx` |
| **Redirects** | No in-page redirect; CTA sends browser to Shopify hosted checkout (`cart.checkoutUrl`). |
| **Title / purpose** | `Payment`. Explain secure Shopify payment; no card fields on this site. |

### Sections

1. **CheckoutStepper** — current: Payment.
2. **CheckoutPaymentForm** — Copy about Shopify Checkout, accepted-method badges (Amex, Visa, Mastercard, Shop Pay, PayPal), “Continue To Secure Payment” → `window.location` to checkout URL.
3. **CheckoutOrderSummary** — Desktop sticky only.

### Key components / data

- Components: `CheckoutPaymentForm`, `CheckoutOrderSummary`, `CheckoutStepper`
- Data: Shopify `fetchCart()` for `checkoutUrl`

---

## `/checkout/success` — Order confirmed

| | |
| --- | --- |
| **File** | `src/app/checkout/success/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Order Confirmed`. Post-checkout thank-you; clears local cart state. |

### Sections (`CheckoutSuccessContent`)

1. Success check icon.
2. “Payment Successful” heading + thank-you / receipt copy.
3. Contact block with `hello@sablemuse.shop`.

On mount: `clearCart()` via cart provider (clears cookie only).

### Key components / data

- Components: `CheckoutSuccessContent`
- Data: none for display; cart clear is client/Shopify cookie side effect

---

## `/checkout/error` — Payment failed

| | |
| --- | --- |
| **File** | `src/app/checkout/error/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Payment Failed` (`robots: noindex`). Explain failure and retry. |

### Sections (`CheckoutErrorContent`)

1. Error icon / “Sorry, Payment Failed”.
2. Billing-address / alternate-method guidance.
3. “Retry” → `/checkout/payment`; “Back To My Order” → `/cart`.

### Key components / data

- Components: `CheckoutErrorContent`
- Data: static copy only

---

## `/wishlist` — Wish list

| | |
| --- | --- |
| **File** | `src/app/wishlist/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `My Wish List`. Saved product handles resolved against catalog. |

### Sections (`WishlistPageContent`)

1. Centered title “My Wish List” + item count (or Loading… / empty message).
2. Product grid of wishlisted `ProductCard`s (favorited), or empty-state copy.

### Key components / data

- Components: `WishlistPageContent`, `ProductCard`
- Data: Shopify `getProducts(50)` for lookup map + localStorage handles via `WishlistProvider`

---

## `/login` — Log in

| | |
| --- | --- |
| **File** | `src/app/login/page.tsx` |
| **Redirects** | No (OAuth starts at `/api/auth/login`). |
| **Title / purpose** | `Log In`. Shopify Customer Account sign-in entry. |

### Sections

1. **JSON-LD** — WebPage.
2. **Hero image** — `/images/auth/register.jpg` (full-bleed mobile; left column on desktop).
3. **LoginForm** — Title, Shopify CTA → `/api/auth/login`, optional `?error=` message, link to `/register`.

### Key components / data

- Components: `LoginForm`, `Container`
- Data: static imagery; auth via Customer Account API route (not Storefront catalog)

---

## `/register` — Create account

| | |
| --- | --- |
| **File** | `src/app/register/page.tsx` |
| **Redirects** | No (same OAuth entry as login). |
| **Title / purpose** | `Create Account`. Register through Shopify Customer Account. |

### Sections

1. **JSON-LD** — WebPage.
2. **Hero image** — Same auth image layout as login.
3. **RegisterForm** — CTA → `/api/auth/login`, link to `/login`, Terms → `/terms`, Privacy → `/privacy`.

### Key components / data

- Components: `RegisterForm`, `Container`
- Data: static; OAuth via `/api/auth/login`

---

## `/faq` — FAQs

| | |
| --- | --- |
| **File** | `src/app/faq/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `FAQs`. Common questions accordion. |

### Sections

1. **JSON-LD** — FAQPage from FAQ items.
2. **Breadcrumbs** — Home → FAQs.
3. **h1** — “FAQs”.
4. **FaqAccordion** — Multi-open accordion of `FAQ_ITEMS`.

### Key components / data

- Components: `FaqAccordion`, `Breadcrumbs`
- Data: static `src/data/faq`

---

## `/contact-us` — Contact

| | |
| --- | --- |
| **File** | `src/app/contact-us/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Contact Us`. Customer care channels and mailto form. |

### Sections

1. **JSON-LD** — ContactPage.
2. **Breadcrumbs** — Home → Contact Us.
3. **h1** + intro panel — Hours and `hello@sablemuse.shop`.
4. **ContactChannels** — Mobile: Write Us dialog, Chat/Call accordions (email CTAs). Desktop: similar channels + inline `ContactForm` / `WriteUsDialog` (`mailto:hello@sablemuse.shop`; not stored server-side).

### Key components / data

- Components: `ContactChannels`, `ContactForm`, `WriteUsDialog`, `Breadcrumbs`
- Data: static copy; no Shopify catalog

---

## `/sustainability` — Our Story

| | |
| --- | --- |
| **File** | `src/app/sustainability/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Our Story`. Brand/story page (route kept; copy is shop story, not Modimal sustainability claims). |

### Sections

1. **JSON-LD** — WebPage.
2. **Hero** — h1 “Our Story” + full-bleed materials image with overlay line “Women's clothing, priced in US dollars”.
3. **The Shop** — Two text blocks from `SUSTAINABILITY_MATERIALS`; lifestyle image pair; CTA “Care And Shipping” → `/sustainability/materials`.
4. **Orders In The United States** — Featured image from mega-menu static data + shipping/returns copy; CTA “Our Mission” → `/sustainability/mission`; gallery grid from `SUSTAINABILITY_GALLERY`.
5. **Explore Topics** — Link list from `SUSTAINABILITY_MEGA_MENU` columns.

### Key components / data

- Components: `Container`, `Button`, Next `Image`/`Link`
- Data: static `src/data/sustainability` + `src/data/navigation` (`SUSTAINABILITY_MEGA_MENU`)

---

## `/sustainability/mission` — Our Mission

| | |
| --- | --- |
| **File** | `src/app/sustainability/mission/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Our Mission`. Mission narrative and pillars. |

### Sections

1. **JSON-LD** — WebPage.
2. **Breadcrumbs** — Home → Sustainability → Mission.
3. **Hero image** — `MISSION_HERO` with caption overlay.
4. **h1 + intro** — `MISSION_INTRO`.
5. **How We Work** — `MissionPillarsAccordion` from `MISSION_PILLARS`.
6. **Image strip** — Featured + lifestyle images (`MISSION_SUPPLIER_IMAGES`); “Contact Us” CTA → `/contact-us`. There is no `/sustainability/suppliers` page.
7. **Closing statement** — `MISSION_STATEMENT`.

### Key components / data

- Components: `MissionPillarsAccordion`, `Breadcrumbs`
- Data: static `src/data/sustainability`

---

## `/sustainability/materials` — Care And Shipping

| | |
| --- | --- |
| **File** | `src/app/sustainability/materials/page.tsx` |
| **Redirects** | No |
| **Title / purpose** | `Care And Shipping`. Shipping, returns, care, sizing detail. |

### Sections

1. **JSON-LD** — WebPage.
2. **Breadcrumbs** — Home → Sustainability → Care And Shipping.
3. **h1 + intro** — `MATERIALS_INTRO`.
4. **MaterialsList** — Expandable topics from `SUSTAINABILITY_MATERIAL_DETAILS` (shipping, returns, care, sizing, etc.) with composite images.
5. **Closing paragraphs** — `MATERIALS_CLOSING`, `MATERIALS_REPORT_PREFIX`.
6. **Back link (desktop)** — “Back To Sustainability” → `/sustainability`.

### Key components / data

- Components: `MaterialsList`, `Breadcrumbs`
- Data: static `src/data/sustainability`

---

## Policy pages (shared shell)

All use `PolicyPage` from `src/components/content/policy-page.tsx`: breadcrumbs (Home → title), h1, prose body. **Static inline copy** in each page file; no Shopify.

### `/shipping` — Shipping

| | |
| --- | --- |
| **File** | `src/app/shipping/page.tsx` |
| **Title** | `Shipping` |
| **Content** | US free shipping, 1–2 business day dispatch, tracking email, tax at Shopify checkout, change-order email. |

### `/returns` — Returns

| | |
| --- | --- |
| **File** | `src/app/returns/page.tsx` |
| **Title** | `Returns` |
| **Content** | 30-day returns, email to start, refunds via Shopify, sizing help. |

### `/privacy` — Privacy

| | |
| --- | --- |
| **File** | `src/app/privacy/page.tsx` |
| **Title** | `Privacy` |
| **Content** | Cart cookie `modimal_cart_id`, customer session cookies, wishlist localStorage, mailto-only contact, California request section. |

### `/terms` — Terms

| | |
| --- | --- |
| **File** | `src/app/terms/page.tsx` |
| **Title** | `Terms` |
| **Content** | US sales, USD, Shopify-hosted payment, order acceptance/cancellation, points to Shipping/Returns. |

---

## Quick reference

| Route | Redirect? | Primary data |
| --- | --- | --- |
| `/` | No | Shopify collections (five rails) |
| `/collection` | No | Shopify + `COLLECTION_MEGA_MENU` |
| `/collection/[slug]` | No | Shopify `getCatalogPage` (collection) |
| `/shop-all` | No | Shopify `getCatalogPage` (products) + `shop-all` hero |
| `/search` | No | Shopify `getCatalogPage` (search) |
| `/product/[id]` | No (`notFound` / error panel) | Shopify PDP |
| `/cart` | No | Shopify cart |
| `/checkout` | No | Shopify cart + customer session |
| `/checkout/shipping` | No | Shopify delivery |
| `/checkout/payment` | Handoff to Shopify Checkout URL | Shopify cart |
| `/checkout/success` | No | Client cart clear |
| `/checkout/error` | No | Static |
| `/wishlist` | No | Shopify products + localStorage |
| `/login` | OAuth via `/api/auth/login` | Customer Account |
| `/register` | OAuth via `/api/auth/login` | Customer Account |
| `/faq` | No | `src/data/faq` |
| `/contact-us` | No | Static / mailto |
| `/sustainability` | No | `src/data/sustainability` + navigation |
| `/sustainability/mission` | No | `src/data/sustainability` |
| `/sustainability/materials` | No | `src/data/sustainability` |
| `/shipping` | No | Static (`PolicyPage`) |
| `/returns` | No | Static (`PolicyPage`) |
| `/privacy` | No | Static (`PolicyPage`) |
| `/terms` | No | Static (`PolicyPage`) |
| `/modiweek` | → `/collection/new-arrivals` | — |
| `/modiweek/[day]` | → `/collection/new-arrivals` | — |
| `/plus-size` | → `/collection/new-arrivals` | — |
| `/plus-size/shop-all` | → `/collection/new-arrivals` | — |
| `/new-in` | → `/collection/new-arrivals` | — |
