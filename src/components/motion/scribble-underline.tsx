import { DrawOnView } from "@/components/motion/draw-on-view";
import { toneText } from "@/components/wordmark";
import type { Tone } from "@/content/projects";

/*
 * Hand-drawn underlines in a 200 x 24 box, stretched to the heading's width.
 * Single strokes so each can draw from left to right.
 */
const strokes = [
  /* Wavy, with a little loop at the end. */
  "M3 14 C 30 6, 52 20, 80 12 S 132 6, 160 13 C 176 17, 188 8, 182 4 C 176 0, 172 14, 197 15",
  /* Quick double stroke, like underlining twice. */
  "M4 10 C 60 6, 130 7, 196 9 M14 18 C 70 14, 130 15, 186 17",
  /* One confident swoosh that lifts at the end. */
  "M3 18 C 50 10, 120 8, 170 12 C 184 13, 192 9, 197 3",
];

/**
 * Wraps a heading's text and draws a scribbled underline beneath it the
 * first time it scrolls into view. Decorative only.
 */
export function ScribbleUnderline({
  children,
  tone,
  variant = 0,
}: {
  children: React.ReactNode;
  tone: Tone;
  variant?: number;
}) {
  return (
    <DrawOnView as="span" className="relative inline-block" threshold={0.9}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute -bottom-[0.32em] left-0 h-[0.32em] min-h-3 w-full overflow-visible ${toneText[tone]}`}
        fill="none"
      >
        <path
          d={strokes[variant % strokes.length]}
          pathLength={1}
          className="sketch-path"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </DrawOnView>
  );
}
