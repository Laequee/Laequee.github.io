import Link from "next/link";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{profile.headline}</p>
            <p className="mt-1 text-sm text-ink-faint">{profile.location}</p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <span className="annot mb-1">Case studies</span>
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="sweep w-fit text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {project.title}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <span className="annot mb-1">Elsewhere</span>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="sweep w-fit text-sm text-ink-soft transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="sweep w-fit text-sm text-ink-soft transition-colors hover:text-ink"
            >
              GitHub
            </a>
            {profile.assets.hasCv && (
              <a
                href={profile.cv}
                className="sweep w-fit text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Download CV
              </a>
            )}
          </nav>

          <div className="flex flex-col gap-2.5">
            <span className="annot mb-1">Direct</span>
            <a
              href={`mailto:${profile.contact.email}`}
              className="sweep w-fit break-all text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {profile.contact.email}
            </a>
            <a
              href={profile.contact.phoneHref}
              className="sweep w-fit text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {profile.contact.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="annot">
            © {year} {profile.name}
          </p>
          <p className="annot">Drawn in Next.js · Set in Archivo, Inter &amp; JetBrains Mono</p>
        </div>
      </div>
    </footer>
  );
}
