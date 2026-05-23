/** Demo reference when Supabase RPC unavailable */
export function generateDemoReference(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BYA-${year}-${String(num).padStart(4, "0")}`;
}
