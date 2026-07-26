/**
 * Career timeline, most recent first.
 *
 * NOTE ON THE CURRENT ROLE: LinkedIn lists two concurrent full-time positions —
 * IT Specialist at HCLTech (Nov 2024–present) and IT Collaboration Specialist at
 * Agthia Group PJSC (Jun 2024–present). Per the agreed presentation these are shown
 * as one entry: HCLTech as employer, Agthia as client. The June 2024 start of the
 * Agthia engagement is preserved in `note` so nothing is lost.
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
    title: "IT Specialist",
    employer: "HCLTech",
    client: "Agthia Group PJSC",
    period: "Nov 2024 — Present",
    start: "2024-11",
    end: "present",
    location: "Abu Dhabi, UAE",
    current: true,
    note: "Engaged with Agthia Group since June 2024, initially as IT Collaboration Specialist.",
    summary:
      "End-to-end IT operations, cloud transformation, and security hardening across a large multi-tenant environment spanning 14+ business units.",
    highlights: [
      "Executed the CrowdStrike tenant migration across 7 AD domains and 4,500+ endpoints.",
      "Designed endpoint management at scale — Intune, Autopilot, compliance baselines, BitLocker, and LAPS across 2,000+ devices.",
      "Led the Active Directory consolidation programme, raising the forest functional level from Windows Server 2008 to 2025, moving SYSVOL off FRS, and decommissioning eight legacy domain controllers.",
      "Hardened the domain controller estate to a 94% CIS Benchmark compliance score under independent Qualys assessment, across 120+ Windows servers.",
      "Upgraded Entra Connect, including a source anchor transition to mS-DS-ConsistencyGuid, without breaking hybrid identity.",
      "Delivered Microsoft 365 tenant-to-tenant migrations, onboarding newly acquired entities into the corporate tenant and domain.",
      "Migrated multi-terabyte file servers to SharePoint Online for head office and four operating companies.",
      "Implemented Conditional Access, MFA, Defender for Endpoint, and Purview controls; raised Secure Score.",
      "Administered Veeam backup, restore, and disaster recovery readiness; supported VMware vCenter workloads.",
      "Optimised E3/E5 and Adobe licensing, cutting recurring spend.",
      "Automated administration and reporting with PowerShell and Microsoft Graph.",
      "Produced SOPs and runbooks supporting audit and operational continuity across 14+ business units.",
    ],
  },
  {
    title: "IT Support Engineer",
    employer: "BIOS Middle East",
    employerNote: "A ZainTech company",
    period: "Nov 2023 — Oct 2024",
    start: "2023-11",
    end: "2024-10",
    location: "UAE",
    summary:
      "Server and desktop operations across multiple customer environments, as part of the Windows Active Directory domain administration team.",
    highlights: [
      "Administered Microsoft 365 and Windows Active Directory across diverse client organisations.",
      "Managed VMware vCenter, Zerto replication, and Cisco Meraki networking.",
      "Handled incident and request queues in ServiceNow and ManageEngine ServiceDesk Plus.",
      "Managed Azure AD and Group Policy, account provisioning, and access control.",
      "Installed, configured, and troubleshot Outlook, VPN, antivirus, and backup solutions.",
      "Maintained hardware and software inventory and licensing; coordinated with vendors.",
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
      "Technical support in a 24×7 service management environment, working ServiceNow queues for a global user base.",
    highlights: [
      "Resolved incidents and service requests through ServiceNow in a 24×7 rota.",
      "Administered user accounts, access, and domain client onboarding.",
      "Provided remote desktop support over RDP and Microsoft Teams.",
      "Diagnosed hardware faults, VPN connectivity, and printer/scanner configuration.",
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
      "Built and deployed workstations: OS installation, drivers, updates, and application packaging.",
      "Onboarded domain workstations and managed access control.",
      "Ran backup and recovery operations.",
      "Administered Windows Server 2012 R2.",
    ],
  },
];
