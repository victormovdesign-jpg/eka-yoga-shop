// Checkout page (/porachka): order summary from the cart, form validation,
// payment method switch. "Плати" hands off to checkout() in js/checkout.js,
// which throws until a payment provider is chosen. The error is shown on the page.
import { getCart, onChange, checkout } from "./checkout.js";
import { loadMeta, imageFor, variantLabel } from "./cart-drawer.js";

const $ = (s) => document.querySelector(s);
const form = $("[data-form]");
const payBtn = $("[data-pay]");
const payLabel = $("[data-pay-label]");
const errorBox = $("[data-error]");
const agree = $("[data-agree]");
let method = "card";
let total = 0;

const META = await loadMeta();

// ---- Order summary ----
function renderSummary() {
  const { lines } = getCart();
  total = lines.reduce((s, l) => s + (META[l.productId]?.price ?? 0) * l.quantity, 0);
  document.querySelectorAll("[data-total]").forEach((el) => (el.textContent = String(total)));
  $("[data-items]").innerHTML = lines.length
    ? lines.map((l) => {
        const m = META[l.productId];
        if (!m) return "";
        const v = variantLabel(m, l.color, l.size);
        return `<li class="co-item"><img src="${imageFor(l.productId, l.color)}" alt="${m.name}${v ? ", " + v : ""}" />
          <div><div class="co-item__name">${m.name}</div><div>${v}</div><div>€ ${m.price} × ${l.quantity}</div></div>
          <span class="co-num">€ ${m.price * l.quantity}</span></li>`;
      }).join("")
    : `<li class="co-empty">Количката е празна. <a class="co-edit" href="oblekla-i-aksesoari.html">Към продуктите</a></li>`;
  updatePay();
}

// ---- Pay button ----
function updatePay() {
  payLabel.textContent = method === "cod" ? "Поръчай" : `Плати € ${total}`;
  payBtn.setAttribute("aria-disabled", String(!agree.checked || total === 0));
}
agree.addEventListener("change", updatePay);

// ---- Payment method ----
document.querySelectorAll("[data-method]").forEach((btn) => {
  btn.addEventListener("click", () => {
    method = btn.dataset.method;
    document.querySelectorAll("[data-method]").forEach((b) => b.setAttribute("aria-checked", String(b === btn)));
    document.querySelectorAll("[data-pane]").forEach((p) => (p.hidden = p.dataset.pane !== method));
    updatePay();
  });
});

// ---- Note toggle ----
$("[data-notes-toggle]").addEventListener("change", (e) => {
  $("[data-notes]").hidden = !e.target.checked;
  if (e.target.checked) $("#co-note").focus();
});

// ---- Mobile summary toggle ----
const sumbar = $("[data-sumbar]");
sumbar.addEventListener("click", () => {
  const open = sumbar.getAttribute("aria-expanded") !== "true";
  sumbar.setAttribute("aria-expanded", String(open));
  $("#co-aside").classList.toggle("is-open", open);
  $("[data-sumbar-label]").textContent = open ? "Скрий поръчката" : "Детайли на поръчката";
});

// ---- Submit ----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.hidden = true;
  const required = [...form.querySelectorAll("[required]")].filter((el) => el.type !== "checkbox");
  let firstBad = null;
  required.forEach((el) => {
    const bad = !el.checkValidity();
    el.setAttribute("aria-invalid", String(bad));
    if (bad && !firstBad) firstBad = el;
  });
  if (firstBad) {
    errorBox.textContent = "Моля, попълни всички задължителни полета (*).";
    errorBox.hidden = false;
    firstBad.focus();
    return;
  }
  if (!agree.checked) {
    errorBox.textContent = "Моля, приеми Общите условия и Политиката за поверителност.";
    errorBox.hidden = false;
    agree.focus();
    return;
  }
  if (total === 0) return;
  try {
    // Only order + contact data; card fields are placeholders and are never read.
    checkout({ ...getCart(), method, customer: Object.fromEntries(new FormData(form)) });
  } catch (err) {
    console.warn(err.message);
    errorBox.textContent = "Онлайн плащането все още не е свързано. Поръчката не е изпратена.";
    errorBox.hidden = false;
  }
});
form.querySelectorAll("[required]").forEach((el) =>
  el.addEventListener("input", () => el.removeAttribute("aria-invalid")));

renderSummary();
onChange(renderSummary);
