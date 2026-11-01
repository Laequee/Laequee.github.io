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
      "Took a multinational group's directory from a Windows Server 2008 functional level to 2025 — retiring eight legacy domain controllers, moving SYSVOL off FRS, and consolidating acquired forests.",
    metrics: [
      { value: "8", label: "Legacy DCs decommissioned" },
      { value: "2008 → 2025", label: "Forest functional level" },
      { value: "5,000+", label: "Identities in scope" },
    ],
    context: [
      "Years of acquisition had left the group running its identity layer on infrastructure that predated most of the applications depending on it. The forest was still at a Windows Server 2008 functional level. SYSVOL still replicated over FRS — a mechanism Microsoft deprecated in 2008 R2 and removed support for entirely in Server 2019, meaning the next domain controller upgrade would have broken policy replication outright.",
      "Eight domain controllers were spread across legacy hosting, a disaster-recovery site, and business units, several inherited from acquisitions.",
      "Everything authenticated against it. There was no version of this work that could take the directory offline.",
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
          "Cross-forest migration of the first acquired domain using Quest Migrator Pro with SID history preserved, covering users, groups, computers and member servers — sequenced non-critical, then file and print, then application, then business-critical.",
      },
    ],
    challenges: [
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
      "Eight legacy domain controllers removed from the attack surface, along with their hosting and licensing cost.",
      "SYSVOL replication on a supported mechanism — the blocker to every future Windows Server upgrade, cleared.",
      "Hybrid identity re-anchored so the remaining forest consolidations can proceed without duplicate cloud accounts.",
      "65 of 65 Phase 1 tasks delivered through formal change control across a 5,000-identity estate.",
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
        "Eight legacy controllers collapsed onto four Windows Server 2025 domain controllers, with hybrid identity re-anchored to survive future domain moves.",
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
      "Object count behind the 5,000+ identity figure, if you want the larger number stated separately — disabled and service accounts push it well above the active identity count.",
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
      "Took a domain controller estate from unbaselined to a 94% CIS compliance score under independent Qualys assessment without breaking the applications that depended on existing settings.",
    /*
     * Ordered so the two the index card surfaces are the score and the scale.
     * Leading with 94% and 93% would put two near-identical percentages side by
     * side and say less than 94% next to the size of the estate.
     */
    metrics: [
      { value: "94%", label: "DC compliance score" },
      { value: "100+", label: "Servers hardened" },
      { value: "93%", label: "Member server score" },
      { value: "20", label: "GPOs, consolidated" },
    ],
    context: [
      "Security hardening at scale is not a configuration problem. Applying a CIS Benchmark to a lab domain controller takes an afternoon. Applying it to a production directory is a dependency-mapping problem wearing a configuration problem's clothes.",
      "Independent assessment through Qualys Policy Compliance was the scoring authority, which meant remediation had to satisfy an external scanner, not just internal judgement.",
    ],
    approach: [
      {
        step: "Establish the baseline, honestly",
        detail:
          "Ran the estate against CIS Benchmarks through Qualys Policy Compliance to get a real starting score rather than an assumed one. Split the target into three distinct baselines — domain controllers, member servers, end-user endpoints — because a control that is correct on a file server can break a domain controller, and treating them as one estate is how hardening projects cause outages.",
      },
      {
        step: "Map dependencies before enforcing controls",
        detail:
          "Audited every finding against what actually consumed it. Where enforcing a control would have taken out production, documented it as a formal, evidence-backed compliance exception with a phased remediation roadmap, rather than either breaking the estate or quietly ignoring the finding.",
      },
      {
        step: "Consolidate Group Policy",
        detail:
          "Collapsed a sprawling policy set into 20 purpose-defined GPOs with clear scope and precedence. Precedence turned out to matter more than content — several controls were configured correctly and still failing because a higher-precedence policy was silently overriding them.",
      },
      {
        step: "Deploy at scale, safely",
        detail:
          "Built PowerShell tooling for fleet-wide remediation: type-safe registry writes through the Win32 API rather than string-based cmdlets, throttled parallel execution across the server estate, per-host CSV audit logging, and a dry-run mode as the default rather than an option. Every domain-wide change went through CAB approval with a documented rollback position.",
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
      "100+ Windows servers brought under a governed, version-controlled baseline instead of individual configuration drift.",
      "Group Policy reduced to 20 defined, scoped policies with documented precedence.",
      "Every unremediated finding carries a written justification, a dependency map and a remediation roadmap — an audit position rather than an open gap.",
      "Domain-wide security auditing enabled and verified persistent across reboots.",
    ],
    stack: [
      "CIS Benchmarks",
      "Qualys Policy Compliance",
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
        { label: "Before", nodes: ["CIS Benchmarks to apply", "Group Policy estate"] },
        { label: "Assess", nodes: ["Qualys Policy Compliance", "CIS Benchmarks", "Dependency audit"] },
        { label: "Remediate", nodes: ["3 baselines", "20 scoped GPOs", "PowerShell fleet"] },
        { label: "After", nodes: ["94% domain controllers", "93% member servers"] },
      ],
    },
    keywords: [
      "Active Directory hardening",
      "CIS Benchmarks",
      "Qualys Policy Compliance",
      "Qualys VMDR",
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
    title: "CrowdStrike Tenant-to-Tenant Migration",
    kind: "Endpoint security · Contract-driven migration",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Migration lead",
    featured: true,
    summary:
      "A reseller change repapered the group's CrowdStrike licences into a new tenant with a fixed date on which the old one stopped — and the outgoing side would not run a bulk offboarding, so there was no re-registration path. Every one of 2,500+ endpoints across seven Active Directory domains had the old sensor fully removed and a new one installed in its place, tracked host by host because a machine that fails halfway is invisible in both consoles.",
    metrics: [
      { value: "2,500+", label: "Sensors removed and reinstalled" },
      { value: "7", label: "AD domains in scope" },
      { value: "0", label: "Hosts left on the expired tenant" },
    ],
    context: [
      "Nothing about the security platform was changing. Same vendor, same product, same estate. The licences were being repapered through a different reseller — and a Falcon tenant belongs to the contract, not to the customer's intent, so a purely commercial change meant every host in the group had to move to a tenant that did not exist yet.",
      "CrowdStrike supports moving hosts between tenants without touching the sensor: the agent stays installed and is re-pointed at the new customer ID, keeping its identity and leaving the change reversible. That process has to be run from the source side. The outgoing reseller would not run it.",
      "Two resellers also meant two entirely separate Falcon portals, with nothing joining them. The new tenant had its own console showing hosts as they onboarded; the outgoing one had its own, showing a list that shrank as sensors came off. No view spanned both, and no host existed in both at once.",
      "Removing the route changed the job. Without a bulk offboard, the only way across is to uninstall the sensor from every endpoint and install a fresh one registered to the new tenant — an irreversible operation, on 2,500+ machines, against a licence expiry date set in a commercial negotiation and not movable by anyone in IT.",
      "It also changed the risk. A re-registration cannot leave a host worse off; if it fails, the sensor is still there. An uninstall can. Between removal and registration the machine has no Falcon sensor, and a host whose install fails after its uninstall succeeded is not merely unmigrated — it is unprotected, and it has disappeared from both consoles at once.",
    ],
    approach: [
      {
        step: "Establish the inventory the consoles could not",
        detail:
          "Built the authoritative host list from Active Directory and Intune rather than from either portal, and reconciled it before touching anything. This is the pivot the whole operation rests on, because of an asymmetry in what the two consoles can tell you. The new portal answers one question well — which hosts have arrived — and structurally cannot answer the one that matters, since a machine that never registered has no record there to be missing from. Arrivals are countable; absences are not. Only a list held outside both turns a count into named machines.",
      },
      {
        step: "Make removal and installation one operation",
        detail:
          "Packaged uninstall and install as a single sequenced run rather than two campaigns, so no machine was left sitting in the state between them. Uninstall protection meant the removal had to carry the maintenance token from the outgoing tenant — the same control that stops an attacker pulling the sensor is what makes a mass removal a project rather than a command.",
      },
      {
        step: "Rebuild the target so first check-in lands correctly",
        detail:
          "A clean install generates a new agent ID, so every host arrives in the new tenant as a machine with no history. Host groups, prevention policies, sensor update policies, exclusions and custom IOAs were rebuilt in the target and compared against the source setting by setting, so a host was covered by the right policy on its first check-in rather than sitting in the default one until somebody noticed.",
      },
      {
        step: "Reach the estate three different ways",
        detail:
          "Delivered through Intune for the managed estate, Group Policy and scripted deployment for domain-joined machines outside it, and a documented runbook handed to site engineers for the machines that could not be done remotely at all. An estate of this age is never uniform, and the hosts the tooling cannot reach are exactly the ones a deadline strands.",
      },
      {
        step: "Track every host through every stage",
        detail:
          "Recorded each machine's state through the sequence — removed, installed, registered, policy applied — and monitored the waves rather than sampling them. With an irreversible operation and a fixed end date, per-host state is not reporting overhead; it is the only thing that separates a host still queued from a host that failed silently.",
      },
      {
        step: "Retire the source on evidence",
        detail:
          "Held the outgoing tenant until the full inventory was reconciled as reporting into the target, then let it lapse — with the estate accounted for ahead of the expiry rather than still being chased on the day.",
      },
    ],
    challenges: [
      {
        title: "A failed host is invisible in both consoles",
        detail:
          "This is the defining property of the route, and it follows from there being two unconnected portals. On the outgoing console a host leaving the list looks identical whether it landed safely in the new tenant or died on the way — the record disappears either way. On the new console it simply never appears, alongside every machine whose wave has not started yet. So a sensor that uninstalled and then failed to install is not flagged anywhere; it is silence in two systems at once. Reporting from either portal would have produced a clean-looking migration with an unknown number of unprotected endpoints inside it, which is the exact failure the external inventory existed to prevent.",
      },
      {
        title: "Uninstall protection cuts both ways",
        detail:
          "Falcon resists its own removal by design, and rightly. On a mass migration that protection becomes the obstacle: every removal needs the maintenance token from the tenant being left behind, which is precisely the cooperation that was not on offer.",
      },
      {
        title: "A deadline nobody in engineering set",
        detail:
          "Most migrations can absorb a slip. This one could not — on the expiry date the source licences stopped, and the operation was destructive besides. That inverted the usual instinct to clear the easy thousands first: the awkward hosts, the remote users and the machines needing an engineer on site were worked early, while there was still room to fail and retry.",
      },
    ],
    validation: [
      "Every host confirmed in the new Falcon console on four signals — sensor checked in under its new agent ID, correct host group, prevention policy applied, and live telemetry — not on the deployment tool's success rate. A package that installs cleanly and never registers is a silent failure.",
      "Both portals reconciled back against the Active Directory and Intune inventory every wave, so the difference between the two was always a list of named machines with a known next action rather than a gap in a percentage.",
      "Policy, host group, exclusion and IOA configuration compared against the source tenant before cutover, so protection posture on the far side was proved equivalent rather than assumed from a completed build.",
    ],
    outcome: [
      "2,500+ endpoints across seven Active Directory domains removed from the outgoing tenant and reinstalled onto the new one ahead of the licence expiry, with no host left behind on a lapsed contract.",
      "Every machine accounted for individually through an irreversible operation — no residual population of hosts that had silently uninstalled and never come back.",
      "Protection posture proved equivalent on the far side rather than assumed, so a commercial change did not quietly cost the estate coverage.",
      "Per-host exposure held to a single scripted run by keeping removal and installation as one operation instead of two sequential campaigns.",
      "No service impact and no user-visible change — which, on a migration that exists only because the paperwork moved, was the entire brief.",
    ],
    stack: [
      "CrowdStrike Falcon",
      "Falcon prevention policies",
      "Microsoft Intune",
      "Win32 app packaging",
      "Group Policy",
      "Active Directory",
      "PowerShell",
      "Microsoft Graph",
    ],
    diagram: {
      caption:
        "No re-registration path, so every sensor came off and went back on. Two vendors meant two unconnected portals, and a half-finished host appears in neither — so the tracking had to live outside both.",
      layers: [
        { label: "Trigger", nodes: ["Reseller change", "New tenant", "Fixed licence expiry"] },
        { label: "Blocked", nodes: ["No bulk offboard", "No re-registration", "Uninstall protection"] },
        { label: "Route taken", nodes: ["Uninstall + install as one run", "Intune · GPO · site engineers", "Per-host state tracked"] },
        { label: "Proved", nodes: ["Check-in + policy + telemetry", "Two portals reconciled to AD/Intune", "Source tenant retired"] },
      ],
    },
    keywords: [
      "CrowdStrike tenant-to-tenant migration",
      "Falcon sensor uninstall and reinstall",
      "bulk offboarding",
      "maintenance token",
      "uninstall protection",
      "reseller change",
      "licence expiry deadline",
      "new agent ID",
      "prevention policy parity",
      "endpoint detection and response",
      "separate Falcon consoles",
      "host inventory reconciliation",
    ],
    needs: [
      "How long the migration ran end to end, and how much runway was left against the expiry date.",
      "Whether the sensor removal required a reboot, and if so how that was handled on the remote estate.",
      "Roughly how many machines needed a site engineer rather than Intune, GPO or a script — the number makes the reach problem concrete.",
      "Whether any historical detection or audit data was exported from the outgoing tenant before access lapsed. Nothing on the page claims it was; say so if it happened and it becomes an outcome.",
      "Whether Falcon Identity Protection and the SaaS posture module were in scope at migration or added to the new tenant afterwards.",
      "Roughly how many custom IOAs and exclusions had to be rebuilt for the parity check.",
    ],
  },

  {
    slug: "windows-hello-passwordless",
    index: "04",
    title: "Passwordless Sign-In at Scale",
    kind: "Identity · Authentication · Zero Trust",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Identity engineer — design and rollout",
    featured: true,
    summary:
      "Took 2,800+ hybrid joined devices — 97% of the managed Windows estate — onto Windows Hello for Business over cloud Kerberos trust, retiring the password as the daily sign-in without issuing a single certificate or spending anything to do it.",
    metrics: [
      { value: "2,800+", label: "Devices enrolled" },
      { value: "97%", label: "Of the managed Windows estate" },
      { value: "0", label: "Certificates issued" },
      { value: "0", label: "Additional spend" },
    ],
    context: [
      "Passwords were the only thing standing between a phished credential and a desktop session. MFA covered cloud sign-in, but the Windows logon itself was still a password typed into a machine with no way of knowing whether the person typing it owned it.",
      "The conventional route to Windows Hello for Business on hybrid joined devices is certificate trust, and certificate trust means a PKI: templates, an enterprise CA sized for the estate, autoenrolment, an NDES and Intune connector for devices that rarely touch the corporate network, and a renewal cycle to own indefinitely. That is a funded project, and it puts a new dependency underneath every user's ability to log in.",
      "Cloud Kerberos trust achieves the same outcome through an Entra Kerberos server object in the directory — no certificates, no NDES, no template management. It also has hard prerequisites, and when they are not met it fails in ways that present as an unrelated Kerberos problem.",
    ],
    approach: [
      {
        step: "Establish the prerequisites honestly",
        detail:
          "Audited domain controller build levels, the Entra Connect version and sync scope, and device join state across the estate before committing to the method. Cloud Kerberos trust needs supported domain controllers and a correctly provisioned Entra Kerberos server object; finding a gap after announcing a passwordless rollout is a very different conversation from finding it beforehand.",
      },
      {
        step: "Provision the Kerberos server object",
        detail:
          "Created the Entra Kerberos server object so a device can obtain a partial ticket-granting ticket from Entra ID and exchange it for a full on-premises TGT — the mechanism that lets a cloud credential open on-premises file shares and application servers with no certificate anywhere in the path.",
      },
      {
        step: "Pilot the awkward cases first",
        detail:
          "Piloted on the device shapes most likely to break rather than the easiest ones: shared machines, users who work off the corporate network for weeks at a time, and devices behind the slowest site links. The edge cases decide whether a rollout is finished or merely out of easy devices.",
      },
      {
        step: "Roll out by ring, with a fallback",
        detail:
          "Deployed through Intune in rings with provisioning left non-blocking, so a device that could not complete enrolment fell back to password sign-in rather than locking its user out. Each ring was measured on enrolment success before the next opened.",
      },
      {
        step: "Account for the remainder",
        detail:
          "Tracked the non-enrolled devices individually rather than declaring the work done at 97% — unsupported hardware, machines pending rebuild, and accounts excluded by design, each with a recorded reason.",
      },
    ],
    challenges: [
      {
        title: "The last 3% is not a rounding error",
        detail:
          "Reporting an estate as 97% passwordless invites the reader to treat the rest as noise. It is not noise: it is the set of devices where the control does not currently apply, and each is either a rebuild waiting to happen or an accepted exception. Enumerating them was the difference between a completed rollout and one that had simply run out of straightforward devices.",
      },
      {
        title: "Sign-in that succeeds and then fails",
        detail:
          "Devices that enrolled cleanly but could not reach on-premises resources traced back to the ticket exchange rather than to Hello itself. Because the user was signed in, the symptom presented as a file share problem — the diagnosis only worked by reading it as a Kerberos path issue from the outset.",
      },
    ],
    validation: [
      "Enrolment confirmed in Entra sign-in telemetry independently of the deployment report — a policy shown as applied is not a credential shown as provisioned.",
      "On-premises resource access tested per ring against file shares and domain-joined application servers, so the full TGT exchange was proved rather than inferred from a successful desktop logon.",
    ],
    outcome: [
      "2,800+ devices signing in with a biometric or PIN bound to the hardware, against a credential that cannot be phished, replayed, or typed into a lookalike page.",
      "97% of the managed Windows estate covered, with every remaining device individually accounted for rather than absorbed into a percentage.",
      "No PKI built, no certificates issued, no NDES connector to maintain and no additional licence spend — the control was delivered from capability the tenant already owned.",
      "A device-bound authentication signal for Conditional Access to enforce on, in place of a password plus a prompt.",
    ],
    stack: [
      "Windows Hello for Business",
      "Cloud Kerberos trust",
      "Entra ID",
      "Microsoft Intune",
      "Active Directory Domain Services",
      "Entra Connect",
      "Conditional Access",
      "PowerShell",
    ],
    diagram: {
      caption:
        "A cloud credential opening on-premises resources, with no certificate anywhere in the path.",
      layers: [
        { label: "Before", nodes: ["Password logon", "MFA at cloud only", "Phishable credential"] },
        { label: "Mechanism", nodes: ["Entra Kerberos object", "Partial TGT", "Full on-prem TGT"] },
        { label: "Rollout", nodes: ["Prerequisite audit", "Intune rings", "Password fallback"] },
        { label: "After", nodes: ["2,800+ devices", "97% coverage", "0 certificates"] },
      ],
    },
    keywords: [
      "Windows Hello for Business",
      "passwordless authentication",
      "cloud Kerberos trust",
      "hybrid Azure AD join",
      "Entra Kerberos server object",
      "phishing-resistant credentials",
      "partial TGT",
      "Intune deployment rings",
    ],
    needs: [
      "Over what period the rollout ran, from pilot to 97%.",
      "The composition of the remaining 3% — unsupported hardware versus accepted exception.",
      "Whether FIDO2 security keys formed part of the same programme or a separate one.",
    ],
  },

  {
    slug: "intune-endpoint-platform",
    index: "05",
    title: "Intune Endpoint Platform",
    kind: "Endpoint management · Zero Trust",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Platform architect",
    featured: true,
    summary:
      "Designed and run modern endpoint management for 3,700+ devices — Autopilot provisioning, compliance baselines, BitLocker, and Windows LAPS, with device posture wired into Conditional Access.",
    metrics: [
      { value: "3,700+", label: "Devices managed" },
    ],
    context: [
      "Modern endpoint management for a multi-site Windows and macOS estate, with device posture feeding access decisions.",
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
          "Moved devices from on-premises AD to Entra ID join with Intune enrolment, shifting workloads across in a controlled sequence. An acquired entity was brought onto central management with a no-reboot enrolment method — no site visits, no user downtime, no maintenance window.",
      },
      {
        step: "Wire posture into access",
        detail:
          "Fed device compliance state into Conditional Access so corporate resource access is granted on posture rather than on credential alone, and built hygiene tooling for assignment auditing, unassigned-policy and empty-group detection, configuration drift baselines, and bulk device offboarding.",
      },
    ],
    challenges: [
      {
        title: "Deployed is not the same as protected",
        detail:
          "Application deployment consoles report their own success. Endpoint protection coverage was therefore confirmed in the security platform — sensor checked in, policy applied, telemetry flowing — rather than from the Intune install status, which answers a different question.",
      },
    ],
    validation: [
      "Endpoint protection coverage confirmed in the security platform — sensor checked in and reporting — rather than from the Intune install status, which answers whether a package deployed and not whether a device is protected.",
      "Encryption and compliance state reported across the estate from the directory-reconciled device list, so a device missing from the console surfaced as a named machine rather than as a lower percentage.",
    ],
    outcome: [
      "New devices reach a compliant, fully configured state without an engineer touching them.",
      "Encryption status, patch level, and compliance are reportable across the estate on demand.",
      "Access granted on device posture rather than credential alone, with compliance signals feeding Conditional Access.",
      "A mixed Windows and macOS estate managed from one platform, including remote users on FortiClient VPN.",
    ],
    stack: ["Microsoft Intune", "Windows Autopilot", "Entra ID", "BitLocker", "Windows LAPS", "Win32 apps", "PowerShell"],
    diagram: {
      caption: "Provisioning path from vendor to compliant device",
      layers: [
        { label: "Supply", nodes: ["Vendor", "Autopilot registration"] },
        { label: "Enrolment", nodes: ["Entra ID join", "Intune enrolment"] },
        { label: "Configuration", nodes: ["Compliance", "BitLocker", "Windows LAPS", "Win32 apps"] },
        { label: "Steady state", nodes: ["Reporting", "Conditional Access"] },
      ],
    },
    keywords: [
      "Microsoft Intune",
      "Windows Autopilot",
      "MDM auto-enrolment",
      "compliance policy",
      "configuration profile",
      "BitLocker key escrow",
      "Windows LAPS",
      "Win32 app packaging",
      "device compliance Conditional Access",
    ],
    needs: [
      "How many of the 3,700 came through Autopilot vs migrated in",
      "Compliance percentage achieved, and the baseline it started from",
      "Over what period the rollout ran",
      "Roughly how many Win32 apps you packaged",
      "The macOS share of the estate",
    ],
  },

  {
    slug: "exchange-online-hardening",
    index: "06",
    title: "Exchange Online Authentication Hardening",
    kind: "Email security · Identity · Audit",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Email and identity administration",
    featured: true,
    summary:
      "Closed legacy SMTP authentication across 4,000+ mailboxes, restored mailbox auditing to the recommended baseline and doubled audit retention — in production hours, with the exception list reconciled against real send activity rather than against who had asked to be exempted.",
    metrics: [
      { value: "4,000+", label: "Mailboxes hardened" },
      { value: "0", label: "Downtime taken" },
      { value: "2×", label: "Audit retention extended" },
      { value: "SMTP AUTH", label: "Legacy protocol closed" },
    ],
    context: [
      "Legacy SMTP authentication is what makes password spray worth running. It presents a username and password to Exchange Online with no second factor and no Conditional Access evaluation, so a correct guess is a mailbox — and the campaigns looking for one are automated, continuous and cheap.",
      "Turning it off tenant-wide is a one-line change and an outage. Multifunction devices scan to email over it. Line-of-business applications send alerts through it. Some of those senders are still needed, most are not, and nobody holds a current list of which is which.",
    ],
    approach: [
      {
        step: "Measure who is actually using it",
        detail:
          "Built the real list of senders still authenticating over SMTP AUTH from authentication and message telemetry, rather than accepting the maintained exception list at face value. Usage is the only defensible basis for an exemption; a request is not.",
      },
      {
        step: "Close by default, exempt by exception",
        detail:
          "Set the tenant default to disabled and re-enabled the protocol per mailbox only for senders with proven, current traffic — so the default is secure and every exemption is an explicit, named decision with an owner attached.",
      },
      {
        step: "Reconcile the exception list",
        detail:
          "Compared the surviving exemptions against actual send activity and removed the ones transmitting nothing. An exemption granted years ago for a decommissioned device is an open door with a business justification stapled to it.",
      },
      {
        step: "Restore mailbox auditing",
        detail:
          "Reset audit configuration across the estate to the recommended action set and extended retention to twice the previous period, so an investigation has a window to look back through instead of a boundary that predates the incident.",
      },
      {
        step: "Verify somewhere other than the change script",
        detail:
          "Read the resulting configuration back per mailbox from an independent session and reconciled the counts against the intended scope, rather than reporting success from the tooling that made the change.",
      },
    ],
    challenges: [
      {
        title: "The exception list nobody owned",
        detail:
          "The maintained list and the telemetry disagreed in both directions — senders exempted that had not sent anything in over a year, and senders still transmitting that were not on the list at all. Working from either source alone would have produced an outage or a false sense of closure.",
      },
      {
        title: "A change with no natural maintenance window",
        detail:
          "Mail is a 24-hour service; there is no hour where breaking it is cheap. The work was sequenced so that every step was individually reversible and none depended on a single big-bang cutover.",
      },
    ],
    validation: [
      "Post-change configuration read back per mailbox from an independent session, with counts reconciled against the intended scope — 4,000+ mailboxes confirmed rather than sampled.",
      "Message flow monitored after each wave for authentication failures from senders the telemetry pass had missed, so any overlooked dependency surfaced as a tracked exception instead of a support ticket.",
    ],
    outcome: [
      "Legacy SMTP authentication closed by default across 4,000+ mailboxes, removing the protocol password spray campaigns depend on.",
      "Every surviving exemption backed by current, evidenced send activity and attached to a named owner.",
      "Mailbox auditing restored to the recommended baseline with retention doubled, so an investigation has evidence to work from rather than a gap.",
      "Delivered with zero downtime and independently verified rather than reported from the change script.",
    ],
    stack: [
      "Exchange Online",
      "Exchange Online PowerShell",
      "Entra ID",
      "Conditional Access",
      "Microsoft Purview",
      "Defender for Office 365",
      "Microsoft Graph",
    ],
    diagram: {
      caption:
        "Tenant default closed, exemptions granted on evidence, and the result verified somewhere other than where it was set.",
      layers: [
        { label: "Before", nodes: ["SMTP AUTH open", "Stale exception list", "Mailbox audit review"] },
        { label: "Evidence", nodes: ["Auth telemetry", "Message trace", "Real send activity"] },
        { label: "Change", nodes: ["Tenant default off", "Per-mailbox exemptions", "Audit baseline reset"] },
        { label: "After", nodes: ["4,000+ mailboxes", "Owned exemptions", "2× retention"] },
      ],
    },
    keywords: [
      "legacy SMTP authentication",
      "SMTP AUTH disable",
      "basic authentication lockdown",
      "password spray",
      "Exchange Online hardening",
      "mailbox auditing",
      "audit log retention",
    ],
    needs: [
      "How many mailboxes hold a standing exemption, and the review cycle they sit on.",
      "The before and after audit retention periods in days.",
      "Whether Conditional Access authentication policies were used alongside the per-mailbox setting.",
    ],
  },

  {
    slug: "privileged-access-audit",
    index: "07",
    title: "SaaS Posture & Privileged Access Audit",
    kind: "Security posture · Privileged access · Governance",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Assessment and remediation",
    featured: true,
    summary:
      "Turned an 80+ finding SaaS security posture assessment into a prioritised, change-controlled remediation register — and escalated the privileged access findings the vendor had under-rated.",
    metrics: [
      { value: "80+", label: "Posture findings triaged" },
      { value: "30,000+", label: "Directory records audited" },
      { value: "0", label: "Findings left unowned" },
    ],
    context: [
      "A SaaS security posture assessment arrived carrying 80+ failed checks and a vendor severity against each one. Taken at face value that is a to-do list. Read properly it is a draft: the tool knows what a control is worth in general, not what it is worth in this tenant.",
    ],
    approach: [
      {
        step: "Re-rate the findings against this tenant",
        detail:
          "Assessed each finding on actual exposure here rather than on generic severity — what it grants, what depends on it, and what an attacker gains from it — and re-prioritised accordingly. Several findings moved up, and the ones that moved up were the ones involving standing privilege.",
      },
      {
        step: "Enumerate privilege completely",
        detail:
          "Audited 30,000+ directory records for privileged membership and account hygiene. Group membership was resolved transitively — a privileged group two levels up is still privileged access.",
      },
      {
        step: "Disposition every finding",
        detail:
          "Produced a remediation workbook in which every finding carries a disposition: remediated, scheduled against a named owner and a date, or formally accepted with written justification. Nothing was left in the state a scanner leaves it in.",
      },
      {
        step: "Remediate under change control",
        detail:
          "Sequenced remediation through change control — disable before delete, staging before removal — so a credential that turned out to be load-bearing could be restored rather than rebuilt.",
      },
      {
        step: "Escalate what the rating hid",
        detail:
          "Presented the re-rated privileged access findings to management with the exposure stated plainly rather than deferring to the vendor severity, so the decision to act was taken against the real risk.",
      },
    ],
    challenges: [
      {
        title: "A severity rating is an opinion",
        detail:
          "The temptation with a scored assessment is to work top-down and report the improvement in the score. Doing that here would have cleared a run of low-value checks while leaving the highest-risk privileged access findings in place, because the tool had no way of knowing what each principal could reach.",
      },
    ],
    validation: [
      "Privileged membership recounted after remediation from an independent enumeration rather than from the change record, so removals were confirmed to have taken effect.",
      "Every remaining finding traceable to a disposition with an owner — an audit position rather than an open backlog.",
    ],
    outcome: [
      "80+ posture findings converted into a prioritised register where every item is remediated, scheduled against an owner, or formally accepted with written justification.",
      "Privileged access across 30,000+ directory records enumerated with nesting resolved, replacing an assumption about who holds rights with a list.",
    ],
    stack: [
      "Entra ID",
      "SaaS security posture management",
      "Active Directory Domain Services",
      "Privileged Identity Management",
      "Microsoft Secure Score",
      "PowerShell",
      "Microsoft Graph",
      "BeyondTrust",
    ],
    diagram: {
      caption:
        "A vendor score re-rated against real exposure, then dispositioned down to the last finding.",
      layers: [
        { label: "Input", nodes: ["80+ failed checks", "Vendor severity", "Directory records"] },
        { label: "Re-rate", nodes: ["Exposure in this tenant", "Privilege enumeration", "Transitive membership"] },
        { label: "Disposition", nodes: ["Remediate", "Schedule to owner", "Accept with justification"] },
        { label: "After", nodes: ["Privileged findings escalated", "30,000+ records audited", "0 unowned findings"] },
      ],
    },
    keywords: [
      "SaaS security posture management",
      "privileged access audit",
      "credential hygiene",
      "directory hygiene",
      "least privilege",
      "remediation register",
    ],
    needs: [
      "The name of the posture assessment platform, if it can be published.",
      "How long the remediation programme ran, and how many findings remain formally accepted.",
      "Whether PIM eligibility replaced any of the standing privileged assignments.",
    ],
  },

  {
    slug: "group-policy-recovery",
    index: "08",
    title: "Group Policy Delivery Recovery",
    kind: "Incident response · Directory services",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2025",
    role: "Engineer — diagnosis and recovery",
    featured: true,
    summary:
      "A domain-wide Group Policy delivery failure had silently stopped every hardening setting reaching 700+ computers. Diagnosed and repaired in production hours — no reboot, no maintenance window, no user disconnected.",
    metrics: [
      { value: "700+", label: "Computers affected" },
      { value: "0", label: "Reboots required" },
      { value: "0", label: "Users disconnected" },
      { value: "Production", label: "Hours the fix ran in" },
    ],
    context: [
      "Group Policy failing loudly is an incident. Group Policy failing silently is worse: the computers keep working, users notice nothing, and every security setting the domain depends on simply stops arriving. The estate looks compliant in the console and is not compliant on the wire.",
      "700+ computers had stopped receiving policy. Everything hardening relies on — the settings applied once and assumed permanent — was quietly falling back to whatever each machine held locally as devices were rebuilt, re-imaged or newly joined.",
      "The obvious remedies each cost something. Reboots need a window. Re-linking policy blind risks applying the wrong scope.",
    ],
    approach: [
      {
        step: "Confirm the failure before theorising about it",
        detail:
          "Established the real scope from the clients rather than from the console: which computers had last applied policy, when, and which component of delivery was failing. A domain-wide symptom is not proof of a domain-wide cause.",
      },
      {
        step: "Read the resultant set, not the intent",
        detail:
          "Compared what policy was authored to say against what each client had actually resolved. On a domain, \"I configured it\" and \"it is configured\" are different statements, and only the resultant set settles which one is true.",
      },
      {
        step: "Fix the delivery path, not the symptom",
        detail:
          "Repaired the delivery mechanism itself so policy resumed reaching clients on the normal refresh cycle, rather than pushing settings out of band and leaving the underlying fault in place to resurface on the next rebuild.",
      },
      {
        step: "Recover without a window",
        detail:
          "Sequenced the repair to take effect on the standard refresh interval — no reboot, no logoff, no user disconnected — and watched clients return to compliance rather than declaring it fixed at the server.",
      },
      {
        step: "Prove the settings came back",
        detail:
          "Re-checked the specific hardening settings that had stopped applying, per machine, until the affected population was accounted for.",
      },
    ],
    challenges: [
      {
        title: "The tempting fix was the wrong one",
        detail:
          "Reapplying the settings directly would have turned the compliance report green within the hour and left the delivery path broken. Every machine rebuilt afterwards would have drifted straight back out, and the next discovery would have been months later.",
      },
    ],
    validation: [
      "Policy application confirmed per client after the refresh cycle rather than inferred from a healthy server-side state.",
      "The specific hardening settings that had stopped applying were read back on affected machines, so recovery was proved at the endpoint and not at the domain controller.",
    ],
    outcome: [
      "Policy delivery restored to 700+ computers in production hours, with no reboot and no user disconnected.",
      "Every security hardening setting that had silently stopped applying reinstated and confirmed at the endpoint.",
      "The delivery path repaired at source, so rebuilt and newly joined machines receive policy normally instead of inheriting the fault.",
    ],
    stack: [
      "Active Directory Domain Services",
      "Group Policy",
      "SYSVOL / DFSR",
      "Resultant Set of Policy",
      "Windows Server",
      "PowerShell",
    ],
    diagram: {
      caption: "A silent delivery failure, found from the clients rather than from the console.",
      layers: [
        { label: "Symptom", nodes: ["700+ computers", "No alert raised", "Settings reverting"] },
        { label: "Diagnosis", nodes: ["Client-side scope", "Resultant set of policy", "Delivery path"] },
        { label: "Repair", nodes: ["Fix at source", "Normal refresh cycle", "No reboot"] },
        { label: "After", nodes: ["Policy applying", "Hardening reinstated", "Delivery confirmed"] },
      ],
    },
    keywords: [
      "Group Policy not applying",
      "domain-wide GPO failure",
      "SYSVOL replication",
      "resultant set of policy",
      "gpresult",
      "security hardening drift",
      "Active Directory incident response",
      "silent failure",
    ],
    needs: [
      "The root cause, to whatever level you are comfortable publishing — SYSVOL/DFSR, permissions on the policy objects, or a client-side extension.",
      "How long the failure had been running before it was found.",
      "Whether monitoring was added afterwards to catch a repeat.",
    ],
  },

  {
    slug: "least-privilege-automation",
    index: "09",
    title: "Tenant Automation Without Standing Privilege",
    kind: "Automation · Least privilege · Integration",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — Present",
    role: "Engineer — automation and integration",
    featured: true,
    summary:
      "Standardised tenant automation on PowerShell and Microsoft Graph authenticating by device code against a pre-consented first-party client — no app registration to create, no client secret to rotate and no Global Administrator standing behind a script. Then applied the same discipline to a direct service desk integration that took ticket closure from minutes to about a second.",
    metrics: [
      { value: "0", label: "App registrations created" },
      { value: "0", label: "Client secrets to rotate" },
      { value: "~1 s", label: "Ticket closure, from minutes" },
      { value: "Device code", label: "Authentication method" },
    ],
    context: [
      "Tenant automation has a standard shape and a standard problem. Register an application, grant it the permissions the script needs, issue a secret, and from then on there is a credential in the environment that can do those things with no human present. It works. It also accumulates: the permissions get granted for the widest job the app might ever do, the secret outlives whoever created it, and nobody goes back to either.",
      "The convenient version is worse. Running automation under a Global Administrator removes the friction entirely and creates a standing, fully privileged credential whose blast radius is the whole tenant.",
      "The requirement was to run tenant-scale PowerShell and Graph work — bulk operations, reporting, collectors across 5,000+ identities — without leaving anything behind that an attacker would want to find.",
    ],
    approach: [
      {
        step: "Authenticate as a person, not as a secret",
        detail:
          "Standardised on device code authentication against a pre-consented Microsoft first-party client. The operator signs in interactively, the token is bounded by what that operator can already do, and it expires. No registered application, no client secret, and nothing sitting in the environment between runs.",
      },
      {
        step: "Take the permissions the task needs, not the ones it might",
        detail:
          "Requested scopes per task rather than granting a broad set once and reusing it. A collector that reads device compliance asks for that read and nothing else, so the token it holds cannot be repurposed by whoever finds the script later.",
      },
      {
        step: "Build for re-running, not for one shot",
        detail:
          "Wrote the tooling as re-runnable collectors with throttling and token refresh handled properly, so a job that runs for hours against a tenant this size survives interruption and resumes rather than starting again from nothing.",
      },
      {
        step: "Integrate directly where no connector existed",
        detail:
          "Where the service desk platform had no usable integration, built one against its API over OAuth rather than driving the UI or scheduling exports. Closure went from a multi-minute manual sequence to roughly a second, and the same approach produced custom integration services against other vendor APIs that shipped without one.",
      },
      {
        step: "Drive bulk change from a reconciled list",
        detail:
          "Ran bulk operations from CSV inputs reconciled against the directory rather than from console selections, so an operation of any size is reviewable before it runs and reproducible after it. A change you cannot show the input for is a change you cannot defend in an audit.",
      },
    ],
    challenges: [
      {
        title: "Device code is not unattended, and pretending otherwise is how secrets come back",
        detail:
          "The honest trade is that this needs a human at the start of a run. It is not a fit for a nightly job with nobody present, and the failure mode across the industry is a team quietly reintroducing a client secret to close that gap. Work that genuinely cannot have an operator is a separate design decision, taken deliberately rather than by drift.",
      },
      {
        title: "Throttling is the real limit, not permissions",
        detail:
          "At tenant scale Graph throttles, and naive code answers by failing halfway with no way to say what completed. Handling retry and token lifetime properly is the difference between a script that works in a demo and one that finishes against 5,000 identities and can tell you what it did.",
      },
      {
        title: "An integration is a credential too",
        detail:
          "The service desk integration needed its own OAuth credential — exactly the thing this whole approach exists to stop proliferating. It was scoped to that one system and that one job rather than being widened into a general-purpose automation identity, which is how the first exception becomes the new default.",
      },
    ],
    validation: [
      "Tokens confirmed as scoped and expiring rather than long-lived, so no run leaves a reusable credential behind it.",
      "Bulk operations reconciled against the directory before and after execution rather than reported from the script's own success count.",
    ],
    outcome: [
      "Tenant automation running with no app registration, no client secret and no standing Global Administrator behind it.",
      "Permissions requested per task, so the credential a script holds cannot do more than the task in front of it requires.",
      "Service desk closure cut from a multi-minute manual sequence to about one second through a direct OAuth API integration.",
      "Reporting and bulk operations made re-runnable and reconcilable, turning recurring manual exercises into a single scripted run.",
    ],
    stack: [
      "PowerShell",
      "Microsoft Graph",
      "Device code authentication",
      "OAuth 2.0",
      "Exchange Online PowerShell",
      "Power Automate",
      "REST APIs",
      "ManageEngine ServiceDesk Plus",
    ],
    diagram: {
      caption: "The usual shape leaves a credential behind in the tenant. This one does not.",
      layers: [
        { label: "Usual", nodes: ["App registration", "Broad consent", "Client secret", "or a Global Admin"] },
        { label: "Instead", nodes: ["Device code sign-in", "Pre-consented client", "Per-task scopes"] },
        { label: "Built", nodes: ["Re-runnable collectors", "Throttle + refresh", "CSV bulk ops"] },
        { label: "Result", nodes: ["0 secrets stored", "No standing privilege", "~1 s ticket closure"] },
      ],
    },
    keywords: [
      "least privilege automation",
      "device code flow",
      "Microsoft Graph",
      "pre-consented first-party client",
      "app registration",
      "client secret",
      "OAuth integration",
      "PowerShell automation",
      "Graph throttling",
      "service principal hygiene",
    ],
    needs: [
      "Whether the service desk platform can be named on the site.",
      "Roughly how many collectors and reports run on this pattern.",
      "Whether any scheduled or unattended job still uses a registered application, and how that credential is governed.",
      "Ticket volume flowing through the integration, which would make the one-second figure land harder.",
    ],
  },

  {
    slug: "sharepoint-file-server-migration",
    index: "10",
    title: "SharePoint Migration & Governance",
    kind: "Collaboration · Data migration · Information governance",
    client: "Enterprise client",
    employer: "HCLTech",
    period: "2024 — 2025",
    role: "Migration engineer & platform designer",
    featured: true,
    summary:
      "Moved multi-terabyte file servers into SharePoint Online across five business units, rebuilding the permission model on the way, then built the hub the group actually navigates — a landing site with a spoke per business unit serving 14+ business functions.",
    metrics: [
      { value: "5", label: "Business units migrated" },
      { value: "14+", label: "Business functions on the hub" },
    ],
    context: [
      "Each business unit ran its own file server carrying a decade of accumulated structure — deep folder nesting, broken NTFS inheritance, and permissions granted to individuals who had long since left. Remote access meant VPN. Collaboration meant emailing copies. Neither survived the move to hybrid work.",
      "The same fragmentation ran through the group's communications. Company-wide announcements went out by mass email, and policies, forms and templates lived wherever the owning department had last saved them. A new joiner had no single place to find out how anything worked.",
      "Both problems have the same root and the same trap: lift the existing structure into a new platform faithfully and you have paid for a migration to reproduce the thing you were trying to leave.",
    ],
    approach: [
      {
        step: "Assess and rationalise before moving anything",
        detail:
          "Scanned each share for size, path length, unsupported characters and last-accessed dates. Stale and duplicated data was archived rather than migrated — the cheapest terabyte to move is the one you do not.",
      },
      {
        step: "Redesign the permission model rather than port it",
        detail:
          "Replaced per-user NTFS grants with Entra ID security groups mapped to site and library permissions, flattening a structure built for a file system into one that matches how SharePoint actually resolves access. This is a redesign wearing a migration's clothes, and treating it as a copy is how the old mess arrives intact.",
      },
      {
        step: "Migrate in waves, cut over safely",
        detail:
          "Ran bulk transfers per business unit with incremental delta passes so the final cutover moved only what had changed. Source shares were set read-only at cutover rather than deleted, users were repointed through OneDrive sync and Teams, and the first week was covered by floor-walking support.",
      },
      {
        step: "Give the estate an architecture, not just a destination",
        detail:
          "Designed a hub-and-spoke structure with a group landing site and a spoke per business unit, so units keep ownership of their own content while search and navigation stay unified across the group.",
      },
      {
        step: "Govern it so it cannot drift back",
        detail:
          "Set site provisioning standards, ownership and Entra ID group-based permissions, then worked with each business unit to move their policies, forms and templates into place and launched with communications so the hub became the default destination rather than one more place to check.",
      },
    ],
    challenges: [
      {
        title: "Permissions do not survive the trip",
        detail:
          "A decade of NTFS grants, broken inheritance and access issued to people who had left does not map onto SharePoint, and carrying it faithfully would have rebuilt the problem in a more expensive system. The structure had to be flattened onto groups, which is a governance decision made under a migration deadline.",
      },
      {
        title: "A hub nobody visits is a shared drive with extra steps",
        detail:
          "An intranet succeeds or fails on whether it becomes the default destination. The build is the easy half; provisioning standards, named ownership and group-based permissions are what stop it drifting back into the sprawl it replaced inside a year.",
      },
      {
        title: "Capacity is a governance problem before it is a storage one",
        detail:
          "Storage planning across the tenant identified multi-terabyte reclamation without removing a single piece of live content — because most of what fills a tenant is not live content, it is versions, abandoned sites and copies of copies that nobody has ever been asked to own.",
      },
    ],
    validation: [
      "Permission models verified per site against the intended group mapping rather than accepted from the migration tool's completion report.",
      "Cutover shares set read-only rather than deleted, so anything missed was recoverable rather than gone.",
    ],
    outcome: [
      "Five business units working from SharePoint Online with no VPN dependency for file access.",
      "Permissions carried by security groups rather than individual grants, so joiners and leavers are handled by group membership instead of by a ticket.",
      "Version history and recycle bin available where the only previous recovery path was a restore request.",
      "One destination for group news, policies and forms across 14+ business functions, searchable across the hub instead of siloed per department.",
      "Multi-terabyte storage reclamation identified through capacity planning without removing any live content.",
    ],
    stack: [
      "SharePoint Online",
      "OneDrive",
      "Microsoft Teams",
      "Entra ID",
      "Microsoft Purview",
      "Power Automate",
      "PowerShell",
      "Microsoft Graph",
    ],
    diagram: {
      caption:
        "Shares rationalised and repermissioned on the way in, then given a structure the group can navigate.",
      layers: [
        { label: "Source", nodes: ["Head office", "BU 02", "BU 03", "BU 04", "BU 05"] },
        { label: "Process", nodes: ["Assessment", "Permission redesign", "Bulk + delta"] },
        { label: "Structure", nodes: ["Group landing site", "Spoke per business unit", "Provisioning standards"] },
        { label: "Surface", nodes: ["Teams", "Search", "Mobile", "14+ business functions"] },
      ],
    },
    keywords: [
      "file server to SharePoint migration",
      "SharePoint Online governance",
      "NTFS permission redesign",
      "Entra ID group permissions",
      "hub and spoke intranet",
      "OneDrive sync",
      "SharePoint capacity planning",
      "information architecture",
    ],
    needs: [
      "Total data volume moved, in TB, and the user population across the five units.",
      "How many sites and libraries ended up under the hub.",
      "Which migration tooling was used — ShareGate, Migration Manager, Mover, or scripted.",
      "Whether Viva Connections was part of the intranet delivery.",
    ],
  },

  {
    slug: "tenant-to-tenant-m365",
    index: "11",
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
    challenges: [
      {
        title: "One irreversible step gates the whole cutover",
        detail:
          "A vanity domain can exist in exactly one tenant at a time, so the release-and-claim is a hard sequence point with no rollback that does not cost mail flow. Everything either side of it — pre-seed, licence assignment, routing addresses, DNS — has to be finished beforehand, because the window is not the place to discover a missing prerequisite.",
      },
      {
        title: "Coexistence is where users actually feel it",
        detail:
          "Between the first pre-seed and the final delta the group runs two directories. Free/busy lookups, distribution group membership and a split global address list all degrade in ways that generate tickets from people who were told nothing was changing yet. Managing that period is most of the user-facing work, and none of it appears in a migration report.",
      },
      {
        title: "The migration ends at the mailbox; the disruption ends at the device",
        detail:
          "Data arriving in the target tenant is the easy definition of done. Outlook profiles rebuilding, cached credentials, mobile devices re-enrolling and shared mailbox reconnections are what the user experiences, and they land the morning after the window closes rather than during it.",
      },
    ],
    validation: [
      "Object counts reconciled on both sides after each pass — mailboxes, shared mailboxes, distribution groups and OneDrive volumes — rather than accepting the migration tool's completion summary.",
      "Mail flow, autodiscover and free/busy tested end to end after the domain claim, before the window was declared closed.",
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
