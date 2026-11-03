/**
 * Identity, contact, and the headline numbers.
 *
 * Sourced from the current CV (Mohammed-Laeque-CV, Aug 2026) and
 * linkedin.com/in/laeque. Where the CV and an older figure disagreed, the CV
 * wins — it is the document being sent out, and two different numbers for the
 * same estate is worse than the smaller one.
 */

/** First professional role: System Engineer at EYS IT Solutions, October 2020. */
const CAREER_START = Date.UTC(2020, 9, 1);

/**
 * Experience in whole years, derived rather than written down.
 *
 * This was hardcoded as "4" and was wrong by nearly two years — the figure came
 * from a LinkedIn summary written long before, and nobody remembers to bump a
 * literal. Computed at build time and floored, so the claim is always current
 * and never rounds up. Every deploy refreshes it.
 */
export const yearsExperience = Math.floor(
  (Date.now() - CAREER_START) / (365.25 * 24 * 60 * 60 * 1000),
);

export type Avatar = {
  src: string;
  /** Used in the button's accessible label: "Change portrait. Current: …". */
  mood: string;
  /**
   * Scale applied inside the circular frame, for artwork that doesn't already
   * fill it. Omit unless the subject is genuinely too small.
   */
  zoom?: number;
};

/*
 * The hero portrait flips between these on click, in array order — index 0 is
 * what loads, index 1 is the first click, and so on. Any number of entries
 * works, so new artwork is a one-line insert at the position you want it
 * revealed.
 *
 * The trailing three are the same caricature re-tinted; replace them as real
 * alternates arrive.
 *
 * Declared out here with an explicit type rather than inline below: `profile`
 * is `as const`, which would infer a union of two different object shapes and
 * make `zoom` unreadable on the entries that lack it.
 */
const avatars: Avatar[] = [
  { src: "/avatar-scene.jpg", mood: "on location" },
  { src: "/avatar-teal.png", mood: "teal" },
  /*
   * Deliberately unzoomed. The subject sits inside a pale disc covering about
   * 57% of a white square, so the frame shows that disc small, ringed in white.
   * A zoom of ~1.72 would push it out to the edge if that's ever wanted.
   */
  { src: "/avatar-headshot.jpg", mood: "headshot" },
  { src: "/avatar-rose.png", mood: "rose" },
  { src: "/avatar-slate.png", mood: "slate" },
];

export const profile = {
  name: "Mohammed Laeque",
  initials: "ML",
  /* Verbatim from the CV's title line, so the two documents introduce the same person. */
  title: "Digital Workplace Specialist",
  headline: "Microsoft 365, Intune & Entra ID Engineering",
  /* Single line, for the share card and metadata where wrapping isn't available. */
  discipline:
    "Microsoft 365 · Intune · Entra ID · Active Directory · Automation",
  /* Hand-broken for the hero, where two balanced lines read better than one long one. */
  disciplineLines: [
    "Microsoft 365 · Intune · Entra ID",
    "Active Directory · Automation",
  ],
  location: "Abu Dhabi, UAE",

  intro:
    "I run and consolidate the identity, endpoint, and collaboration layers that large organisations depend on — Microsoft 365, Intune, Conditional Access and hybrid identity, and the tenant-scale migrations that get an estate onto one governed platform.",

  summary: `${yearsExperience}+ years delivering enterprise-scale Microsoft 365, Intune endpoint management, and hybrid identity work. Accountable for Microsoft 365 administration, endpoint management, identity and access, and the supporting security tooling across a multi-domain, multi-forest environment of 5,000+ identities and 3,700+ managed devices, delivered in production hours rather than in maintenance windows.`,

  /*
   * No badge any more — this only drives the "Looking for" block and the lede
   * in the contact section. Set `open: false` and both disappear.
   */
  availability: {
    open: true,
    detail: "Open to roles across the UAE",
  },

  contact: {
    email: "laequeofficial@gmail.com",
    /*
     * Hidden by choice (2026-11-03): a published number draws spam and scrapers,
     * and email and LinkedIn are enough for a first contact. Flip `showPhone`
     * to put it back in the hero, contact section and footer.
     */
    phone: "+971 56 655 0852",
    phoneHref: "tel:+971566550852",
    showPhone: false,
    linkedin: "https://www.linkedin.com/in/laeque/",
    linkedinLabel: "linkedin.com/in/laeque",
    github: "https://github.com/laequee",
    githubLabel: "github.com/laequee",
  },

  /**
   * TODO(assets): drop the CV into /public and flip `hasCv`.
   * Until then the CV links stay hidden rather than shipping links that 404.
   */
  photo: "/laeque.png",
  cv: "/mohammed-laeque-cv.pdf",
  assets: {
    hasPhoto: true,
    hasCv: false,
  },

  avatars,

  education: {
    degree: "BCA, Computer Applications",
    institution: "Calicut University",
    campus: "Thenhipalam, Malappuram",
    period: "2017 — 2020",
    note: "National Service Scheme",
  },

  languages: [
    { name: "English", level: "Full professional" },
    { name: "Malayalam", level: "Native / bilingual" },
    { name: "Hindi", level: "Professional working" },
  ],
} as const;

/**
 * The headline, broken by hand. A split() rule cannot make a typographic
 * judgement, and letting it wrap on its own orphans the ampersand.
 *
 * Lives here rather than in the hero because the share card renders the same
 * phrase. It was previously written out twice, and the two drifted — the card
 * kept claiming the old headline for as long as nobody looked at it.
 *
 * Longest line is 17 monospace characters, which is what sets the hero's type
 * size. Change the wording and check `hero.tsx` — the arithmetic is in the
 * comment above HeadlineLine.
 */
export const headlineLines = [
  { text: "Microsoft 365,", accent: false },
  { text: "Intune & Entra ID", accent: true },
  { text: "Engineering", accent: true },
] as const;

/**
 * Hero stat strip. `value` and `suffix` are split so the count-up animation
 * can run on the numeral alone.
 *
 * Four figures, all from the CV banner. The CV carries two more — 4,000+
 * mailboxes managed and 90%+ CIS compliance — which sit on the case studies
 * that earned them rather than competing for space here.
 */
export const headlineStats = [
  { value: yearsExperience, suffix: "+", label: "Years in Enterprise IT", note: "Since Oct 2020" },
  { value: 5000, suffix: "+", label: "Identities Managed", note: "Entra ID · multi-forest AD" },
  { value: 3700, suffix: "+", label: "Endpoints Managed", note: "Intune · Autopilot" },
  { value: 2500, suffix: "+", label: "EDR Sensors Operated", note: "CrowdStrike Falcon" },
] as const;
