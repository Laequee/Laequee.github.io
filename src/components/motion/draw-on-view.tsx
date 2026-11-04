"use client";

import { useEffect, useRef } from "react";

/**
 * Marks its wrapper `data-drawn="true"` the first time it scrolls into view.
 * Any `sketch-path` / `sketch-note` inside then draws itself in (see
 * globals.css), exactly as a project card does on hover. Writes the attribute
 * straight to the node, so nothing re-renders.
 *
 * `touchOnly` is for the project cards: on a phone there is no hover to draw
 * them, so the wrapper starts at data-drawn="false" (card lowered, sketch
 * hidden) and flips to "true" as it scrolls in. With a mouse, or with reduced
 * motion, it does nothing and the card keeps its hover behaviour.
 */
export function DrawOnView({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.5,
  touchOnly = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  threshold?: number;
  touchOnly?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (touchOnly) {
      if (window.matchMedia("(hover: hover), (prefers-reduced-motion: reduce)").matches) return;
      node.dataset.drawn = "false";
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.drawn = "true";
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, touchOnly]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
