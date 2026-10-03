# PDP task backlog

Audit of the Sable Muse product detail page (`/product/[id]`). Findings are from the current implementation and the live Storefront catalog (185 products). Do not invent product information. Where Shopify does not return a field, the task is marked **DATA GAP** or **SCOPE GAP**.

Catalog facts used by these tasks:

- 185 products. Vendor is `Trendsi` on all (hidden from customers; store brand is Sable Muse).
- Currency is USD. Options are only `Color` and `Size`.
- 2,799 images. 0 videos. 0 external videos. 0 3D models. None exceed 50 media items. 37 products have at least 30 images.
- Image ratios are 2:3 (`0.67`) and 3:4 (`0.75`).
- 0 products have a compare-at price above the selling price.
- 13 products vary price by size, by about $2–$6.
- All 185 descriptions are HTML. 136 contain a `<table>`. Current descriptions have no `<script>`, `<iframe>`, `<img>`, or links.
- Care line in Shopify: “Tumble dry low” on 164 products, “do not tumble” on 9, something else on 1, absent on 11.
- Spec coverage in HTML: material on 174, stretch on 157, sheer on 81, features on 174, model information on 90, “Product measurements” label on 50, “Imported” on 184.
- `productType` is empty on all 185. `seo.title` and `seo.description` are empty on all 185.
- Every product is tagged `Ship from USA`. `quantityAvailable` and `totalInventory` are denied without the `unauthenticated_read_product_inventory` scope.
- Image alt text is a wholesale file id (for example `8da47b4de7704f64a43ac542dcdccb8b-Max`) on every sampled product. None are empty. None match the product title.
- 78 products have more than one color. 107 have a single color. Variant images exist. Colors do not share one image except on 1 product.
- 40 color names miss the hex map (including `Medium`, `Dark`, `Teal`, `Leopard`, `REG INSEAM`, `SHORT INSEAM`, `LONG INSEAM`). Substring matching mis-colors names such as Tangerine → tan and Yellow-Green → yellow.
- A sample tee is in `new-arrivals`, `tops-blouses`, and `dresses-jumpsuits` at once.

## P0 — Critical

### Task ID

PDP-001

### Priority

P0

### Category

Content

### Problem

The page reads Shopify `description` (plain text) and never `descriptionHtml`. Lists, measurement tables, and line breaks are destroyed. The same flattened string is shown twice: under the buttons and inside Product Specifications.

### Current Behavior

`PRODUCT_DETAIL_FRAGMENT` requests `description` only. The mapper copies it into `description` and `productDetail`. The panel prints it as one `<p>`. The accordion’s colon parser runs because the plain text has no newlines. A size chart such as Size / US / Top Length / Bust never reaches the DOM. 136 of 185 products contain a `<table>`. All 185 descriptions are HTML. There are no `<script>`, `<iframe>`, `<img>`, or links in current descriptions. Some intro paragraphs are already messy in Shopify (`Highly stretchyThis half-sleeve…`); the reliable structure is the `<ul>` and `<table>`.

### Expected Behavior

The product model carries sanitized `descriptionHtml`. The page renders prose, lists, and tables from that HTML in one place. Inline `style` attributes are stripped and tables use the store’s type styles. Script, iframe, and image tags cannot render. The plain-text dump and the duplicated specifications accordion body are gone.

### Customer Impact

Customers cannot read fabric, stretch, opacity, model size, or the size chart that the merchant already entered.

### Business Impact

Size and fabric uncertainty is the main return driver for apparel. The page is hiding the content that reduces those returns.

### Recommended Solution

Add `descriptionHtml` to the detail fragment and mapper. Sanitize with an allowlist (`p`, `ul`, `ol`, `li`, `br`, `strong`, `em`, `table`, `thead`, `tbody`, `tr`, `th`, `td`). Render it once in the purchase column. Keep `description` (plain) for meta text only.

### Acceptance Criteria

- A product whose HTML contains a measurement table shows that table on the PDP, with columns readable on a 390px screen (horizontal scroll on the table only if needed).
- List items are separate lines, not glued (`1Regular` does not appear).
- The specifications accordion does not repeat that full HTML.
- A fixture containing `<script>` or an iframe does not execute or render.
- Products with only a short paragraph still show that paragraph.

### Dependencies

None

### Effort

Medium

### Status

Done


---

### Task ID

PDP-002

### Priority

P0

### Category

Content

### Problem

Every product’s Fabric & Material Care accordion says “Machine wash cold. Do not tumble dry.” That sentence is hardcoded in `mapProductDetail`.

### Current Behavior

The mapper sets `fabricCare` to that sentence for every handle. Shopify’s care line says “Tumble dry low” on 164 products, “do not tumble” on 9, something else on 1, and is absent on 11.

### Expected Behavior

The care accordion shows the care sentence from that product’s HTML. If the product has no care sentence, the accordion does not invent one.

### Customer Impact

Following the page can ruin a garment that is supposed to be tumble dried low, or the reverse for the 9 that must not be tumbled.

### Business Impact

Incorrect care instructions cause damage claims and returns, and they undermine trust in the rest of the page.

### Recommended Solution

When mapping, read the `Care instructions:` item from `descriptionHtml`. Store it on `fabricCare`. Leave `fabricCare` empty when it is missing. Delete the hardcoded sentence.

### Acceptance Criteria

- A “tumble dry low” product shows that sentence and does not show “Do not tumble dry.”
- A “do not tumble” product still shows its own sentence.
- A product with no care line has no care accordion body and no invented wash advice.
- Care is not also repeated inside the main description block from PDP-008.

### Dependencies

PDP-001

### Effort

Low

### Status

Done


---

### Task ID

PDP-003

### Priority

P0

### Category

UX

### Problem

Size Guide tells the customer to look in the description for inches, but the measurement table never renders, and the dialog itself has no measurements.

### Current Behavior

The dialog is static copy plus `hello@sablemuse.shop`. `sizeSelector`, fitting copy, and the guide are not per product.

### Expected Behavior

If the description HTML contains a measurement table, Size Guide shows that table (size, US conversion, garment measurements) in the dialog. If it does not, the dialog keeps a short help note and does not invent numbers. The email link can stay.

### Customer Impact

Shoppers cannot compare a garment they own to this one, which is the decision that stops an apparel purchase.

### Business Impact

This is the highest-intent control on the page and it currently contains no product data.

### Recommended Solution

Parse the first measurement `<table>` (or the “Product measurements” block) in the mapper into rows and columns. Render those rows in the existing dialog. On a narrow screen, the table scrolls inside the dialog rather than breaking the page.

### Acceptance Criteria

- The ribbed tee’s Size / US / Top Length / Bust rows appear in Size Guide and match the HTML.
- A product with no table still opens a dialog and shows no fake measurements.
- Closing the dialog returns focus to Size Guide.
- The table is not shown both as a giant duplicate in the description and in the dialog. The description links to the guide; the guide holds the chart.

### Dependencies

PDP-001

### Effort

Medium

### Status

Done


---

### Task ID

PDP-004

### Priority

P0

### Category

Variant

### Problem

Color chips are guessed hex values. Unknown names render as black. Substring matching assigns the wrong hue.

### Current Behavior

`colorNameToHex` returns `#0C0C0C` when nothing matches. “Tangerine” matches “tan”. “Yellow-Green” matches “yellow”. “Sky Blue” matches generic blue. Forty names miss, including `Medium`, `Dark`, `Teal`, `Leopard`, and inseam values `REG INSEAM`, `SHORT INSEAM`, `LONG INSEAM` that Shopify stored on the Color option. Variant images exist for every variant and are unused by the chip. The selected color name text is correct.

### Expected Behavior

Each choice shows the variant image for that option value, with the option value as the accessible name. The selected value is named beside the group (“Color: Sky Blue”, or “Color: REG INSEAM” when that is the real option value). No chip is painted black because the name was missing from a dictionary.

### Customer Impact

Shoppers will choose a color from a chip that does not match the garment, especially washes, patterns, and near-black fallbacks.

### Business Impact

Wrong-color orders and lower confidence on multi-color styles (78 products have more than one color).

### Recommended Solution

Use `ProductColor.image`, which the mapper already sets from the variant image, as the chip content. Keep the text label. Drop substring hex matching for the chip. If a value has no image, show the name in a text chip rather than a black circle.

### Acceptance Criteria

- Sky Blue, Tangerine, Medium, and Leopard chips show that variant’s photo, not a black or tan circle.
- The selected name is visible as text, not only as a chip.
- Inseam values on the Color option remain selectable and readable.
- Keyboard and `aria-pressed` behavior still work.
- Chip hit area is at least 44×44px.

### Dependencies

None

### Effort

Medium

### Status

Done


---

### Task ID

PDP-005

### Priority

P0

### Category

Media

### Problem

Choosing a color does not change the hero image. The gallery and the purchase panel do not share selection state.

### Current Behavior

`ProductGallery` always starts at media index 0. Color state lives only in `ProductPurchasePanel`. Variant image URLs are on the product and are not passed into the gallery.

### Expected Behavior

Selecting a color brings that color’s variant image to the front of the gallery (mobile scroll and desktop frame). If several sizes share one image, any in-stock size of that color is enough. Other photos stay available, because Shopify does not assign the rest of the media to a color. If the variant has no image, the gallery stays put.

### Customer Impact

On a 12-color, 30-photo product, the photo on screen can be a different color from the selected chip.

### Business Impact

Customers add a color they did not mean to buy. This is the main visual-merchandising failure on the page.

### Recommended Solution

Lift the selected color (or selected image URL) to the product page client shell so the gallery and the panel share it. On change, find the gallery item with the same URL and select it. Do not hide the other images.

### Acceptance Criteria

- Selecting a second color moves the hero to that color’s variant image on a 390px viewport and at 1280px.
- Refreshing still starts on the first color and its image.
- A one-color product does not jump or blank the gallery.
- The thumbnail `aria-pressed` state matches the hero.

### Dependencies

PDP-004

### Effort

Medium

### Status

Done


---

### Task ID

PDP-006

### Priority

P0

### Category

CRO

### Problem

Buy Now adds this variant to the existing bag and redirects to that bag’s Shopify checkout.

### Current Behavior

`handleBuyNow` calls `addItem`, then `window.location.assign(nextCart.checkoutUrl)`. `checkoutUrl` is the cookie cart, which may already contain other lines.

### Expected Behavior

Buy Now checks out the selected variant at quantity 1 and does not include other bag lines. The existing bag cookie remains intact. If the size is missing or sold out, Buy Now shows the same validation as Add To Bag and does not navigate. The customer can tell they are going to secure checkout for this item.

### Customer Impact

A shopper who came to buy one dress can be sent into payment for everything already in the bag.

### Business Impact

Abandoned checkout, surprise totals, and support contacts. It is a broken purchase action.

### Recommended Solution

Create a one-off Storefront cart with that single line and redirect to its `checkoutUrl`. Do not call `setCartId` for that cart. Keep Add To Bag on the cookie cart.

### Acceptance Criteria

- With another product already in the bag, Buy Now opens Shopify checkout containing only the selected variant.
- Returning to the site, the original bag still has the earlier product and does not have a duplicate from Buy Now.
- An empty size selection does not navigate.
- A sold-out combination does not navigate.
- Add To Bag behavior is unchanged.

### Dependencies

None

### Effort

Medium

### Status

Done


---

### Task ID

PDP-007

### Priority

P0

### Category

Accessibility

### Problem

Every product image alt in the live catalog is a wholesale file id such as `8da47b4de7704f64a43ac542dcdccb8b-Max`. The gallery uses that string as the accessible name.

### Current Behavior

`mapMediaNode` prefers `image.altText`, then media `alt`. Both are the file id. The UI only substitutes the product name when alt is empty. Featured-image alts are the same kind of id. None are empty, and none match the product title.

### Expected Behavior

Customers and screen readers get the product name plus the image position, and the color name when the slide is the selected variant image. File ids and strings that are only a hash never render as alt text.

### Customer Impact

Assistive tech users cannot tell what the photo is. Sighted users can still see the photo.

### Business Impact

The page fails a basic accessible-name check and exposes internal asset names.

### Recommended Solution

In the mapper, treat an alt as usable only when it contains normal words. Otherwise store an empty alt and let the gallery label slides as `{product name}, image {n}`.

### Acceptance Criteria

- The sample tee’s slides do not expose `-Max` ids in `alt` or `aria-label`.
- A future image whose alt is a real sentence (“Back view of the tee”) keeps that sentence.
- Decorative thumbnails stay `alt=""`.

### Dependencies

None

### Effort

Low

### Status

Done


---

## P1 — High Priority

### Task ID

PDP-008

### Priority

P1

### Category

Content

### Problem

Even after HTML renders, a single block mixes marketing copy, specs, model stats, and the size chart. The accordion then risks repeating it.

### Current Behavior

One description string feeds both the paragraph and Product Specifications. Fitting, fabric, and shipping are separate accordion items, two of which are hardcoded.

### Expected Behavior

The column reads in this order: short prose (the real `<p>` only), then a spec list for material, stretch, sheer, and features, then model measurements when present. Care is only in its accordion (PDP-002). The size chart is only in Size Guide (PDP-003). “Imported” can sit in the spec list. No section appears twice.

### Customer Impact

Shoppers can scan fabric and fit instead of parsing a paragraph.

### Business Impact

Clear specs raise add-to-bag rate without adding chrome.

### Recommended Solution

Parse the `<ul>` label/value items in the mapper into a spec array. Render that array as a definition list. Render remaining paragraphs as the prose. Do not try to repair broken sentences such as `Highly stretchyThis` with a heuristic; the list item is the source for stretch.

### Acceptance Criteria

- The sample tee shows material `61% polyester, 33% rayon, 6% spandex`, stretch, and sheer as separate rows.
- Model height, bust, waist, hip, and size worn are visible when the HTML includes them (90 products).
- The measurement table is not repeated under the prose.
- A product whose HTML is only a paragraph shows that paragraph and no empty spec box.

### Dependencies

PDP-001, PDP-002, PDP-003

### Effort

Medium

### Status

Done


---

### Task ID

PDP-009

### Priority

P1

### Category

Content

### Problem

Fitting & Sizing always says “We recommend taking your usual size,” including on products that publish model size and a measurement chart.

### Current Behavior

`fitting` is hardcoded in the mapper. The accordion is collapsed by default.

### Expected Behavior

When model info or a measurement table exists, the fitting section points at those facts and does not add a generic size recommendation. When neither exists, the fitting accordion is omitted.

### Customer Impact

Generic advice conflicts with a model who is 5'8" wearing S, which is the useful fit signal.

### Business Impact

Reduces size-related hesitation next to the chart from PDP-003.

### Recommended Solution

Stop setting the hardcoded `fitting` string. Use the parsed model block as this accordion’s body when it exists.

### Acceptance Criteria

- The sample tee fitting section quotes the model measurements from Shopify and does not say “take your usual size.”
- A product with no model block and no table has no fitting accordion.
- Copy is not duplicated in the spec list and this accordion. Model info lives in one place.

### Dependencies

PDP-008

### Effort

Low

### Status

Done


---

### Task ID

PDP-010

### Priority

P1

### Category

Variant

### Problem

A color that is sold out in every size still shows an enabled Add To Bag.

### Current Behavior

`selectionSoldOut` is true only when a size is selected and that combination is unavailable. If every size is disabled, the customer cannot select one, so the button stays “Add To Bag — $price”. The badge does say Sold Out.

### Expected Behavior

When no size of the selected color is purchasable, both buttons are disabled and labeled Sold Out. The error is not “Please select a size.”

### Customer Impact

The primary action looks available on a color they cannot buy.

### Business Impact

Dead-end clicks on partially sold-out styles (common: one sample has 25 of 72 variants sold out).

### Recommended Solution

Treat “no purchasable size for this color” like sold out even when `selectedSize` is empty.

### Acceptance Criteria

- A fully sold-out color shows a disabled Sold Out button before a size is chosen.
- A color with at least one size left keeps Add To Bag enabled and still requires a size.
- The in-stock badge and the button do not contradict each other.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-011

### Priority

P1

### Category

Pricing

### Problem

The button shows the lowest size price without “From”, and a compare-at price only appears after one exact variant is selected.

### Current Behavior

`displayPrice` is the minimum of the variants matching the selected color (all sizes, until a size is chosen). The heading adds “From ” when the max is higher. The button always prints `$${formatMoney(displayPrice)}`. Compare-at renders only when `scopedVariants.length === 1`. The catalog has 13 products with a $2–$6 size spread and zero compare-at prices. The mapper correctly ignores a compare-at that is not above the price.

### Expected Behavior

Before a size is chosen, both the price and the button say “From $X” when sizes differ. After a size is chosen, both show that variant’s price only. If that variant’s compare-at is higher, show the original price and the percent off. Never show a discount when compare-at is missing or lower.

### Customer Impact

On plus-size styles, the button can understate the price of XL–3XL by a few dollars until the size is chosen.

### Business Impact

Small, but it is a price-accuracy issue on 13 products, and the sale UI would be wrong the first time a compare-at price is added.

### Recommended Solution

Share one price label helper with the product card’s sale rules. Drive compare-at from the selected variant, or from the minimum real compare-at among the sizes still in view before a size is chosen.

### Acceptance Criteria

- `yelete-full-size-fleece-lined-high-waisted-leggings` shows “From” on the button before a size is chosen, then the exact size price after.
- A product with one price never says “From”.
- A variant with no compare-at shows no strikethrough and no percent.
- A test variant whose compare-at is higher shows the original price and a percent rounded like the product card. A compare-at equal to or below the price shows nothing.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-012

### Priority

P1

### Category

Media

### Problem

Product photos are 2:3 or 3:4 and the frame is 3:4 with `object-cover`, so full-length shots are cropped. Desktop also forces a 640px minimum height.

### Current Behavior

`aspect-[3/4]` and `object-cover` on the hero, mobile slides, and thumbnails. Live ratios are only `0.67` and `0.75`.

### Expected Behavior

The hero uses a 2:3 frame and `object-contain` on a neutral background so the whole garment stays visible. Thumbnails can stay cropped. The frame does not jump when the next image has the other ratio.

### Customer Impact

Hem, shoes, and neckline are the details shoppers use to judge length and fit. Cropping hides them.

### Business Impact

Weaker product confidence on full-body images, which are most of the catalog.

### Recommended Solution

Change the hero aspect to `aspect-[2/3]`, use `object-contain`, and remove `min-h-[640px]`. Keep a shared aspect so mixed 2:3 and 3:4 slides do not shift the buy column.

### Acceptance Criteria

- A 2:3 image shows the full frame without cutting the head or hem.
- A 3:4 image letterboxes instead of stretching.
- The purchase column does not move vertically when swiping between those two ratios.
- No horizontal page overflow at 390px, 768px, or 1280px.

### Dependencies

PDP-005

### Effort

Low

### Status

Done


---

### Task ID

PDP-013

### Priority

P1

### Category

Media

### Problem

There is no way to enlarge a photo. Fashion purchases depend on fabric, stitch, and closure detail.

### Current Behavior

The hero is static. No zoom, lightbox, or full-screen control. Videos are not in the catalog.

### Expected Behavior

Activating the hero opens a full-screen viewer for that image, with next/previous, close, and the same alt label as the gallery. On a phone, pinch or a clear Zoom control opens it. Focus is trapped and restored. Background scroll locks.

### Customer Impact

Shoppers cannot inspect texture or construction without a clumsy browser zoom on the whole page.

### Business Impact

Directly supports “what does this look like in real life?” which the current page does not answer.

### Recommended Solution

A dialog viewer over the existing media list. Do not add a second image request beyond `next/image` sizes appropriate to the viewport.

### Acceptance Criteria

- Zoom opens the active slide, moves to the next image, and closes with Escape and a button.
- Focus returns to the control that opened it.
- The 390px viewport can reach the viewer. The page behind does not scroll.
- File-id alts do not appear (PDP-007).

### Dependencies

PDP-007, PDP-012

### Effort

Medium

### Status

Done


---

### Task ID

PDP-014

### Priority

P1

### Category

Mobile

### Problem

Mobile pagination is one dot per image. Products have up to 50 images, so the dot row is not usable.

### Current Behavior

`CarouselDots` renders every index. There is no “4 / 24” label and no mobile thumbnail strip. Desktop thumbnails are fine.

### Expected Behavior

Under 390px the gallery shows the current position (“4 / 24”) and a horizontally scrolling thumbnail strip with a selected state. Dots are not rendered once there are more than about 8 images.

### Customer Impact

Shoppers cannot tell how many views exist or jump to a detail shot.

### Business Impact

Extra photos (back, fabric, model) stay undiscovered, which wastes the catalog’s strongest asset.

### Recommended Solution

Reuse the desktop thumbnail button in a horizontal scroller under the mobile hero, plus a text counter. Keep swipe on the hero.

### Acceptance Criteria

- A 30-image product at 390px shows a counter and a thumbnail scroller, not 30 dots.
- Selecting thumbnail 10 moves the hero to image 10.
- A 3-image product still has an obvious way to move between images.
- The selected thumbnail stays in view.

### Dependencies

PDP-012

### Effort

Medium

### Status

Done

---

### Task ID

PDP-015

### Priority

P1

### Category

Mobile

### Problem

After the customer scrolls into the description or size guide, Add To Bag leaves the screen. The header is sticky. The purchase actions are not.

### Current Behavior

Buttons sit once, under the size select. There is no sticky bar. Tablet stacks a 640px-tall gallery above the buttons until the `lg` breakpoint.

### Expected Behavior

On viewports below `lg`, once the main buttons scroll above the fold, a bar fixed to the bottom shows the selected color, size (or “Select size”), price, and Add To Bag. It does not cover the size guide dialog. It is not shown on desktop, where the column stays beside the photo.

### Customer Impact

Reading the chart and then buying requires a long scroll back through the photos.

### Business Impact

Standard apparel conversion fix once the page has real size content to read.

### Recommended Solution

A small client bar that observes the main button row and mirrors `handleAddToBag`. Include the PDP-010 sold-out state and the PDP-011 price.

### Acceptance Criteria

- At 390px, scrolling past the buttons shows the bar. Scrolling back hides it.
- The bar states the current size and price.
- Tapping it with no size shows “Please select a size” and does not add.
- At 1280px the bar is absent.
- The bar clears the iOS safe area and does not cover the dialog.

### Dependencies

PDP-010, PDP-011

### Effort

Medium

### Status

Done

---

### Task ID

PDP-016

### Priority

P1

### Category

UX

### Problem

A failed add is silent. A successful add is easy to miss and does not show the bag.

### Current Behavior

`handleAddToBag` does not catch. `addItem` updates state and rethrows. Success sets a text node, “Added to bag successfully.” The bag sheet does not open. `isPending` is global, so any cart transition labels the button “Adding...”.

### Expected Behavior

Failure shows a visible error and leaves the button ready to retry. Success opens the bag (or a clear “View bag” confirmation) and does not claim success if the action threw. The pending label reflects this click only.

### Customer Impact

Shoppers are unsure the item was added, or they retry and add it twice. On failure they think the button did nothing.

### Business Impact

Lost adds and duplicate lines.

### Recommended Solution

Catch errors in the panel and set the existing error text. On success, open the bag sheet. Track a local pending flag for these two buttons.

### Acceptance Criteria

- A forced action failure shows an error, does not show “Added to bag”, and the button can be pressed again.
- A successful add opens the bag with that variant, size, and color.
- Double-clicking while the request is in flight only submits once.
- Buy Now’s pending state does not say “Adding...” on the Add To Bag button after PDP-006.

### Dependencies

PDP-006

### Effort

Medium

### Status

Done


---

### Task ID

PDP-017

### Priority

P1

### Category

Variant

### Problem

Sizes are a native dropdown, so sold-out and available sizes are not scannable. The button layout already exists and is unreachable.

### Current Behavior

`sizeSelector` is hardcoded to `"select"`. The `<select>` is accessible and 48px tall, and it does list “Sold out” on disabled options. The button branch is dead.

### Expected Behavior

Sizes render as buttons. The selected size is pressed. Sold-out sizes are visible and disabled, not only buried in a menu. The group is named “Size”.

### Customer Impact

Comparing S–3XL, and seeing which extended sizes remain, takes an extra tap and a long menu.

### Business Impact

Faster size choice on the 6-size products that dominate the catalog.

### Recommended Solution

Set the selector to buttons, or remove the flag and always use the button branch. Keep the “select a size” requirement.

### Acceptance Criteria

- Every size is visible without opening a menu.
- A sold-out size is disabled and marked sold out.
- Selecting a size updates the price (PDP-011) and the add payload.
- The control is usable at 390px without overflowing the page (wrap is fine).

### Dependencies

PDP-010, PDP-011

### Effort

Low

### Status

Done


---

### Task ID

PDP-018

### Priority

P1

### Category

Accessibility

### Problem

`id="product-heading"` is on both the hidden page `h2` and the visible `h1`.

### Current Behavior

The section `aria-labelledby` and the purchase-panel `h1` share one id. HTML requires unique ids.

### Expected Behavior

One `h1` with the product name. The section is labeled by that `h1`. The extra visually hidden heading is removed.

### Customer Impact

Screen-reader section labeling is unreliable.

### Business Impact

Low direct revenue impact, high confidence in the accessibility pass.

### Recommended Solution

Delete the duplicate `h2` and point `aria-labelledby` at the `h1`, or move the `h1` up and drop the second id.

### Acceptance Criteria

- The document has one element with `id="product-heading"`.
- There is exactly one `h1`, and it is the product name.
- The recommendations heading remains an `h2`.

### Dependencies

None

### Effort

Low

### Status

Done


---

## P2 — Medium Priority

### Task ID

PDP-019

### Priority

P2

### Category

Performance

### Problem

Product availability is cached for an hour, so a size can still look purchasable after it sells out.

### Current Behavior

`shopifyFetch` defaults to `revalidate: 3600`. `getProduct` does not override it.

### Expected Behavior

The PDP refetches product availability on a short window (on the order of a minute), or does not cache the variant availability used for the buttons.

### Customer Impact

A customer can select a size the warehouse no longer has. Checkout then fails later.

### Business Impact

Failed checkouts and support load. The UI cannot know live quantities (scope gap), so freshness of `availableForSale` is the only signal.

### Recommended Solution

Pass a short `revalidate` for `getProduct` only. Leave collection grids on the longer cache unless you choose otherwise.

### Acceptance Criteria

- Changing a variant to sold out in Shopify is reflected on the PDP within the chosen window without a rebuild.
- The page still renders on a cache hit.
- Collection grids are unchanged.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-020

### Priority

P2

### Category

Mobile

### Problem

From 768px to 1023px the gallery is a tall desktop frame and the buy box is still stacked underneath it.

### Current Behavior

Thumbnails and `min-h-[640px]` start at `md`. Two columns start at `lg`.

### Expected Behavior

Either the two-column layout starts at `md`, or the tablet hero uses the same shorter frame as mobile until two columns fit. Purchase controls are visible within one screen of the hero on an iPad portrait viewport.

### Customer Impact

Tablet shoppers scroll past a very tall image before they see price and size.

### Business Impact

Unnecessary friction on a layout that is currently “desktop gallery, mobile stack.”

### Recommended Solution

Start `lg:grid-cols-2` at `md`, after PDP-012 removes the 640px minimum. Check that thumbnails plus the buy column fit at 768px.

### Acceptance Criteria

- At 768×1024, price and size are visible without scrolling past a 640px image.
- At 390px the layout is still one column.
- No horizontal overflow.

### Dependencies

PDP-012

### Effort

Low

### Status

Done


---

### Task ID

PDP-021

### Priority

P2

### Category

SEO

### Problem

Meta description, JSON-LD, and Twitter image do not match the product customers see.

### Current Behavior

Meta description is the full plain description. JSON-LD `sku` is the handle, `price` is the minimum, `url` is relative, and there is one `Offer` even when sizes differ. Twitter uses the homepage hero. Shopify `seo.title` and `seo.description` are empty on all 185 products. There is no breadcrumb schema.

### Expected Behavior

Meta description is the first real prose sentence, trimmed to about 160 characters. JSON-LD uses an absolute URL, the price currently displayed, and `AggregateOffer` with low and high price when sizes differ. `sku` is omitted at product level rather than set to the handle. Variant SKUs stay out of the visible page except the existing post-selection line. Twitter image is the featured product image. `BreadcrumbList` matches the visible crumbs. No review schema.

### Customer Impact

Search results snippet is a wall of spec fragments.

### Business Impact

Weaker product snippets. Incorrect structured price on the 13 ranged products.

### Recommended Solution

Build the description from the prose paragraph produced in PDP-008. Prefix JSON-LD URLs with `metadataBase`. Add `AggregateOffer` only when `priceMax` exists.

### Acceptance Criteria

- The sample tee’s meta description is a sentence, not the care list.
- JSON-LD `offers.url` is absolute.
- A ranged product emits `AggregateOffer` with low and high price.
- A single-price product emits one `Offer`.
- View source shows no file-id alt in JSON-LD image names beyond the image URL itself.
- Twitter image URL is the product image.

### Dependencies

PDP-008, PDP-011

### Effort

Medium

### Status

Done


---

### Task ID

PDP-022

### Priority

P2

### Category

SEO

### Problem

The breadcrumb category is always “Shop” because `productType` is empty and `categoryHref` is hardcoded to `/shop-all`.

### Current Behavior

Mapper sets `category` from `productType` or `"Shop"`. Collections are not queried. A sample tee is simultaneously in `new-arrivals`, `tops-blouses`, and `dresses-jumpsuits`, so the first collection edge is not a safe category.

### Expected Behavior

The middle crumb is a collection only when the product has one non-`new-arrivals` collection that matches a known storefront handle. If it has several, or a clearly wrong mix, the crumb stays “Shop” until the merchant sets a primary collection. Do not print supplier tag names as the category.

### Customer Impact

The crumb does not tell the shopper where the product sits in the catalog.

### Business Impact

Weak internal linking. Guessing the first collection would misfile tops as dresses.

### Recommended Solution

Query `collections` on the detail fragment. Choose a crumb with an explicit priority list of known handles, ignoring `new-arrivals` when another known handle exists. If more than one category handle matches, keep “Shop”. Document that a primary-collection metafield is the follow-up if merchandising needs a single source of truth.

### Acceptance Criteria

- A product in only `tops-blouses` crumbs to Tops & Blouses and that collection URL.
- A product in both `tops-blouses` and `dresses-jumpsuits` crumbs to Shop.
- `new-arrivals` alone does not become the category label if you decide it is a merchandising collection; in that case the crumb stays Shop.
- Supplier tags never appear as the crumb.

### Dependencies

None

### Effort

Medium

### Status

Done


---

### Task ID

PDP-023

### Priority

P2

### Category

Accessibility

### Problem

Errors and success are not announced. Gallery keyboard use is pointer-only beyond the thumbnail buttons.

### Current Behavior

The error `<p>` has no `aria-live`. Dots are tabs. There is no arrow-key handler on the hero. Color target size is covered by PDP-004.

### Expected Behavior

The validation error and the sold-out message are announced. Left and right arrows move the desktop hero when the gallery has focus. The size guide remains a labeled dialog.

### Customer Impact

Keyboard and screen-reader users get less feedback than pointer users.

### Business Impact

Needed for a production accessibility pass, not a visual redesign.

### Recommended Solution

Add `role="alert"` or a polite live region on the existing error node. Add arrow handlers on the gallery region.

### Acceptance Criteria

- Submitting without a size announces “Please select a size.”
- Arrow keys move the active slide when the gallery is focused and more than one image exists.
- Focus rings remain visible on chips, sizes, and thumbnails.

### Dependencies

PDP-016, PDP-017

### Effort

Low

### Status

Done


---

### Task ID

PDP-024

### Priority

P2

### Category

UX

### Problem

“You May Also Like” renders even when Shopify returns no recommendations.

### Current Behavior

The heading is outside `ProductCardRail`. The rail returns null for an empty list. `getProductRecommendations` failure also returns `[]`. The `getProducts(4)` fallback never runs for a normal product because `gid` is always set.

### Expected Behavior

The section, heading included, is omitted when there are no recommendations. Do not backfill with arbitrary first products.

### Customer Impact

An empty heading looks unfinished.

### Business Impact

Small. Avoids implying a recommendation relationship that does not exist.

### Recommended Solution

Wrap the section in `related.length > 0`.

### Acceptance Criteria

- A product with recommendations still shows up to four cards.
- A product with an empty recommendation response shows no heading and no empty gap that looks like a missing grid.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-025

### Priority

P2

### Category

Architecture

### Problem

Purchase logic assumes every product has Size plus optional Color. A product whose only option is Title / Default Title, or a third option such as Inseam, cannot be added correctly.

### Current Behavior

If there is no size option, `sizes` becomes variant titles, the UI requires a selection, and `variantMatches` compares that title to a size option value that does not exist, so the match fails. A third option is ignored and the first available size/color pair is added. The live catalog does not hit this: all 185 products are Color + Size. One product stores inseam names inside Color; PDP-004 keeps those selectable as labeled values.

### Expected Behavior

A single “Default Title” variant can be added without a fake size field. Any option that is not color is an explicit selector. The variant added is the one whose selected options equal every selector.

### Customer Impact

No impact on today’s catalog. The next product that is one-size or has a real third option would be unbuyable or the wrong variant.

### Business Impact

Prevents a broken PDP the moment the catalog is not Color × Size.

### Recommended Solution

Build selectors from `product.options`, excluding the default Title option when it is the only option and there is one variant. Resolve the variant by matching all selected option pairs.

### Acceptance Criteria

- A one-variant Default Title product adds that variant with no size field.
- A product with Color, Size, and Inseam cannot add until all three are chosen, and the line is that exact variant.
- Existing Color × Size products still require a size and still block sold-out pairs.

### Dependencies

PDP-017

### Effort

Medium

### Status

Done


---

### Task ID

PDP-026

### Priority

P2

### Category

Content

### Problem

`formatDisplayTitle` removes “full size”, “plus size”, and, on long titles, fabric and sleeve phrases. Those words are part of how a customer recognizes the garment.

### Current Behavior

The H1 is the cleaned title. `isPlusSize` is computed and not shown on the PDP. After PDP-008, fabric and sleeve still exist in the spec list. “Full size” does not, except via the size run itself (S–3XL).

### Expected Behavior

The title stays cleaned of wholesaler prefixes (Basic Bae, Judy Blue) so the store remains Sable Muse. If the source title or tags mark plus/full size, the size area says that the size run is extended. Fabric and sleeve are not required in the H1 once they are in the spec list.

### Customer Impact

Plus shoppers can miss that the size run goes to 3XL if they only read a shortened title. The size buttons already show 3XL once PDP-017 is in place.

### Business Impact

Keeps the title readable without hiding the extended size run.

### Recommended Solution

Show a single line near the size control when `isPlusSize` is true, using the sizes that actually exist (“Sizes S–3XL”). Do not put the supplier brand back into the title.

### Acceptance Criteria

- A “Full Size” title does not show the supplier brand.
- That product shows the actual size range next to the size control.
- A product that is not plus-sized does not show that line.
- The H1 remains one line of product name, not the raw Shopify title.

### Dependencies

PDP-017

### Effort

Low

### Status

Done


---

### Task ID

PDP-027

### Priority

P2

### Category

Content

### Problem

Shipping and returns are stated in the trust line and again in an accordion, from two hardcoded strings.

### Current Behavior

The panel always shows the trust line because `showEasyReturn` is never set and the check is `!== false`. The accordion uses another hardcoded `shippingReturns` string. Both say free US shipping and 30-day returns. The trust line also says 1–2 business days. This copy is store policy, not a Shopify field. All 185 products are tagged `Ship from USA`, and `shipsFromUs` is unused on the page.

### Expected Behavior

One source of truth for the policy. The short line stays next to the buttons. The accordion holds the same policy plus any extra detail, and it does not contradict the line. If a product later lacks `Ship from USA`, the line does not claim US ship origin for it.

### Customer Impact

Repeated identical paragraphs add length without answering a new question.

### Business Impact

Keeps the trust line, which is useful, and avoids drift between two strings.

### Recommended Solution

Move the policy strings into one module used by the line and the accordion. Gate the “ships from the United States” clause on `shipsFromUs`.

### Acceptance Criteria

- The visible line and the accordion do not disagree.
- Editing the policy module changes both.
- A product without the tag does not say it ships from the United States.
- No new Shopify field is invented.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-028

### Priority

P2

### Category

Performance

### Problem

The mobile gallery mounts every image at once. The heaviest products have 30–50 images.

### Current Behavior

The snap track maps the full media array. `next/image` lazy-loads, but the nodes are all in the document. Desktop only paints the active hero plus thumbs.

### Expected Behavior

Off-screen mobile slides are not all mounted. The active slide and its neighbors are enough. Swipe still feels immediate.

### Customer Impact

Faster first paint on image-heavy products, less memory use on phones.

### Business Impact

Protects conversion on the largest galleries without lowering image quality of the active slide.

### Recommended Solution

Render the active index and one slide on either side in the mobile track, or set `loading="lazy"` explicitly and avoid `priority` on every resize remount. Keep the hero sharp.

### Acceptance Criteria

- The first slide on a 40-image product is still prioritized.
- Scrolling to slide 10 shows the correct image.
- Lighthouse or a network log on a throttled mobile profile shows the last slides are not all requested on first paint.

### Dependencies

PDP-014

### Effort

Medium

### Status

Done


---

### Task ID

PDP-029

### Priority

P2

### Category

QA

### Problem

A Storefront outage and an unknown handle both end as a 404, because `getProduct` catches errors and returns null.

### Current Behavior

The page calls `notFound()` for both. The project has no `not-found.tsx` or `error.tsx`, and those files should stay absent.

### Expected Behavior

An unknown handle still 404s. A thrown API or network error shows a retry message on this route without a new error boundary file, or at least logs a distinct message the customer can act on if you render it from the page when the fetch reports failure instead of absence.

### Customer Impact

During an outage, every product looks deleted.

### Business Impact

Support traffic and lost sales that look like bad URLs.

### Recommended Solution

Return a result type from `getProduct` (`not-found` vs `error`). The page renders a short retry panel for `error` and calls `notFound()` only for a null product.

### Acceptance Criteria

- An unknown handle 404s.
- A simulated Storefront 500 shows a retry message and does not claim the product was not found.
- No `error.tsx` or `not-found.tsx` is added.

### Dependencies

None

### Effort

Low

### Status

Done


---

## P3 — Nice to Have

### Task ID

PDP-030

### Priority

P3

### Category

CRO

### Problem

There are no reviews.

### Current Behavior

No review query, metafield, or app payload exists. JSON-LD has no `aggregateRating`.

### Expected Behavior

Nothing, until a real review source exists. Do not show stars, counts, or schema.

### Customer Impact

None until reviews are real. Fake counts would hurt trust.

### Business Impact

Reviews help apparel conversion only when they are genuine.

### Recommended Solution

**DATA GAP.** Add reviews only after a Shopify reviews app or metafield is actually populated. Then show rating, count, and a short list, and add `aggregateRating` from that same source.

### Acceptance Criteria

- The current page gains no review UI.
- A later implementation with an empty metafield hides the block.
- Schema is added only when the count is greater than zero.

### Dependencies

None

### Effort

High

### Status

Done


---

### Task ID

PDP-031

### Priority

P3

### Category

Media

### Problem

3D models would be dropped. Video support is untested because the catalog has no videos.

### Current Behavior

`VIDEO` maps to a `<video controls preload="none">`. `EXTERNAL_VIDEO` maps to an iframe that loads immediately. `MODEL_3D` returns null from `mapMediaNode`. Live counts: 0 video, 0 external video, 0 model.

### Expected Behavior

A video shows a poster and controls, does not autoplay with sound, and includes `playsInline`. An external video shows a poster and loads the iframe after a click. A 3D model shows a poster and a label that it cannot be spun here, or a real viewer if you add one. Unknown media is not a broken image.

### Customer Impact

None today. Future video or 3D assets would vanish or auto-load an embed.

### Business Impact

Keeps the media pipeline from silently losing assets the next time the catalog has them.

### Recommended Solution

Add a `model` media type that renders the preview image and a text fallback. Gate external iframes behind a play button. Add `playsInline` and a muted default only if you later choose autoplay. Do not build this ahead of real media.

### Acceptance Criteria

- A fixture `MODEL_3D` node does not disappear and does not render as a broken image.
- A fixture external video does not request the embed until play.
- A fixture MP4 shows controls and a poster and does not autoplay unmuted.

### Dependencies

PDP-007

### Effort

Medium

### Status

Done


---

### Task ID

PDP-032

### Priority

P3

### Category

UX

### Problem

Quantity is fixed at 1.

### Current Behavior

Both actions add quantity 1. There is no stepper.

### Expected Behavior

Keep quantity 1 unless a real case appears (gifts, multipacks). A stepper is extra UI on a clothing PDP.

### Customer Impact

A customer who wants two must add twice or change quantity in the bag. That is acceptable.

### Business Impact

Low. The bag already edits quantity.

### Recommended Solution

Do not add a quantity control in the first implementation pass. If you add one later, it must respect sold-out state and must not default above 1.

### Acceptance Criteria

- The current buttons still add one unit.
- No quantity stepper is added as part of the P0–P2 work.

### Dependencies

None

### Effort

Low

### Status

Done


---

### Task ID

PDP-033

### Priority

P3

### Category

Shopify Data

### Problem

The UI cannot show “only 2 left” because the token cannot read inventory.

### Current Behavior

`availableForSale` works. `quantityAvailable` and `totalInventory` return `ACCESS_DENIED` for `unauthenticated_read_product_inventory`. The client throws on GraphQL errors, so adding those fields today would 404 the PDP.

### Expected Behavior

No stock count on the page. After the scope is granted, a low-stock line is allowed only from `quantityAvailable`, and only under a small threshold. Never invent a number.

### Customer Impact

Shoppers do not see false scarcity. They also do not see a true low-stock warning.

### Business Impact

Honest. Scarcity copy without the scope would be a fabricated claim.

### Recommended Solution

**SCOPE GAP.** Leave counts out. If the merchant later adds the unauthenticated inventory scope, map `quantityAvailable` and show “Only N left” at or below a chosen threshold for the selected variant.

### Acceptance Criteria

- Today’s query does not request `quantityAvailable`.
- The PDP shows no “only N left” copy.
- With the scope present, a selected variant at that threshold shows the real number, and a null quantity shows nothing.

### Dependencies

PDP-011

### Effort

Low

### Status

Done


---

### Task ID

PDP-034

### Priority

P3

### Category

Content

### Problem

Country of origin is only the word “Imported” (184 products). No country is in the payload.

### Current Behavior

“Imported” is trapped in the flattened description. There is no origin metafield.

### Expected Behavior

“Imported” appears once in the spec list from PDP-008. Do not name a country.

### Customer Impact

Shoppers who need a country do not get one. Inventing one would be worse.

### Business Impact

**DATA GAP.** A country metafield is optional later. It is not required to ship the PDP fixes.

### Recommended Solution

Show the existing “Imported” line in the spec list. Add a country only if a metafield is actually populated.

### Acceptance Criteria

- Products whose HTML says Imported show that word once.
- No country name appears unless it is in Shopify data.

### Dependencies

PDP-008

### Effort

Low

### Status

Done


---

## Recommended implementation sequence

Do not start PDP-013 or PDP-015 before the content and variant tasks. Zoom and a sticky bar on top of wrong care copy and wrong colors would polish a misleading page.

1. PDP-001 — description HTML in the model and on the page
2. PDP-007 — human alt text
3. PDP-002 — care copy from the product
4. PDP-003 — size guide table
5. PDP-008 — spec list and a single prose block
6. PDP-009 — fitting copy
7. PDP-004 — image color chips
8. PDP-005 — gallery follows the selected color
9. PDP-012 — portrait frame without cropping
10. PDP-006 — Buy Now for this variant only
11. PDP-010 — sold-out color disables the CTA
12. PDP-011 — price matches the selected size
13. PDP-016 — error and bag confirmation
14. PDP-017 — size buttons
15. PDP-018 — one product heading
16. PDP-014 — mobile counter and thumbnails
17. PDP-013 — zoom viewer
18. PDP-015 — sticky mobile purchase bar
19. PDP-019 — shorter PDP cache
20. PDP-020 — tablet layout
21. PDP-027 — one shipping policy source
22. PDP-026 — extended size-run label
23. PDP-025 — options beyond Color × Size
24. PDP-021 — meta description and structured data
25. PDP-022 — breadcrumb from a real collection
26. PDP-023 — live errors and keyboard gallery
27. PDP-024 — hide empty recommendations
28. PDP-028 — lazy mobile slides
29. PDP-029 — outage versus 404
30. PDP-034 — “Imported” only, inside the spec list
31. PDP-031 — video and 3D only when assets exist
32. PDP-033 — stock counts only after the inventory scope exists
33. PDP-030 — reviews only after a real source exists
34. PDP-032 — leave quantity at 1

## Final PDP quality checklist

Use this after the tasks above, on at least one multi-color top with a measurement table, one plus-size style with a price spread, one mostly sold-out style, and one product with a single color.

### Data

- [ ] Material, stretch, sheer, and care match `descriptionHtml` for that handle
- [ ] Care never says “Do not tumble dry” unless that product’s HTML says so
- [ ] Size Guide rows match the Shopify table
- [ ] No supplier brand, `Trendsi`, GID, or file-id alt is visible
- [ ] “Imported” appears at most once, with no invented country
- [ ] Empty specs and empty recommendations leave no empty headings

### Media

- [ ] Hero shows the full garment for both 2:3 and 3:4 photos
- [ ] Selected color’s variant image is the hero
- [ ] Other photos remain reachable
- [ ] Mobile shows a position counter and thumbnails, including on a 30-image product
- [ ] Zoom opens, paginates, closes, and restores focus
- [ ] A product with one image does not show a broken control

### Variant and price

- [ ] Size is required before add
- [ ] Sold-out sizes are visible and cannot be added
- [ ] A fully sold-out color disables the CTA
- [ ] Button price matches the selected size
- [ ] “From” appears only before a size is chosen, and only when prices differ
- [ ] No strikethrough unless compare-at is higher than the price

### Purchase

- [ ] Add To Bag puts the selected variant in the bag and shows the bag
- [ ] A failed add shows an error and does not say success
- [ ] Buy Now checks out only that variant and leaves the previous bag in place
- [ ] Double-click does not add two lines
- [ ] Sticky bar on a phone matches the main button’s state and is absent on desktop

### Trust

- [ ] Shipping and returns appear once, from the same copy, and match checkout policy
- [ ] No fake scarcity, countdown, or reviews

### Responsive and accessible

- [ ] Checked at 390px, 768px, and 1280px with no horizontal page overflow
- [ ] One `h1`, unique heading id
- [ ] Size, color, and zoom controls meet tap size and have names
- [ ] Error is announced
- [ ] Size guide traps and restores focus

### SEO and resilience

- [ ] Meta description is a short sentence
- [ ] JSON-LD price and URL match the page
- [ ] Unknown handle 404s
- [ ] Storefront failure does not look like a missing product
- [ ] Wishlist, cart quantity edit, and hosted checkout still behave as they do today
