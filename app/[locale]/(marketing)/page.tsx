import { HeroSection } from "@/components/sections/hero";
import { AboutPreviewSection } from "@/components/sections/about-preview";
import { ProgramsSection } from "@/components/sections/programs";
import { ResultsSection } from "@/components/sections/results";
import { LeadershipMessageSection } from "@/components/sections/leadership-message";
import { StudentLifeSection } from "@/components/sections/student-life";
import { NewsSection } from "@/components/sections/news";
import { FinalCTASection } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <ProgramsSection />
      <ResultsSection />
      <LeadershipMessageSection />
      <StudentLifeSection />
      <NewsSection />
      <FinalCTASection />
    </>
  );
}
