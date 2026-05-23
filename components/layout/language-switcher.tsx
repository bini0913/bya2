"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label="Language"
    >
      <Globe className="h-4 w-4 shrink-0 text-white/60" aria-hidden />
      {locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "rounded-sm px-2 py-1 text-xs font-medium transition-colors",
            locale === loc
              ? "bg-gold-500 text-navy-950"
              : "text-white/80 hover:bg-white/10 hover:text-gold-400"
          )}
          aria-current={locale === loc ? "page" : undefined}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
      <span className="sr-only">
        {locales.map((loc) => localeNames[loc]).join(", ")}
      </span>
    </nav>
  );
}
