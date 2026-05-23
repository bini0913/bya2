import Link from "next/link";
import { getApplicationsServer, type ApplicationRecord } from "@/services/applications.service";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  let applications: ApplicationRecord[] = [];
  try {
    applications = await getApplicationsServer();
  } catch {
    applications = [];
  }

  const pending = applications.filter((a) => a.status === "pending").length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  const stats = [
    { label: "Total Applications", value: applications.length, icon: FileText },
    { label: "Pending Review", value: pending, icon: Clock },
    { label: "Approved", value: approved, icon: CheckCircle },
    { label: "Rejected", value: rejected, icon: XCircle },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-semibold text-[#0B1F3A]">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-lg border border-[#0B1F3A]/10 bg-white p-6 shadow-sm"
            >
              <Icon className="h-5 w-5 text-[#C9A86A]" />
              <p className="mt-4 font-display text-3xl font-semibold text-[#0B1F3A]">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <Link
          href="/admin/applications"
          className="text-sm font-medium text-[#C9A86A] hover:underline"
        >
          View all applications →
        </Link>
      </div>
    </div>
  );
}
