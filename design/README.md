# design/ — exported canvas (2026-11-08, 16:30)

Exact copies of the Claude Design canvas files, so Claude Code can build without opening the canvas.
Live canvas: https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq. If the canvas and these files disagree, the canvas wins. Ask Viktor for a fresh export.

## Files
| Group | Files |
|---|---|
| Pages (desktop 1440) | Main, Brand, Collection, Product, Sets, Set, Cart, Checkout, ThankYou |
| Mobile wrappers (390) | Mobile-<Page>.dc.html — each only imports its page inside a 390px container. Mobile CSS lives in the pages and in Header. |
| Components | Header (also holds the shared mobile CSS and the "type v4" heading rules), Footer, PreFooter, EMBanner, ProductCard, CartDrawer, SizeGuide |
| Tokens | ds/tokens.json — design-system tokens v4 (colours, heading + text scales desktop/mobile, radius) |

Every page: Header → content → PreFooter → Footer.

## Cleaned on export
- The hidden retired blocks (`data-retired`) on Product, Set and Brand were removed.
- The stray absolute URL in Footer ("доставка") was replaced with `#`.
- Unused leftover values were removed from ProductCard's script.

## How to read a .dc.html file
- `<helmet>`: the page's `<head>` styles. The `@media (max-width:767px)` blocks are the mobile design.
- `{{ x }}`: a value from `renderVals()` in the script at the bottom. `sc-for` loops, `sc-if` shows content conditionally, `dc-import name="X"` embeds component X.
- `/_blob/<id>` image paths map to files in `../shop-webP` through `../data/asset-map.json`.
- Treat these as specs. Rebuild them as real components; do not ship the `.dc.html` syntax.
