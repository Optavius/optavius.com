// Pull the articles published in RankAI into content/rankai-articles.json, so the static export renders them under
// /resources/<slug>. Runs in the deploy workflow before the build (daily schedule + every push). If RankAI cannot be
// reached the existing file is kept, so a RankAI outage never breaks a deploy.
// Usage: node tooling/rankai-sync.js   (env: RANKAI_PROJECT_ID, NEXT_PUBLIC_SITE_URL)
const fs = require("fs"), path = require("path");
const PROJECT = process.env.RANKAI_PROJECT_ID || "cmvv092qk0002snhidr2yczcf";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.optavius.com").replace(/\/$/, "");
const API = `https://rankai.ai/api/v1/${PROJECT}/articles`;
const OUT = path.join(__dirname, "..", "content", "rankai-articles.json");

const getJson = async (url) => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url.split("?")[0]}`);
  const body = await res.json();
  if (!body.success) throw new Error(`RankAI error for ${url.split("?")[0]}: ${body.error || "unknown"}`);
  return body;
};

(async () => {
  const list = [];
  for (let page = 1; ; page++) {
    const { data, pagination } = await getJson(`${API}?page=${page}&limit=100`);
    list.push(...data);
    if (!pagination || page >= pagination.totalPages) break;
  }
  const articles = [];
  for (const a of list) {
    // publishedUrl lets RankAI track where the article lives (trailing slash: the export uses trailingSlash)
    const publishedUrl = encodeURIComponent(`${SITE}/resources/${a.slug}/`);
    const { data } = await getJson(`${API}/${encodeURIComponent(a.slug)}?format=html&publishedUrl=${publishedUrl}`);
    const words = data.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    articles.push({
      slug: a.slug,
      title: data.title,
      description: data.description || a.description || "",
      publishedDate: data.publishedDate || a.publishedDate || null,
      featuredImageUrl: data.featuredImageUrl || a.featuredImageUrl || null,
      readTime: Math.max(1, Math.round(words / 230)),
      html: data.content,
    });
  }
  articles.sort((x, y) => String(y.publishedDate).localeCompare(String(x.publishedDate)));
  fs.writeFileSync(OUT, JSON.stringify(articles, null, 1) + "\n");
  console.log(`rankai-sync: ${articles.length} published article(s) written to content/rankai-articles.json`);
})().catch((e) => {
  console.warn(`rankai-sync: kept the existing content/rankai-articles.json (${e.message})`);
});
