# EKA Yoga shop – current state (updated 2026-11-08)

Single source of truth for the EKA shop. The Claude Project doc `claude/eka-shop-state.md` only points here.

## Where things live
| What | Where |
|---|---|
| Live design (canvas, Claude Design) | https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq (slug 0cc0e82b-30f7-49a1-8973-30403a547ada). `design/` matches it as of 2026-11-08. Viktor edits it by hand – re-read before changing. |
| Build brief for Claude Code | `CLAUDE.md` |
| Design system (only copy) | `docs/EKA-YOGA_DesignSystem.md` (latest sections at the bottom win) |
| Page specs | `docs/pages.md` |
| Product data | Google Sheet 1qjy6b5jYHnIBTrXzLAUpNXeMGzchxVt3UhpRXmt0MUE → snapshot `data/products.csv`; colours `data/colors.json` |
| Images | source `../shop-webP/` only; `data/asset-map.json` maps `/_blob/<id>` → file; web copies in `public/images/` via `scripts/build-images.py` |
| Design source copies | `design/*.dc.html` + `design/ds/tokens.json` – exact export of the canvas, 2026-11-08 16:30 (see `design/README.md`) |

## Structure
```
shop-ship-studio/
  CLAUDE.md                 build brief + rules for Claude Code
  docs/current-state.md     this file
  docs/EKA-YOGA_DesignSystem.md
  docs/pages.md
  design/                   .dc.html exports of the canvas (9 pages, 7 components, 9 Mobile-* wrappers)
  design/ds/tokens.json     design-system tokens v4 (single source for type scale)
  data/                     products.csv, colors.json, asset-map.json
  public/images/            generated web images
  scripts/build-images.py
  _to_delete/               obsolete files, ignore
../shop-webP/               image originals
```

## Pages (canvas artboard → file → route)
| Artboard | File | Route |
|---|---|---|
| EKA-First page | Main.dc.html | `/` |
| EKA-Brand | Brand.dc.html | `/za-eka-yoga` |
| EKA-Collection | Collection.dc.html | `/oblekla-i-aksesoari` |
| EKA-theProduct | Product.dc.html | `/produkt/[slug]` |
| EKA-sets | Sets.dc.html | `/komplekti` |
| EKA-theSet | Set.dc.html (`?set=mf|er&color=…`) | `/komplekti/[slug]` |
| EKA-Cart | Cart.dc.html | `/kolichka` |
| EKA-Checkout | Checkout.dc.html | `/porachka` |
| EKA-ThankYou | ThankYou.dc.html | `/blagodarim` |
Every page has a mobile artboard `Mobile-<Page>.dc.html` (390px wrapper that imports the page; container `ekam`). Mobile CSS lives in each file's `@media (max-width:767px)` block; global mobile rules are in Header.

## Components
Header (overlay/solid variants, mobile menu, cart drawer trigger, global mobile CSS), Footer, ProductCard (item + set variant, mini carousel), SizeGuide (pop-up), CartDrawer, EMBanner, **PreFooter** (quote + "Още от Екатерина Минкова" + EMBanner – above the Footer on every page).

## Page order (every page)
Header → page content → PreFooter → Footer.

## Products
| Product | Colours | Sizes | € |
|---|---|---|---|
| Гащеризон за йога | бордо, маслина, синьо | S, M | 98 |
| Шорти за йога | бордо, маслина, синьо | S, M | 49 |
| Тениска с мандала | all four | S, M, L | 45 |
| Възглавничка за очи | all four | Един размер | 36 |
| Мандала флоу (комплект) | all four | – | 119 |
| Елегантен ритуал (комплект) | all four | – | 123 |
Services are not sold – they link to ekaterinaminkova.com.

## Decided (2026-11-08)
- Mobile is designed (390px). Type scale and spacing: design system › "Update 2026-11-08".
- Product card images 3:4 everywhere; set cards 616:398.
- Copy: "ти" form everywhere – titles, CTAs and Footer. Where the design system or a canvas file still says "Вие", build it as "ти" (confirmed 2026-11-08).
- ThankYou table columns: Артикул · Цена · Брой · Сума.

## Sync status
- 2026-11-08 16:30: all 25 canvas files exported to `design/` (pages, components, Mobile-* wrappers, ds/tokens.json). Retired hidden blocks removed. Previous copies in `_to_delete/design-2026-11-07/`.
- Any later canvas edit makes `design/` stale again – re-export before building that page.

## Decided (2026-11-08, data)
- Шорти: three colours only (бордо, маслина, синьо). Жълто removed from `data/products.csv`; **the Sheet cell E4 (Шорти × жълто) still says "yes" and must be cleared by hand**; there are no yellow shorts photos in `shop-webP/Shorti`.
- Sizes are per product: Гащеризон and Шорти S, M; Тениска S, M, L; Възглавничка Един размер. The SizeGuide pop-up shows only the size columns the current product has (L column only on Тениска). Implementation: pass `sizes` into SizeGuide and hide the L column otherwise. Needs a design check on the canvas.

## Open
- Videos for the hero and Ритуал sections.
- Header dropdowns hidden – decide later.
- Checkout provider not chosen (`lib/checkout.ts` adapter).
