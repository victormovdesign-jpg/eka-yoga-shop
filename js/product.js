// Product page template: produkt.html?p=<slug>&c=<colour>
// slug = id from data/products.json; colour = red | green | blue | yellow.
import { GALLERY } from "./collection-data.js";
import { add } from "./checkout.js";
import { TEXTS } from "./product-texts.js";

const COLORS = {
  red: { label: "Бордо", hex: "#AE2958", key: "bordo" },
  green: { label: "Маслина", hex: "#819886", key: "maslina" },
  blue: { label: "Синьо", hex: "#518398", key: "sinyo" },
  yellow: { label: "Жълто", hex: "#D7B955", key: "zhalto" },
};
// Names, prices, colours, sizes = data/products.csv (the Sheet wins).
const PRODUCTS = {
  gashterizon: { gal: "leo", name: "Гащеризон за йога", price: 98, colors: ["red", "green", "blue"], sizes: ["S", "M"] },
  shorti: { gal: "sh", name: "Шорти за йога", price: 49, colors: ["red", "green", "blue"], sizes: ["S", "M"] },
  teniska: { gal: "ts", name: "Тениска с мандала", price: 45, colors: ["red", "yellow", "green", "blue"], sizes: ["S", "M", "L"] },
  vazglavnichka: { gal: "pil", name: "Възглавничка за очи", price: 36, colors: ["red", "yellow", "green", "blue"], sizes: ["Един размер"] },
};
// "Други от колекцията": canvas default colour per product.
const OTHER_DEFAULT = { gashterizon: "red", shorti: "red", teniska: "blue", vazglavnichka: "green" };
const DESC_PLACEHOLDER = "[ОПИСАНИЕ – очаква се текст от клиента]";

const $ = (s) => document.querySelector(s);
// Always open a product at its top section, never at a remembered scroll position
// (reload, back/forward, or arriving from a card further down another page).
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const toTop = () => window.scrollTo(0, 0);
toTop();
window.addEventListener("pageshow", toTop);

const qs = new URLSearchParams(location.search);
const slug = PRODUCTS[qs.get("p")] ? qs.get("p") : "gashterizon";
const P = PRODUCTS[slug];
const state = {
  color: P.colors.includes(qs.get("c")) ? qs.get("c") : P.colors[0],
  size: P.sizes[0],
  qty: 1,
  more: false,
};
export const productHref = (s, c) => `produkt.html?p=${s}${c ? "&c=" + c : ""}`;

// ---- static bits ----
document.title = `${P.name} – EKA YOGA`;
$("[data-crumb]").textContent = P.name;
$("[data-name]").textContent = P.name;
$("[data-price]").textContent = `€ ${P.price}`;
const sg = $("[data-sg-trigger]");
if (P.sizes.includes("Един размер")) sg.remove();
else sg.dataset.sizeGuideOpen = P.sizes.join(",");

// ---- gallery ----
// Mobile gallery (swipe) loops endlessly: a copy of the last photo sits before the
// first and a copy of the first after the last (.is-clone, hidden on desktop's 2×2 grid).
// When the swipe settles on a copy we jump, without animation, to the real photo.
const MOBILE = window.matchMedia("(max-width: 767px)");
const gal = $("[data-gal]");
let galCount = 0;
const slideW = () => gal.clientWidth || 1;
function jumpTo(slide) {
  gal.style.scrollSnapType = "none";
  gal.style.scrollBehavior = "auto";
  gal.scrollLeft = slide * slideW();
  gal.offsetWidth; // apply before re-enabling snap
  gal.style.scrollSnapType = "";
  gal.style.scrollBehavior = "";
}
function paintDots() {
  const slide = Math.round(gal.scrollLeft / slideW());
  const real = ((slide - 1) % galCount + galCount) % galCount;
  document.querySelectorAll("[data-dots] span").forEach((d, j) => d.classList.toggle("is-on", j === real));
}
function settle() {
  if (!MOBILE.matches || galCount < 2) return;
  const slide = Math.round(gal.scrollLeft / slideW());
  if (slide === 0) jumpTo(galCount);               // copy of last → real last
  else if (slide === galCount + 1) jumpTo(1);      // copy of first → real first
  paintDots();
}
// Extra photos for the Product page grid only (Viktor, 2026-11-09).
const PRODUCT_EXTRA = {
  ts: {
    red: ["images/tshirts/eka-yoga-tshirt-pink_04.webp"],
    yellow: ["images/tshirts/eka-yoga-tshirt-yellow_04.webp"],
    green: ["images/tshirts/eka-yoga-tshirt-green_04.webp"],
    blue: ["images/tshirts/eka-yoga-tshirt-blue_04.webp"],
  },
};
function renderGallery() {
  const imgs = [...GALLERY[P.gal][state.color], ...((PRODUCT_EXTRA[P.gal] || {})[state.color] || [])];
  const label = COLORS[state.color].label.toLowerCase();
  galCount = imgs.length;
  const img = (src, i, clone) =>
    `<img${clone ? ' class="is-clone" aria-hidden="true"' : ""} src="${src}" alt="${clone ? "" : `${P.name}, цвят ${label}, снимка ${i + 1}`}" draggable="false" ${!clone && i > 1 ? 'loading="lazy"' : ""} />`;
  gal.innerHTML = (galCount > 1 ? img(imgs[galCount - 1], galCount - 1, true) : "")
    + imgs.map((src, i) => img(src, i, false)).join("")
    + (galCount > 1 ? img(imgs[0], 0, true) : "");
  $("[data-dots]").innerHTML = imgs.map((_, i) => `<span${i ? "" : ' class="is-on"'}></span>`).join("");
  if (MOBILE.matches && galCount > 1) jumpTo(1); else gal.scrollLeft = 0;
}
let settleTimer;
gal.addEventListener("scroll", () => {
  if (!MOBILE.matches) return;
  paintDots();
  clearTimeout(settleTimer);
  settleTimer = setTimeout(settle, 120); // fallback where "scrollend" isn't supported
}, { passive: true });
gal.addEventListener("scrollend", settle);
MOBILE.addEventListener("change", () => { if (MOBILE.matches && galCount > 1) jumpTo(1); });
window.addEventListener("resize", () => { if (MOBILE.matches && galCount > 1) jumpTo(Math.max(1, Math.round(gal.scrollLeft / slideW()))); });

// ---- options ----
function renderOptions() {
  $("[data-color-name]").textContent = COLORS[state.color].label;
  $("[data-swatches]").innerHTML = P.colors.map((c) => {
    const on = c === state.color;
    return `<button type="button" class="pc__swatch${on ? " is-on" : ""}" aria-label="${COLORS[c].label}" aria-pressed="${on}" data-color="${c}" style="--swatch-color:${COLORS[c].hex}"><span></span></button>`;
  }).join("");
  $("[data-sizes]").innerHTML = P.sizes.map((s) =>
    `<button type="button" class="pd-size" aria-pressed="${s === state.size}" data-size="${s}">${s}</button>`).join("");
  $("[data-qty]").textContent = state.qty;
}
// Copy comes from js/product-texts.js. The first two paragraphs are always shown;
// "Покажи повече" reveals the rest (paragraphs + feature / care lists).
const VISIBLE = 2;
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const blockHTML = (b) => b.p !== undefined
  ? `<p>${esc(b.p)}</p>`
  : `<div class="pd-list"><p class="pd-list__h">${esc(b.h)}</p><ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`;
function renderDesc() {
  const blocks = TEXTS[slug] || [{ p: DESC_PLACEHOLDER }];
  const shown = state.more ? blocks : blocks.slice(0, VISIBLE);
  $("[data-desc]").innerHTML = shown.map(blockHTML).join("");
  const btn = $("[data-more]");
  btn.hidden = blocks.length <= VISIBLE;
  btn.textContent = state.more ? "Покажи по-малко" : "Покажи повече";
  btn.setAttribute("aria-expanded", state.more);
}

document.addEventListener("click", (e) => {
  const c = e.target.closest("[data-swatches] [data-color]");
  const s = e.target.closest("[data-sizes] [data-size]");
  if (c) {
    state.color = c.dataset.color;
    history.replaceState(null, "", productHref(slug, state.color));
    renderGallery(); renderOptions();
  } else if (s) { state.size = s.dataset.size; renderOptions(); }
});
$("[data-dec]").addEventListener("click", () => { state.qty = Math.max(1, state.qty - 1); renderOptions(); });
$("[data-inc]").addEventListener("click", () => { state.qty += 1; renderOptions(); });
$("[data-more]").addEventListener("click", () => { state.more = !state.more; renderDesc(); });

function addToCart() {
  add({ productId: slug, color: COLORS[state.color].key, size: state.size, quantity: state.qty });
}
const addBtn = $("[data-add]");
addBtn.addEventListener("click", () => {
  addToCart();
  addBtn.textContent = "Добавено в количката";
  setTimeout(() => { addBtn.textContent = "Добави в количката"; }, 2000);
});
$("[data-buy]").addEventListener("click", () => {
  addToCart();
  window.dispatchEvent(new CustomEvent("eka:cart-open"));
});

// ---- Други от колекцията ----
function otherCard(s) {
  const p = PRODUCTS[s];
  const sel = OTHER_DEFAULT[s];
  const img = GALLERY[p.gal][sel][0];
  return `<article class="pc" data-variant="item">
    <a class="pc__link" href="${productHref(s, sel)}" data-link><img class="pc__img" src="${img}" alt="${p.name}, цвят ${COLORS[sel].label.toLowerCase()}" style="aspect-ratio: 3 / 4" loading="lazy" data-main-image /></a>
    <div class="pc__swatches" role="group" aria-label="Цвят">${p.colors.map((c) =>
      `<button type="button" class="pc__swatch${c === sel ? " is-on" : ""}" aria-label="${COLORS[c].label}" aria-pressed="${c === sel}" data-other="${s}" data-oc="${c}" style="--swatch-color:${COLORS[c].hex}"><span></span></button>`).join("")}</div>
    <h3 class="pc__name"><a href="${productHref(s, sel)}" data-link>${p.name}</a></h3>
    <p class="pc__price lining-nums">€ ${p.price}</p>
  </article>`;
}
$("[data-others]").innerHTML = Object.keys(PRODUCTS).filter((s) => s !== slug).slice(0, 3).map(otherCard).join("");
$("[data-others]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-oc]");
  if (!b) return;
  const card = b.closest(".pc");
  const s = b.dataset.other, c = b.dataset.oc, p = PRODUCTS[s];
  const img = card.querySelector("[data-main-image]");
  img.src = GALLERY[p.gal][c][0];
  img.alt = `${p.name}, цвят ${COLORS[c].label.toLowerCase()}`;
  card.querySelectorAll("[data-link]").forEach((a) => (a.href = productHref(s, c)));
  card.querySelectorAll("[data-oc]").forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); });
});

renderGallery(); renderOptions(); renderDesc();
