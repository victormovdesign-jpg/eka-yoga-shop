# EKA Yoga shop – build brief for Claude Code

Boutique shop for EKA YOGA ("wear the bloom"), the clothing line of yoga teacher Ekaterina Minkova (https://ekaterinaminkova.com/).
Designer: Viktor Muhtarov (victormov). Language of all UI copy: Bulgarian.

## Sources of truth (read before coding)

| What | Where |
|---|---|
| Visual design (live canvas) | https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq |
| Design system (tokens, components, rules) | `docs/EKA-YOGA_DesignSystem.md` |
| Page-by-page spec | `docs/pages.md` |
| Product names, colours, sizes, prices | Google Sheet https://docs.google.com/spreadsheets/d/1qjy6b5jYHnIBTrXzLAUpNXeMGzchxVt3UhpRXmt0MUE (snapshot in `data/products.csv`) |
| Colour names / hex | `data/colors.json` |
| Design source files | `design/*.dc.html` (see `design/README.md`) |
| Images (source) | `../shop-webP/` – the image folder next to this one (`ShipStudio/eka-yoga/Ekaterina Minkova/shop-webP`). Work only from it. `data/asset-map.json` maps every `/_blob/<id>` in the design files to a file in it |
| Images (web copy) | `public/images/` – generated from shop-webP by `python3 scripts/build-images.py` (long edge 1600 px). Do not edit by hand; re-run the script after changing shop-webP |

If the sheet and anything else disagree, **the sheet wins**. Never invent prices or names.
Where `docs/EKA-YOGA_DesignSystem.md` and `docs/pages.md` differ on a component's sizes (Product card, Category tile, Carousel), follow `docs/pages.md` – it reflects the final canvas.

## Scope (phase 1)

- Responsive: desktop 1440 px and mobile 390 px are both designed. Breakpoint `max-width: 767px`. **Minimum supported width: 320px** – the 390px mobile artboards are the reference layout, but every page must work down to 320 with no horizontal scroll (fluid widths, wrapping titles, no fixed px widths wider than the screen). Tablet: at 768px and up the desktop layout applies; it must fit 768 cleanly (fluid grids, no overflow, no horizontal scroll). Test every page at **320, 390, 768 and 1440**. Mobile rules: design system › "Update 2026-11-08".
- Pages: Home `/` (design/Main.dc.html), Collection `/oblekla-i-aksesoari` (design/Collection.dc.html), Product `/produkt/[slug]` (design/Product.dc.html; one template, the design shows Гащеризон за йога), Sets `/komplekti` (design/Sets.dc.html), Set `/komplekti/[slug]` (design/Set.dc.html), Brand `/za-eka-yoga`, Cart, Checkout, ThankYou. Routes in docs/current-state.md. Size table pop-up: design/SizeGuide.dc.html. See docs/current-state.md.
- Shared components: Header (two variants), Footer, ProductCard (item + set variant), Carousel (Category tile + plain image), ColorSwatch, FilterDrawer, Banner (Екатерина Минкова), PreFooter (quote + "Още от Екатерина Минкова" + Banner), CartDrawer, SizeGuide. Every page: Header → content → PreFooter → Footer.
- Massages, events and gift cards are **not** sold in the shop – they only link out to ekaterinaminkova.com.
- Cart/checkout: **not decided yet.** Build the cart badge, "Добавете в количката" and "Купете сега" as UI with a local cart state; leave a clearly named adapter (`lib/checkout.ts`) to plug in the provider later (external shop link, WordPress/WooCommerce, Shopify or Stripe). Ask the designer before choosing one.

## Suggested stack

Astro (or Next.js) + TypeScript, plain CSS with CSS custom properties generated from the design-system tokens, products loaded from `data/products.json` built from the CSV (script `scripts/sync-products`), images served from `public/images` (convert to responsive `<picture>` sizes). Fonts from Google Fonts: Cormorant Garamond (400/600/700/italic) and Lato (400/700/900).

## Non-negotiable design rules (summary – details in the design system)

- Page background `#F3F0E4` everywhere. Text `#5D7054`. Primary button `#AF5D65` (hover `#C3737B`), white bold label, 8 px radius, 56 px tall.
- Headings Cormorant Garamond Bold; body/UI Lato. Prices in Cormorant use **lining numerals** (`font-variant-numeric: lining-nums`).
- No shadows. Only two gradients exist: `scrim-header` (home header over the hero) and `thumb-gradient` (category tiles). The product-tile scrim on Home › #brand and the Banner gradient are the documented exceptions in `docs/pages.md`.
- Colour swatches are squares: unselected 24 px fill; selected 22 px fill inside a 1 px outline of the same colour (32 px box). Colours from `data/colors.json` only.
- Copy uses the informal "ти" form (decided 2026-11-05); follow the canvas text exactly.
- Accessibility: real buttons/links, labelled inputs, alt text in Bulgarian, focus ring 2 px `#5D7054`, 44 px touch targets.

## How to work

1. Read `docs/EKA-YOGA_DesignSystem.md` and turn tokens into `src/styles/tokens.css`.
2. Build shared components (Header, Footer, ProductCard, SizeGuide), then Home, Collection, Product, Sets, Set – one at a time.
3. After each page, compare with the canvas (open the link above) and list differences before moving on.
4. Keep product data out of components; everything comes from the data layer.

## Before you start (2026-11-08)

1. Read `docs/current-state.md` first – it has the structure, routes, and what is open.
2. `design/` is an exact export of the canvas (2026-11-08) – build from it; read `design/README.md` first. Type scale: `design/ds/tokens.json` (v4) – generate `src/styles/tokens.css` from it.
3. In the `.dc.html` files: `{{ }}` bindings, `sc-for`, `sc-if`, `dc-import` are canvas syntax – translate them to components/props, don't copy them.
4. Mobile CSS in the design files sometimes targets inline styles; in the build use classes and the tokens instead.
5. Do not invent copy, prices or images. Ask when something is missing.
