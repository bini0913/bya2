import { HeroSection } from "@/components/sections/hero";
import { WhyBoriyadSection } from "@/components/sections/why-boriyad";
import { ProgramsSection } from "@/components/sections/programs";
import { StudentLifeSection } from "@/components/sections/student-life";
import { ResultsSection } from "@/components/sections/results";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { NewsSection } from "@/components/sections/news";
import { AdmissionsProcessSection } from "@/components/sections/admissions-process";
import { FinalCTASection } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyBoriyadSection />
      <ProgramsSection />
      <StudentLifeSection />
      <ResultsSection />
      <TestimonialsSection />
      <NewsSection />
      <AdmissionsProcessSection />
      <FinalCTASection />
    </>
  );
}
