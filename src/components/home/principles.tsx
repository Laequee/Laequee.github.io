import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { principles } from "@/content/principles";

/**
 * Three rules, three columns. Numbered in the drawing hand rather than bulleted —
 * these are the notes in the margin of every case study above.
 */
export function Principles() {
  return (
    <Section
      index="03"
      id="principles"
      title="How the work is done"
      lede="Three rules that hold across every project on this page. They are also the reason the failures in the case studies were caught before a user felt them."
    >
      <div className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
        {principles.map((principle, i) => (
          <Reveal key={principle.code} delay={i * 70} className="bg-bg">
            <div className="flex h-full flex-col px-5 py-6 sm:px-6 sm:py-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {principle.code}
                </span>
                {/* A tick-ended rule, the same mark the dimension lines use. */}
                <span aria-hidden="true" className="h-px flex-1 bg-rule" />
                <span className="annot">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                {principle.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{principle.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
