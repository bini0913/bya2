import { getTranslations } from "next-intl/server";
import type { PortalModule } from "@/types";

export async function getStudentModules(): Promise<PortalModule[]> {
  const t = await getTranslations("portal.modules");
  return [
    { id: "results", title: t("results.title"), description: t("results.description"), href: "/portal/student/results", icon: "file", status: "coming_soon" },
    { id: "assignments", title: t("assignments.title"), description: t("assignments.description"), href: "/portal/student/assignments", icon: "book", status: "coming_soon" },
    { id: "schedule", title: t("schedule.title"), description: t("schedule.description"), href: "/portal/student/schedule", icon: "calendar", status: "coming_soon" },
    { id: "announcements", title: t("announcements.title"), description: t("announcements.description"), href: "/portal/student/announcements", icon: "bell", status: "coming_soon" },
  ];
}

export async function getParentModules(): Promise<PortalModule[]> {
  const t = await getTranslations("portal.modules");
  return [
    { id: "grades", title: t("grades.title"), description: t("grades.description"), href: "/portal/parent/grades", icon: "chart", status: "coming_soon" },
    { id: "attendance", title: t("attendance.title"), description: t("attendance.description"), href: "/portal/parent/attendance", icon: "check", status: "coming_soon" },
    { id: "payments", title: t("payments.title"), description: t("payments.description"), href: "/portal/parent/payments", icon: "credit", status: "coming_soon" },
    { id: "notifications", title: t("notifications.title"), description: t("notifications.description"), href: "/portal/parent/notifications", icon: "bell", status: "coming_soon" },
  ];
}

export async function getTeacherModules(): Promise<PortalModule[]> {
  const t = await getTranslations("portal.modules");
  return [
    { id: "marks", title: t("marks.title"), description: t("marks.description"), href: "/dashboard/teacher/marks", icon: "edit", status: "coming_soon" },
    { id: "assignments", title: t("assignments.title"), description: t("assignments.description"), href: "/dashboard/teacher/assignments", icon: "book", status: "coming_soon" },
    { id: "attendance", title: t("attendance.title"), description: t("attendance.description"), href: "/dashboard/teacher/attendance", icon: "check", status: "coming_soon" },
  ];
}

export async function getAdminModules(): Promise<PortalModule[]> {
  const t = await getTranslations("portal.modules");
  return [
    { id: "students", title: t("students.title"), description: t("students.description"), href: "/dashboard/admin/students", icon: "users", status: "coming_soon" },
    { id: "grades", title: t("grades.title"), description: t("grades.description"), href: "/dashboard/admin/grades", icon: "chart", status: "coming_soon" },
    { id: "attendance", title: t("attendance.title"), description: t("attendance.description"), href: "/dashboard/admin/attendance", icon: "check", status: "coming_soon" },
    { id: "finance", title: t("finance.title"), description: t("finance.description"), href: "/dashboard/admin/finance", icon: "credit", status: "coming_soon" },
    { id: "announcements", title: t("announcements.title"), description: t("announcements.description"), href: "/dashboard/admin/announcements", icon: "bell", status: "coming_soon" },
    { id: "events", title: t("events.title"), description: t("events.description"), href: "/dashboard/admin/events", icon: "calendar", status: "coming_soon" },
    { id: "assignments", title: t("assignments.title"), description: t("assignments.description"), href: "/dashboard/admin/assignments", icon: "book", status: "coming_soon" },
    { id: "results", title: t("results.title"), description: t("results.description"), href: "/dashboard/admin/results", icon: "trophy", status: "coming_soon" },
    { id: "messaging", title: t("messaging.title"), description: t("messaging.description"), href: "/dashboard/admin/messaging", icon: "message", status: "coming_soon" },
  ];
}
