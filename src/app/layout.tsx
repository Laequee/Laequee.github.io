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
    type: "website",
    locale: "en_AE",
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
