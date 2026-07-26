import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/* Prose only — long case-study paragraphs, where full monospace gets tiring. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/*
 * The share card is a committed PNG rather than Next's opengraph-image.tsx
 * convention. Under `output: "export"` that convention emits the file as
 * `out/opengraph-image` with no extension, and GitHub Pages assigns MIME types
 * by extension — it would be served as application/octet-stream and every
 * crawler would reject it. A real .png in /public is unambiguous everywhere.
 *
 * Regenerate with tools/og-card.tsx; the header comment there has the steps.
 */
const OG_IMAGE = "/og.png";
const OG_ALT = `${profile.name} — ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://laequee.github.io"),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  keywords: [
    "Mohammed Laeque",
    "Microsoft 365",
    "Intune",
    "Entra ID",
    "Active Directory",
    "Endpoint Management",
    "Cloud Infrastructure Engineer",
    "Abu Dhabi",
    "UAE",
    "Tenant Migration",
    "Zero Trust",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description: profile.intro,
    url: "https://laequee.github.io",
    siteName: profile.name,
    type: "website",
    locale: "en_AE",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
  },
  /*
   * summary_large_image, not the default summary — with a bare `summary` card
   * and no image, every LinkedIn or Slack share renders as a grey box.
   */
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.intro,
    images: [{ url: OG_IMAGE, alt: OG_ALT }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#05070f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable} h-full`}>
      <body className="relative flex min-h-full flex-col antialiased">
        {/* Grid field, masked so it fades away from the edges. */}
        <div
          aria-hidden="true"
          className="neon-grid pointer-events-none fixed inset-0 -z-10"
          style={{
            maskImage: "radial-gradient(ellipse at 50% 0%, #000 10%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, #000 10%, transparent 80%)",
          }}
        />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
