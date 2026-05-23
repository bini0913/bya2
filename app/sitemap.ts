import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { routing } from "@/i18n/routing";

const routes = [
  "",
  "/about",
  "/academics",
  "/admissions",
  "/student-life",
  "/gallery",
  "/results",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of routes) {
      const path = `/${locale}${route}`;
      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "" || route === "/news" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${base}/${loc}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
