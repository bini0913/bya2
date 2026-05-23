import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Activity = { title: string; desc: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studentLife.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function StudentLifePage() {
  const t = await getTranslations("studentLife");
  const activities = t.raw("activities.items") as Activity[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <Section>
        <ScrollReveal>
          <SectionHeader eyebrow={t("activities.eyebrow")} title={t("activities.title")} />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.06}>
              <div className="h-full rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
