import { getApplicationsServer, type ApplicationRecord } from "@/services/applications.service";
import { ApplicationsTable } from "@/components/admin/applications-table";

export default async function AdminApplicationsPage() {
  let applications: ApplicationRecord[] = [];
  try {
    applications = await getApplicationsServer();
  } catch {
    applications = [];
  }

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#0B1F3A]">Applications</h1>
          <p className="mt-1 text-sm text-muted">
            {applications.length} total application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <ApplicationsTable applications={applications} />
    </>
  );
}
