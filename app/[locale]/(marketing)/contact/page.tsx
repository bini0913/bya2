import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE } from "@/lib/constants";
import { Mail, MapPin, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeader eyebrow={t("getInTouch")} title={t("visit")} align="left" className="mb-8" />
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <div>
                  <p className="font-medium text-navy-900">{t("address")}</p>
                  <p className="text-sm text-muted">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <div>
                  <p className="font-medium text-navy-900">{t("phone")}</p>
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-sm text-muted hover:text-gold-600">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <div>
                  <p className="font-medium text-navy-900">{t("email")}</p>
                  <a href={`mailto:${SITE.email}`} className="text-sm text-muted hover:text-gold-600">
                    {SITE.email}
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex aspect-video items-center justify-center rounded-lg bg-navy-900/5 text-sm text-muted">
              {t("mapPlaceholder")}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
