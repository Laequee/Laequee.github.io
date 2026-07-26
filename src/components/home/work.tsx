import Link from "next/link";

import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { projects } from "@/content/projects";

/**
 * The drawing index: every case study as a row, most significant first.
 * Rows rather than tiles because the metrics need a column to align in.
 */
export function Work() {
  return (
    <Section
      index="01"
      id="work"
      title="Enterprise Projects"
      lede="Enterprise engineering projects spanning cloud identity, endpoint management, infrastructure modernisation, security, automation, and large-scale migration initiatives."
    >
      <ul className="border-t border-rule">
        {projects.map((project, i) => {
          const confirmed = project.metrics.filter((metric) => !metric.pending);

          return (
          <Reveal as="li" key={project.slug} delay={Math.min(i, 5) * 50}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block border-b border-rule py-7 transition-colors hover:bg-surface/60"
            >
              <div className="grid gap-5 lg:grid-cols-[7rem_1fr_auto] lg:items-start lg:gap-8">
                <div className="flex items-baseline gap-3 lg:block">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                    {project.index}
                  </span>
                  <span className="annot lg:mt-2 lg:block">{project.period}</span>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="annot mt-1.5">{project.kind}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tool) => (
                      <li
                        key={tool}
                        className="console-chip px-2 py-0.5"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-56">
                  {/*
                    Unconfirmed metrics are never shown on the index — a dash here reads
                    as a broken row rather than an honest gap. Projects with nothing
                    confirmed yet fall back to role and client so the column still
                    carries weight instead of sitting empty.
                  */}
                  {confirmed.length > 0 ? (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:gap-y-3.5">
                      {confirmed.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="lg:flex lg:items-baseline lg:gap-3">
                          <dd className="text-lg font-semibold tabular-nums lg:w-20 lg:shrink-0">
                            {metric.value}
                          </dd>
                          <dt className="annot mt-0.5 lg:mt-0">{metric.label}</dt>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:gap-y-3.5">
                      <div>
                        <dt className="annot">Role</dt>
                        <dd className="mt-1 text-[14px] text-ink-soft">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="annot">Scope</dt>
                        <dd className="mt-1 text-[14px] text-ink-soft">{project.kind}</dd>
                      </div>
                    </dl>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent">
                    Case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
