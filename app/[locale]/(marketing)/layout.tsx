import { setRequestLocale } from "next-intl/server";
import { MarketingShell } from "@/components/layout/marketing-shell";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MarketingShell>{children}</MarketingShell>;
}
