import { demoNews } from "@/lib/admin-cms";

export default function AdminNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-white">News CMS</h1>
        <button className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-[#071529]">Create news</button>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0b1d36] p-4">
        <div className="grid grid-cols-12 gap-3 px-2 py-2 text-xs uppercase tracking-wide text-white/50">
          <span className="col-span-6">Title</span><span className="col-span-2">Status</span><span className="col-span-2">Featured</span><span className="col-span-2">Actions</span>
        </div>
        {demoNews.map((post) => (
          <div key={post.id} className="grid grid-cols-12 items-center gap-3 border-t border-white/10 px-2 py-3 text-sm text-white">
            <span className="col-span-6">{post.title}</span>
            <span className="col-span-2">{post.status}</span>
            <span className="col-span-2">{post.featured ? "Yes" : "No"}</span>
            <span className="col-span-2 text-gold-500">Edit · Delete</span>
          </div>
        ))}
      </div>
    </div>
  );
}
