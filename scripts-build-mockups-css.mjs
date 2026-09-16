// Generate the scoped Tailwind CSS for the mockup components and drop every utility that site.css already defines,
// so the original stylesheet's cascade order is never changed. Run: node scripts-build-mockups-css.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import postcss from "postcss";
execFileSync("npx", ["@tailwindcss/cli", "-i", "app/styles/mockups.src.css", "-o", "app/styles/mockups.gen.css", "--minify"], { stdio: "inherit", shell: true });
const site = fs.readFileSync("app/styles/site.css", "utf8");
// class names keep their backslash escapes (e.g. `w-\[70\%\]`), so `\\.` must be part of the name pattern
const NAME = "(?:\\\\.|[A-Za-z0-9_-])+";
const siteClasses = new Set(); { const re = new RegExp("\\.(" + NAME + ")", "g"); let m; while ((m = re.exec(site))) siteClasses.add(m[1]); }
const root = postcss.parse(fs.readFileSync("app/styles/mockups.gen.css", "utf8"));
let dropped = 0, kept = 0;
root.walkRules((rule) => {
  const sels = rule.selectors; if (!sels.some((s) => s.startsWith("."))) return;
  const classes = sels.map((s) => (s.match(new RegExp("^\\.(" + NAME + ")")) || [])[1]).filter(Boolean);
  if (classes.length && classes.every((c) => siteClasses.has(c))) { rule.remove(); dropped++; } else kept++;
});
root.walkAtRules((at) => { if (/^(media|supports|layer)$/.test(at.name) && at.nodes && at.nodes.length === 0) at.remove(); });
fs.writeFileSync("app/styles/mockups.css", root.toString());
console.log("mockups.css: kept", kept, "rules, dropped", dropped, "duplicates of site.css");
