#!/usr/bin/env node
// Build data/products.json from data/products.csv + data/colors.json.
// The Sheet (= CSV snapshot) is the source of truth; this script never invents
// colours, sizes or prices. It also checks the 6-product table from
// docs/current-state.md and warns on drift so the mismatch is visible.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, "..", "data");

const csvPath = resolve(dataDir, "products.csv");
const colorsPath = resolve(dataDir, "colors.json");
const outPath = resolve(dataDir, "products.json");

const colors = JSON.parse(readFileSync(colorsPath, "utf8"));

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

function parseCsv(text) {
  const [headerLine, ...rows] = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const headers = splitCsvLine(headerLine);
  return rows.map((line) => {
    const values = splitCsvLine(line);
    const record = {};
    headers.forEach((h, i) => {
      record[h] = values[i] ?? "";
    });
    return record;
  });
}

function expandList(raw) {
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function expandColors(raw) {
  return expandList(raw).map((key) => {
    const meta = colors[key];
    if (!meta) throw new Error(`Unknown colour key "${key}" in products.csv`);
    return { key, ...meta };
  });
}

const raw = readFileSync(csvPath, "utf8");
const rows = parseCsv(raw);

const products = rows.map((r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  colors: r.colors ? expandColors(r.colors) : [],
  sizes: r.sizes ? expandList(r.sizes) : [],
  price_eur: Number(r.price_eur),
}));

writeFileSync(outPath, JSON.stringify(products, null, 2) + "\n");
console.log(`Wrote ${products.length} products to data/products.json`);

// ---- Verification against docs/current-state.md 6-product table ----
const ALL = ["bordo", "maslina", "sinyo", "zhalto"];
const expected = [
  { id: "gashterizon",    name: "Гащеризон за йога",    colors: ["bordo", "maslina", "sinyo"],        sizes: ["S", "M"],       price: 98 },
  { id: "shorti",         name: "Шорти за йога",        colors: ["bordo", "maslina", "sinyo"],        sizes: ["S", "M"],       price: 49 },
  { id: "teniska",        name: "Тениска с мандала",    colors: ALL,                                   sizes: ["S", "M", "L"],  price: 45 },
  { id: "vazglavnichka",  name: "Възглавничка за очи",  colors: ALL,                                   sizes: ["Един размер"],  price: 36 },
  { id: "mandala-flow",   name: "Мандала флоу",         colors: ALL,                                   sizes: [],               price: 119 },
  { id: "elegant-ritual", name: "Елегантен ритуал",     colors: ALL,                                   sizes: [],               price: 123 },
];

const issues = [];
for (const want of expected) {
  const got = products.find((p) => p.id === want.id);
  if (!got) {
    issues.push(`Missing product: ${want.id}`);
    continue;
  }
  if (got.name !== want.name) issues.push(`${want.id}: name "${got.name}" ≠ expected "${want.name}"`);
  if (got.price_eur !== want.price) issues.push(`${want.id}: price ${got.price_eur}€ ≠ expected ${want.price}€`);
  const gotColors = got.colors.map((c) => c.key);
  if (gotColors.join(",") !== want.colors.join(",")) {
    issues.push(`${want.id}: colours [${gotColors.join(", ") || "—"}] ≠ expected [${want.colors.join(", ") || "—"}]`);
  }
  if (got.sizes.join(",") !== want.sizes.join(",")) {
    issues.push(`${want.id}: sizes [${got.sizes.join(", ") || "—"}] ≠ expected [${want.sizes.join(", ") || "—"}]`);
  }
}

if (issues.length) {
  console.warn("\nDrift vs docs/current-state.md (the sheet wins — fix the CSV or the doc):");
  for (const line of issues) console.warn("  • " + line);
  process.exitCode = 0;
} else {
  console.log("OK: products.json matches the 6-product table in current-state.md.");
}
