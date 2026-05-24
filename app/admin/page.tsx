import { getApplicationsServer, type ApplicationRecord } from "@/services/applications.service";
import { demoActivities, demoNews } from "@/lib/admin-cms";
import { FileText, CheckCircle2, Newspaper, UsersRound } from "lucide-react";

export default async function AdminDashboardPage() {
  let applications: ApplicationRecord[] = [];
  try {
    applications = await getApplicationsServer();
  } catch {
    applications = [];
  }

  const pending = applications.filter((a) => a.status === "pending").length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const publishedNews = demoNews.filter((n) => n.status === "published").length;

  const stats = [
    { label: "Pending admissions", value: pending, icon: FileText },
    { label: "Approved applications", value: approved, icon: CheckCircle2 },
    { label: "Published news", value: publishedNews, icon: Newspaper },
    { label: "Visitors", value: "12.4k", icon: UsersRound },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-semibold text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-white/10 bg-[#0b1d36] p-6">
              <Icon className="h-5 w-5 text-gold-500" />
              <p className="mt-4 font-display text-3xl text-white">{s.value}</p>
              <p className="mt-1 text-sm text-white/65">{s.label}</p>
            </div>
          );
        })}
      </div>
      <section className="rounded-xl border border-white/10 bg-[#0b1d36] p-6">
        <h2 className="font-display text-xl text-white">Recent activity</h2>
        <div className="mt-4 space-y-3">
          {demoActivities.map((activity) => (
            <div key={activity.id} className="rounded-md border border-white/10 bg-[#0f2a4b] p-3 text-sm">
              <p className="text-white">{activity.action}</p>
              <p className="mt-1 text-white/60">{activity.module} · {activity.by} · {activity.at}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
