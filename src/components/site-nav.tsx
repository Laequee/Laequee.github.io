"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks } from "@/components/nav-links";
import { ScrambleText } from "@/components/motion/scramble-text";
import { toneText, wordmark } from "@/components/wordmark";
import { profile } from "@/content/profile";

export function SiteNav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        lifted ? "border-b border-rule bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="font-display text-xl font-bold tracking-tight"
        >
          {wordmark.map((letter, i) => (
            <span key={i} className={toneText[letter.tone]}>
              {letter.char}
            </span>
          ))}
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="sweep font-display text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                <ScrambleText text={link.label} trigger="hover" />
              </Link>
            </li>
          ))}
          {profile.cvUrl && (
            <li>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="sweep font-display text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                cv ↗
              </a>
            </li>
          )}
          <li>
            <a href={`mailto:${profile.contact.email}`} className="btn px-4 py-2 text-[13px]">
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
          className="btn-ghost size-9 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-nav" className="border-t border-rule bg-bg px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-display text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {profile.cvUrl && (
            <li>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="block py-2.5 font-display text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                cv ↗
              </a>
            </li>
          )}
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              className="btn mt-3 w-full justify-center px-4 py-2.5 text-[13px]"
            >
              Hire me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
