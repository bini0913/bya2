import { createClient } from "@/supabase/client";
import { createClient as createServerClient } from "@/supabase/server";
import { isSupabaseConfigured } from "@/supabase/client";
import type { ApplicationDocuments, ApplicationFormData, ApplicationStatus } from "@/lib/validations/application";
import { generateDemoReference } from "@/lib/reference-id";

export type ApplicationRecord = {
  id: string;
  reference_id: string;
  student_name: string;
  gender: string;
  dob: string;
  grade: string;
  previous_school: string | null;
  parent_name: string;
  phone: string;
  email: string;
  address: string;
  notes: string | null;
  documents: ApplicationDocuments;
  status: ApplicationStatus;
  admin_notes: string | null;
  created_at: string;
};

export async function submitApplication(
  data: ApplicationFormData,
  documents: ApplicationDocuments
): Promise<{ referenceId: string; demo?: boolean }> {
  if (!isSupabaseConfigured()) {
    const referenceId = generateDemoReference();
    console.info("[BYA] Application (demo):", { ...data, referenceId, documents });
    return { referenceId, demo: true };
  }

  const supabase = createClient();

  const { data: refData, error: refError } = await supabase.rpc("next_application_reference");
  if (refError) throw refError;

  const referenceId = refData as string;

  const { error } = await supabase.from("applications").insert({
    reference_id: referenceId,
    student_name: data.studentName,
    gender: data.gender,
    dob: data.dob,
    grade: data.grade,
    previous_school: data.previousSchool ?? null,
    parent_name: data.parentName,
    phone: data.phone,
    email: data.email,
    address: data.address,
    notes: data.notes ?? null,
    documents,
    status: "pending",
  });

  if (error) throw error;
  return { referenceId, demo: false };
}

export async function getApplicationsServer(): Promise<ApplicationRecord[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ApplicationRecord[];
}

export async function getApplicationServer(id: string): Promise<ApplicationRecord | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("applications").select("*").eq("id", id).single();

  if (error) return null;
  return data as ApplicationRecord;
}

export async function updateApplicationServer(
  id: string,
  updates: Partial<{
    status: ApplicationStatus;
    admin_notes: string | null;
  }>
) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("applications").update(updates).eq("id", id);
  if (error) throw error;
}

export async function deleteApplicationServer(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
}
