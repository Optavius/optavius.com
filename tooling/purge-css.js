// Drop unused rules from the design-system stylesheet inside the static export (out/). Run after next build.
// Keeps a rule when every class in its selector appears as a token in the exported HTML or JavaScript, or matches a
// JavaScript string prefix ending in "-" or ":" (classes built at runtime like "place-self-" + side). At-rules that do
// not target classes (@font-face, @keyframes, @property, :root variables, element selectors) are always kept.
// Only the big design-system chunk is purged; the site's own small stylesheets are left as they are.
const fs = require("fs"), path = require("path");
const postcss = require("postcss");
const OUT = "out";
const walk = (d, o = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, o) : o.push(p); } return o; };
const files = walk(OUT);
const html = files.filter((f) => f.endsWith(".html")).map((f) => fs.readFileSync(f, "utf8")).join("\n");
const js = files.filter((f) => f.endsWith(".js")).map((f) => fs.readFileSync(f, "utf8")).join("\n");
const tokens = new Set();
for (const m of html.matchAll(/class(?:Name)?="([^"]*)"/g)) for (const t of m[1].split(/\s+/)) if (t) tokens.add(t);
// JavaScript: every string literal, split on whitespace; also the RSC payload inside HTML (escaped quotes)
const prefixes = new Set();
for (const t of (js + "\n" + html).replace(/\\"/g, '"').split(/[\s"'`]+/)) { if (!t) continue; tokens.add(t); if (/[-:]$/.test(t)) prefixes.add(t); }
const prefixList = [...prefixes];
const keepClass = (c) => tokens.has(c) || prefixList.some((p) => c.startsWith(p));
// unescape a CSS class selector back to the class name as written in markup
const unescape = (s) => s.replace(/\\([0-9a-fA-F]{1,6} ?|.)/g, (_, ch) => (/^[0-9a-fA-F]/.test(ch) ? String.fromCodePoint(parseInt(ch.trim(), 16)) : ch));
// classes inside :not(...) do not need to exist for the rule to matter, so they are ignored
const stripNot = (s) => { let prev; do { prev = s; s = s.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ""); } while (s !== prev); return s; };
const classesIn = (selector) => { const out = []; const re = /\.((?:\\.|[^\s.#:>+~\[\],()])+)/g; let m; const s = stripNot(selector); while ((m = re.exec(s))) out.push(unescape(m[1])); return out; };
const cssFiles = files.filter((f) => f.endsWith(".css") && fs.statSync(f).size > 100000);
for (const f of cssFiles) {
  const before = fs.statSync(f).size; const root = postcss.parse(fs.readFileSync(f, "utf8"));
  let dropped = 0, kept = 0;
  root.walkRules((rule) => {
    if (rule.parent && rule.parent.type === "atrule" && /keyframes|font-face|property|page/.test(rule.parent.name)) return;
    const parts = rule.selectors.filter((sel) => { const cls = classesIn(sel); return cls.length === 0 || cls.every(keepClass); });
    if (parts.length === 0) { rule.remove(); dropped++; } else { if (parts.length !== rule.selectors.length) rule.selectors = parts; kept++; }
  });
  root.walkAtRules((at) => { if (/media|supports|layer|container/.test(at.name) && at.nodes && at.nodes.length === 0) at.remove(); });
  fs.writeFileSync(f, root.toString());
  console.log(path.basename(f), "kept", kept, "dropped", dropped, "bytes", before, "->", fs.statSync(f).size);
}
