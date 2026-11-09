// ProductCard swatch → swap the main photo + toggle pressed state.
// Each card scopes lookups to its own closest(".pc") root.

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-swatch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".pc");
      if (!card) return;
      const img = card.querySelector("[data-main-image]");
      const newSrc = btn.getAttribute("data-image");
      if (img && newSrc) img.src = newSrc;
      card.querySelectorAll("[data-swatch]").forEach((other) => {
        other.classList.toggle("is-on", other === btn);
        other.setAttribute("aria-pressed", other === btn ? "true" : "false");
      });
    });
  });
});
