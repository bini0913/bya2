import type { Metadata } from "next";
import { SITE } from "./constants";
import { getSiteUrl } from "./site-url";

type PageSEO = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = SITE.description,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
}: PageSEO = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: path || "/" },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: pageTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd(locale = "en") {
  const names: Record<string, string> = {
    en: SITE.name,
    om: "Mana Barumsaa Booriyaadi Yuuz Akkaadaamii",
    am: "ቦርያድ ዩዝ አካዳሚ",
  };

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: names[locale] ?? SITE.name,
    inLanguage: locale,
    alternateName: SITE.shortName,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/logo.png`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [],
  };
}
