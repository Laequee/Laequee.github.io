"use client";

import { useEffect, useId, useRef } from "react";

const SPEED = 60;

/**
 * A ribbon of text riding a wave across the page, endlessly. The phrase is
 * repeated along an SVG path and the start offset slides by exactly one
 * repetition before wrapping, so the loop has no seam.
 */
export function TextLoop({ phrase }: { phrase: string }) {
  const id = useId().replace(/:/g, "");
  const textRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const path = textRef.current;
    const measure = measureRef.current;
    if (!path || !measure) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let unit = measure.getComputedTextLength();
    let offset = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(path.ownerSVGElement ?? path);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        if (!unit) unit = measure.getComputedTextLength();
        offset = unit ? (offset + SPEED * dt) % unit : 0;
        path.setAttribute("startOffset", `${-offset}`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [phrase]);

  /*
   * Drawn in plain pixels with no viewBox, so the band keeps the same height
   * and type size at every screen width instead of scaling up on wide ones.
   * The amplitude plus half the stroke stays inside the 84px box: no clipping.
   */
  const wave =
    "M -60 42 C 240 18, 440 66, 740 42 S 1240 18, 1540 42 S 2040 66, 2340 42 S 2840 18, 3140 42 S 3640 66, 3940 42";
  const repeated = Array.from({ length: 16 }, () => phrase).join("");

  return (
    <div aria-hidden="true" className="relative select-none overflow-hidden">
      <svg className="block h-[84px] w-full">
        <defs>
          <path id={`wave-${id}`} d={wave} />
        </defs>
        <use href={`#wave-${id}`} fill="none" stroke="var(--tone-teal)" strokeWidth={30} strokeLinecap="round" />
        {/* Invisible copy of one repetition, measured to know where the loop wraps. */}
        <text ref={measureRef} className="font-display text-[15px] font-semibold tracking-[0.04em]" opacity={0}>
          {phrase}
        </text>
        <text className="font-display text-[15px] font-semibold tracking-[0.04em]" fill="var(--on-tone)" dominantBaseline="central">
          <textPath ref={textRef} href={`#wave-${id}`}>
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
