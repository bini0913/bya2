import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type ProgramItem = { title: string; description: string; grades: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "academics.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AcademicsPage() {
  const t = await getTranslations("academics");
  const tp = await getTranslations("home.programs");
  const programItems = tp.raw("items") as ProgramItem[];
  const enrichment = t.raw("enrichment.items") as string[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <Section>
        <ScrollReveal>
          <SectionHeader eyebrow={t("programs.eyebrow")} title={t("programs.title")} description={t("programs.description")} />
        </ScrollReveal>
        <div className="space-y-8">
          {programItems.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.05}>
              <article className="rounded-lg border border-navy-900/8 bg-white p-8 shadow-sm">
                <Badge variant="gold" className="mb-3">{p.grades}</Badge>
                <h2 className="font-display text-2xl font-semibold text-navy-900">{p.title}</h2>
                <p className="mt-2 max-w-2xl text-muted">{p.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>
      <Section className="bg-white">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("enrichment.eyebrow")}
            title={t("enrichment.title")}
            description={t("enrichment.description")}
          />
        </ScrollReveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrichment.map((item) => (
            <li key={item} className="rounded-lg border border-navy-900/8 px-5 py-4 text-sm font-medium text-navy-900">
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
