// Cart page (/kolichka): full-page view of the same cart the drawer shows.
// Data: js/checkout.js (lines) + js/cart-drawer.js helpers (names, prices, images).
import { getCart, onChange, updateQuantity, remove } from "./checkout.js";
import { loadMeta, imageFor, variantLabel } from "./cart-drawer.js";

const list = document.querySelector("[data-list]");
const empty = document.querySelector("[data-empty]");
const total = document.querySelector("[data-total]");
const pay = document.querySelector("[data-pay]");

// Link each line back to its product / set page.
const COLOR_PARAM = { bordo: "red", maslina: "green", sinyo: "blue", zhalto: "yellow" };
const SETS = ["mandala-flow", "elegant-ritual"];
const hrefFor = (l) => {
  const c = COLOR_PARAM[l.color] ? `&c=${COLOR_PARAM[l.color]}` : "";
  return SETS.includes(l.productId) ? `komplekt.html?s=${l.productId}${c}` : `produkt.html?p=${l.productId}${c}`;
};
const ICON_MINUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16"/></svg>';
const ICON_PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16M12 4v16"/></svg>';
const ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';

const META = await loadMeta();

function render() {
  const { lines } = getCart();
  empty.hidden = lines.length > 0;
  pay.setAttribute("aria-disabled", lines.length === 0);
  total.textContent = String(lines.reduce((s, l) => s + (META[l.productId]?.price ?? 0) * l.quantity, 0));
  list.innerHTML = "";
  lines.forEach((line) => {
    const meta = META[line.productId];
    if (!meta) return;
    const variant = variantLabel(meta, line.color, line.size);
    const li = document.createElement("li");
    li.className = "ct-row";
    li.innerHTML = `
      <img class="ct-img" src="${imageFor(line.productId, line.color)}" alt="${meta.name}${variant ? ", " + variant : ""}" />
      <div><h2 class="ct-name"><a href="${hrefFor(line)}">${meta.name}</a></h2><p class="ct-var">${variant}</p></div>
      <div class="ct-step" role="group" aria-label="Количество">
        <button type="button" aria-label="Намали количеството" data-dec>${ICON_MINUS}</button>
        <span aria-live="polite">${line.quantity}</span>
        <button type="button" aria-label="Увеличи количеството" data-inc>${ICON_PLUS}</button>
      </div>
      <span class="ct-price">€ ${meta.price * line.quantity}</span>
      <button type="button" class="ct-remove" aria-label="Премахни ${meta.name}" data-remove>${ICON_X}</button>`;
    li.querySelector("[data-dec]").addEventListener("click", () => updateQuantity(line, line.quantity - 1));
    li.querySelector("[data-inc]").addEventListener("click", () => updateQuantity(line, line.quantity + 1));
    li.querySelector("[data-remove]").addEventListener("click", () => remove(line));
    list.appendChild(li);
  });
}
render();
onChange(render);
