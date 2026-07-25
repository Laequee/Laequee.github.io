import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * The repo is `laequee.github.io` — a user page served from the domain root — so no
 * basePath or assetPrefix is needed. If this ever moves to a project repo, both must
 * be set to `/<repo-name>` or every asset URL breaks.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Pages has no Next server, so the image optimizer cannot run.
  images: { unoptimized: true },

  // Emits `projects/<slug>/index.html` rather than `projects/<slug>.html`, which is
  // what static hosts resolve correctly for a directory-style URL.
  trailingSlash: true,
};

export default nextConfig;
