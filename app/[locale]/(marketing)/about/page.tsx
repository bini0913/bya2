import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { STATS } from "@/lib/constants";
import { LeadershipMessageSection } from "@/components/sections/leadership-message";

const STAT_KEYS = ["placement", "students", "educators", "years"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const ts = await getTranslations("home.stats");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <LeadershipMessageSection />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t("story.eyebrow")}
              title={t("story.title")}
              description={t("story.description")}
              align="left"
              className="mb-0"
            />
            <p className="mt-6 text-muted leading-relaxed">{t("story.body")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((s, i) => (
                <StatCounter key={STAT_KEYS[i]} value={s.value} suffix={s.suffix} label={ts(STAT_KEYS[i])} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>
      <Section dark className="cinematic-gradient">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("mission.eyebrow")}
            title={t("mission.title")}
            description={t("mission.description")}
            light
          />
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {(
            [
              { title: t("mission.missionTitle"), text: t("mission.mission") },
              { title: t("mission.visionTitle"), text: t("mission.vision") },
              { title: t("mission.valuesTitle"), text: t("mission.values") },
            ] as const
          ).map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="rounded-lg border border-white/10 bg-white/5 p-8">
                <h3 className="font-display text-xl font-semibold text-gold-400">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{card.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
