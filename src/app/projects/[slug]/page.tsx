import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/blueprint/reveal";
import { CardSketch } from "@/components/home/card-sketch";
import { DrawOnView } from "@/components/motion/draw-on-view";
import { ScribbleUnderline } from "@/components/motion/scribble-underline";
import { FlowDiagram } from "@/components/project/flow-diagram";
import { toneBg } from "@/components/wordmark";
import { getProject, getProjectNeighbours, projects, type Project } from "@/content/projects";

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
    <article className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
      <Link
        href="/#work"
        className="pill h-8 px-3.5 uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
      >
        <span aria-hidden="true">←</span> All work
      </Link>

      {/* The card from the home page, opened up. */}
      <header className={`relative mt-6 rounded-[1.75rem] p-6 text-on-tone sm:p-10 ${toneBg[project.tone]}`}>
        {/*
          The card's hover sketch, drawn large into the header's empty corner as
          the page opens. xl only: below that it would run into the title.
        */}
        <DrawOnView className="absolute right-10 top-20 hidden xl:block" threshold={0.2}>
          <CardSketch notes={project.notes} variant={Number(project.index) - 1} size="header" />
        </DrawOnView>
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] font-semibold">
          <span>Case study {project.index}</span>
          <span className="opacity-75">{project.period}</span>
        </div>
        <h1 className="mt-10 max-w-3xl font-display xl:max-w-2xl text-[2.4rem] font-bold leading-[1] tracking-[-0.03em] sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-85 sm:text-lg">{project.summary}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-on-tone/20 pt-6 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dd
                  className={`font-display font-bold leading-none tracking-tight ${
                    metric.value.length > 7 ? "text-2xl" : "text-[2rem]"
                  } ${metric.pending ? "opacity-40" : ""}`}
                >
                  {metric.value}
                </dd>
                <dt className="mt-2 text-[13px] leading-snug opacity-75">{metric.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="grid gap-5 py-5 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <Reveal className="panel p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              <ScribbleUnderline tone={project.tone} variant={0}>The problem</ScribbleUnderline>
            </h2>
            <div className="mt-4 space-y-4">
              {project.context.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="panel p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              <ScribbleUnderline tone={project.tone} variant={1}>What I did</ScribbleUnderline>
            </h2>
            <ol className="mt-5 space-y-5">
              {project.approach.map((item, i) => (
                <li key={item.step} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-rule-strong font-mono text-[11px] text-ink-soft">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{item.step}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <FlowDiagram diagram={project.diagram} />
          </Reveal>

          <Reveal className="panel p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              <ScribbleUnderline tone={project.tone} variant={2}>Result</ScribbleUnderline>
            </h2>
            <ul className="mt-5 space-y-3">
              {project.outcome.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className={`mt-[9px] size-2 shrink-0 rounded-full ${toneBg[project.tone]}`} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-6">
            <dl className="space-y-4">
              <Meta label="Role" value={project.role} />
              <Meta label="Employer" value={project.employer} />
              <Meta label="Client" value={project.client} />
              <Meta label="Period" value={project.period} />
            </dl>
          </div>
          <div className="panel p-6">
            <span className="annot">Stack</span>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li key={tool} className="pill h-7 px-3 text-ink-soft">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          {/* Outstanding content questions: dev server only, never in the export. */}
          {process.env.NODE_ENV === "development" && project.needs.length > 0 && (
            <div className="rounded-[1.25rem] border border-dashed border-tone-amber/60 p-6">
              <span className="annot text-tone-amber">Still needed · dev only</span>
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

      <nav className="grid gap-5 sm:grid-cols-2">
        {previous ? <NeighbourLink direction="Previous" project={previous} align="left" /> : <span />}
        {next ? <NeighbourLink direction="Next" project={next} align="right" /> : <span />}
      </nav>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="annot">{label}</dt>
      <dd className="mt-1 text-[15px]">{value}</dd>
    </div>
  );
}

function NeighbourLink({
  direction,
  project,
  align,
}: {
  direction: string;
  project: Project;
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`panel group flex items-center gap-4 p-6 transition-colors hover:border-rule-strong ${
        align === "right" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span aria-hidden="true" className={`size-10 shrink-0 rounded-full ${toneBg[project.tone]}`} />
      <span>
        <span className="annot">{direction}</span>
        <span className="mt-1.5 block font-display text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </span>
      </span>
    </Link>
  );
}
