/*
 * GENERATOR for public/og.png — deliberately not part of the app build.
 *
 * As a route under `output: "export"` this emits `out/opengraph-image` with no
 * file extension. GitHub Pages assigns MIME types by extension, so that file is
 * served as application/octet-stream and crawlers reject it. The card is
 * therefore committed as a real .png and referenced explicitly in layout.tsx.
 *
 * To regenerate after changing the name, stats, or palette:
 *   1. cp tools/og-card.tsx src/app/opengraph-image.tsx
 *   2. npm run build
 *   3. cp out/opengraph-image public/og.png
 *   4. rm src/app/opengraph-image.tsx
 *   5. npm run build      # so the HTML stops referencing the route
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { headlineStats, profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.headline}`;

/* Required under output: "export" — the image is rendered once at build time. */
export const dynamic = "force-static";

/*
 * Share card for LinkedIn, X, Slack, WhatsApp.
 *
 * Rendered by satori, which supports a subset of CSS: flexbox only (no grid),
 * and any element with more than one child needs an explicit display value.
 * The site's tokens are CSS custom properties and are not available here, so
 * the palette is repeated as literals — keep these in step with globals.css.
 */
const INK = "#ffffff";
const INK_SOFT = "#a8b3c7";
const INK_FAINT = "#6b7891";
const ACCENT = "#00e5ff";
const NAME = "#ff5fa2";
const BG = "#05070f";
const RULE = "#1a2236";

export default async function OpenGraphImage() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/JetBrainsMono-Bold.ttf")),
    readFile(join(process.cwd(), "src/assets/JetBrainsMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          // Graph paper, matching the site's fixed grid field.
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "68px 72px",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: NAME }}>{profile.name}</span>
              <span style={{ fontSize: 22, color: INK_FAINT, marginLeft: 18 }}>
                · {profile.title}
              </span>
            </div>

            <span style={{ fontSize: 62, fontWeight: 700, color: INK, marginTop: 26 }}>
              Cloud, Identity &amp;
            </span>
            <span style={{ fontSize: 62, fontWeight: 700, color: ACCENT, marginTop: 4 }}>
              Endpoint Engineering
            </span>
          </div>

          {/* Echo of the hero's dashed ring. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              borderRadius: 150,
              border: `4px dashed ${ACCENT}`,
            }}
          >
            <span style={{ fontSize: 52, fontWeight: 700, color: ACCENT }}>{profile.initials}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/*
            The URL sits on the discipline row, not alongside the stats. Sharing
            a row with four stat labels overflowed the card and clipped it at the
            right edge — there is no room for a fifth column at this width.
          */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 22, color: INK_SOFT }}>{profile.discipline}</span>
            <span style={{ fontSize: 20, color: ACCENT }}>laequee.github.io</span>
          </div>

          <div style={{ display: "flex", height: 1, backgroundColor: RULE, margin: "30px 0" }} />

          <div style={{ display: "flex" }}>
            {headlineStats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: i === 0 ? 0 : 44,
                }}
              >
                <span style={{ fontSize: 38, fontWeight: 700, color: INK }}>
                  {stat.value.toLocaleString("en-US")}
                  {stat.suffix}
                </span>
                <span style={{ fontSize: 16, color: INK_FAINT, marginTop: 6 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
