/**
 * Identity, contact, and the headline numbers.
 * Sourced from linkedin.com/in/laeque and the previous portfolio.
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
  title: "Cloud, Identity & Security Engineer",
  headline: "Enterprise Cloud, Identity & Endpoint Engineering",
  /* Single line, for the share card and metadata where wrapping isn't available. */
  discipline: "Identity · Endpoint Management · Security · Automation · Microsoft 365 · Azure",
  /* Hand-broken for the hero, where two balanced lines read better than one long one. */
  disciplineLines: [
    "Identity · Endpoint Management · Security",
    "Automation · Microsoft 365 · Azure",
  ],
  location: "Abu Dhabi, UAE",

  intro:
    "I build and consolidate the identity, endpoint, and collaboration layers that large organisations run on — tenant migrations, Active Directory consolidation, Intune at scale, and the Zero Trust controls that hold it together.",

  summary: `${yearsExperience}+ years delivering enterprise-scale cloud, endpoint, and hybrid identity work across multi-tenant environments. Most of it is migration and consolidation: moving thousands of endpoints between security tenants without downtime, collapsing legacy domains into a single directory, and taking file servers into SharePoint Online for business units that had never left the shared drive.`,

  /*
   * No badge any more — this only drives the "Looking for" block and the lede
   * in the contact section. Set `open: false` and both disappear.
   */
  availability: {
    open: true,
    detail: "Open to roles in Dubai · on-site or hybrid",
  },

  contact: {
    email: "laequeofficial@gmail.com",
    phone: "+971 56 655 0852",
    phoneHref: "tel:+971566550852",
    linkedin: "https://www.linkedin.com/in/laeque/",
    linkedinLabel: "linkedin.com/in/laeque",
    github: "https://github.com/laequee",
    githubLabel: "github.com/laequee",
  },

  /**
   * TODO(assets): drop the real files into /public and flip the flags.
   * Until then the hero renders a monogram plate and the CV links are hidden,
   * rather than shipping links that 404.
   */
  photo: "/laeque.png",
  cv: "/mohammed-laeque-cv.pdf",
  assets: {
    hasPhoto: true,
    hasCv: false,
  },

  avatars,

  education: {
    degree: "BCA, Computer Science",
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
 * Hero stat strip. `value` and `suffix` are split so the count-up animation
 * can run on the numeral alone.
 */
export const headlineStats = [
  { value: yearsExperience, suffix: "+", label: "Years in Enterprise IT", note: "Since Oct 2020" },
  { value: 4500, suffix: "+", label: "Endpoints Protected", note: "CrowdStrike · Defender" },
  { value: 2000, suffix: "+", label: "Devices Managed", note: "Intune · Autopilot" },
  { value: 14, suffix: "+", label: "Business Units Supported", note: "Enterprise IT delivery" },
] as const;
