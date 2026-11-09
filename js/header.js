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
