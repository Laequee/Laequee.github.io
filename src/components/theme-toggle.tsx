"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Reads the class the inline script in layout.tsx already applied, so the
 * control matches the painted theme with no hydration flash.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing — the choice just won't persist */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
      className="grid size-8 place-items-center border border-rule text-ink-soft transition-colors hover:border-blue hover:text-blue"
    >
      {/* Half-filled circle — legible in both themes, no icon dependency. */}
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
}
