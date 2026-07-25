import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { skillGroups } from "@/content/skills";

export function SkillsMatrix() {
  return (
    <Section
      index="03"
      id="stack"
      title="Stack"
      lede="Eight domains, ordered by how much of the work sits in each."
    >
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.code} delay={Math.min(i, 4) * 50} className="bg-bg">
            <div className="h-full px-5 py-6">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] tracking-[0.14em] text-blue">
                  {group.code}
                </span>
                <h3 className="font-display text-[15px] font-semibold leading-tight tracking-tight">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-4 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[13.5px] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
