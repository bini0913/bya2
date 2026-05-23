import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { StatCounter } from "@/components/ui/stat-counter";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { STATS } from "@/lib/constants";

const STAT_KEYS = ["placement", "students", "educators", "years"] as const;

export async function StatsSection() {
  const t = await getTranslations("home.stats");

  return (
    <Section id="stats" className="bg-white py-16 md:py-20">
      <ScrollReveal>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <StatCounter
              key={STAT_KEYS[i]}
              value={stat.value}
              suffix={stat.suffix}
              label={t(STAT_KEYS[i])}
            />
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
