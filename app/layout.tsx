import type { Metadata } from "next";
import { BASE, SITE_URL } from "@/lib/base";
import "./styles/fonts.css";
import "./styles/site.css";
import "./styles/extra.css";
import "./styles/mockups.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI voice agents for eye care | Optavius",
  description: "AI voice agents for eye-care providers that answer questions, schedule appointments and handle routine requests, 24/7.",
  icons: { icon: [{ url: `${BASE}/favicon.ico`, sizes: "32x32" }, { url: `${BASE}/icon.svg`, type: "image/svg+xml" }], apple: `${BASE}/apple-icon.png` },
  manifest: `${BASE}/site.webmanifest`,
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport = { themeColor: "#006838" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="gtamerica_6d0b17ea-module__xVsKFa__variable gtamericamono_7f09841-module__x8mR4a__variable"
      style={{ "--sticky-navigation-height": "72px" } as React.CSSProperties}
    >
      <body className="flex min-h-screen flex-col text-primary antialiased">{children}</body>
    </html>
  );
}
