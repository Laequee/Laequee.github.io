/**
 * Case studies.
 *
 * Every metric with `pending: true` is a number I do not have yet — it renders as a
 * dash with a "to be confirmed" affordance rather than a guess. Search this file for
 * `pending` to find everything still outstanding.
 *
 * Narrative copy is drawn from the LinkedIn role descriptions and the previous
 * portfolio. Treat it as a strong first draft to correct, not as finished text.
 */

export type Metric = {
  value: string;
  label: string;
  pending?: boolean;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  client: string;
  employer: string;
  period: string;
  role: string;
  featured: boolean;
  summary: string;
  metrics: Metric[];
  context: string[];
  approach: { step: string; detail: string }[];
  outcome: string[];
  stack: string[];
  diagram: {
    caption: string;
    layers: { label: string; nodes: string[] }[];
  };
  /** Outstanding questions, surfaced in the build so nothing is quietly forgotten. */
  needs: string[];
};

export const projects: Project[] = [
  {
    slug: "crowdstrike-tenant-migration",
    index: "01",
    title: "CrowdStrike Tenant Migration",
    kind: "Endpoint security · Enterprise migration",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2025",
    role: "Migration lead",
    featured: true,
    summary:
      "Moved an entire group's endpoint protection estate onto a single CrowdStrike tenant, spanning seven Active Directory domains and 4,500+ endpoints, without interrupting protection.",
    metrics: [
      { value: "4,500+", label: "Endpoints migrated" },
      { value: "7", label: "AD domains in scope" },
      { value: "—", label: "Migration window", pending: true },
      { value: "—", label: "Downtime taken", pending: true },
    ],
    context: [
      "Endpoint protection was split across separate tenants, one per acquired entity. Seven Active Directory domains meant seven consoles, seven policy sets, and no single view of the group's security posture.",
      "Detections could not be correlated across entities, and reporting to leadership meant manually stitching together exports. Any group-wide response to an incident was slow by construction.",
    ],
    approach: [
      {
        step: "Inventory and reconcile",
        detail:
          "Built a full endpoint inventory across all seven domains, reconciled against Intune and AD records, and identified stale, duplicate, and unmanaged devices before touching anything.",
      },
      {
        step: "Stage the target tenant",
        detail:
          "Prepared the destination tenant with host groups, prevention policies, and sensor update policies mapped to the existing per-entity configurations, so no device lost coverage on cutover.",
      },
      {
        step: "Phased sensor migration",
        detail:
          "Migrated in waves by domain and business unit, using scripted sensor re-registration with maintenance tokens. Each wave was validated before the next began.",
      },
      {
        step: "Validate and decommission",
        detail:
          "Confirmed check-in, policy application, and detection telemetry per wave, then retired the source tenants once every endpoint reported clean.",
      },
    ],
    outcome: [
      "A single console covering the whole group, with consistent prevention policy across every entity.",
      "Detections correlate across business units for the first time, and group-level reporting comes straight from the console.",
      "Legacy tenants decommissioned, removing duplicate licensing and administrative overhead.",
    ],
    stack: ["CrowdStrike Falcon", "Active Directory", "Intune", "PowerShell", "Microsoft Graph"],
    diagram: {
      caption: "Seven source tenants consolidated into one",
      layers: [
        { label: "Before", nodes: ["Domain A", "Domain B", "Domain C", "+4 more"] },
        { label: "Migration", nodes: ["Inventory", "Staging", "Wave cutover", "Validation"] },
        { label: "After", nodes: ["Single Falcon tenant"] },
      ],
    },
    needs: [
      "How long the migration ran end to end",
      "Downtime or protection gap taken, if any",
      "How many users were affected",
      "Whether you led it outright or executed under someone else's plan",
    ],
  },

  {
    slug: "active-directory-consolidation",
    index: "02",
    title: "Active Directory Consolidation",
    kind: "Hybrid identity · Directory services",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2025",
    role: "Programme contributor",
    featured: true,
    summary:
      "Collapsed a fragmented multi-domain directory into a consolidated estate, migrating users across domains and retiring legacy domain controllers while hybrid identity stayed online.",
    metrics: [
      { value: "—", label: "Domains consolidated", pending: true },
      { value: "—", label: "Users migrated", pending: true },
      { value: "—", label: "DCs decommissioned", pending: true },
      { value: "0", label: "Identity outages", pending: true },
    ],
    context: [
      "Years of acquisitions had left the group with multiple Active Directory domains, each with its own controllers, GPO sets, and trust relationships.",
      "Every new policy had to be authored several times over, and hybrid identity to Entra ID was correspondingly fragile — the more sync sources, the more ways it could break.",
    ],
    approach: [
      {
        step: "Map the estate",
        detail:
          "Documented domains, trusts, FSMO role placement, DNS and DHCP dependencies, and every service account with a hard dependency on a legacy controller.",
      },
      {
        step: "Cross-domain user migration",
        detail:
          "Migrated user and group objects between domains with SID history preserved, so existing resource access survived the move.",
      },
      {
        step: "Azure AD Connect source anchor transition",
        detail:
          "Upgraded Azure AD Connect and moved the source anchor to ms-DS-ConsistencyGuid, decoupling cloud identity from the on-premises object GUID so users could move between domains without duplicate cloud accounts.",
      },
      {
        step: "Decommission",
        detail:
          "Transferred FSMO roles, repointed DNS and DHCP, demoted legacy controllers, and cleaned up stale trust relationships and DNS records.",
      },
    ],
    outcome: [
      "A consolidated directory with a single authoritative policy set instead of one per acquired entity.",
      "Hybrid identity resilient to future domain moves, thanks to the source anchor change.",
      "Legacy domain controllers retired, removing an unpatched attack surface and the licensing behind it.",
    ],
    stack: ["Active Directory", "Azure AD Connect", "Entra ID", "Group Policy", "DNS / DHCP", "PowerShell"],
    diagram: {
      caption: "Fragmented domains to a consolidated directory",
      layers: [
        { label: "Legacy", nodes: ["Domain 1", "Domain 2", "Domain 3", "Trusts"] },
        { label: "Transition", nodes: ["SID history", "AAD Connect", "Source anchor"] },
        { label: "Target", nodes: ["Consolidated AD", "Entra ID"] },
      ],
    },
    needs: [
      "Domain count before and after",
      "Number of users and groups migrated",
      "How many domain controllers were decommissioned",
      "Whether SID history was actually used, or a different approach",
      "Your specific role — led, executed, or supported",
    ],
  },

  {
    slug: "intune-endpoint-platform",
    index: "03",
    title: "Intune Endpoint Platform",
    kind: "Endpoint management · Zero Trust",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Platform architect",
    featured: true,
    summary:
      "Designed and rolled out modern endpoint management for 2,000+ devices — Autopilot provisioning, compliance baselines, BitLocker, and LAPS replacing manual imaging and local admin passwords.",
    metrics: [
      { value: "2,000+", label: "Devices managed" },
      { value: "—", label: "Provisioned via Autopilot", pending: true },
      { value: "—", label: "Compliance rate reached", pending: true },
      { value: "—", label: "Rollout period", pending: true },
    ],
    context: [
      "Devices were built by hand from images, joined to the domain on site, and configured by whoever set them up. Local administrator passwords were shared and rarely rotated.",
      "There was no reliable answer to a basic question — which devices are encrypted, patched, and compliant right now.",
    ],
    approach: [
      {
        step: "Baseline and policy design",
        detail:
          "Authored compliance policies and configuration profiles mapped to the group's security requirements, translating existing Group Policy settings into their Intune equivalents.",
      },
      {
        step: "Autopilot provisioning",
        detail:
          "Registered hardware for Autopilot so devices ship to the user and configure themselves on first sign-in, removing the build bench from the process entirely.",
      },
      {
        step: "Encryption and credential hygiene",
        detail:
          "Enforced BitLocker with key escrow to Entra ID, and deployed Windows LAPS so every device holds a unique, automatically rotated local administrator password.",
      },
      {
        step: "Application delivery",
        detail:
          "Packaged and published Win32 applications through Intune with detection and requirement rules, replacing manual installs and share-based deployment.",
      },
      {
        step: "Co-management and cutover",
        detail:
          "Moved devices from on-premises AD to Entra ID join with Intune enrolment, shifting workloads across in a controlled sequence.",
      },
    ],
    outcome: [
      "New devices reach a compliant, fully configured state without an engineer touching them.",
      "Encryption status, patch level, and compliance are reportable across the estate on demand.",
      "Shared local administrator passwords eliminated — each device now rotates its own.",
    ],
    stack: ["Microsoft Intune", "Windows Autopilot", "Entra ID", "BitLocker", "Windows LAPS", "Win32 apps", "PowerShell"],
    diagram: {
      caption: "Provisioning path from vendor to compliant device",
      layers: [
        { label: "Supply", nodes: ["Vendor", "Autopilot registration"] },
        { label: "Enrolment", nodes: ["Entra ID join", "Intune enrolment"] },
        { label: "Configuration", nodes: ["Compliance", "BitLocker", "LAPS", "Win32 apps"] },
        { label: "Steady state", nodes: ["Reporting", "Conditional Access"] },
      ],
    },
    needs: [
      "How many of the 2,000 came through Autopilot vs migrated in",
      "Compliance percentage achieved, and the baseline it started from",
      "Over what period the rollout ran",
      "Roughly how many Win32 apps you packaged",
    ],
  },

  {
    slug: "sharepoint-file-server-migration",
    index: "04",
    title: "File Server to SharePoint Online",
    kind: "Collaboration · Data migration",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Migration engineer",
    featured: true,
    summary:
      "Moved multi-terabyte file servers into SharePoint Online across five business units — Head Office, Grand Mills, Atyab, Abu Auf, and Riviere — rebuilding permission models on the way.",
    metrics: [
      { value: "5", label: "Business units migrated" },
      { value: "—", label: "Terabytes moved", pending: true },
      { value: "—", label: "Users affected", pending: true },
      { value: "—", label: "Sites created", pending: true },
    ],
    context: [
      "Each business unit ran its own file server with a decade of accumulated structure — deep folder nesting, broken NTFS inheritance, and permissions granted to individuals long since departed.",
      "Remote access meant VPN. Collaboration meant emailing copies. Neither survived the shift to hybrid work.",
    ],
    approach: [
      {
        step: "Assess and rationalise",
        detail:
          "Scanned each share for size, path length, unsupported characters, and last-accessed dates. Stale and duplicated data was archived rather than migrated — the cheapest terabyte to move is the one you don't.",
      },
      {
        step: "Redesign the permission model",
        detail:
          "Replaced per-user NTFS grants with Entra ID security groups mapped to SharePoint site and library permissions, flattening the structure to fit how SharePoint actually works.",
      },
      {
        step: "Migrate in waves",
        detail:
          "Ran bulk transfers per business unit with incremental delta passes, so the final cutover only moved what had changed since the bulk copy.",
      },
      {
        step: "Cut over and support",
        detail:
          "Set shares read-only at cutover, repointed users via OneDrive sync and Teams, and ran floor-walking support through the first week.",
      },
    ],
    outcome: [
      "Five business units working from SharePoint Online with no VPN dependency for file access.",
      "Permissions carried by security groups rather than individual grants, so joiners and leavers are handled by group membership.",
      "Version history and recycle bin available where previously the only recovery path was a restore request.",
    ],
    stack: ["SharePoint Online", "OneDrive", "Microsoft Teams", "Entra ID", "PowerShell", "Microsoft Graph"],
    diagram: {
      caption: "On-premises shares to SharePoint document libraries",
      layers: [
        { label: "Source", nodes: ["HO", "Grand Mills", "Atyab", "Abu Auf", "Riviere"] },
        { label: "Process", nodes: ["Assessment", "Permission redesign", "Bulk + delta"] },
        { label: "Target", nodes: ["SharePoint Online", "OneDrive sync", "Teams"] },
      ],
    },
    needs: [
      "Total data volume moved, in TB",
      "Number of users across the five units",
      "How many sites or libraries you ended up creating",
      "Which migration tooling you used — ShareGate, Mover, Migration Manager, or scripted",
    ],
  },

  {
    slug: "tenant-to-tenant-m365",
    index: "05",
    title: "Tenant-to-Tenant M365 Migration",
    kind: "Cloud migration · M&A integration",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Migration engineer",
    featured: true,
    summary:
      "Onboarded newly acquired entities into the corporate Microsoft 365 tenant and domain — mailboxes, OneDrive, Teams, and identity moved with data integrity intact.",
    metrics: [
      { value: "—", label: "Entities onboarded", pending: true },
      { value: "—", label: "Mailboxes migrated", pending: true },
      { value: "—", label: "Data volume", pending: true },
      { value: "—", label: "Cutover window", pending: true },
    ],
    context: [
      "Acquisitions arrived with their own Microsoft 365 tenants and vanity domains. Until they were absorbed, the group had duplicate identities, split GALs, and cross-tenant collaboration that only half worked.",
      "Domain names can only live in one tenant at a time, so the release-and-claim step gates the entire cutover and has to be timed precisely.",
    ],
    approach: [
      {
        step: "Pre-migration discovery",
        detail:
          "Inventoried mailboxes, shared mailboxes, distribution groups, OneDrive volumes, Teams, and licensing on both sides, and mapped source objects to their target identities.",
      },
      {
        step: "Identity preparation",
        detail:
          "Pre-created target accounts and set the required routing addresses, with licences assigned ahead of cutover so nothing waited on provisioning at the critical moment.",
      },
      {
        step: "Pre-seed and sync",
        detail:
          "Ran bulk mailbox and OneDrive passes ahead of time, then incremental deltas, so the final switch moved only recent changes.",
      },
      {
        step: "Domain cutover",
        detail:
          "Released the vanity domain from the source tenant, claimed it in the target, updated MX and autodiscover, and completed the final delta pass inside the maintenance window.",
      },
      {
        step: "Post-migration",
        detail:
          "Reconfigured Outlook profiles and mobile devices, validated mail flow and free/busy, and ran hypercare through the first working week.",
      },
    ],
    outcome: [
      "Acquired entities operating inside the corporate tenant on the corporate domain, with a single global address list.",
      "Duplicate licensing retired along with the source tenants.",
      "Group-wide security policy — Conditional Access, MFA, compliance — applied uniformly to newly onboarded staff.",
    ],
    stack: ["Exchange Online", "OneDrive", "Microsoft Teams", "Entra ID", "Exchange Online PowerShell", "Microsoft Graph"],
    diagram: {
      caption: "Source tenant absorbed into the corporate tenant",
      layers: [
        { label: "Source", nodes: ["Acquired tenant", "Vanity domain"] },
        { label: "Cutover", nodes: ["Pre-seed", "Domain release", "Delta pass"] },
        { label: "Target", nodes: ["Corporate tenant", "Unified GAL"] },
      ],
    },
    needs: [
      "How many entities you onboarded, and their names if they can be published",
      "Mailbox count and total data volume",
      "Length of the cutover window",
      "Migration tooling used — native, BitTitan, Quest, or otherwise",
    ],
  },

  {
    slug: "sharepoint-intranet",
    index: "06",
    title: "Group Intranet on SharePoint",
    kind: "Digital workplace",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2025",
    role: "Designer & implementer",
    featured: true,
    summary:
      "Designed a SharePoint Online intranet serving 14+ business units, replacing scattered shared drives and email broadcasts with a single communications and document hub.",
    metrics: [
      { value: "14+", label: "Business units served" },
      { value: "—", label: "Users reached", pending: true },
      { value: "—", label: "Sites in the hub", pending: true },
      { value: "—", label: "Delivery period", pending: true },
    ],
    context: [
      "Company-wide announcements went out by mass email. Policies, forms, and templates lived wherever the owning department had last saved them.",
      "New joiners had no single place to find out how anything worked, and each business unit had drifted into its own conventions.",
    ],
    approach: [
      {
        step: "Information architecture",
        detail:
          "Designed a hub-and-spoke structure with a group landing site and a spoke per business unit, so units keep ownership of their content while search and navigation stay unified.",
      },
      {
        step: "Governance and permissions",
        detail:
          "Set site provisioning standards, ownership, and Entra ID group-based permissions, so the structure could not drift back into ad-hoc sprawl.",
      },
      {
        step: "Build and populate",
        detail:
          "Built the pages, navigation, and news structure, then worked with each business unit to migrate their policies, forms, and templates into place.",
      },
      {
        step: "Launch",
        detail:
          "Rolled out with communications and guidance so the intranet became the default destination rather than another place to check.",
      },
    ],
    outcome: [
      "One destination for group news, policies, and forms across all business units.",
      "Content searchable across the hub instead of siloed per department.",
      "Announcements delivered through the intranet rather than mass email.",
    ],
    stack: ["SharePoint Online", "Microsoft Teams", "Entra ID", "Power Automate", "Microsoft Graph"],
    diagram: {
      caption: "Hub-and-spoke intranet architecture",
      layers: [
        { label: "Hub", nodes: ["Group landing site"] },
        { label: "Spokes", nodes: ["BU sites ×14+", "Policies", "Forms", "News"] },
        { label: "Surface", nodes: ["Teams", "Search", "Mobile"] },
      ],
    },
    needs: [
      "Total user population reached",
      "How many sites sit under the hub",
      "How long the build took",
      "Whether Viva Connections was part of it",
    ],
  },

  {
    slug: "license-optimisation",
    index: "07",
    title: "Licence Optimisation",
    kind: "Cost engineering",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Analyst & implementer",
    featured: false,
    summary:
      "Audited Microsoft 365 E3/E5 and Adobe assignments against actual usage and reclaimed what was not being used, cutting recurring licence spend.",
    metrics: [
      { value: "—", label: "Annual saving", pending: true },
      { value: "—", label: "Licences reclaimed", pending: true },
      { value: "—", label: "Reduction", pending: true },
    ],
    context: [
      "Licences accumulate. Leavers keep their assignments, projects end but their tooling does not get reclaimed, and everyone gets the premium SKU because it is simpler than working out who needs it.",
      "Nobody owned the question of whether the group was paying for capacity it used.",
    ],
    approach: [
      {
        step: "Usage audit",
        detail:
          "Pulled assignment and activity data through PowerShell and Microsoft Graph, joining licence assignments against genuine last-activity signals rather than sign-in alone.",
      },
      {
        step: "Right-size by role",
        detail:
          "Mapped SKUs to what each role actually needs, identifying users on E5 who used no E5-specific capability and frontline staff who did not need a full desktop licence.",
      },
      {
        step: "Reclaim and automate",
        detail:
          "Removed licences from leavers and dormant accounts, and put a recurring reporting process in place so the reclamation does not have to be repeated as a project.",
      },
    ],
    outcome: [
      "Recurring licence spend reduced without any user losing a capability they were using.",
      "A repeatable report replacing one-off audits, so drift gets caught early.",
    ],
    stack: ["Microsoft 365 admin", "PowerShell", "Microsoft Graph", "Power BI", "Adobe Admin Console"],
    diagram: {
      caption: "Audit, right-size, reclaim",
      layers: [
        { label: "Collect", nodes: ["Assignments", "Activity data"] },
        { label: "Analyse", nodes: ["Role mapping", "Dormant accounts"] },
        { label: "Act", nodes: ["Reclaim", "Recurring report"] },
      ],
    },
    needs: [
      "The saving figure — AED or USD per year, or a percentage",
      "How many licences were reclaimed",
      "Whether Power BI was actually used for the reporting, or something else",
    ],
  },

  {
    slug: "backup-and-dr",
    index: "08",
    title: "Backup & Disaster Recovery",
    kind: "Business continuity",
    client: "Agthia Group PJSC",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Backup administrator",
    featured: false,
    summary:
      "Owned Veeam backup operations and disaster recovery readiness across the virtualised estate, including restore testing rather than assumed recoverability.",
    metrics: [
      { value: "—", label: "Servers protected", pending: true },
      { value: "—", label: "Data protected", pending: true },
      { value: "—", label: "RPO achieved", pending: true },
      { value: "—", label: "RTO achieved", pending: true },
    ],
    context: [
      "A backup job that reports success is not the same as a system you can restore. The gap between the two only ever shows up at the worst possible moment.",
      "Recovery objectives existed on paper without regular evidence that they could actually be met.",
    ],
    approach: [
      {
        step: "Job ownership",
        detail:
          "Took over Veeam job configuration, scheduling, and monitoring across the VMware estate, and worked failures rather than letting them accumulate in a report nobody read.",
      },
      {
        step: "Restore testing",
        detail:
          "Ran regular restores to verify recoverability in practice — full VM, file-level, and application-item — rather than trusting job status alone.",
      },
      {
        step: "DR readiness",
        detail:
          "Maintained replication and documented recovery runbooks so a restore does not depend on one person's memory at three in the morning.",
      },
    ],
    outcome: [
      "Verified, tested recoverability across the protected estate.",
      "Documented runbooks making recovery repeatable by anyone on the team.",
    ],
    stack: ["Veeam Backup & Replication", "VMware vCenter", "Zerto", "Windows Server"],
    diagram: {
      caption: "Protection and verification cycle",
      layers: [
        { label: "Protect", nodes: ["Veeam jobs", "Replication"] },
        { label: "Verify", nodes: ["Restore tests", "Monitoring"] },
        { label: "Recover", nodes: ["Runbooks", "DR readiness"] },
      ],
    },
    needs: [
      "Number of servers or VMs protected, and total data volume",
      "RPO and RTO you were working to and achieved",
      "Whether Zerto replication was part of this or only at BIOS/ZainTech",
    ],
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
