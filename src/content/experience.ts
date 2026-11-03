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
    title: "System Specialist / Digital Workplace Specialist",
    employer: "HCLTech",
    client: "Multinational food & beverage group",
    period: "Nov 2024 — Present",
    start: "2024-11",
    end: "present",
    location: "Abu Dhabi, UAE",
    current: true,
    summary:
      "Digital workplace, identity and endpoint specialist for the group's Microsoft cloud platform — a single Entra ID tenant over a multi-domain, multi-forest Active Directory estate of 5,000+ identities, 4,000+ mailboxes, 3,700+ managed devices, 2,500+ endpoint security sensors and 2,000+ SharePoint sites.",
    highlights: [
      "Architected and manage Microsoft Intune for 3,700+ devices: Autopilot, compliance and configuration profiles, BitLocker, Windows LAPS and Win32 packaging.",
      "Own hybrid identity for 5,000+ identities: Entra ID, Conditional Access, MFA, PIM, SSPR and the Joiner-Mover-Leaver lifecycle.",
      "Deployed Windows Hello for Business passwordless sign-in to 2,800+ devices (97% of the Windows estate) via cloud Kerberos trust, with no PKI and no extra spend.",
      "Administer Exchange Online, SharePoint Online, OneDrive and Teams across a 2,000+ site tenant, and support the Microsoft 365 Copilot rollout.",
      "Delivered tenant-to-tenant Microsoft 365 migrations (Exchange, SharePoint, OneDrive, Teams) with minimal disruption to users.",
      "Disabled legacy SMTP authentication across 4,000+ mailboxes and doubled mailbox audit retention, with zero downtime.",
      "Hardened a 100+ server estate to a 90%+ CIS Benchmark compliance score using Qualys Policy Compliance.",
      "Restored a domain-wide Group Policy failure affecting 700+ computers in production hours, with no reboots.",
      "Delivered a privileged access and directory hygiene audit across 30,000+ records.",
      "Build PowerShell and Microsoft Graph automation and reporting, and integrated the service desk over OAuth, cutting ticket closure from minutes to about a second.",
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
    highlights: [],
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
    highlights: [],
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
    highlights: [],
  },
];
