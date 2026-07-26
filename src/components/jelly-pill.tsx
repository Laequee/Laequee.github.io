"use client";

import { useCallback, useRef } from "react";

/**
 * A pill that deforms toward the pointer.
 *
 * Jelly UI's buttons do not scale — they warp. The edge nearest the cursor
 * bulges, the opposite edge flattens, and the whole shape leans. That is why
 * their bundle computes scale pairs like `scale(c, p)` and `scale(i, 2 - i)`
 * rather than shipping fixed keyframes: the deformation is a function of where
 * the pointer is, so it cannot be expressed as a CSS animation.
 *
 * This publishes three custom properties and lets CSS do the rest:
 *   --jx  horizontal pointer offset from centre, -1 to 1
 *   --jy  vertical offset, -1 to 1
 *   --jd  distance from centre, 0 to 1, for magnitude
 */
export function JellyPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const track = useCallback((event: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));
    const jx = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
    const jy = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));

    el.style.setProperty("--jx", jx.toFixed(3));
    el.style.setProperty("--jy", jy.toFixed(3));
    el.style.setProperty("--jd", Math.min(1, Math.hypot(jx, jy)).toFixed(3));
  }, []);

  /* Releasing snaps the shape back through the spring in the stylesheet. */
  const release = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--jx", "0");
    el.style.setProperty("--jy", "0");
    el.style.setProperty("--jd", "0");
  }, []);

  return (
    <span ref={ref} onPointerMove={track} onPointerLeave={release} className={className}>
      {children}
    </span>
  );
}
