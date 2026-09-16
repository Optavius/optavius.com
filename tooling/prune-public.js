// Remove files in public/ that nothing in the site references (template leftovers). Run from the project root: node tooling/prune-public.js
const fs = require("fs"), path = require("path");
const walk = (d, skip, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!skip.includes(e.name)) walk(p, skip, out); } else out.push(p); } return out; };
const srcs = walk(".", ["node_modules", ".next", ".git", "public", "tooling"]).filter((f) => /\.(ts|tsx|json|css|mjs|md)$/.test(f));
const refs = new Set(); const re = /\/(media|optavius|fonts|og|moments)[A-Za-z0-9_\-./%]*/g;
for (const f of srcs) { const s = fs.readFileSync(f, "utf8"); let m; while ((m = re.exec(s))) refs.add(decodeURIComponent(m[0]).replace(/[.,]$/, "")); }
const names = new Set([...refs].map((r) => path.basename(r)));
const pub = walk("public", []);
const keepAlways = /^public[\\/](favicon\.ico|icon\.svg|icon\.png|apple-icon\.png|og[\\/]|fonts[\\/])/;
let kept = 0, removed = 0, bytes = 0;
for (const f of pub) {
  const rel = "/" + f.split(path.sep).join("/").replace(/^public\//, "");
  const keep = keepAlways.test(f) || refs.has(rel) || names.has(path.basename(f));
  if (keep) kept++; else { bytes += fs.statSync(f).size; fs.unlinkSync(f); removed++; }
}
const prune = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) { const p = path.join(d, e.name); prune(p); if (fs.readdirSync(p).length === 0) fs.rmdirSync(p); } };
prune("public");
console.log("kept", kept, "removed", removed, "freed MB", (bytes / 1048576).toFixed(0));
