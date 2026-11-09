/**
 * Cart + checkout adapter (stub).
 *
 * UI (cart badge, "Добавете в количката", "Купете сега", CartDrawer) talks to
 * this module only. When a provider is picked (external link, WooCommerce,
 * Shopify, Stripe...) we swap the body of each export and the pages stay the
 * same.
 *
 * Until then: state lives in localStorage and `checkout()` throws.
 */

const STORAGE_KEY = "eka-cart-v1";

function readStore() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(lines) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(
    new CustomEvent("eka:cart-change", { detail: snapshot(lines) }),
  );
}

function snapshot(lines) {
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  return { lines: [...lines], count };
}

function sameLine(a, b) {
  return a.productId === b.productId && a.color === b.color && a.size === b.size;
}

export function getCart() {
  return snapshot(readStore());
}

export function add(line) {
  const lines = readStore();
  const qty = line.quantity ?? 1;
  const existing = lines.find((l) => sameLine(l, { ...line, quantity: qty }));
  if (existing) {
    existing.quantity += qty;
  } else {
    lines.push({ ...line, quantity: qty });
  }
  writeStore(lines);
  return snapshot(lines);
}

export function remove(target) {
  const lines = readStore().filter((l) => !sameLine(l, { ...target, quantity: 0 }));
  writeStore(lines);
  return snapshot(lines);
}

export function updateQuantity(target, quantity) {
  if (quantity <= 0) return remove(target);
  const lines = readStore();
  const match = lines.find((l) => sameLine(l, { ...target, quantity }));
  if (match) {
    match.quantity = quantity;
  } else {
    lines.push({ ...target, quantity });
  }
  writeStore(lines);
  return snapshot(lines);
}

export function clear() {
  writeStore([]);
  return snapshot([]);
}

export function checkout(_cart = getCart()) {
  throw new Error(
    "js/checkout.js: no provider wired. Swap this stub once the client picks " +
      "external link / WooCommerce / Shopify / Stripe.",
  );
}

export function onChange(handler) {
  if (typeof window === "undefined") return () => {};
  const listener = (e) => handler(e.detail);
  window.addEventListener("eka:cart-change", listener);
  return () => window.removeEventListener("eka:cart-change", listener);
}
