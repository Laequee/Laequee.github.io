import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { courses } from "@/content/courses";
import { profile } from "@/content/profile";

/*
 * "Courses", never "Certifications": see the note at the top of
 * content/courses.ts. The #certifications anchor is kept for shared links.
 */
export function Courses() {
  return (
    <Section index="04" id="certifications" title="Training & education">
      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <Reveal className="panel p-6 sm:p-7">
          <span className="annot">Courses completed</span>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {courses.map((course) => (
              <li key={course.name} className="flex items-baseline gap-3 border-b border-rule py-3">
                <span className="w-14 shrink-0 font-mono text-[12px] font-semibold text-accent">{course.code}</span>
                <span className="text-[14px] leading-snug">
                  {course.name}
                  <span className="text-ink-faint"> · {course.issuer.split(" — ")[0]}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="panel flex flex-col gap-7 p-6 sm:p-7">
          <div>
            <span className="annot">Education</span>
            <p className="mt-3 font-display text-lg font-bold leading-snug tracking-tight">
              {profile.education.degree}
            </p>
            <p className="mt-1 text-[14px] text-ink-soft">
              {profile.education.institution} · {profile.education.period}
            </p>
          </div>
          <div>
            <span className="annot">Languages</span>
            <ul className="mt-3 space-y-1.5">
              {profile.languages.map((language) => (
                <li key={language.name} className="flex justify-between gap-4 text-[14px]">
                  <span>{language.name}</span>
                  <span className="text-ink-faint">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
