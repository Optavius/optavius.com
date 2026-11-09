// Generate redirect pages for the old site's URLs (docs/redirect-map.csv) inside the static export.
// GitHub Pages cannot send 301s, so each old URL gets an HTML page with an instant meta refresh, a canonical
// pointing at the new URL, a script redirect and a plain link. Old non-HTML paths get a copy of the current file.
// Runs as part of `npm run build:static` (after next build). Run from the project root: node tooling/redirects.js
const fs = require("fs"), path = require("path");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.optavius.com").replace(/\/$/, "");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const OUT = "out";
const rows = fs.readFileSync("docs/redirect-map.csv", "utf8").split(/\r?\n/).slice(1).filter(Boolean)
  .map((l) => l.match(/"([^"]*)"/g).map((c) => c.slice(1, -1)));
const COPIES = { "/sitemap-index.xml": "/sitemap.xml", "/sitemap-0.xml": "/sitemap.xml", "/sitemap-markdown.xml": "/sitemap.xml", "/.well-known/llm.md": "/llms.txt", "/og-image.jpg": "/og/en.png" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const page = (from, to, lang) => {
  // the page form of the target, so the hop lands on the final address
  const isFile = /\.[a-z0-9]+$/.test(to.split("/").pop() || "");
  const url = SITE + BASE + (isFile || to.endsWith("/") ? to : to + "/"); const nl = lang === "nl"; const de = lang === "de";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(nl ? "Pagina verplaatst" : de ? "Seite verschoben" : "Page moved")}: ${esc(url)}</title>
<meta http-equiv="refresh" content="0; url=${esc(url)}"><link rel="canonical" href="${esc(url)}"><meta name="viewport" content="width=device-width, initial-scale=1">
<script>location.replace(${JSON.stringify(url)});</script></head>
<body style="font:16px/1.5 system-ui,sans-serif;padding:40px;color:#222"><p>${nl ? "Deze pagina is verplaatst naar" : de ? "Diese Seite ist umgezogen nach" : "This page has moved to"} <a href="${esc(url)}">${esc(url)}</a>.</p></body></html>\n`;
};
let n = 0, c = 0;
// Every old address is written in both URL forms (/old and /old/). The old site also served every English page under
// /en-us/ and /en-US/ (Google still asks for those), so each English address gets both prefixed twins as well.
const expanded = []; const seen = new Set();
const push = (x, to, action) => { if (x && !seen.has(x)) { seen.add(x); expanded.push([x, to, action]); } };
for (const [from, to, action] of rows) {
  if (!/^redirect/.test(action) && !/^unchanged/.test(action)) continue;
  const english = !/^\/(nl|de)(\/|$)/.test(from);
  const bases = [];
  if (/^redirect/.test(action) && from !== to) bases.push(from);
  if (english && !COPIES[from]) bases.push("/en-us" + (from === "/" ? "" : from), "/en-US" + (from === "/" ? "" : from));
  for (const b of bases) { push(b, to, "redirect"); if (!COPIES[b]) push(b.endsWith("/") ? b.slice(0, -1) : b + "/", to, "redirect"); }
}
for (const [from, to, action] of expanded) {
  if (!/^redirect/.test(action) || from === to) continue;
  if (COPIES[from]) { const src = path.join(OUT, COPIES[from]); if (!fs.existsSync(src)) { console.warn("missing", src); continue; } const dest = path.join(OUT, from); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(src, dest); c++; continue; }
  const lang = from.startsWith("/nl/") || from === "/nl" ? "nl" : from.startsWith("/de/") || from === "/de" ? "de" : "en";
  const dest = from.endsWith("/") ? path.join(OUT, from, "index.html") : path.join(OUT, from + ".html"); // GitHub Pages serves /features from features.html without adding a redirect hop
  if (fs.existsSync(path.join(OUT, from, "index.html"))) { console.warn("skip, page exists:", from); continue; }
  fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, page(from, to, lang)); n++;
}
console.log("redirect pages", n, "file copies", c);
