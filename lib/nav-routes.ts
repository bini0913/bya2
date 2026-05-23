export const NAV_ROUTES = [
  { href: "/about", key: "about" },
  { href: "/academics", key: "academics" },
  { href: "/admissions", key: "admissions" },
  { href: "/student-life", key: "studentLife" },
  { href: "/results", key: "results" },
  { href: "/gallery", key: "gallery" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export const PORTAL_ROUTES = [
  { href: "/portal/student", key: "studentPortal", role: "student" },
  { href: "/portal/parent", key: "parentPortal", role: "parent" },
  { href: "/dashboard/teacher", key: "teacher", role: "teacher" },
  { href: "/dashboard/admin", key: "admin", role: "admin" },
] as const;
