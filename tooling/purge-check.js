// After purge-css.js: list classes used in a page that site.css defined but the purged chunk no longer has. node tooling/purge-check.js out/about/index.html
const fs = require("fs"), path = require("path");
const page = process.argv[2] || "out/index.html";
const html = fs.readFileSync(page, "utf8"); const cls = new Set();
for (const m of html.matchAll(/class="([^"]*)"/g)) for (const t of m[1].split(/\s+/)) if (t) cls.add(t);
const purgedFile = fs.readdirSync("out/_next/static/chunks").filter((f) => f.endsWith(".css")).map((f) => path.join("out/_next/static/chunks", f)).sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0];
const purged = fs.readFileSync(purgedFile, "utf8"); const orig = fs.readFileSync("app/styles/site.css", "utf8");
const esc = (c) => c.replace(/[^a-zA-Z0-9_-]/g, (ch) => "\\" + ch);
const has = (css, c) => { const e = "." + esc(c); return ["{", ",", " ", ":", ">", "\\"].some((s) => css.includes(e + s)); };
const missing = [...cls].filter((c) => has(orig, c) && !has(purged, c));
console.log("classes on", page, "defined in site.css but gone after purge:", missing.length);
console.log(missing.join("  "));
