import { Contact } from "@/components/home/contact";
import { Courses } from "@/components/home/courses";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { Hero } from "@/components/home/hero";
import { Principles } from "@/components/home/principles";
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
      <Principles />
      <SkillsMatrix />
      <Courses />
      <ProfilePanel />
      <Contact />
    </>
  );
}
