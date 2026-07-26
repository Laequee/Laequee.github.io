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
  /**
   * Programme phases, for multi-year work still in flight. Omitted on projects
   * that ran once and closed — an invented phase structure reads as padding.
   */
  phases?: { label: string; status: string; detail: string }[];
  /**
   * What went wrong and how it was diagnosed. Optional, but a case study without
   * one is a success arc, and a clean success arc is the least credible shape a
   * piece of engineering writing can take.
   */
  challenges?: { title: string; detail: string }[];
  /** How the outcome was proved rather than assumed. */
  validation?: string[];
  outcome: string[];
  stack: string[];
  diagram: {
    caption: string;
    layers: { label: string; nodes: string[] }[];
  };
  /**
   * Per-page search keywords. Without this every case study inherits the site-wide
   * set from the root layout, so eight pages compete on identical terms.
   */
  keywords?: string[];
  /** Outstanding questions, surfaced in the build so nothing is quietly forgotten. */
  needs: string[];
};

export const projects: Project[] = [
  {
    slug: "active-directory-consolidation",
    index: "01",
    title: "Active Directory Consolidation",
    kind: "Directory services · Hybrid identity · Infrastructure modernisation",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — Present",
    role: "Technical lead — Active Directory & identity",
    featured: true,
    summary:
      "Took a multinational group's directory from a Windows Server 2008 functional level to 2025 — retiring eight legacy domain controllers, moving SYSVOL off FRS, and consolidating acquired forests — without a single unplanned authentication outage.",
    metrics: [
      { value: "8", label: "Legacy DCs decommissioned" },
      { value: "2008 → 2025", label: "Forest functional level" },
      { value: "7,400+", label: "User objects in scope" },
      { value: "0", label: "Unplanned identity outages" },
    ],
    context: [
      "Years of acquisition had left the group running its identity layer on infrastructure that predated most of the applications depending on it. The forest was still at a Windows Server 2008 functional level. SYSVOL still replicated over FRS — a mechanism Microsoft deprecated in 2008 R2 and removed support for entirely in Server 2019, meaning the next domain controller upgrade would have broken policy replication outright.",
      "Eight domain controllers were spread across legacy hosting, a disaster-recovery site, and business units in three countries, several inherited from acquisitions and none consistently patched. Two separate acquired forests still ran their own directories behind trusts.",
      "Everything authenticated against it: SAP, Citrix, Dynamics, VMware Horizon, the RPA estate, enterprise Wi-Fi via 802.1X, remote-access VPN, and a hybrid Microsoft 365 tenant. There was no version of this work that could take the directory offline.",
    ],
    approach: [
      {
        step: "Map before touching anything",
        detail:
          "Documented every domain controller, trust, FSMO placement, DNS zone, DHCP scope, certificate template, RADIUS client and service account with a hard dependency on a controller due for retirement. Application dependency mapping covered every LDAP- and Kerberos-integrated system in the estate — because the objects that break a migration are never the ones in the plan.",
      },
      {
        step: "Clear the blockers to a functional level raise",
        detail:
          "Migrated SYSVOL replication from FRS to DFSR and validated consistency across all controllers before touching functional levels. Raised the forest and domain from Windows Server 2008 → 2012 → 2025 in staged hops, each with its own validation gate and rollback position.",
      },
      {
        step: "Rebuild the controller estate",
        detail:
          "Deployed four Windows Server 2025 domain controllers across three AD sites, transferred all five FSMO roles onto the new primary, and migrated NPS/RADIUS, DHCP and the Enterprise Certificate Authority onto the new platform. Decommissioned eight legacy controllers with full metadata cleanup, DNS record removal and subnet realignment.",
      },
      {
        step: "Make hybrid identity survive the move",
        detail:
          "Upgraded Microsoft Entra Connect from v1.5 to current and transitioned the source anchor to mS-DS-ConsistencyGuid, decoupling cloud identity from the on-premises object GUID so users can cross domain boundaries in later phases without generating duplicate cloud accounts.",
      },
      {
        step: "Consolidate the acquired forests",
        detail:
          "Cross-forest migration of the first acquired domain using Quest Migrator Pro with SID history preserved, covering users, groups, computers and member servers — sequenced non-critical, then file and print, then application, then business-critical. The second forest follows the same runbook.",
      },
    ],
    phases: [
      {
        label: "Phase 1",
        status: "Delivered",
        detail:
          "SYSVOL off FRS, functional level raised to 2025, four new controllers deployed and eight legacy controllers retired. 65 of 65 tasks through formal change control.",
      },
      {
        label: "Phase 2",
        status: "In flight",
        detail:
          "Cross-forest consolidation of the first acquired domain with SID history preserved, sequenced from non-critical workloads through to business-critical.",
      },
      {
        label: "Phase 3",
        status: "Planned",
        detail: "Second acquired forest, following the runbook proven in Phase 2.",
      },
    ],
    challenges: [
      {
        title: "A RADIUS extension took down enterprise Wi-Fi",
        detail:
          "Installing the Entra MFA NPS Extension on a domain controller to build VPN authentication failover triggered an authentication storm across the wireless estate. Root cause: the extension's scope is server-wide, not per-policy — every RADIUS request on that host gets an MFA challenge, including 802.1X machine authentication that has no user to prompt. Fixed by uninstalling and establishing an architectural rule that VPN and 802.1X RADIUS workloads never share an NPS instance.",
      },
      {
        title: "Certificate expiry with no alert path",
        detail:
          "A PEAP authentication certificate issued by a regional CA expired unnoticed because the issuing CA had become unreachable over RPC from the primary site, silently breaking auto-renewal. Restored service the same day with a scoped self-signed certificate, then fixed the enrolment path properly. Service first, architecture second.",
      },
      {
        title: "Audit policy that reverted on reboot",
        detail:
          "NPS security auditing kept disabling itself after restarts. The local setting was correct; a higher-precedence GPO was overwriting it, and a legacy audit policy flag was suppressing the subcategory entirely. Resolved at the Default Domain Controllers Policy level — a reminder that on a domain controller, the local configuration is rarely the one that wins.",
      },
    ],
    validation: [
      "Replication verified with repadmin /replsummary and /showrepl across all site links; DFSR backlog confirmed clear before and after each change. dcdiag /e /c clean across the estate.",
      "FSMO placement, SPN registration and secure channel health confirmed post-cutover. Directory synchronisation validated end-to-end against the Microsoft 365 tenant after the source anchor transition, with object counts reconciled on both sides.",
    ],
    outcome: [
      "A single authoritative directory at a current functional level, with policy authored once instead of per acquired entity.",
      "Eight unpatched domain controllers removed from the attack surface, along with their hosting and licensing cost.",
      "SYSVOL replication on a supported mechanism — the blocker to every future Windows Server upgrade, cleared.",
      "Hybrid identity re-anchored so the remaining forest consolidations can proceed without duplicate cloud accounts.",
      "65 of 65 Phase 1 tasks delivered through formal change control, with zero unplanned authentication outages across a 4,000-user estate.",
    ],
    stack: [
      "Active Directory Domain Services",
      "Windows Server 2025",
      "DFSR",
      "FSMO",
      "Quest Migrator Pro",
      "Entra ID",
      "Entra Connect",
      "Group Policy",
      "AD CS / PKI",
      "NPS / RADIUS",
      "DNS / DHCP",
      "PowerShell",
    ],
    diagram: {
      caption:
        "Eight legacy controllers across three countries collapsed onto four Windows Server 2025 domain controllers, with hybrid identity re-anchored to survive future domain moves.",
      layers: [
        {
          label: "Before",
          nodes: ["8 DCs, mixed OS", "FFL 2008", "3 forests", "Entra Connect v1.5"],
        },
        {
          label: "Transition",
          nodes: ["FRS → DFSR", "FSMO transfer", "SID history", "Source anchor change"],
        },
        {
          label: "After",
          nodes: ["4 DCs, Server 2025", "FFL 2025", "1 forest, consolidating", "ConsistencyGuid"],
        },
      ],
    },
    keywords: [
      "Active Directory consolidation",
      "forest functional level 2025",
      "FRS to DFSR migration",
      "SYSVOL replication",
      "domain controller decommission",
      "FSMO transfer",
      "Quest Migrator Pro",
      "SID history",
      "Entra Connect source anchor",
      "mS-DS-ConsistencyGuid",
      "hybrid identity",
    ],
    needs: [
      "Reconcile the two user figures — 7,400+ user objects in scope vs a 4,000-user estate in the outcome. Both may be true (objects include disabled and service accounts) but they sit on one page and invite the question.",
      "Countries served — 6 was offered as an alternative stat; confirm before using it anywhere.",
    ],
  },

  {
    slug: "ad-security-hardening",
    index: "02",
    title: "Active Directory Security Hardening",
    kind: "Security & compliance · CIS Benchmarks",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025 — Present",
    role: "Security & compliance lead — AD and Windows estate",
    featured: true,
    summary:
      "Took a domain controller estate from unbaselined to a 94% CIS compliance score under independent Qualys assessment — and did it without breaking the twenty-year accumulation of applications that depended on the insecure defaults.",
    /*
     * Ordered so the two the index card surfaces are the score and the scale.
     * Leading with 94% and 93% would put two near-identical percentages side by
     * side and say less than 94% next to the size of the estate.
     */
    metrics: [
      { value: "94%", label: "DC compliance score" },
      { value: "~70", label: "Servers hardened" },
      { value: "93%", label: "Member server score" },
      { value: "20", label: "GPOs, consolidated" },
    ],
    context: [
      "Security hardening at scale is not a configuration problem. Applying a CIS Benchmark to a lab domain controller takes an afternoon. Applying it to a production directory that authenticates SAP, Citrix, Dynamics, a robotic process automation estate, enterprise Wi-Fi, remote-access VPN and a hybrid Microsoft 365 tenant is a dependency-mapping problem wearing a configuration problem's clothes.",
      "The estate had accumulated two decades of permissive defaults — legacy authentication protocols still in active use, inconsistent Group Policy sprawl across 500+ organisational units, and no measured compliance baseline against any recognised standard. Independent VAPT assessment through Qualys was the scoring authority, which meant remediation had to satisfy an external scanner, not just internal judgement.",
    ],
    approach: [
      {
        step: "Establish the baseline, honestly",
        detail:
          "Ran the estate against CIS Benchmarks through Qualys SCA to get a real starting score rather than an assumed one. Split the target into three distinct baselines — domain controllers, member servers, end-user endpoints — because a control that is correct on a file server can break a domain controller, and treating them as one estate is how hardening projects cause outages.",
      },
      {
        step: "Map dependencies before enforcing controls",
        detail:
          "Audited every finding against what actually consumed it. The NTLM controls were the clearest example: the benchmark calls for refusing legacy NTLM entirely, but an authentication-event audit found active NTLMv1 dependencies across the RPA platform, SAP, the certificate authority, the SMTP relay and cross-forest service accounts. Enforcing the control would have taken out production. Documented it as a formal, evidence-backed compliance exception with a phased remediation roadmap, rather than either breaking the estate or quietly ignoring the finding.",
      },
      {
        step: "Consolidate Group Policy",
        detail:
          "Collapsed a sprawling policy set into 20 purpose-defined GPOs with clear scope and precedence across 503 OUs. Precedence turned out to matter more than content — several controls were configured correctly and still failing because a higher-precedence policy was silently overriding them.",
      },
      {
        step: "Deploy at scale, safely",
        detail:
          "Built PowerShell tooling for fleet-wide remediation: type-safe registry writes through the Win32 API rather than string-based cmdlets, throttled parallel execution across ~70 servers, per-host CSV audit logging, and a dry-run mode as the default rather than an option. Every domain-wide change went through CAB approval with a documented rollback position.",
      },
      {
        step: "Verify, and challenge the scanner",
        detail:
          "Rescanned after each remediation wave. Where findings persisted despite the configuration demonstrably matching the expected value, investigated rather than re-applied — several turned out to be scanner defects rather than server misconfigurations, and were documented as such. Accepting a false positive at face value would have meant repeatedly changing working systems to satisfy a broken check.",
      },
    ],
    challenges: [
      {
        title: "Findings that were real, and findings that weren't",
        detail:
          "Multiple Qualys QIDs reported failures with the actual value identical to the expected value. Chasing these as genuine misconfigurations would have burned weeks and risked production changes to satisfy a defective check. Proving them as scanner defects — with evidence — was faster and more honest than either fixing or ignoring them.",
      },
      {
        title: "Registry paths that failed silently",
        detail:
          "A firewall logging control kept failing until the deployed value was inspected byte-for-byte: the path had been written with regex-escaped characters intact, so the setting existed, looked right in a policy report, and pointed nowhere.",
      },
      {
        title: "Accounts that Group Policy cannot reach",
        detail:
          "Remediating user-hive settings on accounts that had never logged on is impossible by design — no profile means no ntuser.dat for policy to write into. Resolved by staging a blank hive from the default user template so the setting could be applied before first logon rather than after.",
      },
      {
        title: "The wrong GPO winning",
        detail:
          "More than one control was configured correctly and failing anyway because an enforced policy higher in the precedence chain was overriding it. On a domain controller, “I set it” and “it is set” are different statements, and only gpresult settles the difference.",
      },
    ],
    outcome: [
      "94% CIS compliance score on domain controllers and 93% on the member server baseline under independent Qualys assessment.",
      "~70 Windows servers brought under a governed, version-controlled baseline instead of individual configuration drift.",
      "Group Policy reduced to 20 defined, scoped policies with documented precedence.",
      "Every unremediated finding carries a written justification, a dependency map and a remediation roadmap — an audit position rather than an open gap.",
      "Domain-wide security auditing enabled and verified persistent across reboots, closing a blind spot where authentication events were going unrecorded.",
    ],
    stack: [
      "CIS Benchmarks",
      "Qualys VAPT / SCA",
      "Group Policy",
      "Active Directory Domain Services",
      "Windows Server 2016–2025",
      "PowerShell",
      "NTLM & Kerberos hardening",
      "Microsoft Defender for Endpoint",
      "CrowdStrike Falcon",
      "Windows Security Auditing",
    ],
    diagram: {
      caption:
        "An unbaselined Windows estate measured against CIS Benchmarks, remediated through 20 scoped policies, and re-scored under independent assessment.",
      layers: [
        { label: "Before", nodes: ["No baseline", "503 OUs", "Policy sprawl", "NTLMv1 in use"] },
        { label: "Assess", nodes: ["Qualys SCA", "CIS Benchmarks", "Dependency audit"] },
        { label: "Remediate", nodes: ["3 baselines", "20 scoped GPOs", "PowerShell fleet"] },
        { label: "After", nodes: ["94% domain controllers", "93% member servers"] },
      ],
    },
    keywords: [
      "Active Directory hardening",
      "CIS Benchmarks",
      "Qualys VAPT",
      "Qualys SCA",
      "Group Policy consolidation",
      "NTLM hardening",
      "Windows Server security baseline",
      "compliance exception",
      "PowerShell remediation",
      "security auditing",
    ],
    needs: [],
  },

  {
    slug: "crowdstrike-tenant-migration",
    index: "03",
    title: "CrowdStrike Tenant Migration",
    kind: "Endpoint security · Enterprise migration",
    client: "Enterprise client",
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
    slug: "intune-endpoint-platform",
    index: "04",
    title: "Intune Endpoint Platform",
    kind: "Endpoint management · Zero Trust",
    client: "Enterprise client",
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
    index: "05",
    title: "File Server to SharePoint Online",
    kind: "Collaboration · Data migration",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Migration engineer",
    featured: true,
    summary:
      "Moved multi-terabyte file servers into SharePoint Online across five business units — head office plus four operating companies — rebuilding permission models on the way.",
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
        // Named units would re-identify the client the labels deliberately omit.
        { label: "Source", nodes: ["Head office", "BU 02", "BU 03", "BU 04", "BU 05"] },
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
    index: "06",
    title: "Tenant-to-Tenant M365 Migration",
    kind: "Cloud migration · M&A integration",
    client: "Enterprise client",
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
    index: "07",
    title: "Group Intranet on SharePoint",
    kind: "Digital workplace",
    client: "Enterprise client",
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
    index: "08",
    title: "Licence Optimisation",
    kind: "Cost engineering",
    client: "Enterprise client",
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
    index: "09",
    title: "Backup & Disaster Recovery",
    kind: "Business continuity",
    client: "Enterprise client",
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
