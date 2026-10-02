<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# shop-ui

Headless Sable Muse storefront (Next.js 16, React 19, Tailwind 4, Base UI). Catalog and cart use the Shopify Storefront API. Login uses the Customer Account API. Payment is Shopify hosted checkout via `cart.checkoutUrl`.

Read `docs/agent-guide.md` before non-trivial changes. Always-on constraints live in `.cursor/rules/`.

- `Product.id` is the Shopify handle. `/product/[id]` queries by handle. The GID is `ProductDetail.gid`.
- Do not collect card data, do not call the Admin API, and do not expose store tokens with `NEXT_PUBLIC_`.
- Search and shop filters do not change the product query.
- Much of the UI copy still says Modimal. Do not rename brands unless asked.
