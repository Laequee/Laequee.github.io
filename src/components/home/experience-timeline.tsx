import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { experience } from "@/content/experience";

export function ExperienceTimeline() {
  return (
    <Section
      index="02"
      id="experience"
      title="Experience"
      lede="Four years across enterprise IT, from workstation builds in Kerala to group-wide cloud transformation in Abu Dhabi."
      raised
    >
      <ol className="relative">
        {/* The spine. Stops at the last marker rather than running past it. */}
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 hidden w-px bg-rule sm:block"
          style={{ height: "calc(100% - 1rem)" }}
        />

        {experience.map((role, i) => (
          <Reveal as="li" key={`${role.employer}-${role.start}`} delay={i * 60}>
            <article className="relative pb-12 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 hidden size-[11px] border sm:block ${
                  role.current ? "border-accent bg-accent" : "border-rule-strong bg-bg"
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="annot">{role.period}</span>
                {role.current && (
                  <span className="border border-accent/40 bg-accent-wash px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {role.title}
              </h3>
              <p className="mt-1 text-[15px] text-ink-soft">
                <span className="text-ink">{role.employer}</span>
                {role.employerNote && (
                  <span className="text-ink-faint"> ({role.employerNote})</span>
                )}
                {role.client && (
                  <>
                    <span className="mx-2 text-ink-faint">·</span>
                    <span className="text-ink-faint">client:</span> {role.client}
                  </>
                )}
              </p>
              <p className="annot mt-1.5 normal-case tracking-[0.06em]">{role.location}</p>

              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {role.summary}
              </p>

              {/* Two columns on wide screens — eleven stacked bullets reads as a wall. */}
              <ul className="mt-4 grid max-w-4xl gap-x-10 gap-y-2 lg:grid-cols-2">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 bg-rule-strong" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {role.note && (
                <p className="annot mt-4 max-w-2xl normal-case leading-relaxed tracking-[0.04em]">
                  {role.note}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
