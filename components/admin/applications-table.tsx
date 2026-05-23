"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ApplicationRecord } from "@/services/applications.service";
import type { ApplicationStatus } from "@/lib/validations/application";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  contacted: "bg-blue-100 text-blue-800",
};

export function ApplicationsTable({ applications }: { applications: ApplicationRecord[] }) {
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return applications;
    return applications.filter((a) => a.status === filter);
  }, [applications, filter]);

  const filters: { key: ApplicationStatus | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "contacted", label: "Contacted" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              filter === f.key
                ? "bg-[#0B1F3A] text-white"
                : "bg-white text-[#0B1F3A]/70 hover:bg-[#0B1F3A]/5"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-[#0B1F3A]/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#0B1F3A]/10 bg-[#F8F7F4] text-xs uppercase tracking-wider text-[#0B1F3A]/60">
            <tr>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Grade</th>
              <th className="px-4 py-3 font-medium">Parent</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B1F3A]/8">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted">
                  No applications found.
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app.id} className="hover:bg-[#F8F7F4]/80">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="font-mono text-xs font-medium text-[#0B1F3A] hover:text-gold-600"
                    >
                      {app.reference_id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0B1F3A]">{app.student_name}</td>
                  <td className="px-4 py-3 text-muted">{app.grade}</td>
                  <td className="px-4 py-3 text-muted">{app.parent_name}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        STATUS_STYLES[app.status]
                      )}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
