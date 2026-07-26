import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { CopyField } from "@/components/copy-field";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section
      index="07"
      id="contact"
      title="Get in touch"
      lede={
        profile.availability.open
          ? `${profile.availability.detail}. The fastest route is email — I read everything.`
          : "The fastest route is email — I read everything."
      }
      raised
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <Reveal>
          <div className="max-w-2xl">
            <CopyField
              label="Email"
              value={profile.contact.email}
              href={`mailto:${profile.contact.email}`}
            />
            <CopyField
              label="Phone"
              value={profile.contact.phone}
              href={profile.contact.phoneHref}
            />
            <CopyField
              label="LinkedIn"
              value={profile.contact.linkedinLabel}
              href={profile.contact.linkedin}
            />
            <CopyField
              label="GitHub"
              value={profile.contact.githubLabel}
              href={profile.contact.github}
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="border border-rule bg-bg px-5 py-6">
            <span className="annot">Currently</span>
            <p className="mt-3 text-[15px] font-semibold leading-snug tracking-tight">
              {profile.title}
            </p>
            <p className="mt-1 text-sm text-ink-soft">HCLTech</p>
            <p className="annot mt-4 normal-case tracking-[0.06em]">{profile.location}</p>

            {profile.availability.open && (
              <>
                <div className="my-5 h-px bg-rule" />
                <span className="annot">Looking for</span>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {profile.availability.detail}
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
