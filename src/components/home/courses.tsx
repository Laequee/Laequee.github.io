import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { courses } from "@/content/courses";
import { profile } from "@/content/profile";

/*
 * Headed "Courses & Training", not "Certifications" — see the note at the top
 * of content/courses.ts. The #certifications anchor is kept as-is because it is
 * already in shared links and the nav; renaming it would break them for nothing.
 */
export function Courses() {
  return (
    <Section
      index="04"
      id="certifications"
      title="Training & Education"
      lede={`Courses completed. ${profile.education.degree}, ${profile.education.institution} (2020). Languages: ${profile.languages.map((l) => l.name).join(", ")}.`}
      raised
    >
      <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course, i) => {
          const body = (
            <div className="flex h-full flex-col px-5 py-6">
              <div className="flex items-start justify-between gap-3">
                <span className="annot">{course.issuer.split(" — ")[0]}</span>
                {course.code && (
                  <span className="border border-rule px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-accent">
                    {course.code}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight">
                {course.name}
              </h3>
              {/*
                No date is shown when one isn't known — "to be confirmed" on eight
                cards reads as an unfinished site rather than a considered omission.
              */}
              {(course.issued || course.credentialUrl) && (
                <p className="annot mt-auto pt-4 normal-case tracking-[0.06em]">
                  {course.issued}
                  {course.credentialUrl && (
                    <span className={course.issued ? "ml-2 text-accent" : "text-accent"}>
                      Verify →
                    </span>
                  )}
                </p>
              )}
            </div>
          );

          return (
            <Reveal key={course.name} delay={Math.min(i, 4) * 50} className="bg-bg">
              {course.credentialUrl ? (
                <a
                  href={course.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full transition-colors hover:bg-surface"
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
