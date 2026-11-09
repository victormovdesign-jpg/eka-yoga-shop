// Home page: entrance animations + carousel drag/arrow + colour tabs.
// Animation spec (SITE.md 2026-11-09): 0 → 100% opacity in 300 ms; titles also
// move bottom → top; carousel items load left → right.

const STAGGER_MS = 120; // delay between neighbouring carousel items

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function reveal(el, delay = 0) {
  el.style.setProperty("--reveal-delay", `${delay}ms`);
  el.classList.add("is-in");
}

function revealGroup(group) {
  // Items appear in DOM order (left → right in a carousel / grid).
  const items = [...group.querySelectorAll("[data-reveal]")].filter((el) => !el.hidden && !el.closest("[hidden]"));
  items.forEach((el, i) => reveal(el, i * STAGGER_MS));
}

function init() {
  // 1. Elements that should animate immediately on load (hero, header).
  document.querySelectorAll("[data-reveal-now]").forEach((el, i) => reveal(el, i * 60));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    return;
  }

  // 2. Sections: a group (carousel / grid) runs its own left → right sequence
  //    once it enters the viewport; loose titles/images fade in individually.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute("data-reveal-group")) revealGroup(el);
        else reveal(el);
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("[data-reveal]:not([data-reveal-now])").forEach((el) => {
    if (el.closest("[data-reveal-group]")) return; // handled by its group
    io.observe(el);
  });
  document.querySelectorAll("[data-reveal-group]").forEach((g) => io.observe(g));
}

// Carousel: arrow button scrolls one card-width, pointer drag scrolls by hand.
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-track]");
    const next = root.querySelector("[data-next]");
    if (!track) return;

    next?.addEventListener("click", () => track.scrollBy({ left: 1032, behavior: "smooth" }));

    let drag = null;
    let wasDrag = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      drag = { x: e.clientX, s: track.scrollLeft, moved: false };
      track.classList.add("is-dragging");
    });
    track.addEventListener("pointermove", (e) => {
      if (!drag || !(e.buttons & 1)) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) drag.moved = true;
      track.scrollLeft = drag.s - dx;
    });
    const end = () => {
      if (!drag) return;
      wasDrag = drag.moved;
      drag = null;
      track.classList.remove("is-dragging");
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointerleave", end);
    track.addEventListener("click", (e) => {
      if (wasDrag) { e.preventDefault(); wasDrag = false; }
    }, true);
  });
}

// Colour tabs filter the product grid.
function initColourTabs() {
  const tabs = document.querySelectorAll("[data-color-tab]");
  const cards = document.querySelectorAll("[data-color-grid] [data-colour]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const colour = tab.dataset.colorTab;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-pressed", String(on));
      });
      cards.forEach((card) => {
        const show = card.dataset.colour === colour;
        card.hidden = !show;
        // Re-run the entrance for newly shown cards, left → right.
        if (show && !reduceMotion) {
          card.classList.remove("is-in");
          void card.offsetWidth;
          const visible = [...cards].filter((c) => !c.hidden);
          reveal(card, visible.indexOf(card) * STAGGER_MS);
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  initCarousels();
  initColourTabs();
});
