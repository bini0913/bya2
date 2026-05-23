import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { ResultsSection } from "@/components/sections/results";
import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "results.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ResultsPage() {
  const t = await getTranslations("results");
  const universities = t.raw("placements.universities") as string[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <ResultsSection />
      <Section>
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("placements.eyebrow")}
            title={t("placements.title")}
            description={t("placements.description")}
          />
        </ScrollReveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {universities.map((uni) => (
            <li
              key={uni}
              className="rounded-lg border border-navy-900/8 bg-white px-4 py-3 text-center text-sm font-medium text-navy-900"
            >
              {uni}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
