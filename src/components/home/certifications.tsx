import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { certifications } from "@/content/certifications";

export function Certifications() {
  return (
    <Section
      index="05"
      id="certifications"
      title="Certifications"
      lede="Microsoft, Cisco, and platform credentials."
      raised
    >
      <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => {
          const body = (
            <div className="flex h-full flex-col px-5 py-6">
              <div className="flex items-start justify-between gap-3">
                <span className="annot">{cert.issuer.split(" — ")[0]}</span>
                {cert.code && (
                  <span className="border border-rule px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-accent">
                    {cert.code}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight">
                {cert.name}
              </h3>
              {/*
                No date is shown when one isn't known — "to be confirmed" on eight
                cards reads as an unfinished site rather than a considered omission.
              */}
              {(cert.issued || cert.credentialUrl) && (
                <p className="annot mt-auto pt-4 normal-case tracking-[0.06em]">
                  {cert.issued}
                  {cert.credentialUrl && (
                    <span className={cert.issued ? "ml-2 text-accent" : "text-accent"}>Verify →</span>
                  )}
                </p>
              )}
            </div>
          );

          return (
            <Reveal key={cert.name} delay={Math.min(i, 4) * 50} className="bg-bg">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
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
