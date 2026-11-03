/**
 * Case studies.
 *
 * Four, chosen to match the positioning: Microsoft 365, Intune and identity
 * first, security tooling second. Each one is a short story — what the problem
 * was, what was done, what it changed — not a project report. Every claim here
 * must trace to the CV or to something the owner confirmed; trimmed 2026-11-03.
 * Passwordless, Exchange hardening and the other smaller pieces of work are
 * one-line highlights in experience.ts instead.
 *
 * Metrics with `pending: true` are numbers the owner does not have yet. They
 * render as a dash. Never invent a value to replace one.
 */

export type Metric = {
  value: string;
  label: string;
  pending?: boolean;
};

/** One of the wordmark tones in globals.css; colours the card and the page. */
export type Tone = "violet" | "azure" | "teal" | "amber" | "coral" | "rose";

export type Project = {
  slug: string;
  tone: Tone;
  index: string;
  title: string;
  kind: string;
  client: string;
  employer: string;
  period: string;
  role: string;
  featured: boolean;
  /** One or two sentences. Shown on the home page card and as the page lede. */
  summary: string;
  metrics: Metric[];
  /** The problem, in one short paragraph. */
  context: string[];
  /** Three or four steps, one sentence each. */
  approach: { step: string; detail: string }[];
  outcome: string[];
  stack: string[];
  diagram: {
    caption: string;
    layers: { label: string; nodes: string[] }[];
  };
  keywords?: string[];
  /*
   * Three margin notes, handwritten onto the home-page card on hover. Each is
   * a fact already stated in this case study, shortened: never a new claim.
   * Keep each under ~24 characters or it collides with the doodle.
   */
  notes: [string, string, string];
  /** Outstanding questions, shown only in the dev build. */
  needs: string[];
};

export const projects: Project[] = [
  {
    slug: "intune-endpoint-platform",
    notes: ["zero-touch Autopilot", "BitLocker + LAPS", "posture → Conditional Access"],
    tone: "azure",
    index: "01",
    title: "Intune Endpoint Platform",
    kind: "Endpoint management · Zero Trust",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — Present",
    role: "Platform architect",
    featured: true,
    summary:
      "Designed and run Microsoft Intune for 3,700+ Windows and macOS devices, with device compliance feeding Conditional Access.",
    metrics: [
      { value: "3,700+", label: "Devices managed" },
      { value: "0", label: "Site visits to onboard an acquired entity" },
    ],
    context: [
      "A multi-site Windows and macOS estate needed one management platform, with access decided by the state of the device and not only by the password.",
    ],
    approach: [
      {
        step: "Zero-touch provisioning",
        detail:
          "Autopilot and MDM auto-enrolment, so a new device configures itself on first sign-in.",
      },
      {
        step: "Security baseline",
        detail:
          "Compliance and configuration profiles, BitLocker, and Windows LAPS for a unique, rotated local admin password on every device.",
      },
      {
        step: "App delivery",
        detail: "Win32 application packaging and deployment through Intune.",
      },
      {
        step: "Posture into access",
        detail:
          "Device compliance wired into Conditional Access, plus tooling to audit assignments and detect configuration drift.",
      },
    ],
    outcome: [
      "New devices reach a compliant state without an engineer touching them.",
      "Corporate access granted on device posture, not credentials alone.",
      "An acquired entity brought onto central management with a no-reboot method: no site visits, no downtime.",
    ],
    stack: [
      "Microsoft Intune",
      "Windows Autopilot",
      "Entra ID",
      "Conditional Access",
      "BitLocker",
      "Windows LAPS",
      "PowerShell",
    ],
    diagram: {
      caption: "From vendor to compliant device",
      layers: [
        { label: "Supply", nodes: ["Vendor", "Autopilot registration"] },
        { label: "Enrolment", nodes: ["Entra ID", "Intune enrolment"] },
        { label: "Configuration", nodes: ["Compliance", "BitLocker", "Windows LAPS", "Win32 apps"] },
        { label: "Access", nodes: ["Conditional Access"] },
      ],
    },
    keywords: [
      "Microsoft Intune",
      "Windows Autopilot",
      "MDM auto-enrolment",
      "BitLocker",
      "Windows LAPS",
      "Win32 app packaging",
      "device compliance Conditional Access",
    ],
    needs: [
      "Compliance percentage achieved, if you have it.",
      "Roughly how many Win32 apps you packaged.",
    ],
  },

  {
    slug: "crowdstrike-tenant-migration",
    notes: ["uninstall + install = 1 run", "7 domains", "tracked host by host"],
    tone: "coral",
    index: "02",
    title: "CrowdStrike Tenant Migration",
    kind: "Endpoint security · Migration",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Migration lead",
    featured: true,
    summary:
      "Moved 2,500+ endpoints across seven domains to a new CrowdStrike tenant before a fixed licence expiry, with no host left behind and no service impact.",
    metrics: [
      { value: "2,500+", label: "Sensors removed and reinstalled" },
      { value: "7", label: "AD domains in scope" },
      { value: "0", label: "Hosts left on the old tenant" },
    ],
    context: [
      "A licensing change meant every endpoint had to move to a new CrowdStrike tenant by a fixed date. With no bulk transfer available, each sensor had to be uninstalled and a new one installed, and a host that failed halfway would be unprotected and invisible in both consoles.",
    ],
    approach: [
      {
        step: "Own the inventory",
        detail:
          "Built the host list from Active Directory and Intune, so a missing machine showed up by name rather than as a lower count.",
      },
      {
        step: "One run per host",
        detail:
          "Packaged uninstall and reinstall as a single sequenced run, so no machine sat unprotected between the two.",
      },
      {
        step: "Policies ready first",
        detail:
          "Rebuilt host groups and prevention policies in the new tenant beforehand, so each host was protected on first check-in.",
      },
      {
        step: "Reach every machine",
        detail:
          "Delivered through Intune, Group Policy and a runbook for site engineers, and tracked every host to completion.",
      },
    ],
    outcome: [
      "2,500+ endpoints moved ahead of the licence expiry, every one accounted for.",
      "Protection confirmed in the new console, not assumed from deployment reports.",
      "No service impact and no change visible to users.",
    ],
    stack: [
      "CrowdStrike Falcon",
      "Microsoft Intune",
      "Win32 app packaging",
      "Group Policy",
      "Active Directory",
      "PowerShell",
    ],
    diagram: {
      caption: "No transfer path, so every sensor came off and went back on, tracked outside both consoles.",
      layers: [
        { label: "Trigger", nodes: ["Licensing change", "Fixed expiry date"] },
        { label: "Route", nodes: ["Uninstall + install as one run", "Intune · GPO · site engineers"] },
        { label: "Proof", nodes: ["Per-host tracking", "Checked in new console"] },
      ],
    },
    keywords: [
      "CrowdStrike Falcon",
      "tenant migration",
      "sensor reinstall",
      "endpoint protection",
      "Intune Win32 deployment",
    ],
    needs: ["How long the migration ran end to end."],
  },

  {
    slug: "active-directory-consolidation",
    notes: ["FRS → DFSR", "FFL 2008 → 2025", "no duplicate cloud accounts"],
    tone: "violet",
    index: "03",
    title: "Active Directory Modernisation",
    kind: "Directory services · Hybrid identity",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — Present",
    /* "Key contributor", matching the CV. The site previously said "Technical lead". */
    role: "Key contributor",
    featured: true,
    summary:
      "Part of the programme that took the group's directory from a Windows Server 2008 functional level to 2025, retired eight legacy domain controllers and re-anchored hybrid identity.",
    metrics: [
      { value: "8", label: "Legacy DCs decommissioned" },
      { value: "2008 → 2025", label: "Functional level" },
      { value: "5,000+", label: "Identities in scope" },
    ],
    context: [
      "Years of acquisitions had left the identity layer on old infrastructure: a 2008 functional level, SYSVOL still on the deprecated FRS, and domain controllers spread across legacy sites. Everything authenticated against it, so it could never go offline.",
    ],
    approach: [
      {
        step: "Clear the blockers",
        detail: "Moved SYSVOL replication from FRS to DFSR, then raised functional levels in staged steps.",
      },
      {
        step: "Rebuild the controllers",
        detail:
          "Transferred FSMO roles to new Windows Server 2025 controllers, with replication health checked at each step, and decommissioned the old ones.",
      },
      {
        step: "Protect hybrid identity",
        detail:
          "Upgraded Entra Connect and moved the source anchor to mS-DS-ConsistencyGuid, so users can move between domains without duplicate cloud accounts.",
      },
      {
        step: "Consolidate users",
        detail: "Cross-domain user migration with UPN normalisation and access remapping.",
      },
    ],
    outcome: [
      "A current, supported directory with eight legacy controllers gone.",
      "Hybrid identity ready for the remaining domain consolidations.",
      "Authentication and DNS stable throughout.",
    ],
    stack: [
      "Active Directory",
      "Windows Server 2025",
      "DFSR",
      "Entra Connect",
      "Group Policy",
      "DNS / DHCP",
      "PowerShell",
    ],
    diagram: {
      caption: "Legacy controllers retired, hybrid identity re-anchored.",
      layers: [
        { label: "Before", nodes: ["8 legacy DCs", "FFL 2008", "FRS"] },
        { label: "Transition", nodes: ["FRS → DFSR", "FSMO transfer", "Source anchor change"] },
        { label: "After", nodes: ["Server 2025 DCs", "FFL 2025", "ConsistencyGuid"] },
      ],
    },
    keywords: [
      "Active Directory modernisation",
      "FRS to DFSR",
      "domain controller decommission",
      "FSMO transfer",
      "Entra Connect source anchor",
      "hybrid identity",
    ],
    needs: [],
  },

  {
    slug: "sharepoint-file-server-migration",
    notes: ["archive, don't migrate", "groups, not per-user grants", "no more VPN"],
    tone: "teal",
    index: "04",
    title: "File Servers to SharePoint",
    kind: "Collaboration · Migration · Governance",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Migration engineer",
    featured: true,
    summary:
      "Moved on-premises file servers to SharePoint Online and OneDrive with a rebuilt permission model, and maintain the intranet used by 14+ business functions.",
    metrics: [
      { value: "5", label: "Business units migrated" },
      { value: "14+", label: "Business functions on the intranet" },
      { value: "2,000+", label: "SharePoint sites administered" },
    ],
    context: [
      "Business units ran their own file servers with years of tangled folder permissions. Remote access meant VPN and collaboration meant emailing copies.",
    ],
    approach: [
      {
        step: "Clean before moving",
        detail: "Assessed each share and archived stale data instead of migrating it.",
      },
      {
        step: "Redesign permissions",
        detail: "Replaced per-user folder grants with Entra ID groups mapped to sites and libraries.",
      },
      {
        step: "Govern it",
        detail:
          "Structured permissions, governance models and retention policies, so the new platform does not drift back into a file share.",
      },
    ],
    outcome: [
      "File access without VPN, with version history and self-service recovery.",
      "Access managed through group membership, not tickets.",
      "Capacity planning found multi-terabyte savings without removing live content.",
    ],
    stack: ["SharePoint Online", "OneDrive", "Microsoft Teams", "Entra ID", "Microsoft Purview", "PowerShell"],
    diagram: {
      caption: "Shares cleaned and re-permissioned on the way in.",
      layers: [
        { label: "Source", nodes: ["Business unit file servers"] },
        { label: "Process", nodes: ["Assessment", "Permission redesign", "Migration"] },
        { label: "Target", nodes: ["SharePoint Online", "OneDrive", "Teams"] },
      ],
    },
    keywords: [
      "file server to SharePoint migration",
      "SharePoint governance",
      "OneDrive",
      "Entra ID group permissions",
    ],
    needs: ["Total data volume moved, in TB."],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Prev/next by list order, used by the detail page footer. */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((project) => project.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
