import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Link } from "@/i18n/navigation";

type ProgramItem = {
  title: string;
  description: string;
  grades: string;
};

export async function ProgramsSection() {
  const t = await getTranslations("home.programs");
  const items = t.raw("items") as ProgramItem[];

  return (
    <Section dark className="cinematic-gradient">
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          light
        />
      </ScrollReveal>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((program, i) => (
          <ScrollReveal key={program.title} delay={i * 0.08}>
            <article className="group rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/30 hover:bg-white/10">
              <Badge variant="luxury" className="mb-4">
                {program.grades}
              </Badge>
              <h3 className="font-display text-2xl font-semibold text-white">{program.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{program.description}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="mt-12 text-center">
        <Button variant="gold" asChild>
          <Link href="/academics">
            {t("viewCurriculum")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </ScrollReveal>
    </Section>
  );
}
