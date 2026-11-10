// Motion on every page: entrance on scroll + (where marked) scroll overlap.
// Loaded last on each page, after the page script has rendered its content.

// --- Entrance animations ---------------------------------------------------
// Sections animate one by one as they scroll into view — never all at load.
// Each element fades 0 → 100% in 500 ms; titles also rise from below;
// grid / carousel items appear left → right, STAGGER ms apart.
(() => {
  const STAGGER = 120;
  const root = document.documentElement;
  if (!root.classList.contains("js-anim")) return;

  // Titles: fade + bottom → top.
  const TITLES = [
    ".hm-title", ".hm-ritual__title", ".pf__more > h2",            // Home, product pages, PreFooter
    ".br-h2",                                                       // Brand
    ".cl-title", ".ct-title", ".co-title", ".ty-title",              // Collection/Sets, Cart, Checkout, Thank you
  ];
  // Single blocks: fade.
  const SINGLES = [
    ".hm-hero__img", ".hm-ritual > img", ".hm-ritual > .hm-cta",    // Home
    ".pf__quote", ".emb",                                           // PreFooter (every page)
    ".br-hero img", ".br-text", ".br-who__panel", ".br-who__img", ".br-pillows", // Brand
    ".cl-crumbs", ".cl-bar",                                        // Collection / Sets / Product / Set / Cart / Checkout
    ".pd-galwrap", ".pd-info",                                      // Product / Set
    ".ct-split", ".co-form", ".co-aside",                           // Cart, Checkout
    ".ty-wrap", ".ty-cta",                                          // Thank you
  ];
  // Groups revealed as a whole: their children appear left → right.
  const GROUPS = [
    "[data-row]", ".hm-brand__grid", ".hm-colors__switch", "[data-by-color]", ".hm-sets .hm-grid", // Home
    ".pf__grid",                                                    // PreFooter
    ".pd-grid3", ".pd-section .hm-grid",                            // Product / Set
  ];
  // Long grids (several rows): each row reveals as it scrolls in, left → right.
  const LONG = [".cl-grid", ".st-grid"];                            // Collection, Sets

  const $$ = (sel) => [...document.querySelectorAll(sel.join(","))];
  const titles = $$(TITLES), singles = $$(SINGLES), groups = $$(GROUPS), longs = $$(LONG);
  const inGroup = (el) => [...groups, ...longs].some((g) => g !== el && g.contains(el));
  titles.forEach((el) => !inGroup(el) && el.setAttribute("data-reveal", "title"));
  singles.forEach((el) => !inGroup(el) && el.setAttribute("data-reveal", "fade"));
  const markItems = (g) => [...g.children].forEach((c) => c.setAttribute("data-reveal", "item"));
  [...groups, ...longs].forEach(markItems);

  const show = (el, delay = 0) => { el.style.setProperty("--reveal-delay", delay + "ms"); el.classList.add("is-in"); };
  const all = () => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    all();
    // Re-rendered grids: keep new items visible.
    const mo = new MutationObserver(() => all());
    [...groups, ...longs].forEach((g) => mo.observe(g, { childList: true }));
    return;
  }

  const revealed = new Set();
  const io = new IntersectionObserver((entries) => {
    let batch = 0; // stagger long-grid items entering together, in DOM (left → right) order
    entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .forEach((e) => {
        const el = e.target;
        io.unobserve(el);
        if (groups.includes(el)) { revealed.add(el); [...el.children].forEach((c, i) => show(c, i * STAGGER)); }
        else if (el.getAttribute("data-reveal") === "item") show(el, batch++ * STAGGER);
        else show(el);
      });
  }, { threshold: 0.15 });

  groups.forEach((g) => io.observe(g));
  longs.forEach((g) => [...g.children].forEach((c) => io.observe(c)));
  document.querySelectorAll("[data-reveal]").forEach((el) => { if (!inGroup(el)) io.observe(el); });

  // Grids that re-render (filters, tabs, colour switch): animate the new items.
  const mo = new MutationObserver((records) => {
    records.forEach(({ target: g, addedNodes }) => {
      const added = [...addedNodes].filter((n) => n.nodeType === 1);
      added.forEach((c) => c.setAttribute("data-reveal", "item"));
      if (longs.includes(g)) added.forEach((c) => io.observe(c));
      else if (revealed.has(g)) requestAnimationFrame(() => added.forEach((c, i) => show(c, i * STAGGER)));
    });
  });
  [...groups, ...longs].forEach((g) => mo.observe(g, { childList: true }));
})();

// --- Scroll overlap -------------------------------------------------------
// Only where a section is marked data-covered-by="<selector of the next one>"
// (Home, Brand). The next section slides over the covered one. While it is
// covered, the covered section keeps moving up at DRIFT (30%) of the scroll
// speed (bottom-aligned to the viewport if taller than it) and blurs
// 0 → MAX_BLUR px.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const MAX_BLUR = 12;
  const DRIFT = 0.3;
  const pairs = [...document.querySelectorAll("[data-covered-by]")]
    .map((under) => ({ under, over: document.querySelector(under.dataset.coveredBy) }))
    .filter((p) => p.over);
  if (!pairs.length) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    pairs.forEach(({ under, over }) => {
      const h = under.offsetHeight;
      const naturalTop = over.getBoundingClientRect().top - h; // sections are adjacent
      const covered = Math.min(h, Math.max(0, Math.min(0, vh - h) - naturalTop));
      const shift = covered * (1 - DRIFT);
      const p = covered / h;
      under.style.transform = shift ? `translateY(${shift.toFixed(1)}px)` : "";
      under.style.filter = p > 0 ? `blur(${(p * MAX_BLUR).toFixed(2)}px)` : "";
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
