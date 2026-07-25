import { Reveal } from "@/components/blueprint/reveal";
import { profile } from "@/content/profile";
import { AvatarRing } from "./avatar-ring";

const socials = [
  { label: "LinkedIn", href: profile.contact.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: profile.contact.github, icon: GitHubIcon },
  { label: "Email", href: `mailto:${profile.contact.email}`, icon: MailIcon },
  { label: "Phone", href: profile.contact.phoneHref, icon: PhoneIcon },
];

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section className="relative overflow-hidden">
      {/* Accent bloom behind the portrait, keeps the right side from going flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 hidden size-[42rem] translate-x-1/4 -translate-y-1/4 rounded-full xl:block"
        style={{ background: "radial-gradient(circle, var(--accent-wash), transparent 65%)" }}
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 xl:py-20">
        <div className="flex flex-col items-center justify-between gap-14 xl:flex-row xl:gap-10">
          {/* Portrait first on mobile, second on desktop — same as the model. */}
          <div className="order-1 xl:order-2">
            <Reveal>
              <AvatarRing />
            </Reveal>
          </div>

          <div className="order-2 w-full text-center xl:order-1 xl:text-left">
            {profile.availability.open && (
              <Reveal>
                <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent-line bg-accent-wash px-3.5 py-1.5">
                  <span className="relative grid size-1.5 place-items-center">
                    <span className="absolute size-1.5 rounded-full bg-accent animate-pulse-dot" />
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-accent">
                    {profile.availability.label}
                  </span>
                </p>
              </Reveal>
            )}

            <Reveal delay={60}>
              <p className="text-lg text-ink-soft sm:text-xl">{profile.title}</p>

              <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl xl:text-[4.2rem]">
                <span className="block">Hello I&apos;m</span>
                {/* Accent wipe sweeps in from the left and flips the text dark. */}
                <span className="group relative mt-1 inline-block cursor-default overflow-hidden align-top">
                  <span className="relative z-10 block px-1 text-accent transition-colors duration-500 group-hover:text-accent-ink">
                    {first}
                    <br />
                    {rest.join(" ")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-7 max-w-[34rem] text-[13.5px] leading-relaxed text-ink-soft sm:text-[15px] xl:mx-0">
                {profile.discipline} | {profile.location}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col items-center gap-7 xl:flex-row xl:gap-8">
                {profile.assets.hasCv ? (
                  <a
                    href={profile.cv}
                    className="neon-outline group flex h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold uppercase tracking-[2px]"
                  >
                    View CV
                    <Chevron />
                  </a>
                ) : (
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="neon-outline group flex h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold uppercase tracking-[2px]"
                  >
                    Get in touch
                    <Chevron />
                  </a>
                )}

                <ul className="flex gap-5">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        aria-label={label}
                        className="neon-outline flex size-9 items-center justify-center rounded-full"
                      >
                        <Icon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* Inline icons — no icon package, keeps the bundle to what is actually used. */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.6 8.75 21 11.1 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.05 0-2.37 1.58-2.37 3.21V21H9z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-4"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}
