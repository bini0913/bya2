"use client";

import { useTranslations } from "next-intl";
import { HERO_STATS } from "@/lib/hero-constants";
import { HeroStatItem } from "@/components/hero/hero-stat-item";

export function HeroStatsStrip() {
  const t = useTranslations("home.heroStats");

  return (
    <div id="stats" className="relative overflow-hidden rounded-t-3xl border border-white/15 bg-[#081B33]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap">
        {HERO_STATS.map((stat, index) => (
          <HeroStatItem
            key={stat.id}
            value={stat.value}
            suffix={stat.suffix}
            label={t(`${stat.id}.label`)}
            sublabel={t(`${stat.id}.sub`)}
            icon={stat.icon}
            showDivider={index > 0}
          />
        ))}
      </div>
    </div>
  );
}
