// Demo-only wiring for /components.html: add sample line, clear, open drawer.
import { add, clear } from "./checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-add-sample]")?.addEventListener("click", () => {
    add({ productId: "gashterizon", color: "bordo", size: "M", quantity: 1 });
    window.dispatchEvent(new CustomEvent("eka:cart-open"));
  });
  document.querySelector("[data-clear-cart]")?.addEventListener("click", () => clear());
  document.querySelector("[data-open-cart]")?.addEventListener("click", () =>
    window.dispatchEvent(new CustomEvent("eka:cart-open")),
  );
});
