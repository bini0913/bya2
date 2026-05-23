"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApplicationRecord } from "@/services/applications.service";
import type { ApplicationStatus } from "@/lib/validations/application";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ApplicationActions({ application }: { application: ApplicationRecord }) {
  const router = useRouter();
  const [notes, setNotes] = useState(application.admin_notes ?? "");
  const [loading, setLoading] = useState(false);

  const patch = async (status?: ApplicationStatus) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          admin_notes: notes,
          email: application.email,
          parentName: application.parent_name,
          studentName: application.student_name,
          referenceId: application.reference_id,
        }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this application permanently?")) return;
    setLoading(true);
    await fetch(`/api/admin/applications/${application.id}`, { method: "DELETE" });
    router.push("/admin/applications");
    router.refresh();
  };

  return (
    <div className="space-y-6 rounded-lg border border-[#0B1F3A]/10 bg-white p-6">
      <h3 className="font-display text-lg font-semibold text-[#0B1F3A]">Actions</h3>
      <div className="flex flex-wrap gap-2">
        <Button variant="gold" size="sm" disabled={loading} onClick={() => patch("approved")}>
          Approve
        </Button>
        <Button variant="outline" size="sm" disabled={loading} onClick={() => patch("rejected")}>
          Reject
        </Button>
        <Button variant="outline" size="sm" disabled={loading} onClick={() => patch("contacted")}>
          Mark Contacted
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminNotes">Admin Notes</Label>
        <Textarea
          id="adminNotes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes for admissions team…"
        />
        <Button variant="default" size="sm" disabled={loading} onClick={() => patch()}>
          Save Notes
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-red-600 hover:bg-red-50"
        disabled={loading}
        onClick={remove}
      >
        Delete Application
      </Button>
    </div>
  );
}
