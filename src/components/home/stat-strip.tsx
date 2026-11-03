import { CountUp } from "@/components/blueprint/count-up";
import { Reveal } from "@/components/blueprint/reveal";
import { headlineStats } from "@/content/profile";

export function StatStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <dl className="panel grid grid-cols-2 lg:grid-cols-4">
        {headlineStats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 70}
            className={`px-5 py-6 sm:px-7 sm:py-7 ${i % 2 === 1 ? "border-l border-rule" : ""} ${
              i >= 2 ? "border-t border-rule lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dd className="font-display text-3xl font-bold tracking-tight tabular-nums sm:text-[2.6rem]">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="mt-2 text-[14px] leading-snug text-ink-soft">{stat.label}</dt>
            <p className="annot mt-2">{stat.note}</p>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
