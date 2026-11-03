/*
 * Hand-drawn doodles, one per card, in a 240 x 110 box. Each is drawn as a
 * single stroke so it can animate from one end to the other. The third is a
 * routed wire, an echo of the hero's patch leads.
 */
const doodles = [
  /* Loops, like a pen testing itself. */
  "M8 78 C 28 30, 70 26, 62 58 C 55 84, 92 84, 98 54 C 104 24, 142 24, 138 58 C 134 88, 172 82, 178 50 C 184 20, 218 26, 230 44",
  /* A long arc landing on an arrowhead. */
  "M12 92 C 46 14, 150 0, 204 58 M190 42 L204 58 L184 64",
  /* A routed lead with rounded elbows. */
  "M10 26 L44 26 Q52 26 52 34 L52 66 Q52 74 60 74 L112 74 Q120 74 120 66 L120 40 Q120 32 128 32 L172 32 Q180 32 180 40 L180 80 Q180 88 188 88 L230 88",
  /* A wave with a flourish at the end. */
  "M12 62 C 36 36, 58 86, 84 60 S 132 34, 156 60 S 198 86, 212 52 C 220 34, 238 40, 228 56",
];

/* Where each note sits and how it leans, so the three never stack neatly. */
const placements: { left?: string; right?: string; top: string; rotate: number }[] = [
  { left: "2%", top: "56%", rotate: -5 },
  { right: "2%", top: "4%", rotate: 4 },
  { left: "22%", top: "84%", rotate: -2 },
];

/**
 * The margin sketch: a doodle that draws itself and three handwritten notes
 * that settle in after it. On a project card it plays on hover (the card
 * carries `group`); in a case-study header it plays once on arrival, inside a
 * DrawOnView. All CSS: `sketch-path`, `sketch-note` in globals.css.
 */
export function CardSketch({
  notes,
  variant,
  size = "card",
}: {
  notes: readonly string[];
  variant: number;
  /* "header" is the large version drawn into a case-study page's header. */
  size?: "card" | "header";
}) {
  const large = size === "header";
  return (
    <div aria-hidden="true" className={`pointer-events-none relative select-none text-on-tone ${large ? "h-40 w-[19rem]" : "h-28"}`}>
      <svg viewBox="0 0 240 110" className="absolute inset-0 size-full overflow-visible opacity-45" fill="none">
        <path
          d={doodles[variant % doodles.length]}
          pathLength={1}
          className="sketch-path"
          stroke="currentColor"
          strokeWidth={large ? 1.4 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {notes.map((note, i) => {
        const { rotate, ...position } = placements[i];
        return (
          <span
            key={note}
            className={`sketch-note absolute whitespace-nowrap font-hand font-semibold leading-none text-on-tone/75 ${large ? "text-[21px]" : "text-[15px]"}`}
            style={
              {
                ...position,
                rotate: `${rotate}deg`,
                "--note-delay": `${(large ? 700 : 350) + i * 140}ms`,
              } as React.CSSProperties
            }
          >
            {note}
          </span>
        );
      })}
    </div>
  );
}
