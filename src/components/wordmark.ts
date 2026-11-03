import type { Tone } from "@/content/projects";

/*
 * The wordmark, one tone per letter, in order. The hero, the nav logo and the
 * share card all colour "laeque" from this list, so the brand cannot drift
 * between them.
 */
export const wordmark: { char: string; tone: Tone }[] = [
  { char: "L", tone: "violet" },
  { char: "a", tone: "azure" },
  { char: "e", tone: "teal" },
  { char: "q", tone: "amber" },
  { char: "u", tone: "coral" },
  { char: "e", tone: "rose" },
];

/* Full class names, so Tailwind can see them. */
export const toneText: Record<Tone, string> = {
  violet: "text-tone-violet",
  azure: "text-tone-azure",
  teal: "text-tone-teal",
  amber: "text-tone-amber",
  coral: "text-tone-coral",
  rose: "text-tone-rose",
};

export const toneBg: Record<Tone, string> = {
  violet: "bg-tone-violet",
  azure: "bg-tone-azure",
  teal: "bg-tone-teal",
  amber: "bg-tone-amber",
  coral: "bg-tone-coral",
  rose: "bg-tone-rose",
};
