import Image from "next/image";

import { Reveal } from "@/components/blueprint/reveal";
import { DimensionLine } from "@/components/blueprint/rules";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-2xl">
            {profile.availability.open && (
              <Reveal>
                <p className="mb-7 inline-flex items-center gap-2.5 border border-blue/35 bg-blue-wash px-3 py-1.5">
                  <span className="relative grid size-1.5 place-items-center">
                    <span className="absolute size-1.5 rounded-full bg-blue animate-ping-slow" />
                    <span className="size-1.5 rounded-full bg-blue" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">
                    {profile.availability.label}
                  </span>
                </p>
              </Reveal>
            )}

            <Reveal delay={60}>
              <p className="annot mb-4">
                {profile.title} · {profile.location}
              </p>
              <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-4 font-display text-xl font-medium tracking-tight text-blue sm:text-2xl">
                {profile.headline}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {profile.discipline}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg transition-colors hover:border-blue hover:bg-blue"
                >
                  Get in touch
                </a>
                {profile.assets.hasCv && (
                  <a
                    href={profile.cv}
                    className="border border-rule-strong px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-blue hover:text-blue"
                  >
                    Download CV
                  </a>
                )}
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-rule-strong px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-blue hover:text-blue"
                >
                  LinkedIn
                </a>
              </div>
              {profile.availability.open && (
                <p className="mt-4 font-mono text-[11px] tracking-[0.06em] text-ink-faint">
                  {profile.availability.detail}
                </p>
              )}
            </Reveal>
          </div>

          <Reveal delay={220} className="lg:pt-6">
            <PortraitPlate />
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-20">
          <DimensionLine label="Selected metrics" />
        </div>
      </div>
    </section>
  );
}

/**
 * The portrait presented as a drawing plate — framed, annotated, registration
 * marked. Falls back to a monogram until a real photograph is supplied, so the
 * layout is identical either way.
 */
function PortraitPlate() {
  return (
    <figure className="reg-marks w-full max-w-[17rem] border border-rule bg-surface p-2.5">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        {profile.assets.hasPhoto ? (
          <Image
            src={profile.photo}
            alt={`${profile.name}, ${profile.title}`}
            fill
            sizes="272px"
            className="object-cover"
            preload
          />
        ) : (
          <div className="blueprint-grid grid size-full place-items-center">
            <span className="font-display text-6xl font-semibold tracking-tight text-ink-faint/60">
              {profile.initials}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 px-0.5">
        <span className="annot">Plate 01</span>
        <span className="annot normal-case tracking-[0.06em]">Abu Dhabi, AE</span>
      </figcaption>
    </figure>
  );
}
