import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplicationServer } from "@/services/applications.service";
import { ApplicationDetail } from "@/components/admin/application-detail";
import { ArrowLeft } from "lucide-react";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationServer(id);
  if (!application) notFound();

  return (
    <div>
      <Link
        href="/admin/applications"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to applications
      </Link>
      <h1 className="mb-8 font-display text-2xl font-semibold text-[#0B1F3A]">
        {application.student_name}
      </h1>
      <ApplicationDetail application={application} />
    </div>
  );
}
