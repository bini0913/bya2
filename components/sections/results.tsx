"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Link } from "@/i18n/navigation";

const CHART_DATA = [
  { year: "2021", score: 92 },
  { year: "2022", score: 94 },
  { year: "2023", score: 96 },
  { year: "2024", score: 98 },
  { year: "2025", score: 98 },
];

const METRIC_KEYS = ["passRate", "igcse", "placements"] as const;
const METRIC_VALUES = ["100%", "78%", "45+"];

export function ResultsSection() {
  const t = useTranslations("home.results");

  return (
    <Section dark className="bg-navy-950">
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          light
        />
      </ScrollReveal>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <ScrollReveal>
          <div className="h-72 min-h-[288px] w-full min-w-0 rounded-lg border border-white/10 bg-white/5 p-4 md:h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0a1628",
                    border: "1px solid rgba(201,162,39,0.3)",
                    borderRadius: "4px",
                  }}
                  labelStyle={{ color: "#d4af37" }}
                />
                <Bar dataKey="score" fill="#c9a227" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="space-y-6">
            {METRIC_KEYS.map((key, i) => (
              <div
                key={key}
                className="flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className="text-white/70">{t(key)}</span>
                <span className="font-display text-2xl font-semibold text-gold-400">
                  {METRIC_VALUES[i]}
                </span>
              </div>
            ))}
            <Button variant="gold" className="mt-4" asChild>
              <Link href="/results">{t("fullResults")}</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
