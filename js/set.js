// Set page template: komplekt.html?s=<slug>&c=<colour>
// slug = mandala-flow | elegant-ritual (ids in data/products.json); colour = red | yellow | green | blue.
import { GALLERY } from "./collection-data.js";
import { add } from "./checkout.js";

const COLORS = {
  red: { label: "Бордо", hex: "#AE2958", key: "bordo", file: "pink" },
  yellow: { label: "Жълто", hex: "#D7B955", key: "zhalto", file: "yellow" },
  green: { label: "Маслина", hex: "#819886", key: "maslina", file: "green" },
  blue: { label: "Синьо", hex: "#518398", key: "sinyo", file: "blue" },
};
const ORDER = ["red", "yellow", "green", "blue"];
const SETS = {
  "mandala-flow": { name: "Мандала Флоу", price: 119, desc: "Тениска с мандала, шорти за йога и възглавничка за очи", card: "blue" },
  "elegant-ritual": { name: "Елегантен ритуал", price: 123, desc: "Гащеризон за йога и възглавничка за очи", card: "yellow" },
};
const PRODUCTS = {
  shorti: { gal: "sh", name: "Шорти за йога", price: 49, colors: ["red", "green", "blue"], sel: "red" },
  teniska: { gal: "ts", name: "Тениска с мандала", price: 45, colors: ["red", "yellow", "green", "blue"], sel: "blue" },
  vazglavnichka: { gal: "pil", name: "Възглавничка за очи", price: 36, colors: ["red", "green", "blue", "yellow"], sel: "green" },
};

const $ = (s) => document.querySelector(s);
// Always open a product at its top section, never at a remembered scroll position
// (reload, back/forward, or arriving from a card further down another page).
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const toTop = () => window.scrollTo(0, 0);
toTop();
window.addEventListener("pageshow", toTop);

const qs = new URLSearchParams(location.search);
const slug = SETS[qs.get("s")] ? qs.get("s") : "mandala-flow";
const S = SETS[slug];
const state = { color: COLORS[qs.get("c")] ? qs.get("c") : "red", qty: 1 };
const img = (s, c) => `images/sets/eka-yoga-set-${s}-${COLORS[c].file}.webp`;
const setHref = (s, c) => `komplekt.html?s=${s}&c=${c}`;
const productHref = (s, c) => `produkt.html?p=${s}&c=${c}`;

document.title = `${S.name} – EKA YOGA`;
$("[data-crumb]").textContent = S.name;
$("[data-name]").textContent = S.name;
$("[data-price]").textContent = `€ ${S.price}`;
$("[data-desc]").textContent = S.desc;

function render() {
  const c = COLORS[state.color];
  $("[data-img]").src = img(slug, state.color);
  $("[data-img]").alt = `${S.name}, цвят ${c.label.toLowerCase()}`;
  $("[data-color-name]").textContent = c.label;
  $("[data-swatches]").innerHTML = ORDER.map((k) => {
    const on = k === state.color;
    return `<button type="button" class="pc__swatch${on ? " is-on" : ""}" aria-label="${COLORS[k].label}" aria-pressed="${on}" data-color="${k}" style="--swatch-color:${COLORS[k].hex}"><span></span></button>`;
  }).join("");
  $("[data-qty]").textContent = state.qty;
}
$("[data-swatches]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-color]");
  if (!b) return;
  state.color = b.dataset.color;
  history.replaceState(null, "", setHref(slug, state.color));
  render();
});
$("[data-dec]").addEventListener("click", () => { state.qty = Math.max(1, state.qty - 1); render(); });
$("[data-inc]").addEventListener("click", () => { state.qty += 1; render(); });

const addToCart = () => add({ productId: slug, color: COLORS[state.color].key, quantity: state.qty });
const addBtn = $("[data-add]");
addBtn.addEventListener("click", () => {
  addToCart();
  addBtn.textContent = "Добавено в количката";
  setTimeout(() => { addBtn.textContent = "Добави в количката"; }, 2000);
});
$("[data-buy]").addEventListener("click", () => { addToCart(); window.dispatchEvent(new CustomEvent("eka:cart-open")); });

// EKA комплекти: both sets, fixed card colours from the canvas.
$("[data-sets]").innerHTML = Object.entries(SETS).map(([s, p]) => {
  const c = COLORS[p.card], href = setHref(s, p.card);
  return `<article class="pc" data-variant="set">
    <a class="pc__link" href="${href}"><img class="pc__img" src="${img(s, p.card)}" alt="${p.name}, цвят ${c.label.toLowerCase()}" style="aspect-ratio: 616 / 398" loading="lazy" /></a>
    <div class="pc__swatches" role="group" aria-label="Цвят"><span class="pc__swatch is-on" role="img" aria-label="${c.label}" style="--swatch-color:${c.hex}"><span></span></span></div>
    <h3 class="pc__name"><a href="${href}">${p.name}</a></h3>
    <p class="pc__desc">${p.desc}</p>
    <p class="pc__price lining-nums">€ ${p.price}</p>
  </article>`;
}).join("");

// Други от колекцията: swatches swap the photo + link.
$("[data-others]").innerHTML = Object.entries(PRODUCTS).map(([s, p]) => `<article class="pc" data-variant="item">
    <a class="pc__link" href="${productHref(s, p.sel)}" data-link><img class="pc__img" src="${GALLERY[p.gal][p.sel][0]}" alt="${p.name}, цвят ${COLORS[p.sel].label.toLowerCase()}" style="aspect-ratio: 3 / 4" loading="lazy" data-main-image /></a>
    <div class="pc__swatches" role="group" aria-label="Цвят">${p.colors.map((c) =>
      `<button type="button" class="pc__swatch${c === p.sel ? " is-on" : ""}" aria-label="${COLORS[c].label}" aria-pressed="${c === p.sel}" data-other="${s}" data-oc="${c}" style="--swatch-color:${COLORS[c].hex}"><span></span></button>`).join("")}</div>
    <h3 class="pc__name"><a href="${productHref(s, p.sel)}" data-link>${p.name}</a></h3>
    <p class="pc__price lining-nums">€ ${p.price}</p>
  </article>`).join("");
$("[data-others]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-oc]");
  if (!b) return;
  const card = b.closest(".pc"), s = b.dataset.other, c = b.dataset.oc, p = PRODUCTS[s];
  const im = card.querySelector("[data-main-image]");
  im.src = GALLERY[p.gal][c][0];
  im.alt = `${p.name}, цвят ${COLORS[c].label.toLowerCase()}`;
  card.querySelectorAll("[data-link]").forEach((a) => (a.href = productHref(s, c)));
  card.querySelectorAll("[data-oc]").forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); });
});

render();
