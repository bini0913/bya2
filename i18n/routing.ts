import { defineRouting } from "next-intl/routing";

export const locales = ["en", "om", "am"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  /** Always show locale in URL: /en, /om, /am — fixes language switching locally */
  localePrefix: "always",
  localeDetection: false,
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  om: "Afaan Oromoo",
  am: "አማርኛ",
};
