import { demoSiteContent } from "@/lib/admin-cms";

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-white">Site Content Manager</h1>
      <div className="space-y-3 rounded-xl border border-white/10 bg-[#0b1d36] p-5">
        {demoSiteContent.map((block) => (
          <div key={block.key} className="rounded-md border border-white/10 bg-[#0f2a4b] p-4">
            <p className="text-sm text-gold-500">{block.label}</p>
            <p className="mt-1 text-white">{block.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
