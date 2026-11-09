// Brand page: "Прочети повече" toggles for the three text blocks.
document.querySelectorAll("[data-more]").forEach((btn) => {
  const extra = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = extra.hidden;
    extra.hidden = !open;
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "Покажи по-малко" : "Прочети повече";
  });
});
