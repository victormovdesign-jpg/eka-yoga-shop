// CartDrawer: right-side modal. Reads/writes state via js/checkout.js and
// looks up product metadata from data/products.json (fetched once on first
// open, cached on window._EKA_META).

import { getCart, onChange, updateQuantity, checkout } from "./checkout.js";

const IMAGE_MAP = {
  gashterizon: {
    bordo: "images/jumpsuit/eka-yoga-gashterizon-za-yoga-malina-01.webp",
    maslina: "images/jumpsuit/eka-yoga-gashterizon-za-yoga-zelen-01.webp",
    sinyo: "images/jumpsuit/eka-yoga-gashterizon-za-yoga-sin-01.webp",
  },
  shorti: {
    bordo: "images/shorts/eka-yoga-shorti-malina-01.webp",
    maslina: "images/shorts/eka-yoga-shorti-zeleni-01.webp",
    sinyo: "images/shorts/short-01-blue.webp",
  },
  teniska: {
    bordo: "images/tshirts/eka-yoga-tshirt-pink_01.webp",
    maslina: "images/tshirts/eka-yoga-tshirt-green_01.webp",
    sinyo: "images/tshirts/eka-yoga-tshirt-blue_01.webp",
    zhalto: "images/tshirts/eka-yoga-tshirt-yellow_01.webp",
  },
  vazglavnichka: {
    bordo: "images/eye-pillows/eka-yoga-eye-pillow-pink-02.webp",
    maslina: "images/eye-pillows/eka-yoga-eye-pillow-green-01.webp",
    sinyo: "images/eye-pillows/eka-yoga-eye-pillow-blue-01.webp",
    zhalto: "images/eye-pillows/eka-yoga-eye-pillow-yellow-01.webp",
  },
  "mandala-flow": {
    bordo: "images/sets/eka-yoga-set-mandala-flow-pink.webp",
    maslina: "images/sets/eka-yoga-set-mandala-flow-green.webp",
    sinyo: "images/sets/eka-yoga-set-mandala-flow-blue.webp",
    zhalto: "images/sets/eka-yoga-set-mandala-flow-yellow.webp",
  },
  "elegant-ritual": {
    bordo: "images/sets/eka-yoga-set-elegant-ritual-pink.webp",
    maslina: "images/sets/eka-yoga-set-elegant-ritual-green.webp",
    sinyo: "images/sets/eka-yoga-set-elegant-ritual-blue.webp",
    zhalto: "images/sets/eka-yoga-set-elegant-ritual-yellow.webp",
  },
};

let metaPromise = null;
function loadMeta() {
  if (!metaPromise) {
    metaPromise = fetch("data/products.json")
      .then((r) => r.json())
      .then((products) =>
        Object.fromEntries(
          products.map((p) => [
            p.id,
            {
              name: p.name,
              price: p.price_eur,
              colors: Object.fromEntries((p.colors ?? []).map((c) => [c.key, c])),
            },
          ]),
        ),
      );
  }
  return metaPromise;
}

function imageFor(productId, color) {
  const byColor = IMAGE_MAP[productId];
  if (!byColor) return "";
  const key = color && byColor[color] ? color : Object.keys(byColor)[0];
  return byColor[key];
}

function variantLabel(meta, color, size) {
  const parts = [];
  if (color && meta?.colors?.[color]) parts.push(meta.colors[color].label);
  if (size) parts.push(size);
  return parts.join(" / ");
}

document.addEventListener("DOMContentLoaded", async () => {
  const drawer = document.querySelector("[data-cart-drawer]");
  if (!drawer) return;

  const list = drawer.querySelector("[data-list]");
  const empty = drawer.querySelector("[data-empty]");
  const totalOut = drawer.querySelector("[data-total]");
  const providerNote = drawer.querySelector("[data-provider-note]");

  const META = await loadMeta();

  const render = () => {
    const cart = getCart();
    totalOut.textContent = String(
      cart.lines.reduce((sum, l) => {
        const price = META[l.productId]?.price ?? 0;
        return sum + price * l.quantity;
      }, 0),
    );
    if (cart.lines.length === 0) {
      empty.hidden = false;
      list.innerHTML = "";
      return;
    }
    empty.hidden = true;
    list.innerHTML = "";
    for (const line of cart.lines) {
      const meta = META[line.productId];
      if (!meta) continue;
      const li = document.createElement("li");
      li.className = "cd__item";
      li.innerHTML = `
        <img class="cd__img" src="${imageFor(line.productId, line.color)}" alt="${meta.name}" />
        <div class="cd__info">
          <h3 class="cd__name">${meta.name}</h3>
          <p class="cd__var">${variantLabel(meta, line.color, line.size)}</p>
          <div class="cd__row">
            <div class="cd__step" role="group" aria-label="Количество">
              <button type="button" aria-label="Намалете количеството" data-dec>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16"></path></svg>
              </button>
              <span aria-live="polite">${line.quantity}</span>
              <button type="button" aria-label="Увеличете количеството" data-inc>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16M12 4v16"></path></svg>
              </button>
            </div>
            <span class="cd__price lining-nums">€ ${meta.price * line.quantity}</span>
          </div>
        </div>
      `;
      li.querySelector("[data-dec]").addEventListener("click", () => {
        updateQuantity(
          { productId: line.productId, color: line.color, size: line.size },
          line.quantity - 1,
        );
      });
      li.querySelector("[data-inc]").addEventListener("click", () => {
        updateQuantity(
          { productId: line.productId, color: line.color, size: line.size },
          line.quantity + 1,
        );
      });
      list.appendChild(li);
    }
  };

  const open = () => {
    drawer.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    render();
  };
  const close = () => {
    drawer.setAttribute("hidden", "");
    document.body.style.overflow = "";
    providerNote.hidden = true;
  };

  drawer.querySelectorAll("[data-close]").forEach((btn) =>
    btn.addEventListener("click", close),
  );
  window.addEventListener("eka:cart-open", open);
  onChange(render);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hasAttribute("hidden")) close();
  });

  drawer.querySelector("[data-buy]").addEventListener("click", () => {
    try {
      checkout();
    } catch (e) {
      providerNote.hidden = false;
      providerNote.textContent = e.message;
    }
  });

  render();
});
