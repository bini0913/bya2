import { type AdminRole } from "@/lib/admin-cms";

const roles: AdminRole[] = ["Super Admin", "Admissions Officer", "Content Editor", "News Manager"];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-white">Roles & Permissions</h1>
      <div className="rounded-xl border border-white/10 bg-[#0b1d36] p-5">
        <div className="grid gap-3 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role} className="rounded-md border border-white/10 bg-[#0f2a4b] p-4 text-white">{role}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
