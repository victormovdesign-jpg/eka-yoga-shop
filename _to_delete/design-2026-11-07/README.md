# Design source files

Exported from the Claude Design canvas (https://claude.ai/artifact/2aLqSQkHBhWDYg2fkZbWGq) on 4 Nov 2026.

- `Collection.dc.html`, `Product.dc.html`, `Sets.dc.html` – full pages
- `ProductCard.dc.html`, `Footer.dc.html` – shared components
- The Home page is specified in `../docs/pages.md` (it was edited heavily in the canvas; open the canvas link for the exact visual).

These are Design Component files: HTML markup with inline styles plus a small `class Component extends DCLogic` script. They are **reference, not production code** – read the markup for exact sizes, colours and copy, and the script for the interaction logic (swatches, filters, gallery, cart count), then rebuild them as real components.

- `{{ name }}` = a value computed in `renderVals()`
- `<sc-for list=… as=…>` = loop, `<sc-if value=…>` = conditional, `<dc-import name="X">` = child component `X.dc.html`
- `/_blob/<id>` image URLs → local files via `../data/asset-map.json`
