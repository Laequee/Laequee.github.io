/**
 * Courses and training completed.
 *
 * This was previously presented as "Certifications". The CV lists these under
 * COURSES COMPLETED, and the two documents should not make different claims
 * about the same eight items — a completed course and a held certification are
 * different things, and the smaller claim is the one that survives a reference
 * check. Renamed here rather than reworded on the page, so nothing downstream
 * can drift back.
 *
 * Only the Zerto credential carries a date. `issued` and `credentialUrl` are
 * left null where unknown — the card renders without them rather than inventing
 * a date. Fill both in and the card becomes a link to its verification page.
 */

export type Course = {
  name: string;
  code?: string;
  issuer: string;
  issued: string | null;
  credentialUrl: string | null;
  family: "microsoft" | "cisco" | "other";
};

export const courses: Course[] = [
  {
    name: "Microsoft 365 Administrator Expert",
    code: "MS-102",
    issuer: "Microsoft",
    issued: null,
    credentialUrl: null,
    family: "microsoft",
  },
  {
    name: "Azure Administrator Associate",
    code: "AZ-104",
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
    name: "Microsoft 365 Fundamentals",
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
    code: "ZCA",
    issuer: "Zerto — a Hewlett Packard Enterprise company",
    issued: "May 2024",
    credentialUrl: null,
    family: "other",
  },
  {
    name: "Complete ServiceNow Course",
    code: "ITSM",
    issuer: "Udemy",
    issued: null,
    credentialUrl: null,
    family: "other",
  },
];
