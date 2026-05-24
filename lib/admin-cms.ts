export type ActivityItem = { id: string; action: string; by: string; at: string; module: string };

export type NewsPost = {
  id: string;
  title: string;
  status: "draft" | "published";
  featured: boolean;
  coverUrl?: string;
  publishedAt?: string;
};

export type MediaAsset = {
  id: string;
  label: string;
  group: "homepage" | "leadership" | "gallery" | "hero" | "achievements";
  url: string;
};

export type Leader = { id: string; name: string; role: string; message: string; photoUrl?: string };

export type SocialLink = { platform: string; url: string };

export type SiteContentBlock = { key: string; label: string; value: string };

export type AdminRole = "Super Admin" | "Admissions Officer" | "Content Editor" | "News Manager";

export const demoNews: NewsPost[] = [
  { id: "n1", title: "BYA wins national innovation award", status: "published", featured: true, publishedAt: "2026-05-12" },
  { id: "n2", title: "New STEM wing inauguration", status: "draft", featured: false },
];

export const demoMedia: MediaAsset[] = [
  { id: "m1", label: "Homepage cinematic", group: "homepage", url: "/hero/bya-hero-cinematic.jpg" },
  { id: "m2", label: "General Manager portrait", group: "leadership", url: "/hero/bya-hero-cinematic.jpg" },
  { id: "m3", label: "Top hero background", group: "hero", url: "/hero/bya-hero-cinematic.jpg" },
];

export const demoLeadership: Leader[] = [
  { id: "l1", name: "Dr. Hana Yusuf", role: "General Manager", message: "Excellence with character.", photoUrl: "/hero/bya-hero-cinematic.jpg" },
  { id: "l2", name: "Samuel Tadesse", role: "Academic Dean", message: "Rigor, care, and curiosity." },
];

export const demoSocialLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://instagram.com" },
  { platform: "Facebook", url: "https://facebook.com" },
  { platform: "Telegram", url: "https://t.me" },
  { platform: "TikTok", url: "https://tiktok.com" },
  { platform: "LinkedIn", url: "https://linkedin.com" },
  { platform: "YouTube", url: "https://youtube.com" },
];

export const demoSiteContent: SiteContentBlock[] = [
  { key: "mission", label: "Mission", value: "Shape ethical, globally competent learners." },
  { key: "vision", label: "Vision", value: "Become East Africa's benchmark K-12 academy." },
  { key: "about", label: "About Text", value: "Boriyad Youth Academy blends tradition with future-ready learning." },
];

export const demoActivities: ActivityItem[] = [
  { id: "a1", action: "Approved application #BYA-2026-1042", by: "Admissions Officer", at: "2026-05-23 11:24", module: "Admissions" },
  { id: "a2", action: "Published news: BYA wins national innovation award", by: "News Manager", at: "2026-05-22 16:09", module: "News" },
  { id: "a3", action: "Updated homepage hero background", by: "Content Editor", at: "2026-05-22 09:31", module: "Media" },
];
