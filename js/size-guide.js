// SizeGuide dialog. Handles every [data-size-guide] on the page so pages can
// mount more than one (demo renders S,M and S,M,L side by side).
// Each dialog's data-sizes is derived from its header row so triggers can
// pick the right one with data-size-guide-open="S,M,L".

document.addEventListener("DOMContentLoaded", () => {
  const dialogs = document.querySelectorAll("[data-size-guide]");

  dialogs.forEach((dialog) => {
    const sizes = Array.from(
      dialog.querySelectorAll("thead th.sg__num"),
    ).map((th) => (th.textContent ?? "").trim());
    dialog.dataset.sizes = sizes.join(",");

    const open = () => {
      dialog.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      dialog.setAttribute("hidden", "");
      document.body.style.overflow = "";
    };
    dialog.querySelectorAll("[data-close]").forEach((btn) =>
      btn.addEventListener("click", close),
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !dialog.hasAttribute("hidden")) close();
    });
    dialog._ekaOpen = open;
  });

  document.querySelectorAll("[data-size-guide-open]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const want = trigger.dataset.sizeGuideOpen;
      const target =
        want && want !== "true"
          ? Array.from(dialogs).find((d) => d.dataset.sizes === want)
          : dialogs[0];
      target?._ekaOpen?.();
    });
  });

  window.addEventListener("eka:size-guide-open", (e) => {
    const detail = e.detail;
    const target =
      typeof detail === "string"
        ? Array.from(dialogs).find((d) => d.dataset.sizes === detail)
        : dialogs[0];
    target?._ekaOpen?.();
  });
});
