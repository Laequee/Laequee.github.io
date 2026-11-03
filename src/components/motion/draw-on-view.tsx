"use client";

import { useEffect, useRef } from "react";

/**
 * Marks its wrapper `data-drawn="true"` the first time it scrolls into view.
 * Any `sketch-path` / `sketch-note` inside then draws itself in (see
 * globals.css), exactly as a project card does on hover. Writes the attribute
 * straight to the node, so nothing re-renders.
 */
export function DrawOnView({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
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
  }, [threshold]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
