import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_ROUTES } from "@/lib/nav-routes";
import { SITE } from "@/lib/constants";

export async function SiteFooter() {
  const t = await getTranslations("common");
  const tf = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
              <div>
                <p className="font-display text-lg font-semibold">{t("shortName")}</p>
                <p className="text-xs text-white/50">{t("gradeRange")}</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{tf("tagline")}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">{tf("explore")}</h3>
            <ul className="mt-4 space-y-2">
              {NAV_ROUTES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-400"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">{tf("admissions")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/admissions"
                  className="text-sm text-white/70 transition-colors hover:text-gold-400"
                >
                  {t("nav.admissions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions/apply"
                  className="text-sm text-white/70 transition-colors hover:text-gold-400"
                >
                  {t("applyNow")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">{tf("contact")}</h3>
            <address className="mt-4 space-y-2 not-italic text-sm text-white/70">
              <p>{SITE.address}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-400">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            © {year} {t("siteName")}. {t("copyright")}
          </p>
          <p className="text-xs text-white/40 text-center md:text-right">
            {tf("oromoName")} · {tf("amharicName")}
          </p>
        </div>
      </div>
    </footer>
  );
}
