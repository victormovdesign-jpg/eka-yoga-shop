// Header behaviour: mobile menu toggle + cart icon dispatch.
// Runs for every .hd on the page.

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-menu-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".hd")?.querySelector("[data-menu-panel]");
      if (!panel) return;
      const willOpen = panel.hasAttribute("hidden");
      if (willOpen) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.querySelectorAll("[data-menu-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest("[data-menu-panel]")?.setAttribute("hidden", "");
    });
  });

  document.querySelectorAll("[data-cart-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("eka:cart-open"));
    });
  });
});

// Cart badge: show the item count from the cart adapter, live.
import { getCart, onChange } from "./checkout.js";
function paintCount({ count }) {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
  document.querySelectorAll("[data-cart-trigger]").forEach((btn) => {
    btn.setAttribute("aria-label", `Количка, ${count} ${count === 1 ? "продукт" : "продукта"}`);
  });
}
paintCount(getCart());
onChange(paintCount);

// --- Header on scroll (every page) ------------------------------------------
// Scroll down → header fades out; scroll up → it fades back in (200 ms, CSS).
// Same behaviour as the original Home header; applies to the page header
// (the .hd that is a direct child of <body>).
(() => {
  const hd = document.querySelector("body > .hd");
  if (!hd) return;
  hd.classList.add("hd--scroll");
  const menu = hd.querySelector("[data-menu-panel]");
  const TOP = 10;      // within this many px of the top: always shown
  const DELTA = 6;     // ignore tiny scroll jitter
  let lastY = window.scrollY;
  let ticking = false;

  const setHeight = () => document.body.style.setProperty("--hd-height", `${hd.offsetHeight}px`);
  const show = (y) => {
    hd.classList.remove("is-hidden");
    hd.classList.toggle("is-scrolled", y > TOP);
    document.body.classList.toggle("hd-pinned", y > TOP);
  };
  const hide = () => {
    hd.classList.add("is-hidden");
    document.body.classList.remove("hd-pinned");
  };

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const menuOpen = menu && !menu.hasAttribute("hidden");
    if (y <= TOP || menuOpen) { show(y); lastY = y; return; }
    if (Math.abs(y - lastY) < DELTA) return;
    if (y > lastY && y > hd.offsetHeight) hide();   // scrolling down
    else if (y < lastY) show(y);                     // scrolling up
    lastY = y;
  };

  setHeight();
  window.addEventListener("resize", setHeight);
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  // Keyboard users tabbing into the header must always see it.
  hd.addEventListener("focusin", () => show(window.scrollY));
  update();
})();
