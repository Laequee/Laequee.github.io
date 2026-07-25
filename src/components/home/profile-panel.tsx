import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { profile } from "@/content/profile";

export function ProfilePanel() {
  return (
    <Section index="05" id="profile" title="Profile" lede={profile.summary}>
      <div className="grid gap-px border border-rule bg-rule lg:grid-cols-2">
        <Reveal className="bg-bg">
          <div className="h-full px-5 py-6 sm:px-6 sm:py-7">
            <span className="annot">Education</span>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {profile.education.degree}
            </h3>
            <p className="mt-1.5 text-[15px] text-ink-soft">{profile.education.institution}</p>
            <p className="annot mt-1 normal-case tracking-[0.06em]">{profile.education.campus}</p>
            <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-blue">
              {profile.education.period}
            </p>
            {profile.education.note && (
              <p className="annot mt-3 normal-case tracking-[0.04em]">{profile.education.note}</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={70} className="bg-bg">
          <div className="h-full px-5 py-6 sm:px-6 sm:py-7">
            <span className="annot">Languages</span>
            <ul className="mt-4 divide-y divide-rule">
              {profile.languages.map((language) => (
                <li
                  key={language.name}
                  className="flex items-baseline justify-between gap-4 py-3 first:pt-0"
                >
                  <span className="font-display text-[15px] font-medium tracking-tight">
                    {language.name}
                  </span>
                  <span className="annot text-right normal-case tracking-[0.06em]">
                    {language.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
