// Sets page (/komplekti): tabs per set, colour filter, 8 cards (2 sets × 4 colours).
export const SETS = {
  "mandala-flow": { tab: "mf", name: "Мандала Флоу", price: 119, desc: "Тениска с мандала, шорти за йога и възглавничка за очи", file: "mandala-flow" },
  "elegant-ritual": { tab: "er", name: "Елегантен ритуал", price: 123, desc: "Гащеризон за йога и възглавничка за очи", file: "elegant-ritual" },
};
const COLORS = { red: ["Бордо", "#AE2958"], green: ["Маслина", "#819886"], blue: ["Синьо", "#518398"], yellow: ["Жълто", "#D7B955"] };
const IMG_COLOR = { red: "pink", green: "green", blue: "blue", yellow: "yellow" };
const ORDER = [["mandala-flow", "red"], ["mandala-flow", "yellow"], ["mandala-flow", "green"], ["mandala-flow", "blue"],
  ["elegant-ritual", "red"], ["elegant-ritual", "yellow"], ["elegant-ritual", "green"], ["elegant-ritual", "blue"]];
const TABS = [["all", "Всички"], ["mandala-flow", "Мандала Флоу"], ["elegant-ritual", "Елегантен ритуал"]];

const state = { tab: "all", colors: new Set() };
const $ = (s) => document.querySelector(s);
const setImg = (s, c) => `images/sets/eka-yoga-set-${SETS[s].file}-${IMG_COLOR[c]}.webp`;
const setHref = (s, c) => `komplekt.html?s=${s}&c=${c}`;

function render() {
  const list = ORDER.filter(([s, c]) => (state.tab === "all" || s === state.tab) && (!state.colors.size || state.colors.has(c)));
  $("[data-grid]").innerHTML = list.map(([s, c]) => {
    const p = SETS[s], [label, hex] = COLORS[c], href = setHref(s, c);
    return `<article class="pc" data-variant="set">
      <a class="pc__link" href="${href}"><img class="pc__img" src="${setImg(s, c)}" alt="${p.name}, цвят ${label.toLowerCase()}" loading="lazy" /></a>
      <div class="pc__swatches" role="group" aria-label="Цвят"><span class="pc__swatch is-on" role="img" aria-label="${label}" style="--swatch-color:${hex}"><span></span></span></div>
      <h3 class="pc__name"><a href="${href}">${p.name}</a></h3>
      <p class="pc__desc">${p.desc}</p>
      <p class="pc__price lining-nums">€ ${p.price}</p>
    </article>`;
  }).join("");
  const n = list.length;
  $("[data-empty]").hidden = n > 0;
  document.querySelectorAll("[data-tab]").forEach((b) =>
    b.setAttribute(b.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed", b.dataset.tab === state.tab));
  document.querySelectorAll("[data-fcolor]").forEach((el) => {
    const on = state.colors.has(el.dataset.fcolor);
    if (el.type === "checkbox") el.checked = on; else { el.setAttribute("aria-pressed", on); el.classList.toggle("is-on", on); }
  });
  const badge = $("[data-filter-count]");
  badge.hidden = !state.colors.size; badge.textContent = state.colors.size;
  $("[data-apply-label]").textContent = `Покажи ${n} ${n === 1 ? "комплект" : "комплекта"}`;
}

$("[data-tabs]").innerHTML = TABS.map(([k, l]) => `<button type="button" role="tab" class="cl-tab" data-tab="${k}">${l}</button>`).join("");
$("[data-cats]").innerHTML = TABS.map(([k, l]) => `<button type="button" class="fd__cat" data-tab="${k}">${l}</button>`).join("");
$("[data-colors-d]").innerHTML = ["red", "green", "blue", "yellow"].map((k) =>
  `<label class="fd__check"><input type="checkbox" data-fcolor="${k}" /><span class="fd__sw" style="background:${COLORS[k][1]}"></span>${COLORS[k][0]}</label>`).join("");
$("[data-colors-m]").innerHTML = ["red", "yellow", "green", "blue"].map((k) =>
  `<button type="button" class="fd__swb" aria-label="${COLORS[k][0]}" aria-pressed="false" data-fcolor="${k}" style="--swatch-color:${COLORS[k][1]}"><span></span></button>`).join("");

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab],[data-fcolor],[data-clear]");
  if (!t) return;
  if (t.dataset.tab) state.tab = t.dataset.tab;
  else if (t.dataset.fcolor) state.colors.has(t.dataset.fcolor) ? state.colors.delete(t.dataset.fcolor) : state.colors.add(t.dataset.fcolor);
  else state.colors.clear();
  render();
});

const drawer = $("[data-filter]"), opener = $("[data-filter-open]");
function setOpen(open) {
  drawer.hidden = !open;
  opener.setAttribute("aria-expanded", open);
  document.documentElement.style.overflow = open ? "hidden" : "";
  (open ? drawer.querySelector(".fd__close") : opener).focus();
}
opener.addEventListener("click", () => setOpen(true));
drawer.querySelectorAll("[data-filter-close]").forEach((b) => b.addEventListener("click", () => setOpen(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) setOpen(false); });

render();
