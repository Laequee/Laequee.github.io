import { Certifications } from "@/components/home/certifications";
import { ComplianceReport } from "@/components/home/compliance-report";
import { Contact } from "@/components/home/contact";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { Hero } from "@/components/home/hero";
import { ProfilePanel } from "@/components/home/profile-panel";
import { SkillsMatrix } from "@/components/home/skills-matrix";
import { StatStrip } from "@/components/home/stat-strip";
import { Ticker } from "@/components/home/ticker";
import { Work } from "@/components/home/work";

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <Ticker />
      <Work />
      <ExperienceTimeline />
      <SkillsMatrix />
      <ComplianceReport />
      <Certifications />
      <ProfilePanel />
      <Contact />
    </>
  );
}
