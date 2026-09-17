// Audit the static export like a crawler: status, title, description, canonical, H1s, noindex, word count, JSON-LD types,
// hreflang, and internal links that hit redirects or missing pages. Run after build:static: node tooling/seo-audit.js
const fs = require("fs"), path = require("path");
const OUT = "out"; const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.optavius.com").replace(/\/$/, "");
const walk = (d, o = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, o) : o.push(p); } return o; };
const files = walk(OUT).filter((f) => f.endsWith("index.html") && !/[\/](404|_not-found)[\/]/.test(f));
const redirectPages = new Set(walk(OUT).filter((f) => f.endsWith(".html") && !f.endsWith("index.html") && !/404\.html$/.test(f)).map((f) => "/" + path.relative(OUT, f).split(path.sep).join("/").replace(/\.html$/, "")));
const pages = new Map();
for (const f of files) {
  const url = "/" + path.relative(OUT, path.dirname(f)).split(path.sep).join("/").replace(/^\.$/, "").replace(/^\/$/, ""); const u = url === "/" ? "/" : url + "/";
  const html = fs.readFileSync(f, "utf8");
  const get = (re) => (html.match(re) || [])[1] || "";
  const title = get(/<title>([^<]*)<\/title>/); const desc = get(/<meta name="description" content="([^"]*)"/); const canonical = get(/<link rel="canonical" href="([^"]*)"/);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0]; const text = main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const j = JSON.parse(m[1]); return (j["@graph"] || [j]).map((x) => x["@type"]); } catch { return ["invalid"]; } });
  const hreflang = (html.match(/hreflang="/g) || []).length; const mixed = /(src|href)="http:\/\//.test(html);
  const links = [...html.matchAll(/<a [^>]*href="([^"#?]*)/g)].map((m) => m[1]).filter((h) => h.startsWith("/") && !h.startsWith("//"));
  pages.set(u, { url: u, title, desc, canonical, h1: h1s, noindex, words, ld, hreflang, mixed, links, imgsNoAlt: (main.match(/<img (?![^>]*alt=)[^>]*>/g) || []).length });
}
const issues = []; const rows = [];
for (const p of pages.values()) {
  const want = `${SITE}${p.url === "/" ? "/" : p.url}`;
  if (!p.title) issues.push([p.url, "no title"]); if (!p.desc) issues.push([p.url, "no meta description"]);
  if (p.canonical !== want) issues.push([p.url, `canonical ${p.canonical || "missing"} != ${want}`]);
  if (p.h1.length !== 1) issues.push([p.url, `${p.h1.length} H1s`]); if (p.noindex) issues.push([p.url, "noindex"]); if (p.mixed) issues.push([p.url, "http resource"]);
  if (p.imgsNoAlt) issues.push([p.url, `${p.imgsNoAlt} images without alt`]);
  for (const l of new Set(p.links)) { const norm = l.endsWith("/") ? l : l + "/"; if (redirectPages.has(l.replace(/\/$/, ""))) issues.push([p.url, `internal link through redirect: ${l}`]); else if (!pages.has(norm) && !fs.existsSync(path.join(OUT, l))) issues.push([p.url, `internal link to missing page: ${l}`]); }
  rows.push(p);
}
const titles = new Map(); for (const p of rows) { titles.set(p.title, (titles.get(p.title) || 0) + 1); } for (const [t, n] of titles) if (n > 1) issues.push(["(site)", `duplicate title x${n}: ${t.slice(0, 60)}`]);
const csv = "URL,Title,Meta description,Canonical,H1,Words,JSON-LD types,hreflang links,Issues\n" + rows.sort((a, b) => a.url.localeCompare(b.url)).map((p) => [p.url, p.title, p.desc, p.canonical, p.h1.join(" | "), p.words, [...new Set(p.ld)].join("|"), p.hreflang, issues.filter((i) => i[0] === p.url).map((i) => i[1]).join("; ")].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
fs.mkdirSync("docs", { recursive: true }); fs.writeFileSync("docs/new-site-audit.csv", csv);
console.log("pages", rows.length, "redirect pages", redirectPages.size, "issues", issues.length);
for (const i of issues.slice(0, 60)) console.log(" -", i[0], "|", i[1]);
