"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Holds the project cards stacked and fanned until the row scrolls into view,
 * then deals them out into the grid, and gathers them back into the stack
 * when the reader scrolls up past them, so the deal plays again on the way
 * down. Scrolling on past the row downward leaves them dealt: the stack only
 * re-forms when the row drops below the viewport, never above it.
 *
 * The fan itself is CSS (`fan-card` in globals.css) and only applies from lg
 * up; this component just flips data-spread. Reduced-motion visitors get the
 * grid straight away and keep it.
 */
export function CardFan({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduce) {
          setSpread(true);
          observer.disconnect();
        } else if (entry.isIntersecting) {
          setSpread(true);
        } else if (entry.boundingClientRect.top > 0) {
          /* Below the fold again: the reader has scrolled back up. */
          setSpread(false);
        }
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} data-spread={spread} className={className}>
      {children}
    </ul>
  );
}
