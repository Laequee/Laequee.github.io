import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { experience } from "@/content/experience";
import { yearsExperience } from "@/content/profile";

export function ExperienceTimeline() {
  const [current, ...earlier] = experience;

  return (
    <Section
      index="02"
      id="experience"
      title="Experience"
      lede={`From service desk to digital workplace specialist: ${yearsExperience}+ years in enterprise IT, now Microsoft 365, Intune, Entra ID and large migrations.`}
    >
      <Reveal>
        <article className="panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill h-7 border-live/40 px-3 text-live">
              <span className="size-1.5 rounded-full bg-live" />
              Current
            </span>
            <span className="annot">{current.period}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">{current.title}</h3>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            <span className="text-ink">{current.employer}</span>
            {current.client && <span className="text-ink-faint"> · client: {current.client}</span>}
            <span className="text-ink-faint"> · {current.location}</span>
          </p>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">{current.summary}</p>

          <ul className="mt-7 grid gap-x-10 gap-y-3 border-t border-rule pt-7 lg:grid-cols-2">
            {current.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      <ol className="mt-5 grid gap-5 md:grid-cols-3">
        {earlier.map((role, i) => (
          <Reveal as="li" key={`${role.employer}-${role.start}`} delay={i * 70} className="panel p-6">
            <span className="annot">{role.period}</span>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight">{role.title}</h3>
            <p className="mt-1 text-[14px] text-ink">
              {role.employer}
              {role.employerNote && <span className="text-ink-faint"> ({role.employerNote})</span>}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{role.summary}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
