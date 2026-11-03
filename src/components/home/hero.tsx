"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { RippleGrid } from "@/components/motion/ripple-grid";
import { toneText, wordmark } from "@/components/wordmark";
import { profile } from "@/content/profile";

/*
 * Each section label is wired to one letter, like a patch lead into a port.
 * `fx` is where on the letter's width the lead lands and `fy` is its height
 * above the baseline in em. Both are tuned to Outfit's glyphs: the stem of the
 * l, the crossbar of each e, the right stem of the q. Change the font and
 * these need re-tuning, or the dots land in the letters' counters.
 */
const wires = [
  { label: "work", href: "/#work", letter: 0, fx: 0.22, fy: 0.42, dx: -10, row: 1 },
  { label: "experience", href: "/#experience", letter: 2, fx: 0.5, fy: 0.27, dx: -60, row: 0 },
  { label: "skills", href: "/#stack", letter: 3, fx: 0.8, fy: 0.3, dx: 30, row: 1 },
  { label: "contact", href: "/#contact", letter: 5, fx: 0.5, fy: 0.27, dx: 0, row: 0 },
];

const ROW_TOP = [8, 64];
const PILL_H = 28;
const RADIUS = 10;

type Geometry = { pills: { x: number; y: number }[]; paths: string[]; dots: { x: number; y: number }[] };

/* Up, across, down, with rounded elbows. Straight if the lead barely moves sideways. */
function leadPath(px: number, py: number, ey: number, ax: number, ay: number) {
  const dx = ax - px;
  if (Math.abs(dx) < RADIUS * 2) return `M${ax},${py} L${ax},${ay}`;
  const dir = Math.sign(dx);
  return [
    `M${px},${py}`,
    `L${px},${ey - RADIUS}`,
    `Q${px},${ey} ${px + RADIUS * dir},${ey}`,
    `L${ax - RADIUS * dir},${ey}`,
    `Q${ax},${ey} ${ax},${ey + RADIUS}`,
    `L${ax},${ay}`,
  ].join(" ");
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const baselineRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    const baseline = baselineRef.current;
    if (!stage || !title || !baseline) return;

    /* Below sm the leads would tangle; the labels drop to a plain row instead. */
    if (!window.matchMedia("(min-width: 640px)").matches) {
      setGeo(null);
      return;
    }

    /*
     * offset* rather than getBoundingClientRect: the letters are mid-entrance
     * (translated and scaled) on first measure, and offsets ignore transforms.
     * The stage is the offsetParent of everything measured here.
     */
    const width = stage.clientWidth;
    const titleTop = title.offsetTop;
    const base = baseline.offsetTop;
    const em = parseFloat(getComputedStyle(title).fontSize);

    const pills: Geometry["pills"] = [];
    const paths: string[] = [];
    const dots: Geometry["dots"] = [];

    wires.forEach((wire, i) => {
      const el = letterRefs.current[wire.letter];
      if (!el) return;
      const ax = el.offsetLeft + el.offsetWidth * wire.fx;
      const ay = base - em * wire.fy;
      const wanted = Math.min(Math.max(ax + wire.dx, 60), width - 60);
      /* A lead that barely moves sideways drops straight, so centre the pill over it. */
      const px = Math.abs(wanted - ax) < RADIUS * 2 ? ax : wanted;
      const py = ROW_TOP[wire.row];
      /* Staggered elbows so no two leads share a horizontal run. */
      const ey = titleTop + em * 0.08 - 14 - i * 9;

      pills.push({ x: px, y: py });
      paths.push(leadPath(px, py + PILL_H, ey, ax, ay));
      dots.push({ x: ax, y: ay });
    });

    setGeo({ pills, paths, dots });
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    /* Outfit swaps in after first paint and changes every letter's width. */
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <section className="relative overflow-hidden">
      <RippleGrid className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_70%_75%_at_50%_40%,#000_35%,transparent_80%)]" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-6">
        <div ref={stageRef} className="relative mx-auto w-fit sm:pt-[150px]">
          {geo && (
            <>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 hidden size-full overflow-visible sm:block"
              >
                {geo.paths.map((d, i) => (
                  <path
                    key={wires[i].label}
                    d={d}
                    pathLength={1}
                    fill="none"
                    strokeWidth={1.25}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    className="transition-[stroke] duration-300"
                    stroke={hovered === i ? "var(--ink)" : "var(--ink-faint)"}
                    style={{ animation: `wire-draw 0.9s cubic-bezier(0.6,0,0.2,1) ${700 + i * 140}ms forwards` }}
                  />
                ))}
                {geo.dots.map((dot, i) => (
                  <circle
                    key={wires[i].label}
                    cx={dot.x}
                    cy={dot.y}
                    r={hovered === i ? 5.5 : 4.5}
                    fill="var(--ink)"
                    stroke="var(--bg)"
                    strokeWidth={2}
                    className="transition-[r] duration-300"
                    style={{ opacity: 0, animation: `fade-in 0.4s ease-out ${1400 + i * 140}ms forwards` }}
                  />
                ))}
              </svg>

              {geo.pills.map((pill, i) => (
                <Link
                  key={wires[i].label}
                  href={wires[i].href}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="pill absolute z-20 hidden -translate-x-1/2 bg-bg px-3 uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink sm:inline-flex"
                  style={{
                    left: pill.x,
                    top: pill.y,
                    height: PILL_H,
                    opacity: 0,
                    animation: `fade-in 0.5s ease-out ${500 + i * 140}ms forwards`,
                  }}
                >
                  {wires[i].label}
                </Link>
              ))}
            </>
          )}

          <h1
            ref={titleRef}
            className="select-none font-display text-[clamp(5.2rem,24vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.045em] sm:text-[clamp(8rem,19vw,14.5rem)]"
          >
            <span className="sr-only">
              {profile.name}, {profile.title}
            </span>
            <span aria-hidden="true">
              {wordmark.map((letter, i) => {
                const lifted = hovered !== null && wires[hovered].letter === i;
                return (
                  <span
                    key={i}
                    ref={(node) => {
                      letterRefs.current[i] = node;
                    }}
                    className={`inline-block ${toneText[letter.tone]}`}
                    style={{ opacity: 0, animation: `letter-rise 0.8s cubic-bezier(0.2,0.8,0.2,1) ${i * 70}ms forwards` }}
                  >
                    <span
                      className="inline-block transition-transform duration-300 ease-out"
                      style={{ transform: lifted ? "translateY(-0.06em)" : undefined }}
                    >
                      {letter.char}
                    </span>
                  </span>
                );
              })}
              <span
                ref={baselineRef}
                className="inline-block h-0 w-0 align-baseline"
              />
            </span>
          </h1>
        </div>

        {/* Labels without leads, for phones. */}
        <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
          {wires.map((wire) => (
            <li key={wire.label}>
              <Link href={wire.href} className="pill h-8 px-3.5 uppercase tracking-[0.14em] text-ink-soft">
                {wire.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mx-auto mt-10 max-w-2xl text-center sm:mt-12"
          style={{ opacity: 0, animation: "fade-in 0.8s ease-out 500ms forwards" }}
        >
          <p className="font-display text-[1.2rem] font-medium leading-snug text-ink sm:text-[1.6rem]">
            {profile.tagline}
          </p>

          {profile.availability.open && (
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] text-ink-soft">
              <span className="size-2 rounded-full bg-live shadow-[0_0_0_3px_rgba(61,220,132,0.18),0_0_10px_rgba(61,220,132,0.6)]" />
              {profile.availability.detail}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.contact.email}`} className="btn h-11 px-6 text-sm">
              Get in touch
            </a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-ghost h-11 gap-2 px-5 text-sm">
                View CV
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost h-11 px-5 text-sm"
            >
              LinkedIn
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost h-11 px-5 text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
