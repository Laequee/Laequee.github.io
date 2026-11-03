"use client";

import { useEffect, useRef } from "react";

import { toneText, wordmark } from "@/components/wordmark";

const BASE_SPEED = 38;
const SCROLL_GAIN = 0.55;
/*
 * Copies of each row laid end to end. The track wraps after one copy, so the
 * visible strip must always be covered by the copies after it: four is enough
 * for a 4K-wide window with the shortest row.
 */
const COPIES = 4;

/**
 * Rows of tool names drifting sideways. Scrolling speeds them up, and
 * scrolling back up turns them around, so the band reacts to how the page is
 * being read. Decorative: the same tools are listed properly in Skills.
 */
export function VelocityMarquee({ rows }: { rows: string[][] }) {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const offsets = rows.map(() => 0);
    let lastY = window.scrollY;
    let velocity = 0;
    let direction = 1;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) direction = Math.sign(dy);
      /* Smoothed, so a flick of the wheel surges and then settles. */
      velocity += (Math.abs(dy) / Math.max(dt, 0.001) - velocity) * 0.1;

      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        const unit = track.scrollWidth / COPIES;
        if (!unit) return;
        const rowDir = i % 2 === 0 ? 1 : -1;
        offsets[i] += rowDir * direction * (BASE_SPEED + velocity * SCROLL_GAIN) * dt;
        offsets[i] = ((offsets[i] % unit) + unit) % unit;
        track.style.transform = `translate3d(${-offsets[i]}px,0,0)`;
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rows]);

  return (
    <div aria-hidden="true" className="select-none overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {rows.map((row, r) => (
        <div
          key={r}
          ref={(node) => {
            trackRefs.current[r] = node;
          }}
          className="flex w-max whitespace-nowrap font-display text-[1.05rem] font-semibold leading-[1.6] tracking-[-0.01em] will-change-transform sm:text-[1.35rem]"
        >
          {Array.from({ length: COPIES }, (_, copy) =>
            row.map((item, i) => {
              const solid = (i + r) % 2 === 0;
              const tone = wordmark[(i + r * 2) % wordmark.length].tone;
              return (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span
                    className={solid ? toneText[tone] : "text-ink-faint/60"}
                  >
                    {item}
                  </span>
                  <span className="mx-3.5 text-ink-faint/40">·</span>
                </span>
              );
            }),
          )}
        </div>
      ))}
    </div>
  );
}
