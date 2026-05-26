import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function AboutPreviewSection() {
  return (
    <Section>
      <ScrollReveal>
        <SectionHeader
          eyebrow="ABOUT BORIYAD"
          title="More Than A School, A Family"
          description="Boriyad Youth Academy nurtures character, talent, and intellect from Kindergarten to Grade 12. We partner with families to develop confident, compassionate, and future-ready leaders."
        />
      </ScrollReveal>
      <ScrollReveal className="mt-8 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-600 transition-colors hover:text-gold-500"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </ScrollReveal>
    </Section>
  );
}
