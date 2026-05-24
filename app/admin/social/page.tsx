import { demoSocialLinks } from "@/lib/admin-cms";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-white">Social Media Manager</h1>
      <div className="rounded-xl border border-white/10 bg-[#0b1d36] p-5">
        <div className="space-y-3">
          {demoSocialLinks.map((link) => (
            <div key={link.platform} className="flex items-center justify-between rounded-md border border-white/10 px-4 py-3">
              <span className="text-white">{link.platform}</span>
              <span className="text-sm text-white/60">{link.url}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
