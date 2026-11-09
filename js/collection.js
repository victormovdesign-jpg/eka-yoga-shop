// Collection page (/oblekla-i-aksesoari): category tabs, filter drawer,
// card grid with a per-card mini carousel (drag / swipe / dots).
import { CARDS, GALLERY } from "./collection-data.js";

// Extra photos added to the card sliders on this page only (Viktor, 2026-11-09).
// Appended after the canvas photos; Product/Set pages keep their own lists.
const CARD_EXTRA = {
  ts: {
    red: ["images/tshirts/eka-yoga-tshirt-pink_04.webp"],
    yellow: ["images/tshirts/eka-yoga-tshirt-yellow_04.webp"],
    green: ["images/tshirts/eka-yoga-tshirt-green_04.webp"],
    blue: ["images/tshirts/eka-yoga-tshirt-blue_04.webp"],
  },
  sh: {
    red: ["images/shorts/eka-yoga-shorti-malina-04.webp"],
  },
};
const cardGallery = (p, c) => [...GALLERY[p][c], ...((CARD_EXTRA[p] || {})[c] || []).filter((x) => !GALLERY[p][c].includes(x))];

// Names, prices and sizes match data/products.csv (the Sheet wins).
const PRODUCTS = {
  leo: { name: "Гащеризон за йога", price: 98, sizes: ["S", "M"] },
  ts: { name: "Тениска с мандала", price: 45, sizes: ["S", "M", "L"] },
  sh: { name: "Шорти за йога", price: 49, sizes: ["S", "M"] },
  pil: { name: "Възглавничка за очи", price: 36, sizes: ["Един размер"] },
};
const COLORS = {
  red: ["Бордо", "#AE2958"],
  green: ["Маслина", "#819886"],
  blue: ["Синьо", "#518398"],
  yellow: ["Жълто", "#D7B955"],
};
const TABS = [["all", "Всички"], ["leo", "Гащеризони"], ["ts", "Тениски"], ["sh", "Шорти"], ["pil", "Възглавнички за очи"]];
const SIZES_D = ["S", "M", "L", "Един размер"];
const SIZES_M = ["S", "M", "L"];

const state = { tab: "all", colors: new Set(), sizes: new Set() };
const $ = (s) => document.querySelector(s);
const toggle = (set, v) => (set.has(v) ? set.delete(v) : set.add(v));

function visible() {
  return CARDS.filter((c) => {
    const p = PRODUCTS[c.p];
    if (state.tab !== "all" && c.p !== state.tab) return false;
    if (state.colors.size && !state.colors.has(c.color)) return false;
    if (state.sizes.size && !p.sizes.some((s) => state.sizes.has(s))) return false;
    return true;
  });
}

// ---- Card -----------------------------------------------------------------
function cardHTML(c, wide) {
  const p = PRODUCTS[c.p];
  const [label, hex] = COLORS[c.color];
  const gal = cardGallery(c.p, c.color);
  const start = Math.max(0, gal.indexOf(c.img));
  const imgs = gal.slice(start).concat(gal.slice(0, start)); // card photo first
  const alt = `${p.name}, цвят ${label.toLowerCase()}`;
  const SLUG = { leo: "gashterizon", ts: "teniska", sh: "shorti", pil: "vazglavnichka" };
  const href = `produkt.html?p=${SLUG[c.p]}&c=${c.color}`;
  return `
  <div class="cl-cell${wide ? " cl-cell--wide" : ""}">
    <article class="pc" data-variant="item">
      <a class="pc__link cl-car" href="${href}" draggable="false" data-car>
        <div class="cl-car__track">${imgs.map((src, i) => `<img class="pc__img" src="${src}" alt="${i ? "" : alt}" loading="lazy" draggable="false" />`).join("")}</div>
        ${imgs.length > 1 ? `<span class="cl-car__dots" aria-hidden="true">${imgs.map((_, i) => `<span${i ? "" : ' class="is-on"'}></span>`).join("")}</span>` : ""}
      </a>
      <div class="pc__swatches" role="group" aria-label="Цвят">
        <span class="pc__swatch is-on" role="img" aria-label="${label}" style="--swatch-color:${hex}"><span></span></span>
      </div>
      <h3 class="pc__name"><a href="${href}">${p.name}</a></h3>
      <p class="pc__price lining-nums">€ ${p.price}</p>
    </article>
  </div>`;
}

// Endless loop: a copy of the last photo sits before the first and a copy of the
// first after the last, so dragging past either end shows the next photo (no blank
// space). After sliding onto a copy we jump, without animation, to the real photo.
function initCarousel(link) {
  const track = link.querySelector(".cl-car__track");
  const dots = link.querySelectorAll(".cl-car__dots span");
  const n = track.children.length;
  if (n < 2) return;
  const first = track.firstElementChild.cloneNode(true);
  const last = track.lastElementChild.cloneNode(true);
  [first, last].forEach((c) => { c.alt = ""; c.setAttribute("aria-hidden", "true"); c.loading = "eager"; });
  track.append(first);
  track.prepend(last);

  let pos = 1; // index in the track incl. the leading copy; 1 = first real photo
  let x0 = null, dx = 0, moved = false, busy = false;
  const place = (animate) => {
    track.style.transition = animate ? "" : "none";
    track.style.transform = `translateX(${-pos * 100}%)`;
    const real = (pos - 1 + n) % n;
    dots.forEach((d, j) => d.classList.toggle("is-on", j === real));
  };
  place(false);
  track.addEventListener("transitionend", () => {
    if (pos === 0) { pos = n; place(false); }          // slid onto copy of last → real last
    else if (pos === n + 1) { pos = 1; place(false); } // slid onto copy of first → real first
    busy = false;
  });

  link.addEventListener("pointerdown", (e) => {
    if (busy) return;
    x0 = e.clientX; dx = 0; moved = false;
    track.style.transition = "none";
    link.setPointerCapture(e.pointerId);
  });
  link.addEventListener("pointermove", (e) => {
    if (x0 === null) return;
    dx = e.clientX - x0;
    if (Math.abs(dx) > 6) moved = true;
    track.style.transform = `translateX(calc(${-pos * 100}% + ${dx}px))`;
  });
  const end = () => {
    if (x0 === null) return;
    x0 = null;
    if (Math.abs(dx) > link.offsetWidth * 0.15) { pos += dx < 0 ? 1 : -1; busy = true; }
    place(true);
  };
  link.addEventListener("pointerup", end);
  link.addEventListener("pointercancel", end);
  link.addEventListener("click", (e) => { if (moved) e.preventDefault(); });
}

// ---- Render ---------------------------------------------------------------
function render() {
  const list = visible();
  const n = list.length;
  const wideFrom = n % 3 === 2 ? n - 2 : Infinity; // last row of 2 → two wide cards
  $("[data-grid]").innerHTML = list.map((c, j) => cardHTML(c, j >= wideFrom)).join("");
  $("[data-grid]").querySelectorAll("[data-car]").forEach(initCarousel);
  $("[data-empty]").hidden = n > 0;

  document.querySelectorAll("[data-tab]").forEach((b) => {
    const on = b.dataset.tab === state.tab;
    b.setAttribute(b.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed", on);
  });
  document.querySelectorAll("[data-fcolor]").forEach((el) => {
    const on = state.colors.has(el.dataset.fcolor);
    if (el.type === "checkbox") el.checked = on; else { el.setAttribute("aria-pressed", on); el.classList.toggle("is-on", on); }
  });
  document.querySelectorAll("[data-fsize]").forEach((el) => {
    const on = state.sizes.has(el.dataset.fsize);
    if (el.type === "checkbox") el.checked = on; else el.setAttribute("aria-pressed", on);
  });
  const active = state.colors.size + state.sizes.size;
  const badge = $("[data-filter-count]");
  badge.hidden = !active; badge.textContent = active;
  $("[data-apply-label]").textContent = `Покажи ${n} ${n === 1 ? "продукт" : "продукта"}`;
}

// ---- Build controls --------------------------------------------------------
$("[data-tabs]").innerHTML = TABS.map(([k, l]) => `<button type="button" role="tab" class="cl-tab" data-tab="${k}">${l}</button>`).join("");
$("[data-cats]").innerHTML = TABS.map(([k, l]) => `<button type="button" class="fd__cat" data-tab="${k}">${l}</button>`).join("");
$("[data-colors-d]").innerHTML = ["red", "green", "blue", "yellow"].map((k) =>
  `<label class="fd__check"><input type="checkbox" data-fcolor="${k}" /><span class="fd__sw" style="background:${COLORS[k][1]}"></span>${COLORS[k][0]}</label>`).join("");
$("[data-sizes-d]").innerHTML = SIZES_D.map((s) => `<label class="fd__check"><input type="checkbox" data-fsize="${s}" />${s}</label>`).join("");
$("[data-colors-m]").innerHTML = ["red", "yellow", "green", "blue"].map((k) =>
  `<button type="button" class="fd__swb" aria-label="${COLORS[k][0]}" aria-pressed="false" data-fcolor="${k}" style="--swatch-color:${COLORS[k][1]}"><span></span></button>`).join("");
$("[data-sizes-m]").innerHTML = SIZES_M.map((s) => `<button type="button" class="fd__szb" aria-pressed="false" data-fsize="${s}">${s}</button>`).join("");

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab],[data-fcolor],[data-fsize],[data-clear]");
  if (!t) return;
  if (t.dataset.tab) state.tab = t.dataset.tab;
  else if (t.dataset.fcolor) toggle(state.colors, t.dataset.fcolor);
  else if (t.dataset.fsize) toggle(state.sizes, t.dataset.fsize);
  else { state.colors.clear(); state.sizes.clear(); }
  render();
});

// ---- Drawer ---------------------------------------------------------------
const drawer = $("[data-filter]");
const opener = $("[data-filter-open]");
function setOpen(open) {
  drawer.hidden = !open;
  opener.setAttribute("aria-expanded", open);
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) drawer.querySelector(".fd__close").focus(); else opener.focus();
}
opener.addEventListener("click", () => setOpen(true));
drawer.querySelectorAll("[data-filter-close]").forEach((b) => b.addEventListener("click", () => setOpen(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) setOpen(false); });

render();
