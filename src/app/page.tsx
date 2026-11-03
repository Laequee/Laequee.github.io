import { Contact } from "@/components/home/contact";
import { Courses } from "@/components/home/courses";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { Hero } from "@/components/home/hero";
import { SkillsMatrix } from "@/components/home/skills-matrix";
import { StatStrip } from "@/components/home/stat-strip";
import { Work } from "@/components/home/work";

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <Work />
      <ExperienceTimeline />
      <SkillsMatrix />
      <Courses />
      <Contact />
    </>
  );
}
