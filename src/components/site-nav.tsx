"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { profile } from "@/content/profile";

/* Absolute hrefs so these still resolve from a /projects/<slug>/ page. */
const links = [
  /* Anchor stays #work — renaming it would break links already shared. */
  { href: "/#work", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A hash link within the same page doesn't remount, so close the menu manually. */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        lifted ? "border-b border-rule bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-1.5">
          <span className="text-lg font-bold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
            Laeque
          </span>
          <span className="text-lg text-accent sm:text-xl">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="sweep text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              className="neon-outline rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="neon-outline grid size-9 place-items-center rounded-full md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-nav" className="border-t border-rule bg-bg px-5 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-3 block rounded-full border border-accent px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-accent"
            >
              Hire me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
