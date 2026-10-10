# Agent guide

Operational map of this repository. Cursor rules in `.cursor/rules/` repeat the constraints that must not be broken. This file is the longer reference. Per-route UI detail lives in `docs/pages.md`.

## What this app is

A headless storefront for a women's fashion shop.

- Product grids, product detail, search, cart, and the checkout steps before payment read the **Shopify Storefront API**.
- Sign-in uses the **Shopify Customer Account API** (hosted OAuth). There is no local user database.
- Nav, FAQ, the shop story, policy copy, and some hero slides are **static files** in `src/data`.
- Payment happens on **Shopify hosted checkout**. This app never sees card data.

Customer-facing copy is **Sable Muse**, for the United States, with prices in US dollars. `/modiweek`, `/modiweek/[day]`, `/plus-size`, `/plus-size/shop-all`, and `/new-in` redirect to `/collection/new-arrivals`. Do not reintroduce Modimal copy or another brand's material statistics. Internal cookies (`modimal_cart_id` and the customer cookies) keep their names so existing carts and sessions stay intact.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16.3 App Router (`src/app`) |
| UI | React 19, Tailwind CSS 4, `tw-animate-css` |
| Components | shadcn `base-nova` in `components.json`, primitives on `@base-ui/react` |
| Icons | `lucide-react` |
| Class names | `cn` package, re-exported from `src/lib/utils.ts` |
| Tests | Playwright, config `e2e/playwright.config.ts` |
| Path alias | `@/*` → `./src/*` |
| Images | `next/image` may load `https://cdn.shopify.com/**` (`next.config.ts`) |

`e2e/` is excluded from the app `tsconfig.json` and from ESLint. There is no Prettier config and no `middleware.ts`.

## Run

```bash
npm run dev          # http://localhost:3000
npm run lint
npm run build
npm run test:e2e     # starts Next on 127.0.0.1:4173
```

Copy `.env.example` to `.env.local`. Do not commit `.env.local`.

| Variable | Role |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Storefront host |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront token. Server only |
| `SHOPIFY_STOREFRONT_API_VERSION` | Default `2025-10` |
| `SHOPIFY_USE_MOCK_FALLBACK` | Present in `.env.example`. **Not read** |
| `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` | Customer Account OAuth |
| `SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID` | Discovery URL `shopify.com/{shopId}` |
| `SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL` | Default `http://localhost:3000/api/auth/callback` |
| `CUSTOMER_SESSION_SECRET` | HMAC for auth cookies. All three customer vars must be set or login is disabled |
| `NEXT_PUBLIC_SITE_URL` | Metadata base and auth redirect base. Default `http://localhost:3000` |

## Directory

```
src/app                 routes and three auth route handlers
src/components          feature UI plus ui/ primitives
src/data                static content
src/lib/shopify         Storefront client, catalog, queries, cart
src/lib/customer        Customer Account OAuth and session
src/lib/catalog-params  URL sort/filter helpers for PLPs
src/lib/product-selection  PDP color/size → variant matching
src/types/commerce.ts   Product, ProductDetail, CartSummary, delivery types
e2e                     Playwright
```

There is no `src/hooks` folder. `components.json` still aliases `@/hooks`.

## Provider tree

`src/app/layout.tsx` is an async Server Component. It loads Source Sans 3 (`--font-sans-var`) and Cormorant Garamond (`--font-serif-var`), then:

```
html > body
  WishlistProvider          localStorage handles (modimal-wishlist)
    CartProvider            initialCart from fetchCart()
      SiteHeader            includes AnnouncementBar
      main > children
      SiteFooter
```

## Domain types

Defined in `src/types/commerce.ts`. Mapped in `src/lib/shopify/mappers/product.ts`.

- `Product.id` is the **handle**, not the Shopify GID.
- `ProductDetail.gid` is the Shopify product id. Pass that to `getProductRecommendations`.
- `Product.price` is a number (parsed from the money string). `compareAtPrice` is set when Shopify's compare-at amount is higher than the price.
- `CartItem.productId` is the handle. `CartItem.merchandiseId` is the variant id. `CartItem.id` is the cart line id.
- `CartSummary.checkoutUrl` is Shopify's URL. `subtotal` is `cost.subtotalAmount`. `cost.totalAmount` is fetched and not mapped.
- Fit, fabric care, and the size chart come from `parseDescription(descriptionHtml)` in `src/lib/shopify/description.ts`. Shipping/returns copy comes from `src/data/shipping-policy.ts` via `shippingCopy()`. Size options render as buttons. The breadcrumb is one apparel collection when the product belongs to one, or the collection the title points at when it belongs to several. Otherwise it is Shop (`/shop-all`). Plus-size alone still crumbs to that collection.

Colors: `isColorOption` matches `color` or `colour`. `isSizeOption` matches `size` or `sizes`. `colorNameToHex` returns `#0C0C0C` for unknown names.

## Catalog API

Import simple catalog helpers from `@/lib/shopify`. Import paginated PLP helpers from `@/lib/shopify/catalog` and `@/lib/shopify/catalog-actions`.

| Function | Notes |
| --- | --- |
| `getProducts(limit = 12)` | First products. Failure → `[]` |
| `getProduct(handle)` | `ready`, `missing` (`notFound()`), or `error` (retry panel). Revalidates every 60 seconds. Media and variants are paged past the first request |
| `getCollectionProducts(handle, limit = 24)` | Thin wrapper over `getCatalogPage({ source: { kind: "collection", handle }, limit })`. Missing collection → `[]` |
| `getCatalogPage({ source, limit, cursor, sort, filters })` | Paginated products + Shopify filter groups. `source` is `collection` / `products` / `search`. Failure → empty page |
| `loadMoreCatalog(...)` | Server action used by `CatalogBrowser` for “Load More” |
| `getProductRecommendations(productId, limit = 4)` | `productId` must be a GID. Failure → `[]` |
| `searchProducts(query, limit = 24)` | `cache: "no-store"`. Blank query → `[]` |
| `predictiveSearchProducts(query, limit = 8)` | On throw, falls back to `searchProducts` |
| `fetchShopifyNavItems(handle = "main-menu")` | **Not used by any page.** Fallback is `NAV_ITEMS` |

URL helpers: `parseCatalogSort`, `parseCatalogFilters`, `catalogHref` in `src/lib/catalog-params.ts`. Sort values: `featured`, `best-selling`, `price-asc`, `price-desc`. Filter query params are JSON strings of Shopify `ProductFilter` inputs.

`shopifyFetch` caches catalog GETs for 3600 seconds. Mutations and `no-store` calls are uncached. There are no `revalidateTag` calls.

Collection handles (`src/lib/shopify/collections.ts`):

| Route key | Shopify handle |
| --- | --- |
| `shop-all` | `all` |
| `new-in` | `new-arrivals` |
| `collection` | `frontpage` |
| `plus-size`, `plus-size-shop-all` | `plus-size` |
| `best-sellers` | `best-sellers` |
| `dresses-jumpsuits`, `tops-blouses`, `jeans-pants`, `matching-sets-lounge` | same string |

`/collection/[slug]` uses `COLLECTION_HANDLES` for known slugs and otherwise passes the slug through as the handle. PLPs (`/collection/[slug]`, `/shop-all`, `/search`) call `getCatalogPage` directly. Home rails and the collection hub use `getCollectionProducts`.

## Cart

Cookie `modimal_cart_id` (httpOnly, `sameSite: lax`, 14 days, `secure` in production). Server actions in `src/lib/shopify/cart/actions.ts`:

| Action | Behavior |
| --- | --- |
| `fetchCart` | No cookie or error → empty cart. Cart gone from Shopify → clear cookie |
| `fetchCartDelivery` | Same, plus `deliveryGroups`. GraphQL errors propagate |
| `addToCartAction` | Adds lines, or `createCart` if there is no cookie. Revalidates the layout |
| `buyNowAction` | Creates a one-line cart and returns `checkoutUrl` (does not merge into the bag cookie) |
| `updateCartLineAction` | Quantity `<= 0` removes the line |
| `removeCartLineAction` | Removes one line |
| `clearCartAction` | Clears the cookie only |
| `updateCheckoutInfoAction` | Buyer identity, then delivery address. Revalidates `/checkout` |
| `selectDeliveryOptionAction` | Selects a rate on a delivery group |
| `getCheckoutUrlAction` | Returns `checkoutUrl` or throws `"Checkout URL unavailable"` |

Empty cart shape: `{ id: "", checkoutUrl: "", totalQuantity: 0, subtotal: 0, currencyCode: "USD", items: [] }`.

`CartProvider` exposes `addItem`, `removeItem`, `incrementItem`, `decrementItem`, `clearCart`, `refreshCart`, plus `items`, `itemCount`, `subtotal`, `checkoutUrl`. The bag sheet's checkout link goes to `/cart`. The cart page "Next" button goes to `/checkout`. Cart and checkout UI show tax as **“Calculated at checkout”** — there is no client-side tax estimate.

## Checkout path

1. `/checkout` — `CheckoutInfoForm` posts email, name, address, phone, country (**`US` only**) through `updateCheckoutInfoAction`, then `router.push("/checkout/shipping")`. The signed-in access token is attached as `customerAccessToken` when a session exists.
2. `/checkout/shipping` — radios from `deliveryGroups[0]`. Submit calls `selectDeliveryOptionAction`, then `/checkout/payment`.
3. `/checkout/payment` — "Continue To Secure Payment" sets `window.location` to `checkoutUrl`. Brand names on the page are static.
4. `/checkout/success` — clears the local cart cookie. It does not read an order.
5. `/checkout/error` — static failure copy. Retry links to `/checkout/payment`.

Do not add card fields, payment tokens, or a checkout-complete mutation.

## Customer auth

`src/lib/customer/auth.ts`, `pkce.ts`, `session.ts`, `config.ts`, `queries.ts`.

1. `GET /api/auth/login`. If customer env is incomplete, redirect to `/login?error=auth_not_configured`.
2. Discover OpenID config at `https://shopify.com/{shopId}/.well-known/openid-configuration`.
3. Store PKCE verifier, state, and nonce in signed cookie `modimal_customer_pkce` (10 minutes).
4. Redirect to Shopify. Scopes: `openid email customer-account-api:full`.
5. `GET /api/auth/callback` checks `state`, exchanges the code, deletes the PKCE cookie, sets `modimal_customer_access` and `modimal_customer_refresh` (30 days). Nonce is not checked against an ID token. Refresh token is never used. Success redirects to `/`.
6. `GET /api/auth/logout` deletes the three customer cookies and redirects to `end_session_endpoint` when present. No page links here.

`fetchCustomerProfile` hits `https://shopify.com/{shopId}/account/customer/api/2025-10/graphql` and nothing imports it.

`/login` and `/register` are the same "Continue With Shopify" link. Register terms point at `/terms` and `/privacy`.

## Routes

Every `page.tsx` is a server component. Client pieces are children. Full section inventories are in `docs/pages.md`.

| Path | Data |
| --- | --- |
| `/` | Five Shopify collection rails (new-in ×3, dresses/tops/jeans/matching-sets ×4 each) |
| `/shop-all` | `getCatalogPage({ source: { kind: "products" } })` + lookbook hero from `shop-all.ts` |
| `/collection` | Category tiles from `COLLECTION_MEGA_MENU`. Products from `new-arrivals` |
| `/collection/[slug]` | `getCatalogPage` with collection handle + URL sort/filters |
| `/new-in`, `/plus-size`, `/plus-size/shop-all`, `/modiweek`, `/modiweek/[day]` | Redirect to `/collection/new-arrivals` |
| `/product/[id]` | `getProduct(id)` then recommendations by GID. Unknown handle → `notFound()`. Catalog error → retry panel |
| `/search?q=` | `getCatalogPage` search source. Empty query shows a prompt |
| `/cart` | Cart context |
| `/wishlist` | `getProducts(50)` filtered by `modimal-wishlist` handles |
| `/checkout`, `/checkout/shipping`, `/checkout/payment`, `/checkout/success`, `/checkout/error` | Cart API, then hosted checkout |
| `/login`, `/register` | Link to `/api/auth/login` |
| `/contact-us` | Static. Forms open `mailto:support@sablemuse.shop` |
| `/faq` | `FAQ_ITEMS` in `src/data/faq.ts` |
| `/sustainability`, `/sustainability/materials`, `/sustainability/mission` | Sable Muse shop story in `src/data/sustainability.ts` |
| `/shipping`, `/returns`, `/privacy`, `/terms` | Static policy pages via `PolicyPage` |

## Static data vs live data

Still the source of truth for chrome and content pages:

- `src/data/navigation.ts` — header `NAV_ITEMS`, mobile nav, footer links, `COLLECTION_MEGA_MENU`, `SUSTAINABILITY_MEGA_MENU`
- `src/data/faq.ts`, `src/data/sustainability.ts`, `src/data/shipping-policy.ts`
- Hero slides in `src/data/shop-all.ts`

Legacy / unused by live routes (files remain):

- `src/data/home.ts` — `MODIWEEK` day images (home page does not import this)
- `src/data/modiweek.ts`, `src/data/plus-size.ts`, `src/data/search.ts` filter chrome
- `src/components/modiweek/*`, `src/components/home/modiweek-section.tsx`, `follow-us-section.tsx`, `sustainability-section.tsx`, `collection-section.tsx`
- `src/components/search/search-filters*.tsx`, `src/components/navigation/mega-menu-*`

Live PLP filters come from Shopify via `getCatalogPage` + `CatalogFilters`, not from those static filter objects.

Do not treat as live:

- Contact form, footer newsletter, and chat "Start Chat" open mailto or local UI only; they do not POST to an API.
- Welcome dialog key is `sablemuse-welcome-dismissed`. CTA goes to `/collection/new-arrivals`.

## Component map

Add `"use client"` only for state, effects, or context. Match the import style of the feature you touch.

| Folder | Role |
| --- | --- |
| `components/layout` | Announcement bar, header, desktop nav (flat links), footer |
| `components/navigation` | Mobile nav, search overlay; mega-menu files exist but are unused by the header |
| `components/home` | Welcome dialog, hero, best-sellers rails (live). Other home sections are orphaned |
| `components/product` | Card, card rail, experience shell, gallery, purchase panel, accordions |
| `components/catalog` | PLP browser, Shopify-driven filters, load more |
| `components/cart` | Provider, bag sheet, line item, table row, cart page |
| `components/checkout` | Stepper, info, shipping, payment, summary, success, error |
| `components/search` | Results bar (live). Legacy filter components unused by routes |
| `components/wishlist` | Provider and page body |
| `components/auth` | Login and register forms |
| `components/contact` | Channels, form, write-us dialog |
| `components/faq` | Accordion over `FAQ_ITEMS` |
| `components/content` | Shared `PolicyPage` shell |
| `components/modiweek` | Orphaned; routes redirect |
| `components/sustainability` | Materials list, mission pillars |
| `components/collection` | Merchandising hero, category card |
| `components/shop` | Shop-all hero carousel |
| `components/shared` | Container, section header, breadcrumbs, scroll carousel |
| `components/ui` | Base UI wrappers used by the app |
| `components/icons` | Social SVGs |

## Styling

- Tailwind classes on elements. Do not add a new CSS file for a component.
- Page width: `Container` uses `max-w-modimal` (`--container-modimal: 1240px` in `globals.css`). Header uses the same `Container`.
- Quiet-luxury tokens (`src/app/globals.css`): alabaster paper `#FDFBF7`, sable ink `#1C1A17` (`text-brand-navy` / `--ink`), muted ink `#6B635B` (`--ink-muted`), rosewood fills `#8F6565` (`bg-brand` / `--primary`, hover `--brand-hover` `#7A5454`), focus ring `#A87C7C`. Olive `#5F6E50` is for sustainability chips only. Square radius (`0`) except color swatches and carousel dots. Serif headlines use `.heading-page` / `.heading-section` (Cormorant Garamond).
- No `.dark` token block. Do not add a theme toggle unless asked.
- Accessible names already drive Playwright. Keep buttons and links named. Do not add `data-testid` unless a new test cannot see the control by role.

## Code style in this repo

ESLint is `eslint-config-next` only. The codebase itself is stricter:

- No semicolons. `src/components/layout/site-footer.tsx` is the exception.
- Double quotes.
- `const name = () =>` rather than `function`.
- Event handlers start with `handle`.
- Early returns.
- Kebab-case filenames. Route files stay `page.tsx`, `layout.tsx`, `route.ts`.

## Tests

Playwright projects: desktop 1440×900, tablet 768×1024, mobile iPhone 13. Import `test` and `expect` from `e2e/helpers/fixtures.ts`.

The default fixture writes `localStorage["modimal-welcome-dismissed"]` and `modimal-cart`. The app now dismisses the welcome dialog with `sablemuse-welcome-dismissed` and stores the cart in an httpOnly cookie, so those fixtures do not drive app state. Several specs still look for Modimal copy and for products such as `/product/wrap-top` and a search for `pants`. Do not "fix" the app to satisfy a stale assertion unless the task is to update the tests or that screen.

## Leave these alone unless the task says otherwise

- Hardcoded shipping/returns policy strings that already live in `shipping-policy.ts` or policy pages.
- Orphan ModiWeek / plus-size / mega-menu / old search-filter components still on disk.
- E2E fixtures that still mention Modimal `localStorage` keys.
- Missing `/sustainability/suppliers` page (mission CTA goes to `/contact-us`).

## When you change something

1. Read the page and the lib function it already calls. Extend that path. For PLPs, extend `getCatalogPage` / `catalog-params`, not the unused static filter files.
2. Keep catalog types flowing through `mapProductCard` / `mapProductDetail`. Do not pass raw Storefront nodes into components.
3. New collection routes get a key in `COLLECTION_HANDLES` when the Shopify handle differs from the URL.
4. Cart changes go through `cart/actions.ts` so the cookie and `revalidatePath` stay in one place.
5. If the change is visible, check the route in the browser, including empty cart and a missing product. Related surfaces that share `CartProvider` or `WishlistProvider` are the header bag, `/cart`, checkout summary, and `/wishlist`.
