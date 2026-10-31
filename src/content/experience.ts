/**
 * Career timeline, most recent first. Sourced from the current CV.
 *
 * NOTE ON THE CURRENT ROLE: shown as one entry, HCLTech as employer and the
 * client as client.
 *
 * NOTE ON THE CLIENT NAME: the client is described by sector rather than named,
 * matching the CV. If that ever changes it changes here and nowhere else — no
 * component and no case study hardcodes it.
 */

export type Role = {
  title: string;
  employer: string;
  /** Set only when the employer placed you with a separate client organisation. */
  client?: string;
  /** A qualifier on the employer itself — a parent group, not a client. */
  employerNote?: string;
  period: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  note?: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    title: "Security, Identity & Endpoint Engineer",
    employer: "HCLTech",
    client: "Multinational food & beverage group",
    period: "Nov 2024 — Present",
    start: "2024-11",
    end: "present",
    location: "Abu Dhabi, UAE",
    current: true,
    summary:
      "Core security, identity and endpoint engineer for the group's Microsoft cloud platform — a single Entra ID tenant over a multi-domain, multi-forest Active Directory estate of 5,000+ identities, 4,000+ mailboxes, 3,700+ managed devices, 2,500+ endpoint security sensors and 2,000+ SharePoint sites.",
    highlights: [
      "Own endpoint detection and response across a 2,500+ sensor CrowdStrike Falcon estate — prevention policy design, host group scoping, IOA/IOC tuning, Real Time Response and Identity Protection.",
      "Led an enterprise-wide CrowdStrike tenant-to-tenant migration across a multi-domain environment, removing and reinstalling 2,500+ sensors against a fixed licence expiry with no host left on the retired tenant and no service impact.",
      "Deployed Windows Hello for Business passwordless sign-in to 2,800+ hybrid joined devices — 97% of the managed Windows estate — over cloud Kerberos trust, with no PKI, no certificates and no additional spend.",
      "Architected and manage Microsoft Intune for 3,700+ devices: Autopilot provisioning, MDM auto-enrolment, compliance and configuration profiles, BitLocker, Windows LAPS and Win32 packaging.",
      "Own hybrid identity for a multi-domain, multi-forest estate of 5,000+ identities — Entra ID, Conditional Access, MFA, PIM, RBAC, SSPR and the full Joiner-Mover-Leaver lifecycle.",
      "Implemented CIS Benchmark hardening to a 90%+ compliance score across a 100+ server estate through Qualys Policy Compliance, with open points independently verified.",
      "Converted an 80+ finding SaaS security posture assessment into a prioritised, change-controlled remediation register, elevating privileged access findings the vendor had under-rated.",
      "Delivered a privileged access and directory hygiene audit across 30,000+ records, producing a dispositioned remediation workbook.",
      "Restored a domain-wide Group Policy delivery failure affecting 700+ computers in production hours — no reboot, no user disconnected — reinstating every hardening setting that had silently stopped applying.",
      "Hardened Exchange Online authentication: disabled legacy SMTP authentication across 4,000+ mailboxes and reconciled the exception list against real send activity.",
      "Remediated mailbox auditing across 4,000+ mailboxes to the recommended baseline and doubled audit retention — zero downtime, independently verified.",
      "Key contributor to an Active Directory consolidation and modernisation programme: legacy domain controller decommissioning, FSMO transfer with replication health assurance, and cross-domain user migration with UPN normalisation.",
      "Upgraded and reconfigured Entra Connect, transitioning the source anchor from ObjectGUID to mS-DS-ConsistencyGuid to prevent duplicate cloud identities.",
      "Investigate and contain email-borne threats including business email compromise, malicious inbox rules and password spray campaigns, and specify the follow-on hardening.",
      "Run vulnerability management with Qualys VMDR and CSAM — asset coverage, remediation registers and root cause analysis.",
      "Administer Exchange Online, SharePoint Online, OneDrive and Teams across a 2,000+ site tenant, including Microsoft Purview sensitivity labels, DLP, retention and eDiscovery.",
      "Support the Microsoft 365 Copilot rollout and governance — licence assignment, tenant readiness, and adoption and usage reporting built on Microsoft Graph.",
      "Standardised tenant automation on PowerShell and Microsoft Graph using device code authentication against a pre-consented first-party client, removing app registration and Global Administrator dependencies.",
      "Integrated the service desk platform through a direct OAuth API integration, reducing ticket closure from minutes to about one second.",
      "Onboarded an acquired entity to central endpoint management using a no-reboot enrolment method — no site visits, no user downtime, no maintenance window.",
    ],
  },
  {
    title: "IT Support Engineer",
    employer: "BIOS Middle East",
    employerNote: "A ZainTECH company",
    period: "Nov 2023 — Oct 2024",
    start: "2023-11",
    end: "2024-10",
    location: "UAE",
    summary:
      "Microsoft 365 and Active Directory administration across multiple customer environments, alongside virtualisation, backup and network operations.",
    highlights: [
      "Administered Microsoft 365 and Active Directory — user lifecycle, access control, Group Policy, licensing and mailbox administration.",
      "Managed VMware vCenter with Zerto replication for disaster recovery, and Veeam backup with restore validation.",
      "Administered Cisco Meraki networking across client sites.",
      "Provided first-line support across software, applications and IT services, with hardware and peripheral troubleshooting.",
      "Ran incident and request queues in ServiceNow and ManageEngine ServiceDesk Plus, with vendor coordination.",
      "Owned IT documentation for the environments supported.",
    ],
  },
  {
    title: "System Engineer",
    employer: "Cognizant",
    period: "Aug 2022 — Aug 2023",
    start: "2022-08",
    end: "2023-08",
    location: "Bengaluru, Karnataka, India",
    summary:
      "24/7 technical support in a large managed service environment, working to ticket SLAs in ServiceNow across day and night shifts.",
    highlights: [
      "Delivered 24/7 support across day and night shifts, working to ticket SLAs in ServiceNow.",
      "Handled Active Directory user administration, access control, and password and account management.",
      "Provided VPN, remote desktop and domain join support for remote and in-office staff.",
      "Maintained asset inventory and reporting.",
    ],
  },
  {
    title: "System Engineer",
    employer: "EYS IT Solutions",
    period: "Oct 2020 — Aug 2022",
    start: "2020-10",
    end: "2022-08",
    location: "Perinthalmanna, Malappuram, Kerala, India",
    summary:
      "First professional role — Windows Server administration, workstation deployment, and backup operations.",
    highlights: [
      "Installed, configured and administered Windows Server 2012 R2 for enterprise operations.",
      "Ran operating system deployment, imaging, updates and driver management.",
      "Owned access control and file permissions — user permissions, authentication and security configuration.",
      "Managed backup, data transfer, recovery and system restore to ensure business continuity.",
      "Configured workstations, network devices and peripherals.",
    ],
  },
];
