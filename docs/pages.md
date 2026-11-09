# Page specs (desktop, 1440 px)

All measurements are from the approved canvas (updated 4 Nov 2026, 18:50).

**Global rules:** every section title uses the H1 style – Serif Bold 56, line height 1.2 – with exactly **80 px padding above and below** (no extra section padding on top). Body/paragraph copy is **Lato Regular 18 / 1.5** (`text-medium-regular`); UI labels, buttons, tabs and footer stay at their component sizes. Fonts: **Serif** = Cormorant Garamond, **Sans** = Lato. Colours by design-system token name.

## Shared

### Header
- Padding 20 px 64 px, logo `logos/eka-logo-slogan-*.svg` 56 px tall, nav (Sans 16 Bold, 40 px gap): За бранда · Облекла и аксесоари ▾ · Комплекти ▾ · cart icon with `brand-red` count badge.
- **Home variant:** absolutely positioned over the hero, white logo and text, background `scrim-header` = `linear-gradient(180deg, rgba(93,112,84,.8) 22%, rgba(93,112,84,0) 100%)`.
- **Inner variant (Listing, Product):** green logo/text, 1 px bottom border `#E3E7DC`.

### Footer (`design/Footer.dc.html` – build exactly from this file)
`#5D7054` background, padding 96/64/80. Stacked white logo (160 px wide), Instagram + Facebook 40 px icons (40 px gap), 4-column grid (max 1312 px): Към Екатерина Минкова (bold links: За мен, Айенгар йога, Терапевтични масажи, Събития, Подаръци за теб) · Облекла и аксесоари + Комплекти · Обща информация + Контакти (+359 89 98 26 503, shop@ekaterinaminkova.com, 24 px icons) · Newsletter ("Остани в крак с новите продукти", input "Вашият е-майл" 56 px, primary "Изпрати", centred consent text). White 1 px divider, legal row, "by: victormov".

### ProductCard (`design/ProductCard.dc.html`)
Order: picture → colour swatches (only if the product has colours) → title (Serif Bold 32) → description (Sans 16, sets only) → price (Serif Bold 28, lining numerals). 8 px side inset; gaps 14 / 16 / 8 / 20 px. Picture ratio 332:396 for items, 616:398 (home) / 616:414 (product page) for sets. Square corners. Whole picture and title link to the product. Clicking a swatch swaps the photo to that colour.

### Carousel
Fixed 500 × 500 tiles, 16 px gap, row starts 16 px from the left edge, horizontal scroll with hidden scrollbar. Next arrow = `arrow_carousel` 40 × 80 (white 80 % rect, green arrow), on the right edge, vertically centred on the tiles; click scrolls two tiles (1032 px).

### Banner – Екатерина Минкова
Card 1280 × 464, radius 16, padding 64, photo `banner/ekaterina-minkova-banner.webp` (object-position center 35 %), overlay `linear-gradient(90deg, #000 0%, transparent 67%)` at 80 % opacity. White text: Serif Bold 48 "Екатерина Минкова - йога преподавател", Sans 16 "С 15 години опит в предлагането на Айенгар йога и терапии", primary button "Към ekaterinaminkova.com" 40 px below. Links to ekaterinaminkova.com.

## Home `/`
1. **Hero** 960 px tall, photo `header/hero-home.webp`, 20 % black overlay. The headline block ("EKA YOGA – бутикова колекция", subline, button) is currently **hidden** in the design – keep it in the markup but `display: none` until the designer re-enables it.
2. **Приложения carousel** (16 px below hero): 6 category tiles 500 × 500 with `thumb-gradient`, white Serif 40/600 label centred 60 px from the bottom: Йога, Пилатес, Фитнес, Танци, Стречинг, Джогинг (`activities/*`). Link → Listing.
3. **#brand** full width, title "Мека материя, която те обгръща" (H1 style), two tiles side by side, no gap, 822 px tall: Гащеризон за йога (`jumpsuit/…malina-01`) and Шорти за йога (`shorts/…zeleni-02`). Top scrim `linear-gradient(0deg, transparent 63%, rgba(93,112,84,.8) 100%)`; white Serif Bold 48 title centred 40 px from top; primary button centred 40 px from bottom ("Вижте гащеризона – € 98", "Вижте шортите – € 49" – prices from data).
4. **Тениска с мандала от 100% органичен памук** – centred H1-style title, carousel of 6 plain 500 × 500 photos (no gradient/text) in this order: yellow_01, pink_03, green_01, blue_01, pink_01, yellow_03.
5. **Ритуал** (4 px below): full-width 917 px block, `eye-pillows/…pink-02` (will become a video), 20 % black overlay, Serif Bold 56 white "Завършете практиката с красив ритуал" at top, primary "Възглавнички за очи – € 36" at bottom, 40 px padding.
6. **Пазарувайте по цвят**: title, colour switcher (Бордо, Маслина, Синьо – square swatches, 24 px gap), 4 ProductCards in a 4-column grid, 16 px gap, order: Гащеризон, Шорти, Тениска (photo of the chosen colour), Възглавничка (always `pink-02` with a бордо swatch).
7. **EKA комплекти**: 2 set cards, 16 px gap: Мандала Флоу (€119, "Тениска с мандала, шорти за йога и възглавничка за очи"), Елегантен ритуал (€123, "Гащеризон за йога и възглавничка за очи", photo `sets/eka-yoga-set-elegant-ritual-yellow.webp` everywhere).
8. Banner, Footer.

## Listing `/oblekla-i-aksesoari`
- Breadcrumb "EKA Yoga › Облекла и аксесоари", centred H1 (80 px above/below).
- Row: tabs (Sans 16 Bold, 2 px `brand-red` underline on the active one): Всички, Гащеризони, Тениски, Шорти, Възглавнички за очи · right: "Филтри" button with icon and active-filter count.
- Grid **3 columns**, 16 px column gap, 48 px row gap, 14 cards. **Each card shows one colour only** – a single selected swatch that matches its photo:
  - Row 1: Гащеризон бордо (`malina-01`), маслина (`zelen-04`), синьо (`sin-02`)
  - Row 2: Тениска бордо (`pink_01`), жълто (`yellow_03`), маслина (`green_01`)
  - Row 3: Тениска синьо (`blue_01`), Шорти бордо (`malina-01`), Шорти маслина (`zeleni-04`)
  - Row 4: Шорти синьо (`short-01-blue`), Възглавничка бордо (`pink-02`), Възглавничка жълто (`yellow-01`)
  - Row 5 (two wide cards, 1.5 columns each): Възглавничка маслина (`green-02`), Възглавничка синьо (`blue-01`)
  - Photo ratio 427:375 (normal) / 648:375 (wide). When a filter leaves 2 cards in the last row, those two become wide.
- **Card carousel**: dragging a card photo shows the other photos of that colour (see DS 'Product card – mini carousel').
- **Filter drawer**: 400 px panel from the right over a 30 % black backdrop, `#F3F0E4`, 1 px left border. Title "Филтри" Serif Bold 40 + close (×). Sections "Цвят" (Бордо, Маслина, Синьо, Жълто with 16 px square swatches) and "Размер" (S, M, L, Един размер) as design-system checkboxes in 2 columns. Third-style button "Изчистете филтрите", primary full-width "Покажи N продукта" (live count, closes the drawer). Filtering is live; the colour filter matches each card's colour (pillows included).

## Product `/produkt/gashterizon-za-yoga`
- Breadcrumb EKA Yoga › Облекла и аксесоари › product.
- Page padding 64 px; grid 2fr / 1fr with 32 px gap. Gallery: 2 × 2 grid of the colour's photos, each 533 px tall, `object-fit: cover`, 16 px gaps. Colour change swaps the set of photos.
- Info column: H1 Serif Bold 40, price Serif Bold 40 (lining), "Цвят: <name>" + swatches, "Размер" toggles (44 px, radius 4, Sans Black 14, selected = filled `#5D7054`), "Таблица с размери" link, "Количество" stepper (200 × 48), primary "Добавете в количката" (updates cart badge), secondary "Купете сега" (2 px outline), 2 description paragraphs, third-style "Покажете повече" toggling extra text (placeholder until the client sends copy).
- **Други от колекцията** (H1-style title): 3 ProductCards (Шорти, Тениска, Възглавничка), 16 px gap.
- **EKA комплекти** (H1-style title): 2 set cards, 16 px gap, Елегантен ритуал uses the yellow set photo.
- Quote (Serif italic 40): „Йога дрехи и аксесоари в подкрепа на Вашата практика с красиво и запомнящо се присъствие.“ — ЕКАТЕРИНА МИНКОВА —
- **Още от Екатерина Минкова** (H1-style title): 3 cards, photo 416:400 with **square corners**, Serif Bold 32 title, Sans 18 text, centred, → ekaterinaminkova.com:
  - Айенгар йога – `more/iyengar-yoga.webp` – "Айенгар йога е специфичен стил, наблягащ на правилното изпълнение на асаните."
  - Терапевтични масажи – `more/therapeutic-massage.webp` – "Аюрведа йога масаж, Аюрведа марма терапия, Терапия за женската гръд, Тай масаж, Рефлексологичен масаж на ходилата"
  - Събития – `more/events.webp` – "Регулярни йога ритрийти в България, Европа и целия свят, както и Айенгар йога семинари в София и страната." (the canvas has the typo "ритрйти" – use the corrected word)
- Banner, Footer.

## Update 2026-11-05
- New shared component design/Header.dc.html (variant "overlay" on Main, "solid" on Listing/Product; logo links to Main; menu Lato 20 with dropdown chevrons for "Облекла и аксесоари" and "Комплекти").
- design/Main.dc.html added: plural product names and no prices (ProductCard item.hidePrice).
- Titles use the "ти" form. Footer uses the DS vertical white logo.
- Prices (ProductCard + Product page): EKA-H4-italic — Cormorant Garamond 32px italic bold, lining nums; on Product page 4px under the title.
- Header dropdowns (2026-11-05): see "Navigation dropdown" in docs/EKA-YOGA_DesignSystem.md; Header prop `open` (none|cloth|sets) shows a menu opened for design review.

## Main – Viktor's manual edits (2026-11-05)
- "Пазарувай по цвят": max-width 1440px, side padding 16px (cards use the full width), bottom padding 65px.
- "EKA комплекти": max-width 1440px, side padding 16px, bottom padding 200px (canvas width 1395px).
- EM banner "Екатерина Минкова – йога преподавател": 1130 × 400px (was 1280 × 464), radius 16, centered; section bottom margin 120px.
- Large buttons (78px) on #brand tiles and Ритуал; EM banner button stays 56px.
- "Шорти за йога" tile photo: eka-yoga-shorti-zeleni-01.webp.

## Комплекти (design/Sets.dc.html, 2026-11-05)
- Same as Listing: breadcrumb "EKA Yoga › Комплекти", centred H1 "Комплекти" (80 px above/below), tabs Всички · Мандала Флоу · Елегантен ритуал, "Филтри" button and drawer with the colour filter only (sets have no sizes, so the Размер section is removed).
- Grid **2 columns**, 16 px column gap, 48 px row gap, 8 cards, one colour per card (single selected swatch).
  - Row 1: Мандала Флоу бордо (`set-mandala-flow-pink`), жълто (`-yellow`)
  - Row 2: Мандала Флоу маслина (`-green`), синьо (`-blue`)
  - Row 3: Елегантен ритуал бордо (`set-elegant-ritual-pink`), жълто (`-yellow`)
  - Row 4: Елегантен ритуал маслина (`-green`), синьо (`-blue`)
- Set card: photo ratio 616:398, title Serif Bold 32, description Text Large (Мандала Флоу: "Тениска с мандала, шорти за йога и възглавничка за очи"; Елегантен ритуал: "Гащеризон за йога и възглавничка за очи"), price EKA-H4-italic (€119 / €123).
- Card drag shows the other photos of the same set in the colour order above (see DS 'Product card – mini carousel').

## Комплекти `/komplekti` (design/Sets.dc.html, added 2026-11-05)
- Breadcrumb "EKA Yoga › Комплекти", centred H1 "Комплекти" (80 px above/below), Header solid, Footer.
- Tabs: Всички, Мандала Флоу, Елегантен ритуал (same tab style as Listing). Filter button with active count.
- Grid **2 columns**, 16 px column gap, 48 px row gap. 8 cards in this order: Мандала Флоу (бордо, жълто, маслина, синьо), then Елегантен ритуал (бордо, жълто, маслина, синьо).
- ProductCard: photo ratio **616:398**, one selected swatch, title (Serif Bold 32), description under the title (Lato 20, Text Large), price (EKA-H4-italic 32, €119 / €123). No carousel, one photo per colour.
- Filter drawer: "Цвят" only (Размер removed). Button "Покажи N комплекта".
- Set cards link to design/Set.dc.html?set=mf or ?set=er (the set page).

## Комплект (design/Set.dc.html, added 2026-11-05)
- Opened from a set card. The set is chosen by the ?set= query (mf = Мандала Флоу, er = Елегантен ритуал; default mf).
- Breadcrumb EKA Yoga › Комплекти › {set name}. Gallery: one large photo, ratio 616:398, full width of the 2fr column.
- Title, price (EKA-H4-italic), colour swatches (бордо, жълто, маслина, синьо), quantity, buttons. No size selector.
- Description: the set's line, then a placeholder until the copy arrives.
- Sections in this order: EKA комплекти (both sets, ProductCard 616:398 with description), then Други от колекцията (3 cards), then the quote, the banner and the footer.

## EM banner size (2026-11-05)
- Same on every page that has the banner (EKA-First, EKA-Продукт, Комплект): outer section 1133 × 398 px, inner card 1130 × 400 px, radius 16, padding 64, button 56 px. Set on EKA-First by Viktor; applied on the canvas to Product and Set.


## Update 2026-11-05 (evening) — supersedes older notes above where they conflict
- **File names** now match the canvas: Listing.dc.html → **Collection.dc.html** (EKA-Collection), Listing-0m08 / Sets → **Sets.dc.html** (EKA-sets). Main, Product, Set keep their names. Use these names in all links.
- **Side padding:** 64px on every page so content lines up with the logo and the cart. EKA-First page content only: 16px. Header: 64px on every page.
- **Header:** dropdowns and chevrons hidden for now. "Комплекти" → Sets.dc.html, "Облекла и аксесоари" → Collection.dc.html.
- **Footer:** "Комплекти" heading links to Sets; set links go to Set.dc.html?set=mf / er; product links go to Collection.
- **EKA-First page**
  - Приложения carousel: tiles are not links; drag with the mouse or use the arrow.
  - #brand: full screen width, no side padding; whole tile clickable (Гащеризони → Product, Шорти → Collection).
  - Тениски carousel: draggable; a drag does not open the tile link.
  - Ритуал: whole image clickable → Collection.
  - Big button labels: "Пазарувай гащеризони", "Пазарувай шорти", "Пазарувай възглавнички за очи"; font EKA-Large-regular (Lato 20/1.5, 400).
  - "Пазарувай по цвят" and "EKA комплекти": full width, 16px side padding.
  - EKA комплекти thumbs → Sets page.
- **Sets:** card → Set.dc.html?set=…&color=… (the Set page opens in the clicked colour).
- **Set:** breadcrumb "Комплекти" → Sets; EKA комплекти thumbs → Sets; reads ?color= for the initial colour.
- **Product:** "Таблица с размери" is a button that opens the SizeGuide pop-up; EKA комплекти thumbs → Sets.
- **SizeGuide pop-up** (design/SizeGuide.dc.html): see docs/current-state.md "SizeGuide pop-up".
- **Preview:** every page artboard is "fill" (full screen) and interactive.

## Update 2026-11-08 — supersedes older notes where they conflict
- New pages: Brand (`/za-eka-yoga`), Cart, Checkout, ThankYou. Mobile artboards exist for every page.
- Every page ends with PreFooter (quote, "Още от Екатерина Минкова", EM banner) and then Footer. Per-page copies of these blocks are retired.
- Main: "EKA комплекти" bottom padding 64px.
- ThankYou: centred confirmation (check icon, H1 "Благодаря ти за поръчката, {name}", text, "– Екатерина", order number), order table Артикул · Цена · Брой · Сума, Доставка "Начислява се от куриера", Общо, big button "Продължи с пазаруването" (full width on mobile).
- Mobile specifics: see design system › "Update 2026-11-08", "PreFooter", "EM banner — mobile", "Order table".
