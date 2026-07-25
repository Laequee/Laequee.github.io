import { CountUp } from "@/components/blueprint/count-up";
import { Reveal } from "@/components/blueprint/reveal";
import { headlineStats } from "@/content/profile";

export function StatStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
      <dl className="grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
        {headlineStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 70} className="bg-bg">
            <div className="h-full px-5 py-6 sm:px-6 sm:py-7">
              <dd className="font-display text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-[13px] leading-snug text-ink-soft">{stat.label}</dt>
              <p className="annot mt-2.5">{stat.note}</p>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
