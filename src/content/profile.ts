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

export const profile = {
  name: "Mohammed Laeque",
  initials: "ML",
  title: "IT Specialist",
  headline: "Cloud, Identity & Endpoint Engineering",
  discipline: "Microsoft 365 · Entra ID · Intune · Security & Infrastructure",
  location: "Al Zahiyah, Abu Dhabi, UAE",

  intro:
    "I build and consolidate the identity, endpoint, and collaboration layers that large organisations run on — tenant migrations, Active Directory consolidation, Intune at scale, and the Zero Trust controls that hold it together.",

  summary: `${yearsExperience}+ years delivering enterprise-scale cloud, endpoint, and hybrid identity work across multi-tenant environments. Most of it is migration and consolidation: moving thousands of endpoints between security tenants without downtime, collapsing legacy domains into a single directory, and taking file servers into SharePoint Online for business units that had never left the shared drive.`,

  availability: {
    open: true,
    label: "Available for hire",
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
  { value: yearsExperience, suffix: "+", label: "Years in enterprise IT", note: "Since Oct 2020" },
  { value: 4500, suffix: "+", label: "Endpoints secured", note: "CrowdStrike migration" },
  { value: 2000, suffix: "+", label: "Devices under Intune", note: "Autopilot · compliance" },
  { value: 14, suffix: "+", label: "Business units served", note: "Current engagement" },
] as const;
