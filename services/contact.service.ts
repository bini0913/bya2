import { createClient, isSupabaseConfigured } from "@/supabase/client";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactMessage(data: ContactMessage) {
  if (!isSupabaseConfigured()) {
    console.info("[BYA] Contact message (demo mode):", data);
    return { success: true, demo: true };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) throw error;
  return { success: true, demo: false };
}
