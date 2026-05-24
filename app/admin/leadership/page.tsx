import { demoLeadership } from "@/lib/admin-cms";

export default function LeadershipPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-white">Leadership Manager</h1>
      <div className="space-y-3 rounded-xl border border-white/10 bg-[#0b1d36] p-5">
        {demoLeadership.map((member) => (
          <div key={member.id} className="rounded-md border border-white/10 bg-[#0f2a4b] p-4">
            <p className="font-medium text-white">{member.name} · {member.role}</p>
            <p className="mt-1 text-sm text-white/70">{member.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
