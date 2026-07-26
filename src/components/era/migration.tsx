"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CUTOVER, MIGRATION_VH, paletteAt } from "./palettes";

/**
 * The legacy-to-modern migration.
 *
 * The home page opens as a Windows Server-era console and becomes the current
 * site as you scroll. Colour tokens are interpolated straight onto
 * documentElement, so every component follows without knowing this exists;
 * fonts, corners and bevels snap at the cutover point instead of drifting,
 * because a half-rounded corner just looks like a bug.
 *
 * Renders a progress readout so the intent is legible on landing rather than
 * looking like a broken stylesheet, plus a skip for anyone who came for the
 * content and not the trick.
 */
export function Migration() {
  const pathname = usePathname();
  const active = pathname === "/";
  const [era, setEra] = useState(1);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    function reset() {
      for (const key of Object.keys(paletteAt(1))) root.style.removeProperty(key);
      root.dataset.era = "modern";
      root.style.setProperty("--era", "1");
      setEra(1);
      setEnabled(false);
    }

    // Case study pages, and anyone who asked for less motion, get the finished site.
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reset();
      return;
    }

    setEnabled(true);
    let frame = 0;
    let last = -1;

    function apply() {
      frame = 0;
      const span = window.innerHeight * MIGRATION_VH;
      const next = span > 0 ? Math.min(Math.max(window.scrollY / span, 0), 1) : 1;

      // Scroll fires far more often than the eye can resolve.
      if (Math.abs(next - last) < 0.004 && next !== 0 && next !== 1) return;
      last = next;

      for (const [key, value] of Object.entries(paletteAt(next))) {
        root.style.setProperty(key, value);
      }
      root.style.setProperty("--era", next.toFixed(3));
      root.dataset.era = next < CUTOVER ? "legacy" : "modern";
      setEra(next);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [active]);

  const skip = useCallback(() => {
    window.scrollTo({ top: window.innerHeight * MIGRATION_VH, behavior: "smooth" });
  }, []);

  if (!enabled) return null;

  const percent = Math.round(era * 100);
  const done = era >= 1;

  /* Reads as a real migration run rather than one frozen status line. */
  const status =
    era < 0.08
      ? "Legacy environment detected. Scroll to migrate."
      : era < CUTOVER
        ? "Migrating workloads and identities…"
        : era < 1
          ? "Cutover complete. Decommissioning legacy."
          : "Migration complete.";

  return (
    <aside
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 left-4 z-[60] transition-opacity duration-500"
      style={{ opacity: done ? 0 : 1 }}
    >
      <div
        className="pointer-events-auto w-[16.5rem] border text-[11px]"
        style={{
          borderColor: "var(--rule-strong)",
          background: "var(--surface)",
          color: "var(--ink)",
        }}
      >
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
        >
          <span className="font-semibold tracking-wide">Tenant Migration</span>
          <span className="tabular-nums">{percent}%</span>
        </div>

        <div className="px-2.5 py-2.5">
          <p style={{ color: "var(--ink-soft)" }}>{status}</p>

          {/* Segmented bar, as the old progress dialogs drew it. */}
          <div
            className="mt-2 flex h-3.5 gap-[2px] border p-[2px]"
            style={{ borderColor: "var(--rule-strong)", background: "var(--bg)" }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Migration progress"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="h-full flex-1"
                style={{
                  background: i < Math.round(era * 20) ? "var(--accent)" : "transparent",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={skip}
            className="mt-2.5 underline underline-offset-2"
            style={{ color: "var(--ink-faint)" }}
          >
            Skip migration
          </button>
        </div>
      </div>
    </aside>
  );
}
