import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/base";

export const dynamic = "force-static";

/** Search engines and the AI assistants that answer with citations may read everything. Bulk training scrapers may not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended"], allow: "/" },
      { userAgent: ["Bytespider", "CCBot", "Amazonbot", "PetalBot"], disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
