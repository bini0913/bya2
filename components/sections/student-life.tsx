import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Parallax } from "@/components/motion/parallax";
import { Link } from "@/i18n/navigation";

type Highlight = { title: string; desc: string };

export async function StudentLifeSection() {
  const t = await getTranslations("home.studentLife");
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="left"
            className="mb-0"
          />
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="border-l-2 border-gold-500 pl-4 transition-colors hover:border-gold-400"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
          <Button className="mt-8" variant="default" asChild>
            <Link href="/student-life">{t("discover")}</Link>
          </Button>
        </ScrollReveal>

        <Parallax offset={40}>
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-navy-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div>
                  <p className="font-display text-6xl font-bold text-gold-400/30">BYA</p>
                  <p className="mt-4 text-sm uppercase tracking-widest text-white/50">
                    {t("galleryLabel")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Parallax>
      </div>
    </Section>
  );
}
