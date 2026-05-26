import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export async function AboutPreviewSection() {
  const t = await getTranslations("home.aboutPreview");
  const tc = await getTranslations("common");

  return (
    <Section>
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </ScrollReveal>
      <ScrollReveal className="mt-8 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-600 transition-colors hover:text-gold-500"
        >
          {tc("readMore")} <ArrowRight className="h-4 w-4" />
        </Link>
      </ScrollReveal>
    </Section>
  );
}
