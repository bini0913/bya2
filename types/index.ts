export type UserRole = "student" | "parent" | "teacher" | "admin";

export type NavLink = {
  href: string;
  label: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string;
};

export type PortalModule = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  status: "active" | "coming_soon";
};

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};
