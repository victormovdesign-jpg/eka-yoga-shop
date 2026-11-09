// Home page: drag-scroll carousels, "next" arrows, and the shop-by-colour switcher.

// --- Carousels -----------------------------------------------------------
document.querySelectorAll("[data-row]").forEach((row) => {
  let drag = null;
  let moved = false;
  row.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return; // touch uses native scroll
    drag = { x: e.clientX, left: row.scrollLeft };
    moved = false;
    row.classList.add("is-dragging");
  });
  row.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) moved = true;
    row.scrollLeft = drag.left - dx;
  });
  const end = () => { drag = null; row.classList.remove("is-dragging"); };
  row.addEventListener("pointerup", end);
  row.addEventListener("pointerleave", end);
  // A drag must not count as a click on the tile link.
  row.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  row.addEventListener("dragstart", (e) => e.preventDefault());

  const next = row.parentElement.querySelector("[data-row-next]");
  if (next) {
    next.addEventListener("click", () => {
      const tile = row.firstElementChild;
      const step = tile ? (tile.offsetWidth + 16) * 2 : 1032; // two tiles
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
      row.scrollTo({ left: atEnd ? 0 : row.scrollLeft + step, behavior: "smooth" });
    });
  }
});

// --- Shop by colour ------------------------------------------------------
// Photos per colour chosen by Viktor (2026-11-09); the eye pillow now follows the colour too.
const COLORS = {
  red: { label: "Бордо", hex: "#AE2958" },
  green: { label: "Маслина", hex: "#819886" },
  blue: { label: "Синьо", hex: "#518398" },
};
const IMAGES = {
  leo: { red: "jumpsuit/eka-yoga-gashterizon-za-yoga-malina-01.webp", green: "jumpsuit/eka-yoga-gashterizon-za-yoga-zelen-01.webp", blue: "jumpsuit/eka-yoga-gashterizon-za-yoga-sin-04.webp" },
  sh: { red: "shorts/eka-yoga-shorti-malina-01.webp", green: "shorts/eka-yoga-shorti-zeleni-03.webp", blue: "shorts/short-01-blue.webp" },
  ts: { red: "tshirts/eka-yoga-tshirt-pink_01.webp", green: "tshirts/eka-yoga-tshirt-green_03.webp", blue: "tshirts/eka-yoga-tshirt-blue_02.webp" },
  pil: { red: "eye-pillows/eka-yoga-eye-pillow-pink-02.webp", green: "eye-pillows/eka-yoga-eye-pillow-green-01.webp", blue: "eye-pillows/eka-yoga-eye-pillow-blue-02.webp" },
};
const SLUGS = { leo: "gashterizon", sh: "shorti", ts: "teniska", pil: "vazglavnichka" };
const NAMES = { leo: "Гащеризон за йога", sh: "Шорти за йога", ts: "Тениска с мандала", pil: "Възглавничка за очи" };

const switchBtns = document.querySelectorAll(".hm-color[data-color]");
switchBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const c = btn.dataset.color;
    switchBtns.forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-by-color] [data-product]").forEach((card) => {
      const id = card.dataset.product;
      if (!IMAGES[id]) return;
      const img = card.querySelector("[data-main-image]");
      img.src = "images/" + IMAGES[id][c];
      img.alt = NAMES[id] + ", " + COLORS[c].label.toLowerCase();
      card.querySelectorAll("a").forEach((a) => (a.href = `produkt.html?p=${SLUGS[id]}&c=${c}`));
      const sw = card.querySelector("[data-swatch-static]");
      sw.style.setProperty("--swatch-color", COLORS[c].hex);
      sw.setAttribute("aria-label", COLORS[c].label);
    });
  });
});

// --- Entrance animations ---------------------------------------------------
// Sections animate one by one as they scroll into view — never all at load.
// Each element fades 0 → 100% in 300 ms; titles also rise from below;
// carousel / grid items appear left → right, STAGGER ms apart.
(() => {
  const STAGGER = 120;
  const root = document.documentElement;
  if (!root.classList.contains("js-anim")) return;

  const mark = (sel, kind) => document.querySelectorAll(sel).forEach((el) => el.setAttribute("data-reveal", kind));
  // Titles: fade + bottom → top.
  mark(".hm-title, .hm-ritual__title, .pf__more > h2", "title");
  // Single elements: fade.
  mark(".hm-hero__img, .hm-ritual > img, .hm-ritual > .hm-cta, .pf__quote, .emb", "fade");
  // Groups: their children reveal left → right.
  const groupSel = "[data-row], .hm-brand__grid, .hm-colors__switch, [data-by-color], .hm-sets .hm-grid, .pf__grid";
  const groups = [...document.querySelectorAll(groupSel)];
  groups.forEach((g) => [...g.children].forEach((c) => c.setAttribute("data-reveal", "item")));

  const show = (el, delay = 0) => { el.style.setProperty("--reveal-delay", delay + "ms"); el.classList.add("is-in"); };
  const all = () => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return all();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      if (groups.includes(el)) [...el.children].forEach((c, i) => show(c, i * STAGGER));
      else show(el);
    });
  }, { threshold: 0.15 });

  groups.forEach((g) => io.observe(g));
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (!groups.some((g) => g.contains(el))) io.observe(el);
  });
})();
