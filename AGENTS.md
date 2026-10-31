# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project overview

`laeque-portfolio` is the source for **https://laequee.github.io** — a single-owner
portfolio site. Next.js 16 App Router, React 19, Tailwind 4, TypeScript, exported as
**static HTML** and served by GitHub Pages.

The site is live and public. A push to `main` deploys it. There is no staging.

## Project structure

- `src/app/` — routes. `page.tsx` (home), `projects/[slug]/page.tsx`, `layout.tsx`,
  `not-found.tsx`, `globals.css`.
- `src/content/` — **all copy and data** live here as typed TS modules (`projects.ts`,
  `experience.ts`, `skills.ts`, `courses.ts`, `principles.ts`, `profile.ts`).
  Wording, metrics, and ordering changes belong in this directory, not in components.
- `src/components/` — presentational only, grouped by area (`home/`, `project/`,
  `blueprint/`) with shared pieces at the top level.
- `src/assets/` — fonts bundled for the OG card generator.
- `tools/` — not part of the build. See "The OG card" below.
- `public/` — served verbatim, including the committed `og.png`.

Metrics carrying `pending: true` in `src/content/projects.ts` are numbers the owner
does not have yet. They render as a dash. **Never invent a value to replace one.**

## Setup & build

```bash
npm ci          # Node 22, matching the CI workflow
npm run dev     # local dev server
npm run build   # static export -> ./out
npm run lint    # eslint (flat config, next core-web-vitals + typescript)
```

## Verification

There is **no test suite**. Do not claim tests passed, and do not add a testing
framework without being asked. What stands in for tests:

- `npm run build` is the real gate — it type-checks the whole project and will fail
  on any static-export violation. Run it before saying a change works.
- `npm run lint` must be clean.
- If a command fails, report the failure verbatim. Do not guess at the cause and do
  not present an assumption as a confirmed result.

## Static export constraints

`next.config.ts` sets `output: "export"`. There is no Node server at runtime, so the
following **do not work and must not be introduced**:

- Route handlers, server actions, middleware, ISR, or any `revalidate` behaviour.
- `next/image` optimization — `images.unoptimized` is on. Keep it on.
- Dynamic routes without `generateStaticParams`.

`trailingSlash: true` is deliberate: static hosts resolve `projects/<slug>/index.html`
but not `projects/<slug>.html`. Do not remove it.

The repo is a **user page** served from the domain root, so `basePath` and
`assetPrefix` are intentionally unset. They are only needed if the site ever moves to
a project repo — and then both must be set together or every asset URL breaks.

## The OG card

`tools/og-card.tsx` is a generator kept **outside** `src/app/` on purpose. As a route
under static export it would emit an extensionless `out/opengraph-image`, which Pages
serves as `application/octet-stream` and crawlers reject. The card is therefore
committed as a real `public/og.png` and referenced explicitly from `layout.tsx`.

Do not move this file into `src/app/`. To regenerate it, follow the five-step
procedure in the file's own header comment, then delete the temporary route again.

## Code style

- Formatter and linter: **ESLint only** (`npm run lint`). There is no Prettier —
  match the formatting of neighbouring files by hand.
- Follow the patterns already in adjacent components; this codebase is internally
  consistent and small enough to read before writing.
- Comments here explain **why**, not what. The existing headers in `next.config.ts`,
  `tools/og-card.tsx`, and `src/content/projects.ts` are the reference standard.
  Do not add comments that restate the code.
- Do not reformat or restructure code you are not otherwise changing.

## Git workflow

- Branch: `main`. Remote: `origin` → `Laequee/Laequee.github.io`.
- Commit subjects are **sentence-case imperative, one line, no prefix and no scope** —
  "Soften the blanket no-downtime claim in the profile summary", not
  `fix(profile): soften claim`. Describe the editorial or visual outcome, not the file.
- Do **not** add "Generated with Claude Code", `Co-Authored-By`, or any other trailer
  to commits or PRs.
- **Never commit or push unless explicitly asked.** A push to `main` publishes to the
  live site through `.github/workflows/deploy.yml`.

## Boundaries

- Do not modify unrelated files or widen scope beyond what was requested.
- Do not add dependencies without asking. The dependency list is deliberately three
  packages deep.
- Never commit secrets or `.env*` files. `/out`, `/.next`, and `/node_modules` are
  gitignored — keep them that way.
- Do not rewrite the owner's biographical or case-study copy to sound more impressive.
  Accuracy outranks polish; every claim on this site is about a real person's work.
