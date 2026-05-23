import { createClient, isSupabaseConfigured } from "@/supabase/client";

export type AdmissionInquiry = {
  parentName: string;
  email: string;
  phone: string;
  gradeInterest: string;
  message?: string;
};

export async function submitAdmissionInquiry(data: AdmissionInquiry) {
  if (!isSupabaseConfigured()) {
    console.info("[BYA] Admission inquiry (demo mode):", data);
    return { success: true, demo: true };
  }

  const supabase = createClient();
  const { error } = await supabase.from("admission_inquiries").insert({
    parent_name: data.parentName,
    email: data.email,
    phone: data.phone,
    grade_interest: data.gradeInterest,
    message: data.message ?? null,
  });

  if (error) throw error;
  return { success: true, demo: false };
}
