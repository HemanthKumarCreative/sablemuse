# Sable Muse storefront

Headless fashion shop. Next.js 16, React 19, and Tailwind 4. Products and the cart come from the Shopify Storefront API. Sign-in uses the Shopify Customer Account API. Payment stays on Shopify Checkout.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
npm run test:e2e
```

## Where things live

| Path | Role |
| --- | --- |
| `src/app` | Routes |
| `src/components` | UI by feature |
| `src/lib/shopify` | Storefront client, catalog, cart |
| `src/lib/customer` | Customer login |
| `src/data` | Static nav, FAQ, ModiWeek, sustainability, filter copy |
| `src/types/commerce.ts` | Product and cart types |
| `public/images` | Storefront images |
| `e2e` | Playwright |
| `docs/agent-guide.md` | Map for day-to-day changes |
| `docs/shopify-setup.md` | Store and credential setup |

Copy `.env.example` into `.env.local`. Do not commit `.env.local`. `Product.id` is the Shopify handle, so product URLs are `/product/{handle}`.
