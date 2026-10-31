import Link from "next/link";

import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { JellyPill } from "@/components/jelly-pill";
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
                  {/*
                    Accent by default rather than on hover — the titles are the
                    thing worth scanning. Hover inverts to ink so the row still
                    responds; leaving it accent-on-accent would kill the feedback.
                  */}
                  <h3 className="text-xl font-bold tracking-tight text-accent transition-colors group-hover:text-ink sm:text-2xl">
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

                {/* w-64, not w-56 — the CTA label needs ~226px and was wrapping. */}
                <div className="lg:w-64">
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
                          {/*
                            min-w rather than a fixed w: short values still line
                            the labels up in a column, but a range like
                            "2008 → 2025" is free to run past 5rem instead of
                            overlapping the label beside it.
                          */}
                          <dd
                            className={`font-semibold tabular-nums lg:min-w-20 lg:shrink-0 ${
                              metric.value.length > 7 ? "text-[15px]" : "text-lg"
                            }`}
                          >
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
                  <JellyPill className="jelly-cta mt-5 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em]">
                    View full case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </JellyPill>
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
