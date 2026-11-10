# EKA-YOGA_DesignSystem

Version 4 (adds Header, Dropdown menu, Side menu, Cart badge, Category tile, Product card, Footer, and the bag and arrow icons).

EKA Yoga is calm, warm and natural: Cormorant Garamond headlines, soft greens and rose on warm off-white. Tagline: "wear the bloom".

## Content fundamentals

- Write interface copy in Bulgarian, addressing the reader with the informal "ти" everywhere (decided 2026-11-08; replaces the earlier formal "Вие"). Where an older example below still says "Вие", use "ти".
- Use sentence case and full, polite sentences. Use no emoji.
- Example error: "Полето е задължително". Example heading: "Почти завършен ...".

## Visual foundations

- **Colour:** set pages on `bg-page`. Use `text-main` for text and `brand-red` for the main action. Use `text-error` only for errors. Use `product-*` only to mark product categories.
- **Type:** set headings in Cormorant Garamond Bold (`h1-bold` to `h6-bold`), and use the italics (`h1-italic` to `h6-italic`) for a softer voice. Set body and interface text in Lato (`text-*`).
- **Shape:** use `radius-control` (8px) on buttons, fields and cards, and `radius-badge` (4px) on badges.
- **Borders:** use `border-control` at 1px on fields at rest and 2px on hover or focus. Errors use `text-error`.
- **Depth:** use no shadows. Separate surfaces with fill and borders. The only gradients are the two photo scrims: `scrim-header` (Header over photography) and `thumb-gradient` (thumb overlay on Category tiles and image thumbnails). Do not use gradients anywhere else.
- **Focus:** show keyboard focus on buttons as a solid 2px `text-main` ring.

## Iconography

- Use the supplied Instagram, YouTube and Facebook icons from the Icons group, the chevron in Select and the Header menus, and the bag and arrow icons.
- Use no emoji or glyphs as icons. Add new icons only in the same solid style.

## Logo

- Use the horizontal or vertical logo from `logos/`, white on colour and green on light grounds.


## Colors

| Token | Value | Usage |
|---|---|---|
| `brand-red` | `#AF5D65` | Primary button fill (default and selected). White text on it is 4.59:1. |
| `brand-red-light` | `#C3737B` | Primary button hover fill. White text on it is 3.47:1, which passes only for bold text 19px+; the source's 16px label misses 4.5:1. |
| `brand-green` | `#5D7054` | Brand green for logos on light grounds. |
| `bg-content-primary` | `#F3F0E4` | Field, checkbox, radio and badge fill. |
| `bg-content-secondary` | `#E3E7DC` | Secondary content panels. text-main on it is 4.28:1: use for 24px+ or bold 19px+ text only. |
| `bg-page` | `#F3F0E4` | Page background (source of truth). |
| `bg-card` | `#FFFFFF` | Card fill and label text on brand-red. |
| `border-stroke` | `#AF5D65` | Named border/stroke in the sketch, but no component uses it: components use border-control. |
| `border-control` | `#5D7054` | Borders of fields, secondary buttons, badges, cards, checkboxes and radios. |
| `text-main` | `#5D7054` | Headings and body on bg-page (5.15:1), bg-card (5.37:1), bg-content-primary (4.7:1). |
| `text-muted` | `rgba(93, 112, 84, 0.8)` | Captions and placeholders, as in the sketch (80% text-main). Below 4.5:1 on bg-page: never use for essential text. |
| `text-error` | `#B42318` | Error messages and error borders on bg-page (6.31:1) and bg-content-primary (5.76:1). |
| `state-disabled` | `#AAAAAA` | Disabled button fill, border and label. Disabled controls are exempt from contrast minimums. |
| `product-red` | `#AE2958` | Product category colour: red. White text on it is 6.5:1. |
| `product-yellow` | `#D7B955` | Product category colour: yellow. Fill only; not for text on light grounds. |
| `product-green` | `#819886` | Product category colour: green. Fill only; not for text on light grounds. |
| `product-blue` | `#518398` | Product category colour: blue. Fill only. |
| `bg-footer` | `#5D7054` | Footer fill (same value as brand-green). White text on it is 5.37:1. |
| `bg-menu` | `rgba(93, 112, 84, 0.5)` | Dropdown menu panel, as in the source (50% brand-green). Place it over the Header or photography; on bg-page it washes out, so check white text contrast against the real ground. |
| `notify-red` | `#AF5D65` | Cart count badge fill only. White 10px text on it is 4.3:1: keep the count bold. |
| `scrim-header` | `linear-gradient(180deg, rgba(93,112,84,0.8) 22%, rgba(93,112,84,0) 100%)` | Top-down scrim behind the Header over photography. |
| `thumb-gradient` | `linear-gradient(180deg, rgba(93,112,84,0) 37%, rgba(93,112,84,0.8) 100%)` | Thumb overlay (Figma style `thumb/gradient`, #5D7054 at 0% → 80%). Lay it over thumbnail photos (Category tile, image thumbs) so white text at the bottom stays readable. The top 37% stays clear. |

## Typography

- Serif: `"Cormorant Garamond", Garamond, Georgia, serif` ([Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond))
- Sans: `Lato, "Helvetica Neue", Arial, sans-serif` ([Lato](https://fonts.google.com/specimen/Lato))

| Style | Family | Size | Line height | Weight | Italic |
|---|---|---|---|---|---|
| `h1-bold` | serif | 56px | 1.2 | 700 | no |
| `h1-italic` | serif | 56px | 1.2 | 400 | yes |
| `h2-bold` | serif | 48px | 1.2 | 700 | no |
| `h2-italic` | serif | 48px | 1.2 | 400 | yes |
| `h-banner` (EKA-H banner) | serif | 64px | 1.2 | 700 | no |
| `h3-bold` | serif | 40px | 1.2 | 700 | no |
| `h3-italic` | serif | 40px | 1.2 | 400 | yes |
| `h4-bold` | serif | 32px | 1.2 | 700 | no |
| `h4-italic` | serif | 32px | 1.2 | 400 | yes |
| `h5-bold` | serif | 24px | 1.2 | 700 | no |
| `h5-italic` | serif | 24px | 1.2 | 400 | yes |
| `h6-bold` | serif | 20px | 1.2 | 700 | no |
| `h6-italic` | serif | 20px | 1.2 | 400 | yes |
| `text-large-black` | sans | 20px | 1.5 | 900 | no |
| `text-large-bold` | sans | 20px | 1.5 | 700 | no |
| `text-large-regular` | sans | 20px | 1.5 | 400 | no |
| `text-banner` (EKA-text banner) | sans | 24px | 1.5 | 400 | no |
| `text-medium-black` | sans | 18px | 1.5 | 900 | no |
| `text-medium-bold` | sans | 18px | 1.5 | 700 | no |
| `text-medium-regular` | sans | 18px | 1.5 | 400 | no |
| `text-regular-black` | sans | 16px | 1.5 | 900 | no |
| `text-regular-bold` | sans | 16px | 1.5 | 700 | no |
| `text-regular-regular` | sans | 16px | 1.5 | 400 | no |
| `text-small-black` | sans | 14px | 1.5 | 900 | no |
| `text-small-bold` | sans | 14px | 1.5 | 700 | no |
| `text-small-regular` | sans | 14px | 1.5 | 400 | no |

## Radius

| Token | Value | Usage |
|---|---|---|
| `radius-control` | `8px` | Buttons, fields, cards. |
| `radius-badge` | `4px` | Badges. |

## Components

### Badge

Use Badge to label a category.

Provide short text as `children`. Do not use it as a button.

### Button

Use Button for every action, in five variants (Big, Primary, Secondary, Third, Link) with Default, Hover, Select and Disable states.

Provide `variant`, `children` and `onClick`. Use one primary (or Big) per view, secondary beside it, third for low-emphasis actions. Keep labels short.

| Variant | Size | Label | Default | Hover | Select | Disable |
|---|---|---|---|---|---|---|
| `big` | 78px high, padding 24px 32px (127px wide with "Button") | `text-large-bold` (Lato Bold 20/1.5), white | `brand-red` fill | `brand-red-light` fill | `brand-red` fill | `state-disabled` fill |
| `primary` | 56px high, padding 0 24px | `text-regular-bold`, white | `brand-red` fill | `brand-red-light` fill | `brand-red` fill | `state-disabled` fill |
| `secondary` | 58px high, 2px `border-control` | `text-regular-bold`, `text-main` | outline | outline | outline | `state-disabled` outline and label |
| `third` | 56px high, no fill | `text-regular-bold`, `text-main` | no line | 1px `brand-red` underline across the button | same as hover | `state-disabled` label |
| `link` | inline, hugs the text | `text-regular-regular` (Lato Regular 16), `brand-red` | no line | 2px `brand-red` underline under the text | same as hover | `state-disabled` label |

- **Big** is the primary button at a larger size, for hero sections and the one key action on a page (e.g. "Купи сега"). Radius stays `radius-control` (8px). Don't place Big and Primary side by side.
- **Link** is for actions inside text or under cards ("Виж повече", "Общи условия"). Render it as `<a>` when it goes to a page, `<button>` when it acts in place. Brand-red on bg-page is 4.4:1, just under 4.5:1 for 16px text: keep links short and underline them on hover and focus, or darken the ink if they carry essential meaning.

### Card

Use Card for short confirmation messages.

Provide `title` and `children`, usually text and one secondary Button.

### Checkbox

Use Checkbox for independent yes/no choices.

Provide `label`, and `error` when invalid. The checked mark is an addition: the sketch shows only unchecked states.

### Radio

Use Radio to pick one option from a group.

Provide `label`, a shared `name`, and `error` when invalid. The selected mark is an addition: the sketch shows only unselected states.

### Select

Use Select to pick from a list.

Provide `<option>` children and `error` when invalid. The field uses the chevron from the source.

### TextField

Use TextField for single-line input.

Provide `placeholder`, `value`, and `error` when invalid. Write errors in Bulgarian, like the source.

### Textarea

Use Textarea for long messages.

Provide `placeholder`, `value`, and `error` when invalid.

### Header

Use Header as the site navigation bar: 1440px wide, 96px high, horizontal logo left, links and cart right.

Two variants: `overlay` (white logo and links on `scrim-header`, over hero photography) and `solid` (green logo and links on bg-page). Links are Lato Bold 16px with 24px gaps; "Облекла и аксесоари" and "Комплекти" carry the chevron and open a Dropdown menu. The cart sits last with a Cart badge.

### Dropdown menu

Use Dropdown menu for the items under a Header link: 304px wide, `bg-menu` fill, no radius.

Items are 56px high (two-line items grow), padding 0 48px, Lato Regular 16px white. Hover underlines the label in white; the source shows no selected state. Close on Escape and outside click; open on click and on keyboard, not on hover alone.

### Side menu

Use Side menu for vertical lists of section links (e.g. "Айенгар йога").

Items are 232px wide and 56px high, padding 0 48px, Lato Regular 16px. Default and hover are white text with no fill; Selected uses a `brand-red` fill with white text. Mark the selected item with `aria-current="page"`.

### Cart badge

Use Cart badge to show the number of items on the bag icon.

An 18px `notify-red` circle at the icon's top right, white Lato Black 10px count. Show 1–99, then "99+". Hide it at zero. Give the cart link an accessible name with the count ("Количка, 12 продукта").

### Category tile

Use Category tile to link to a product category, usually in a Carousel.

320×320px photo, `thumb-gradient` over it, label centred near the bottom in Cormorant Garamond Bold 32px white ("Продукт"). The whole tile is the link. The grey #808080 in the source is a placeholder for the photo.

### Product card

Use Product card in shop grids and the Carousel.

Photo 416×442px (no radius), then a row with a 32px colour swatch (1px outline, 22px inner square in the `product-*` colour) and the product name in Lato Regular 16px `text-muted`, then the price in Cormorant Garamond 24px ("€ 87"). The card links to the product page.

### Carousel

Use Carousel to scroll a row of Category tiles or Product cards horizontally.

On desktop, use the Carousel arrow for next and previous controls, placed over the row's right and left edges and vertically centred on the images, with Bulgarian labels (`aria-label="Следващ"`, `"Предишен"`). Hide the previous arrow at the start and the next arrow at the end. On mobile (below 768px), hide the arrows and rely on swipe. Keep cards at their fixed sizes and let the row scroll.

### Footer

Use Footer on every page: full width, `bg-footer` fill, 80px vertical padding, white content.

From top: vertical white logo (`EKA_logo_vertical_white.svg`), Instagram and Facebook icons (32px, 24px gap), then four columns: "Към Екатерина Минкова" (bold links), "Колекция" and "Комплекти" (bold group titles, regular links), "Обща информация" and "Контакти" (phone and e-mail with 24px icons), and the newsletter "Остани в крак с новите продукти" (TextField and primary Button "Изпрати", each 322×56px, then consent text). A 1px white divider, then legal links (© 2026 EKA YOGA, Политика за поверителност, Общи условия, Бисквитки) and the credit line. All Footer text is Lato 14px; titles bold, links regular. Footer copy uses "ти", the same as the rest of the system (decided 2026-11-08).

## Assets

### Logos

Use the white logos on brand-red, brand-green or photography and the green logos on bg-page or bg-content-primary. Inks are fixed: white #FFFFFF and green #5D7054. Do not redraw, stretch or recolour them.

Each logo is the tree mark, the EKA YOGA wordmark and the italic tagline "wear the bloom". The files live in `logos/`:

| File | Size (viewBox) | Ink | Use |
|---|---|---|---|
| `EKA_logo_horizontal_white.svg` | 182×64 | white | Header `overlay` over photography |
| `EKA_logo_horizontal_green.svg` | 182×64 | `brand-green` | Header `solid` on bg-page |
| `EKA_logo_vertical_white.svg` | 122×127 | white | Footer, brand-red or brand-green grounds |
| `EKA_logo_vertical_green.svg` | 122×127 | `brand-green` | Light grounds where the layout is centred |

- **Horizontal:** mark left, wordmark and tagline right. Use it wherever the logo sits in a row (Header). Show it at 182×64px on desktop; don't go below 128px wide, where the tagline stops being readable.
- **Vertical:** mark centred above the wordmark and tagline. Use it in centred, stacked layouts (Footer, splash, packaging). Don't go below 88px wide.
- **Clear space:** keep at least the height of the wordmark's capitals (about 17px at full size) free on every side.
- Scale proportionally only. Give the image `alt="EKA YOGA"` (and link it to the home page in the Header).

### Icons

Instagram, YouTube and Facebook icons, ink white #FFFFFF. Use them on dark or coloured grounds only.

- **Bag** (20×20 frame, 16×20 glyph): cart in the Header. Ink `text-main` on light grounds, white in the overlay Header.
- **Arrow right** (20px): "see more" links. Ink `text-main`.
- **Carousel arrow** (28×29px, desktop only): next/previous control on Carousels. The 20px arrow glyph in `text-main` (#5D7054) on a white 80% square (`rgba(255,255,255,0.8)`), no radius. Mirror it (`transform: scaleX(-1)`) for "previous". On mobile, hide it and let the row scroll by swipe.

```svg
<svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="29" fill="white" fill-opacity="0.8"/><path d="M15.483 6.96934C15.6236 6.82889 15.8143 6.75 16.013 6.75C16.2118 6.75 16.4024 6.82889 16.543 6.96934L23.531 13.9693C23.6715 14.11 23.7504 14.3006 23.7504 14.4993C23.7504 14.6981 23.6715 14.8887 23.531 15.0293L16.543 22.0293C16.4016 22.166 16.2122 22.2417 16.0156 22.2401C15.8189 22.2385 15.6308 22.1597 15.4917 22.0207C15.3525 21.8817 15.2736 21.6936 15.2718 21.497C15.27 21.3003 15.3455 21.1109 15.482 20.9693L21.191 15.2503L5.00002 15.2613C4.80111 15.2616 4.61024 15.1828 4.4694 15.0424C4.32856 14.9019 4.24929 14.7113 4.24902 14.5123C4.24876 14.3134 4.32752 14.1226 4.46799 13.9817C4.60845 13.8409 4.79911 13.7616 4.99802 13.7613L21.192 13.7513L15.481 8.02934C15.3406 7.88871 15.2617 7.69809 15.2617 7.49934C15.2617 7.30059 15.3406 7.10997 15.481 6.96934" fill-rule="evenodd" clip-rule="evenodd" fill="#5D7054"/></svg>
```
- **Phone** and **Mail** (24px, white): Footer contacts only.

## CSS

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=Lato:wght@400;700;900&display=swap");
body{margin:0;padding:16px;background:var(--bg-page);color:var(--text-main);font-family:var(--font-sans);font-size:16px}
.eka-btn{box-sizing:border-box;height:56px;min-width:99px;padding:0 24px;border:0;border-radius:var(--radius-control);background:none;color:var(--text-main);font:700 16px/1.5 var(--font-sans);cursor:pointer}
.eka-btn:focus-visible,.eka-field:focus-visible{outline:2px solid var(--text-main);outline-offset:2px}
.eka-btn--primary{background:var(--brand-red);color:var(--bg-card)}
.eka-btn--primary:hover,.eka-btn--primary.is-hover{background:var(--brand-red-light)}
.eka-btn--primary:active,.eka-btn--primary.is-select{background:var(--brand-red)}
.eka-btn--primary:disabled{background:var(--state-disabled);cursor:not-allowed}
.eka-btn--secondary{border:2px solid var(--border-control);height:58px;min-width:101px}
.eka-btn--secondary:disabled{border-color:var(--state-disabled);color:var(--state-disabled);cursor:not-allowed}
.eka-btn--third{border-bottom:1px solid transparent;border-radius:0}
.eka-btn--third:hover,.eka-btn--third.is-hover,.eka-btn--third:active,.eka-btn--third.is-select{border-bottom-color:var(--brand-red)}
.eka-btn--third:disabled{color:var(--state-disabled);border-color:transparent;cursor:not-allowed}
.eka-btn--big{height:78px;min-width:127px;padding:0 32px;background:var(--brand-red);color:var(--bg-card);font:700 20px/1.5 var(--font-sans)}
.eka-btn--big:hover,.eka-btn--big.is-hover{background:var(--brand-red-light)}
.eka-btn--big:active,.eka-btn--big.is-select{background:var(--brand-red)}
.eka-btn--big:disabled{background:var(--state-disabled);cursor:not-allowed}
.eka-btn--link{height:auto;min-width:0;padding:0 0 2px;border-bottom:2px solid transparent;border-radius:0;color:var(--brand-red);font:400 16px/1.5 var(--font-sans);text-decoration:none}
.eka-btn--link:hover,.eka-btn--link.is-hover,.eka-btn--link:active,.eka-btn--link.is-select,.eka-btn--link:focus-visible{border-bottom-color:var(--brand-red)}
.eka-btn--link:disabled{color:var(--state-disabled);border-color:transparent;cursor:not-allowed}
.eka-badge{display:inline-flex;align-items:center;box-sizing:border-box;height:29px;padding:0 12px;background:var(--bg-content-primary);border:1px solid var(--border-control);border-radius:var(--radius-badge);font:900 14px/1 var(--font-sans);color:var(--text-main)}
.eka-check{display:inline-flex;align-items:center;gap:18px;font-size:16px;cursor:pointer}
.eka-check input{appearance:none;box-sizing:border-box;margin:0;width:18px;height:18px;background:var(--bg-content-primary);border:1px solid var(--border-control);border-radius:4px;cursor:pointer}
.eka-check input[type=radio]{border-radius:50%}
.eka-check input:hover,.eka-check input.is-hover{border-width:2px}
.eka-check input:checked{background:var(--text-main);box-shadow:inset 0 0 0 3px var(--bg-content-primary)}
.eka-check.is-error input{border:2px solid var(--text-error)}
.eka-field{box-sizing:border-box;display:block;width:100%;height:56px;padding:0 16px;background:var(--bg-content-primary);color:var(--text-main);border:1px solid var(--border-control);border-radius:var(--radius-control);font:400 14px/1.5 var(--font-sans);appearance:none}
.eka-field::placeholder{color:var(--text-muted)}
.eka-field:hover,.eka-field.is-hover,.eka-field:focus{border-width:2px;outline:0}
.eka-field.is-error{border:1px solid var(--text-error)}
textarea.eka-field{height:180px;padding:16px;resize:vertical}
.eka-select{position:relative;display:block}
.eka-select svg{position:absolute;right:20px;top:50%;margin-top:-4px;pointer-events:none}
.eka-error{margin:8px 0 0;color:var(--text-error);font-size:16px;line-height:1.5}
.eka-card{box-sizing:border-box;max-width:636px;padding:32px;background:var(--bg-card);border:2px solid var(--border-control);border-radius:var(--radius-control);text-align:center}
.eka-card h3{margin:0 0 16px;font:700 24px/1.2 var(--font-serif)}
.eka-card p{margin:0 0 24px;font-size:16px;line-height:1.5}
.eka-row{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}
.eka-col{flex:1 1 200px;min-width:0}
.eka-thumb{position:relative;overflow:hidden}
.eka-thumb::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(93,112,84,0) 37%,rgba(93,112,84,.8) 100%)}
.eka-header{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1440px;height:96px;padding:0 64px;color:var(--text-main);background:var(--bg-page)}
.eka-header--overlay{color:#fff;background:linear-gradient(180deg,rgba(93,112,84,.8) 22%,rgba(93,112,84,0) 100%)}
.eka-header__nav{display:flex;align-items:center;gap:24px}
.eka-header__link{display:inline-flex;align-items:center;gap:8px;background:none;border:0;color:inherit;font:700 16px/1.5 var(--font-sans);text-decoration:none;cursor:pointer}
.eka-cart{position:relative;display:inline-flex;margin-left:48px;color:inherit}
.eka-cart__count{position:absolute;top:-8px;right:-10px;min-width:18px;height:18px;padding:0 4px;box-sizing:border-box;border-radius:9px;background:var(--notify-red);color:#fff;font:900 10px/18px var(--font-sans);text-align:center}
.eka-dropdown{width:304px;margin:0;padding:0;list-style:none;background:var(--bg-menu)}
.eka-dropdown a{display:flex;align-items:center;box-sizing:border-box;min-height:56px;padding:8px 48px;color:#fff;font:400 16px/1.5 var(--font-sans);text-decoration:none}
.eka-dropdown a:hover,.eka-dropdown a:focus-visible{text-decoration:underline;outline:0}
.eka-sidemenu{width:232px;margin:0;padding:0;list-style:none}
.eka-sidemenu a{display:flex;align-items:center;height:56px;padding:0 48px;color:#fff;font:400 16px/1.5 var(--font-sans);text-decoration:none}
.eka-sidemenu a[aria-current=page]{background:var(--brand-red)}
.eka-tile{position:relative;display:block;width:320px;height:320px;overflow:hidden;color:#fff;text-decoration:none}
.eka-tile img{width:100%;height:100%;object-fit:cover}
.eka-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(93,112,84,0) 37%,rgba(93,112,84,.8) 100%)}
.eka-tile span{position:absolute;left:0;right:0;bottom:24px;z-index:1;text-align:center;font:700 32px/1.2 var(--font-serif)}
.eka-product{display:block;width:416px;color:var(--text-main);text-decoration:none}
.eka-product img{display:block;width:416px;height:442px;object-fit:cover}
.eka-product__meta{display:flex;align-items:center;gap:16px;margin:16px 0 0 16px;color:var(--text-muted);font-size:16px}
.eka-swatch{box-sizing:border-box;width:32px;height:32px;padding:4px;border:1px solid currentColor}
.eka-swatch i{display:block;width:100%;height:100%;background:currentColor}
.eka-product__price{margin:8px 0 0 16px;font:400 24px/1.2 var(--font-serif)}
.eka-carousel{display:flex;gap:48px;overflow-x:auto;scroll-snap-type:x mandatory}
.eka-carousel>*{flex:none;scroll-snap-align:start}
.eka-carousel-wrap{position:relative}
.eka-carousel__arrow{position:absolute;top:50%;z-index:2;display:inline-flex;width:28px;height:29px;margin-top:-14px;padding:0;border:0;background:none;cursor:pointer}
.eka-carousel__arrow--next{right:16px}
.eka-carousel__arrow--prev{left:16px;transform:scaleX(-1)}
.eka-carousel__arrow:focus-visible{outline:2px solid var(--text-main);outline-offset:2px}
@media (max-width:767px){.eka-carousel__arrow{display:none}}
.eka-footer{box-sizing:border-box;padding:80px 64px 48px;background:var(--bg-footer);color:#fff;font:400 14px/1.5 var(--font-sans)}
.eka-footer a{color:#fff;text-decoration:none}
.eka-footer a:hover{text-decoration:underline}
.eka-footer h4{margin:0 0 12px;font:700 14px/1.5 var(--font-sans)}
.eka-footer__cols{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.eka-footer__legal{display:flex;justify-content:center;gap:24px;margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,.6)}
```

## TypeScript props

```ts
export interface ButtonProps { variant?: "big"|"primary"|"secondary"|"third"|"link"; disabled?: boolean; children: React.ReactNode; onClick?: () => void }
export interface BadgeProps { children: React.ReactNode }
export interface CheckboxProps { label: React.ReactNode; error?: string; checked?: boolean; onChange?: (e: any) => void }
export interface RadioProps { label: React.ReactNode; error?: string; name?: string; checked?: boolean; onChange?: (e: any) => void }
export interface TextFieldProps { placeholder?: string; error?: string; value?: string; onChange?: (e: any) => void }
export interface SelectProps { error?: string; value?: string; children: React.ReactNode; onChange?: (e: any) => void }
export interface TextareaProps { placeholder?: string; error?: string; value?: string; onChange?: (e: any) => void }
export interface CardProps { title: React.ReactNode; children: React.ReactNode }
export interface NavItem { label: string; href?: string; children?: { label: string; href: string }[] }
export interface HeaderProps { variant?: "overlay"|"solid"; items: NavItem[]; cartCount?: number; cartHref: string }
export interface DropdownMenuProps { items: { label: string; href: string }[]; open: boolean; onClose: () => void }
export interface SideMenuProps { items: { label: string; href: string }[]; currentHref?: string }
export interface CartBadgeProps { count: number }
export interface CategoryTileProps { label: string; image: string; href: string }
export interface ProductCardProps { name: string; price: number; currency?: "€"; image: string; color: "red"|"yellow"|"green"|"blue"; href: string }
export interface CarouselProps { label: string; children: React.ReactNode }
export interface FooterProps { onSubscribe?: (email: string) => void }
```
export interface CategoryTileProps { label: string; image: string; href: string }
export interface ProductCardProps { name: string; price: number; currency?: "€"; image: string; color: "red"|"yellow"|"green"|"blue"; href: string }
export interface CarouselProps { label: string; children: React.ReactNode }
export interface FooterProps { onSubscribe?: (email: string) => void }
```

## Update 2026-11-05
- **EKA-H4-italic** (prices): Cormorant Garamond, 32px, italic, 700, line-height 1.2, lining numerals (`font-feature-settings: 'lnum' 1`). Load the 1,700 italic weight.
- **Header**: height 110, padding 0 64px, logo 221×78 (horizontal; white over imagery, green on solid), nav Lato 20/1.5 regular, gap 40, dropdown chevron 16px after "Облекла и аксесоари" and "Комплекти", cart icon 28 with badge #AF5D65.

## Navigation dropdown (added 2026-11-05)
Used in the Header for "Облекла и аксесоари" and "Комплекти". Opens on hover/focus of the menu link.

**Trigger (menu link)**
- Lato 20/1.5 regular, chevron 16px after the label (gap 12px).
- Open state: 1px underline in the link color (white on overlay, #5D7054 on solid); chevron rotates 180°.

**Panel – EKA-Dropdown**
- Width 304px, radius 8px, background rgba(93,112,84,0.8) (#5D7054 at 80%), no border/shadow.
- Position: 16px below the trigger, left aligned to the trigger −16px; z-index above page content.
- Contents: a vertical list of EKA-Submenu-Button, no gap between them.
- "Облекла и аксесоари": Цяло трико · Шорти за практика · Тениска с мандала · Възглавничка за очи (304×224).
- "Комплекти": Мандала Флоу · Елегантен Ритуал (304×112).

**EKA-Submenu-Button**
- Height 56px, full panel width, padding 0 48px, text left-aligned.
- Label: Lato 16 regular, white (#FFFFFF), single line.
- States:
  - Default: transparent background (panel shows through).
  - Hover / focus: background #AF5D65 (brand red), text white.
- Role: menuitem; keyboard focus uses the hover style.

## Description text (2026-11-05)
- Product card description (sets): **Text Large** — Lato Regular 20, line-height 1.5.
- Product page (EKA-Продукт) description: **Text Medium** — Lato Regular 18, line-height 1.5.

## Buttons over images (2026-11-05)
- Primary buttons placed on photos (Main: #brand tiles, Ритуал section) use the **Large** primary button: height 78px, padding 0 32px, radius 8px, #AF5D65, Lato Bold 20 white (line-height 1.5), width hugs the label. The EM banner button keeps its own style.

## Listing card image ratio (2026-11-05)
- Product card images on EKA-Облекла и аксесоари use the same vertical ratio as EKA-Продукт › Други от колекцията: **332 / 396**.
- Wide cards (last row with two cards, span 3 of 6) use **498 / 396**, so both card types in a row have the same image height.

## Product page layout (2026-11-05)
- Page padding 64px left/right (same as EKA-Облекла и аксесоари), full 1440 width.
- Grid 2fr : 1fr (gallery : description), gap 32px; description column is sticky (top 24px).
- Gallery: 4 photos of the selected colour in a 2×2 grid, gap 16px; each photo fills its column width at a fixed height of 533px (object-fit: cover, keeps the photo proportions). Picking a colour swaps all four.
- Buttons "Добавете в количката" and "Купете сега" span the full width of the description column (same width as the description text, max 520px).

## Card descriptions & item colours (2026-11-05)
- Every card description (ProductCard sets, "Още от Екатерина Минкова" cards) uses Text Large — Lato Regular 20/1.5.
- Card swatches follow the product Sheet: Гащеризон за йога – бордо, маслина, синьо (no жълто); Шорти за йога – бордо, маслина, синьо (no жълто, per Viktor 2026-11-05); Тениска с мандала – all four; Възглавничка за очи – all four.

## Product card – mini carousel (updated 2026-11-05)
- Used on EKA-Облекла и аксесоари (`item.gallery`). The gallery is every photo of the card's colour (e.g. the 4 бордо photos of Гащеризон за йога, files `-malina-01…04`). Тениски, шорти и възглавнички use the photos in their files (2–4 per colour).
- Drag or swipe the image left or right. All photos of the colour sit in one track: the image follows the pointer and the neighbouring photos come in from the side, with no gap.
- Release past 30px: the track slides to the next or previous photo with an ease-out curve (240ms, `cubic-bezier(0.22, 1, 0.36, 1)`). Smaller drags snap back.
- Loops: after the last photo comes the first, in both directions.
- Pointer capture keeps the drag alive if the pointer leaves the image. There is no pointer-leave handler, because it caused a blink.
- The colour swatch under the image stays the card's colour.
- Indicator: white 6px dots centred 12px above the image bottom; current dot 100%, others 50% opacity. Cursor "grab".
- A drag over 8px does not open the product; a plain click opens it.
- ProductCard API: `item.gallery = [{ img, alt, swatches }]`; 2 or more entries enable the carousel.
- Listing keeps a `GAL` map of photo lists per product and colour (source: `data/asset-map.json`).


## Size table pop-up – EKA-SizeGuide (2026-11-05)
- Component design/SizeGuide.dc.html, prop `item` = { open, close, rows }. Opened from the Product page button "Таблица с размери".
- Overlay rgba(93,112,84,0.6); panel #F3F0E4, radius 16, padding 40px 56px (mobile 40px 20px), max width 960.
- Title block: "EKA YOGA" (Cormorant 24 bold, letter-spacing .08em) and "Таблица с размери" (Cormorant 44 bold).
- Silhouette 506px tall (mobile 330px), fill #5D7054; measurement lines solid #AF5D65 over the body, dashed #AF5D65 guide on the left only.
- Letter badge (used in the figure and the table): 24px circle, fill #AF5D65, white Lato Bold 12, letter centred.
- Table: Lato 18 (mobile 16), 1px #5D7054 row lines, columns Мярка · S · M · L; scrolls horizontally on mobile.

## Big button label (2026-11-05)
- The Big button (78px) label uses EKA-Large-regular: Lato 20/1.5, weight 400, white.

## Carousels on the First page (2026-11-05)
- Rows scroll with the arrow, a mouse drag (cursor grab/grabbing) or native touch swipe. A drag never triggers a tile link.

## EM banner – EKA_EM-Banner component (2026-11-07)
- Shared component design/EMBanner.dc.html, used on EKA-First page, EKA-theProduct and EKA-theSet.
- Card 1120 × 464, radius 16, padding 0 64px, centred; section bottom padding 120px; photo public/images/banner/ekaterina-minkova-banner.webp (object-position center 35%), overlay linear-gradient(90deg, #000 0%, transparent 67%) at 80%.
- Title "Екатерина Минкова" uses **EKA-H banner** (`h-banner`: Cormorant Garamond 64 / 1.2, bold), white.
- Subtitle "Йога преподавател и аюрведа терапевт" uses **EKA-text banner** (`text-banner`: Lato 24 / 1.5, regular), white, 8px under the title.
- Button: primary 56px, 56px below the subtitle, "**Към** ekaterinaminkova.com" (Към bold, the domain regular).

## Mobile typography (below 768px, 2026-11-08)
| Style | Desktop | Mobile |
|---|---|---|
| Section title — H2 mobile (Cormorant Garamond bold) | 56 / 1.2 | **40** / 1.2, padding 48px 0 24px |
| EKA-H banner | 64 | 40 / 1.1 |
| Card / item title (H4) | 32 | 28 |
| Product page title | 40 | 32 |
| Quote (Cormorant italic) | 40 | 28 / 1.3 |
| Body — Text Large (Lato regular) | 18–20 / 1.5 | **18** / 1.5 |
| EKA-text banner | 24 | 20 bold |
| Small / links | 16 | 14 |
Side padding 16px; first EKA-Brand mobile screen applies this scale.

## Checkbox – EKA-Checkbox (2026-11-08)
Square checkbox used in filters (desktop filter drawer lists and the mobile filter "Категория" list).
| State | Look |
|---|---|
| Default | 18×18, radius 4, fill `bg-page` #F3F0E4, 1px border `text-main` #5D7054 |
| Selected | same frame, inner square #5D7054 inset 2px (14×14, radius 2) — CSS: `background:#5D7054; box-shadow: inset 0 0 0 2px #F3F0E4` |
- Label: Lato 18 regular on mobile (16 on desktop), 12px gap from the box; selected label bold.
- In the mobile category list the selected row also gets a 1px `brand-red` #AF5D65 line under it, full width.
- Focus: 2px solid #5D7054 ring, 2px offset. Hover (desktop): border 2px.
- Source: Checkbox.svg (Default and Selected).

## Update 2026-11-08 — mobile scale (supersedes the "Mobile typography" table above where they differ)
| Style | Desktop | Mobile (<768px) |
|---|---|---|
| Section title (H2, Cormorant bold) | 56 / 1.2, padding 80px 0 | **40** / 1.2, padding 48px 0 24px |
| Card title (H4, Cormorant bold) | 32 / 1.2 | **24** / 1.2 |
| Card description — Text Medium (Lato regular) | 20 / 1.5 | **16** / 1.5 |
| Card price (Cormorant 32 italic bold, lining nums) | 32 | 24 |
| Product / Set page title and price | 40 | **32** |
| Quote — H3 mobile (Cormorant Garamond **italic**) | 40 / 1.3 | **32** / 1.3 |
| EKA-H banner | 64 / 1.2 | 40 / 1.1 |
| EKA-text banner | 24 regular | 20 bold |
| Body — Text Large | 18–20 / 1.5 | 18 / 1.5 |
- Side padding 16px on all mobile pages. Hero on Main and Brand: 533px tall.
- Product card image ratio **3:4** everywhere (set cards keep 616:398). Card text is left-aligned, padding 16px 8px 0 (title) / 8px 8px 0 (description).
- Product and Set colour/size buttons on mobile: 52×52, gap 16, left-aligned.
- Buttons in mobile content (Thank-you "Продължи с пазаруването", banner CTA) fill the width.

## PreFooter — EKA_Pre-Footer component (2026-11-08)
Shared block placed directly above the Footer on **every** page (Main, Brand, Collection, Product, Sets, Set, Cart, Checkout, ThankYou). Source: design/PreFooter.dc.html.
1. **Quote** `.pf-quote`: „Йога дрехи и аксесоари в подкрепа на твоята практика с красиво и запомнящо се присъствие.“ + caption "— ЕКАТЕРИНА МИНКОВА —" (Lato 14 bold, 0.08em). Desktop: Cormorant italic 40/1.3, max-width 860, padding 160px 64px 120px. Mobile: H3 mobile 32/1.3, padding 72px 16px 56px.
2. **"Още от Екатерина Минкова"** `.pf-more`: section title + 3 cards linking to ekaterinaminkova.com — Айенгар йога ("Групови и индивидуални класове"), Терапевтични масажи (list of massages), Събития ("Регулярни йога ритрийти…"). Desktop: 3 columns, gap 16, image 416:400, padding 0 64px 120px. Mobile: 1 column, gap 48, image 3:4, 16px side padding, bottom 64px. Cards use the ProductCard text styles (left-aligned title H4 + description).
3. **EM banner** (EMBanner component).

## EM banner — mobile (2026-11-08)
- Card 494px tall, padding 32px 16px 24px, content stretched; gradient runs top→bottom (rgba(0,0,0,.85) → transparent at 55%).
- Photo `object-position: 46% 35%` on mobile (subject shifted right of the text).
- CTA fills the width (16px from each card edge), 56px tall, pinned to the bottom.

## Order table — Thank-you page (2026-11-08)
- Columns: Артикул · Цена · Брой · Сума ("Количество" → "Брой", "Междинна сума" → "Сума").
- Mobile: no horizontal scroll. Артикул fills the remaining width; Цена/Брой/Сума hug their content, no wrap, right-aligned. Thumbnail 44×52, title Cormorant 18 (wraps to two lines), variant 12, numbers 18, headers 12.

## Section spacing (2026-11-08)
- Main › "EKA комплекти": bottom padding 64px on desktop and mobile.

## Section titles — synced desktop/mobile (2026-11-08, 16:08)
Section title H2 (Cormorant Garamond bold, normal style): line-height **1**, letter-spacing **-0.02em** (-1.12px at 56). Desktop 56px, mobile 40px (-0.8px). Applies to every section title on every page.

## Type scale v4 — FINAL (2026-11-08, supersedes every earlier type table in this file)
Source of truth: `design/ds/tokens.json`. Headings Cormorant Garamond, line-height **1**; H1 letter-spacing -0.02em. Text Lato, line-height 1.5.
| Style | Desktop | Mobile (<768px) |
|---|---|---|
| H1 (section titles) | 56 | 48 |
| H2 | 48 | 40 |
| H3 | 40 | 32 |
| H4 (card title) | 32 | 24 |
| H5 | 24 | 20 |
| H6 | 20 | 18 |
| Text Large | 20 | 18 |
| Text Medium | 18 | 16 |
| Text Regular | 16 | 14 |
| Text Small | 14 | 12 |
Each heading has Bold (700) and Italic (400 italic) variants; each text size has Black/Bold/Regular. On the canvas this is enforced by the "EKA type v4" block at the end of Header's CSS.

## Page background (2026-11-08)
`bg-page` = **#F3F0E4** everywhere (source of truth). #FCFAF7 is retired.

## Minimum width (2026-11-08)
Mobile design reference is 390px; the build must support down to **320px** (no horizontal scroll, 16px side padding kept).
Check widths: 320, 390 (mobile reference), 768 (tablet – desktop layout must fit, no horizontal scroll), 1440 (desktop reference).

## Update 2026-11-10 — Motion

Implemented on the live site; implementation details in `SITE.md` › Animations. All motion is off with `prefers-reduced-motion` (everything simply visible), and without JS nothing is hidden.

| Token | Value | Used for |
|---|---|---|
| `motion-reveal` | 500 ms, opacity `linear`; rise `cubic-bezier(0.2, 0, 0, 1)` | Entrance of every element |
| `motion-reveal-rise` | 24 px | Titles rise from below while fading in |
| `motion-stagger` | 120 ms | Grid / carousel items, left → right |
| `motion-nav` | 200 ms, `linear` | Navbar fade out (scroll down) / in (scroll up) |
| `motion-drawer` | 300 ms, ease-out `cubic-bezier(0, 0, 0.2, 1)` | Cart drawer panel + backdrop, in and out |
| `motion-drawer-steps` | 500 ms each; start 150 ms; gaps 60, 90, 120 … ms | Cart drawer content sequence |
| `overlap-drift` | 30 % of scroll speed | Covered section while it is overlapped |
| `overlap-blur` | 0 → 12 px | Covered section while it is overlapped |

**Entrance on scroll** (every page) — elements appear one by one as they scroll into view (15 % visible), never all at load. Titles fade + rise; images and text blocks fade; grids reveal left → right; long grids (Collection, Sets) row by row.

**Navbar on scroll** (every page) — at the top always visible. Scrolling down fades it out, scrolling up fades it back in. Overlay header (Home, Brand): desktop keeps the gradient; ≤984 px it turns solid brand-green once scrolled. Solid header keeps `bg/page`.

**Scroll overlap** (Home and Brand only) — the next section slides over the previous one, which keeps moving up slowly and blurs. The overlapping section and everything after it are filled with `bg/content-primary` (#F3F0E4) — no gap, no shadow, nothing showing through.
- Home: "Пазарувай по цвят" over "Завърши практиката с красив ритуал"; PreFooter quote over "EKA комплекти".
- Brand: "Какви материи използваме?" over "За кого са създадени тези облекла?"; PreFooter quote over the eye-pillows photo.

**Cart drawer "Моята количка"** — panel slides in from right to left + fades in, fast at the beginning and slower at the end. Content fades in top → bottom (header, products, total) with growing gaps — the top items follow each other quickly, the last ones more slowly — then "Продължи да пазаруваш", then "Купи сега". Closing slides it out to the right + fades out.
