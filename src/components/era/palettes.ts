/**
 * The two ends of the migration.
 *
 * Scrolling the home page interpolates every colour token from LEGACY to
 * MODERN. The keys must stay in step with the custom properties declared in
 * globals.css — anything listed here overrides the stylesheet at runtime.
 *
 * LEGACY is a Windows Server 2003/2012 admin console: beige chrome, black
 * Tahoma, navy title bars, maroon highlights, no glow. Deliberately dated.
 */

export type Palette = Record<string, string>;

export const LEGACY: Palette = {
  "--bg": "#ece9d8",
  "--surface": "#ffffff",
  "--surface-2": "#d4d0c8",
  "--ink": "#000000",
  "--ink-soft": "#3b3b3b",
  // #6d6a63 measured 4.42:1 on the beige ground — just under AA for small text.
  "--ink-faint": "#67645d",
  "--rule": "#aca899",
  "--rule-strong": "#808080",
  "--accent": "#0a246a",
  "--accent-ink": "#ffffff",
  "--accent-warm": "#7a0000",
  "--accent-wash": "rgba(10, 36, 106, 0.08)",
  "--accent-line": "rgba(10, 36, 106, 0.45)",
  "--accent-glow": "rgba(10, 36, 106, 0)",
  "--grid": "rgba(0, 0, 0, 0.05)",
};

export const MODERN: Palette = {
  "--bg": "#05070f",
  "--surface": "#0b0f1c",
  "--surface-2": "#121829",
  "--ink": "#ffffff",
  "--ink-soft": "#a8b3c7",
  "--ink-faint": "#6b7891",
  "--rule": "#1a2236",
  "--rule-strong": "#2c3852",
  "--accent": "#00e5ff",
  "--accent-ink": "#04121a",
  "--accent-warm": "#ff5fa2",
  "--accent-wash": "rgba(0, 229, 255, 0.09)",
  "--accent-line": "rgba(0, 229, 255, 0.35)",
  "--accent-glow": "rgba(0, 229, 255, 0.28)",
  "--grid": "rgba(255, 255, 255, 0.032)",
};

/** Scroll distance over which the migration completes, in viewport heights. */
export const MIGRATION_VH = 1.15;

/**
 * Where the discrete swap happens — fonts, corners, bevels, the neon ring.
 * Colours drift continuously, then everything else snaps at this point. That
 * mirrors a real migration: a long preparation, then a cutover.
 */
export const CUTOVER = 0.55;

type Rgba = [number, number, number, number];

function parse(color: string): Rgba {
  if (color.startsWith("#")) {
    return [
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16),
      1,
    ];
  }
  const parts = color
    .slice(color.indexOf("(") + 1, color.lastIndexOf(")"))
    .split(",")
    .map((n) => parseFloat(n));
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

/** Interpolates two colours. Works for both hex and rgba inputs. */
export function mix(from: string, to: string, t: number): string {
  const a = parse(from);
  const b = parse(to);
  const ch = (i: number) => Math.round(a[i] + (b[i] - a[i]) * t);
  const alpha = +(a[3] + (b[3] - a[3]) * t).toFixed(3);
  return `rgba(${ch(0)}, ${ch(1)}, ${ch(2)}, ${alpha})`;
}

/** The full token set at a given point in the migration. */
export function paletteAt(t: number): Palette {
  const out: Palette = {};
  for (const key of Object.keys(MODERN)) {
    out[key] = mix(LEGACY[key], MODERN[key], t);
  }
  return out;
}
