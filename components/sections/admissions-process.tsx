import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Link } from "@/i18n/navigation";

type Step = { title: string; description: string };

export async function AdmissionsProcessSection() {
  const t = await getTranslations("home.admissions");
  const stepsRaw = t.raw("steps") as Step[];
  const steps = stepsRaw.map((s, i) => ({ step: i + 1, ...s }));

  return (
    <Section className="bg-white">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </ScrollReveal>
      <ScrollReveal>
        <Timeline items={steps} />
      </ScrollReveal>
      <ScrollReveal className="mt-12 text-center">
        <Button variant="gold" size="lg" asChild>
          <Link href="/admissions/apply">{t("beginApplication")}</Link>
        </Button>
      </ScrollReveal>
    </Section>
  );
}
