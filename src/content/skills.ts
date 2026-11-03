/**
 * Skills grouped by domain, ordered by how central each is to the work.
 *
 * Mirrors the CV's core competency blocks so the two documents claim the same
 * things. Six groups, Microsoft 365 first to match the positioning; the full list
 * lives on the CV.
 */

export type SkillGroup = {
  code: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    code: "M365",
    title: "Microsoft 365",
    items: [
      "Exchange Online",
      "SharePoint Online & OneDrive",
      "Microsoft Teams",
      "Tenant-to-tenant migration",
      "Microsoft 365 Copilot",
      "Purview: labels, DLP, retention",
    ],
  },
  {
    code: "MDM",
    title: "Endpoint Management",
    items: [
      "Microsoft Intune",
      "Autopilot & auto-enrolment",
      "Compliance & configuration profiles",
      "Win32 app packaging",
      "BitLocker & Windows LAPS",
      "Windows & macOS",
    ],
  },
  {
    code: "IAM",
    title: "Identity & Access",
    items: [
      "Entra ID",
      "Conditional Access",
      "MFA · PIM · RBAC · SSPR",
      "Windows Hello for Business",
      "Entra Connect hybrid sync",
      "SAML / SSO",
    ],
  },
  {
    code: "DIR",
    title: "Directory & Infrastructure",
    items: [
      "Active Directory",
      "Group Policy",
      "DNS · DHCP · DFSR",
      "Windows Server 2012 R2 – 2025",
      "VMware · Zerto · Veeam",
      "Cisco Meraki · 802.1X / RADIUS",
    ],
  },
  {
    code: "SEC",
    title: "Security",
    items: [
      "CrowdStrike Falcon",
      "Defender for Endpoint & Office 365",
      "Qualys VMDR & Policy Compliance",
      "CIS Benchmark hardening",
      "Phishing & BEC investigation",
      "BeyondTrust PAM",
    ],
  },
  {
    code: "AUT",
    title: "Automation & Service",
    items: [
      "PowerShell",
      "Microsoft Graph",
      "Power Automate",
      "REST & OAuth integration",
      "ServiceNow · ServiceDesk Plus",
      "Change & incident management",
    ],
  },
];
