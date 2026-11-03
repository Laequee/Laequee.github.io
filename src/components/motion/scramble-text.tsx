"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01";
const DURATION = 650;

/**
 * Text that decodes in like terminal output: characters cycle through glyphs
 * and lock in left to right. `view` runs once when it scrolls into sight,
 * `hover` runs each time the pointer enters the nearest link or button.
 *
 * Writes straight to the DOM node instead of through state, so a heading
 * scrambling at 60fps never re-renders React. Screen readers get the real
 * text from the sr-only copy; the animated copy is hidden from them.
 */
export function ScrambleText({
  text,
  trigger = "view",
  className = "",
}: {
  text: string;
  trigger?: "view" | "hover";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      /* Each character gets its own lock-in time, so it doesn't read as a wipe. */
      const lockAt = [...text].map((_, i) => (i / text.length) * 0.75 + Math.random() * 0.25);

      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        node.textContent = [...text]
          .map((char, i) =>
            char === " " || p >= lockAt[i] ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join("");
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if (trigger === "hover") {
      const target = node.closest("a, button") ?? node;
      target.addEventListener("mouseenter", run);
      return () => {
        cancelAnimationFrame(frame);
        target.removeEventListener("mouseenter", run);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [text, trigger]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
