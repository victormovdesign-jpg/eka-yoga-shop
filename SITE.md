# EKA YOGA — shop

> Wear the bloom. Boutique yoga-wear shop for Ekaterina Minkova (ekaterinaminkova.com).

Plain HTML/CSS/JS. No frameworks, no build step. Live canvas: https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq.

---

## Brand identity

- **Personality:** calm, warm, natural. Soft greens and rose on warm off-white. Serif headlines paired with humanist sans body text. Formal Bulgarian ("Вие") in default copy; informal ("ти") in titles and CTAs per the 2026-11-05 decision.
- **Colours** (full list + tokens in `css/tokens.css`):
  - Page background: `#F3F0E4` everywhere
  - Text + logos on light: `#5D7054` (brand-green)
  - Primary button: `#AF5D65` (brand-red), hover `#C3737B`
  - Product-category tints (red / yellow / green / blue) for swatches only
- **Fonts:**
  - **Cormorant Garamond** — headings. Google Fonts (ships Cyrillic).
  - **Lato** — body + UI. Self-hosted WOFF2 in `fonts/` (Google's Lato has no Cyrillic subset — Bulgarian would fall back).

---

## Pages

- **Home** (`index.html`) — built from `design/Main.dc.html`. Uses shared Header/PreFooter/Footer/CartDrawer; page styles in `css/home.css`, behaviour + entrance animations in `js/home.js`.
- **Style guide** (`styleguide.html`) — every colour, gradient, heading, text style, button, badge, form control, card, swatch, cart badge, icon, logo, price style and quote. Reference for the design system.
- **Components** (`components.html`) — demo of all seven shared components rendered in page order: Header → content → PreFooter → Footer. Also mounts the SizeGuide dialog (two instances — S/M and S/M/L) and the CartDrawer.

Still to build (one per `docs/current-state.md`): `/` Home (Main), `/za-eka-yoga` Brand, `/oblekla-i-aksesoari` Collection, `/produkt/[slug]` Product, `/komplekti` Sets, `/komplekti/[slug]` Set, `/kolichka` Cart, `/porachka` Checkout, `/blagodarim` Thank-you.

---

## File structure

```
shop-ship-studio/
  index.html              redirect → style guide
  styleguide.html         design-system reference
  components.html         shared-components demo
  css/
    tokens.css            design tokens v4 (colours, type scale, radius)
    base.css              reset, typography helpers, button helpers
    components.css        the 7 shared components (.hd, .ft, .pf, .emb, .pc, .sg, .cd)
    styleguide.css        style-guide page layout (.guide__*)
    components-demo.css   components-page layout (.cx__*)
  js/
    checkout.js           cart adapter STUB (localStorage + CustomEvents)
    header.js             mobile menu + cart-icon dispatch
    product-card.js       swatch → image swap
    size-guide.js         modal open/close, multi-instance
    cart-drawer.js        cart UI, reads from checkout.js
    components-demo.js    buttons on the components demo page
  fonts/                  self-hosted Lato (6 WOFF2) + fonts.css
  images/                 product photos, logos, banner, hero, more
  data/                   products.csv, products.json, colors.json, asset-map.json
  scripts/sync-products.mjs   CSV → JSON (plain Node, zero deps)
  design/                 canvas exports (.dc.html) — reference, not runtime
  docs/                   CLAUDE.md brief, current-state.md, pages.md, design system
  CLAUDE.md               shop brief for Claude Code
  SITE.md                 this file
```

---

## Shared components

All seven live in `css/components.css` + their matching `js/*.js`:

| Component | Where | Notes |
|---|---|---|
| Header | `.hd` + `.hd--overlay` | Two variants (overlay = scrim over hero; solid = on bg-page). Mobile menu. Dropdowns hidden until client signs off. |
| Footer | `.ft` | 4-column desktop, 1-column mobile, newsletter + legal row. |
| PreFooter | `.pf` | Quote + "Още от Екатерина Минкова" 3-card grid + EMBanner. Sits above Footer on every page. |
| EMBanner | `.emb` | Екатерина Минкова promo card with "Към ekaterinaminkova.com". |
| ProductCard | `.pc` | Item variant (3:4 photo) and set variant (616:398). Swatch click swaps the main image. |
| SizeGuide | `.sg` | Modal pop-up. `data-sizes="S,M"` or `"S,M,L"` picks the right table; L only on Тениска. |
| CartDrawer | `.cd` | Right-side drawer. Reads/writes via `js/checkout.js`. "Купи сега" throws the stub message until a provider is picked. |

Page order on every real page: **Header → content → PreFooter → Footer.**

---

## Cart + checkout

Local state only. `js/checkout.js` exports `add`, `remove`, `updateQuantity`, `clear`, `getCart`, `onChange`, `checkout`. Lines persist in `localStorage` under `eka-cart-v1`. Every change broadcasts `eka:cart-change` so the drawer repaints.

`checkout()` **throws** — no provider is chosen yet (external link / WooCommerce / Shopify / Stripe is still an open decision). The error message surfaces inside the drawer so the stub stays honest.

To wire a real checkout: replace the body of `checkout()` in `js/checkout.js`. Pages don't need to change.

---

## Fonts

Cormorant Garamond ships Cyrillic from Google. Lato does not — it was self-hosted so Bulgarian text renders correctly. If you ever need to rebuild the Lato files:

1. Download `Lato-Regular.ttf`, `Lato-Bold.ttf`, `Lato-Black.ttf` from the OFL source (currently mirrored at `github.com/google/fonts/ofl/lato/`).
2. Use `pyftsubset` (fontTools) to split each weight into Latin + Cyrillic WOFF2 with Google's standard `unicode-range` values.
3. Drop the six files into `fonts/` — `fonts/fonts.css` already references them.

---

## Data

- `data/products.csv` — hand-edited snapshot of the Google Sheet (id, name, category, colors, sizes, price_eur).
- `data/colors.json` — four product colours (бордо, маслина, синьо, жълто) with hex + product-token name.
- Build `data/products.json` after editing the CSV:
  ```
  node scripts/sync-products.mjs
  ```
  Script also warns if the CSV drifts from the 6-product table in `docs/current-state.md`.
- `data/asset-map.json` maps `/_blob/<id>` paths found in canvas `.dc.html` files to real files in `images/`.

---

## How to customize

- **Change a colour:** edit the CSS variable in `css/tokens.css` — propagates everywhere.
- **Change a type size:** edit the `--fs-*` variable in `css/tokens.css`. Mobile overrides live in the `@media (max-width: 767px)` block in the same file.
- **Add a product:** add a row to `data/products.csv` and re-run `node scripts/sync-products.mjs`.
- **Add a page:** copy `components.html` as a template (it already has Header, PreFooter, Footer, CartDrawer, SizeGuide wired). Replace the `<main>` content.
- **Rebuild images:** `python3 scripts/build-images.py` (sources live in `../shop-webP/`).

---

## Recent changes

- **2026-11-09:** Home page built (`index.html`, `css/home.css`, `js/home.js`). Entrance animations: every element 0→100% opacity in 300 ms on reveal; titles also slide bottom→top 24 px; carousel items and colour grid reveal left→right, 120 ms apart; triggered by IntersectionObserver; disabled under `prefers-reduced-motion`. Other pages not animated yet.
- **2026-11-09:** ProductCard swatch + price refinement — swatch stroke now matches fill color (via `--swatch-color` CSS var passed per button), inner square centered with flex. Price `.pc__price` switched from italic to upright Cormorant bold; `.lining-nums` now sets `proportional-nums lining-nums`. Header mobile breakpoint moved from 767px to 984px (`.hd` media query). Added `:has()` rule to hide `.hd__logo`, `.hd__cart`, `.hd__burger` while the mobile menu is open.
- **2026-11-09:** Converted from Astro + TypeScript to plain HTML/CSS/JS. Removed `node_modules`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `lib/`, `_site/`. Moved `public/images` and `public/fonts` to the project root. All pages now ship as static HTML — no build step.
- **2026-11-08:** Built seven shared components (Header, Footer, PreFooter, EMBanner, ProductCard, SizeGuide, CartDrawer) + components demo page. Self-hosted Lato 2.0 to fix Cyrillic fallback. Wrote `scripts/sync-products.mjs` + `js/checkout.js` stub.
- **2026-11-07:** Generated design tokens v4 from `design/ds/tokens.json`. Built style-guide page covering every colour, type style, gradient and button variant.

---

## Sources of truth

If anything disagrees, the Google Sheet wins on products and the live canvas wins on design:

| What | Where |
|---|---|
| Visual design | https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq (canvas exports in `design/`) |
| Design system | `docs/EKA-YOGA_DesignSystem.md` (latest section at bottom wins) |
| Page specs | `docs/pages.md` |
| Current state (routes, structure, open questions) | `docs/current-state.md` |
| Products | Google Sheet `1qjy6b5jYHnIBTrXzLAUpNXeMGzchxVt3UhpRXmt0MUE` (snapshot in `data/products.csv`) |
| Build brief for Claude Code | `CLAUDE.md` |
