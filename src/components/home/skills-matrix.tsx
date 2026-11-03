import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { toneText, wordmark } from "@/components/wordmark";
import { skillGroups } from "@/content/skills";

export function SkillsMatrix() {
  return (
    <Section
      index="03"
      /* Anchor stays #stack: it is already in shared links. */
      id="stack"
      title="Skills"
      lede="The tools I use every week, Microsoft 365 first."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.code} delay={Math.min(i, 5) * 60} className="panel p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold tracking-tight">{group.title}</h3>
              {/* Tinted with the wordmark tones in order, one per group. */}
              <span className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${toneText[wordmark[i % wordmark.length].tone]}`}>
                {group.code}
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="pill h-7 px-3 text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
