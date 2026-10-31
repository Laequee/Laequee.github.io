"use client";

import { useEffect } from "react";

/**
 * Publishes the pointer position as --mx / --my on the document root, so the
 * lit grid layer can mask itself around the cursor.
 *
 * Renders nothing. Coordinates are viewport-relative because the grid layer is
 * fixed, which means no scroll listener is needed — the lattice and the mask
 * move together.
 */
export function PointerGlow() {
  useEffect(() => {
    // A fine pointer is the only thing that can reveal it, and reduced-motion
    // users have asked not to be followed around the page.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    function paint() {
      frame = 0;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
    }

    /* pointermove fires far faster than the display refreshes. */
    function onMove(event: PointerEvent) {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    }

    /* Park it offscreen when the pointer leaves, so the glow doesn't stick. */
    function onLeave() {
      root.style.setProperty("--mx", "-9999px");
      root.style.setProperty("--my", "-9999px");
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      onLeave();
    };
  }, []);

  return null;
}
