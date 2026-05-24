import { demoMedia } from "@/lib/admin-cms";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-white">Media Manager</h1>
        <button className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-[#071529]">Upload media</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoMedia.map((asset) => (
          <div key={asset.id} className="rounded-xl border border-white/10 bg-[#0b1d36] p-4">
            <p className="text-xs uppercase text-white/50">{asset.group}</p>
            <p className="mt-1 text-white">{asset.label}</p>
            <p className="mt-2 truncate text-xs text-white/60">{asset.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
