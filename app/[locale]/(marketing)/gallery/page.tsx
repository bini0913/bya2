import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const items = t.raw("items") as string[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((title, i) => (
            <ScrollReveal key={title} delay={(i % 3) * 0.05}>
              <figure className="group overflow-hidden rounded-lg">
                <div className="aspect-[4/3] bg-gradient-to-br from-navy-800 to-navy-950 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex h-full items-end p-4">
                    <figcaption className="text-sm font-medium text-white/90">{title}</figcaption>
                  </div>
                </div>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
