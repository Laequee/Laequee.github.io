import Image from "next/image";

import { profile } from "@/content/profile";

/**
 * Circular portrait inside a rotating dashed accent ring.
 *
 * The ring is an SVG circle whose stroke-dasharray produces the broken arcs;
 * rotating the whole SVG is cheaper than animating the dash offset and reads
 * the same. Until a photograph exists the frame holds a monogram, so the
 * composition is identical either way.
 */
export function AvatarRing() {
  return (
    <div className="relative grid size-[280px] place-items-center sm:size-[360px] xl:size-[460px]">
      <svg
        viewBox="0 0 506 506"
        className="absolute inset-0 size-full animate-ring"
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

      <div className="glow size-[88%] overflow-hidden rounded-full border border-rule-strong bg-surface">
        {profile.assets.hasPhoto ? (
          <Image
            src={profile.photo}
            alt={`${profile.name}, ${profile.title}`}
            width={460}
            height={460}
            className="size-full object-cover"
            preload
          />
        ) : (
          <div
            className="neon-grid grid size-full place-items-center"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 35%, var(--accent-wash), transparent 70%)",
            }}
          >
            <span className="text-6xl font-bold tracking-tight text-accent/70 sm:text-7xl xl:text-8xl">
              {profile.initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
