import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter, Noto_Sans_Ethiopic } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = getSiteUrl();

  return {
    title: `${t("title")} — ${t("tagline")}`,
    description: t("description"),
    metadataBase: new URL(baseUrl),
    openGraph: {
      locale: locale === "am" ? "am_ET" : locale === "om" ? "om_ET" : "en_ET",
      siteName: t("title"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });
  const jsonLd = organizationJsonLd(locale);

  const fontClass =
    locale === "am"
      ? `${notoEthiopic.variable} ${inter.variable} font-ethiopic`
      : `${cormorant.variable} ${inter.variable}`;

  return (
    <html lang={locale} dir="ltr" className={fontClass}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-950"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
