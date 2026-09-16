// After `next build` (static export): set the html lang attribute per language folder. Run from the project root: node tooling/post-export.js
const fs = require("fs"), path = require("path");
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; };
let n = 0;
for (const lang of ["nl", "de"]) {
  const dir = path.join("out", lang); if (!fs.existsSync(dir)) continue;
  for (const f of walk(dir).filter((f) => f.endsWith(".html"))) {
    const s = fs.readFileSync(f, "utf8"); const t = s.replace(/<html([^>]*)\slang="en"/, `<html$1 lang="${lang}"`);
    if (t !== s) { fs.writeFileSync(f, t); n++; }
  }
}
console.log("lang set on", n, "pages");
