import Link from "next/link";

import { navLinks } from "@/components/nav-links";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-soft">{profile.headline}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="sweep text-ink-soft transition-colors hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="sweep text-ink-soft transition-colors hover:text-ink">
              linkedin
            </a>
          </li>
          {profile.cvUrl && (
            <li>
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="sweep text-ink-soft transition-colors hover:text-ink">
                cv
              </a>
            </li>
          )}
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" className="sweep text-ink-soft transition-colors hover:text-ink">
              github
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <p className="annot">
          © {year} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
