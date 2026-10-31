/**
 * Skills grouped by domain, ordered by how central each is to the work.
 *
 * Mirrors the CV's core competency blocks so the two documents claim the same
 * things. Twelve groups, which lands as a clean three rows of four on the grid —
 * if you add or remove one, the lede in `skills-matrix.tsx` names the count.
 */

export type SkillGroup = {
  code: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    code: "EDR",
    title: "Endpoint Security",
    items: [
      "CrowdStrike Falcon",
      "Prevention policy & host groups",
      "IOA / IOC tuning",
      "Real Time Response",
      "Falcon Identity Protection",
      "Defender for Endpoint",
      "SaaS security posture management",
      "BeyondTrust PAM",
    ],
  },
  {
    code: "SOC",
    title: "Security Operations",
    items: [
      "Threat detection & response",
      "Alert triage & containment",
      "Threat hunting",
      "Phishing & BEC investigation",
      "Password spray analysis",
      "Malware containment & host isolation",
      "Post-incident RCA",
      "Log & audit analysis",
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
      "Passwordless & cloud Kerberos trust",
      "Entra Connect hybrid sync",
      "SAML / SSO claim mapping",
      "Joiner-Mover-Leaver lifecycle",
    ],
  },
  {
    code: "VUL",
    title: "Vulnerability & Compliance",
    items: [
      "Qualys VMDR",
      "Qualys CSAM",
      "Qualys Policy Compliance",
      "CIS Benchmark hardening",
      "Microsoft Secure Score",
      "Remediation registers",
      "Audit evidence packs",
      "Control validation",
    ],
  },
  {
    code: "GOV",
    title: "Frameworks & Governance",
    items: [
      "CIS Benchmarks & Controls",
      "NIST Cybersecurity Framework",
      "ISO 27001 control alignment",
      "MITRE ATT&CK",
      "Zero Trust architecture",
      "Least privilege & defence in depth",
      "Risk & remediation registers",
      "Security policy & runbooks",
    ],
  },
  {
    code: "MAIL",
    title: "Email & Data Security",
    items: [
      "Exchange Online transport policy",
      "Legacy authentication lockdown",
      "Mailbox auditing",
      "Defender for Office 365",
      "Mimecast",
      "Purview sensitivity labels",
      "DLP & retention",
      "eDiscovery",
    ],
  },
  {
    code: "MDM",
    title: "Endpoint Management",
    items: [
      "Microsoft Intune",
      "Autopilot & MDM auto-enrolment",
      "Compliance & configuration profiles",
      "Win32 app packaging",
      "BitLocker",
      "Windows LAPS",
      "WSUS & Windows Update for Business",
      "Windows & macOS estates",
    ],
  },
  {
    code: "M365",
    title: "Microsoft 365 Workloads",
    items: [
      "Exchange Online",
      "SharePoint Online & OneDrive",
      "Microsoft Teams",
      "Tenant-to-tenant migration",
      "File server to SharePoint",
      "Microsoft 365 Copilot",
      "Licence optimisation",
      "Adoption & governance reporting",
    ],
  },
  {
    code: "DIR",
    title: "Directory & Infrastructure",
    items: [
      "AD DS",
      "Domain controller lifecycle & FSMO",
      "Group Policy design",
      "RODC · DNS · DHCP",
      "DFSR / SYSVOL",
      "Windows Server 2012 R2 – 2025",
      "Remote Desktop Services",
      "VMware vCenter · Zerto · Veeam",
    ],
  },
  {
    code: "AUT",
    title: "Automation & Integration",
    items: [
      "PowerShell",
      "Microsoft Graph",
      "Device code authentication",
      "Power Automate",
      "Python",
      "Node.js",
      "REST & OAuth integration",
      "CSV-driven bulk operations",
    ],
  },
  {
    code: "NET",
    title: "Networking & Access",
    items: [
      "802.1X / RADIUS",
      "Aruba ClearPass",
      "FortiClient VPN",
      "Cisco Meraki",
      "SD-WAN & Auto-VPN",
      "Site-to-site & client VPN",
      "SSL / TLS",
      "TCP/IP",
    ],
  },
  {
    code: "OPS",
    title: "Service Management",
    items: [
      "Incident, change & problem management",
      "Blast radius analysis",
      "ServiceNow",
      "ManageEngine ServiceDesk Plus",
      "Vendor & stakeholder management",
      "Change-impact briefing",
      "SOPs & runbooks",
      "Audit documentation",
    ],
  },
];

/** Short list for the hero ticker — the tools most worth leading with. */
export const primaryTools = [
  "CrowdStrike Falcon",
  "Microsoft Intune",
  "Entra ID",
  "Conditional Access",
  "Defender for Endpoint",
  "Qualys VMDR",
  "CIS Benchmarks",
  "Exchange Online",
  "SharePoint Online",
  "Active Directory",
  "Entra Connect",
  "Microsoft Purview",
  "PowerShell",
  "Microsoft Graph",
  "Windows Hello for Business",
  "BeyondTrust",
] as const;
