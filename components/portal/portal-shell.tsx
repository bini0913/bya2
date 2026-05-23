import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Link } from "@/i18n/navigation";
import type { PortalModule } from "@/types";

export async function PortalShell({
  title,
  role,
  description,
  modules,
}: {
  title: string;
  role: string;
  description: string;
  modules: PortalModule[];
}) {
  const t = await getTranslations("common");
  const tp = await getTranslations("portal");

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
            <span className="font-display text-lg font-semibold text-navy-900">{t("shortName")}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="[&_select]:border-navy-900/20 [&_select]:bg-white [&_select]:text-navy-900 [&_svg]:text-navy-600" />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> {t("backToSite")}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {role}
          </Badge>
          <h1 className="font-display text-3xl font-semibold text-navy-900 md:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-muted">{description}</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-navy-800">
            <Construction className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            <span>{tp("scaffoldNotice")}</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Card
              key={mod.id}
              className={mod.status === "coming_soon" ? "opacity-75" : "hover:shadow-lg transition-shadow"}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  {mod.status === "coming_soon" && (
                    <Badge variant="default" className="shrink-0 text-[10px]">
                      {t("comingSoon")}
                    </Badge>
                  )}
                </div>
                <CardDescription>{mod.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant={mod.status === "active" ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  disabled={mod.status === "coming_soon"}
                  asChild={mod.status === "active"}
                >
                  {mod.status === "active" ? (
                    <Link href={mod.href}>{t("open")}</Link>
                  ) : (
                    <span>{t("comingSoon")}</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
