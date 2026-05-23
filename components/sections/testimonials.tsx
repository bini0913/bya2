import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Testimonial = { quote: string; name: string; role: string };

export async function TestimonialsSection() {
  const t = await getTranslations("home.testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <Section className="bg-white">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </ScrollReveal>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <ScrollReveal key={item.name} delay={i * 0.1}>
            <blockquote className="flex h-full flex-col rounded-lg border border-navy-900/8 bg-cream p-8">
              <p className="flex-1 font-display text-lg italic leading-relaxed text-navy-900">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-navy-900/10 pt-4">
                <cite className="not-italic">
                  <p className="font-semibold text-navy-900">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </cite>
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
