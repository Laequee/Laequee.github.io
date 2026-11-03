import { Contact } from "@/components/home/contact";
import { Courses } from "@/components/home/courses";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { Hero } from "@/components/home/hero";
import { SkillsMatrix } from "@/components/home/skills-matrix";
import { StatStrip } from "@/components/home/stat-strip";
import { Work } from "@/components/home/work";
import { TextLoop } from "@/components/motion/text-loop";
import { VelocityMarquee } from "@/components/motion/velocity-marquee";
import { marqueeRows } from "@/content/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <div className="mt-10 sm:mt-12">
        <VelocityMarquee rows={marqueeRows} />
      </div>
      <Work />
      <ExperienceTimeline />
      <SkillsMatrix />
      <Courses />
      <TextLoop phrase="Open to roles ✦ Microsoft 365 ✦ Intune ✦ Entra ID ✦ Abu Dhabi ✦ " />
      <Contact />
    </>
  );
}
