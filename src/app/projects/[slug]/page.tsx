import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/blueprint/reveal";
import { DimensionLine } from "@/components/blueprint/rules";
import { FlowDiagram } from "@/components/project/flow-diagram";
import { getProject, getProjectNeighbours, projects } from "@/content/projects";

/** Static export needs every slug enumerated at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  /*
   * Per-project keywords override the site-wide set from the root layout —
   * without them every case study competes on identical terms, which is worth
   * nothing to any of them.
   *
   * The fallback matters: setting this field to undefined does not inherit the
   * parent list, it clears it. Projects without a hand-written set get terms
   * drawn from their own discipline and stack instead of nothing at all.
   */
  const keywords = project.keywords ?? [
    project.title,
    ...project.kind.split("·").map((part) => part.trim()),
    ...project.stack,
  ];

  return {
    title: project.title,
    description: project.summary,
    keywords,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getProjectNeighbours(slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <Link
        href="/#work"
        className="sweep inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
      >
        <span aria-hidden="true">←</span> All projects
      </Link>

      {/* Header */}
      <header className="mt-8 border-b border-rule pb-10">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          Fig.&nbsp;{project.index}
        </span>
        <h1 className="mt-3 max-w-3xl text-[2rem] font-bold leading-[1.1] tracking-tight text-accent sm:text-5xl">
          {project.title}
        </h1>
        <p className="annot mt-3">{project.kind}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {project.summary}
        </p>

        <dl className="mt-9 grid gap-6 border-t border-rule pt-6 sm:grid-cols-4">
          <Meta label="Client" value={project.client} />
          <Meta label="Employer" value={project.employer} />
          <Meta label="Period" value={project.period} />
          <Meta label="Role" value={project.role} />
        </dl>
      </header>

      {/* At a glance */}
      <Reveal>
        <section className="py-10 sm:py-14">
          <span className="annot">At a glance</span>
          <dl className="mt-5 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-bg px-5 py-6">
                {/*
                  Most values are three or four characters. A range like
                  "2008 → 2025" is eleven and overruns the cell at 3xl, so
                  anything long drops a step rather than clipping.
                */}
                <dd
                  className={`font-semibold tabular-nums tracking-tight ${
                    metric.value.length > 7 ? "text-2xl" : "text-3xl"
                  } ${metric.pending ? "text-ink-faint/50" : ""}`}
                >
                  {metric.value}
                </dd>
                <dt className="mt-2 text-[13px] leading-snug text-ink-soft">{metric.label}</dt>
                {metric.pending && <p className="annot mt-2">To be confirmed</p>}
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <DimensionLine />

      <div className="grid gap-12 py-12 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:py-16">
        <div className="max-w-2xl">
          <Reveal>
            <Prose heading="Context" paragraphs={project.context} />
          </Reveal>

          <Reveal>
            <section className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Approach</h2>
              <ol className="mt-6 border-t border-rule">
                {project.approach.map((item, i) => (
                  <li key={item.step} className="border-b border-rule py-6">
                    <div className="flex gap-4 sm:gap-6">
                      <span className="mt-0.5 font-mono text-[11px] tracking-[0.14em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold tracking-tight">
                          {item.step}
                        </h3>
                        <p className="prose-face mt-2 text-[15px] leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {project.phases && (
            <Reveal>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight">Programme phases</h2>
                <ol className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                  {project.phases.map((phase) => (
                    <li key={phase.label} className="bg-bg px-5 py-6">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                          {phase.label}
                        </span>
                        <span className="annot">{phase.status}</span>
                      </div>
                      <p className="prose-face mt-3 text-[14px] leading-relaxed text-ink-soft">
                        {phase.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Architecture</h2>
              <div className="mt-6">
                <FlowDiagram diagram={project.diagram} />
              </div>
            </section>
          </Reveal>

          {/*
            Sits between the architecture and the outcome deliberately: the reader
            has the shape of the work by now, and the outcome lands harder after
            the things that nearly stopped it.
          */}
          {project.challenges && (
            <Reveal>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Where it got difficult
                </h2>
                <ul className="mt-6 space-y-px bg-rule">
                  {project.challenges.map((item) => (
                    <li key={item.title} className="bg-bg pb-6 pt-6">
                      <h3 className="flex gap-3 text-[17px] font-semibold tracking-tight">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                        {item.title}
                      </h3>
                      <p className="prose-face mt-2 pl-7 text-[15px] leading-relaxed text-ink-soft">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {project.validation && (
            <Reveal>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight">Validation</h2>
                <div className="mt-5 border-l-2 border-accent-line pl-5">
                  {project.validation.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="prose-face text-[15px] leading-relaxed text-ink-soft [&+p]:mt-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Outcome</h2>
              <ul className="mt-5 space-y-3">
                {project.outcome.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-rule bg-surface/60 px-5 py-6">
            <span className="annot">Stack</span>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="console-chip bg-bg px-2 py-1"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          {/*
            Outstanding content questions, visible only while running locally.
            Stripped from the production build so they never reach the live site.
          */}
          {process.env.NODE_ENV === "development" && project.needs.length > 0 && (
            <div className="mt-4 border border-accent/50 px-5 py-6">
              <span className="annot text-accent">Still needed · dev only</span>
              <ul className="mt-3 space-y-2">
                {project.needs.map((need) => (
                  <li key={need} className="text-[13px] leading-relaxed text-ink-soft">
                    · {need}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Prev / next */}
      <nav className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {previous ? (
          <NeighbourLink direction="Previous" project={previous} align="left" />
        ) : (
          <span className="bg-bg" />
        )}
        {next ? (
          <NeighbourLink direction="Next" project={next} align="right" />
        ) : (
          <span className="bg-bg" />
        )}
      </nav>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="annot">{label}</dt>
      <dd className="mt-1.5 text-[15px] text-ink">{value}</dd>
    </div>
  );
}

function Prose({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-5 space-y-4">
        {/* Inter here — these run to several paragraphs and monospace tires the eye. */}
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="prose-face text-[15px] leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function NeighbourLink({
  direction,
  project,
  align,
}: {
  direction: string;
  project: { slug: string; title: string; kind: string };
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group bg-bg px-5 py-6 transition-colors hover:bg-surface sm:px-6 sm:py-7 ${
        align === "right" ? "sm:text-right" : ""
      }`}
    >
      <span className="annot">{direction}</span>
      <p className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
        {project.title}
      </p>
      <p className="annot mt-1.5">{project.kind}</p>
    </Link>
  );
}
