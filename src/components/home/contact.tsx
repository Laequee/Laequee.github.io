import Image from "next/image";

import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";
import { CopyField } from "@/components/copy-field";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section
      index="05"
      id="contact"
      title="Let's talk"
      lede={
        profile.availability.open
          ? `${profile.availability.detail}. Email is the fastest way to reach me.`
          : "Email is the fastest way to reach me."
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <Reveal className="panel px-6 py-3 sm:px-8 sm:py-4">
          <CopyField
            label="Email"
            value={profile.contact.email}
            href={`mailto:${profile.contact.email}`}
          />
          {profile.contact.showPhone && (
            <CopyField label="Phone" value={profile.contact.phone} href={profile.contact.phoneHref} />
          )}
          <CopyField
            label="LinkedIn"
            value={profile.contact.linkedinLabel}
            href={profile.contact.linkedin}
          />
          <CopyField label="GitHub" value={profile.contact.githubLabel} href={profile.contact.github} />
          {profile.cvUrl && <CopyField label="CV" value="Open in Google Drive ↗" href={profile.cvUrl} copyValue={profile.cvUrl} />}
        </Reveal>

        <Reveal delay={80} className="panel flex items-center gap-5 p-6 lg:flex-col lg:items-start">
          <Image
            src={profile.avatars[0].src}
            alt={`${profile.name}, ${profile.title}`}
            width={160}
            height={160}
            className="size-20 shrink-0 rounded-full border border-rule-strong object-cover lg:size-28"
          />
          <div>
            <p className="font-display text-lg font-bold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-[14px] text-ink-soft">{profile.title} · HCLTech</p>
            <p className="annot mt-2 normal-case tracking-[0.06em]">{profile.location}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
