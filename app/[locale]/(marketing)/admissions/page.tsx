import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AdmissionForm } from "@/components/forms/admission-form";

type Step = { title: string; description: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AdmissionsPage() {
  const t = await getTranslations("admissions");
  const th = await getTranslations("home.admissions");
  const stepsRaw = th.raw("steps") as Step[];
  const steps = stepsRaw.map((s, i) => ({ step: i + 1, ...s }));

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <Section>
        <ScrollReveal>
          <SectionHeader eyebrow={t("process.eyebrow")} title={t("process.title")} description={t("process.description")} />
        </ScrollReveal>
        <ScrollReveal>
          <Timeline items={steps} />
        </ScrollReveal>
      </Section>
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t("form.eyebrow")}
              title={t("form.title")}
              description={t("form.description")}
              align="left"
              className="mb-0"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <AdmissionForm />
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
