import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function FinalCTASection() {
  const t = await getTranslations("home.cta");
  const tc = await getTranslations("common");

  return (
    <section className="relative overflow-hidden py-24 md:py-32 cinematic-gradient">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">{t("description")}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gold" size="lg" asChild>
              <Link href="/admissions/apply">{tc("startAdmission")}</Link>
            </Button>
            <Button variant="luxury" size="lg" asChild>
              <Link href="/contact">{t("scheduleVisit")}</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
