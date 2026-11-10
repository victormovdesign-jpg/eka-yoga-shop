# EKA YOGA — shop

> Wear the bloom. Boutique yoga-wear shop for Ekaterina Minkova (ekaterinaminkova.com).
> Designer: Viktor Muhtarov (victormov). All UI copy in Bulgarian.

Plain HTML/CSS/JS. No frameworks, no build step. **Updated 2026-11-10.**

---

## Where things live (read first)

| What | Where |
|---|---|
| **Code — source of truth** | Claude artifact "EKA YOGA – Home preview": https://claude.ai/artifact/M9QoAUzvXfv5cPdeaiTteE (slug `a323635b-b306-45b2-a667-44af95996d1b`). The final-design build of all 9 pages. |
| **GitHub repo** | https://github.com/victormovdesign-jpg/eka-yoga-shop (branch `main`, **Public**). The artifact's 9 pages **plus** everything under *Animations* below (navbar, entrance, overlap) and the `overflow-x: clip` fix — **the repo is newer than the artifact** for those. |
| **Live site (GitHub Pages)** | https://victormovdesign-jpg.github.io/eka-yoga-shop/ — Pages builds from `main`, `/ (root)`. |
| Visual design (canvas) | https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq (exports in `design/`) |
| Design system / page specs | `docs/EKA-YOGA_DesignSystem.md`, `docs/pages.md` |
| Product data | Google Sheet `1qjy6b5jYHnIBTrXzLAUpNXeMGzchxVt3UhpRXmt0MUE` → `data/products.json` |

If the artifact and the repo disagree, check which is newer before overwriting — as of 2026-11-10 the repo is ahead (the artifact has none of the animation work). The 2026-11-09 zip (`shop-ship-studio`) was an **older** snapshot — do not build from it.

---

## Brand identity

- Calm, warm, natural. Page background `#F3F0E4`; text + logos `#5D7054` (brand-green); primary button `#AF5D65`, hover `#C3737B`.
- Headings **Cormorant Garamond** (Google Fonts). Body/UI **Lato**, self-hosted WOFF2 in `fonts/` (Google's Lato has no Cyrillic).
- Copy uses the informal "ти" form. No shadows. Gradients: `scrim-header`, `thumb-gradient` (+ documented exceptions in `docs/pages.md`).

---

## Pages

| Page | File | CSS / JS |
|---|---|---|
| Home | `index.html` | `css/home.css`, `js/home.js` |
| Brand | `za-eka-yoga.html` | `css/brand.css`, `js/brand.js` |
| Collection | `oblekla-i-aksesoari.html` | `css/collection.css`, `js/collection.js`, `js/collection-data.js` |
| Product | `produkt.html?p=<slug>&c=<colour>` | `css/product.css`, `js/product.js`, `js/product-texts.js` |
| Sets | `komplekti.html` | `js/sets.js` |
| Set | `komplekt.html?s=<slug>&c=<colour>` | `js/set.js` |
| Cart | `kolichka.html` | `css/cart.css`, `js/cart.js` |
| Checkout | `porachka.html` | `css/checkout.css`, `js/checkout-page.js` |
| Thank you | `blagodarim.html` | `css/thank-you.css`, `js/thank-you.js` |

Shared on every page: `css/tokens.css`, `css/base.css`, `css/components.css`, `js/header.js`, `js/cart-drawer.js`, `js/product-card.js`, `js/size-guide.js`, `js/checkout.js`, `js/motion.js` (entrance + overlap; loaded last).
Page order everywhere: **Header → content → PreFooter → Footer.** Home uses the overlay header (`.hd--overlay`); other pages the solid one.

Reference-only files also in the repo (not part of the live site): `components.html`, `styleguide.html`, `design/`, `docs/`, `scripts/`.

---

## Animations (every page)

Summary table of all timings: `docs/EKA-YOGA_DesignSystem.md` › "Update 2026-11-10 — Motion".

**Entrance + overlap** live in `js/motion.js` (loaded **last** on every page, after the page script has rendered) and at the end of `css/components.css`. Page markup is untouched for the entrance — JS adds `data-reveal` itself; each page's `<head>` sets `<html class="js-anim">` with an inline script.

**Entrance on scroll** — every page, same as Home: sections animate one by one when they scroll into view (IntersectionObserver, threshold 0.15), never all at load:
- every element: opacity 0 → 100%, **500 ms**;
- titles (`.hm-title`, `.hm-ritual__title`, `.br-h2`, `.cl-title`, `.ct-title`, `.co-title`, `.ty-title`, PreFooter "Още от…" h2): fade + rise from 24 px below;
- groups reveal children **left → right, 120 ms apart**: Home carousels / brand tiles / swatches / colour grid / sets grid, product-page grids, PreFooter cards; long grids (Collection `.cl-grid`, Sets `.st-grid`) reveal **row by row** as each scrolls in;
- singles fade: hero / ritual / Brand images and text blocks, breadcrumbs, filter bar, product gallery + info, cart, checkout form + summary, thank-you table, PreFooter quote, EM banner;
- grids that re-render (filters, tabs) animate their new items;
- without JS, or with `prefers-reduced-motion`, everything is simply visible.
- **New page or new block?** Add the page's selectors to `TITLES` / `SINGLES` / `GROUPS` / `LONG` at the top of `js/motion.js`, put `<script>document.documentElement.classList.add("js-anim");</script>` in its `<head>`, and load `js/motion.js` **after** the page's own script.

**Navbar on scroll** — every page, in `js/header.js` + `css/components.css` (class `.hd--scroll` added by JS):
- solid header (most pages): `position: sticky`, keeps `--bg-page`; overlay header (Home, Brand): `position: fixed`;
- at the top (≤10 px): always visible, original look;
- scrolling down: fades out, **200 ms**; scrolling up: fades in, **200 ms** (jitter < 6 px ignored);
- overlay header after scroll-up: **desktop (>984 px) keeps the gradient**; **≤984 px** (burger header) gets solid `--brand-green` so the white logo stays readable;
- while the header is shown below the top, sticky side panels (product info, cart summary, checkout aside) move down by the header height so it never covers them;
- stays visible while the mobile menu is open or when focus enters the header;
- `css/base.css` uses `overflow-x: clip` on `html, body` (not `hidden`, which turns the body into a scroll container and breaks every `position: sticky`).

**Scroll overlap** — **Home and Brand only** (other pages have none). Mark the covered section `data-covered-by="<selector of the next section>"` and the next one `data-cover`; they must be adjacent:
- Home: "Пазарувай по цвят" over "Завърши практиката с красив ритуал"; PreFooter quote over "EKA комплекти";
- Brand (`za-eka-yoga.html`): "Какви материи използваме?" over "За кого са създадени тези облекла?"; PreFooter quote over the eye-pillows photo (`.br-pillows`);
- while covered, the covered section keeps moving up at **30 % of the scroll speed** (bottom-aligned if taller than the viewport) and blurs **0 → 12 px**;
- the cover and every section after it are filled with `--bg-content-primary` (#F3F0E4) and stacked above, so sections stay stuck together with no gap or shadow; `clip-path: inset(0)` keeps the blur inside the covered section;
- off with `prefers-reduced-motion`.

**Cart drawer "Моята количка"** — every page (`js/cart-drawer.js` toggles `.cd.is-open`; CSS at the CartDrawer block in `css/components.css`):
- open: backdrop fades in; panel slides in **from right to left** + fades in, **300 ms, ease-out** (`cubic-bezier(0, 0, 0.2, 1)` — fast at the beginning, slower at the end);
- content fades in **one after another, top → bottom**, 500 ms each, starting 150 ms in; the gaps **grow** (60, 90, 120, 150 … ms) so the top items appear quickly and the last ones more slowly: header, products, total — then the buttons, **"Продължи да пазаруваш" first, then "Купи сега"**;
- close (×, backdrop, "Продължи да пазаруваш", Esc): panel slides out to the right + fades out, 300 ms; then `hidden`;
- quantity changes while open re-render without re-animating; off with `prefers-reduced-motion`.

Animation reference requested: https://www.wearetala.com/en-eu — **could not be reached from the cloud sandbox**, so timings follow the written spec above, not Tala's exact easing.

---

## Cart + checkout

Local state only (`js/checkout.js`, `js/cart.js`, `localStorage`). **Checkout provider not chosen** (external link / WooCommerce / Shopify / Stripe). For WooCommerce: move the CSS/JS into a theme, keep the `data-*` hooks in PHP templates, replace the cart adapter with WooCommerce's cart.

---

## How to update GitHub (current workflow)

Claude pushes **directly to `main`** from a cloud session that has `victormovdesign-jpg/eka-yoga-shop` attached (GitHub connected at claude.ai → Settings → Connectors). GitHub Pages rebuilds in ~1 min; then hard-refresh the live site (Cmd+Shift+R) — old CSS/JS is often cached.

- If a push returns **403 "Claude doesn't have GitHub access"**: reconnect GitHub at https://claude.ai/connect-github (and install the Claude GitHub App on the repo if needed), then push again.
- The cloud sandbox **cannot open the live site** (`*.github.io` is blocked), so Claude tests locally (`python3 -m http.server` + Playwright) at 1440 / 768 / 390 / 320 and checks the Pages deploy run on GitHub.

Fallback — browser upload (no Claude access):
1. Open `https://github.com/victormovdesign-jpg/eka-yoga-shop/upload/main` (root) — or `/upload/main/<folder>` to upload *into* a folder.
2. Drag the files/folders in (same names are replaced) → **Commit changes**.

Gotchas learned:
- GitHub web upload takes **max 100 files per batch** — upload `images/` subfolder by subfolder.
- Uploading from the repo root page puts folders at the root, not inside `images/`.
- All asset paths must be **relative** (`images/...`, not `/images/...`) — Pages serves the site under `/eka-yoga-shop/`.

---

## Open items

- Checkout provider — decision needed.
- Sync the artifact (M9QoAUzvXfv5cPdeaiTteE) with the repo's animation work — or treat the repo as the source of truth from now on.
- Hero copy is hidden by design (`hidden` on `.hm-hero__copy`) until the designer re-enables it.
- Videos for the hero and Ритуал sections — still open.
- No favicon (harmless 404).
- Repo is Public — decide if it should be Private (Pages on a free account needs Public).
- Duplicate repo `MuhtarovPhilips/eka-yoga-shop` (created by mistake) — delete it.
- Sheet cell E4 (Шорти × жълто) still says "yes" — clear by hand.

---

## Recent changes

- **2026-11-10:** Docs: motion spec added to the design system; `CLAUDE.md` and `docs/current-state.md` updated (repo is ahead of the artifact; push straight to `main`).
- **2026-11-10:** Cart drawer: panel 300 ms ease-out; content gaps grow top → bottom (items still 500 ms each).
- **2026-11-10:** Cart drawer: slides in from the right + fades (500 ms); content appears top → bottom, then "Продължи да пазаруваш", then "Купи сега"; slides/fades out on close.
- **2026-11-10:** Entrance animations on **every page** (shared `js/motion.js`); Collection/Sets grids reveal row by row and re-animate after filter/tab changes. Scroll overlap added on Brand ("Какви материи…" over "За кого…", quote over the eye-pillows photo).
- **2026-11-10:** Navbar hide/show on scroll on **every page** (solid header sticky, overlay header fixed); sticky side panels move below the shown header. `base.css`: `overflow-x: clip` (was `hidden`, which broke all `position: sticky`).
- **2026-11-10:** Home scroll overlap: cover sections stuck together and filled `#F3F0E4`, blur clipped, covered section drifts up at 30 % of scroll speed. Entrance fade 300 → 500 ms.
- **2026-11-10:** Navbar: desktop keeps the gradient after scroll-up; solid green only ≤984 px.
- **2026-11-09:** Navbar hides on scroll down / shows on scroll up (200 ms fade) on Home.
- **2026-11-09:** Switched the codebase to the final-design artifact build (all 9 pages). Added scroll-triggered entrance animations to Home.
- **2026-11-09:** Repo `victormovdesign-jpg/eka-yoga-shop` created; GitHub Pages enabled; images uploaded; image paths made relative.
- **2026-11-08:** Shared components, self-hosted Lato, `checkout.js` stub. **2026-11-07:** design tokens v4.
