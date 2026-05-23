import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.success" });
  return { title: t("metaTitle") };
}

export default async function ApplySuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ref } = await searchParams;
  const t = await getTranslations("admissions.success");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-ivory px-4 py-24 cinematic-gradient">
      <div className="mx-auto max-w-lg rounded-lg border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
        <CheckCircle className="mx-auto h-16 w-16 text-gold-500" />
        <h1 className="mt-6 font-display text-3xl font-semibold text-white">{t("title")}</h1>
        <p className="mt-4 text-white/70">{t("message")}</p>
        {ref && (
          <p className="mt-6 rounded-sm border border-gold-500/30 bg-gold-500/10 px-4 py-3 font-mono text-lg text-gold-400">
            {ref}
          </p>
        )}
        <Button variant="gold" className="mt-8" asChild>
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </div>
    </section>
  );
}
