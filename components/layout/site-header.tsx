"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Link } from "@/i18n/navigation";
import { NAV_ROUTES } from "@/lib/nav-routes";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/ui-store";

const HOME_ROUTE = { href: "/", key: "home" as const };

export function SiteHeader() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUIStore();

  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    cn(
      "relative text-sm font-medium transition-colors",
      active ? "text-[#C9A86A]" : "text-white/85 hover:text-[#C9A86A]"
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#081B33]/88 py-3 shadow-lg backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent py-4 md:py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A] sm:gap-3"
          aria-label={`${t("siteName")} home`}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={52}
            height={52}
            className="h-11 w-11 rounded-full object-contain sm:h-12 sm:w-12"
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white md:text-xs">
              {t("siteName")}
            </p>
            <p className="truncate text-[9px] font-medium uppercase tracking-[0.2em] text-[#C9A86A] md:text-[10px]">
              {t("tagline")}
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
          aria-label="Main navigation"
        >
          <Link href={HOME_ROUTE.href} className={navLinkClass(isHome)}>
            {t(`nav.${HOME_ROUTE.key}`)}
            {isHome && (
              <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-full max-w-[24px] bg-[#C9A86A]" />
            )}
          </Link>
          {NAV_ROUTES.map((link) => {
            const active = pathname === link.href || pathname.endsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={navLinkClass(active)}>
                {t(`nav.${link.key}`)}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-full max-w-[24px] bg-[#C9A86A]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/admissions/apply"
            className="group inline-flex items-center gap-2 rounded-sm border border-[#C9A86A] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#C9A86A]/10 hover:shadow-[0_0_20px_rgba(201,168,106,0.3)]"
          >
            {t("applyNow")}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A86A] transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5 text-[#C9A86A]" />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-sm p-2 text-white focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#081B33]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
              <Link
                href={HOME_ROUTE.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-sm px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              >
                {t(`nav.${HOME_ROUTE.key}`)}
              </Link>
              {NAV_ROUTES.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-sm px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-[#C9A86A]"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
              <div className="mt-4 border-t border-white/10 pt-4">
                <Link
                  href="/admissions/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#C9A86A] bg-[#C9A86A] px-4 py-3 text-sm font-semibold text-[#081B33]"
                >
                  {t("applyNow")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
