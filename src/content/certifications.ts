/**
 * Certifications.
 *
 * Only the Zerto credential carries a date on LinkedIn; the rest are listed on the
 * previous portfolio without dates or verification links. `issued` and `credentialUrl`
 * are left null where unknown — the card renders without them rather than inventing
 * a date. Fill both in and each badge becomes a link to its verification page.
 */

export type Certification = {
  name: string;
  code?: string;
  issuer: string;
  issued: string | null;
  credentialUrl: string | null;
  family: "microsoft" | "cisco" | "other";
};

export const certifications: Certification[] = [
  {
    name: "Azure Administrator Associate",
    code: "AZ-104",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Microsoft 365 Administrator Expert",
    code: "MS-102",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Endpoint Administrator Associate",
    code: "MD-102",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Microsoft 365 Certified: Fundamentals",
    code: "MS-900",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Power Platform Fundamentals",
    code: "PL-900",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Cisco Certified Network Associate",
    code: "CCNA",
    issuer: "Cisco",
    issued: null,
    credentialUrl: null,
    family: "cisco",
  },
  {
    name: "Zerto Certified Associate",
    issuer: "Zerto — a Hewlett Packard Enterprise company",
    issued: "May 2024",
    credentialUrl: null,
    family: "other",
  },
  {
    name: "Complete ServiceNow Course",
    issuer: "Udemy",
    issued: null,
    credentialUrl: null,
    family: "other",
  },
];
