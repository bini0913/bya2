import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Link } from "@/i18n/navigation";

type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export async function NewsSection() {
  const t = await getTranslations("home.news");
  const tc = await getTranslations("common");
  const items = t.raw("items") as NewsItem[];

  return (
    <Section>
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </ScrollReveal>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <ScrollReveal key={item.slug} delay={i * 0.08}>
            <article className="group flex h-full flex-col">
              <div className="mb-4 aspect-[16/10] rounded-lg bg-navy-900/5 transition-colors group-hover:bg-navy-900/10" />
              <Badge variant="gold" className="mb-3 w-fit">
                {item.category}
              </Badge>
              <time className="text-xs text-muted" dateTime={item.date}>
                {new Date(item.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                <Link href={`/news#${item.slug}`}>{item.title}</Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{item.excerpt}</p>
              <Link
                href={`/news#${item.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-500"
              >
                {tc("readMore")} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/news">{tc("allNews")}</Link>
        </Button>
      </ScrollReveal>
    </Section>
  );
}
