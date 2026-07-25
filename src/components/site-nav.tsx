"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";

/* Absolute hrefs so these still resolve from a /projects/<slug>/ page. */
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onProjectPage = pathname.startsWith("/projects");

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        lifted ? "border-b border-rule bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center border border-rule-strong font-mono text-[10px] font-medium transition-colors group-hover:border-blue group-hover:text-blue">
            {profile.initials}
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="sweep text-[13px] text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {onProjectPage && (
            <Link
              href="/#work"
              className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-blue md:hidden"
            >
              ← Index
            </Link>
          )}

          {profile.assets.hasCv && (
            <a
              href={profile.cv}
              className="hidden border border-rule px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-blue hover:text-blue sm:block"
            >
              CV
            </a>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
