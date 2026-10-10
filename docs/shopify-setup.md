# Shopify setup notes

The live client, queries, catalog helpers, and cart actions are in `src/lib/shopify`. Customer login is in `src/lib/customer` and `src/app/api/auth`. Environment names below match `.env.example`.

Do **not** add a second client at `lib/shopify.ts` or expose Storefront / Customer Account tokens with `NEXT_PUBLIC_`. Tokens stay server-only.

# Integrating Headless Shopify with Next.js

This project uses the Storefront API + Customer Account API, plus a narrow Admin API path for footer email signup. Copy `.env.example` to `.env.local` and fill in credentials from the Headless sales channel.

## Code layout

```
src/lib/shopify/           # Storefront client, catalog, queries, mutations, cart
  client.ts                # shopifyFetch
  config.ts
  collections.ts           # COLLECTION_HANDLES
  catalog.ts               # getCatalogPage (PLPs)
  catalog-actions.ts       # loadMoreCatalog
  description.ts           # parseDescription, productMetaDescription
  cart/actions.ts          # cart server actions (not on the barrel)
  mappers/                 # product + color mappers
  queries/                 # product, search, menu
src/lib/customer/          # Customer Account OAuth + session
src/lib/catalog-params.ts  # URL sort/filter parsing for PLPs
src/types/commerce.ts
src/app/api/auth/          # login, callback, logout
```

Import catalog/cart helpers as the app already does:

- Barrel (`@/lib/shopify`): `shopifyFetch`, `getProducts`, `getProduct`, `getCollectionProducts`, `getProductRecommendations`, `searchProducts`, `predictiveSearchProducts`, `fetchShopifyNavItems`, `COLLECTION_HANDLES`
- PLPs: `@/lib/shopify/catalog` (`getCatalogPage`) and `@/lib/shopify/catalog-actions` (`loadMoreCatalog`)
- Cart: `@/lib/shopify/cart/actions`

Collection handles for routes live in `src/lib/shopify/collections.ts` — update them to match collections published to your Headless channel.

## Environment

```env
SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_storefront_access_token"
SHOPIFY_STOREFRONT_API_VERSION="2025-10"
SHOPIFY_ADMIN_CLIENT_ID=""
SHOPIFY_ADMIN_CLIENT_SECRET=""
SHOPIFY_ADMIN_ACCESS_TOKEN=""
SHOPIFY_ADMIN_API_VERSION="2025-10"
SHOPIFY_USE_MOCK_FALLBACK="false"
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=""
SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID=""
SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL="http://localhost:3000/api/auth/callback"
CUSTOMER_SESSION_SECRET="replace-with-a-long-random-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`SHOPIFY_USE_MOCK_FALLBACK` is unused. Customer login is disabled unless `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`, `SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID`, and `CUSTOMER_SESSION_SECRET` are all set.

### Footer email signup (Admin API)

The footer form saves the address in Shopify as a customer with email marketing consent (`SUBSCRIBED`). This is the only Admin API usage in the app.

Shopify no longer creates new admin “custom apps” with a permanent `shpat_` token. Use the **Dev Dashboard** instead:

1. Shopify Admin → **Settings → Apps → Develop apps** → **Build apps in Dev Dashboard** (or open [dev.shopify.com](https://dev.shopify.com)).
2. **Create app** → Start from Dev Dashboard. Name it (e.g. `Sable Muse Newsletter`).
3. Create a **version** with scopes **`read_customers`** and **`write_customers`**, then **Release**.
4. **Install** the app on your Sable Muse store and approve the scopes.
5. App **Settings**: copy **Client ID** and **Client secret** into `.env.local`:
   - `SHOPIFY_ADMIN_CLIENT_ID`
   - `SHOPIFY_ADMIN_CLIENT_SECRET`
6. Restart `npm run dev`.

The app exchanges those credentials for a short-lived Admin access token (client credentials grant). You will not paste a permanent Admin API token.

Optional: if you still have a legacy admin-created custom app token, `SHOPIFY_ADMIN_ACCESS_TOKEN` still works as a fallback.

## Checkout

Contact and shipping steps update the Storefront cart. Payment redirects to Shopify Checkout via `cart.checkoutUrl` (card data is never collected in this app). Cart cookie name is `modimal_cart_id`.

## Original beginner walkthrough

The steps below remain useful for creating a development store and Headless channel credentials. After you have tokens, put them in `.env.local` and use the existing `src/lib/shopify` client — do not recreate a root-level `lib/shopify.ts`.

### Step 1: Set Up Your Shopify Development Store

If you don't already have a Shopify store, the best place to start is by creating a development store.

1. Go to the [Shopify Partners](https://partners.shopify.com/) page and sign up for a free account.
2. Once logged in to the Partner Dashboard, click on **Stores** in the left sidebar.
3. Click on the **Add store** button and select **Create development store**.
4. Choose **Create a store to test and build**.
5. Give your store a name (this will determine your `.myshopify.com` domain).
6. Under "Start with test data", you can choose to include some standard test products, which is very helpful for building the UI.
7. Click **Create development store**.

### Step 2: Install the Headless App and Get API Credentials

To let your Next.js app talk to Shopify, use the **Storefront API** via the Headless sales channel.

1. From your Shopify Admin panel, go to **Settings** (bottom left corner).
2. Click on **Apps and sales channels** in the left menu.
3. Add / open the **Headless** sales channel (from the Shopify App Store if needed).
4. Click **Create storefront**.
5. Give your storefront a name (e.g., "Next.js Frontend").
6. Click **Create**.
7. Once created, you will be taken to a page with your API credentials. You need:
   - **Store domain**: Looks like `your-store-name.myshopify.com`
   - **Storefront API access token**: Used by the server-side `shopifyFetch` client

> [!IMPORTANT]
> In this app the Storefront token is **server-only**. Do not put it in `NEXT_PUBLIC_*` env vars or ship it to the browser. Never expose Shopify Admin API tokens.

### Step 3: Configure Environment Variables in Next.js

1. Copy `.env.example` to `.env.local` in the project root.
2. Fill in `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` from Step 2.
3. Optionally configure Customer Account OAuth vars for `/login` and `/register`.
4. Run `npm run dev` and open http://localhost:3000.

### Step 4: Use the existing Shopify client

Do not create a new GraphQL helper. Import from the existing modules:

```ts
import { getProducts, getProduct, COLLECTION_HANDLES } from "@/lib/shopify"
import { getCatalogPage } from "@/lib/shopify/catalog"
```

- Home and simple collection rails: `getCollectionProducts(COLLECTION_HANDLES["new-in"], 3)`
- PLPs (`/collection/[slug]`, `/shop-all`, `/search`): `getCatalogPage({ source, sort, filters })`
- PDP: `getProduct(handle)` — `Product.id` is the handle; URLs are `/product/{handle}`

### Next steps

- Cart mutations live in `src/lib/shopify/cart/actions.ts`.
- Checkout payment is a redirect to `cart.checkoutUrl`.
- Customer Account OAuth is in `src/lib/customer` and `src/app/api/auth`.
- See `docs/agent-guide.md` and `docs/pages.md` for route and API maps.

Shopify's [Storefront API Documentation](https://shopify.dev/docs/api/storefront) is the reference for collections, cart, and filters.
