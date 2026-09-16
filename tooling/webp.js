// Convert heavy photos to WebP and point the content at the new files. Run from the project root: node tooling/webp.js
const fs = require("fs"), path = require("path"), sharp = require("sharp");
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; };
(async () => {
  let shared = fs.readFileSync("content/shared.ts", "utf8"); let n = 0, saved = 0;
  for (const f of walk("public/optavius").filter((f) => /\.jpe?g$/i.test(f))) {
    const rel = "/" + f.split(path.sep).slice(1).join("/"); const webp = f.replace(/\.jpe?g$/i, ".webp"); const relWebp = rel.replace(/\.jpe?g$/i, ".webp");
    const before = fs.statSync(f).size;
    await sharp(f).webp({ quality: 82 }).toFile(webp);
    saved += before - fs.statSync(webp).size; n++;
    if (shared.includes(rel)) { shared = shared.split(rel).join(relWebp); fs.unlinkSync(f); }
    else if (shared.includes(path.basename(rel))) { shared = shared.split(path.basename(rel)).join(path.basename(relWebp)); fs.unlinkSync(f); }
    else fs.unlinkSync(f);
  }
  fs.writeFileSync("content/shared.ts", shared);
  console.log("converted", n, "saved MB", (saved / 1048576).toFixed(1), "jpg refs left:", (shared.match(/\.jpe?g"/g) || []).length);
})();
