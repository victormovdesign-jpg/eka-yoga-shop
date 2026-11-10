# EKA YOGA shop: WooCommerce handoff

Brief for the developer who builds the live shop on WordPress + WooCommerce.

**Shop address:** https://shop.ekaterinaminkova.com/
**Main site:** https://ekaterinaminkova.com/ (separate site, links to the shop)
**Design reference (live):** https://victormovdesign-jpg.github.io/eka-yoga-shop/

---

## 1. What this repo is

This repo holds the **finished front-end design** of the shop as static HTML/CSS/JS:
all 9 pages, shared components, motion, design tokens, fonts and product photos.
It is the source of truth for how the shop must look and behave.

The job is to turn this design into a working WooCommerce shop. The WordPress
install, database and plugins live on the hosting, not in this repo.

## 2. Key decisions

| Topic | Decision |
|---|---|
| Platform | WordPress + WooCommerce on the subdomain `shop.ekaterinaminkova.com` |
| Cart | The shop has **its own cart**. It is not shared with the main site. |
| Products | **Physical** products, shipped |
| Currency | **EUR (€)** |
| Language | Bulgarian. Formal "Вие" in body copy; informal "ти" in titles and CTAs |
| Main site link | The main site only links to the shop. No integration needed. |

## 3. Pages → WooCommerce templates

| Static page in repo | Route | WooCommerce equivalent |
|---|---|---|
| `index.html` | `/` | Home (front page) |
| `za-eka-yoga.html` | `/za-eka-yoga` | Static page "За EKA YOGA" |
| `oblekla-i-aksesoari.html` | `/oblekla-i-aksesoari` | Shop / product archive |
| `produkt.html` | `/produkt/[slug]` | Single product (variable) |
| `komplekti.html` | `/komplekti` | Category archive "Комплекти" |
| `komplekt.html` | `/komplekti/[slug]` | Single product (set) |
| `kolichka.html` | `/kolichka` | Cart |
| `porachka.html` | `/porachka` | Checkout |
| `blagodarim.html` | `/blagodarim` | Order received / Thank-you |

Plus the side cart drawer "Моята количка" (`js/cart-drawer.js`), which should become the WooCommerce mini-cart (AJAX).

Shared parts on every page, in this order: **Header → content → PreFooter → Footer.**
See `SITE.md` and `docs/` for component specs, motion timings and the size guide.

## 4. Design system

- Tokens: `css/tokens.css` (colours, type scale, radius). Use these values, don't invent new ones.
- Main colours: background `#F3F0E4`, text/green `#5D7054`, button `#AF5D65` (hover `#C3737B`).
- Fonts: **Cormorant Garamond** (headings, Google Fonts) and **Lato** (body, **self-hosted** in `fonts/`). Google's Lato has no Cyrillic, so keep the self-hosted files.
- Full spec: `docs/EKA-YOGA_DesignSystem.md`. The latest section at the bottom wins.

Recommended approach: a custom theme or a child theme of a light theme (Kadence/Blocksy),
reusing the CSS from this repo. If you keep the theme code in GitHub, use a **separate repo**.

## 5. Products

Ready-to-import file: **`woocommerce-products.csv`** (WooCommerce → Products → Import).

- 6 variable products, 36 variations.
- Global attributes: **Цвят** (Бордо, Маслина, Синьо, Жълто) and **Размер** (S, M, L).
- Images point to the live design site, so the importer can download them.
- `TODO` cells: the owner fills these in before import (descriptions, weight, stock).

| Product | Category | Price € | Colours | Sizes |
|---|---|---|---|---|
| Гащеризон за йога | Облекла | 98 | Бордо, Маслина, Синьо | S, M |
| Шорти за йога | Облекла | 49 | Бордо, Маслина, Синьо | S, M |
| Тениска с мандала | Облекла | 45 | all 4 | S, M, L |
| Възглавничка за очи | Аксесоари | 36 | all 4 | one size |
| Мандала флоу (set) | Комплекти | 119 | all 4 | none |
| Елегантен ритуал (set) | Комплекти | 123 | all 4 | none |

Colour swatch hex values: `data/colors.json`. The source of truth for products is the Google Sheet; `data/products.csv` is a snapshot of it.

To check: sets are imported as variable products by colour. Confirm with the owner whether
a set also needs sizes per item. If it does, use a bundle plugin (e.g. WooCommerce Product Bundles).

## 6. Settings checklist

- [ ] Currency EUR, prices **including VAT**, € shown after the number (Bulgarian format, e.g. `98,00 €`)
- [ ] Store address + VAT number (from owner)
- [ ] Shipping zones: Bulgaria (+ EU?) with prices (from owner). Consider Econt / Speedy plugins for office/address delivery.
- [ ] Payments: Stripe (cards) and/or cash on delivery. **Test mode first.**
- [ ] Tax rates for Bulgaria
- [ ] Order emails: logo, brand colours, Bulgarian text
- [ ] Legal pages: Общи условия, Поверителност, Връщане и замяна. Cookie banner.
- [ ] SSL on the subdomain
- [ ] "Coming soon" mode until launch
- [ ] Backups + update plan

## 7. Done when

1. Every page matches the live design reference on desktop and mobile.
2. A test order goes through end to end: cart drawer → cart → checkout → thank-you → emails.
3. Refund works.
4. Owner approves → payments switched to live → "Coming soon" off.
5. The main site gets the "Shop" link.

## 8. Not in this repo (sent separately, never commit)

Hosting login, WordPress admin, Stripe/PayPal keys, any passwords.
They are shared through a password manager or another secure channel.

## 9. Open questions for the owner

- Shipping prices and countries
- Stock quantities and product weights
- Product descriptions (short + long)
- Which payment methods: card, cash on delivery, bank transfer?
- Hero/section videos (still to come)
- Favicon
