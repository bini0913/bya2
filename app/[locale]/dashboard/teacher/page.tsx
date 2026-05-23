import { getTranslations } from "next-intl/server";
import { PortalShell } from "@/components/portal/portal-shell";
import { getTeacherModules } from "@/lib/portal-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portal.teacher" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function TeacherDashboardPage() {
  const t = await getTranslations("portal.teacher");
  const modules = await getTeacherModules();

  return (
    <PortalShell
      title={t("title")}
      role={t("role")}
      description={t("description")}
      modules={modules}
    />
  );
}
