// Thank-you page (/blagodarim). Shows the order saved by saveLastOrder() in js/checkout.js
// after a successful payment. ?demo shows the canvas example so the design can be reviewed.
import { getLastOrder } from "./checkout.js";
import { loadMeta, imageFor, variantLabel } from "./cart-drawer.js";

const $ = (s) => document.querySelector(s);
const DEMO = {
  number: "#EKA-1024",
  name: "Мария",
  lines: [
    { productId: "gashterizon", color: "bordo", size: "M", quantity: 1 },
    { productId: "teniska", color: "sinyo", size: "M", quantity: 2 },
    { productId: "vazglavnichka", color: "maslina", quantity: 1 },
  ],
};

const order = new URLSearchParams(location.search).has("demo") ? DEMO : getLastOrder();
const META = await loadMeta();

if (!order || !order.lines?.length) {
  $("[data-none]").hidden = false;
} else {
  $("[data-order]").hidden = false;
  if (order.name) $("[data-name]").textContent = `, ${order.name}`;
  if (order.number) $("[data-number]").textContent = order.number;
  else $("[data-number-row]").hidden = true;
  let total = 0;
  $("[data-rows]").innerHTML = order.lines.map((l) => {
    const m = META[l.productId];
    if (!m) return "";
    const v = variantLabel(m, l.color, l.size);
    const sum = m.price * l.quantity;
    total += sum;
    return `<tr>
      <td><div class="ty-item"><img src="${imageFor(l.productId, l.color)}" alt="${m.name}${v ? ", " + v : ""}" /><div><div class="ty-name">${m.name}</div><div class="ty-var">${v}</div></div></div></td>
      <td><span class="ty-num">€ ${m.price}</span></td>
      <td>${l.quantity}</td>
      <td class="ty-right"><span class="ty-num">€ ${sum}</span></td>
    </tr>`;
  }).join("");
  $("[data-total]").textContent = String(order.total ?? total);
}
