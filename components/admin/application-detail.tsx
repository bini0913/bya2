import type { ApplicationRecord } from "@/services/applications.service";
import { ApplicationActions } from "@/components/admin/application-actions";
import { createClient } from "@/supabase/server";
import { isSupabaseConfigured } from "@/supabase/client";

async function signedUrl(path: string): Promise<string | null> {
  if (!isSupabaseConfigured() || path.startsWith("demo/")) return null;
  const supabase = await createClient();
  const { data } = await supabase.storage.from("applications-documents").createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

function DocLink({ label, path }: { label: string; path?: string }) {
  if (!path) return null;
  return (
    <li className="text-sm">
      <span className="text-muted">{label}: </span>
      <span className="font-mono text-xs text-[#0B1F3A]">{path}</span>
    </li>
  );
}

export async function ApplicationDetail({ application }: { application: ApplicationRecord }) {
  const docs = application.documents ?? { general: [], report_cards: [], birth_certificate: [] };
  const docPaths = [
    ...docs.general,
    ...docs.report_cards,
    ...docs.birth_certificate,
  ];

  const signed = await Promise.all(
    docPaths.map(async (p) => ({ path: p, url: await signedUrl(p) }))
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-lg border border-[#0B1F3A]/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-[#0B1F3A]">Student</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-muted">Full Name</dt>
              <dd className="font-medium text-[#0B1F3A]">{application.student_name}</dd>
            </div>
            <div>
              <dt className="text-muted">Gender</dt>
              <dd className="capitalize">{application.gender}</dd>
            </div>
            <div>
              <dt className="text-muted">Date of Birth</dt>
              <dd>{application.dob}</dd>
            </div>
            <div>
              <dt className="text-muted">Grade Applying For</dt>
              <dd>{application.grade}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted">Previous School</dt>
              <dd>{application.previous_school || "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-[#0B1F3A]/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-[#0B1F3A]">Parent / Guardian</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="font-medium text-[#0B1F3A]">{application.parent_name}</dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd>{application.phone}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd>{application.email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted">Address</dt>
              <dd>{application.address}</dd>
            </div>
          </dl>
        </section>

        {application.notes && (
          <section className="rounded-lg border border-[#0B1F3A]/10 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-[#0B1F3A]">Family Notes</h2>
            <p className="mt-3 text-sm text-[#0B1F3A]/80 whitespace-pre-wrap">{application.notes}</p>
          </section>
        )}

        <section className="rounded-lg border border-[#0B1F3A]/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-[#0B1F3A]">Documents</h2>
          <ul className="mt-4 space-y-2">
            {docs.general.map((p) => (
              <DocLink key={p} label="Supporting document" path={p} />
            ))}
            {docs.report_cards.map((p) => (
              <DocLink key={p} label="Report card" path={p} />
            ))}
            {docs.birth_certificate.map((p) => (
              <DocLink key={p} label="Birth certificate" path={p} />
            ))}
          </ul>
          {signed.length > 0 && (
            <ul className="mt-4 space-y-2">
              {signed.map(
                (s) =>
                  s.url && (
                    <li key={s.path}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gold-600 hover:underline"
                      >
                        Download: {s.path.split("/").pop()}
                      </a>
                    </li>
                  )
              )}
            </ul>
          )}
          {docPaths.length === 0 && (
            <p className="mt-3 text-sm text-muted">No documents uploaded.</p>
          )}
        </section>
      </div>

      <div>
        <div className="mb-4 rounded-lg border border-[#0B1F3A]/10 bg-white p-4">
          <p className="text-xs uppercase tracking-wider text-muted">Reference</p>
          <p className="font-mono text-lg font-semibold text-[#0B1F3A]">{application.reference_id}</p>
          <p className="mt-2 text-xs text-muted capitalize">Status: {application.status}</p>
          <p className="text-xs text-muted">
            Submitted {new Date(application.created_at).toLocaleString()}
          </p>
        </div>
        <ApplicationActions application={application} />
      </div>
    </div>
  );
}
