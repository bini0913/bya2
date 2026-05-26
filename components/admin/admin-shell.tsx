"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Images,
  Users,
  Share2,
  FilePenLine,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/admissions", label: "Admissions", icon: FileText },
  { href: "/admin/news", label: "News CMS", icon: Newspaper },
  { href: "/admin/media", label: "Media Manager", icon: Images },
  { href: "/admin/leadership", label: "Leadership", icon: Users },
  { href: "/admin/social", label: "Social Media", icon: Share2 },
  { href: "/admin/content", label: "Site Content", icon: FilePenLine },
  { href: "/admin/roles", label: "Roles", icon: Shield },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#071529] text-slate-100">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-[#061121] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="font-display text-xl font-semibold text-gold-500">BYA CMS</p>
          <p className="text-xs text-white/50">Luxury School Management</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm", active ? "bg-[#0f2a4b] text-gold-500" : "text-white/70 hover:bg-white/5 hover:text-white")}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
