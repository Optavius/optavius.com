// After `next build` (static export). Run from the project root: node tooling/post-export.js
//  1. sets the html lang attribute per language folder
//  2. defers the framework JavaScript until the page has loaded: the pages are complete static HTML, so nothing visible waits
//     for hydration, and the scripts no longer compete with the stylesheet and the headline for bandwidth on phones
//  3. moves the secondary web fonts (italic, medium, mono) into a stylesheet that is applied after load, so only the
//     embedded headline font is on the critical path
const fs = require("fs"), path = require("path");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; };
const htmlFiles = walk("out").filter((f) => f.endsWith(".html"));

// 1. language
let n = 0;
for (const lang of ["nl", "de"]) {
  for (const f of htmlFiles.filter((f) => f.startsWith(path.join("out", lang) + path.sep))) {
    const s = fs.readFileSync(f, "utf8"); const t = s.replace(/<html([^>]*)\slang="en"/, `<html$1 lang="${lang}"`);
    if (t !== s) { fs.writeFileSync(f, t); n++; }
  }
}
console.log("lang set on", n, "pages");

// 3. late fonts: pull the external @font-face rules out of the CSS chunk
const cssDir = path.join("out", "_next", "static", "chunks");
const cssFiles = fs.existsSync(cssDir) ? fs.readdirSync(cssDir).filter((f) => f.endsWith(".css")).map((f) => path.join(cssDir, f)) : [];
let late = "";
for (const f of cssFiles) {
  let css = fs.readFileSync(f, "utf8"); const faces = css.match(/@font-face\{[^}]*url\([^)]*\/fonts\/[^}]*\}/g) || [];
  if (!faces.length) continue;
  for (const face of faces) { css = css.replace(face, ""); late += face + "\n"; }
  fs.writeFileSync(f, css);
}
if (late) { fs.mkdirSync(path.join("out", "fonts"), { recursive: true }); fs.writeFileSync(path.join("out", "fonts", "late.css"), late); }
console.log("late font faces", (late.match(/@font-face/g) || []).length);

// 2. deferred scripts
let d = 0;
for (const f of htmlFiles) {
  let s = fs.readFileSync(f, "utf8"); const urls = [];
  s = s.replace(/<script src="([^"]*\/_next\/static\/chunks\/[^"]+\.js)"(?![^>]*noModule)[^>]*><\/script>/g, (_, u) => { urls.push(u); return ""; });
  s = s.replace(/<link rel="preload" as="script"[^>]*>/g, "");
  const lateCss = late ? `${BASE}/fonts/late.css` : "";
  // after the load event: attach the framework scripts and the secondary fonts stylesheet
  const loader = `<script>(function(){var u=${JSON.stringify(urls)},c=${JSON.stringify(lateCss)};function go(){if(c){var l=document.createElement("link");l.rel="stylesheet";l.href=c;document.head.appendChild(l)}u.forEach(function(x){var e=document.createElement("script");e.src=x;e.async=true;document.body.appendChild(e)})}if(document.readyState==="complete")setTimeout(go,1200);else window.addEventListener("load",function(){setTimeout(go,1200)})})()</script>`;
  s = s.replace("</body>", loader + (lateCss ? `<noscript><link rel="stylesheet" href="${lateCss}"></noscript>` : "") + "</body>");
  fs.writeFileSync(f, s); d++;
}
console.log("scripts deferred on", d, "pages");
