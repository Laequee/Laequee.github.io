/** Skills grouped by domain, ordered by how central each is to the work. */

export type SkillGroup = {
  code: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    code: "M365",
    title: "Microsoft 365 & Identity",
    items: [
      "Exchange Online",
      "Microsoft Teams",
      "SharePoint Online",
      "OneDrive",
      "Entra ID",
      "Conditional Access",
      "MFA",
      "Purview",
    ],
  },
  {
    code: "EP",
    title: "Endpoint & Device Management",
    items: [
      "Intune",
      "Autopilot",
      "Compliance policies",
      "Configuration profiles",
      "BitLocker",
      "LAPS",
      "Win32 app packaging",
    ],
  },
  {
    code: "SEC",
    title: "Security & Compliance",
    items: [
      "Defender for Endpoint",
      "Defender for Office 365",
      "Secure Score",
      "CrowdStrike Falcon",
      "Heimdal",
      "DLP",
      "Zero Trust",
    ],
  },
  {
    code: "MIG",
    title: "Migration & Transformation",
    items: [
      "Tenant-to-tenant M365",
      "AD user & domain migration",
      "File server to SharePoint",
      "Azure AD Connect",
      "Hybrid identity",
      "Source anchor transition",
    ],
  },
  {
    code: "AUT",
    title: "Automation",
    items: [
      "PowerShell",
      "Microsoft Graph",
      "Exchange Online PowerShell",
      "Intune PowerShell",
      "Power Automate",
      "Bulk CSV operations",
      "Bash",
    ],
  },
  {
    code: "DIR",
    title: "Directory & Infrastructure",
    items: [
      "AD DS",
      "Group Policy",
      "RODCs",
      "DNS / DHCP",
      "FSMO roles",
      "Windows Server 2012 R2 – 2022",
      "VMware vCenter",
      "Veeam",
      "Zerto",
    ],
  },
  {
    code: "NET",
    title: "Networking",
    items: [
      "Cisco Meraki",
      "SD-WAN",
      "Auto-VPN",
      "Site-to-site VPN",
      "Client VPN",
      "SSL / TLS",
      "TCP/IP",
    ],
  },
  {
    code: "OPS",
    title: "IT Operations",
    items: [
      "ServiceNow",
      "ManageEngine ServiceDesk Plus",
      "Incident management",
      "Change management",
      "SOPs & runbooks",
      "Audit documentation",
      "Vendor coordination",
    ],
  },
];

/** Short list for the hero ticker — the tools most worth leading with. */
export const primaryTools = [
  "Microsoft Intune",
  "Entra ID",
  "Exchange Online",
  "SharePoint Online",
  "CrowdStrike Falcon",
  "Defender for Endpoint",
  "Active Directory",
  "PowerShell",
  "Microsoft Graph",
  "Azure AD Connect",
  "Veeam",
  "VMware vCenter",
  "Cisco Meraki",
  "Conditional Access",
] as const;
