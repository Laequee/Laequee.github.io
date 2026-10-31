# laequee.github.io

Portfolio for Mohammed Laeque — Cloud, Identity & Endpoint Engineering.

Next.js 16 (App Router) · Tailwind v4 · TypeScript, statically exported and served
from GitHub Pages at <https://laequee.github.io>.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

To exercise the real static bundle rather than the dev server:

```bash
npm run build
npx serve out
```

## Where the content lives

All copy sits in `src/content/`. No component hardcodes content, so updating a metric
is a one-line edit in one known file.

| File | Holds |
|---|---|
| `profile.ts` | Name, contact, availability, headline stats, education, languages |
| `experience.ts` | The four roles, most recent first |
| `projects.ts` | Case studies — drives both the home index and every detail page |
| `principles.ts` | The three engineering principles the CV closes on |
| `skills.ts` | Twelve skill domains and the hero ticker list |
| `courses.ts` | The eight completed course tracks |

Content is kept in step with the CV at `Claude WORKS/WORK Related/CV`. Where the
two disagree the CV wins — it is the document being sent out, and two different
numbers for the same estate is worse than the smaller one.

`courses.ts` was previously `certifications.ts`. The CV lists these eight items
under COURSES COMPLETED, so the site says the same thing; the `#certifications`
anchor is kept so existing links still resolve.

### Adding a case study

Append an entry to the `projects` array in `src/content/projects.ts`. The detail page
route is generated from `slug` automatically — `generateStaticParams` reads the same
array, so no route file needs touching.

### Outstanding content

Metrics marked `pending: true` render as a dash with "to be confirmed" rather than a
guess. Each project also carries a `needs` array listing what is still missing; those
render in a panel on the detail page **only when running locally** (`NODE_ENV`
development) and never reach the deployed site.

```bash
# everything still outstanding
grep -n "pending: true" src/content/projects.ts
```

### Assets

`profile.assets` gates the photo and CV. The photo is in place; `hasCv` is still
`false`, so the hero shows "Get in touch" instead of "View CV" rather than
shipping a link that 404s. To enable the CV:

1. Drop the PDF at `public/mohammed-laeque-cv.pdf`
2. Flip `hasCv` to `true` in `src/content/profile.ts`

`public/og.png` is a committed render of `tools/og-card.tsx`, which reads
`profile` and `headlineStats`. Any change to the name, title, discipline lines
or headline stats leaves it stale until it is regenerated — the steps are in the
header comment of that file.

## Design

"Blueprint" — a technical-drawing language: graph-paper field, figure numbering,
dimension lines with tick ends, registration marks, monospace annotation, tabular
numerals so metrics align. Two themes (drafting paper / cyanotype) with an inline
pre-paint script so there is no flash of the wrong background.

Tokens live in `src/app/globals.css`. Change a colour there and it propagates
everywhere; nothing hardcodes a hex value.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `./out`.

Repo settings → Pages → Source must be set to **GitHub Actions** (not "Deploy from a
branch"), or the workflow succeeds while the site never updates.

Because this is a user-page repo served from the domain root, `next.config.ts` needs no
`basePath`. If the site ever moves to a project repo, `basePath` and `assetPrefix` must
both be set to `/<repo-name>`.
