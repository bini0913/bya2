import {
  GraduationCap,
  HeartHandshake,
  Globe,
  Trophy,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const ITEMS = [
  { key: "faculty", icon: GraduationCap },
  { key: "holistic", icon: HeartHandshake },
  { key: "global", icon: Globe },
  { key: "outcomes", icon: Trophy },
] as const;

export async function WhyBoriyadSection() {
  const t = await getTranslations("home.why");

  return (
    <Section>
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </ScrollReveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.key} delay={i * 0.1}>
              <Card className="group h-full border-0 bg-white shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900/5 text-gold-600 transition-colors group-hover:bg-gold-500/10">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <CardTitle>{t(`${item.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{t(`${item.key}.description`)}</CardDescription>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
