// Record the pixel size of every image in public/ so <Img> can set width and height. Run from the project root: node tooling/image-sizes.js
const fs = require("fs"), path = require("path"), sharp = require("sharp");
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; };
(async () => {
  const out = {};
  for (const f of walk("public").filter((f) => /\.(jpe?g|png|webp|svg|avif)$/i.test(f) && !f.includes(path.sep + "og" + path.sep))) {
    try { const m = await sharp(f).metadata(); if (m.width && m.height) out["/" + f.split(path.sep).slice(1).join("/")] = [m.width, m.height]; } catch {}
  }
  fs.writeFileSync("content/image-sizes.json", JSON.stringify(out, null, 0));
  console.log("sizes", Object.keys(out).length);
})();
