import { createClient, isSupabaseConfigured } from "@/supabase/client";

/** Browser-safe file upload for the admission wizard (no server imports). */
export async function uploadApplicationFile(
  file: File,
  folder: string
): Promise<string> {
  if (!isSupabaseConfigured()) {
    return `demo/${folder}/${Date.now()}-${file.name}`;
  }

  const supabase = createClient();
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const { error } = await supabase.storage.from("applications-documents").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;
  return path;
}
