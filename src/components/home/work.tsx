import { Section } from "@/components/blueprint/rules";
import { CardFan } from "@/components/home/card-fan";
import { CardSketch } from "@/components/home/card-sketch";
import { TiltCard } from "@/components/motion/tilt-card";
import { toneBg } from "@/components/wordmark";
import { projects } from "@/content/projects";

const GAP_PX = 20;

export function Work() {
  return (
    <Section
      index="01"
      id="work"
      title="Selected work"
      lede="Four projects from a 5,000-user Microsoft 365 estate: endpoint management, migration, directory and endpoint security."
    >
      <CardFan className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => {
          /* Offset from the row's centre, in card positions: -1.5 … 1.5 for four cards. */
          const offset = i - (projects.length - 1) / 2;
          const metrics = project.metrics.filter((metric) => !metric.pending).slice(0, 2);

          return (
            <li
              key={project.slug}
              className="fan-card relative"
              style={
                {
                  zIndex: projects.length - Math.abs(Math.round(offset)),
                  "--fan-x": `calc(${-offset} * (100% + ${GAP_PX}px) + ${offset * 46}px)`,
                  "--fan-r": `${offset * 5}deg`,
                  "--fan-delay": `${i * 70}ms`,
                } as React.CSSProperties
              }
            >
              <TiltCard
                href={`/projects/${project.slug}`}
                className={`group flex h-full min-h-[30rem] flex-col rounded-[1.4rem] p-5 text-on-tone shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] sm:p-6 ${toneBg[project.tone]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[12px] font-semibold">{project.index}</span>
                  <span className="font-mono text-[11px] font-semibold opacity-75">{project.period}</span>
                </div>

                <div className="mt-3">
                  <CardSketch notes={project.notes} variant={i} />
                </div>

                <h3 className="mt-3 font-display text-[1.55rem] font-bold leading-[1.05] tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[14px] leading-snug opacity-85">{project.summary}</p>

                {metrics.length > 0 && (
                  <dl className="mt-auto grid grid-cols-2 gap-3 pt-6">
                    {metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd
                          className={`font-display font-bold leading-none tracking-tight ${
                            metric.value.length > 6 ? "text-xl" : "text-[1.75rem]"
                          }`}
                        >
                          {metric.value}
                        </dd>
                        <dt className="mt-1.5 text-[12px] leading-tight opacity-75">{metric.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-on-tone/20 pt-4">
                  <span className="text-[13px] font-semibold">Read the case study</span>
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-on-tone text-[15px] text-ink transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </TiltCard>
            </li>
          );
        })}
      </CardFan>
    </Section>
  );
}
