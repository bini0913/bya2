import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type NewsItem = { slug: string; title: string; excerpt: string; date: string; category: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function NewsPage() {
  const t = await getTranslations("news");
  const th = await getTranslations("home.news");
  const items = th.raw("items") as NewsItem[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} />
      <Section>
        <div className="space-y-12">
          {items.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 0.05}>
              <article id={item.slug} className="scroll-mt-32 border-b border-navy-900/10 pb-12 last:border-0">
                <Badge variant="gold" className="mb-3">{item.category}</Badge>
                <time className="text-sm text-muted" dateTime={item.date}>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-3xl text-muted leading-relaxed">{item.excerpt}</p>
                <p className="mt-4 max-w-3xl text-sm text-muted">{t("cmsNote")}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
