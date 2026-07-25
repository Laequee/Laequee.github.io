import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
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

/**
 * Applies the stored theme before first paint. Inlined deliberately — anything
 * async here would show a flash of the wrong background on load.
 */
const themeScript = `
try {
  var stored = localStorage.getItem('theme');
  var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative flex min-h-full flex-col">
        {/* The drawing sheet. Fixed, non-interactive, sits behind everything. */}
        <div aria-hidden="true" className="blueprint-grid pointer-events-none fixed inset-0 -z-10" />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
