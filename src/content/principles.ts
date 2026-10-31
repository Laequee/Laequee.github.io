/**
 * Engineering principles — the three rules the CV closes on.
 *
 * They sit between the case studies and the tooling because they are the thread
 * running through both: every project on this site was delivered under them, and
 * more than one of the case-study challenges is a story about what happens when
 * one of them is skipped.
 */

export type Principle = {
  code: string;
  title: string;
  detail: string;
};

export const principles: Principle[] = [
  {
    code: "VER",
    title: "Independent verification",
    detail:
      "Controls are confirmed in a second system before being reported complete — coverage checked in the security platform rather than the deployment console, configuration read back from an independent session. A change that has only been made is not a change that has been proved.",
  },
  {
    code: "ENUM",
    title: "Complete enumeration",
    detail:
      "Scope is established from the source, with genuine visibility across directory, cloud and endpoint telemetry rather than whichever console answers fastest. Any residual blind spot is stated explicitly rather than left implied — an unstated gap reads as full coverage, and that is how estates get missed.",
  },
  {
    code: "BLAST",
    title: "Blast radius analysis",
    detail:
      "Impact is enumerated and changes piloted before general release. Disable before delete, staging before removal, and a documented restore point on any change that moves or destroys data. The question is never only whether it works, but what it takes down if it does not.",
  },
];
