"use client";

import Image from "next/image";
import { useState } from "react";

import { profile } from "@/content/profile";

const avatars = profile.avatars;

/**
 * Portrait inside a rotating dashed ring. Clicking it flips the disc and
 * reveals the next variant.
 *
 * Two faces are kept mounted and the container is rotated, rather than
 * swapping a single image mid-animation. The incoming face is always
 * back-facing while its src changes, so the swap is never visible.
 */
export function AvatarRing() {
  const [flips, setFlips] = useState(0);
  // Which avatar each of the two faces is currently showing.
  const [faces, setFaces] = useState<[number, number]>([0, 1]);
  const [touched, setTouched] = useState(false);

  const frontVisible = flips % 2 === 0;

  function flip() {
    const showing = frontVisible ? faces[0] : faces[1];
    const next = (showing + 1) % avatars.length;
    // Load the next image onto the hidden face, then rotate to it.
    setFaces(frontVisible ? [faces[0], next] : [next, faces[1]]);
    setFlips((f) => f + 1);
    setTouched(true);
  }

  const current = avatars[frontVisible ? faces[0] : faces[1]];

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className="relative grid size-[280px] place-items-center sm:size-[360px] xl:size-[400px]">
        <svg
          viewBox="0 0 506 506"
          className="pointer-events-none absolute inset-0 size-full animate-ring"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="253"
            cy="253"
            r="250"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="24 26 52 34 90 40"
          />
        </svg>

        <button
          type="button"
          onClick={flip}
          aria-label={`Change portrait. Current: ${current.mood}`}
          className="group size-[88%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative size-full transition-transform duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${flips * 180}deg)`,
            }}
          >
            <Face src={avatars[faces[0]].src} rotated={false} />
            <Face src={avatars[faces[1]].src} rotated />
          </div>
        </button>
      </div>

      {/* Fades out once the switcher has been discovered. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none text-[11px] uppercase tracking-[0.16em] text-accent transition-opacity duration-500 ${
          touched ? "opacity-0" : "opacity-100"
        }`}
      >
        click me 👀
      </span>
    </div>
  );
}

function Face({ src, rotated }: { src: string; rotated: boolean }) {
  return (
    <span
      className="era-portrait glow absolute inset-0 overflow-hidden rounded-full border border-rule-strong bg-surface"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: rotated ? "rotateY(180deg)" : undefined,
      }}
    >
      <Image
        src={src}
        alt={`${profile.name}, ${profile.title}`}
        width={400}
        height={400}
        className="size-full object-cover"
        preload
      />
    </span>
  );
}
