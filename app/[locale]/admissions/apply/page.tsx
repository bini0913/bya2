import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdmissionWizard } from "@/components/admissions/admission-wizard";
import { PageHero } from "@/components/layout/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.apply" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admissions.apply");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <section className="bg-ivory py-16 md:py-24">
        <AdmissionWizard />
      </section>
    </>
  );
}
